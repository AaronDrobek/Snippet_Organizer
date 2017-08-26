const mongoose    = require("mongoose");
mongoose.Promise  = require("bluebird");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  email: {type: String}
});



const snippetsSchema = new mongoose.Schema({

  title: {type: String,  unique: true},
  language: {type: String},
  body: {type: String},
  notes: {type: String},
  tags: {type: String}
});


userSchema.virtual('password')
    .get(function() {
        return null
    })
    .set(function(value) {
        const hash = bcrypt.hashSync(value, 8);
        this.passwordHash = hash;
    })

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false)
        } else if (user && user.authenticate(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
};



const Snippet = mongoose.model("snippets", snippetsSchema);
const User = mongoose.model("users", userSchema);


module.exports = User;
module.exports = Snippet;