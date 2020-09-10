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
There will be another repo called smap_web which will contain the javascript bits and any API definitions that I build. Go repo's are tricky and don't really gell well to having a bunch of other junk dropped in with them. If I am able to I will make it just one big repo with everything.

**Why two command line tools?**
In the previous itteration of this project. I used mysql to load an infile record into the database. DynamoDB has an api, but it doesn't have ETL tools. That's really up to you with the SDK. (I'll be grumpy if it does have tools and i find them as i just made some.)
The intent of the CLI tools is that they will be easy to wrap in a bash script. I wan to simply run the datapacks through a transform, then load it to AWS.
The target for the CSV is a AWS Dynamo DV. With how I intend to store the record I need to create a record that can be fully self describing ie. holding it's colun name and value in a json object. The first CLI tool I made was the **CSV Transform** tool which parses a input CSV and then spits out json obect.

Two command line tools.
**csvtransform** and
**dbbuilder**

TODO write:

CSV Transform: what's the point of it. 

Record. signifigance. 

dbbuilder: what it does. 



The AWS golang SDK is terrible! Or more the point the part of it where you do bulk upload with the dynamodb bulk upload feature.

explaination.



**Optimizing javascript in an attempt to be friendly to everyone's bandwidth**

[ArcGIS API for JavaScript Web Optimizer](https://developers.arcgis.com/javascript/3/jshelp/inside_web_optimizer.html)

TODO optimize front end code. 


