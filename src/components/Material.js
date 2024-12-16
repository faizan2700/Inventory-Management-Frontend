import React from "react";
import "./Material.css";
import { Component } from "react";
import axios from 'axios';

class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materials: [],
      form: { id: null, name: "", price: "", unit: "", supplier: "" },
      editing: false,
      suppliers: []
    };
  }

  componentDidMount() {
    this.fetch_product_data();
  }

  fetch_product_data = () => {
    var material_url = "http://127.0.0.1:8000/api/materials/";
    axios.get(material_url)
      .then((response) => {
        this.setState({ materials: response.data });
      })
      .catch(err => console.log(err));

    var supplier_url = "http://127.0.0.1:8000/api/suppliers/";
    axios.get(supplier_url)
      .then((response) => {
        this.setState({ suppliers: response.data });
      })
      .catch(error => console.log(error));
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  addProduct = () => {
    const { form, materials } = this.state;
    if (!form.name || !form.price || !form.unit || !form.supplier) {
      if (!form.name) alert("name is required");
      else if (!form.price) alert("price is required");
      else if (!form.unit) alert("unit is required");
      else if (!form.supplier) alert("supplier is required");
      return;
    }

    axios.post('http://127.0.0.1:8000/api/materials/', { ...form })
      .then(() => {
        this.setState({
          materials: [...materials, { ...form }],
          form: { id: null, name: "", price: "", unit: "", supplier: "" },
        });
      })
      .catch((error) => console.log(error));
  };

  updateProduct = () => {
    const { form, materials } = this.state;
    if (!form.name || !form.price || !form.unit || !form.supplier) {
      if (!form.name) alert("name is required");
      else if (!form.price) alert("price is required");
      else if (!form.unit) alert("unit is required");
      else if (!form.supplier) alert("supplier is required");
      return;
    }

    axios.put(`http://127.0.0.1:8000/api/materials/${form.id}/`, form)
      .then(() => {
        this.setState({
          materials: materials.map((material) =>
            material.id === form.id ? { ...form } : material
          ),
          form: { id: null, name: "", price: "", unit: "", supplier: "" },
          editing: false,
        });
      })
      .catch(err => console.log(err));
  };

  editProduct = (material) => {
    this.setState({
      form: material,
      editing: true,
    });
  };

  deleteProduct = (id) => {
    this.setState({
      materials: this.state.materials.filter((material) => material.id !== id),
    });
    axios.delete(`http://127.0.0.1:8000/api/materials/${id}/`)
      .catch(err => console.log(err));
  };

  render() {
    const { materials, form, editing, suppliers } = this.state;

    return (
      <div className="product">
        <h1>Materials</h1>
        <div className="product-form">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={this.handleInputChange}
            placeholder="Material Name"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={this.handleInputChange}
            placeholder="Price"
          />
          <input
            type="text"
            name="unit"
            value={form.unit}
            onChange={this.handleInputChange}
            placeholder="Kg"
          />
          <select
            name="supplier"
            value={form.supplier}
            onChange={this.handleInputChange}
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {editing ? (
            <button onClick={this.updateProduct}>Update Product</button>
          ) : (
            <button onClick={this.addProduct}>Add Product</button>
          )}
        </div>

        <div className="product-list">
          <h2>Product List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id}>
                  <td>{material.name}</td>
                  <td>{material.price}</td>
                  <td>{material.unit}</td>
                  <td>
                    {suppliers.find((s) => s.id === material.supplier)?.name || "Unknown"}
                  </td>
                  <td>
                    <button onClick={() => this.editProduct(material)}>Edit</button>
                    <button onClick={() => this.deleteProduct(material.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {materials.length === 0 && (
                <tr>
                  <td colSpan="5">No materials added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Material;
