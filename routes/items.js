const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Column = require('../models/Column');

// @route   Get api/items
// @desc    Get all items
// @access  Private
router.get('/', async (req, res) => {
  try {
    const columns = await Column.find().sort({
      index: 1,
    });
    const items = columns.map(c => c.items);
    res.json(items);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   POST api/items
// @desc    Add a new item (Updates the 'New' column)
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description, iteration, effort, owner, tags } = req.body;

  // Build item object
  const newItem = {};
  if (title) newItem.title = title;
  if (description) newItem.description = description;
  if (iteration) newItem.iteration = iteration;
  if (effort) newItem.effort = effort;
  if (owner) newItem.owner = owner;
  if (tags) newItem.tags = tags;
  try {
    let column = await Column.findById('5efacc1ff7260a08a88bde8e');

    if (!column) return res.status(404).json({ msg: 'Column not found' });

    column = await Column.findOneAndUpdate(
      '5efacc1ff7260a08a88bde8e',
      { $push: { items: newItem } },
      { new: true }
    );

    res.json(column);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Column.findOne({ 'items._id': req.params.id }, (err, res) => {
      if (err) throw err;
      res.items.id(req.params.id).remove();
      res.save();
    });

    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/items/:id
// @desc    Update an item
// @access  Private

router.put('/:id', auth, async (req, res) => {
  const { title, description, iteration, effort, owner, tags } = req.body;
  const itemId = req.params.id;

  try {
    await Column.findOne({ 'items._id': itemId }, (err, data) => {
      if (err) throw err;
      if (title) data.items.id(itemId).title = title;
      if (description) data.items.id(itemId).description = description;
      if (iteration) data.items.id(itemId).iteration = iteration;
      if (effort) data.items.id(itemId).effort = effort;
      if (owner) data.items.id(itemId).owner = owner;
      if (tags) data.items.id(itemId).tags = tags;
      data.save();
    });
    res.json('Item updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
