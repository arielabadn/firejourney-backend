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

app.use(cors({
  origin: "http://localhost:5173",
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

app.listen("5000", ()=>{
    console.log("server is running in port 5000!")
})