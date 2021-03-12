---
title: "Graphs and the ASGS: Part 3 - Abandon all hope ye who enter here."
date: 2021-02-22
draft: true
---
{{< img name="inferno" alt="Picture of the 9 levels of hell from Dantie's Inferno">}}
<!--more-->
**Here's what I wanted to do .**

I wanted to grab all the regions in the ASGS and build a tree, actually a graph like structure in memory that I could preserve on disk in a serialized format. 
I'd hoped that I'd be able to do this, and still keep the size small enough so that I could package it in a really tight AWS Lambda function.
Ths would have then been fronted by API Gateway. 
And then I'd be able to do all sorts of nerdy things with it. 

**What happened?**

Well, not what I intended...

All of the Statistical Regions, ASGS or not, exists in Australia. So at their lowest level, they all sit ontop of SA1's or Meshblocks. 
This kind of creates a weird diamond shaped graph. Where the ASGS is a tree, with Australia at the top down to the meshblocks. If you then link on the Suburbs, or Postal areads, They exists in Austrlia, They also exist inside the States, And sometimes they exist in or overlap an SA1,2,3 or 4. So they have relationships there. But importantly they all exist ontop of meshblocks. 

I had this idea, I could build a tree, then build another, and another. But share the obejcts and just stamp out this network into memory. This sort of works with pointers, but not with structs. But with structs you can write it out into JSON. With pointers you get cyclic dependencies that cause panics. 

I should have done many things, including write a function that copied the shared elements. Denormalizing the informatin in the graph. But I didn't. Mostly because I'm not winning here, the CSV is still crushing me in performane and compactness!

Anyway, it turns out, golang is actually tricky when you go deep a few times with maps. I think generally the best practice, which I was not doing here, is to keep things as flat as possible. 

There were maps, lots and lots of maps. And in golang, with VS Code these turn out to be a pretty difficult to reason about. But they were a good way to bed down some of the basic syntax and features of golang.

```
//there was a lot of 
mapOfRegions := make(map[string]map[string]Region);
```

A tried a few different ways of building this complex graph and ended up with a really complex, directed graph that had child nodes holding references to all their parents. It was good fun building graph traversal functions, but I didn't get to where I wanted. This is probably on the upper limit of what is sensible to attempt to put in a lambda function. 

**Lastly**

If I get energetic and decide to make a part 4 to this project I think I'll start with a map. There's a certain element to this where a front end app will probably deliver a better outcome. maybe....








