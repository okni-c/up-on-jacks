const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const imageSchema = new Schema(
  {
    image: {
      type: String,
      required: false
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = imageSchema;
