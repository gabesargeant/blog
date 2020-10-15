---
title: "Building this site with Hugo. Updates"
date: 2020-08-31
draft: false
tags:
- AWS
- Hugo
---

**How I chose Hugo**  
...wait for it...  
I read somewhere Hugo was a static website generator... That's it.  
I also think I also read that it was written in Go.
I'm usually more choosy about things, but I like Go. And importantly I don't know what I don't know yet. So I can't make a bad call with picking a static site generator.

**Impression so far**  
I've been a little out of the loop on what's important to people on the internet for a while. It seems to me like Url prettiness is high up there. I have a lot of files named index.md and a lot of folders. I'm not sure how I like using folders as the main indicator of what the content is contained within. I was more hoping to have one big soup of .md files. But I'm open to new ways of doing things. As with any tool like Hugo, there's probably a way around this issue. But it just feels awkward at the moment. 

**Url prettiness and AWS**  
In my previous posts on this site, I wrote about the different ways to setup S3 buckets with cloud front. Due to my desire to have responsive images I've had to flip back to using the classic 'S3 as a web host' method. It's not my most favored way of doing things. I mainly have to do this as a result of how Hugo structures URLs and the requirement for Index.md files to make content discoverable. As such the URL for this site is  
```../posts/this_site_4.html```  
its resources are actually  
```..posts/this_site_4/index.md```  
I really would have liked to structure things a little differently. If it's possible and I'm not far along, I may have a crack at a refactor.

**AWS so far**  
Really easy and no drama. No real complaints. But I appreciate if you also had to learn that, this process may not be that simple.

**Learning Hugo so far**  
I've found a few things tricky. Hugo documentation is a little rough and very 'happy path'.
I started out with no idea at all about how I wanted to structure my site. And the Hugo doco doesn't really support that type of user too well. In addition to this Hugo's extensive support for a lot of options is a bit of an anti-pattern in some ways. 
I think if it shipped with a clean quick start theme that had some pretty complex features such as responsive images then I would have been happy to start there.

What I'm trying to ask for is someone else solve all my problems. Yeah, that one. :P

While the Hugo theme library is good. It's not easy to be able to make a well-informed decision about a theme and what they may lock you into. 

I know I decided to start simple and get more complex on my own. However, being able to roll out the gates with something complex but correct would also have suited me. This is not to say that the themes at Hugo are bad or not correct. It's just highly extensible software always adds a layer of complexity.

**In the end**   
Everything was easy enough. Hugo's simple and I'm on the net. I'll keep building and writing and see where things go.
