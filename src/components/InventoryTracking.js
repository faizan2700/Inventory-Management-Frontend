import React, { useState } from "react";
import "./InventoryTracking.css";

const InventoryTracking = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Product A", quantity: 100, location: "Warehouse 1" },
    { id: 2, name: "Product B", quantity: 50, location: "Warehouse 2" },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    quantity: "",
    location: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddInventory = () => {
    if (formData.name && formData.quantity && formData.location) {
      setInventory([
        ...inventory,
        { id: Date.now(), name: formData.name, quantity: formData.quantity, location: formData.location },
      ]);
      setFormData({ id: null, name: "", quantity: "", location: "" });
    }
  };

  const handleEditInventory = (item) => {
    setIsEditing(true);
    setFormData(item);
  };

  const handleUpdateInventory = () => {
    setInventory(
      inventory.map((item) =>
        item.id === formData.id ? { ...item, name: formData.name, quantity: formData.quantity, location: formData.location } : item
      )
    );
    setIsEditing(false);
    setFormData({ id: null, name: "", quantity: "", location: "" });
  };

  const handleDeleteInventory = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <div className="inventory-tracking">
      <h1>Inventory Tracking</h1>
      <div className="inventory-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
        />
        {isEditing ? (
          <button onClick={handleUpdateInventory}>Update</button>
        ) : (
          <button onClick={handleAddInventory}>Add</button>
        )}
      </div>
      <div className="inventory-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.location}</td>
                <td>
                  <button onClick={() => handleEditInventory(item)}>Edit</button>
                  <button onClick={() => handleDeleteInventory(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTracking;
