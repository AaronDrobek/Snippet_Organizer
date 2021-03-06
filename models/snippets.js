const mongoose    = require("mongoose");
mongoose.Promise  = require("bluebird");
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');


mongoose.connect("mongodb://localhost:27017/snippet");


const snippetsSchema = new mongoose.Schema({
  username: {type: String, required: true},
  title: {type: String,  unique: true},
  language: {type: String},
  body: {type: String},
  notes: {type: String},
  tags: [String]
});



const Snippet = mongoose.model("Snippet", snippetsSchema);

module.exports = Snippet;
