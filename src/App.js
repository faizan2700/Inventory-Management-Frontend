import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import "./App.css"; 


const App = () => {
  const [selectedTab, setSelectedTab] = useState("Purchase");

  return (
    <div className="app">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Main selectedTab={selectedTab} /> 

    </div>
  );
};

export default App;
