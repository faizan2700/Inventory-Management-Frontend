import "./Stock.css";
import React, { Component } from 'react'; 
import axios from 'axios';  

class UserManagement extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      stock_data: [],
      form: { id: null, material: "", quantity:""}, // Default to "Admin"
      editing: false,
    };
  }
  
  componentDidMount() {
    this.fetch_user_data();
  } 

  fetch_user_data() { 
    var user_url = "http://127.0.0.1:8000/api/stocks/";
    axios.get(user_url)
      .then((response) => {
        console.log('This is data' + response.data);
        this.setState({ stock_data: response.data });
      })
      .catch(err => console.log(err))
  } 

  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };
  

  addUser = () => {
    const { form, users } = this.state;
    if (!form.username || !form.email || !form.role) {
      alert("All fields are required!");
      return;
    } 
    axios.post('http://127.0.0.1:8000/api/users/', {...form, password: form.username}) 
    .catch((error) => console.log(error)) 
    this.setState({
      users: [...users, { ...form, id: Date.now() }],
      form: { id: null, username: "", email: "", role: "Admin" },
    });
  };

  updateUser = () => {
    const { form, users } = this.state;
    if (!form.username || !form.email || !form.role) {
      alert("All fields are required!");
      return;
    } 

    axios.put('http://127.0.0.1:8000/api/users/' + form.id + '/', {...form}) 
    .catch((error) => console.log(error)) 
    this.setState({
      users: users.map((user) =>
        user.id === form.id ? { ...form } : user
      ),
      form: { id: null, username: "", email: "", role: "Admin" },
      editing: false,
    });
  };

  editUser = (user) => {
    this.setState({
      form: user,
      editing: true,
    });
  };

  deleteUser = (id) => { 
    axios.delete('http://127.0.0.1:8000/api/users/' + id + '/') 
    this.setState({
      users: this.state.users.filter((user) => user.id !== id),
    }); 
  };

  
  render() {
    const { stock_data} = this.state;

    return (
      <div className="stock">
        <h1>Stock Available</h1>
        {/* <div className="user-form">
          <input
            type="text"
            name="material"
            value={form.material}
            onChange={this.handleInputChange}
            placeholder="Material"
          />
          <input
            type="email"
            name="email"
            value={form.quantity}
            onChange={this.handleInputChange}
            placeholder="Quantity"
          />

          {editing ? (
            <button onClick={this.updateUser}>Update User</button>
          ) : (
            <button onClick={this.addUser}>Add User</button>
          )}
        </div> */}

        <div className="stock-list">
          <h2>Stocks</h2>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stock_data.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.material}</td>
                  <td>{stock.quantity}</td>
                  {/* <td>{stock.role}</td>
                  <td>
                    <button onClick={() => this.editUser(stock)}>Edit</button>
                    <button onClick={() => this.deleteUser(stock.id)}>
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
              {stock_data.length === 0 && (
                <tr>
                  <td colSpan="4">No Stock Available!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
} 

export default UserManagement;
