---
title: "ML, Graphs and the ASGS"
date: 2020-10-17
draft: true
---

**The problem**

A friend of mine recently had a dataset provided to her that had statistics in it at the SA3 level. The work she does focuses on information based around  Suburbs and Local Government Areas. This SA3 data created a question for her. What Suburbs exists in what SA3's?  It's suprisingly difficult to answer this question quickly. In her case She needed an answer to this, because regular people who drive out to places, they don't go to SA3's. They go to suburbs and towns.

I've written in other posts about the ASGS and non ASGS regions and how they sort of overlap.  
The ABS has this big long article about the ASGS which is useful to read and understand if you deal with this stuff. [The ASGS](https://www.abs.gov.au/websitedbs/D3310114.nsf/home/Australian+Statistical+Geography+Standard+(ASGS)). 

Anyway, the ABS provides correspondences and allocation files which essentially create links from one boundary to another via big long spreadsheets. My friend solved her problem with one of these files. I helped, mostly by knowing the location of the files on data.gov.au. But it wasn't super easy information to find, and there was a Suburb -> Meshblock -> SA1-> SA2 -> SA3 matching process that she had to do with excel.

*cracks knuckles*

**Time to unleash the power of machine learning**

Kidding, the title was click bait. There's no ML in what I'm doing here. The ASGS will be present, but no ML. Just plain ole regular graph and tree traversal algorithms. Sorry :P

First I've got to find the data. And my god, it's very, very tricky to find ASGS allocation files. Usually, you'd head to ABS to find these things. But now they live on data.gov.au. I didn't save the link when I help my friend out and it was actually pretty hard finding them again a second time.

Im zeroing in on the 2016 areas for fun. Which can be found here. [ASGS Allocation Files (2016)](https://data.gov.au/dataset/ds-dga-d056f2ed-faa7-4140-b950-6cccfb72e3fd/details?q=asgs%20(2016)). 


**Starting**

I'm using Golang for this work. And everything should be in this repo [asgs-co-tree](https://github.com/gabesargeant/asgs-co-tree/).

The Node! The main idea with a tree or list data structure is the node that holds thing 'thing' in the list. I actually like Golang for not having generics and am happy to roll my own structures for this work.   
This is what I started with.

```
//AsgsRegionNode One region in all the regions, Let the nodes begin!
// This is a doubly linked node. ie it points up and down.
type AsgsRegionNode struct {
	RegionID      string
	RegionName    string
	LevelType     string
	LevelIDName   string
	ParentRegions []*AsgsRegionNode
	ChildRegions  []*AsgsRegionNode
}
```
My intent is to use this structure to create two tree's that join on the terminal leaves they share, ie MeshBlock regions. Something that looks like this. 
{{<image name="tree.png" alt="the parts of the ASGS I'm interacting with for this little side gig.">}}
Note, the dotted lines are not included in the tree. Whilst Suburbs and postal areas fall under states, I haven't segmented them that way. As this graph doesn't have nodes that point at different types of children. If I did make those dotted lines solid in my program, the effect would be that an instance of a State Node would have up to three different region types under it. Because I'm not using a interfaces and instead using just a single generic node for all objects I'd need to do extra work, for little benefit right now. I'm happy with this little short fall in the project.

**Tree Construction**

The allocation file has 75 columns of data and about 390K rows. It has a lot of repeats for non meshbock information. This is unfortunately the only way you fit hierarchy information into a square file. So it ends up looking like this:
```   
MB(1) -> SA1 (X) -> SA2 (A) ->  SA3(H) -> SA4(P) -> STE(ACT) --> AUS
MB(2) -> SA1 (y) -> SA2 (A) ->  SA3(H) -> SA4(P) -> STE(ACT) --> AUS
MB(3) -> SA1 (z) -> SA2 (B) ->  SA3(H) -> SA4(P) -> STE(ACT) --> AUS
MB(4) -> SA1 (A) -> SA2 (C) ->  SA3(I) -> SA4(Q) -> STE(QLD) --> AUS
```

Each row contains relationship information on 1 unique Mesh block and every region that it relates to. From that I can infer that all the other regions also relate to each other in that same row. 
In the very simple example above. The forth entry. Mesh Block 4, exists in SA1 A and up and up. 
To build up the tree of nodes I wrote up some state information into a few helper arrays in a second go file. [co-tree-default.go](https://github.com/gabesargeant/asgs-co-tree/blob/main/co-tree-default.go). This information is about what columns are of interest in the csv file, and what order I should build up the nodes from a row of data. And then some extra helper stuff.


















