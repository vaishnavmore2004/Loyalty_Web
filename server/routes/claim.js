const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// POST: Claim reward
router.post('/claim', async (req, res) => {
  const { rewardId, title, cost, date } = req.body;

  try {
    const newTx = new Transaction({
      orderNo: `CLAIM-${Date.now()}`,
      details: `Claimed: ${title}`,
      quantity: 1,
      date,
      points: -cost,
      expiry: null
    });

    await newTx.save();
    res.status(200).json({ success: true, reward: title });
  } catch (err) {
    console.error("Claim failed", err);
    res.status(500).json({ success: false, error: 'Claim failed' });
  }
});

module.exports = router;
