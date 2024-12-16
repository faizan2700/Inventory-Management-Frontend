import React from "react";
import "./Product.css"; 
import { Component } from "react"; 
import axios from 'axios';   
// import Products from '../db/Product'; 

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      form: { id: null, name: "", price: "", quantity: "" },
      editing: false,
    };
  } 

  componentDidMount() {
    this.fetch_product_data();   
  }

  fetch_product_data = () => { 
    var product_url = "http://127.0.0.1:8000/api/products/";
    axios.get(product_url)  
      .then((response) => {
        console.log('This is data' + response.data);
        this.setState({ products: response.data });
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
    const { form, products } = this.state;

    if (!form.name || !form.price || !form.quantity) {
      alert("All fields are required!");
      return;
    }
    axios.post('http://127.0.0.1:8000/api/products/', {...form})
    .catch((error) => console.log(error))
      
    this.setState({
      products: [...products, { ...form,}],
      form: { id: null, name: "", price: "", quantity: "" },
    });
  };

  updateProduct = () => {
    const { form, products } = this.state;

    if (!form.name || !form.price || !form.quantity) {
      alert("All fields are required!");
      return;
    } 
    axios.put(`http://127.0.0.1:8000/api/products/${form.id}/`, form).catch(err => console.log(err)) 
    console.log('updated product') 

    this.setState({
      products: products.map((product) =>
        product.id === form.id ? { ...form } : product 
      ),
      form: { id: null, name: "", price: "", quantity: "" },
      editing: false,
    });
  };

  editProduct = (product) => {
    this.setState({
      form: product,
      editing: true,
    });
  };

  deleteProduct = (id) => {
    this.setState({
      products: this.state.products.filter((product) => product.id !== id),
    }); 
    axios.delete(`http://127.0.0.1:8000/api/products/${id}/`).catch(err => console.log(err));
  };

  render() {
    const { products, form, editing } = this.state;

    return (
      <div className="product">
        <h1>Products</h1>
        <div className="product-form">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={this.handleInputChange}
            placeholder="Product Name"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={this.handleInputChange}
            placeholder="Price"
          />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={this.handleInputChange}
            placeholder="Quantity"
          />
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
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button onClick={() => this.editProduct(product)}>Edit</button>
                    <button onClick={() => this.deleteProduct(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4">No products added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Product;

