import React, { Component } from "react";
import "./OrderManagement.css";
import axios from "axios";

class OrderManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      products: [],
      customers: [],
      form: {
        id: null,
        customer: "",
        orderItems: [{ product: "", quantity: 1 }],
        date: "",
      },
      editing: false,
    };
  }

  componentDidMount() {
    this.fetch_order_data();
    this.fetch_customer_data();
    this.fetch_product_data(); // Fetch available products
  }

  fetch_order_data() {
    axios
      .get("http://127.0.0.1:8000/api/orders/")
      .then((response) => {
        this.setState({ orders: response.data });
      })
      .catch((err) => console.log(err));
  }

  fetch_customer_data() {
    axios
      .get("http://127.0.0.1:8000/api/customers/")
      .then((response) => {
        this.setState({ customers: response.data });
      })
      .catch((err) => console.log(err));
  }

  fetch_product_data() {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((err) => console.log(err));
  }

  handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "customer" || name === "date") {
      this.setState({
        form: { ...this.state.form, [name]: value },
      });
    } else if (index !== null) {
      const orderItems = [...this.state.form.orderItems];
      orderItems[index] = { ...orderItems[index], [name]: value };
      this.setState({
        form: { ...this.state.form, orderItems },
      });
    }
  };

  addProductField = () => {
    this.setState({
      form: {
        ...this.state.form,
        orderItems: [...this.state.form.orderItems, { product: "", quantity: 1 }],
      },
    });
  };

  removeProductField = (index) => {
    const orderItems = [...this.state.form.orderItems];
    orderItems.splice(index, 1);
    this.setState({
      form: { ...this.state.form, orderItems },
    });
  };

  addOrder = () => {
    const { form, orders } = this.state;
    if (!form.customer || !form.date || form.orderItems.some((item) => !item.product || item.quantity < 1)) {
      alert("All fields are required, and each product must have a quantity!");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/orders/", { ...form })
      .then((response) => {
        this.setState({
          orders: [...orders, response.data],
          form: { id: null, customer: "", orderItems: [{ product: "", quantity: 1 }], date: "" },
        });
      })
      .catch((error) => console.log(error));
  };

  updateOrder = () => {
    const { form, orders } = this.state;
    if (!form.customer || !form.date || form.orderItems.some((item) => !item.product || item.quantity < 1)) {
      alert("All fields are required, and each product must have a quantity!");
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/api/orders/${form.id}/`, { ...form })
      .then(() => {
        this.setState({
          orders: orders.map((order) => (order.id === form.id ? { ...form } : order)),
          form: { id: null, customer: "", orderItems: [{ product: "", quantity: 1 }], date: "" },
          editing: false,
        });
      })
      .catch((error) => console.log(error));
  };
  editOrder = (order) => {
    this.setState({
      form: {
        id: order.id,
        customer: order.customer || "",
        orderItems: (order.orderItems || []).map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
        date: order.date || "",
      },
      editing: true,
    });
  };
  

  deleteOrder = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/orders/${id}/`)
      .then(() => {
        this.setState({
          orders: this.state.orders.filter((order) => order.id !== id),
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { orders, customers, products, form, editing } = this.state;

    return (
      <div className="order-management">
        <h1>Order Management</h1>
        <div className="order-form">
          <select
            name="customer"
            value={form.customer}
            onChange={this.handleInputChange}
          >
            <option value="">Select Customer</option>
            {(customers || []).map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={this.handleInputChange}
            placeholder="Order Date"
          />


          {form.orderItems.map((item, index) => (
            <div key={index} className="product-row">
              <select
                name="product"
                value={item.product}
                onChange={(e) => this.handleInputChange(e, index)}
              >
                <option value="">Select Product</option>
                {(products || []).map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => this.handleInputChange(e, index)}
                placeholder="Quantity"
                min="1"
              />
              {form.orderItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => this.removeProductField(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={this.addProductField}>
            Add Product
          </button>

          {editing ? (
            <button onClick={this.updateOrder}>Update Order</button>
          ) : (
            <button onClick={this.addOrder}>Add Order</button>
          )}
        </div>

        <div className="order-list">
          <h2>Order List</h2>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Products</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(orders || []).map((order) => (
                <tr key={order.id}>
                  <td>
                    {(customers.find((customer) => customer.id === order.customer) || {}).name || "Unknown"}
                  </td>
                  <td>
                    {order.orderItems
                      ?.map(
                        (item) =>
                          `${(products.find((p) => p.id === item.product) || {}).name || "Unknown"} (${
                            item.quantity
                          })`
                      )
                      .join(", ")}
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <button onClick={() => this.editOrder(order)}>Edit</button>
                    <button onClick={() => this.deleteOrder(order.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="4">No orders added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OrderManagement;
