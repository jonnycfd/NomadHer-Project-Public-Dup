# YOUR PRODUCT/TEAM NAME
NomadHer
 > _Note:_ This document is meant to evolve throughout the planning phase of your project.    
 > That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section).
 > Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 

#### Q1: What are you planning to build?

  “NomadHer” is a mobile application which can increase the safety of solo female traveler during their traveling around the world. This product includes a lot of functionalities. Solo female travelers can use the mobile GPS to find other female travelers around them. In addition, travelers are able to use this app to find the available b&b around them.

The prior target of us is to build a robust login system. Our login system will through facebook and google which provides the user a smoother user experience. It means users are able to login our mobile app through their facebook and google account directly after they signed up. In the signup process, users need to upload their own government-issued photo IDs.  In the future, photo IDs will be used to verify users’ identity through face recognition. This makes sure the account users are themselves. This login system and verification system is able to  protect female travelers’ privacy.  


#### Q2: Who are your target users?

  We target solo female travelers around the world, especially when they travel to an unfamiliar place, needing a safe way to get transportation and accommodation services, and may hope to socialize with other solo traveling women.



#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?
 
Safety is essential for every traveler, especially female solo traveler. Our product can help female solo travelers on increasing safety on multiple aspects. 

First, there are double verifications on registering an account. The first verification is that all users must submit a government-issued photo ID. And then, they need to capture a video of herself that repeating the action in a sample video. These two verifications are necessary since our product is only for female. The first verification is the make sure that the user is female. The second verification is to make use that the photo ID belongs to the actual user. So to ensure that we are building a community with maximized security.

Secondly, we have a Geo-localization functionality that it can help the user to find another solo female user to travel together temporarily. Sometimes, it is a danger for solo female at some specific regions or specific times.

Finally, we also have a host/guest functionality. It is something like Airbnb but the hosts and guests are all females. Therefore, we will also do verifications on the hosts and guests like registration. 


#### Q4: How will you build it? 
  We will use React Native to create the front end for the application and Firebase database in the back end. According to the description from the owner of Nomadher, the application will be deployed as an Android mobile app. It would be difficult to talk about the design pattern or third-party API that we will use in the project. Since we will take over a half done project from the owner, so the detailed plan should be made after we get access to the codebase. But most likely we will follow the style of our predecessor used to keep the codebase structured and consistent.

During the development period, we will use unit tests for each function we modified or added strictly, and we will simulate the user environment for each module to make sure they work correctly before merging that into the main part.
----

### Highlights

We decided to use gif pictures as instructions for the “selfie with a specific posture” to keep the verification process secure. That is, give the new user gif pictures instructions on how to do different postures, then record the postures in order to identify that the user is a real people. We decided that we will use git pictures because it involves different frames to make the postures complicated enough to prevent potential hacking.
We agreed that we need to find a specific number of git instructions such that we can make the verification process complicated enough to prevent hacking, but also not that complicated to make the user get annoyed and quit. That is, find a balance in between the need for security and user-friendliness. 
We decided to have a range of different postures instructions to choose, so our app can be more secure. If the is only a small amount of different postures instructions available, it would be easier for hackers to simulate a small number of different postures in order to pass the verification. 
