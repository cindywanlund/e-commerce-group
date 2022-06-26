const express = require('express');
const {errorHandler} = require('./middleware/errorMiddleware')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv= require('dotenv').config();
const colors = require('colors')

const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000; // if PORT was not found

const connectDB = require('./config/db')

// connect to DB
connectDB()
const app = express()

// Adding middlewares
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "KimMilou" // a secret key. In production use element from env-variable
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api', require('./routes/e_c_routes'))
app.use(errorHandler)



app.listen(port,() => console.log(`Server started on port ${port}`))