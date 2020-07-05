const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'As a <user> I want <thing> so that <reason>.',
  },
  owner: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId, // TODO - use authed users only
    // ref: 'users',
  },
  iteration: {
    type: String, // TODO - make this a date?
  },
  effort: {
    type: Number,
  },
  tags: {
    type: [String],
    default: [],
  },
});

const columnSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
  },
  items: {
    type: [itemSchema],
    default: [],
  },
});

module.exports = mongoose.model('column', columnSchema);
