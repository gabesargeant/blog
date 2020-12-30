---
title: "Anti-Facial Recognition Technology"
date: 2020-12-22
draft: false
---

Surveillance presents a problem for society and individuals. Thankfully, it's less of a problem for you, me, and this site. I don't collect logs or capture analytics on anything. The only reader of this site that I know anything about is my poor wife, who I lovingly encourage to proofread all of this... 

ow days, there's a lot of technology that detects and tracks people. It's mostly your phone, laptop, smartwatch, tv, and all those helpful home automation devices. Oh and the wireless security cameras everyone's got all over their homes now. But there's other stuff too!. Face stuff! And that's what I'm going to focus on with this. 

**Why would I be against facial recognition?**

Some people don't like the trend towards a more visible and accountable population. They are pushing back against the technology of facial recognition and other surveillance technologies. They have both ethical and privacy reasons to oppose this technology. 

In addition to the virtuous, there is also be spies and regular criminals in there as well. I'm not going to repeat the arguments for the virtuous or otherwise here. Instead, I'll be writing about the tech.

But quickly asking that main question one more time. 

Why would I be against facial recognition? Especially when I don't care about privacy in general, due in part to me owning X number of privacy-invading devices that I also happen to carry with me constantly?

As a privacy issue, facial recognition is serious. Facial recognition is more personally invasive because you don't, on some level, opt into it. It's done against you.

