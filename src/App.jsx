import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionTimeline from './components/TransactionTimeline';
import Analytics from "./components/Analytics";
import ClaimPoints from './components/ClaimPoints'; 
import Profile from './components/Profile';


const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    'Profile',
    'Claim Cards',
    'Loyalty Points',
    'Analytics',
  ];

  return (
    <div className="sidebar">
      <h3>Account Details</h3>
      {menu.map((item) => (
        <div
          key={item}
          className={`menu-item ${activeTab === item ? 'active' : ''}`}
          onClick={() => setActiveTab(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const LoyaltyDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        const total = data.reduce((sum, tx) => sum + tx.points, 0);
        setTotalPoints(total);
      })
      .catch((err) => console.error('Error fetching transactions:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newTx = {
      orderNo: form.orderNo.value,
      details: form.details.value,
      quantity: parseInt(form.quantity.value) || 0,
      date: form.date.value,
      points: parseInt(form.points.value),
      expiry: form.expiry.value || null,
    };

    fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTx),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions((prev) => [...prev, data]);
        setTotalPoints((prev) => prev + data.points);
        form.reset();
      })
      .catch((err) => console.error('Error adding transaction:', err));
  };

  return (
    <div className="loyalty-dashboard">
      {/* Top Cards */}
      <div className="top-cards">
        <div className="points-card">
          <h3>Total Loyalty Points</h3>
          <p>{totalPoints}</p>
        </div>
        
      </div>

      {/* Transaction Table */}
      <div className="transaction-history">
        <h3>Transaction History (Table)</h3>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Order No</th>
              <th>Details</th>
              <th>Date</th>
              <th>Points</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No transactions yet.
                </td>
              </tr>
            ) : (
              transactions.map((tx, index) => (
                <tr key={tx._id}>
                  <td>{index + 1}</td>
                  <td>{tx.orderNo}</td>
                  <td>
                    {tx.details}{" "}
                    {tx.quantity > 0 ? (
                      <small>(Qty: {tx.quantity})</small>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{tx.date}</td>
                  <td className={tx.points > 0 ? 'positive' : 'negative'}>
                    {tx.points > 0 ? `+${tx.points}` : tx.points}
                  </td>
                  <td>{tx.expiry || '--'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Form */}
      <div className="transaction-form">
        <h3>Add New Transaction</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="orderNo" placeholder="Order No" required />
          <input type="text" name="details" placeholder="Details" required />
          <input type="number" name="quantity" placeholder="Quantity" />
          <input type="date" name="date" required />
          <input type="number" name="points" placeholder="Points (e.g. 200 or -50)" required />
          <input type="text" name="expiry" placeholder="Expiry Date (optional)" />
          <button type="submit">Add Transaction</button>
        </form>
      </div>

      {/* Timeline View */}
      <div className="timeline-view">
        <h3>Transaction History (Timeline)</h3>
        <TransactionTimeline transactions={transactions} />
      </div>
    </div>
  );
};

const MainContent = ({ activeTab }) => (
  <div className="main">
    
      {activeTab === 'Profile' ? (
    <Profile />
    ) : 
    activeTab === 'Loyalty Points' ? (
      <LoyaltyDashboard />
    ) : activeTab === 'Claim Cards' ? (
      <ClaimPoints />
    ) : activeTab === 'Analytics' ? (
      <Analytics />
    ) : (
      <h2>{activeTab} Section</h2>
    )}
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('Loyalty Points');

  return (
    <div className="container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent activeTab={activeTab} />
    </div>
  );
}

export default App;
