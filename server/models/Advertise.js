const { Schema, model } = require('mongoose');
const reviewSchema = require('./Review');
const dateFormat = require('../utils/dateFormat');

const AdvertiseSchema = new Schema(
  {
    AdvertiseText: {
      type: String,
      required: 'You need to leave a Advertise!',
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

AdvertiseSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

const Advertise = model('Advertise', AdvertiseSchema);

module.exports = Advertise;
