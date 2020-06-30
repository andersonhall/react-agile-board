const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Column = require('../models/Column');

// @route   Get api/columns
// @desc    Get all columns
// @access  Private
router.get('/', async (req, res) => {
  try {
    const columns = await Column.find().sort({
      index: 1,
    });
    res.json(columns);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   POST api/columns
// @desc    Add new column
// @access  Private
router.post('/', [check('title', 'Title is required').not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, index, items } = req.body;

  try {
    const newColumn = new Column({
      title,
      index,
      items,
    });
    const column = await newColumn.save();

    res.json(column);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route   PUT api/columns/:id
// @desc    Update a column
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, index, items } = req.body;

  // Build column object
  const columnFields = {};
  if (title) columnFields.title = title;
  if (index) columnFields.index = index;
  if (items) columnFields.items = items;

  try {
    let column = await Column.findById(req.params.id);

    if (!column) return res.status(404).json({ msg: 'Column not found' });

    column = await Column.findByIdAndUpdate(req.params.id, { $set: columnFields }, { new: true });

    res.json(column);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/columns/:id
// @desc    Delete a column
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let column = await Column.findById(req.params.id);

    if (!column) return res.status(404).json({ msg: 'Column not found' });

    await Column.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Column removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
