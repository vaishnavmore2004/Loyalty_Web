const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/bar-data', async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const monthlyPoints = {};

    transactions.forEach(tx => {
      const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyPoints[month] = (monthlyPoints[month] || 0) + tx.points;
    });

    const chartData = Object.entries(monthlyPoints).map(([month, points]) => ({
      month,
      points,
    }));

    res.json(chartData);
  } catch (err) {
    console.error('Error fetching bar chart data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Points distribution data for Pie chart
router.get('/pie-data', async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let earned = 0;
    let redeemed = 0;

    transactions.forEach(tx => {
      if (tx.points > 0) {
        earned += tx.points;
      } else {
        redeemed += Math.abs(tx.points); // make negative values positive
      }
    });

    res.json([
      { name: 'Earned', value: earned },
      { name: 'Redeemed', value: redeemed },
    ]);
  } catch (err) {
    console.error('Error fetching pie chart data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Line Chart: Points over Time
router.get('/line-data', async (req, res) => {
  try {
    const transactions = await require('../models/Transaction').find().sort({ date: 1 });

    // Convert dates to a simpler format: 'dd-MMM' (e.g., '01-Jan')
    const chartData = transactions.map(tx => {
      let formattedDate = tx.date;

      // Try parsing and reformatting if date is valid
      const parsed = new Date(tx.date);
      if (!isNaN(parsed)) {
        formattedDate = parsed.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short'
        }); // e.g., 01-Jan
      }

      return {
        date: formattedDate,
        points: tx.points,
      };
    });

    res.json(chartData);
  } catch (err) {
    console.error('Error fetching line chart data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
