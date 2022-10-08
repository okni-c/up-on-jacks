const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const modSchema = new Schema(
  {
    modtitle: {
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

module.exports = modSchema;
