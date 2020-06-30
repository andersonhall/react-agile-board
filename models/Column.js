const mongoose = require('mongoose');
const { itemSchema } = require('./Item');

const columnSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
  },
  items: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'items' }],
    default: [],
  },
});

module.exports = mongoose.model('column', columnSchema);
