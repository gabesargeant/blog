---
title: "Responsive Images and Hugo...again!...Never again!"
date: 2020-11-30
draft: false
tags:
- Hugo
- Responsive
---

This week on "Things that seem simple, yet are really tricky", Gabriel gets twitchy and decides to get down "into the weeds" with responsive images and Hugo short codes. Oh, what regrets he has.....
<!--more-->

**The problem**  
I didn't like how the images on the site were scaling on mobile. Generally there was a point where images at some 'scale' would just look very very bad. 
This was an effect of both the resize sizes of my old solution and CSS effects. You can read about what I did here. [Somewhat simple responsive images with Hugo]({{< ref "/posts/respimg/index.md" >}})

**The newer solution**  
I pretty much followed these two blog posts. I used SteroBooster's solution. But Laura's blog was also useful for a few little tid bits that I had difficulty with.

This blog, [stereobooster - Responsive images for Hugo](https://dev.to/stereobooster/responsive-images-for-hugo-dn9)  
And this blog [Laura Kalbag - Processing Responsive Images with Hugo](https://laurakalbag.com/processing-responsive-images-with-hugo/)

The coolest thing I learnt in this process was about using a a base 64 encoded image as a background placeholder. Though getting the alignment right between the image and the background. That wasn't fun.

The only big issue I hit was a path error. Hugo doesn't like capitals. Or some part of the image preprocessing pipeline doesn't like capital letters in the project path. In the error below the **referenceproject** path is made lowercase by Hugo. Which is really odd, especially considering the Documents folder isn't an issue. 

That's probably a bug worth submitting to the Hugo team. Though it still could be user error. 

```
~/Documents/git/blog/gabrielsargeant$ hugo
Start building sites … 
Total in 78 ms
Error: Error building site: "~/Documents/git/blog/gabrielsargeant/content/posts/referenceProject/index.md:28:1": failed to render shortcode "img": failed to process shortcode: execute of template failed: template: shortcodes/img.html:29:11: executing "shortcodes/img.html" at <imageConfig ($src.RelPermalink | printf "content/%s")>: error calling imageConfig: open ~/Documents/git/blog/gabrielsargeant/content/posts/referenceproject/generic_network_layout.png: no such file or directory
```

 I think I've had this problem in the past. Anyway, reference**P**roject needed to be referenceproject for the updates to work. That's done. But it took me about 2 hours to spot that capitalization issue. (¬▂¬)
 
 I've retired the **image** shortcode I wrote about in part 1 and replaced it with the **img** one from the two guides above. 
 
 **Stuff that's still tricky**

 Gif images still remain a challenge. When they are resized their animation isn't scaled. Only the first frame of the Gif. 
 I'm not sure if I'm going work to fix this. For the time being I can handle the limitation.
