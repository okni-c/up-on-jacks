const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const imageSchema = require('./Build Images');
const modSchema = require('./Build Mods');
const dateFormat = require('../utils/dateFormat');

const buildSchema = new Schema(
  {
    buildDescription: {
      type: String,
      required: 'You need a description, car person!',
      minlength: 1,
      maxlength: 500
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
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4
    },
    mods: [modSchema],
    buildimages: [imageSchema],
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

buildSchema.index({ 
'$**': 'text'
});

buildSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Build = model('Build', buildSchema);

module.exports = Build;
