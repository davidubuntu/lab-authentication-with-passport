const express = require("express");
const passportRouter = express.Router();
// Require user model
const User = require("../models/User.js")
// Add bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
// Add passport 
const passport = require('passport');


const ensureLogin = require("connect-ensure-login");


/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

router.post('/signup', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  })
})

passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", {
    user: req.user
  });
});

module.exports = passportRouter;