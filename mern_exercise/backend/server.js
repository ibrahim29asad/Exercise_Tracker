const express = require('express');

// The above alllows the extracted data to turn into usable extracted data
// const bodyParser = require('body-parser'); 
// dont use it anymore since express handles these now
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server ${port} is running successfully`);
    }
}
);