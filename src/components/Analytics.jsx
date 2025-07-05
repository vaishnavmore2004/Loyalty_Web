import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

const Analytics = () => {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  // Fetch Bar Chart data
  useEffect(() => {
    fetch('http://localhost:5000/api/analytics/bar-data')
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => {
        console.error('Bar chart fetch error:', err);
        setBarData([]);
      });
  }, []);

  // Fetch Pie Chart data
  useEffect(() => {
    fetch('http://localhost:5000/api/analytics/pie-data')
      .then((res) => res.json())
      .then((data) => setPieData(data))
      .catch((err) => {
        console.error('Pie chart fetch error:', err);
        setPieData([]);
      });
  }, []);

  // Fetch Line Chart data
  useEffect(() => {
    fetch('http://localhost:5000/api/analytics/line-data')
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => {
        console.error('Line chart fetch error:', err);
        setLineData([]);
      });
  }, []);

  return (
    <div className="analytics" style={{ padding: '2rem' }}>
      <h2>Loyalty Points Analytics</h2>

      {/* Bar Chart */}
      <div className="chart-section" style={{ marginTop: '2rem' }}>
        <h3>Monthly Points Earned (Bar Chart)</h3>
        {barData.length === 0 ? (
          <p>No data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={700}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="points" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pie Chart */}
      <div className="chart-section" style={{ marginTop: '3rem' }}>
        <h3>Points Distribution (Pie Chart)</h3>
        {pieData.length === 0 ? (
          <p>No data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={700}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={200}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Line Chart */}
      <div className="chart-section" style={{ marginTop: '3rem' }}>
        <h3>Points Trend Over Time (Line Chart)</h3>
        {lineData.length === 0 ? (
          <p>No data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={700}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="points" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Analytics;
