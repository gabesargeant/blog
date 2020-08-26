---
title: "Actually building this site"
date: 2020-08-26
draft: false
---

**Getting this all setup.**

If you read my first post about getting into static site development from about a week before this one you'll get a good laugh. Or I did. I've pretty much made every mistake I could and most of those are related to my not RTFM.

All in all, AWS is like lego, and very easy to chop and change things when you make spelling mistake, register a top level domain that isn't supported by AWS etc etc. 

All the errors I made listed out.

* I badly named the git repo whn setting up. fixed.
* I wrongly assumed that the top level domain **.dev** would be supported by AWS. it's not! So there $18 dollars Im not using soon. If it gets support within the next year, I'll be adding porting it over. Otherwise :/ I'm skipping a coffee from the shops for a few days to make up the loss :(
* I did almost all the config for setting up the site using the .dev TLD before I looking into porting it over. This included creating AWS resources and ID's with that TLD in them.[long sigh]. So I got to do everything twice. 
* Even if It was supported by AWS. Google who I registered with has a 'no transfers for 60 days policy' so that would have sucked. Though in reading about this I found out the .jp TLD for Japan has special rules around transfers that can only happen within a short window near the renewal / expiry date. Who know's why.
* And last but not least I built a wrong SSL cert, firstly one that only supported the www. so when I did the bare redirect everything started failing.

If your thinking, *Gabe isn't this your job*. I will happily say that doing infrastructure work isn't my core day job. Also I got there in the end ;)

In setting everything up I badly followed these two guides, [1 & 2]( 
{{<ref "#links" >}})

Truthfully it was very easy. I didn't pull my hair out at all. The mistakes I made were more due to me rushing before dinner and they were fun to debug rather than anything close to a real issue.

A few cool takeaways:

1. Everything is cheep cheep cheep as the scale I'm at.
1. Everything is single purpose (I'll go into this more)
1. You can do almost ever step out of order with very little consequence. And that is impart due to the design of everything being single use.


**Bare redirect thoughts**
One of the fiddly things in setting up the domain and DNS entries was handling the domain name.
There is www.gabrielsargeant.com and gabrielsargeant.com. 
They both point to the same resource. Yet in the instructions you setup two cloudfront distributions, one for each, both have their own routes that map to their own like named s3 buckets. It's at the bucket level that you then redirect traffic from one of the buckets to the other. Effectively handling the missing www. condition.
This seems odd by design. In my mind initially it seems simpler to have a set of alias names at the DNS level that map N:1 content directory. 

Thinking on it a little more, it fit's with my experience with AWS and I frankly like the design. Nothing is every so complex (usually) that it's not massive work if you end up rage deleting parts of the stack to start again.

**Deploy the content to AWS**  
Again. RTFM Gabriel.   
Deploying is just a Hugo CLI command. I won't be writing my own upload tool right now.
All I have to do is configure the AWS SKD and make sure the IAM permissions exist correctly for the write to S3 for the website bucket. 

**Lastly.**
I decided to skip the mail redirect. If there's a free mail host out there that can stay free for a long tim I'll maybe revist this. But it's not going to be a felt loss at the moment.

___
### Links

**1** [David Baumgold - Host a static site on aws s3](https://www.davidbaumgold.com/tutorials/host-static-site-aws-s3-cloudfront/)  
**2** [Configuring a static website using a custom domain registered with Route 53 ](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html)


