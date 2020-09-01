---
title: "My Reference Project Retrospective..."
date: 2020-09-02T00:33:16+10:00
draft: true
---
### A Python Flask Framework, MySQL DB, ArcGIS Javascript, Ubuntu Server, Nginx, Gunicorn service running on an AWS ec2 instance"
### Also implemented in PHP!

--- 

**A Reference Project is**  
My definition of a reference project is a simple or complex project that you the developer know how to solve and like solving. 
The goal of a reference project is act as a non trivial learning aide for new tech, or to push you to reach that next goal.

A common project is implementing something like a Sudoku solver every time you change languages to give you an idea of the basics on the new lang. 

A complex reference project I like is a web-mapping app that integrates with a database full of [Australian Census Data Pack data](https://datapacks.censusdata.abs.gov.au/datapacks/). 
Based on a users selection from that map the app provides them with a table of data and a thematic web map. 

A generic overview of this system looks like:

{{< image name="generic_network_layout.png" alt="the generic network layout for this web mapping reference project" >}}

**The Retrospective**

About ~3 years ago I built this app and it was hard work. I didn't know much python, or networking, or really anything. However, It was so much work and I was really proud of it that I've been paying about $1 a month to hang onto the EC2 that I put it all together on. 

The reason it's been such a long lived ec2 is that I kind of forgot about it for 1.5 years. I changed credit cards and forgot/ignored my AWS account. Which incidentally got cancelled for a period of time after I didn't pay my monthly $1 to keep that ec2 alive. :P  
I asked their support team for it back and they said "give us our $18 bucks". So I did and my account came back! Along with my favorite little ec2. Which I then ignored for about another year whilst work got busy. (If you can tell my childhood Tamagotchi didn't last long)

Anyway, as I plan on doing a bit more stuff with AWS now, I don't really need that ec2. So I want to preserve it's memory by documenting it. 

**A GIF of the App in Action**

{{< lazy_image name="dataandmaps.gif" alt="Gif Animation showing the program flow of my mapping reference application">}}

**The ABS Map Layers**


**The Database and all the gory CSV data**

1.How you get the Census Data Packs from the ABS

2.


**The API**

**The Front End**

**Hosting environment**





















---