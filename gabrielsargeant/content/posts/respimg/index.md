---
title: "Somewhat simple responsive images with Hugo"
date: 2020-08-31
draft: false
---
{{< image name="kiddo.png" alt="Kiddo meme saying, You can't just use one image for all devices; That's where you're wrong kiddo" >}}

There are a lot of ways to create responsive images for websites on the internet. Here's what I did.

First off, I'm about the least qualified person with regards to this topic to proffer advice about it. However it wasn't that hard and I did manage to figure out a way that fits with the simplicity I was after.

**My overall intent**  
I want to write about the things I do. Usually there's a visual or diagrammatic element to most things I do. As a consequence of this I want to be able to create markdown documents and include images so that if anyone ever reads this on their mobile, they can see the whole picture <sup>(wink)</sup> of what I'm trying to communicate.

**My requirements** 
1. I only want to use Hugo. I don't want to learn another tool today. 
2. I wanted to be able to include the image as is for desktop use, and have Hugo scale it down for mobile use.
3. If Hugo didn't support doing this then I wouldn't do it, 

**What I didn't know**  
At the moment of writing this, I've got about a weeks worth of playing with Hugo. So I'm on a journey.   
In order to be able to support responsive images I needed to create a Hugo [Shortcode](https://gohugo.io/content-management/shortcodes/), which is like a macro you can drop into markdown documents. The hope was to get away from using the markdown syntax ```![image](url)``` and instead have a Hugo Shortcode like:  

 ```{{ < image name="myimag.png" alt="text"> }}```.  

This double braces script is essentially a method/function which accepts arguments. It passes them to a piece of templated html which will be evaluated by Hugo and dropped into the page when Hugo renders a page.

Luckily a lot of people have done this. And Nils Haukas wrote a really good post which I simplified to fit my needs.
I extended the smol theme I'm using and modified the layout to include a new shortcode ```image.html``` which was very closely based of the writeup by Nils Haukas.

```
{{ $altText := .Get "alt"}}
{{ with $.Page.Resources.GetMatch (.Get "name") }}

<img srcset='
        {{ (.Resize "320x").RelPermalink }} 320w,
        {{ (.Resize "400x").RelPermalink }} 400w,     
        {{ .RelPermalink }} 1x' alt='{{$altText}}' />

{{ else }}
could not find image
{{ end }}
```

This code block does the following with the input   
```{{ < image name="myimag.png" alt="text"> }}```
1. Sets and alt text variable from the passed in param. 
2. Iterates over the folder containing this .md file (which must be an index.md file) and searches for each resource looking for a match to the field name. ie, myimag.png.
3. It fills in the srcset value of the img tag. This is where the magic happens. I'm using the Hugo .Resize directive to scale down to 320x which will make the width of the image 320px and preserve aspect ratio. And the same for the 400x resolution. The .RelPermaLink is just the resolved full name of the resource. 
4. If the $.Page.Resources.GetMatch fails then the else statement kicks in drops some text into the screen. 

The above Shortcode spews out the following code for the kiddo image at the top of this post. 

```
<img srcset="/posts/respimg/kiddo_.. ._320x0_resize_box_2.png 320w,  
        /posts/respimg/kiddo_.. _400x0_resize_box_2.png 400w,     
        /posts/respimg/kiddo.png 1x" alt="Kiddo meme saying, You can't just use one image for all devices; That's where you're wrong kiddo">
```

In Nils writeup he chose to have a set of scales that shortcode work at. I decided to just have the image as I create it for the page on my laptop, and one other scaled down version for phones. This is enough in my opinion. And yes I know 320px is a pretty small image, but it will easily work on everything.

The bit of work was adding some extra CSS to make the images scale as required for changes in screen size.

```
img {
	display: block;
	margin: 0 auto;
	overflow: hidden;
	max-width: 100%;
	height: auto;
}

<!-- Also I added this to both, the p.a and pre tags to make any long string break. 
This avoid having the x-scroll being used and images then becoming the max size of the available viewport.-->

word-break: break-word;

```


All in all I end up with a few different sizes of images, for different devices which will scale down if needed to match the screen size being used.


**The really hard part of getting this all to work**  
Over the last week, I've been iterating a lot of project outline and structure and how that gels with AWS hosting and Hugo. Some of the features of each don't play so neatly together.   
For image processing to work you have to do things the Hugo way and this meant each post being written in an index.md file in folder with it's resources. I'll explain this more in my next post about the site.

Note: This doesn't work well with SVG's. I'm not fussed by this at the moment. I'll refactor  it later or do something else in the future. But I'm getting a lot out of what I have here.

---
Sites I read to learn about the terrible world of responsive images.

1. [Mozilla Developer Network: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
2. [Responsive images syntax in html](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/#using-srcset)  
3. Alex's guide was more complicated than I needed but was a good read.   
[Alex Lakatos: How To Add Image Processing to Your Hugo Website and Improve Performance](https://alexlakatos.com/web/2020/07/17/hugo-image-processing/)  
4. This was the best and simplest walk through of Hugo's processing, and what I used.  
[Nils Norman Haukås : Hugo: How to add support for responsive images trough image processing and page bundles](https://nilsnh.no/2018/06/10/hugo-how-to-add-support-for-responsive-images-trough-image-processing-and-page-bundles-3/)]

5. Random stack overflow pages. In which I learnt that if you select an item with the *inspection tool* in F12 developers tools and then open the javascript console and type ```console.dir($0)``` it'll pour out the properties of that instance of whatever DOM element you've selected. This is handy for putting dev tools in a mobile aspect to see if your responsive images are being responsive.
