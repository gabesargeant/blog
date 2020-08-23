---
title: "Building this site"
date: 2020-08-23
draft: true
---

This is an early rundown of where my thinking is with this little project. 

**Hugo**  
This will be the main driver. 

**Themes**  
I've based this on [smol](https://themes.gohugo.io/smol/)
However I've already started modifying it.
I know I'm going to change it over time but the smol theme was a good start as the options at https://themes.gohugo.io/ were a little overwhelming. 
Smol is basic and works on everything so it gets the tick for not being a drama. 

**Setting up the git repo.**  
I've already made mistakes here. I called the repo gabrielsargeant and my github account is gabesargeant. This results in me having two folders called the same thing in when I clone the repo. 

I'll fix this.

But generally things when fine with creating the repo. I made a bare repo on github and pushed my local branch branch up. 

The usual:  
   
    $git remote add origin https://etc.
    $git push -u origin master

Im not expecting any branches ever. I'm also not sure what I'd do with a Pull Request if I were to ever get one. Probably for spelling I'm sure :/

The git ignore was easy, I've opted to just store the essentials content. Some folk suggest tracking the Hugo /public/ folders in git to always have a rollback for the site. I personally don't like the cruft. 

**The deployment pipeline I'm thinking about**  

1. Run the deploy script. 

No next step, everything happens from there :)

With a bit more detail I'm thinking it will look like. 

1. Run deploy script. Which does:
    1. Git clone on current repo
    2. hugo build
    3. s3 copy of /public dir to s3 location
    4. That may be it. 


The unknowns at this stage are how I deal with Cloud Front on AWS and S3, and https and certs and DNS names for the domain. 

It may be easy but it feels like i'll need to consider how much i mess around with DNS names and any delay that may impose on a process. As I'm inclined to just build a new everything from the ground up and deploy. 

I'm sure this will be an ongoing piece of work/fiddling. 

Oh for added fun, I'll write it in go to use the AWS Golang SDK, which I have feelings about.

**Network Architecture.**  

![How This site will look on the network](/posts/images/site_1.png)


**Publish plan**

Whenever I want. with no thought given to maybe the 1 other person who may ever read this site.


**What git is in context of the deployed site**
I'm just going to toss everything into git as best I can. 
Save for passwords and AWS credentials.  ;)

I think I will deploy fairly regularly, I expect i'll use the draft feature of Hugo here. 


