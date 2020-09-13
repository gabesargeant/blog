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
There will be another repo called smap_web which will contain the javascript bits and any API definitions that I build. Go repos are tricky and don't really gel well to having a bunch of other junk dropped in with them. If I am able to I will make it just one big repo with everything.

**Why two command line tools?**  

In the previous iteration of this project. I used mysql to load an in file record into the database. DynamoDB has an API, but it doesn't have ETL tools. That's really up to you with the SDK. (I'll be grumpy at my self if it does have tools and I find them as I've just made some.)
The intent of the CLI tools is that they will be easy to wrap in a bash script. I want to simply run the datapacks through a transform process and then load them to AWS.


The target for the CSV is a AWS DynamoDB. With how I intend to store the record I need to create a record that can be fully self describing ie. holding it's column name and value in a json object. 
The first CLI tool I made was the **csvtransform.go** tool which parses an input CSV and then spits out json object.

The transform program uses an exported data structure (**record.go**) that I created to allow it to integrate with the loading program. 

The intent of the csv transform is to take a csv file and for each row to try and fit it's contents into this shape.

```
// Record a struct used to create a json object representing a region ID and then a set of key value pairs of data.
type Record struct {
	RegionID string             `json:"RegionID"`
	TableID  string             `json:"TableID"`
	KVPairs  map[string]float64 `json:"KVPairs"`
}

//Collection Array of Records
type Collection struct {
	ArrRecord []Record
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
And finally just dump that file in a folder.
Of significant note: The RegionID and TableID fields. They are related to Partition and Sort keys on the DynammoDB. Knowing that the the data comes in csv files with a topic sequence, I'm using these values as the sort key. This means that if the data ever grows past 10gig (it wont). Then it'll get split into sperate buckets for performance based on the sort key. The **G02** table id in the above example will have 70K region id's and so will all the other **GN** tables. This means that Dynamo should be able to spread out the load. 

Most importantly is that this is actually all moot because I'm not going to hit the size where this starts getting used. But do have a read of a really good explanation from AWS.

[Choosing the Right DynamoDB Partition Key](https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key/)



**dbbuilder**

**csvtransform:**

CSV Transform: what's the point of it. 

Record. significance. 

dbbuilder: what it does. 



The AWS golang SDK is terrible! Or more the point the part of it where you do bulk upload with the dynamodb bulk upload feature.

explanation.



**Optimizing javascript in an attempt to be friendly to everyone's bandwidth**

[ArcGIS API for JavaScript Web Optimizer](https://developers.arcgis.com/javascript/3/jshelp/inside_web_optimizer.html)

TODO optimize front end code. 


