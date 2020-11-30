---
title: "Spelling Lambda."
date: 2020-09-07
draft: false
tags:
- AWS
- Lambda
- Mapping
---


Is it just me or does Lambda get trickier to spell over time? 

**A Serverless mapping project.**  
In the previous post, I talked about building a server app that displayed a map, let a user select regions from it, and then queried a database about those selections. 

This post is a plan for my next crack at that project. This time I'm going Serverless!!! *Lightning strike. Montage of me coding whilst Eye of the Tiger plays. Aaaaand Done**

Actually, I've done nothing at all so far. This is just my early thinking. Soon will I'll start the rethinking, the disillusionment, then the grind, then done, then time will pass and those memories will pretend to be happy. Thus the coding circle of life continues.

**A Brief design.**  
Here's what it will look like:

{{< img src="serverlessdesign.png" alt="diagram of serverless mapping tool design">}}

1. A DynamoDB table will hold the [Census Data Pack](https://datapacks.censusdata.abs.gov.au/datapacks/) rows as tuples.
2. A Lambda function will do the lookups from the DynamoDB.
3. API gateway implements a HTTP API that takes a post request and passes that to the Lambda function to retrieve information. (maybe a get request, this may be more cache-friendly for CloudFront.) 
4. Cloudfront protects the site and possibly API gateway. 
5. A slightly better designed front end is built that drives all the action. (No hard guarantees on this one, I'm not magic.)

**Tasks and self-imposed rules**

1. Do Everything and complete the project.
2. Build most of the *code* parts with Golang
3. Only use the Go STD Lib and AWS SDK.
4. Try to script the whole infra creation and deployment. Maybe...
    There will be a few parts to this project. 1 the actual infra. And then the tooling around consuming the CSV data and transforming it to DynamoDB data.
    I will probably be able to do all the Infra Scripts as either bash, python, or Go script against the AWS CLI. And then the uploading data will be its own thing.

5. Build it into this site???? Maybe... Again this may be tricky or not. I can put static pages onto this site, However, I'm not sure how long-lived I want this project to be.

**Question I'm still thinking about**
1. How to expose API Gateway and make it 'safe' with CloudFront. Is this even needed?
2. What to do about metadata. 
3. How quick can I make my Lambda work. 
4. Cost Management. Will drinking one less cafe bought coffee a week pay for this.

 ---
**A few early answers to those questions.**

**Rates and Limits and Money**

1. API Gateway

I'm willing to pay about $1 a month for API Gateway. I need to keep the requests per month under 300 million. 
Easy! No one may read this, or use the app. There are about 2.5 Million seconds in a month and a rate limit of 20 requests per second would be about 51 million requests a month. That would be a lot of traffic. Even hitting that limit I'd have just under 250 Million spare requests to expand into before having to pay more than $1. 

2. DynamoDB  

The DB a little more expensive at $0.25 per Million Reads with free storage for the first 25 GB. I'm not planning on going above 1 GB. 

My Write costs are a one-off expense which won't hit any limit. That can be estimated at around all the Areas on all the Maps * the number of fields I plan to have as part of the DB. Because of a few other DynamoDB limits, I will be structuring the DB records as tuples from the CSV's which is roughly 80K records * 36 CSV tables. Which is just about 2.5 Million records being uploaded. Costing about $1.


DynamoDB has a 4KB limit on what is considered a **read**. I have made my READS PHAT! so turning each CSV row into a record gives me the ability to get a wide body of data and then trim it with Lambda or the front end to the user's specification.

3. Lambda Pricing.

At $0.20 per million requests at 50 million per month with my rate limit or 20/second, That's 10 bucks. But I have to get really popular to get there. 

The real running costs will probably be a few dollars a month, as the app sits in standby. But I've got to have a play and reread everything just to be sure.

**Making Lambda Quick**

I'm not really sure how to do this. The consensus advice on the internet is to do as little in the function as possible. I'm hoping for < 1-second processing, Which should be simply "Get X regions from the DB and hand them straight back". If That's really quick I may include trimming the response information to fit exactly what the user requests. But I still have the option to send them more data and tidy it up on the front end.

**About Metadata**
I'm going to just put the metadata information into the DB, and deal with this problem closer to the implementation time. It's been a while since I've had to really look into it all. I very well may end up with a few index keys that are special words or numbers.

**Wrapping API gateway with CloudFront**
I probably won't need to do this. But it is something I'm looking into. Most caching relies on being able to see the request. My previous experience with [Varnish Cache](https://varnish-cache.org/) leads me to believe that my initial desire to use post requests won't be easily supported. Which means making everything GET based. 

Not that there are any issues with that, it just adds an element of complexity in a few spots. Namely, build it on the front end and decoding it on the lambda function. The caching only helps under high load to save on DB reads. So it may suit the situation where I get Lambda to send more information and trim client side. 

**Finally**
Time to get building. I'll document what I do as I go and do a full write up at the end.