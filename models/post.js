var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: {type: String, required: true, maxlength: 100},
    description: {type: String, required: true, maxlength: 100},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  }
);

// Virtual for post's URL
PostSchema
.virtual('url')
.get(function () {
  return '/post/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);