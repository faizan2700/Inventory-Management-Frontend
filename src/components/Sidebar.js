import React from "react";
import "./Sidebar.css";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    "Dashboard", 
    "User Management", 
    "Material", 
    "Stock", 
    "Product",
    "Customer", 
    "Order Management",
    "Supplier Management", 
    "Purchase", 
    // "Sales Analytics",
    // "Inventory Tracking", 
  ];

  return (
    <div className="sidebar">
      <h2>Book Bazar</h2>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={selectedTab === tab ? "active" : ""}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
