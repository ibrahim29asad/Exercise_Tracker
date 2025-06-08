const express = require('express');
// The above alllows the extracted data to turn into usable extracted data
// const bodyParser = require('body-parser'); 
// dont use it anymore since express handles these now
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.ATLAS_URI;

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Attempts to Connect to my DB
mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


const ExerciseRouter = require('./routes/exercise');
const UserRouter = require('./routes/user');
app.use('/user', UserRouter);
app.use('/exercise', ExerciseRouter);




app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server ${port} is running successfully`);
    }
}
);

