---
title: "The Zen-like sand garden of constantly tweaking this site."
date: 2020-11-30
draft: false
tags:
- AWS
- Hugo
- This Site
---

Small Update to the sites hosting. I've been pondering about the 'hackers' that are going to find my not well hidden public S3 bucket. 

What will they do with it in it's read-only form?

Will they make hundreds of thousands of non-cached requests against my content in an attempt to make me pay a few extra dollars..... Who knows. 

Considering the awful possibilities. I, like a professional, put on my IT Security Hat and started thinking.

{{< img src="SecurityHat.png" alt="Propella Cap Security Hat">}}




In my previous post **[Rebuilding this site again.]({{< ref "/posts/this_site_3/index.md" >}})**. I was lamenting the difficulties I was hitting with using S3 as a private REST bucket. I can't actually remember what tipped me over the edge. But something made me roll back to just having a *insecure* origin for a while. I think it was how errors were being handled.

Anyway, Long story short. My S3 origin is a webserver again. And it's secure enough.

This image captures the main thrust of the setup.

1. The users go to CloudFront. 
2. CloudFront stamps a key on the request to origin.   
    [Adding Custom Headers to Origin Requests](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-custom-headers.html)
3. Origin only accepts request with that key.  
    [Amazon S3 Condition Keys](https://docs.aws.amazon.com/AmazonS3/latest/dev/amazon-s3-policy-keys.html)

{{< img src="site5.png" alt="Diagram of this sites setup. Cloudfront, fronting S3. With an access policy and a custom dropped in header to act as an API key.">}}

If you try and go direct to the bucket, if you don't have the header with Referrer or any other key you specify. Then you get a 40X Auth error.

The S3 bucket policy looks like this. Nice and simple. GET Requests only. And the header restriction.

I just used a GUID generator to make a ~50 character long string that I'm using as a key. 

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-bucket-of-website/*",
            "Condition": {
                "StringLike": {
                    "aws:Referrer": "magic-long-number"
                }
            }
        }
    ]
}
```
I can't think of a reason to change it past this point. So...

{{< img src="chapter.png" alt="Homer Simpson, thats the end of that chapter.">}}
