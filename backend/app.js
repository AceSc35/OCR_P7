const express = require('express');
const colors = require('colors');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();

//Cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

//Req JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

app.use('/api/user', userRoutes);

module.exports = app;
