---
title: "Serverless Web Mapping Retro"
date: 2020-10-14T00:11:24+11:00
draft: true
---

### In Summary
I'm happy with what I got done. I made many mistakes along the way but I learnt some stuff. 

The goal of the project was to select features on a map, and use that selection to drive a data query, and then to visualize that data. 

**Mission Accomplished. **



### Here's a list of my mistakes, assumptions, and traps I fell into. 

* I keep spelling Lambda, lamnda. **눈_눈**

* At the start, I focused too much on the data and not enough on the metadata. I had a lot of revisions due to this.

By the time I'd loaded about a million records to the DB, I realized I need to sit the metadata somewhere. That somewhere should have been with the DB. It ended up being in the Lambda function. This isn't terrible but it gnaws at me a little. How I think I would have solved this is by feeding the csvTransformer program a metadata file in addition to the data file. I could have then composed more complex objects for the database entries.

* The Datapacks CSV's contain variable positional and order information that is structural and important.   

Ie, if there's data in chunks like, ages 0-5, 5-10, 10-15. In the data packs those columns would appear next to each other. They still do on the site, but I realized this is by luck and not design. Data packs ship with sequence metadata, and you can change out the variable short names for sequence codes when you download the data packs. 

If I was doing this again, I'd merge the response object to contain the short code, the full name and the sequnce code in the metadata block of the response object. For all the data responses I'd use the sequence number to tag the variables. This would be better, and it'd eliminate the Metadata golang files that I hacked onto my lambda function. I actually think this may also have shaved a few bytes off responses.

* Learning Golang whilst doing everything may have made some tasks harder.
Kind of what I signed up for, but I probably should have tried a sudoku solver first. :P

* The AWS Golang SDK for DynamoDB was tricky to learn. I assumed a noSQL DB would be easier.

I'm not on my own here, there's plenty of hate out there for the Golang DynamoDB API. But It didn't help that I was also learning Golang. And that API's motto could be *Take me down to pointer town*. 

As for NoSQL not being easy. Sort and Partition keys. I'm a pretty visual person and the info graphic in this kept confusing me. [Choosing the Right DynamoDB Partition Key](https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key/). It very well could be me, but I was thinking in relational DB terms and thinking that all of those tupes were different things, rather than them being just items. New language, new DB paradigm, new terms. The usual *sort* of confusion. The pun being that sort keys are really indexes' that are scoped inside a partition. It would have ben way, way easier if AWS had just named those partition index's or something. 

And just to prove im still learning, I had a little panic then thinking I got the partition and sort keys wrong. So I reread that article and checked over everything. I'm like 85% sure it's ok.

* API Gateway and Lambda Functions.  

The version of the lambda function's request and response objects is important. As is the the configuration of API gateway and it's interpretation of those objects. I feel the AWS documentation understates the significance of small mistakes here. I know from many years of work that small things are important, ie **;**. But I lost a bit of time with response codes and incorrect Lambda response object versions. And this was due to my API gateway config not matching my response object. Interestingly, AWS created version 2 Objects between Lambda and API Gateway. I think if they'd made version breaking changes then it would have been less turbulent. Anyway, I figured it out.

* Setting up HTTPs to the API gateway.   

I now know the amazing benefit of the wild card prefix on my https cert. And also, that CloudFront has a terrible ui for the SSL certificate select box. You MUST delete the name of the certificate before the drop down will appear with your new cert! This is where automating the infra deploy would maybe have been helpful.

* I thought I would automate the infrastructure.

I didn't do this. I got tired, and it was a low value task to me. I did have auto DB deploys and Lambda deploys and updates, but HTTPs, CloudFront, and API Gateway were all done by hand.

* CORs is always tricky.  

I feel like I always *just* manage to get CORs' working. It never feels like it *click*. After grinding through that issue on my own I certainly have a better understanding of it now. But it's still one of those tricky bits of config I feel like I'll always be a bit behind in.

* I'm still bad at javascript. 

No shocker here. By the time I got to work on the front end I was a bit tired of the project. Putting in the time to design, build, and deploy the frontend and then debugging it was actually pretty draining. I wanted to finish the project more than I wanted to have a perfect UI. So I'm comfortable with the MVP. 

What I'm trying to say is. The front end isn't terrible, but it's not great either. It's good but it's not. I want it to be better, but I know I'll get demotivated with building things generally If I focus for too long on it. So, I'd rather leave it in a lesser looking state than burn out due to working on it every night.