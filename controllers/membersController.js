//membersController.js

const pool = require("../db/pool")
const passport = require("passport");
const bcrypt = require("bcryptjs");

async function renderIndex(req, res) {
    res.render("index");
}

async function renderMembers(req, res) {
    res.render("members", { user: req.user });
}  

async function getSignUp(req, res) {
    res.render("sign-up-form")
}

async function postSignUp(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        req.body.username,
        hashedPassword,
      ]);
  
      res.redirect("/log-in");
    } catch (err) {
      return next(err);
    }
}

async function getLogin(req, res) {
    res.render("log-in-form", { messages: req.flash() });
}  


async function postLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/members",
      failureRedirect: "/log-in",
      failureFlash: true
    })(req, res, next);
  }

async function logOut(req, res) {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/log-in');
    });
}
  

module.exports = {
    renderIndex,
    getSignUp,
    postSignUp,
    getLogin,
    postLogin,
    renderMembers,
    logOut
};