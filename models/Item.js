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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
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

module.exports = mongoose.model('item', itemSchema);
