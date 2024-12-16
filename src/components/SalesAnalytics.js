import React from "react";
import "./SalesAnalytics.css";

const SalesAnalytics = () => {
  return (
    <div className="sales-analytics">
      <h1>Sales Analytics</h1>

      {/* Detailed Sales Reports */}
      <div className="sales-analytics-section">
        <h2>Detailed Sales Reports</h2>
        <div className="sales-analytics-grid">
          <div className="analytics-card">
            <h3>Revenue by Category</h3>
            <p>Electronics: $50,000</p>
          </div>
          <div className="analytics-card">
            <h3>Best-Selling Products</h3>
            <p>Smartphone, Laptop</p>
          </div>
          <div className="analytics-card">
            <h3>Sales Trends</h3>
            <p>Monthly sales: $5,000, $7,000, $12,000...</p>
          </div>
          <div className="analytics-card">
            <h3>Profit Margins</h3>
            <p>Revenue: $100,000 | Profit: $30,000</p>
          </div>
        </div>
      </div>

      {/* Customer Behavior Insights */}
      <div className="sales-analytics-section">
        <h2>Customer Behavior Insights</h2>
        <div className="sales-analytics-grid">
          <div className="analytics-card">
            <h3>Repeat Customer Rate</h3>
            <p>45%</p>
          </div>
          <div className="analytics-card">
            <h3>Average Order Value</h3>
            <p>$75</p>
          </div>
          <div className="analytics-card">
            <h3>Recommended Products</h3>
            <p>Wireless Earbuds, Gaming Console</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
