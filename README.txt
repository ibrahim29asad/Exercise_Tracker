Need 
    "cors": "^2.8.5", (Allows Communcation between fornt end and backend )
    "express": "^5.1.0", (is used to build the backend for the servers and API's)
    "nodemon": "^3.1.10", (Allows for ocnstant refreshes during devleopment 
                           so re compiling is not needed)
    "pg": "^8.16.0", (Allows for connection between the postgreSQL and backend)

    "mongoose": "^8.15.1", ( mongoose is the connection for the backend and DB and provides 
    more structure so that you can make CRUD Api Calls)

npm install (To get all those)

MERN
MongoDB - Our Database
Express - The framework built on Node JS this is what allows those app.get()
React - the langauge framework for JS
Node.JS - The Run time envirometn needed to run code outside the Web browser
          and instead on a seperate server



To Create the Front End since weere used CRA (Create-React-App) use:

npm create-react-app (NAME)
then use npm start

if i did vite then it is:
npm create vite@latest
and then npm run dev or npm start

Then since its simple and we dont need to make it super complex we can cd into it
and create the backend:

mkdir backend 
npm init -y (This creates the package.json)
npm start, (change the package.json script to include "nodemon server.js")
