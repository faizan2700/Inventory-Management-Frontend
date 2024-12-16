import React from "react";
import "./Supplier.css";
import { Component } from "react";
import axios from "axios";

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      form: { id: null, name: "", contact_number: "" },
      editing: false,
    };
  }

  componentDidMount() {
    this.fetch_supplier_data();
  }

  fetch_supplier_data = () => {
    const supplier_url = "http://127.0.0.1:8000/api/suppliers/";
    axios
      .get(supplier_url)
      .then((response) => {
        this.setState({ suppliers: response.data });
      })
      .catch((err) => console.log(err));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  addSupplier = () => {
    const { form, suppliers } = this.state;

    if (!form.name || !form.contact_number) {
      alert("All fields are required!");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/suppliers/", { ...form })
      .catch((error) => console.log(error));

    this.setState({
      suppliers: [...suppliers, { ...form }],
      form: { id: null, name: "", contact_number: "" },
    });
  };

  updateSupplier = () => {
    const { form, suppliers } = this.state;

    if (!form.name || !form.contact_number) {
      alert("All fields are required!");
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/api/suppliers/${form.id}/`, form)
      .catch((err) => console.log(err));

    this.setState({
      suppliers: suppliers.map((supplier) =>
        supplier.id === form.id ? { ...form } : supplier
      ),
      form: { id: null, name: "", contact_number: "" },
      editing: false,
    });
  };

  editSupplier = (supplier) => {
    this.setState({
      form: supplier,
      editing: true,
    });
  };

  deleteSupplier = (id) => {
    this.setState({
      suppliers: this.state.suppliers.filter((supplier) => supplier.id !== id),
    });

    axios
      .delete(`http://127.0.0.1:8000/api/suppliers/${id}/`)
      .catch((err) => console.log(err));
  };

  render() {
    const { suppliers, form, editing } = this.state;

    return (
      <div className="supplier">
        <h1>Suppliers</h1>
        <div className="supplier-form">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={this.handleInputChange}
            placeholder="Supplier Name"
          />
          <input
            type="text"
            name="contact_number"
            value={form.contact_number}
            onChange={this.handleInputChange}
            placeholder="Contact Number"
          />
          {editing ? (
            <button onClick={this.updateSupplier}>Update Supplier</button>
          ) : (
            <button onClick={this.addSupplier}>Add Supplier</button>
          )}
        </div>

        <div className="supplier-list">
          <h2>Supplier List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact_number}</td>
                  <td>
                    <button onClick={() => this.editSupplier(supplier)}>
                      Edit
                    </button>
                    <button onClick={() => this.deleteSupplier(supplier.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan="3">No suppliers added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Supplier;
