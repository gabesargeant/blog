---
title: "Actually building this site"
date: 2020-08-27
draft: false
---

## Getting this all setup. 

If you read my first post about getting into static site development from about a week before this one you'll get a good laugh. Or I did. I've pretty much made every mistake I could and most of those are related to my not RTFM.

All in all, AWS is like lego, and very easy to chop and change things when you make spelling mistake, register a top level domain that isn't supported by AWS etc etc. 

All the errors I made listed out.

* I Badly named the git repo whn setting up. fixed.
* I wrongly assumed that the top level domain .dev would be supported by AWS. it's not. So there $18 dollars im not using soon. If it gets support within the next year, I'll be adding porting it over. Otherwise :/
* I did almost all the config for setting up the site using the .dev TLD. This included creating AWS resources and ID's with that TLD in them.[long sigh]. So I got to do everything twice. 
* And last but not least I built a wrong SSL cert, firstly one that only supported the www. 

If your thinking, *Gabe isn't this your job*. I will happily defend myself with the explanation that doing infrastructure work isn't my core job. And I got there in the end.

In setting everything up I followed two guides, [1](**1**) and [2](**2**)

It was very easy. I didn't pull my hair out at all. The mistakes I made were more fun that anything close to a real issue.

A few cool take aways:

1. Everything is cheep cheep cheep. 
1. Everything is single purpose (I'll go into this more)



**Bare redirect thoughts**


**1** [David Baumgold - Host a static site on aws s3](https://www.davidbaumgold.com/tutorials/host-static-site-aws-s3-cloudfront/#redirect-bare-domain-to-www)
**2** [Configuring a static website using a custom domain registered with Route 53 ](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html)


