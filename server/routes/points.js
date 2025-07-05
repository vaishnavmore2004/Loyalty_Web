const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Route: GET /api/points/total-points
router.get("/total-points", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const totalPoints = transactions.reduce((sum, tx) => sum + tx.points, 0);
    res.json({ totalPoints });
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate total points" });
  }
});

module.exports = router;
