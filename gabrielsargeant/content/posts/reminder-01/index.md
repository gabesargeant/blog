---
title: "Reminder"
date: 2021-03-16T21:50:09+11:00
draft: true
---

Build a serverless reminder app. 

Requirements. 

1. CLI based. But Extendable.
2. Takes a note,  a time, and a subject. Sets a reminder in the cloud for that reminder to happen at a time. 
3. Sets reminders on event only. 
4. Need a way to manage subjects?

I wanted to use a queue, then I realized I probably won't need it. 

CLI app, on reminder schedules a lambda on Event Bridge. 
Lambda on schedule, with data packet, sends reminder to topic routed by subject.

This may end up being really easy...

Event bridge lambda, 

