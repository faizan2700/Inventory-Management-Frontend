import "./UserManagement.css";
import React, { Component } from 'react'; 
import axios from 'axios';  

class UserManagement extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      form: { id: null, username: "", email: "", role: "Admin" }, // Default to "Admin"
      editing: false,
    };
  }
  
  componentDidMount() {
    this.fetch_user_data();
  } 

  fetch_user_data() { 
    var user_url = "http://127.0.0.1:8000/api/users/";
    axios.get(user_url)
      .then((response) => {
        console.log('This is data' + response.data);
        this.setState({ users: response.data });
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
    const { users, form, editing } = this.state;

    return (
      <div className="user-management">
        <h1>User Management</h1>
        <div className="user-form">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={this.handleInputChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={this.handleInputChange}
            placeholder="Email"
          />
          <select
            name="role"
            value={form.role}
            onChange={this.handleInputChange}
          >
            <option value="Admin">Admin</option>
            {/* Add more roles if needed */}
          </select>
          {editing ? (
            <button onClick={this.updateUser}>Update User</button>
          ) : (
            <button onClick={this.addUser}>Add User</button>
          )}
        </div>

        <div className="user-list">
          <h2>User List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => this.editUser(user)}>Edit</button>
                    <button onClick={() => this.deleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4">No users added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
} 



// class UserManagement extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: [],
//       form: { id: null, name: "", email: "", role: "Admin" }, // Default to "Admin"
//       editing: false,
//     };
//   } 

//   componentDidMount() { 
//     this.fetch_user_data(); 
//   } 

//   fetch_user_data() { 
//     var user_url = "http://127.0.0.1:8000/api/users/";
//     axios.get(user_url)
//       .then((response) => {
//         console.log('This is data' + response.data);
//         this.setState({ users: response.data });
//       })
//       .catch(err => console.log(err))
//   }

//   handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({
//       form: { ...this.state.form, [name]: value },
//     });
//   };

//   addUser = () => {
//     const { form, users } = this.state;
//     if (!form.name || !form.email || !form.role) {
//       alert("All fields are required!");
//       return;
//     }

//     this.setState({
//       users: [...users, { ...form, id: Date.now() }],
//       form: { id: null, name: "", email: "", role: "Admin" },
//     });
//   };

//   updateUser = () => {
//     const { form, users } = this.state;
//     if (!form.name || !form.email || !form.role) {
//       alert("All fields are required!");
//       return;
//     }

//     this.setState({
//       users: users.map((user) =>
//         user.id === form.id ? { ...form } : user
//       ),
//       form: { id: null, name: "", email: "", role: "Admin" },
//       editing: false,
//     });
//   };

//   editUser = (user) => {
//     this.setState({
//       form: user,
//       editing: true,
//     });
//   };

//   deleteUser = (id) => {
//     this.setState({
//       users: this.state.users.filter((user) => user.id !== id),
//     });
//   };

//   render() {
//     const { users, form, editing } = this.state;

//     return (
//       <div className="user-management">
//         <h1>User Management</h1>
//         <div className="user-form">
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={this.handleInputChange}
//             placeholder="Name"
//           />
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={this.handleInputChange}
//             placeholder="Email"
//           />
//           <select
//             name="role"
//             value={form.role}
//             onChange={this.handleInputChange}
//           >
//             <option value="Admin">Admin</option>
//             {/* Add more roles if needed */}
//           </select>
//           {editing ? (
//             <button onClick={this.updateUser}>Update User</button>
//           ) : (
//             <button onClick={this.addUser}>Add User</button>
//           )}
//         </div>

//         <div className="user-list">
//           <h2>User List</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.role}</td>
//                   <td>
//                     <button onClick={() => this.editUser(user)}>Edit</button>
//                     <button onClick={() => this.deleteUser(user.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {users.length === 0 && (
//                 <tr>
//                   <td colSpan="4">No users added yet.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }


export default UserManagement;
