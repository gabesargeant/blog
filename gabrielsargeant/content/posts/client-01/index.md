---
title: "Build the world you want to experience."
date: 2021-03-18
draft: true
---

In industrial design when building products for the person, before you actually consider functional constraints and have your dreams ruined. You get this brief fun period of time where dreamers get to dream.
This is the point where you get to think about the future and the users of apps and products interact with their stuff.

It's really interesting to look at concept art and then cycle forward and see what happened in real life.

This turned into this.

A good example of where the concept stayed really close to the final product was the iphone. Jobs apparently was a hawk on the design and was always shipping back the model prototypes (made of clay or other rapid prototyping materials) to the design team asking them to shave off edges or make it slimmer. And once they had that design, the next fun challenge for Apple was taking their small rectangle and putting a phone and media device in it.

Well we know the end of that story, they did it and made a stack of money. Just like the guys who built the Palm Pilot before them, which started as a block of wood with a notpad taped to it! [The Palm Pilot Story](https://albertosavoia.medium.com/the-palm-pilot-story-1a3424d2ffe4)

What can we learn from these rectangles? Mostly, the users journey is important to the success of your product. The Iphone and Palm Pilot were things that humans interacted with. So they needed to be really comfortable for humans and very easy to work with. 

**Why don't people think the same way about APIs?**

When was the last time you used an API and thought "Gosh, that was easy!".

There's a push to data from government like [data.gov.au](https://data.gov.au/). This is a good thing, but it's also a really tricky thing to do for the organizations doing it. 

Everyone wants to participate, but how

If you were building a data service, you'd have all of these tricky design issues to decide about. Where does processing happen? formats, the integration pattern? How do we load data, how do we manage releases etc. There's lots to consider.

I think the most important issues can broadly be captured by two questions:
1. Where does processing happen? and,
2. What format is the data?

**I'll start with the format issue.**
Who remembers the [Stata](https://en.wikipedia.org/wiki/Stata) format? well not many people use it now so it's hard to find integrations. If you publish in that format your making a choice about the level of engagement you get through your API. This is why JSON is winning everywhere. 

But the format problem really is tricky, because some people want to 

Now where do we do the processing?
{{< img src="integration.png" alt="Picture of integration patterns">}}

The benefits of building your clients solution for them.

They integrate correctly. The usability of your server is increased because people interact with it in sensisble ways. They stay inside the guard rails. If you offer support its easier because you don't have to content with wild issues that you'd never create for yourself. 