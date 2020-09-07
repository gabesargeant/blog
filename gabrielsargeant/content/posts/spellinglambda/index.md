---
title: "Spelling Lambda."
date: 2020-09-07T00:18:00+10:00
draft: true
---


Is' it just me or does Lambda get trickier to spell over time. 

**A Serverless mapping project.**
In the previous post I talked about building a server app that displayed a map, let a user select regions from it, and then queried a database about those selections. 

This post is a plan for my next stab at that project. This time I'm going Serverless!!! *Lightning strike. Montage of me coding while eye of the tiger plays. Aaaaand Done**

Actually I've done none of it so far and this is just the early thinking. Soon will come the rethinking then the disillusionment, then the grind, then done, then time will pass and those memories will pretend to be happy. And thus the coding circle of life continues.

**A Brief design.**

1. I fill up a DynamoDB table will the Census Datapacks rows as tuples, Region Id's as the primary key, CSV table as the secondary. 
2. A Lambda function is able to make lookups of that DB.
3. API gateway sits in front of that and implements a HTTP API that takes a post request. maybe a get request, this may be more cache friendly for CloudFront. 
4. Cloudfront protects the site and API gateway. 
5. A slightly better designed front end is built. (No hard guarantees on this one, I'm not magic.)

{{< image name="serverlessdesign.png" alt="diagram of serverless mapping tool design">}}

**Tasks and self imposed rules**

1. Do Everything and complete the project.
2. Learn Go to a point of fluency. Maybe. Just learn more Go
3. Only use the Go STD Lib and AWS SDK.
4. Try to script the whole infra creation and deployment.
4. Build it into this site???? Maybe

**Design choices**

Reasons for a lazy non pivoted database.

**Question I need to figure out**
1. How to expose API gateway and make it 'safe' with CloudFront.
2. What to do about metadata. 
3. How quick can I make my Lambda work. 
4. Cost Management. Will drinking one less coffee a week pay for this.

**rates and limits**
I'm willing ot pay about $1 a month for API Gateway. I need to keep the request / month under 300 million.
Easy! no one may read this or use the app. But if it does get a lot of use. I need that use to be high impact and READ sensible.  There's about 2.5 Million seconds in a month and a rate limit of 20 requests per second would be about 

Seconds in an hour * Seconds in a day * Hours in a day * days in a month * rate limit = ~ 51 million So still with room to grow.

DynamoDB is a little more expensive at
0.25 per Million reads. And a free storage limit of 0$ for the first 25 GB. I'm not planning on going above 1.

I have make my READS PHAT! and sensible. As DynamoDB has a 4KB limit on what is considered a read. So if each json blob is under 4k it makes forcasting easier.

Lambda Pricing.

$0.20 per million requests at 50 million per month with my rate limit or 20/second, That's 10 bucks. If only I could cache post requests.

