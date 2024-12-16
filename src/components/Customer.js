import React from "react";
import "./Customer.css"; 
import { Component } from "react"; 
import axios from 'axios';   
// import Products from '../db/Product'; 

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      form: {id: null, name: "", contact_number: "" },
      editing: false,
    };
  } 

  componentDidMount() {
    this.fetch_product_data();   
  }

  fetch_product_data = () => { 
    var customer_url = "http://127.0.0.1:8000/api/customers/";
    axios.get(customer_url)  
      .then((response) => {
        console.log(`This is data ${response.data[0].id}`);
        this.setState({ customers: response.data });
      })
      .catch(err => console.log(err)) 
   
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  addProduct = () => {
    const { form, customers } = this.state;

    if (!form.name || !form.contact_number) {
      alert("All fields are required!");
      return;
    }
    axios.post('http://127.0.0.1:8000/api/customers/', {...form})
    .catch((error) => console.log(error))
      
    this.setState({
      products: [...customers, { ...form}],
      form: {name: "", contact_number: "" },
    });
  };

  updateProduct = () => {
    const { form, customers } = this.state;

    if (!form.name || !form.contact_number) {
      alert("All fields are required!");
      return;
    } 
    console.log(`id of form to be updated: ${form.id}`)
    axios.put(`http://127.0.0.1:8000/api/customers/${form.id}/`, form).catch(err => console.log(err)) 
    console.log('updated customer') 

    this.setState({
      customers: customers.map((customer) =>
        customer.id === form.id ? { ...form } : customer 
      ),
      form: { id: null, name: "", contact_number: ""},
      editing: false,
    });
  };
  editProduct = (customer) => {
    this.setState({
      form: customer,
      editing: true,
    });
  };

  deleteProduct = (id) => {
    this.setState({
      customers: this.state.customers.filter((customer) => customer.id !== id),
    }); 
    axios.delete(`http://127.0.0.1:8000/api/customers/${id}/`).catch(err => console.log(err));
  };

  render() {
    const { customers, form, editing } = this.state;

    return (
      <div className="product">
        <h1>Customers</h1>
        <div className="product-form">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={this.handleInputChange}
            placeholder="Customer Name"
          />
          <input
            type="number"
            name="contact_number"
            value={form.contact_number}
            onChange={this.handleInputChange}
            placeholder="Contact Number"
          />
          {editing ? (
            <button onClick={this.updateProduct}>Update Customer</button>
          ) : (
            <button onClick={this.addProduct}>Add Customer</button>
          )}
        </div>

        <div className="product-list">
          <h2>Customer List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Number</th> 
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.contact_number}</td> 
                  
                  <td>
                    <button onClick={() => this.editProduct(customer)}>Edit</button>
                    <button onClick={() => this.deleteProduct(customer.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="4">No Customers!.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Customer;

