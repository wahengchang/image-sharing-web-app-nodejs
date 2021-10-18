# image-sharing-web-app-nodejs [![Build Status](https://app.travis-ci.com/wahengchang/image-sharing-web-app-nodejs.svg?branch=master)](https://app.travis-ci.com/wahengchang/image-sharing-web-app-nodejs)
This is a project of demostrating a simple image-sharing web app.
This project includes a backend and a frontend.

 - Demo: https://image-sharing-web-app-nodejs.herokuapp.com/
 - Travis CI: https://app.travis-ci.com/github/wahengchang/image-sharing-web-app-nodejs
 - API Document
 [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/7172772-312a0f8e-11d3-4271-86a1-b2c57f380ceb?action=collection%2Ffork&collection-url=entityId%3D7172772-312a0f8e-11d3-4271-86a1-b2c57f380ceb%26entityType%3Dcollection%26workspaceId%3Dd8146114-94c7-416d-8ccb-ffdfb138c5f6)


#### Backend:
 - A simple REST API where a user can upload a picture and associated data
 - Users can register by username, password
model.
 - Logged In users can submit a post that includes an image and short text description
 - Logged In users can get a list of uploaded posts
 - Validation and error handling
 - Automated tests

#### Frontend
 - A simple react app that uses the backend API from the backend challenge to provide
a frontend.
 - Logged In users can submit post that includes an image and short text description
 - Validation and error handling
 - Automated tests (Codecept.js)
 - Logged In users can view all posts
![image](https://user-images.githubusercontent.com/5538753/137762601-fa515258-e21c-4c38-95bb-6919c7a6fc1b.png)

#### CICD
![image](https://user-images.githubusercontent.com/5538753/137763275-e09638e3-aaa1-438b-a905-beff7a11e5f9.png)



 ## Install 
 ```
$ yarn
 ```

 ## Test 
 ```
 // backend
$ npx jest --coverage

 // frontend
$ yarn test:f2e

// both
$ yarn test
 ```

 ## Run Dev
 ```
 // backend runing on port 4000
$ yarn dev 

 // backend runing on port 3000
$ yarn dev :f2e
 ```

## Run production
```
$ yarn build
$ yarn start
```