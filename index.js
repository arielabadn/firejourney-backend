// https://blog.openreplay.com/react-social-logins-with-passport-js/
require('dotenv').config();
const session = require('express-session');
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");
const app = express();
const nodemailerRoute = require("./routes/nodemailer");

const port = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({
  origin: CLIENT_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use(session({
    secret: process.env.COOKIE_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
 }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);
app.use("/nodemailer", nodemailerRoute);

app.listen(port, ()=>{
    console.log(`server is running in port ${port}!`)
})