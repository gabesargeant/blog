---
title: "Ray Tracing in 'one' weekend - 01"
date: 2021-05-07
draft: false
---

If you're looking for a good way to eat up time and learn all sorts of great 3d math, then I highly recommend [Ray Tracing in one weekend](https://raytracing.github.io/). I think the title holds up well. If you used all 48 hours of one weekend you could do it. Or, that could just be me. YMMV. 

My folly started when I tried replacing c++ with Golang. I had two goals, 

1. Write a ray tracer. (Easy right, just no dramas at all with this.)
2. Bed down more Golang. 

I failed at both :D

It's been going medium ok, so far. At the moment something is wrong, something with materials and colors. 

{{< img src="attempts.png" alt="my significant no segfaulting attempts so far.">}}

The last picture, of the darkly shaded red and yellow ball is more closely correct than the two before it. Whilst the two before it look cool. I wasn't trying to do the glass effect, it just happened... 눈_눈

Anyway, I broadly understand the problem. The first issue was starting this in the first place. :P. 

Actually, the real problem is probably that I was following and older PDF guide, which was version 1.54, the website I *didn't* follow is at Version 3.2.3 as of 2020-12-07. Also, I think there's probably a big bug in the program where I kind of went off script and stated using the multiple return values that golang allows. 

I guess that's how you learn!



