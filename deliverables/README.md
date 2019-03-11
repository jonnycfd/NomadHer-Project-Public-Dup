# NOMADHER / TEAM 05
 

## Description 

	NomadHer is a mobile app that connects solo female travelers and help them travel safely. The value of the app is that we hope we can use this app to encourage women around the world to travel solo, as there are many out there who wish to do but cannot out of security issues. The problem we are trying to solve is the safety issue that the solo female travelers are facing, for example, the difficulty of finding a secure female host. We want to ensure that all users of our app are real, good female users that can be trusted by other female users. To ensure this, we verify each user before they can access other functionalities of our app. We verify each user by asking her to upload her selfies and photo identification, so we can know whether this person is trustable.


## Key Features
	For this part of the project, we implement the login part and verification part. The login part uses the Facebook login which requires the user to input his Facebook account and password. After the login, the user is supposed to do the image verification. 
		1. If the user has already finished the verification, then he will be directed to a welcome page. 
		2. If the user has taken the verification photo but is still under review, then the user will be directed to a pending page.
		3. If the user has not done the verification, then the user will be directed to the verification page.

	For the verification part, 
		1. The user will press the “verification” button.
		2. There will an image show up in a new page. The user will look at the posture in the image and press “take photo” button. 
		3. A new page shows up with a countdown number showing on the top and a camera on the bottom. The user needs to make the same posture as in last page. A photo will be automatically taken when the countdown reaches zero. 
		4. Then the photo taken by the user will show up in a new page and a “next” button on the bottom. 
		5. When the user press “next” button, she will be directed to the pending page which mean her verification is submitted and will be evaluated manually.



## Instructions

Some screen shots are included in the folder "Screen Shots".

1. As a user who uses this app, you can do the following:
	-download the apk file from https://drive.google.com/file/d/1zqRWqD60yS8PlQYLWNZSSu70fPkzmDYK/view?usp=sharing, and install the android app on your android cellphone. We also upload it onto our github repo under folder "deliverables" as "nomader-frontend.apk".
	-On the initial page, tap “Login with facebook” button (MainScreenPage.png)
	-Enter your facebook email and password, and press “log in” (Please use the Test user accounts provided below) (FacebookLogin.png)

2. If you are a user who has not submitted your photos, you will be asked to take 1 selfies and upload 1 photo identification. Do the following:
	-tap “verfication” (NonVerifiedUser1.png)
	-You will see a picture of a certain pose. (NonVerifiedUser2.png)
	-After you press "take photo", you will be given 3 seconds countdown before the camera of your phone take a photo of you. Please do the same pose as you see in the photo before. (NonVerifiedUser3.png)
	-After taking the photo of yourself, press "Next" to submit it. (NonVerifiedUser4.png)
	-You will be directed to a new page. On this page, you will be told that we have already received your photos, and you are currently waiting to be verified. (NonVerifiedUser5.png)

3. If you are a user who has submit a photo but waiting for our staff to manually check, a message "Your verification is under review." (PendingUser.jpeg)

4. If you are a registered user, a video will be played for you. (VerifiedUser.png)

Test Users:
1. Verified User:
	UserID: true_zkgldnw_user@tfbnw.net
	Password: csc301

2. Unverified User:
	UserID: false_mpbehao_user@tfbnw.net
	Password: csc301

3. Pending User:
	UserID: pending_wymzmlo_user@tfbnw.net
	Password: csc301

