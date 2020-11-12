---
title: "Graphs and the ASGS - Part 2"
date: 2020-11-05T21:11:36+11:00
draft: true
---

Before you read this, read what came before this. [Graphs and the ASGS Part 1.]({{< relref "/posts/graph1/index.md" >}} )

So... I Got slightly distracted by the 2020 election. Who didn't!. I think I watched like 96 hours of CNN. Won't be doing that again for ~4 years.
This was a super helpful distraction because this little jaunt into the ASGS has kinda turned into a tiny bit of a death march. Anyway, I think I have a way forward.
    
**General Approach.**

I'm going to build two graphs. Or two tree's which I will join onto mesh blocks forming one graph. 

All have a trunk at the Australia level, but one is the ASGS the other is Non-ASGS regions. 

They join at the leaves. 

I then need to create a process to walk the graph and build objects that show those pathways between each of the non-ASGS to ASGS.

The POA and SSC areas are roughly like SA2 in sizes, both in population and physical space. Though in Australia you can find an example that breaks every rule. Because of this general similarity I'm going to omit outputting the Mesh Block and SA1 levels. Rather, I'd like to abstract them into SA2's as references that show the chain.

{{< image name="asgs.gif" alt="Gif of the building a node and relations via the ASGS">}}

**Thoughts so far**

I usually write this stuff late at night and also think about the problems fairly late. And that's the reason why I totally blanked on the fact that the child regions for the State of NSW is everything in NSW. And that's a really dumb thing to try and capture in an single object. In that above GIF the bottom up search works because you're going up. But if you search down on the ASGS side, because there's nesting you end up with a ton of objects. 

I think I have rediscovered the reason for pointers and databases. Sigh. 

**Revised plan**

I'm going to make individual nodes, that know their parent and their direct child but nothing beyond those direct relationships. 
I'll spend the $5 bucks and put it all in DynamoDB, and wrap a lambda function onto to expose another endpoint avoid Api Gateway.

Now to ponder the indexes...







