# Team 05 - NomadHer

## Description 

NomadHer is a mobile app that connects solo female travelers and help them travel safely. The value of the app is that we hope we can use this app to encourage women around the world to travel solo, as there are many out there who wish to do but cannot out of security issues. The problem we are trying to solve is the safety issue that the solo female travelers are facing, such as, the difficulty of finding a secure female host. We want to make sure that all users of our app are real, good female users that can be trusted by other female users. To ensure this, we verify each user before they can get access to other functionalities of our app. We verify each user by asking her to upload her selfies and photo identification, so we can know whether this person is trustable.

We also include a web app for administrators. NomadHer's administrators can use this website to manage users and decide whether to allow users to register or not. The value of this web application is to simplify the way that administrators manage user data. With the website, they don't need the technical ability to access the database, and can simply view the photo and make a decision on the web page.


## Key Features
 * External user can login through a Facebook account.
 * External user can sign up and login by email account.
 * For new users, they need to register in our APP by upload a photo ID and three selfies into the database.
 * Admin can see these photos through our website. No need to manually access database.
 * Admin can make a decision on approving this registration or not.
 * Admin can delete the uploaded photos.
 * If external user's photos are deleted by admin, they can re-upload photos.


## Instructions
### Install Instruction:
1. Uninstall the Facebook app on your Android device. 
2. Download the apk file from https://expo.io/artifacts/b8a0a127-533d-463f-beb3-65dda6270450, and install the android app on your Android device. We also upload it onto our GitHub repo under folder "deliverables" as "nomader-frontend.apk". 
3. For the first time using, it may take a longer time to build the APP.

### For the new external user:
1. The user can decide to use Facebook Login for Email Signup/Login.

    a. If the user chooses Facebook Login, press the "Login With Facebook" button, they need to type in the pre-created accounts and password. Please refer the account details below.
    
    b. If the user chooses Email Sign up/ Login, press the "Login/Sign up With Email" button, they need to sign up an account first.And then he can login.
    
    &nbsp;&nbsp;&nbsp;&nbsp;I. Type in your email and password. The password must be at least 8 characters.
   
    &nbsp;&nbsp;&nbsp;&nbsp;II. Press the "Sign Up" button. If the sign up is successful, you will get an alert.
    
    &nbsp;&nbsp;&nbsp;&nbsp;III. Press "Login" button to login.

2. After Login it may take up to 10 seconds to navigate to the next screen.
3. On this page, there is a "Verify" Button at the center of your screen. Before Press this button, please prepare your photo ID with you and then press this button to navigate to next screen. And it may take up to 10 seconds to load the background image.
4. On this page, the APP will automatically take a photo after 10 seconds and here is a count down showing you how many seconds left. You can click "Flip" to use the back camera. Click the "Next" button to next page.
5. You should see the first sample image on this page. Try to make a pose as same as the pose of the sample image. When you are ready. Click the "take photo" button.
6. On this page, the APP will automatically take a photo after 3 seconds and here is a count down showing you how many seconds left. You can click "Flip" to use the back camera. Click the "Next" button to next page.
7. You should see the second sample image on this page. Try to make a pose as same as the pose of the sample image. When you are ready. Click the "take photo" button.
8. On this page, the APP will automatically take a photo after 3 seconds and here is a count down showing you how many seconds left. You can click "Flip" to use the back camera. Click the "Next" button to next page.
9. You should see the last sample image on this page. Try to make a pose as same as the pose of the sample image. When you are ready. Click the "take photo" button.
10. On this page, the APP will automatically take a photo after 3 seconds and here is a count down showing you how many seconds left. You can click "Flip" to use the back camera. Click the "Next" button to next page.
11. Now, your verification is under review. The admin can view the uploaded photo later. It may take up to 10 seconds to load the background image.


### For Admin:
1. As an administrator of NomadHer, you can click on url:https://team5-nomadher-admin.herokuapp.com/ to get to the admin page. First, you will see the login page. You need to log in using an administrator account. (Account: admin@gmail.com Password: 123456)
2. After the login is successful, you will be taken to the administrator page. You will see a list of all users on the left side of the page. You can click on any user and see the verification photos submitted by this user on the right side of the page.
3. For each user, you can see three sets of pose photos (including the original pose photo and the corresponding photo taken by the user) and a photo ID photo on the right side. You should judge whether the user's photo is qualified, and then click on one of the three buttons below - Verify, Disqualify and Pending to update the status for the user. And for those photos that you think cannot be verified, you should also click deletePose or delete ID button to delete the photo, to wait for the user to upload a new photo later.


### Facebook Test Accounts
1. Verified User:   
	UserID: true_zkgldnw_user@tfbnw.net   
	Password: csc301   

2. Unverified User:   
	UserID: false_mpbehao_user@tfbnw.net   
	Password: csc301   

3. Pending User:   
	UserID: pending_wymzmlo_user@tfbnw.net   
	Password: csc301   
