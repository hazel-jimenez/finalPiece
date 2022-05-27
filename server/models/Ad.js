const { Schema, model } = require('mongoose');
const reviewSchema = require('./Review');
const dateFormat = require('../utils/dateFormat');

const AdSchema = new Schema(
  {
    AdText: {
      type: String,
      required: 'You need to leave a Ad!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reviews: [reviewSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

AdSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

const Ad = model('Ad', AdSchema);

module.exports = Ad;
