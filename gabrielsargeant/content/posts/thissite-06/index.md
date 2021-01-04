---
title: "This site: 6 - Sidebar notes. Building a shortcode."
date: 2021-01-04
draft: true
---


## Digressions


**plural noun**: digressions  
*a temporary departure from the main subject in speech or writing.*

Sometimes my thinking, and writing is like. 
{{< img src="silva.png" alt="Picture of Pepe Silva">}}

When I write here, I usually put my thoughts in Italics. Wait! I know it's all my thoughts. I'm more talking about the thoughts that happen, that aren't on the main path. I think them, I usually write them, and then delete them. I want to stop that. I'd prefer to include them.

But I like the side bar style comments I see in text books or in technical manuals. 

It's pretty easy to do in CSS and this is what I'm aiming for. Regular on the left and responsive on the right.
{{< note txt="Easy he said. Facepalm!">}}
 
{{< img src="style.png" alt="Proposed Layout, maincontent in the center column, and notes on the side. ">}}

So my intent is that this text should be above the box of thoughts. Because, this is before my uber simple shortcode. 
```
{{</* note txt="rambling less important thoughts etc" */>}} 
```
{{< note txt="So if this works, this should sit on the left. And if the screen get's smaller than 1400px, it 'should' slide in between the content. " >}}
This text should be below when collapsed or responsive. 
And lastly, all of this should just sit side by side at full screen.

And now the really important thing to do, is to use them sparingly. 

**The worst thing about all of this**

I will now have to start integrating responsiveness into all my designs... maybe.


