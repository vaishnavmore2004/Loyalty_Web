const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// @route   GET /api/transactions
// @desc    Fetch all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/transactions
// @desc    Add a new transaction
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
