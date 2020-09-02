---
title: "My Reference Project Retrospective..."
date: 2020-09-02T00:33:16+10:00
draft: true
---
### A Python (Flask Framework), MySQL DB, ArcGIS Javascript, Ubuntu Server, Nginx, Gunicorn service running on an AWS ec2 instance
#### Also implemented in PHP!

**What a Reference Project is**  
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

{{< image name="dataandmaps.gif" alt="Gif Animation showing the program flow of my mapping reference application">}}



**The ABS Map Layers**

[The ABS - Australian Statistical Geography Standard](https://www.abs.gov.au/websitedbs/d3310114.nsf/home/australian+statistical+geography+standard+(asgs))
is pretty important to understanding the information that data packs contain. Simply put, every official boundary exists somewhere in a hierarchy in the above GIF you can see the POA layer, which is Postal Areas. They are non-official locations that don't fit too well into the official statistical boundaries. So to relate them to the standard you'd build them up from a set of statistical Mesh Blocks. 
Mesh Blocks being the smallest reporting area means that these areas can and do fit into no statistical areas.

Just for some rough sizes, There's 1 Australia, about 8000 Post Codes, 56,000 Statistical Area 1 and, over 400K Mesh Blocks.

If you follow that above link, there's a few good diagrams which show the ASGS and related stuff and I've done up a tree diagram to show the relations. 

{{< image name="asgs.png" alt="The structure of the ABS Census Data Packs" >}}

What's really nice is that everyone of these areas has a unique code. Which sounds very much like the beginnings of a primary key. :) 

So it's mostly important to know about eh ASGS to also know the ABS publishes Shapefiles and a free ArcGIS service putting out the layers. 
Something which pretty much made this little application possible.

[Statistical Geography](https://www.abs.gov.au/websitedbs/D3310114.nsf/home/geography)

**Building the Database and all the gory CSV data**

**1.How you get the Census Data Packs from the ABS and what's in them.**

To get Census Data Packs [Go Here](https://datapacks.censusdata.abs.gov.au/datapacks/). Good Luck!

Below is a really nice picture of the folders that come with the ZIP file for the General Community Profile Data Packs. It's nice because it doesn't show the 50+ CSV's that each leave AUST folder contains. 

When you open the data pack zip file up for the first time, you can look in the States (STE) folder and you'll have ~50 CSV's with 10 rows only, The numbers are pretty large for everything as it's the rolled up totals for the states. Each folder going down the ASGS gets bigger and the numbers smaller. The 50 CSV's represent the topics that that are collected and extracted from the Census data. A personal observation is that the higher the CSV number, ie G15 and up, the more esoteric the topic is and usually smaller the numbers. This results in a lot of big sparse tables.

{{< image name="datapacks.png" alt="The structure of the ABS Census Data Packs" >}}

**2.How I loaded it into the DB.**  

Once it clicked for me that each region had it's own code, I realized I could just smash all the layers into the same tables. From here I went about building just over 60 tables that matched the headers to create the Census 2016 datapacks database.

I now know there's a lot of better ways to do this, but the database always returned results quicker than the UI loading, so it was good enough for this.

I wrote a single line bash statement to list all the CSV files for one level of geography, this was to get the column information.

```
ls *.csv > file_list.sh
```

A small bit of search and replace with gedit and I was able to tack **head -n 1** on the front and a redirect onto the end of each line in order to extract the column names from each csv.
```
touch full_list.txt
head -n 1 .2016Census_G01_AUS.csv >> full_list.txt
head -n 1 .2016Census_G02_AUS.csv >> full_list.txt
head -n 1 .2016Census_G03_AUS.csv >> full_list.txt
etc up to G36
```

With this I went the manual route and used MySQL Studio to assist in creating the tables. This turned out to be about a few hours of work to do this. From memory not all the 'short' names were short enough for mysql and I wanted all the data included.

Thankfully no csv's columns exceeded the max width of a table in MySQL. Otherwise I would have had to build a better designed database and do the *pivot* to get the csv's into a long skinny table.

Eventually the time came and I had my Database Schema. 

This was probably the best part so far. I had a list of all the CSV files at every level and each mapped to a table correctly. From this list I built a script which would call from MySQL to preform a [*load data local infile*](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) to import the whole database. It only took about 6 minutes in total once this was all scripted up.  
Very Nice!

```
#MySQL load data local infile - Lots of these

>load data local infile '/.../../2016Census_G01_AUS.csv' into table c01 fields terminated by ',' optionally enclosed by '"' lines terminated by '\n' ignore 1 lines;
```

**The API**  
At this point, I had tackled probably the biggest problem of sorting out all the data. Now was the application part of the project.

**The Front End**

**Hosting environment**





















---