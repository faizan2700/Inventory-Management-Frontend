import React, { Component } from 'react';
import './Dashboard.css';
import axios from 'axios';

class Dashboard extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      totalRevenue: 50000,
      numberOfOrders: 200,
      bestSellingProduct: "Smartphone",
      revenueTrends: ["Daily", "Weekly", "Monthly"],
      lowStockAlerts: 5,
      upcomingReleases: 2,
      revenueDistribution: '60/40',
    };
  }; 



  componentDidMount() { 
    this.fetch_dashboard_data() 
  }

  fetch_dashboard_data() { 
    var dashboard_url = 'http://127.0.0.1:8000/api/dashboard'; 
    axios.get(dashboard_url).then((response) => { 
      this.setState({ 
        totalRevenue: response.data.total_revenue, 
        numberOfOrders: response.data.number_of_orders, 
        bestSellingProduct: response.data.best_selling_product, 
        inventoryValue: response.data.inventory_value, 
        lowStockAlerts: response.data.lowStockAlerts, 
        upcomingReleases: response.data.upcoming_releases, 
        revenueDistribution: response.data.revenue_distrubution 
      })
    }).catch((error) => {console.log(error)})
  }

  render() {
    const {totalRevenue, numberOfOrders, bestSellingProduct, inventoryValue, lowStockAlerts, upcomingReleases, revenueDistribution} 
    = this.state; 
    return ( 

      <div className="dashboard">
        <h1>Dashboard</h1>

        {/* Sales Overview */}
        <div className="dashboard-section">
          <h2>Sales Overview</h2>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Total Revenue</h3>
              <p>{totalRevenue}</p>
            </div>
            <div className="dashboard-card">
              <h3>Number of Orders</h3>
              <p>{numberOfOrders}</p>
            </div>
            <div className="dashboard-card">
              <h3>Best-Selling Products</h3>
              <p>{bestSellingProduct}</p>
            </div>
            <div className="dashboard-card">
              <h3>Revenue Trends</h3>
              <p>Daily, Weekly, Monthly</p>
            </div>
            <div className="dashboard-card">
              <h3>Inventory Value</h3>
              <p>{inventoryValue}</p>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="dashboard-section">
          <h2>Quick Insights</h2>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Low Stock Alerts</h3>
              <p>{lowStockAlerts}</p>
            </div>
            <div className="dashboard-card">
              <h3>Upcoming Releases</h3>
              <p>{upcomingReleases}</p>
            </div>
            <div className="dashboard-card">
              <h3>Revenue Distribution</h3>
              <p>{revenueDistribution}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;