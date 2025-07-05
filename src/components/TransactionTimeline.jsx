import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaStar, FaArrowDown, FaArrowUp } from 'react-icons/fa';

const TransactionTimeline = ({ transactions }) => {
  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>Transaction Timeline</h3>
      <VerticalTimeline>
        {transactions.map((tx, index) => (
          <VerticalTimelineElement
            key={index}
            date={tx.date}
            iconStyle={{
              background: tx.points >= 0 ? '#4caf50' : '#f44336',
              color: '#fff',
            }}
            icon={tx.points >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            contentStyle={{
              background: '#fff',
              color: '#000',
              borderTop: `4px solid ${tx.points >= 0 ? '#4caf50' : '#f44336'}`,
            }}
          >
            <h4 className="vertical-timeline-element-title">
              {tx.details} {tx.quantity ? `(x${tx.quantity})` : ''}
            </h4>
            <p>
              Order No: <strong>{tx.orderNo}</strong><br />
              Points: <strong className={tx.points >= 0 ? 'positive' : 'negative'}>
                {tx.points >= 0 ? `+${tx.points}` : tx.points} 
              </strong><br />
              Expiry: {tx.expiry || '--'}
            </p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default TransactionTimeline;
