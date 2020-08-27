---
title: "Rebuilding this site again."
date: 2020-08-27
draft: false
---

I deployed this site to the web on the 26th. And before that day was over I was already in the AWS console ripping it to shreds. 

This is a picture of the network exposed surfaces.
[todo draw a picture and place it here.]

Following the previous tutorials from AWS and Mr. Baumgold, I essentially ended up with a CloudFront distribution that people can side step. It's not easy but if they are willing to guess the bucket name (which is an easy guess), and then the region. Then they can interact with the website sans the CDN. Which isn't something I want to happen. 

I was thinking about this and pottered around google looking for ways to really dial up the security on my S3 bucket. Mostly just so if the timeline skips and I end up getting a ton of traffic to this site then I don't want to pay through the nose for it.

It seems others at AWS have already had this thought and come up with a nifty little feature called a **Origin Access Identity,** which acts like a FUID between a CloudFront distribution and the S3 bucket in the backend. 

Configuring it is pretty simple, however I was starting in the middle and working out, so It took me a bit of time to get it all right.

Thankfully I didn't need to mess around with any *Route 53* records I was able to just remove the origin domain from CloudFront that pointed to my S3 bucket that was acting as a website, and instead pointed the website CloudFront distribution at the website's S3 REST endpoint.

In addition to this I backed out all the S3 public read permissions and locked down the storage layer. This meant that only the Deploy user that hugo uses can write to the folder, and only the OAI cant make requests.

The very last thing I had to do was configure the root page to be index.html via CloudFront. 

I think in the future I'll write up a more detailed explaination of how it all hangs together.

---
This tutorial has some of the steps I followed. 
[How do I use my CloudFront distribution to restrict access to an Amazon S3 bucket?](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-access-to-amazon-s3/) 




