---
title: "Lambda Web Mapping: Part 4 - The Retro"
date: 2020-10-14T00:11:24+11:00
draft: false
tags:
- AWS
- Lambda
- Mapping
- Retro
---

If you don't know what this is about, then follow this link and read up on the design and implementation of my little side project. [Serverless Web Mapping]({{< ref "/posts/lambdamapping-03/index.md" >}})


### In Summary
I'm happy with what I got done. I made many mistakes along the way but I learnt some stuff. 

The goal of the project was to select features on a map, and use that selection to drive a data query, and then to visualize that data. 

**Mission Accomplished.**

<!--more-->

### Here's a list of my mistakes, assumptions, and traps I fell into. 

* I keep spelling Lambda, lamnda. **눈_눈**

* At the start, I focused too much on the data and not enough on the metadata. I had a lot of revisions due to this.

By the time I'd loaded about a million records to the DB, I had realized I need to sit the metadata somewhere. That somewhere should have been with the DB. It ended up being in the Lambda function. This isn't terrible, but it gnaws at me a little. How I think I could have solved this is by feeding the csvTransformer program a metadata file in addition to the data file. I could have then composed more complex objects for the database entries from the very start.

* The Datapacks CSV's contain variable positional and order information that is structural and important.   

Ie. If there's data in chunks like ages 0-5, 5-10, 10-15. In the data-packs, those columns would appear next to each other. They still do on the site, but this is by luck and not design. Data packs ship with sequence metadata, and you can change out the variable short names for sequence codes when you download the data packs. If I were doing this again, I'd merge the response object to contain the short-code, the full name, and the sequence code in the metadata block of the response object. For all the data response's I'd use the sequence number to tag the variables. This would be better, and it'd eliminate the Metadata Golang files that I hacked onto my lambda function. I actually think this may also have shaved a few bytes off responses.

* Learning Golang whilst doing everything may have made some tasks harder.
Kind of what I signed up for, but I probably should have tried a sudoku solver first. :P

* The AWS Golang SDK for DynamoDB was tricky to learn. I assumed a NoSQL DB would be easier.

I'm not on my own here, there's plenty of hate out there for the Golang DynamoDB API. But It didn't help that I was also learning Golang. The Golang DyanamoDB API's motto really could be *Take me down to pointer town*. 

As for NoSQL not being easy. It was Sort and Partition keys that got me. I'm a pretty visual person and the info graphic in this kept confusing me. [Choosing the Right DynamoDB Partition Key](https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key/). It very well could be me, but I was thinking in relational DB terms and kept thinking that all of those tuples were different things, rather than them being just items. 

New language, new DB paradigm, and new terms. The usual *sort* of confusion. The pun being that sort keys are really indexes' that are scoped inside a partition. It would have been way, way easier if AWS had just named those partition index's or something. 

And just to prove I'm still learning, I had a little panic, and got myself thinking I had the partition and sort keys wrong. So I reread that article and checked over everything. I'm 85% sure it's ok.

* API Gateway and Lambda Functions.  

The version of the lambda function's request and response objects is important. As is the configuration of API gateway and it's interaction with these objects. I feel the AWS documentation understates the significance of small mistakes here. I know from many years of work that small things are important, ie **;**. I lost a bit of time with response codes and incorrect Lambda response object versions. And this was due to my API gateway config not matching my response object. Interestingly, when AWS created the version 2 objects for Lambda and API Gateway, they didn't make the change breaking. I think if they'd made the new version have breaking changes then it would have been less turbulent. Anyway, I figured it out.

* Setting up HTTPs to the API gateway.   

I now know the amazing benefit of the wild card prefix on my https cert. And also, that CloudFront has a terrible UI for the SSL certificate select box. You MUST delete the name of the certificate before the drop down will appear with your new cert! This is where automating the infra deploy would maybe have been helpful.

* I thought I would automate the infrastructure.

I didn't do this. I got tired, and it was a low value task to me. I did have auto DB deploys and Lambda deploys and updates, but HTTPs, CloudFront, and API Gateway were all done by hand.

* CORs is always tricky.  

I feel like I always *just* manage to get CORs' working. It never feels like it *clicks*. After grinding through the CORs issues on my own, I certainly have a better understanding of it now. But it is still one of those tricky bits of config I feel like I'm always a bit behind in.

* I'm still bad at javascript. Was I ever good...

No shocker here. By the time I got to work on the front end I was a bit tired of the project. Putting in the time to design, build, and deploy the frontend and then debugging it was actually pretty draining. I wanted to finish the project more than I wanted to have a perfect UI. So I'm comfortable with the MVP. 

What I'm trying to say is. The front end isn't terrible, but it's not great either. It's good but it's not. I want it to be better, but I know I'll get demotivated with building things generally If I focus for too long on it. So, I'd rather leave it in a lesser looking state than burn out due to working on it every night.

* Post Requests.

A Map request is pretty simple. Just a Region ID and Topic. But with 100 7 digit codes and then all the json wrapping around it. I was worried about spilling over the GET request limits for browsers. This means that the site uses post requests which are difficult to cache. 
Because there is a locality component to the requests. Ie from the selection function is a ring around a large area. I have been thinking I could make a list of the  RegionID's and then sort them, and implement some form of compression. If I had a selection that featured regions 101-151 without any missing intervals, then I could look at a form of syntax such as  
```
GET .../getregions?r=101...151&t=G02
```
But, this seems like a fast train to the land of edge cases. It may not be. But in all my past attempts I've not done this and just used POST requests. If I come back to refactor the application, building a request Pathway that is GET request based would be a good feature to reach for. 

* Lambda Cold Starts.

I *feel* like lambda cold-starts add about half a second to initial response times from a data request. They are a hard problem to deal with. Even AWS warns of them. I pondered if python or javascript would have similar issues. I also considered a health-check on a user's initial page visit might warm things up. At least before the first big request. But I ended up not implementing this. As once the first request was complete, I found myself dazzled by the visualization. So I assumed, so would everyone else. 
Most data requests are fast, but not lighting fast. And this seems mostly to be the cold start. I'm not sure extra effort here would yield significant enough results.

### Fin

That's about all of it. I will most likely make changes in the future. As long as my AWS costs stay under a coffee.

Next up. Building an R package. Maybe...
