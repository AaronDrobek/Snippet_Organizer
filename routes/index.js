const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Snippet = require("../models/snippets")
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
    res.redirect("/language")
  } else {
    next();
  }
};

router.post('/', passport.authenticate('local', {
    successRedirect: '/language',
    failureRedirect: '/',
    failureFlash: true
}));

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

router.post("/create", function(req,res){
  Snippet.create({
    title: req.body.title,
    language: req.body.language,
    body: req.body.body,
    notes: req.body.notes,
    tags: req.body.tags
  })

.then(function(data){
    console.log(data);
    res.redirect('/language')
  })
  .catch(function(err){
    console.log(err);
  })
})

router.get('/allSnippets',  function (req, res) {
  Snippet.find({}).sort("name")
  .then(function(snippets) {
    data = snippets
    res.render('allSnippets', {snippets: snippets});
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
});
//
// router.get("/", login, function(req, res) {
//   res.render("language", {
//     messages: res.locals.getMessages()
//   });
// });

router.get("/", function (req,res){
  res.render("index")
})

router.get("/signup", function (req,res){
  res.render("signup")
})

router.get("/language", function (req,res){
  res.render("language")
})
router.get("/create", function (req,res){
  res.render("create")
})
// router.get("/allSnippets", function (req,res){
//   res.render("allSnippets")
// })

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});


//on view all snippets

// router.get('/allUsers', requireLogin, function (req, res) {
//   User.find({}).sort("name")
//   .then(function(users) {
//     data = users
//     res.render('allUsers', {users: users});
//   })
//   .catch(function(err) {
//     console.log(err);
//     next(err);
//   })
// });

module.exports = router;
