---
title: "This site: 6 - Sidebar notes. Building a shortcode."
date: 2021-01-04
draft: false
---


## Digressions


**plural noun**: digressions  
*a temporary departure from the main subject in speech or writing.*

Sometimes my thinking, and writing is like picture... 
{{< img src="silva.png" alt="Picture of Pepe Silva">}}

When I write here, I usually put my thoughts in Italics. Wait! I know it's all my thoughts. I'm more talking about the thoughts that happen, that aren't on the main path. I think them, I usually write them, and then I delete them. I want to stop that. I think I'd prefer to include them.

For a long time I've liked the side bar style comments I see in text books or in technical manuals. I'm pretty much going to replicate that.

It's pretty easy to do in CSS and this image is what I'm aiming for. Regular on the left and responsive on the right.
{{< note txt="Easy he said. Facepalm!" pos="left">}}
 
{{< img src="style.png" alt="Proposed Layout, maincontent in the center column, and notes on the side. ">}}

So my intent is that this text should be above the box of thoughts. Because, this is before my uber simple shortcode. 
```
{{</* note txt="rambling less important thoughts etc" pos="left or right"*/>}} 
```
{{< note txt="So if this works, this should sit on the right. And if the screen get's smaller than 1400px, it 'should' slide in between the content. " >}}
This text should be below when collapsed or responsive. 
And lastly, all of this should just sit side by side at full screen.

The pos condition is a simple If-Else, the condition makes the default case to place the notes to the right of the main text if omitted.



---

**Three Final things...**

Now all I have to do is to use them sparingly. 
AND, maybe I will now start integrating responsiveness into all my designs... maybe.

{{< note txt="Side by side notes with text between left side" pos="left">}}
{{< note txt="Side by side notes with text between right side" pos="right">}}
And this is the text between two thoughts.



