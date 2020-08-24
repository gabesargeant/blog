---
title: "Geospatial visualizations, on the fly"
draft: false
date: 2020-08-20
---

## [Map Tool](/posts/csv2map/map.html)  

is a simple-ish, and speedily built one page map visualization tool for taking a some CSV data and 'joining' it to a map. The result is Thematic mapping which is pretty cool and when done correctly is always a crowd pleaser on the web. 

Truthfully the tool I wrote is pretty janky. However it's MVP and no one using the Map part of the project is peaking at the soup of jquery under the hood. 

**Map Join**

The really powerful part of this visualization is the Map Join that occurs between a CSV data and the Shapefile. 

![Example of the Tool](/posts/images/csv2map/mapjoin.jpg)

This is the tool in Action. 

**Base Map limitations**


![Join on shared field](/posts/images/csv2map/mapjoin2.png)

The CSV Join needs a field that is supplied by the Layer from the Map Service.
In the Example and the tool I built it around Post Code. Which in Australia is a 4 digit number. 

Suburbs, Electoral Division and other locales in Australia such as the Australian Statistical Geographic Standard (ASGS) have codes associated but they have a slightly higher barrier to entry. 

It's important when thinking about what the join field will be if you're like me and always use publicly exposed map servers. 
If you own the server then you have a lot more control over the fields that are in the exposed layer. But editing Shapefiles is it's own whole big thing that I don't really dip into anymore.

**Level of detail limitations**

Below is a map of the east coast of Australia with the red lines representing the boundaries of local suburbs.
It's a pretty clear illustration of why it's hard to visualize data on a map in Australia.

The key points are:
1. Australia is really big. [Explore it's true size](https://thetruesize.com/#?borders=1~!MTcwOTAyMjA.NzU5MTU0NA*MjYxMzUxNTQ(OTQxODM1Nw~!AU*MTQ4MjA2Mjk.MTMwOTQzNDY)Mw)
2. It's sparsely populated.
3. Where there is population it's usually dense in a cbd but then fairly evenly spread out in the surrounding city.
4. Where Australians live they spread out, but in the context of their whole country they're really close together.

Points 3 and 4 seem contradictory, but if you want to visualize Australia, the nature of our cities and rural divide make it hard. Whereas visualizing numbers across a city is pretty simple, but you loose the geographic context of the city to country because you have to zoom in.

![The important half of Australia with it's suburbs drawn on it](/posts/images/csv2map/lod.png)

All of those points conspire to make it tricky to do visualizations about Australia. You need to create a map that gives you context, so you can recognize it. But you also want the ability to compare places far away so you can see the difference between two cities like Sydney amd Melbourne whilst still understanding their relationship to their local environment.

![Australian Election Map](/posts/images/csv2map/aus_election.png)


Countries where the population has spread out into the countryside over centuries are easier to make impactful visualizations with. A great example is comparing the USA and Australian election maps. In the US you can see the whole country and there's enough people in the regions that a county level map gives you a good break down that is both reasonably understandable and readable on a screen. 

![The important half of Australia with it's suburbs drawn on it](/posts/images/csv2map/us_election.jpg)


Level of detail is a tough-ish problem. It's made especially harder when you want to do anything dynamic as you can't anticipate what a users is going to do with any tools you build.

---
1. Crop of Stat Suburbs Maplayer From: https://geo.abs.gov.au

2. Aus Election Map: [Reddit.com MapPorn](https://www.reddit.com/r/MapPorn/comments/bq6umo/provisional_results_of_the_2019_australian/)
3. US election Map: [Wikipedia](https://en.wikipedia.org/wiki/1928_United_States_presidential_election)