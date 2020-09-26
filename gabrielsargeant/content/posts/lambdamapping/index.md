---
title: "Lambda Mapping Project"
date: 2020-09-09T01:11:30+10:00
draft: true
---

**Building this Lambda / serverless mapping project**

I'm going to just list in sections parts of the project as I build them with any significant notes along the way.

I'm generally approaching this problem from back to front. I'm starting with the data processing then onto building the lambda and infra, then the javascript monstrosity. This should hopefully read like an exciting travel diary.

# Building the Database.

This repo contains my data packs code. [smap](https://github.com/gabesargeant/smap)

There are two command line tools.
There will be another repo called smap_web which will contain the javascript bits, any API definitions that I build and the Lambda function. Golang repositories are tricky and don't really play well with having a bunch of other filetypes dropped in with them. So this is why there's a split with smap and smap_web on github.

**smap - Why two command line tools?**  

In the previous iteration of this project. I used MySQL to load an in-file record into a database. DynamoDB doesn't have ETL tools direct from AWS, instead there's an SDK. Which means it's up to you to figure out your load process.
The intent of my CLI tools is that they will be easy to wrap in a bash script. I want to simply run the datapacks through a transform process and then load them to AWS.

The target for the CSV is a AWS DynamoDB which is a NoSQL DB (A giant HashMap). I intend to store the records in a structure where they can be fully self describing.
The first CLI tool I made was the **csvtransform.go** tool which parses an input CSV and then spits out json object. 

The transform program uses an exported data structure (**record.go**) that I created to allow it to integrate with the loading program. 

The intent of the csv transform is to take a csv file and for each row to try and fit it's contents into this shape. Which is like loading 1 row of a CSV into a DB tuple as a JSON map.

```
// Record. A struct used to create a json object representing a region ID and then a set of key value pairs of data.
type Record struct {
	RegionID string             `json:"RegionID"`
	PartitionID  string         `json:"PartitionID"`
	KVPairs  map[string]float64 `json:"KVPairs"`
}
```

In real life looks like a big array of records like this..
```
[{
    "RegionID": "1",   #Aiming to be AWS SORT Key
    "PartitionID": "G02",  #Aiming to be AWS Partition Key
    "KVPairs": {
	"Average_household_size": 2.6,
	"Average_num_psns_per_bedroom": 0.9,
        ........
        ........
	"STE_CODE_2016": 1
    }
}, {
    "RegionID": "2",
    "PartitionID": "G02",
    "KVPairs": {
        etc etc
```
Finally I just dump that json text into a file in and output folder.  And that's the transform step done.


Of significant note: The RegionID and PartitionID fields. They are related to *Partition and Sort keys* on the DynamoDB. Knowing that the the data comes in csv files with a topic sequence, I'm using these topic code values as the partition key. This means that if the data ever grows past 10gig (it wont). Then it will get split into separate buckets for performance, based on the partition key. The **G02** partition id in the above example will have 70K region id's and so will all the other **GN** tables thus giving everything pretty similar lookup speed.  

Importantly all of this is moot because I'm not going to hit the size where partition keys starts getting used to physically separate data. However you should have a read of a really good explanation from AWS. Funny note, I mixed these up and fixing it was aweful.

[Choosing the Right DynamoDB Partition Key](https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key/)

**The upload program**  
**dbbuilder** is the other cli tool that handles a few tasks. At it's core, it reads the array of Record objects and fits them into the AWS Golang SKD structs and then uploads them to DynamoDB. If the DB schemas doesn't exists it can also build that. And there's also flags to purge and or delete a DynamoDB table if needed.  

It works well enough and everything was simple until I started using the AWS Golang SDK. And then Batch uploads to dynamoDB happened. (╯°□°)╯︵ ┻━┻. [Cathartic Reddit thread about the AWS Golang SDK](https://www.reddit.com/r/golang/comments/65qyu2/aws_how_you_shouldnt_write_your_api/) 

Long story short but this function is all about filling up a batch input request with records. I have >56,000 of those for SA1 level data and the DB needs them in 25 record chunks. And that results in pretty gruesome code like this. Don't judge, I'll admit this may be a bad way of doing things but it was not easy to grok from the doco. The documentation has a bad habit of using examples where structs are coded as literals. This isn't beginner friendly at all IMHO. Have a glace at the doco and sample code for the [Golang SDK - DynamoDB - BatchGetItem](https://docs.aws.amazon.com/sdk-for-go/api/service/dynamodb/#DynamoDB.BatchGetItem) you may disagree, but I think a more instructive example would be to build a struct, then place it in another, then so on until you had the completed structures to use. 

```
func composeBatchInputs(recs *[]record.Record, name string) 
*[]dynamodb.BatchWriteItemInput {

    buckets := (len(*recs) / 25) + 1
    
    arrayBatchRequest := make([]dynamodb.BatchWriteItemInput, buckets)

    for i := 0; i < buckets; i++ {

        wrArr := []*dynamodb.WriteRequest{}
 
        stepValue := i * 25

        for j := 0; j < 25; j++ {            
            if j+stepValue == len(*recs) {
                //fmt.Println("Length of recs")
                //fmt.Println(len(*recs))

                break
            }

            av, err := dynamodbattribute.MarshalMap((*recs)[j+stepValue])

            if err != nil {                          
                pr := dynamodb.PutRequest{}
                pr.SetItem(av)
                wr := dynamodb.WriteRequest{}
                wr.SetPutRequest(&pr)
                wrArr = append(wrArr, &wr)

        }
        wrMap := make(map[string][]*dynamodb.WriteRequest, 1)

        wrMap[name] = wrArr

        arrayBatchRequest[i].SetRequestItems(wrMap)

    }
    return &arrayBatchRequest
}
```
Anyway, It works and as we learn when young...
```
Son: Dad why does the Sun rise in the east and set in the West?
Father: It works, don't touch it!
```
At least for the time being I'm not going to hack away too hard at this bit of the codebase. 
AWS looks like they have a V2 of the Golang SDK I'm sure it'll get a bit of love. 

I have to do some testing at the edges of the limits to make sure there are no offset errors and such but things look good so far. 

**One day Later**   
In anticipation of developing the front end code and lambda function for the API gateway I needed to create the database and put data in it.
And that all just worked!  

{{<image name="dynamoUpload.png" alt="Confirmation that the dbbuilder and upload go code works">}}

And everything got uploaded!   

{{<image name="dynamoUploadCheck.png" alt="The csvTransform program correctly transformed all the records and the dbbuilder uploaded everything as required">}}   

I'm pretty happy that went so well.
&nbsp;

---

# Writing the Lambda function

*This little lambda function should be simple.*
    --Gabe Sargeant  
*The Lambda function did not turn out simple at all*
    --Narrator


Checkout the [smap_web](https://github.com/gabesargeant/smap_web) / lambda folder for the final version.

Basic stuff I need to do with this lambda: 
1. Get a session. 
2. Get a dynamoDB connection
3. Connect to the DB table with the data packs
4. Get the content matching the regionId and tableID, ie key and partition.
5. Return all that. 

Extra points. 

6. Unit test the lambda function. ie mock out dynamoDB and the AWS API and have that code the final deployable version. 

Extra Extra points

7. Optimise all of the response code to lighten the burden when the response object is handed back to the javascript client.
8. Make a unit tests!

**Steps 1 --> 5** were pretty easy. Obviously API gateway isn't in the mix yet but the general mechanics of the lambda are pretty much the same.
I followed this [AWS guide](https://docs.aws.amazon.com/lambda/latest/dg/lambda-golang.html) on golang Lambda functions as a start, and that was actually pretty simple. At this point the lambda function was 'working'. I deployed it up to AWS and gave it a go. 

{{< image name="basiclambda.png" alt="Image of basic lambda execution result">}}



**Step 6**   
This was really interesting. In my past life I've shied away from use of interfaces for testing and mocking, favoring a constructor based dependency injection via some top level factories and used testing frameworks such as Java's Mockito. I've always found this style of approach to be very testable and readable. However because the lambda function has only 7 allowable method signatures there needs to be another way around that. Which turns out to be dependency injection with [pointer receivers](https://tour.golang.org/methods/4) and the heavy use of AWS SKD interface types. 

This aws events webinar was so good I actually liked the video and subscribed to the channel. [Youtube: Unit Testing your AWS Lambda Functions in Go](https://youtu.be/dFY2hsBiFcI)


**Step 7**

I'm just going to be kicking the client in the teeth :D

*Hello JSON my old friend.*

Not only because the AWS golang SDK is just so ;gah', Im going to grab a whole tuple from the db and get the front end to clean it up. ie. I'm going to get the Lambda function to send back an array of tuples and that's it. The Javascript will be doing the building of the data table. It's not terrible but also not great. I'll totally circle back and refactor maybe.

DynamoDB supports a query syntax to enable pulling down sub results. What I'm doing right now is akin to ```select * from table;``` I'm not sure if the added overhead of naming columns and the work that involves is easier done, both in code terms and mental complexity in either the DB layer the Lambda Layer or the Front end.

Considering I'll be doing the work. I'll start with the front end and then if that's terrible I'll try some stuff.

**Step 8**  
Writing the unit test was pretty straight forward due to the pointer receiver dependency injection. AWS supply their whole interface in the [dynamobdiface](https://docs.aws.amazon.com/sdk-for-go/api/service/dynamodb/dynamodbiface/) stub package. You just include that interface as your injected 'DB' and then you just need to implement the desired methods for your tests. 

In the git repo I have a pretty simple tests which does enough to show the happy path of the test. At the time of writing this I haven't quite figured out what I'll do with errors that pop up during lambda execution. I'm thinking of expanding the response record type to include an optional warnings and errors string. 

Whilst I ponder on that and move forward with building the API Gateway components. One final thing to note, the API gateway request and response objects that are implemented in the lambda events package, events.APIGatewayProxyRequest & Response, mean that I'll be sending a lot of json in the Body field of the object. It's an extra marshalling and unmarshalling step that has to happen with the json. It's not really an issue just something I have to deal with.

**Step 9**  
Consider what the hell im going to do about Metadata. TODO

&nbsp;

---

# API Gateway


Setting up the API Gateway was hard and then it was really easy. It got easy once I stopped messing about with AWS and started reading about AWS. Who knew!

It can be summarized by this flow chart which oddly looks like a finite state machine.

{{<image name="rtfm.png" alt="flow chart describing my development process">}}

I lost about ~5 hours to a really stupid mistake of not setting a HTTP response code in the lambda [events.APIGatewayProxyResponse](https://github.com/aws/aws-lambda-go/blob/master/events/apigw.go#L21) struct. It turns out that HTTP response codes are pretty important for a Http API. As is clearly described in the first sentences of the [doco about version 1.0](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.response). ಠ ∩ ಠ. Consequently API Gateway will not send a response if a HTTP code isn't set. 
Why did I miss this? Two reasons. I really was skimming stack overflow trying to grok the answer to *why my API wasn't just working*. And the Events package has two version of the APIGatewayProxyResponse struct which both share most the same fields. As I didn't have a solid grasp of what I was doing I picked the first one and didn't bother with a response code. *This is where some code comments on the struct type would have helped AWS.*

In addition to this confusion, in the API Gateway when you configure the endpoint for the lambda integration you have to select a Payload Format Version. That needs to match up to your code. If it doesn't, it seems the API gateway just looks at the struct and makes a choice on what's best. So even when I toggled that to version 2.0. It was seeing the version 1 struct and throwing an error instead of responding in absence of the response code, which is the default behavior of version 2.0.

After printing almost everything to the cloudwatch logs to see my Lambda was working I started looking more and more at the documentation. Notably, the one thing that probably held me back a little was that all the tutorial code is javascript for the API Gateway. Having built everything in Golang, and also being fairly new to it I didn't really have the eye's to spot this error.  

Anyway it works!

Stuff still TODO:
1. I need to consider the placement of the API into this domain with DNS. I can just use the default url, but this may present a problem for CORs and the javascript in the mapping framework. 
2. Rate Limits for the API, just in case. 
3. Figure out and deal with all the awful CORs issues related to 1.

**One day later**

I really wanted was to lay the API gateway across my domain like so:
```
    my domain.com/lambdamapping.html <== the hugo / static parts of the site
    my domain.com/app/smap <== this is the api gateway stage 
```
The API Gateway root is /app and the POST request urls at /smap/getregions. It would have fit better and been more cosmetically pleasing to integrate the site and gateway this way to me.  *I can't be called out on this desire. If you consider all the crap I went through to understand the irrational desire for pretty urls on websites these days*

As you can expect Amazon has had other designs in mind. Probably because doing this day and day out, they could easily anticipate that overlaying two sets of url schemes on top of each other will lead to bad times.

So I'm not going to fight with it. To make up some lost time, my api just follows the usual stock patterns.

Speaking of saving extra time. I started to read up and implement the new route for API Gateway. All that was required was creating a new Route 53 alias certificate with the *api* prefix and mapping that the to my API Gateway.  
Then I realized that I built this site with HTTPs and with an SSL certificate that didn't use a prefix wildcard. ＼(｀0´)／. *No time was saved. Not one time at all.*

I started out knowing I had to change out certificates for my cloudfront distribution. Which is actually pretty easy. It just meant going into the AWS Certificate Manger and trying to delete the existing cert. Which doesn't work. You have to remove dependencies on certificates before you can remove the certificate.

So I went and requested a new certificate and whilst that was provisioning I attempted to remove the bad one from CloudFront Distributions it was associated with. Then it should have been simply just updating CloudFront with the new certificate.   
That's about the time I noticed the spelling mistake I made...in my own name *sigh*. I'm putting that one down to a rough day at work. But needless to say I got to try this process a few more times.  

One thing does strike me about AWS. All of their products are reasonably good. They give you access to a lot of power. But the console UI is not amazing, it's getting better but still somewhat lacking. Case in point. I easily spent ~10 minutes trying to understand why a new SSL cert wasn't visible on my cloud front distribution's list of certificates. And this turned out to be because I had an existing certificate selected that needed to be deleted (via the backspace key) to allow the drop down of other certificates to present itself. I know the default response would be to use the SKD or CLI but I have rather a small opperation going on here.

Anyway all of that was done and then that didn't work. This picture explains my mistake.

{{< image name="awpigatewaycomms.png" alt="Communications pathways between AWS cloud components">}}

I needed to the route to go api.gabrielsargeant.com to cloudfront to terminate SSL with my certificate that has the *.gabrielsargeant.com name so that Cloudfront can handle communications between API Gateway and itself before rewrapping the request with my HTTPs cert.

As always when working with SSL, Certificates and DNS. Never Again! at least for a little while.

I am yet to deal with CORS, hopefully it's very simple considering I now have the API with the same origin!


# Metadata - Lambda Function revisited.

In some of the more detailed parts of the Census Data Packs the short column header names can get a little tough to understand.

For Example 
The Short hearder: **A15_24_SOLSE_PinE_NS_06_10**  
means  
**"Aged 15 24 YEARS Speaks other language and speaks English Proficiency in English not stated 2006 2010"**

ABS provides conversion information in a few metadata files with the Data Packs. I needed to incorporate this information into the application. I had a few ideas on doing this.

Firstly, I considered rewriting my CSVTransformer CLI tool too accept two data files as input, I'd need to do something to attach the metadata into a special record for each partition. 
In broad strokes the DynamoDB data has the primary key structure of  **Sort Key, Region ID: PartitionKey: PartitionID** I was thinking about having a special record for each partition that was **Sort Key, PartitionID: PartitionID: PartitionID** This would have allowed me one item per partition in the dynamoDB that was non statistical data. I liked this option, however I think it would mean that all of the numeric data would have to be stored as String and not Numbers to make the KVPairs field work for this edge case. 

The other idea I had was to put the metadata information into a JSON file and serve it with the webpage from S3. I wasn't thrilled about the idea of doing this though. The metadata is about 800Kb. One of the reasons I have a static site is to leverage the small page sizes and quick loads. The mapping and visualization parts of this project will have their own heft to them so i was keen to look for a solution that minimized initial page loads. 

I could have easily added another DynamoDB table. But for 800Kb of information It probably wasn't worth the drama of it all. And I briefly considered splitting up the metadata file but that could get messy with about 100 partitions in play.

Instead I opted for a wonderfully lazy approach, thats both hacky and not. 

I made about 100 Golang Map Literal objects which *map* to the CSV Tables / PartitionID's. And then I put all of those in a map of maps as source code. This really gets the line count up on my lambda function but it doesn't affect much else. 

The logic in the Lambda function is to read the PartitionID from a request. Get the Metadata from the MetadataMapOfMaps Object and then attach that to the response object.

The result in the transmitted MapResponse is a json metadata map which gives out the human friendly names for the data keys.

This looks somewhat bad from a code perspective, but it's not. It's a simple solution. If i was building a more generic data store. I would probably roll out a metadata table in Dynamo.

This was one of those small foresight issues where I'd preference keeping up the momentum of moving towards a solution, rather than getting tripped up in a whirlpool of rewrites seeking out perfection.

Importantly it works!


```
// MapDataResponse - The golang object for my response object
type MapDataResponse struct {
	Errors   []string          `json:"Errors,omitempty"`
	MapData  []MapData         `json:"MapData"`
	Metadata map[string]string `json:"Metadata"`
}

//And a sample output from a single area request.
{
    "MapData": [{
    "RegionID": "1101118",
    "PartitionID": "G02",
    "KVPairs": {
        "Average_household_size": 2.6,
        "Average_num_psns_per_bedroom": 0.9,
        "Median_age_persons": 44,
        "Median_mortgage_repay_monthly": 1578,
        "Median_rent_weekly": 220,
        "Median_tot_fam_inc_weekly": 1792,
        "Median_tot_hhd_inc_weekly": 1645,
        "Median_tot_prsnl_inc_weekly": 803,
        "SA1_7DIGITCODE_2016": 1101118
    }
    }],
    "Metadata": {
    "Average_household_size": "Average household size",
    "Average_num_psns_per_bedroom": "Average number of Persons per bedroom",
    "Median_age_persons": "Median age of persons",
    "Median_mortgage_repay_monthly": "Median mortgage repayment monthly",
    "Median_rent_weekly": "Median rent weekly",
    "Median_tot_fam_inc_weekly": "Median total family income weekly",
    "Median_tot_hhd_inc_weekly": "Median total household income weekly",
    "Median_tot_prsnl_inc_weekly": "Median total personal income weekly"
    }
}

```




**Optimizing javascript in an attempt to be friendly to everyone's bandwidth**

[ArcGIS API for JavaScript Web Optimizer](https://developers.arcgis.com/javascript/3/jshelp/inside_web_optimizer.html)

TODO optimize front end code. 


