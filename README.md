# Firebase Functions Demo

- Using Firebase Functions with an external API (Walmart)

- Consuming Firebase Realtime Database/Functions in an iOS app using FirebaseUI


## Prerequisites

1. A gmail account

2. Billing enabled in the GCP Console (https://console.developers.google.com/)
   You might be eligible for a free trial with a $300, 12-month credit

3. A Walmart Open API key
   Register at https://developer.walmartlabs.com/

4. Node.js, npm and Firebase CLI installed
   npm install -g firebase-tools


## Setting up

1. Using the Firebase Console (https://console.firebase.google.com), create a new project

2. Upgrade the pricing plan to Blaze (Pay as you go)

3. Log into the Firebase CLI
   firebase login

4. In the terminal, navigate to the root of this repository

5. Initialize the Firebase Functions
   firebase init functions
	 When prompted, select the project created in step #1.
   Do not overwrite existing files.
   Say "Y" to "Do you want to install dependencies"
	 
6. cd functions

7. Edit the walmartAPI.js file and update the WALMART_API_KEY constant with your key

8. Deploy the functions
   firebase deploy --only functions

9. In the Firebase Console, use the Database Rules to make the database public
    (Caution - this is only good for demo purposes, do not leave a production database public)
    {
      "rules": {
        ".read": true,
        ".write": true
      }
    }

10. In the Firebase Console, go through the "Add Firebase to your iOS App" wizard

11. Enter "com.github.davidair.FunctionsDemo" as the iOS Bundle ID

12. Download GoogleService-Info.plist

13. In the FunctionsDemo directory, run "pod install"

14. Open FunctionsDemo.xcworkspace

15. Drag the GoogleService-Info.plist downloaded in step 12 into the project

You should be able to run the demo in the simulator
