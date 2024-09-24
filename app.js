/////// app.js

require('dotenv').config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passports = require("passport");
const passport = require("./middlewares/passport");
const memberRouter = require("./routes/memberRouter");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({ 
  secret: "cats", 
  resave: false, 
  saveUninitialized: false 
}));

app.use(flash());

app.use(passports.initialize());
app.use(passports.session());

app.use("/", memberRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
