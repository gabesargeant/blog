---
title: "Machine Learning and the ASGS"
date: 2020-10-17
draft: true
---

**The problem**

A friend of mine recently had a datset provided to her that had statistics in it at the SA3 level. The work she does focuses on information based around  Suburbs and Local Government Areas. This SA3 data created a question for her. What Suburbs exists in what SA3's?  
She needed an answer to this, because regular people who drive out to places, don't go to SA3's. They go to suburbs and towns.

I've written in other posts about the ASGS and non ASGS regions and how they sort of overlap.  
The ABS has this big long article about the ASGS which is useful to read and understand if you deal with this stuff. [The ASGS](https://www.abs.gov.au/websitedbs/D3310114.nsf/home/Australian+Statistical+Geography+Standard+(ASGS)). 

Anyway, the ABS provides correspondences which essentially create links from one boundary to another via big long spreadsheets. My friend solved her problem with one of these files. I helped, mostly by knowing the location of the correspondence files on data.gov.au. But it wasn't super easy information to find, and there was a Suburb -> Meshblock -> SA1-> SA2 -> SA3 matching process that she had to do with excel.

Time to build something to make this process faster.

**Time to unleash the power of machine learning**

Kidding, the title was click bait. There's no ML in what im doing here. The ASGS will be present, but no ML. Just plain ole regular graph and tree traversal algorithms. First I've got to find the data. And my god, it's very very tricky to find ASGS correspondence files. These essentially match things like Suburbs to SA? areas. Usually, you'd head to ABS to find these things. But now they live on data.gov.au. 

Im zeroing in on the 2016 areas for fun. Which can be found here. [ASGS Geographic Correspondences (2016)]](https://data.gov.au/dataset/ds-dga-23fe168c-09a7-42d2-a2f9-fd08fbd0a4ce/details?q=)





