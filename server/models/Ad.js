const { Schema, model } = require('mongoose');
const reviewSchema = require('./Review');
const dateFormat = require('../utils/dateFormat');

const adSchema = new Schema(
  {
    adText: {
      type: String,
      required: 'You need to leave a ad!',
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

adSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

const Ad = model('Ad', adSchema);

module.exports = Ad;
