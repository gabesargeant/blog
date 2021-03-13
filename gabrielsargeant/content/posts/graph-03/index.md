---
title: "Graphs and the ASGS: Part 3 - Abandon all hope ye who enter here."
date: 2021-02-22
draft: false
tags:
- Graphs
---
<!--more-->
Before you read this, read what came before this. [Graphs and the ASGS Part 1.]({{< relref "/posts/graph-01/index.md" >}} )

{{< img src="inferno.png" alt="Picture of the 9 levels of hell from Dantie's Inferno">}}


**Here's what I wanted to do .**

I wanted to grab all the regions in the ASGS and build a tree, actually a graph like structure in memory that I could preserve on disk in a serialized format. 
I'd hoped that I'd be able to do this, and still keep the size small enough so that I could package it in a really tight AWS Lambda function.
Ths would have then been fronted by API Gateway. 
And then I'd be able to do all sorts of nerdy things with it. 

**What happened?**

Well, not what I intended...

All of the Statistical Regions, ASGS or not, exists in Australia. So at their lowest level, they all sit ontop of SA1's or Meshblocks. 
This kind of creates a weird diamond shaped graph. Where the ASGS is a tree, with Australia at the top down to the meshblocks. If you then link on the Suburbs, or Postal areads, They exists in Austrlia, They also exist inside the States, And sometimes they exist in or overlap an SA1,2,3 or 4. So they have relationships there. But importantly they all exist ontop of meshblocks. 

I had this idea, I could build a tree, then build another, and another. But share the objects and just stamp out this network into memory. This sort of works with pointers, but not with structs. I hit a lot of issues with pointers and cyclic dependencies issues that cause panics when trying to pump out a serialized graph. 

I should have done many things, including write a function that copied the shared elements essentially denormalizing the information in the graph. But.. I didn't. Mostly because I'm wasn't winning here and it wasn't fun. It actually started to feel a bit like work 눈_눈 . 

Anyway, I give up with the source CSV crushing me in performane and compactness! Tip of the hat CSV, you win again. 

It sort of looked like this in the end. And it worked, but it didn't fit into a reasonable amount of space. 

{{< img src="dgraph.png" alt="Picture of the uber complex graph I tried to build in memory">}}

**A couple of notes**

There were maps, lots and lots of maps. And in Golang, at least with VS Code these turn out to be a pretty difficult to reason about. They were a good way to practice and bed down some of the basic syntax and features of golang.

Anyway it turns out, Golang is actually tricky (for me) when you go deep a few times with maps. I think generally the best practice, which I was not doing here, is to keep things as flat as possible. 

```
//there was a lot of 
mapOfRegions := make(map[string]map[string]Region);
```

A tried a few different ways of building this complex graph and ended up with a really complex, directed graph that had child nodes holding references to all their parents. It was good fun building graph traversal functions, but I didn't get to where I wanted. This is probably on the upper limit of what is sensible to attempt to put in a lambda function. 

**Lastly**

If I get energetic and decide to make a part 4 to this project I think I'll start with a map. There's a certain element to this where a front end app will probably deliver a better outcome. maybe....

---
Notes:  
1. Graphviz for the cool graphs! [Graphvis Visual Editor](http://magjac.com/graphviz-visual-editor/)
