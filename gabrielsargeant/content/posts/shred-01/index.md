---
title: "Image unshredding: Part 1 - shredding images"
date: 2021-07-07
draft: false
---

On the Orange site of infinite distractions I saw this great post about reconstructing images that had been shredded.  

I really like these sorts of challenges. Like mapping and ray tracing, this is a visually engaging challenge. 
Thought I do enjoy getting backend magic to work, it's just a little nicer to do stuff with graphics that provide a quick feedback loop.

 - [Image unshredding using a TSP solver](https://github.com/robinhouston/image-unshredding) and,  
- [the Hacker News thread about it](https://news.ycombinator.com/item?id=27713441)

There's a few ways to do this so I'm just going to try and see where I get to.


# The image I'll be destroying, and then trying to put back together

{{< img src="firstImage.png" alt="The starting imagestockstock" >}}

# Once Shredded

{{< img src="_shredded.png" alt="The image after shreadin" >}}

# How I did the above.

The basic process is, 
0. Read the image into a buffer.
1. Get the image width.
2. Fill a slice with that range of numbers. 
3. Randomly shuffle them. 
4. Write the image out in the shuffled order.

# And all the king's horses and all the king's men Couldn't put that image back together again.

So for my first crack at this I simpily tried to create a score for each column in the image. And then select the column in the 0th positon in the shredded image and try and find the next column with the least ammount of difference in it's score. 

I tried a few different permutations of adding, multiplying or subtracting or modding the RGBA channels to create one single number per column. My hope is that these calculations would extend the difference between each column enough that they'd sort into similar groups.

This didn't work. But I got some pretty good results as a start.

This is what I'd describe as gross scoring. You can kind of see the tree and make out parts of the lake.

In this image I was scoring with just the green and blue channels. 
{{< img src="g+b.png" alt="One of my early attempts putting the image back together" >}}

And with this one, I subtracted the green channel from red and modulo-ed that result via the blue channel.

{{< img src="r-gmodb.png" alt="And another" >}}

# This was a pretty good learning experience.

The idea is pretty solid I feel. 

I think the big take aways are that using a score from one whole column is not going to work. 