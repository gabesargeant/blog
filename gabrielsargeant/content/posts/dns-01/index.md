---
title: "Localhost DNS rerouting"
date: 2021-01-08
draft: true
---

I bought a new Raspberry Pi, the model 3 B+. I have a few ideas of things I want to do with it. The main aim is to use it to run code and projects that will blow out the bank onf AWS. Ie, exceed the 'cup of coffee limit'. 

I've had an original Pi for a long time. So doing the setup for the new one wasn't too tricky.  But now I have a network connected rpi, that i want to interact with. 

{{< note txt="My greatest thrills with the RPI always come when I copied **dd** commands from a forum to my local shell" >}}

**So..I don't know anything DNS**  
Well, I know that DNS is all about port 53. And I know that there are registers like AWS's route 53 who match IP's to name look ups, and pass back the results.
Where DNS is fuzzy for me, is the process from browser, through the kernel on my laptop, then out to the internet.  I want ot learn more about that part. 

**What I'm trying to do**

I want my localhost DNS resolution to redirect any request to ```housepie``` in the browser, to my Raspberry Pi connected to the home network. 

This maybe simpler than it looks. So here goes.

