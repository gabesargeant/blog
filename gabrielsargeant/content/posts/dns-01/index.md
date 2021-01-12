---
title: "Localhost DNS rerouting"
date: 2021-01-08
draft: true
---

I recently bought a new Raspberry Pi, a 3 B+. I have a few ideas of things I want to do with it. The main aim is to use it to run code and projects that may exceed the 'cup of coffee limit' I impose on myself with AWS.

I've had an original Pi for a long time. So doing the setup for the new one wasn't too tricky.  Right now I have a network connected RPi, that I want to interact with. 

{{< note txt="The best thrills with the RPI always come when I copied **dd** commands from a forum to my local shell" >}}

I want my localhost DNS resolution to redirect any request to ```homepi``` in the browser, to my Raspberry Pi connected to the home network. 

It turns out this is uber simple, just adding the entry to ```etc/hosts/``` does the trick, and now my trusty laptop will always return the correct IP. 

My router seems to be holding the address stable. Which I'm happy to defer to, rather than messing with dhcpcd settings on the pi. It's something that I know I'll forget. 



