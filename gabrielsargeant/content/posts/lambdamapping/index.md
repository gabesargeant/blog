---
title: "Lambda Mapping Project"
date: 2020-09-09T01:11:30+10:00
draft: true
---

**Building this Lambda / serverless mapping project**

I'm going to just list in sections parts of the project as I build them with any significant notes along the way.

I'm generally approaching this problem from back to front. I'm starting with the data processing then onto building the lambda and infra, then the javascript monstrosity. 

# Building the Database.

This repo contains my data packs [smap](https://github.com/gabesargeant/smap)

Two command line tools.
**csvtransform** and
**dbbuilder**

TODO write:

CSV Transform: what's the point of it. 

Record. signifigance. 

dbbuilder: what it does. 



The AWS golang SDK is terrible! Or more the point the part of it where you do bulk upload with the dynamodb bulk upload feature.

explaination.



**Optimizing javascript in an attempt to be friendly to everyone's bandwidth**

[ArcGIS API for JavaScript Web Optimizer](https://developers.arcgis.com/javascript/3/jshelp/inside_web_optimizer.html)

TODO optimize front end code. 


