const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  orderNo: String,
  details: String,
  quantity: Number,
  date: { type: Date, required: true }, // ✅ use Date type
  points: Number,
  expiry: String,
});

// ✅ Prevent OverwriteModelError
const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
