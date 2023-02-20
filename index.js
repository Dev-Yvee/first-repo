require('dotenv').config();

const express = require('express');
const app = express();
const cors = require("cors") //Newly added
app.use(cors()) // Newly added



app.use(express.json({ limit: "50mb" }));
const routes = require('./routes/routes');
  
app.use('/api', routes)

const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})