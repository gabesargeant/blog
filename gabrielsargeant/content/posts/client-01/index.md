---
title: "Build the world you want to live in. "
date: 2021-03-18
draft: true
---

## But don't change too much too fast.

When your designing products, before you actually consider functional constraints and have your dreams ruined. You get this brief fun period of time where dreamers get to dream.
This is the point where you get to think about the future and the users of apps and products interact with their stuff. Almost everything you dream up at this point is wrong.

It's really interesting to look at concept art and then cycle forward and see what actually happened in real life, when budgets, physics and committees start helping.

Remember the Segway. Remember people unironically using them! We'll those lasted about as long as [Starbucks in Australia.](https://www.cnbc.com/2018/07/20/starbucks-australia-coffee-failure.html) 

{{< note txt="It felt too mean to post pictures of people using segways, I guess good on them for not driving, but also not walking.... \_(:|)_/" pos="right" >}} 

*The Segway fell foul of regulation in many countries where it was banned from sidewalks and roads because it did not fit any existing categories. This is a problem for a truly revolutionary product – but it was not properly anticipated.*
[Why did the Segway fail? Some innovation lessons.](https://www.destination-innovation.com/why-did-the-segway-fail-some-innovation-lessons/)

If you contrast the Segway with something like the Iphone which had it's roots in the Palm Pilot and BlackBerry you get can see how successful design builds on the existing.
[The Palm Pilot Story](https://albertosavoia.medium.com/the-palm-pilot-story-1a3424d2ffe4)

So what am I saying? Mostly that the users journey is important to the success of your product. The iPhone and Palm Pilot were things that humans interacted with and for the iPhone, there was a lineage from having a Palm Pilot and a Nokia to having a IPhone. The innovation wasn't that big conceptually, so users were able to see it and click wih it. 

**Why don't people think the same way about APIs?**

When was the last time you used an API and thought "Gosh, that was easy, it really fit with my way of doing things...".

There's a sort of arrogance that exists thinking you'll integrate on bespoke data models or formats.

For a while there's been a push for government to get into the API game. Thing like [data.gov.au](https://data.gov.au/) exist. This is a good thing, but it's also a really tricky thing to do for the organizations doing it. Standardization is not rife.

Everyone wants to participate, but how? 

If you were building a data service, you'd have all of these tricky design issues to decide about. Where does processing happen? formats, the integration pattern? How do we load data, how do we manage releases etc. There's lots to consider.

I think the most important issues can broadly be captured by two questions:
1. Where does processing happen? and,
2. What format is the data?

**I'll start with the format issue.**  
Who remembers the [Stata](https://en.wikipedia.org/wiki/Stata) format? Well not many people use it as a first choice now. Naturally it's hard to find integrations. If you publish in that format your making a choice about the level of engagement you get through your API. Similar to forign langague newspapers naturally being a small market.

This reason why JSON is everywhere, is because it's simple and everywhere.

But the format problem really is tricky, because some people want to encode a lot of complexity. 

Now where do we do the processing?
{{< img src="integration.png" alt="Picture of integration patterns">}}

The benefits of building your clients solution for them.

They integrate correctly. The usability of your server is increased because people interact with it in sensisble ways. They stay inside the guard rails. If you offer support its easier because you don't have to content with wild issues that you'd never create for yourself. 