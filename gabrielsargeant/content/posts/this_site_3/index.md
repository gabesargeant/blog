---
title: "Rebuilding this site again."
date: 2020-08-27
draft: false
---

I deployed this site to the web on the 26th. And before that day was over I was already in the AWS console ripping it to shreds. 

This is a picture of the network, before and after. In red is the *exposed* surface. It's not a huge thing but I wanted to provide only one way to see this site.
{{< image name="site_3.png" alt="network layout">}}
Following the previous tutorials from AWS and Mr. Baumgold, I essentially ended up with a CloudFront distribution that people can sidestep via the red path. It's not easy but if they are willing to guess the bucket name (which is kind of an easy guess), and then the region (finite options). Then they can interact with the website sans the CDN. Which isn't something I want to happen. 

I was thinking about this and pottered around google looking for ways to really dial up the security on my S3 bucket. Mostly just so if the timeline skips and I end up getting a ton of traffic to this site then I don't want to pay through the nose for it.

It seems others at AWS have already had this thought and come up with a nifty little feature called an **Origin Access Identity,** which acts like a FUID between a CloudFront distribution and the S3 bucket in the backend. 

Configuring it is pretty simple, however, I was starting in the middle and working out, so It took me a bit of time to get it all right.

Thankfully I didn't need to mess around with any *Route 53* records I was able to just remove the origin domain from CloudFront that pointed to my S3 bucket that was acting as a website and instead pointed the website CloudFront distribution at the website's S3 REST endpoint.

In addition to this, I backed out all the S3 public read permissions and locked down the storage layer. This meant that only the Deploy user that Hugo uses can write to the folder, and only the OAI cant make requests.

The very last thing I had to do was configure the root page to be index.html via CloudFront. 

I may in the future write up a more detailed explanation of how it all hangs together. I'm still thinking over the use of the bare redirect, I like the simplicity of it. But it's probably something I can solve with Route 53.

---
Some final notes. 
I'm still about one week old with Hugo, and I've never really done much with static websites before this. Saying that I did notice some odd results with both Hugo and the tutorials I read.

1. In all the tutorials, they suggest naming your buckets after your CName address. This isn't needed. It only helps for the disambiguation of buckets. 

2. The OAI method to secure the S3 bucket works, but only if you use dirty URLs. This is because the CloudFront distribution origin *seems* to only allow you to use OAI when you put in a S3 REST address rather than the web address. Which makes sense. But it means as you read this I'm relying on the URL saying ....this_site/site3.html so that the navigation via the webpages turns into a complete REST request. URL's such as this_site/site3/ where Hugo drops the .html via using an index.html file don't work as REST requests. The request to CloudFront then becomes .../site3/ and that's not a resource that's displayable.  

```
#Folder Paths for Hugo URLs, 
#dirty
/this_site/site3.html   #what you see
#clean
/this_site/site3/index.html
/this_site/site3/       #what you see
```

IF you're reading this AND the URL for the page still says site3.html. You can delete the html and make a request to see what happens. You should get the error page that CloudFront presents as a HTTP 400. It's actually throwing a HTTP 403 error against the resource which isn't there.   
If the file was being presented by S3 acting as a webserver it would present the index.html without showing the file name or extension. 

3. I may need to pivot back to having an S3 bucket acting as a webserver. I just need to see how far I can get with Hugo and OAI and S3 as a REST container.

Where I'm really at is....I don't care enough about URLs to push to present them *clean*. IMHO This is one of those topics in tech like, tabs vs spaces and the glory of functional programming, that's just a tar pit of opinions. It only leads to going around in circles. 

I do care somewhat more about security. Trading clean URLs for dirty ones is a small price to pay in order to make everyone come through the front door.

...

And with that, it's now time to start work on responsive images.

---
This tutorial has some of the steps I followed for the OAI stuff.
[How do I use my CloudFront distribution to restrict access to an Amazon S3 bucket?](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-access-to-amazon-s3/) 

[Diagrams.net for the pictures](www.diagrams.net)




