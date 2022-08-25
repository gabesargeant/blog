---
title: "More Zen garden stuff and why August is the best month yet"
date: 2022-08-24
draft: False
---

August and September are the most productive months of my year. There's a certain energy that I've noticed on the ramp down out of winter. The days are getting longer, each day a little warmer. Consequently my mood get's brighter and brighter. 

I started to notice this trend when it first got a github account and experienced the pressure of that daily activity tracker. 
Lots of activity in August most years.

{{< img src="history.png" alt="My 2020 git history.">}}

I really like knowing this rhythm about myself.

--- 
{{< note pos="left" txt="Thinking about Zen. Before the Big Bang, All energy was in a mass of non measurable density. It's not measurable because time and space didn't exist. But then something happened to upset that energy and it expanded or at least changed and the end result was the creation of space time. At that starting time, everything was really hot, and only Hydrogen. But after a while there were changes in temperature. Things happened that created the conditions for neutrons to move about between atoms. In what would be the atomic equivalent to the primordial soup that created eukaryotic cells. Probably. Anyway, that created Helium atoms and other elements. Speed forward 13.5 billion years and we're doing this. Making websites...." >}}
### The first manifestation of my late winter, early spring energy is tweaking my site again. 

On HN today. [Why your website should be under 14kB in size](https://endtimes.dev/why-your-website-should-be-under-14kb-in-size/)

Looking at my current website, it's pretty fast, but I have not minified any css or javascript. However I want to. And thankfully i don't have to mess around with anything like webpack. I'm staying all Hugo, which makes me very happy. 

Hugo Asset pipelines are pretty cool. They have a ton of features and flexibility to do all sorts of stuff. And they represent a pretty big warning to me. I can't let up, I've gotta keep tweaking this site. Hugo is cranking features out at a great rate of knots at the moment. I'm trying my best to not run away hide from the complexity. 
{{< note txt="It not lost on me, that you can take the complexity out of a language like golang *sort of*, but you can not take the love of complexity out of the hearts of the user of those languages. Hence Hugo's starting to get really complex" >}}
So my sites css in how minified and dumped into a style tag at the top of each page, rather than a link. It actually helps with load times. Also having ```<meta charset="UTF-8">``` close the very top of the HTML template allegedly speeds up parsing.
---
Two good tutorials / articles:

1. [Inline Critical CSS with hugo ](https://www.rockyourcode.com/inline-critical-css-with-hugo-pipes/)
2. [Hugo Asset Pipelines](https://digitaldrummerj.me/hugo-asset-pipeline/)

It would seem I'm not the first person to write blog post about writing blog posts with hugo. Meta!




