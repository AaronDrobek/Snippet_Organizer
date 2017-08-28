const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Snippet = require("../models/snippets")
const mongoose =require("mongoose");
const passport = require('passport');


const requireLogin = function (req, res, next) {
  if (req.user) {
    console.log(req.user)
    next()
  } else {
    res.redirect('/');
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
    username: req.body.username,
    title: req.body.title,
    language: req.body.language.toLowerCase(),
    body: req.body.body,
    notes: req.body.notes,
    tags: req.body.tags.toLowerCase()
  })

.then(function(data){
    console.log(data);
    res.redirect('/language')
  })
  .catch(function(err){
    console.log(err);
  })
})

router.get('/allSnippets', requireLogin,  function (req, res) {
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

router.get("/", function (req,res){
  res.render("index")
})

router.get("/signup", function (req,res){
  res.render("signup")
})

router.get("/language", requireLogin, function (req,res){
  res.render("language")
})
router.get("/create", function (req,res){
  res.render("create")
})


router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
router.get("/specific/:language", function(req,res){
  console.log(req.params.language);
  Snippet.find({language: req.params.language})
  .then(function(snippets){
    res.render("allSnippets", {snippets: snippets});
  })
});
router.get("/allSnippets/:title", function(req,res){
  console.log(req.params.language);
  Snippet.find({title: req.params.title})
  .then(function(snippets){
    res.render("edit", {snippets: snippets});
  })
});
router.get("/tags/:tags", function(req,res){
  console.log(req.params.tags);
  Snippet.find({tags: req.params.tags})
  .then(function(snippets){
    res.render("allSnippets", {snippets: snippets});
  })
});
router.post("/delete/:title", function(req, res){
    let id = req.params.title
      Snippet.deleteOne({title:id})


        .then(function(data){
          console.log(data);
          res.redirect('/allSnippets')
        })
        .catch(function(err){
          console.log(err);
        })
      })







module.exports = router;
