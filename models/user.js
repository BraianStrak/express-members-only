var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    user_name: {type: String, required: true, maxlength: 100},
    is_member: {type: Boolean, required: true},
    password: {type: String, required: true, minlength: 8},
  }
);

// Virtual for author's URL
UserSchema
.virtual('url')
.get(function () {
  return '/catalog/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);