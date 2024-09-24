//membersController.js

const pool = require("../db/pool");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

async function renderIndex(req, res, next) {
    try {
        const query = `
          SELECT u.username, m.title, m.message, m.time
          FROM users u
          JOIN messages m ON u.id = m.user_id
          ORDER BY m.time DESC;
        `;
        const result = await pool.query(query);
        
        res.render('index', { 
          user: req.user, 
          messages: result.rows, 
          adminUsername: process.env.ADMIN_USERNAME 
        });
      } catch (err) {
        console.error("Error fetching messages:", err);
        next(err);
      }
}

const renderMembers = async (req, res, next) => {
    try {
      const query = `
        SELECT u.username, m.title, m.message, m.time
        FROM users u
        JOIN messages m ON u.id = m.user_id
        ORDER BY m.time DESC;
      `;
      const result = await pool.query(query);
      
      res.render('members', { 
        user: req.user, 
        messages: result.rows, 
        adminUsername: process.env.ADMIN_USERNAME 
      });
    } catch (err) {
      console.error("Error fetching messages:", err);
      next(err);
    }
  };  

async function getSignUp(req, res) {
    res.render("sign-up-form")
}

async function postSignUp(req, res, next) {
    await check("password", "Password must be at least 5 characters long")
        .isLength({ min: 5 })
        .run(req);

    await check("confirmPassword", "Passwords do not match")
        .custom((value, { req }) => value === req.body.password)
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("sign-up-form", {
            errors: errors.array(),
        });
    }

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
        if (err) { return next(err);
        }
        res.redirect('/log-in');
    });
}

async function getMessage(req, res) {
    res.render("message-form")
}

async function postMessage(req, res, next) {
    console.log(req.user);
    if (!req.user) {
      return res.status(401).send('User not authenticated');
    }
    try {
      const { title, message } = req.body;
      const query = `INSERT INTO messages (user_id, title, message, time) VALUES ($1, $2, $3, NOW())`;
      await pool.query(query, [req.user.id, title, message]);
      res.redirect('/members');
    } catch (err) {
      console.error('Error posting message:', err);
      return next(err);
    }
  }  
  

module.exports = {
    renderIndex,
    getSignUp,
    postSignUp,
    getLogin,
    postLogin,
    renderMembers,
    logOut,
    getMessage,
    postMessage
};