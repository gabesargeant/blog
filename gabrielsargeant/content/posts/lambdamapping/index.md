---
title: "Lambda Mapping Project"
date: 2020-09-09T01:11:30+10:00
draft: true
---

**Building this Lambda / serverless mapping project**

I'm going to just list in sections parts of the project as I build them with any significant notes along the way.

I'm generally approaching this problem from back to front. I'm starting with the data processing then onto building the lambda and infra, then the javascript monstrosity. 

# Building the Database.

This repo contains my data packs code. [smap](https://github.com/gabesargeant/smap)

There are two command line tools. And a lambda function.
There will be another repo called smap_web which will contain the javascript bits and any API definitions that I build. Go repos are tricky and don't really play well with having a bunch of other junk dropped in with them. If I am able to, I will make it just one big repo with everything.

**Why two command line tools?**  

In the previous iteration of this project. I used mysql to load an in file record into the database. DynamoDB has an API, but it doesn't have ETL tools. That's really up to you with the SDK. (I'll be grumpy at my self if it does have tools and I find them as I've just made some.)
The intent of the CLI tools is that they will be easy to wrap in a bash script. I want to simply run the datapacks through a transform process and then load them to AWS.

The target for the CSV is a AWS DynamoDB. With how I intend to store the record I need to create a record that can be fully self describing ie. holding it's column name and value in a json object. 
The first CLI tool I made was the **csvtransform.go** tool which parses an input CSV and then spits out json object.

The transform program uses an exported data structure (**record.go**) that I created to allow it to integrate with the loading program. 

The intent of the csv transform is to take a csv file and for each row to try and fit it's contents into this shape.

```
// Record. A struct used to create a json object representing a region ID and then a set of key value pairs of data.
type Record struct {
	RegionID string             `json:"RegionID"`
	TableID  string             `json:"TableID"`
	KVPairs  map[string]float64 `json:"KVPairs"`
}
```

Which in real life looks like a big array of records like this..
```
[{
    "RegionID": "1",   #Aiming to be AWS Partition Key
    "TableID": "G02",  #Aiming to be AWS SORT Key
    "KVPairs": {
	"Average_household_size": 2.6,
	"Average_num_psns_per_bedroom": 0.9,
        ........
        ........
	"STE_CODE_2016": 1
    }
}, {
    "RegionID": "2",
    "TableID": "G02",
    "KVPairs": {
        etc etc
```
And finally just dump that json text into a file in and output folder.  

Of significant note: The RegionID and TableID fields. They are related to *Partition and Sort keys* on the DynammoDB. Knowing that the the data comes in csv files with a topic sequence, I'm using these topic code values as the sort key. This means that if the data ever grows past 10gig (it wont). Then it will get split into separate buckets for performance, based on the sort key. The **G02** table id in the above example will have 70K region id's and so will all the other **GN** tables thus giving everything pretty similar lookup speed.  

Importantly all of this is moot because I'm not going to hit the size where sort keys starts getting used. But do have a read of a really good explanation from AWS.

[Choosing the Right DynamoDB Partition Key](https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key/)

**The upload program**  
**dbbuilder** is the other cli tool that handles a few tasks. At it's core, it reads the array of Record objects and fits them into the AWS SKD and then uploads them to DynamoDB. If the DB schemas doesn't exists it can also build that. And there's also flags to purge and or delete a DynamoDB table if needed.  

Everything was simple until I started using the AWS Golang SDK. And then Batch uploads to dynamoDB happened. (╯°□°)╯︵ ┻━┻. [Cathartic Reddit thread about the AWS Golang SDK](https://www.reddit.com/r/golang/comments/65qyu2/aws_how_you_shouldnt_write_your_api/) 

Long story short but this function is all about filling up a batch input request with records. I have ~56,000 of those for SA1 level data and the DB needs them in 25 record chunks. And that results in pretty gruesome code like this. Don't judge, I'll admit this may be a bad way of doing things but it was not easy to grok from the doco. And the documentation has a bad habit of using examples where structs are coded as literals. This isn't beginner friendly IMHO. Have a glace at the doco and sample code for the [Golang SDK - DynamoDB - BatchGetItem](https://docs.aws.amazon.com/sdk-for-go/api/service/dynamodb/#DynamoDB.BatchGetItem) you may disagree, but I think a more instructive example would be to build a struct, then place it in another, then so on until you had the completed structures to use. 

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
AWS looks like they have a V2 of the Golang SDK on the way so maybe it'll get a bit of love. 

I have to do some testing at the edges of the limits to make sure there are no offset errors and such but things look good so far. 
God help me if they ain't'

**One day Later**   
In anticipation of developing the front end code and lambda function for the API gateway I needed to create the DB and put data in it.
And it worked!  

{{<image name="dynamoUpload.png" alt="Confirmation that the dbbuilder and upload go code works">}}

And everything got uploaded!   

{{<image name="dynamoUploadCheck.png" alt="The csvTransform program correctly transformed all the records and the dbbuilder uploaded everything as required">}}   
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

I lost about ~5 hours to a really stupid mistake of not setting a HTTP response code in the lambda [events.APIGatewayProxyResponse](https://github.com/aws/aws-lambda-go/blob/master/events/apigw.go#L21) struct. It turns out that HTTP response codes are pretty important for a Http API. As described in the first sentences of the [doco about version 1.0](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.response). ಠ ∩ ಠ. Consequently API Gateway will not send a response if a HTTP code isn't set. 
Why did I miss this? Two reasons. I really was skimming stack overflow trying to grok the answer to why my API wasn't just working. And the Events package has two version of the APIGatewayProxyResponse struct which both share most the same fields. As I didn't have a solid grasp of what I was doing I picked the first one and didn't bother with a response code. *This is where some code comments on the struct type would have helped AWS.*

In addition to this confusion, in the API Gateway when you configure the endpoint for the lambda integration you have to select a Payload Format Version. That needs to match up to your code. If it doesn't, it seems the API gateway just looks at the struct and makes a choice on what's best. So even when I toggled that to version 2.0. It was seeing the version 1 struct and throwing an error instead of responding in absence of the response code, which is the default behavior of version 2.0.

After printing almost everything to the cloudwatch logs to see my Lambda was working I started looking more and more at the documentation. Notably, the one thing that probably held me back a little was that all the tutorial code is javascript for the API Gateway. Having built everything in Golang, and also being fairly new to it I didn't really have the eye's to spot this error.  

Anyway it works!

Stuff still TODO:
1. I need to consider the placement of the API into this domain with DNS. I can just use the default url, but this may present a problem for CORs and the javascript in the mapping framework. 
2. Rate Limits for the API, just in case. 
3. Figure out and deal with all the awful CORs issues related to 1.

 
**Optimizing javascript in an attempt to be friendly to everyone's bandwidth**

[ArcGIS API for JavaScript Web Optimizer](https://developers.arcgis.com/javascript/3/jshelp/inside_web_optimizer.html)

TODO optimize front end code. 


