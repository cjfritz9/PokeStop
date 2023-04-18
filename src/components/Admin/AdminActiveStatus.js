import { useState } from "react";
import BASE_URL from "../../api";
import "../../stylesheets/AdminActiveStatus.css";

const AdminActiveStatus = () => {
  const [productName, setProductName] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const ChangeActiveStatus = async (productName, isactive) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/setactiveproduct`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: productName,
          isactive,
        }),
      });
      const result = await response.json();
      setSuccess(result.success);
      setError(result.error);
      setErrorMessage(result.message);
      console.log("RESULT", result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ChangeActiveStatus(productName, activeStatus);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h2 className="form-header">Change Active Status</h2>
          </legend>
          <div id="active-status-inputs">
            <br />
            <legend>Product Name:</legend>
            <input
              type="text"
              value={productName}
              placeholder="Name"
              required
              onChange={(event) => {
                setProductName(event.target.value);
              }}
            ></input>
            <br />
            <legend>Active Status</legend>
            <div id="isactive-choices">
              <input
                type="radio"
                id="isactiveChoice1"
                name="isactive"
                value={activeStatus}
                onChange={() => {
                  setActiveStatus(true);
                }}
              ></input>
              <label htmlFor="isactiveChoice1"> True </label>
              <input
                type="radio"
                id="isactiveChoice2"
                name="isactive"
                value={activeStatus}
                onChange={() => {
                  setActiveStatus(false);
                }}
              ></input>
              <label htmlFor="isactiveChoice2"> False </label>
            </div>
          </div>
        </fieldset>
        <button type="submit">Set Active Status!</button>
        {success ? `${success}` : null}
        {error ? `${errorMessage}` : null}
      </form>
    </div>
  );
};

export default AdminActiveStatus;
