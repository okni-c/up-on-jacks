const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const buildSchema = new Schema(
  {
    buildDescription: {
      type: String,
      required: 'You need a description, car person!',
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
    manufacturer: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      minlength: 4,
      maxlength: 4
    },
    img: {
      type: String,
      required: false
    },
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

buildSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Build = model('Build', buildSchema);

module.exports = Build;
