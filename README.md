#Wikistack
A small version of wikipedia

#How to use
1. Clone this repo
2. `cd` into the root directory and do `npm install`
3. Install mongodb on your machine (http://www.mongodb.org/downloads) by using `brew update` and `brew install mongodb`
4. Run mongodb by using `mongod` in your terminal
5. Run `npm start`
6. Go to localhost:3000 on your browser
7. To add page, authenticate using local signup/login or Facebook

#Technologies
##Database
MongoDB (http://www.mongodb.org)

##JavaScript
* NodeJS (http://nodejs.org)
* ExpressJS (http://expressjs.com)
* Marked (https://www.npmjs.org/package/marked) for filter
* Passport (https://www.npmjs.org/package/passport) for authentication
* Express-session (https://www.npmjs.org/package/express-session) for session
* Bcrypt (https://www.npmjs.org/package/bcrypt) for encryption
* Swig (https://www.npmjs.org/package/swig) for views

##CSS3
* Bootstrap (http://getbootstrap.com)
* Flat UI for Bootstrap (http://designmodo.com/flat-free/)

##HTML5

#Known bugs
* Using page title (not id) to identify document in database and to link to each document, therefore cannot have duplicate page title
* Can edit and delete without authentication
* Environment variables don't work

#Features to be updated in the future
* Version history like wikipedia
* Logout button is only available after user gets authenticated
* Authenticate using Twitter and Google