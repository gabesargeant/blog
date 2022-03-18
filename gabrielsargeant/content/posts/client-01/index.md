---
title: "Where to put complexity and who pays for it"
date: 2021-03-18
draft: true
---

When was the last time you used an API and thought "Gosh, that was easy, it really fit with my way of doing things...".

If you're thinking to yourself, "I know, it was last week and it was XZY and it was great". Then I think you're lying.

For a while there's been a push for governments to get into the API game. Thing like [data.gov.au](https://data.gov.au/) exist. This is a good thing, but it's also a really tricky thing to do for the organizations doing it. Standardization is ... lacking ... to use a word. 

Extra to this the model of interaction that public organizations have with the human public doesn't fit that well into a request response model. 

Everyone wants to participate, but how? 

If you were building a data service, you'd have all of these tricky design issues to decide about. Where does processing happen? formats, the integration pattern? How do we load data, how do we manage releases etc. There's lots to consider.

I think the most important issues can broadly be captured by two questions:
1. Where does processing happen? and,
2. What format is the data?

**I'll start with the format issue.**  
Who remembers the [Stata](https://en.wikipedia.org/wiki/Stata) format? Well not many people use it as a first choice now. Naturally it's hard to find integrations. If you publish in that format your making a choice about the level of engagement you get through your API. Similar to forign langague newspapers naturally being a small market in markets where they are a foriegn language.

This reason why JSON is everywhere, is because it's simple-ish.

But the format problem is still , because some people want to encode a lot of complexity. 

**Now where do we do the processing?**
{{< img src="integration.png" alt="Picture of integration patterns">}}

The benefits of building your clients solution for them.

They integrate correctly. The usability of your server is increased because people interact with it in sensisble ways. They stay inside the guard rails. If you offer support its easier because you don't have to content with wild issues that you'd never create for yourself. 




