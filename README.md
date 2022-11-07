# Expense Tracker
Here lists the specific expense lists of login account
## Features
- Users register their account and login to check their expense lists.
- Users can login with their Facebook account.
- Users can create/edit/delete their expense record.
- Sorting function let users can find the specific category to view their expense lists.

## Get Started
1. Install the Node.js and npm.
2. Clone this project to local.
3. Setting the .env file for environment variables. Please follow the .env.example file to create a .env file and change the FACEBOOK_ID and FACEBOOK_SECRET.
  ```
    FACEBOOK_ID=SKIP
    FACEBOOK_SECRET=SKIP
    FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
    SESSION_SECRET=ThisIsMySecret
    MONGODB_URI=mongodb://localhost/restaurant-list
    PORT=3000
  ```
4. Create the seed users' data with default expense records.
  ```
    npm run seed
  ```
5. Start to run the project.
  ```
    npm run start
  ```
6. It will be runninng successfully if the message shows below.
  ```
    The restaurant list project is running on the http:localhost:3000.
  ```
7. Stop the process.
  ```
    CTRL + C
  ```
## Utilities
- Express 4.16.4
- Express-Handlebars 3.0.0
- BootStrap 4.3.1
- bcrypt 2.4.3
- connect-flash 0.1.1
- dotenv 16.0.3
- passport 0.4.1
- passport-local 1.0.0
- passport-facebook 3.0.0