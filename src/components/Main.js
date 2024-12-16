import React from "react";
import Dashboard from "./Dashboard"; 
import Product from "./Product"; 
import OrderManagement from "./OrderManagement";
import SalesAnalytics from "./SalesAnalytics";
import UserManagement from "./UserManagement"; 
import InventoryTracking from "./InventoryTracking"; 
import Stock from "./Stock"; 
import Customer from "./Customer";  
import Material from "./Material"; 
import Supplier from "./Supplier"; 
import Purchase from "./Purchase"; 

const Main = ({ selectedTab }) => {
  const renderContent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Product":
        return <Product />;
      case "Supplier Management":
        return <Supplier />;
      case "Order Management":
        return <OrderManagement />;
      case "Sales Analytics":
        return <SalesAnalytics />;
      case "User Management":
        return <UserManagement />;     
      case "Inventory Tracking": // New case
        return <InventoryTracking />; 
      case "Stock": 
        return <Stock />;
      case "Customer": 
        return <Customer />; 
      case "Material": 
        return <Material />;  
      case "Purchase": 
        return <Purchase />; 
      default:
        return <h1>Page Not Found</h1>;
    }
  };

  return <div className="main-content">{renderContent()}</div>;
};

export default Main;
