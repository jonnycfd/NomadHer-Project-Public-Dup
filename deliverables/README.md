# NOMADHER / TEAM 05
 

## Description 

	NomadHer is a mobile app that connects solo female travelers and help them travel safely. The value of the app is that we hope we can use this app to encourage women around the world to travel solo, as there are many out there who wish to do but cannot out of security issues. The problem we are trying to solve is the safety issue that the solo female travelers are facing, for example, the difficulty of finding a secure female host. We want to ensure that all users of our app are real, good female users that can be trusted by other female users. To ensure this, we verify each user before they can access other functionalities of our app. We verify each user by asking her to upload her selfies and photo identification, so we can know whether this person is trustable.


## Key Features

	The features that we have already implemented are the login function and the verification function. The login function is implemented by using facebook’s login api: each user will be using her own facebook account and password to login to the app. The verification function is that, the app will ask each user to take and upload 3 selfies according to the given instructions, and also upload the photo identification, which shall be saved into our database. The admin will access the database and look at each user’s uploaded photos to determine whether this user is trustable or not, and give this user the right to use other functionalities of the app if the admin decides that this user is trustable.


## Instructions

1. As a user who uses this app, you can do the following:
	-Visit https://snack.expo.io/@hagerregah/nomadher.v1 on the browser
	-Tap “Tap to play” button on the screen of the phone on the right side of the web page, and the initial page of the app will appear
	-On the initial page, tap “facebook” button
	-Enter your facebook email and password, and press “log in” 
	-At this stage, if you are an user who is already verified, you will be able to access the other part of the app, which are not implemented yet.
	-If you are a user who has already submitted your photos and waiting for the result of the verification, you will be directed to a new page. On this page, you will be told that we have already received your photos, and you are currently waiting to be verified. You can click the “logout” button to log out and go back to the initial page.

2. If you are a user who has not submitted your photos, you will be asked to take 3 selfies and upload 1 photo identification. Do the following:
	-tap “start verfication”
	-You will see a picture of a certain pose. There will be a 10 seconds countdown before the camera of the phone take a photo of your selfie. Do the same pose as shown on the picture, and waiting for the camera take the selfie of yours.
	-Repeat step 2 until all required selfies are collected. You will see “selfies upload success”.
	-You will be given another 10 seconds countdown before the camera of the phone take a photo of your identification document. The ducument can be a driver’s licence, a student card, etc. 
	-After taking the photo of your identification document, you will see “Photo ID upload success”.
	-Click “next”
	You will be directed to a new page. On this page, you will be told that we have already received your photos, and you are currently waiting to be verified. You can click the “logout” button to log out and go back to the initial page.

