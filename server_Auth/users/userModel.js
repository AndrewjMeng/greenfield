var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: { type: String, index: { unique: true} },
  password: String,
}); 

var User = mongoose.model('User', userSchema);

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
  .then(function(hash) {
    this.password = hash;
    next();
  });
});

User.prototype.comparePassword = function(attemptedPassword, callback, next) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if(err) {
      callback(err);
    }else {
      callback(null, isMatch);
    }
    next;
  });
}


module.exports = User;