Have a glance at [Social Cooling](https://www.socialcooling.com/) it touches on a lot of issues around FR and privacy. 

*side note:* 
*a more visible and accountable population* -- I get triggered when people say accountable. Usually it means the person saying the word *accountable* is about to start shifting blame from their shit leadership... ask me how I know. ಠ ∩ ಠ

**And finally onto face stuff**

The current thinking about defeating face detecting surveillance technology follows a few different approaches. All have limitations.

**Option 1.** Hide and or disappear in plain sight. 

All of these approaches work on the principle of making it hard for the system to spot a face. Thus, preempting and disrupting the automated recognition.

- [CV Dazzle](https://cvdazzle.com/).

{{< img src="cv-dazzle.jpg" alt="picture of CV Dazzle Makeup">}} 
Here's a pretty good warning about how most of this doesn't work anymore. 
```June 15, 2020
Attention: whether a look works or not is up to you. CV Dazzle is a concept, not a product or pattern. Evading face detection requires prior knowledge of the algorithm. Most of the archived looks on this page were designed over 10 years ago for the Viola-Jones face detection algorithm. Current face surveillance uses deep convoluational neural networks (DCNNs). To use CV Dazzle you must design according to the algorithm (hint: don't use Viola-Jones looks for a DCNN face recognition system).
```

- Light emitting glasses. I have seen various version of this. This is a commercial set of glasses similar in mechanism to Isao Echizen's glasses.
[Phantom anti facial recognition glasses.](https://mashable.com/review/review-reflectacles-phantom-anti-facial-recognition-technology-glasses-frames/)
{{< img src="anti-photo-glasses.jpg" alt="Isao Echizen's Anti Photography glasses." >}}
One slight concern for me is wrecking my already terrible sleep patterns by disrupting my circadian rhythms. I'm not even sure if this is even a thing, but blue light is the enemy of sleep!

- Masks. COVID has made wearing cloth face masks acceptable in the West. So, there may be some options here. Right now you can [buy one on Amazon.com! AFR - Face Mask](https://www.amazon.com/Anti-Face-Recognition-Surveillance-Pattern/dp/B08JTM6S8C/ref=pd_lpo_193_img_1/134-9237156-6814251?_encoding=UTF8&pd_rd_i=B08JTM6S8C&pd_rd_r=852d8eb6-0f46-4166-ae2c-97fa4ec06eff&pd_rd_w=8V502&pd_rd_wg=FCY99&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=JBVSC5FGSH2AYSQ724SQ&psc=1&refRID=JBVSC5FGSH2AYSQ724SQ)
Extra to this, there are a few more esoteric versions listed in this article. [Business Insider - Out smart facial recognition](https://www.businessinsider.com.au/clothes-accessories-that-outsmart-facial-recognition-tech-2019-10?r=US&IR=T). 
Or, you can try the ever ever [creepy human looking mask.](http://www.3dprintingnews.co.uk/3dprinting-3/create-your-own-doppelganger-with-3d-printing/). 

It's worth noting that masks didn't last long. People are working around them to fight COVID. So that's sort of good....[National Geographic - face mask recognition has arrived](https://www.nationalgeographic.com/science/2020/09/face-mask-recognition-has-arrived-for-coronavirus-better-or-worse-cvd/)

- Anti FR patterns such as [HyperFace prototype by Adam Harvey / ahprojects.com](https://ahprojects.com/hyperface/). This takes a CV Dazzle style approach but creates confusion for the system. It's like a visual DDoS attack. Again, like CV Dazzle, it falls short because it's not generic and is tuned to work against one detection algorithm.

**Option 2**. Break your existing signature somehow. ie *the burning off your fingerprints technique*

The premise of these is to consider it impossible not to be spotted, or at least highly unlikely you will avoid being detected, and that approaches under **option 1** like CV dazzle will fail. If you assume that, and knowing your face has a set of landmarks on it that can be detected, then you have an option. You can try to alter what's detected. 

I feel success here depends greatly on the recognition approach. [About Facial Landmark detection](https://www.learnopencv.com/facial-landmark-detection/).

- You could try classic disguise techniques, and looking like someone else, or look like everyone else!. However, this doesn't seem practical. The Dlib blog has a really cool post about [Fast Multiclass Object Detection in Dlib 19.7 ](http://blog.dlib.net/2017/09/fast-multiclass-object-detection-in.html) and 
[High Quality Face Recognition with Deep Metric Learning](http://blog.dlib.net/2017/02/high-quality-face-recognition-with-deep.html). Which hints that any approach will eventually fail. Dlib and other libraries are going to get better. And If you wear a disguise, it starts to become a signature in itself. You'd need to start changing out faces often enough to create noise. Added to this, there's the whole swag of other anomaly detection that could be overlayed on top of a Facial Recognition Database. If you were data matching housing records, even just occupancy levels against the recognition data, you could notice outlier data that looks odd, such as, "Why do 10 different people leave and enter a two-bedroom house?".

- If you assume your face will get snapped then why not try out CV Dazzle like approaches to change points of the face with makeup. IMHO, this is easily countered with cross-matching on other data. If you go through a FR checkpoint that has the ability to identify you, then it's probably true they can capture things like your cell phone hardware MAC address, which is a much richer source of metadata about you and your vices.

- You use post-processing techniques on your images on social media in an attempt to be constantly making yourself unique. ie. *Polluting the well*. 
This is an attack on the search index, not on the active system that detects your face. It's smart when you consider the cost and complexity of facial recognition systems at scale. For local law enforcement or even commercial companies, there's limited benefit in building and maintaining your own large facial recognition database. So being guarded here may actually help disrupt the business models of startups like ClearView AI who sell FR as a service. [An NY Times article about them](https://www.nytimes.com/2020/01/18/technology/clearview-privacy-facial-recognition.html). An approach like this will probably work, but it's an active step you have to take. You've always got to be doing it. And there's still photo's of you that you can't control, like your Pass Port and Drivers Licence. 



Anyhow, we're probably a few years away from the [A Scanner Darkly](https://www.imdb.com/title/tt0405296/) stealth suits.
{{< img src="scannerdarkly.gif" alt="gif of Scanner Darkly" >}}

Lastly, there's a general problem with all of these face-based approaches. You usually have a phone on you.

So hold all of that in your head and I'll swing back to it.

**Where does facial recognition happen now?**

- Everywhere!. But, I'm going to talk about Airports. Before I do, here's a great article about the technology used in retail [Revealed: how facial recognition has invaded shops – and your privacy](https://www.theguardian.com/cities/2016/mar/03/revealed-facial-recognition-software-infiltrating-cities-saks-toronto)

So what does facial recognition in an airport look like?

- A controlled environment.

- Predictable lighting to make things simpler for the system. 

- People groomed by other systems into conservative behavior and dress. 

- Less social acceptance of facial coverings
    - try wearing a black motorcycle helmet into a bank or airport. It'll be a short trip. You'll probably be confronted by security then arrested or detained.

The Airport is a really significant touchpoint for picking up a whole swag of biometrics. Firstly, it's totally optional for the person being surveilled. Similar to the car parking in the city. If you don't want to pay the price, park elsewhere. Travel is a modern luxury, and governments control airports. 

Airport security gets the ability to make you walk down a hallway where they can capture an image or video of you, that controls your speed whilst also potentially capturing gait information, your height,  estimated weight, and then a high definition picture of the face. Bang, you're in the system. In addition to all of that, you also are required to hand over the passport that contains a ton of information about you. 

And, depending on what country you're flying to, they'll also grab a copy of your fingerprints along the way.

Two takeaway points here. 1st: Can't win, don't try! And 2nd: if you don't fly, it's great for the environment.

**The problems with trying to counter being detected.**  

Humans have been vilifying each other over small differences long before computers existed. Unless you're always at a fashion event or a rave. Anyone dressing in CV dazzle will draw attention. And so will anyone who has hyperface patterns on their clothing.

Avoiding facial recognition needs to include a strategy that is either widely adopted or covert in its application for the individual. So either everyone starts dressing oddly, or individually you need to learn, then use, covert personal counter-surveillance techniques to live out your daily life. 

Now, if you ask your friends who worked as spies in East Germany during the '80s. Identifying a tail was hard work, losing it was even harder. And let's not forget, computers don't sleep.

Unless everyone adopts anti FR techniques, it just becomes a signature of you. 

You want to be right in the middle of the bell curve, don't be on the edges.

**Target Pattern Analysis. Or why use facial recognition technology at all?**

Pretend you need to track someone like yourself, like a detective. Or better yet, a big group of detectives or spies. 

Operationally, it's very expensive to provide human eyes on a person all the time, sometimes they are asleep, other times they are shopping or working. Not often are they being a criminal or a spy. However, that time when they are being a criminal or spy is important, and it's what's different.

People are creatures of habit. Knowing that, and depending on risk, it's usually cheaper if you can establish a pattern and then monitor the conformance to that pattern when surveilling someone.

Think about your habits. For me, I work, I walk my dog, I go to Bunnings to buy supplies to fix my house. Sometimes I sleep. Everyone once and a while, my endless house chores are done and I take myself for a relaxing drudge through nature. Breaks from the pattern are noticeable!  

If you wanted to establish my pattern, you'd use my phone. I always have it. I like to entertain the idea that I could leave it behind, but it's always with me. If I were off to a dead drop. I'd probably turn off my phone. So would facial recognition actually be of assistance in establishing my pattern? I don't think it would when technology like Dirt Boxes and the [Gorgon stare](https://en.wikipedia.org/wiki/Gorgon_Stare) exist. Both of which kind of rely on me being sloppy or there being some lead.

Is facial recognition really the issue here? Or is it general surveillance? And am I being tracked actively, or am I just being recorded?

I guess really what you'd want to do, is to follow my phone, or have it hit a few points as part of a daily schedule. Like going to work, the shops etc.
Then you'd want to track my car as an entity to see if it diverges. Then you'd want to geofence most of that activity to raise alerts based on divergence. And you'd probably want to do something like building an alert into some omniscient system that watches for the event where my car moves without my phone. Or my phone moves without my car. And those would be the times when you'd really deep dive in with the FR tech. 

But, that's easy to type. In real life, that sounds really complex and expensive as F--K! 

Speaking about losing money hand over fist, the next section...

**Targeting is tricky. So is identification, and creating a facial index. Let's have some compassion for the Surveillers IT team and the public wallet funding the boondoggle system.**

*fun fact, that's the first time I think I've ever used the word Surveiller*

Let your mind pivot to thinking about building a really large nation sized facial recognition system. 

As the soon the be wealthy vendor, my two big discussion questions for the client would be:
1. Do you want to ID all faces? Or do you want to be able to select someone and then ID them?
2. Do you want to be able to search for a face live, or is a time delay of minutes to hours acceptable?

Any answer to those questions would make me rich! This stuff gets mega-complex once you're out of the lab. 

Some quick thinking about requirements.

The system needs to, from live streaming data!:

- Capture a frame. Probably capturing a time point in a video.
- Identify each face in every frame. 
- If a face is present. Extract it and extract facial points, and then add that observation to a time series database along with collection metadata. Such as location, camera, the system used, etc etc.
- Create a searchable index of the detections
- Search the live streams for any current priority taskings.

All of this would need to then flow into some longer form of storage such as an [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) or [OLTP](https://en.wikipedia.org/wiki/Online_transaction_processing) database. Or something else more suited.

It'd just be running, all the time, burning up disks. Just thinking about that type of system conjures up images of burning a giant stack of money. And then all the usual questions. How good is the data, how big is the data? And what size is the population of people you're looking to track? 

All of that information feeds into the spreadsheet that stops the IT project in its tracks when you figure out you can mine bitcoin cheaper.  

It feels like the technology is at the same place as automated fingerprint scanning technology. Ie, it doesn't really exist yet.

**It's an arms race**

The facial recognition cabability is simple enough. The Genie is out of the bottle. What will hold it back is probably something like the GDPR for public privacy. 

But alas, I don't live in Europe. So...I'll just rely on the government's IT projects scope-creep to save me.

**A few solutions I can think of to defeating FR technology**

Context is important. 

- If you're protesting, 
Wear masks, but not unique masks and disguises, like the CV dazzle but **not** the [Guy Fawkes masks](https://en.wikipedia.org/wiki/Guy_Fawkes_mask) you see about. Wearing one of those and protesting *the man* is like paying 40 dollars and wearing a red shirt with Che Guevara's face on it. Unless you're doing it ironically to poke a socialist in the eye, your really just ignorantly protesting *for the man*.
But course, if you are an investment banker and are wearing a Che shirt to a party to celebrate increasing the cost of food by commodifying the developing world's grain supply. Then, bully for you.  
Look at the Officers who police riots. 
    - No name tags. 
    - Same helmets and uniforms. 
They don't get doxxed because you can't find the individual. It's an effective approach. However, you'll absolutely become a gang like the ever [oppressed juggalos](https://www.npr.org/2017/09/15/550724673/who-are-the-juggalos-and-why-are-they-marching-in-washington-d-c). Who's makeup itself act's as an anti-FR countermeasure. But you'll need to study up on Insane Clown Posse music, as only the committed seem to do the face paint thing.

- If you are engaging in serious criminal misconduct. 
    I'm not helping here. Reconsider your life choices. Or you know, go with the classics and wear a balaclava. 

- If you're guarding the preception of your privacy. 
Stop carrying your mobile phone. It's a greater threat to you. Do you know what a [Dirtbox](https://en.wikipedia.org/wiki/Dirtbox_(cell_phone)) is?

One other approach to anti-FR that may work is by using patterns derived from the HyperFace project. If instead of clothing, you just plastered those patterns all over most cities and towns via billposting, etc. Alternatively, you could strategically position images in the gaze of cameras. You may create enough environmental noise to degrade the performance of any FR system. Or you'll more likely get arrested for billposting. \_(:/)_/

**My prediction about facial recognition**

It's more likely that cops will use other technology to sweep crowds, and that facial recognition will be deployed ad hoc onto crowd data.

If you can create a neural net to detect faces, then you can also just make it more generally detect things and stuff. This is more powerful because it is generic.

Humans will always be a part of any FR system. With this and a neural net that detected moving objects and attempted to classify them, you could defeat all FR countermeasures. 

Imagine for a moment that a person is wearing anti CV gear. If your system can detect a walking person, then it can also detect the failure to detect a face. This could automatically put that stream in front of a human. Who'd be able to assess what is going on. Is it a hat? is it FR countermeasures? They could set an auto-follow on the video and wait for the unrecognized moving person to do something that makes them recognized. Such as getting in a car or use their phone.

If I can think up something like that, some defense contractor can charge 100 million to the government to attempt to build it! 

{{< img src="mh.png" alt="We're through the looking glasse here, people">}}

**Lastly**

You know what they say about new ideas. Check the patent office. 

Depressingly, I'm almost 100% sure the oppressive things I've just talked about already exist in production. 
