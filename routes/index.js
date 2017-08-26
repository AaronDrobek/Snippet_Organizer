const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Snippet = require("../models/user")
const mongoose =require("mongoose");
const passport = require('passport');

mongoose.connect("mongodb://localhost:27017/snippet");

const requireLogin = function (req, res, next) {
  if (req.user) {
    console.log(req.user)
    next()
  } else {
    res.redirect('/index');
  }
};

const login = function (req, res, next) {
  if (req.user) {
    res.redirect("/")
  } else {
    next();
  }
};
// 
// router.post('/', passport.authenticate('local', {
//     successRedirect: '/layout',
//     failureRedirect: '/',
//     failureFlash: true
// }));

router.post("/signup", function(req,res){
  User.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email
  })

.then(function(data){
    console.log(data);
    res.redirect('/')
  })
  .catch(function(err){
    console.log(err);
  })
})

// router.get("/", login, function(req, res) {
//   res.render("index", {
//     messages: res.locals.getMessages()
//   });
// });

router.get("/", function (req,res){
  res.render("index")
})

router.get("/signup", function (req,res){
  res.render("signup")
})





module.exports = router;
