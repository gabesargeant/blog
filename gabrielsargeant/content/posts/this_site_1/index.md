---
title: "Thinking about building this site"
date: 2020-08-23
draft: false
---

This is an early rundown of how I plan to get this site up on the web.

Firstly it's a static site. I've long enjoyed fast loading dense content that doesn't have a lot of bells and cruft. So figure I'll follow that path.

**Site generator** 
I'm going to use [Hugo](https://gohugo.io) as the base site generator.

**Themes**  
I've starting building this site off of the [smol](https://themes.gohugo.io/smol/) theme.
However I've already started modifying it.
I know I'm going to change it over time but the smol theme was a good start as the options at https://themes.gohugo.io/ were a little overwhelming. 
Smol is basic and works on everything so it gets the tick for not being a drama. 

**Setting up the git repo.**  
I've already made mistakes here. I called the repo gabrielsargeant and my github account is gabesargeant. This results in me having two folders called the same thing in when I clone the repo. [long sigh]

I fixed this.

But generally things went fine with creating the repo. I made a bare repo on github and pushed my local branch branch up. 

The usual:  
   
    $git remote add origin https://etc.
    $git push -u origin master

I'm not expecting any branches ever. I'm also not sure what I'd do with a Pull Request if I were to ever get one. I'm sure it would probably be for spelling ;)

The git ignore was easy, I've opted to just store the essentials content. Some folk suggest tracking the Hugo /public/ folders in git to always have a rollback for the site. I personally don't like the cruft of that and this blog isn't mission critical so i can handle an outage.

I also read somewhere about sites putting the hugo binary in the repo so you don't have issues if a base install changes. Again this isn't going to be needed. Smol is built on hugo ~20 and it's at version ~70 now. Im not expecting issues in this space.

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

It may be easy but it feels like I'll need to consider how much I mess around with DNS names and any delay that may impose on a process. As I'm inclined to just build a new everything from the ground up and deploy. 

I'm sure this will be an ongoing piece of work/fiddling. 

Oh for added fun, I'll write it in go to use the AWS Golang SDK, which I have feelings about. I've got another little project happenign that uses the Go AWS SDK with DynamoDB. And it was a hurdle to say the least.

**Network Architecture.**  

{{< image name="site_1.png" alt="How this site will look on the network,  A user interacting with AWS Cloudfront which connects to AWS S3">}}
As simple and cheap as possible.

**Publish plan**

Whenever I want. with no thought given to the one or zero other persons who may be reading this site.

**What git is in context of the deployed site**
I'm just going to toss everything into git as best I can. 
Save for passwords and AWS credentials.  ;)

I think I will deploy fairly regularly, I expect I'll use the draft feature of Hugo here. 

**What's left to do**
As of writing this, I've gotta build everything I've discussed here because I haven't made it past having Hugo on my laptop and a git account. 

There's going to be some Go code in my near future.

Also I've got to get the domain of my Name and a Https cert. Which I'm sure AWS will sell me.

I'll follow up with what actually happened.


