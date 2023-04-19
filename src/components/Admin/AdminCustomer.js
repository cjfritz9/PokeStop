import { useState } from "react";
import BASE_URL from "../../api";
import "../../stylesheets/AdminCustomer.css";

const AdminCustomer = () => {
  const [customerUsername, setCustomerUsername] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [isadmin, setIsadmin] = useState(false);
  const [adminSuccess, setAdminSuccess] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [profile, setProfile] = useState({});

  const token = localStorage.getItem("token");

  const getCustomerInfo = async (username) => {
    try {
      const response = await fetch(
        `${BASE_URL}/admin/${customerUsername}/info`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setProfile(result.viewCustomer);
      setSuccess(result.success);
      setError(result.error);
      setErrorMessage(result.message);
      setIsadmin(result.viewCustomer.isadmin);
      setCustomerId(result.viewCustomer.id);
    } catch (err) {
      console.error(err);
    }
  };

  const setAdmin = async (customerId, isadmin) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/setadmin`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: customerId,
          isadmin,
        }),
      });
      const result = await response.json();
      setAdminSuccess(result.success);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/deletecustomer`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: customerId,
        }),
      });
      const result = await response.json();
      setDeleteSuccess(result.success);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCustomer = (customerId) => {
    setSuccess("");
    deleteCustomer(customerId);
    setCustomerUsername("");
  };

  const toggleAdminStatus = (boolean) => {
    setSuccess(null);
    setAdmin(customerId, boolean);
    setCustomerUsername("");
    setAdminSuccess("");
    setDeleteSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getCustomerInfo(customerUsername);
    setAdminSuccess("");
    setDeleteSuccess("");
  };
  return (
    <div>
      <form
        id="delete-form"
        className="form admin-form"
        onSubmit={handleSubmit}
      >
        <fieldset className="input-wrapper">
          <legend id="header-legend">
            <h2 id="delete header" className="form-header">
              Customer Information
            </h2>
          </legend>
          <div id="delete-inputs">
            <legend id="form-legend">Customer Username: </legend>
            <input
              type="text"
              id="delete-customer-input"
              value={customerUsername}
              placeholder="Username"
              required
              onChange={(event) => {
                setCustomerUsername(event.target.value);
              }}
            ></input>
          </div>
          {success ? (
            <>
              <p className="profile-info" id="profile-email">
                Customer ID: {profile.id}
              </p>
              <p className="profile-info" id="profile-firstname">
                First Name: {profile.firstname}
              </p>
              <p className="profile-info" id="profile-lastname">
                Last Name: {profile.lastname}
              </p>
              <p className="profile-info" id="profile-address">
                Address: {profile.address}
              </p>
              <p className="profile-info" id="profile-email">
                Email: {profile.email}
              </p>
              <p className="profile-info" id="profile-admin-status">
                Admin Status: {String(isadmin)}
              </p>
            </>
          ) : null}
        </fieldset>
        <button id="search-customer-btn" className="form-btn" type="submit">
          Search For Customer!
        </button>
        <div className="error-message">{error ? `${errorMessage}` : null}</div>
        {success ? (
          isadmin ? (
            <button
              id="demote-btn"
              className="form-btn"
              //   className="toggle-admin-btn"
              onClick={() => toggleAdminStatus(false)}
            >
              Demote to scrub!
            </button>
          ) : (
            <button
              id="promote-btn"
              className="form-btn"
              //   className="toggle-admin-btn"
              onClick={() => toggleAdminStatus(true)}
            >
              Promote to Admin!
            </button>
          )
        ) : null}
        {success ? (
          <button
            id="delete-btn"
            className="form-btn"
            onClick={() => handleDeleteCustomer(customerId)}
          >
            Goodbye Forever!
          </button>
        ) : null}
        <div className="error-message">
          {adminSuccess ? `${adminSuccess}` : null}
          {deleteSuccess ? `${deleteSuccess}` : null}
        </div>
      </form>
    </div>
  );
};

export default AdminCustomer;
