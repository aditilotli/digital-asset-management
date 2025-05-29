const path = require("path");
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const assetRouter = require('./routes/assets');

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/dam/api/assets/view', express.static(path.join(__dirname, 'uploads')));


const dbUrl = process.env.MONGODB_URL;
console.log(dbUrl)

if (!dbUrl) {
    console.error("Error: MONGODB_URL is not defined. Check your .env file.");
    process.exit(1);
}

mongoose.connect(
    dbUrl, {
        serverSelectionTimeoutMS: 30000 
    }
).then((db) => {
    console.log("Database connection is successful :::: ");
}).catch((err) => {
    console.log(err);
});

// apis
app.use('/dam/api/assets', assetRouter);

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${server.address().port}...`);
})
