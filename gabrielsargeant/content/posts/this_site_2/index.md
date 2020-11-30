---
title: "Actually building this site"
date: 2020-08-26
draft: false
tags:
- AWS
- Hugo
- This Site
---

**Getting this all setup.**

If you read my first post about getting into static site development from about a week before this one you'll get a good laugh. Or I did. I've pretty much made every mistake I could and most of those are related to my not reading the f---ing manual.

All in all, AWS is like lego, and very easy to chop and change things when you make a spelling mistake, register a top-level domain that isn't supported by AWS etc. 

Here are all the errors I made listed out. Some may call this *development*

* I badly named the git repo when setting it up. fixed!
* I wrongly assumed that the top-level domain **.dev** would be supported by AWS. it's not! So there $18 dollars I'm not using soon. If it gets support within the next year, I'll be porting it over. Otherwise :/ I'm skipping a coffee from the shops for a few days to make up the loss :(
* I did almost all the config for setting up the site using the .dev TLD before I looking into porting it over. This included creating AWS resources and ID's with that TLD in them.[long sigh]. So I got to do everything twice. 
* Even if It was supported by AWS. Google who I registered with has a 'no transfers for 60 days policy' so that would have sucked. Though in reading about this I found out the .jp TLD for Japan has special rules around transfers that can only happen within a short window near the renewal/expiry date. Who knows why. And that 60-day limit may be a pretty standard thing. I'm not out doing DNS stuff regularly so I'll just roll with it.
* And last but not least I built a wrong SSL cert, a few times. Firstly one that only supported the www. so when I did the bare redirect everything started failing.

If your thinking, *Gabe isn't this your job*. I will happily say that doing infrastructure work isn't my core day job. Also, I got there in the end ;)

In setting everything up I badly followed these two guides, [1 & 2]( 
{{<ref "#links" >}})

Truthfully it was a very easy process. I didn't pull my hair out at all. The mistakes I made were more due to my rushing before dinner. They were fun to debug rather than anything close to real issues. However, I do expect if it was you're first time doing everything you'd find it very intimidating.

A few cool takeaways:

1. Everything is cheap cheap cheap at the scale I'm working at.
1. Everything is single purpose (I'll go into this more)
1. You can do almost ever step out of order with very little consequence. And that is in part due to the design of everything being single-use.


**Bare redirect thoughts**
One of the fiddly things in setting up the domain and DNS entries was handling the domain name.
There is www.gabrielsargeant.com and gabrielsargeant.com. 
They both point to the same resource. Yet in the instructions, you setup two CloudFront distributions, one for each, both have their own routes that map to their own like-named S3 buckets. It's at the bucket level that you then redirect traffic from one of the buckets to the other. Effectively handling the missing www. condition.
This seems odd by design. In my mind initially, it seems simpler to have a set of alias names at the DNS level that map N:1 content directory. 

**Deploy the content to AWS**  
Again. RTFM, Gabriel.   
Deploying is just a Hugo CLI command. I won't be writing my own upload tool right now.
All I have to do is configure the AWS SKD and make sure the IAM permissions exist correctly for the write to S3 for the website bucket. 

However! It's easy to write a sentence like: First I pick up the shovel, and then the mountain was moved. 

In reality, I hit a few bumps with using the Hugo Deploy.  

Firstly, I couldn't get my AWS CLI settings to work with the AWS CLI v1. It turns out when you call: **Hugo Deploy**, what Hugo does is try to establish an AWS session object. 

This is done via the AWS SDK that first looks for environment variables. Then looks for config and credentials files in the ~/.aws folder and then two other options which don't really make sense.  
[Hugo S3 Session](https://gocloud.dev/howto/blob/#s3)  
[AWS GO SDK - Credential_and_config_loading_order](https://docs.aws.amazon.com/sdk-for-go/api/aws/session/#hdr-Credential_and_config_loading_order)

Something wasn't gelling well with what I'd set up. I was catching a lot of errors that looked like this.

```
Error: blob (code=Unknown): NoCredentialProviders: no valid providers in chain. Deprecated.
For verbose messaging see aws.Config.CredentialsChainVerboseError
```

The use of the **~/.aws** folder worked previously for other Golang work I've done. In fact just using the AWS CLI with commands like:

```
aws s3 ls s3://www.gabrielsargeant.com
```
worked perfectly. But hugo totally blanked on picking up that config. 
Eventually I RTFM a few times over and noticed that the **AWS_SDK_LOAD_CONFIG** environment variable needed to be set to true for the AWS Golang SDK to work. 
Though, from memory It feels like I didn't need to do this in the past.

Anyway, I tried and that failed as well. So I just pivoted to ripping out the AWS CLI version 1, and installed version 2. 

Things didn't get better at this point.
Reading yet more documentation on AWS, I found 
[Environment variables to configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) Theres no mention of **AWS_SDK_LOAD_CONFIG** so that must be a Golang specific setting. I couldn't find doco that elaborated on it more than what was in the AWS Golang SDK doco.

After all of this. I eventually caved and just set my AWS account key and secret using **export** in my .bashrc file. And that worked easily.

So the lesson here was, nothing is simple and my persistence to avoid using exported environment variables only wasted time.


**Lastly.**
I decided to skip the mail redirect. If there's a free mail host out there that can stay free for a long time I'll maybe revisit this. But it's not going to be a felt loss at the moment.

In the future, I may have a go at templating and automating the whole process. Right now the deploy aspect is all that needs to be automated and that won't be much more than a few lines of bash consisting of a Hugo deploy and a git commit. 

___
### Links

**1** [David Baumgold - Host a static site on aws s3](https://www.davidbaumgold.com/tutorials/host-static-site-aws-s3-cloudfront/)  
**2** [Configuring a static website using a custom domain registered with Route 53 ](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html)


