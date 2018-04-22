var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds253889.mlab.com:53889/moviewiz');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.statics.addUser = function(username, password, cb) {
  var newUser = new this({ username: username, password: password});
  newUser.save(cb);
}

userSchema.statics.check = function(username, password, cb) {
  this.findOne({ username: username }, function(err, user) {
    if (!user) cb('User does not exist');
    else {
      bcrypt.compare(password, user.password, function(err, isValid) {
        if (err) return cb(err);
        cb(null, isValid);
      });
    };
  });
}

module.exports = mongoose.model('User', userSchema);