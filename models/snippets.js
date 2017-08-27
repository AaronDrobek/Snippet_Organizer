const mongoose    = require("mongoose");
mongoose.Promise  = require("bluebird");
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');




const snippetsSchema = new mongoose.Schema({

  title: {type: String,  unique: true},
  language: {type: String},
  body: {type: String},
  notes: {type: String},
  tags: {type: String}
});



const Snippet = mongoose.model("Snippet", snippetsSchema);

module.exports = Snippet;
