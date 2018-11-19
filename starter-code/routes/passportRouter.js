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
passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});
/* POST signup page */
passportRouter.post('/signup', (req, res, next) => {

  const saltRounds = 10;

  const user = req.body.username;
  const pwd = req.body.password;

  const salt  = bcrypt.genSaltSync(saltRounds);
  const hashPwd = bcrypt.hashSync(pwd, salt);

  
  let newUser = new User({
    username: user,
    password: hashPwd
  })

  newUser.save()
  .then((newUser)=>{
    console.log(newUser);
    res.redirect('/login');
  })
  .catch((error)=>{
    console.log(error);
  })

})

/* GET login page */
passportRouter.get('/login', (req, res, next) =>{
  res.render('passport/login',{ "message": req.flash("error") });
})

passportRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/private-page",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  console.log(req.user);
  res.render("passport/private", {
    user: req.user
  });
});

module.exports = passportRouter;