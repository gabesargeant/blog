---
title: "Image unshredding: Part 1 - shredding images"
date: 2021-07-07
draft: false
---

On the orange site of infinite distractions I saw this great post about reconstructing images that had been shredded.  

I really like these sorts of challenges. Like mapping and ray tracing, this is a visually engaging activity. 
Though I usually do enjoy getting backend stuff to work, it's just a little nicer to do stuff with graphics that provide a bit of visual feedback.

 - [Image unshredding using a TSP solver](https://github.com/robinhouston/image-unshredding) and,  
- [the Hacker News thread about it](https://news.ycombinator.com/item?id=27713441)

There's a few ways to do this so I'm just going to try and see where I get to.


# The image I'll be destroying, and then trying to put back together

{{< img src="firstImage.jpg" alt="The starting imagestockstock" >}}

# Once Shredded

{{< img src="_shredded.jpg" alt="The image after shreadin" >}}

# How I did the above.

The basic process is

0. Read the image into a buffer.
1. Get the image width.
2. Fill a slice with that range of numbers. 
3. Randomly shuffle them. 
4. Write the image out in the shuffled order.

# And all the king's horses and all the king's men couldn't put that image back together again. Damn...

So for my first crack at this I simpily tried to create a score for each column in the image. And then select the column in the 0th position in the shredded image and try and find the next column with the least amount of difference in it's score. 

I tried a few different permutations of adding, multiplying or subtracting or modding the RGBA channels to create one single number per column. My hope was that these calculations would pronounce the difference between each column enough that they'd be easy to sort into similar groups.

This didn't work so well. But I got some pretty good results as a start.

This approach is what I'd describe as gross scoring. You can kind of see the tree and make out parts of the lake.

In this image I was scoring with just the green and blue channels. 
{{< img src="g+b.jpg" alt="One of my early attempts putting the image back together" >}}

And with this one, I subtracted the green channel from red and modulo-ed that result via the blue channel.

{{< img src="r-gmodb.jpg" alt="And another" >}}

# This was a pretty good learning experience. As a start.

The idea is pretty solid I feel. I will continue with this approach with a lot of refinements.

I think the big take away was that using a score from one whole column is not going to work. 
But I don't want to have to compare all the pixels in column to all the other pixels to find a match. I think I can probably cut the image in half or quaters and use the same scoreing approach to find closeness.

On reflection, I think this approach is actually pretty sensible. When you study photography comosition, there's a few rules around balance and the like. The rule of thirds jumps out from memory. So I expect that in most photos the central third will contain similar gradients and the same for the top and bottom.

Anyway, I'll move forward with that assumption and build the next iteration of the unshreader that looks at a band of pixels. develops a score for them and then finds their nearest neighbor. 

I expect this to be a pretty successful approach. What I know will be an issue is that the image will start and stop in weird chunks. But I have an idea about that too. Something like, looking for the greatest difference between to columns and using that as a signal that there's a break in the image a that locale.

But that's firmly a future problem to solve.