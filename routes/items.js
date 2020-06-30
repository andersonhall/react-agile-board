const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Item = require('../models/Item');

// @route   Get api/items
// @desc    Get all items
// @access  Private
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({
      index: 1,
    });
    res.json(items);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   POST api/items
// @desc    Add new item
// @access  Private
router.post('/', [check('title', 'Title is required').not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, owner, iteration, effort, tags } = req.body;

  try {
    const newItem = new Item({
      title,
      description,
      owner,
      iteration,
      effort,
      tags,
    });
    const item = await newItem.save();

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route   PUT api/items/:id
// @desc    Update a item
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, owner, iteration, effort, tags } = req.body;

  // Build item object
  const itemFields = {};
  if (title) itemFields.title = title;
  if (description) itemFields.description = description;
  if (owner) itemFields.owner = owner;
  if (iteration) itemFields.iteration = iteration;
  if (effort) itemFields.effort = effort;
  if (tags) itemFields.tags = tags;

  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: 'Item not found' });

    item = await Item.findByIdAndUpdate(req.params.id, { $set: itemFields }, { new: true });

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/items/:id
// @desc    Delete a item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: 'Item not found' });

    await Item.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
