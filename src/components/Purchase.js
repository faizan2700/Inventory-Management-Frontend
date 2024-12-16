import React, { Component } from "react";
import "./Purchase.css";
import axios from "axios";

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
      suppliers: [],
      materials: [], // To populate the material dropdown
      form: { id: null, supplier: "", material_details: [] }, // Form uses material_details
      currentMaterial: { material: "", quantity: "" }, // For adding individual materials
      editing: false,
    };
  }

  componentDidMount() {
    this.fetchPurchaseData();
    this.fetchSupplierData();
    this.fetchMaterialData();
  }

  fetchPurchaseData = () => {
    const purchaseUrl = "http://127.0.0.1:8000/api/purchases/";
    axios
      .get(purchaseUrl)
      .then((response) => {
        this.setState({ purchases: response.data });
      })
      .catch((err) => console.log(err));
  };

  fetchSupplierData = () => {
    const supplierUrl = "http://127.0.0.1:8000/api/suppliers/";
    axios
      .get(supplierUrl)
      .then((response) => {
        this.setState({ suppliers: response.data });
      })
      .catch((err) => console.log(err));
  };

  fetchMaterialData = () => {
    const materialUrl = "http://127.0.0.1:8000/api/materials/";
    axios
      .get(materialUrl)
      .then((response) => {
        this.setState({ materials: response.data });
      })
      .catch((err) => console.log(err));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  handleMaterialChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      currentMaterial: { ...this.state.currentMaterial, [name]: value },
    });
  };

  addMaterialToPurchase = () => {
    const { currentMaterial, form } = this.state;

    if (!currentMaterial.material || !currentMaterial.quantity) {
      alert("Material and quantity are required!");
      return;
    }

    this.setState({
      form: {
        ...form,
        material_details: [...form.material_details, { ...currentMaterial }],
      },
      currentMaterial: { material: "", quantity: "" },
    });
  };

  addPurchase = () => {
    const { form, purchases } = this.state;

    if (!form.supplier || form.material_details.length === 0) {
      alert("Supplier and materials are required!");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/purchases/", form)
      .then((response) => {
        this.setState({
          purchases: [...purchases, response.data],
          form: { id: null, supplier: "", material_details: [] },
        });
      })
      .catch((error) => console.log(error));
  };

  updatePurchase = () => {
    const { form, purchases } = this.state;

    if (!form.supplier || form.material_details.length === 0) {
      alert("Supplier and materials are required!");
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/api/purchases/${form.id}/`, form)
      .then(() => {
        this.setState({
          purchases: purchases.map((purchase) =>
            purchase.id === form.id ? { ...form } : purchase
          ),
          form: { id: null, supplier: "", material_details: [] },
          editing: false,
        });
      })
      .catch((err) => console.log(err));
  };

  editPurchase = (purchase) => {
    this.setState({
      form: { ...purchase, supplier: purchase.supplier },
      editing: true,
    });
  };

  deletePurchase = (id) => {
    this.setState({
      purchases: this.state.purchases.filter((purchase) => purchase.id !== id),
    });

    axios
      .delete(`http://127.0.0.1:8000/api/purchases/${id}/`)
      .catch((err) => console.log(err));
  };

  render() {
    const {
      purchases,
      suppliers,
      materials,
      form,
      currentMaterial,
      editing,
    } = this.state;

    return (
      <div className="purchase">
        <h1>Purchases</h1>
        <div className="purchase-form">
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

          <div className="materials-section">
            <select
              name="material"
              value={currentMaterial.material}
              onChange={this.handleMaterialChange}
            >
              <option value="">Select Material</option>
              {materials.map((material) => (
                <option key={material.id} value={material.name}>
                  {material.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              value={currentMaterial.quantity}
              onChange={this.handleMaterialChange}
              placeholder="Quantity"
            />
            <button onClick={this.addMaterialToPurchase}>Add Material</button>

            <ul>
              {form.material_details.map((mat, index) => (
                <li key={index}>
                  Material: {mat.material}, Quantity: {mat.quantity}
                </li>
              ))}
            </ul>
          </div>

          {editing ? (
            <button onClick={this.updatePurchase}>Update Purchase</button>
          ) : (
            <button onClick={this.addPurchase}>Add Purchase</button>
          )}
        </div>

        <div className="purchase-list">
          <h2>Purchase List</h2>
          <table>
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Materials</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>
                    {
                      suppliers.find(
                        (supplier) => supplier.id === purchase.supplier
                      )?.name || "Unknown Supplier"
                    }
                  </td>
                  <td>
                    {(purchase.material_details || []).map((mat, index) => (
                      <div key={index}>
                        Material: {mat.material}, Quantity: {mat.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button onClick={() => this.editPurchase(purchase)}>
                      Edit
                    </button>
                    <button onClick={() => this.deletePurchase(purchase.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {purchases.length === 0 && (
                <tr>
                  <td colSpan="3">No purchases added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Purchase;
