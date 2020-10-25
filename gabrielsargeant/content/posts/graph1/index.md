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


**What I think I'm trying to build**

I think I want to build 
1. something to consume the ASGS and turn it a graph.
2. Create a search webservice that interacts with that graph.
3. And for that graph to be storable so I can then use it like database file elsewhere.

If this seems vauge, it is. Wish me luck.

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

Building up the graph was rather simple. 
the following pseudo code covers the main logic for building the tree.

```

nodeMap = new Map[string]node

for each row in the CSV:

	for each level in the LevelSquence:

		//for this level get the asgs code and name;
		regionCode = levelCodeMap[level]
		regionName = levelNameMap[level]

		//from the current csv row get the region id 
		//for this asgs level.
		//See if it exists in the node map yet
		region = nodeMap[regionCode]

		if region is empty {
			
			build a new region,
			and set it's name and code
			and level info
		}

		// Add children to this element.
		// from the ChildLevelMap get child of this level. 
		// ie the child of a SA4 is a SA3
		childLevelForThisLevel = childLevelMap[level]
		
		//Special case 
		//if the child is a MB then it's child is ""
		if child == "" {
				nodeMap[currentLevel] = region
				continue
		}

		//for this level get the asgs code and name;
		childLevelCode = levelCodeMap[level]
		childLevelName = levelNameMap[level]

		childRegion = nodeMap[childLevelCode]

		//For this child set it's parent region 
		//to be pointer to the region 
		childRegion.ParentRegion = &region

		//set the region's child.
		region.ChildRegion = &childRegion.

		//Put the node back in the map
		
		nodeMap[regionID] = region
```

**Saving the tree**
It was very quick to get this far with the parser and just generic file handling. 

When running the program before any of the search functionality I get the following timing from building the graph
```
~/Documents/git/src/asgs-co-tree$ time ./asgs-co-tree -i ASGS_2016_MBRD.csv 
Start
Attempting to read ASGS_2016_MBRD.csv 
Region Type: MB, size: 358009 
Region Type: SA3, size: 340 
Region Type: AUS, size: 1 
Region Type: SSC, size: 15286 
Region Type: LGA, size: 544 
Region Type: POA, size: 2668 
Region Type: SA1, size: 57490 
Region Type: SA2, size: 2292 
Region Type: SA4, size: 89 
Region Type: STATE, size: 9 
436232

real    0m5.935s
user    0m11.099s
sys     0m0.801s
```
It's obvious that the ~5 seconds is not an acceptable time to wait to consume the data file. I only want to do that once. I don't want to keep that structure in memory, or if I do get it into memory I want to lazily load it. 

**Saving the tree**

 [Golang GOB](https://golang.org/pkg/encoding/gob/) and [Golang JSON](https://golang.org/pkg/encoding/json/) all failed when I tried to write out those 436232 graph nodes to a file. I considered [Protobuf](https://pkg.go.dev/mod/google.golang.org/protobuf) but reading about it, I knew it would fail like the GOB package.

My initial idea was to just try and save 'memory' to a file, allowing me to then attach that memory back to a program at a point in the future. 

I should note, I don't often do a lot of manual memory stuff and was hoping this would be simpler than than my instincts were telling me.

Because the ASGS tree was essentially a ton of pointers. The way the GOB package serialized things meant that my design of having a double linked node, ie knowing about it's parents and children would create issues for the encoder. As each parent would encoded all of it's children and then all of it's parents recursively. How that works out is that every object would have an a copy of every other object. Rather than do this, the GOB package just errors out. And I learnt something new.

The error I got from the JSON package was Out of Memory, but it like wise had similar issues to the gob package. Initially this seemed odd considering people use massive json for everything these days. 

I tried a few things along the lines of removing all the pointer's from the nodes, and knocking out the parent links. This got the encoder to start writing to a file but also crashed out leaving a 1.7 gig json file as a partial output. 

From having a peak at the contents it seemed the removal of the pointers was a cause of this bloat (in addition to the json).

**Going for a walk with my dog**  

The next day I went for a walk with my dog, she enjoyed the walk, and so did I. I thought about the time complexity of recursing over the ASGS tree. 
Whilst I like having the *live* version with active pointers, storing it is complex. 

I know from talking with DB developers that storing tree like structures in a database requires careful thinking. Often you want to store associations in a way that has the least cardinality to maximize storage in a relational database. So for example, if a tree has node with only 1 parent, like a classic binary search tree, then you can store that tree in single table. The only thing you need to do is invert the "has a node" relationship and to make each child know it's parent instead of each parent know all their children. With this change, everything fits easily in a table.  
When you're reasoning about a tree on paper, you're usually starting from the top and working your way down, rather than building from the bottom up. Or at least most of my experience has been like this. Though my thinking is changing with experience.

Anyway, I walked and I thought. Eventually I thought instead of pointers, I could keep references to each child and parent region in arrays. 
 And I could stores the regions in a set of flat map objects. I pondered this for a bit but eventually....
{{< image name="imokwt.png" alt="I'm Ok with this, Comic from KC Greens's Comics">}}

 It's not rocket science, but I wasn't sure really what I wanted to do yet with the tree. 


 **Static references work.**  
 I implemented the tree to output essentially a giant map of node structs, each with references to its parents and children. I did switch to use maps rather than string arrays. This was to make use of the set-like features of maps. Thankfully, this worked, and was easy to do.  

 Thinking about how I want to put all this information into a service, I will probably end up using a storage layer like DynamoDB to hold the json. From my previous work with DynamoDB I know that the I want to create 'fat' objects. The idea behind this is to create a piece of data and then collect a constellation of similar data around it. This makes reads from DynamoDB richer, and make the client app less 'chatty' with the DB that is pay for request.

 As an example of this, In my mapping app I would return a table of data to the user and then let them slice and dice the topic locally before needing to request new content. In contrast to something like a regular Relational DB, where I'd probably lean towards making tighter calls for data due to how the query language works. 

 So what does a 'fat' or 'phat' ASGS node look like? I think it means having a lot of relative information locally present.

 **Step back and what me de-normalize**

 I think I am going to revive the pointer based graph, and use it to build up a set of output nodes for the whole ASGS. I'd like to produce an output node that contain their position in the ASGS and the names of all of their ancestors up and down the graph.

Doing this would allow me to jump levels and If I used a storage layer like DynamoDB. I could potentially have a query execute like.
```
Get Suburb 'Sydney' 
> returns the Sydney suburb node, with information about what Mesh Blocks are in it. 
Get those MeshBlocks
```
For all of those blocks I could then merge their parents to get a list of all of the large structures they exists in, so if the Suburb of 'Sydney' exists across two boundaries higher up, then it would be visible. And then making a jump up a level would be just 1 jump rather than multiple.

If I don't include all the parent information then I can't just merge the lists, I have to walk from each Mesh Block all the way to the Australia region at the top of the tree. Or bottom of the tree, depending on which way you draw things. :)

Anyway, I'll try that and see if it works.



