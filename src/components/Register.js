import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import '../stylesheets/Register.css'

// import { BASE_URL} from

const path = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:4000/api";
const Register = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const registerNewCustomer = async (
    username,
    password,
    confirmPassword,
    firstname,
    lastname,
    email,
    address
  ) => {
    // console.log("PATH", path);
    try {
      const response = await fetch(`${BASE_URL}/customers/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
          firstname,
          lastname,
          email,
          address,
        }),
      });
      const result = await response.json();
      console.log("result", result);
      setError(result.error);
      setErrorMessage(result.message);
      console.log("resulterror", result.error);
      console.log("resultmessage", result.message);
      setRegistered(result.token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerNewCustomer(
      newUsername,
      newPassword,
      confirmPassword,
      firstname,
      lastname,
      email,
      address
    );
  };

  const Error = () => {
    if (errorMessage) {
      return <h2>{errorMessage}</h2>;
    }
    return;
  };

  return (
    <div>
      <form id="register" className="form" onSubmit={handleSubmit}>
        {registered ? (
          <Navigate to="/login" />
        ) : (
          <>
            <h2 className="form-header">Register</h2>
            <hr className="form-divider"></hr>
            <div className="input-wrapper">
              <input
                className="form-inputs"
                type="text"
                placeholder="Username"
                required
                minLength={5}
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              ></input>
              <input
                className="form-inputs"
                placeholder="Password"
                required
                type="password"
                minLength={8}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              ></input>
              <input
                className="form-inputs"
                placeholder="Confirm Password"
                required
                type="password"
                minLength={8}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              ></input>
              <input
                className="form-inputs"
                type="text"
                placeholder="Your First Name"
                required
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
              ></input>
              <input
                className="form-inputs"
                type="text"
                placeholder="Your Last Name"
                required
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
              ></input>
              <textarea
                id="address-input"
                className="form-inputs"
                type="text"
                placeholder="Address&#10;City&#10;State&#10;Zip Code"
                required
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              ></textarea>
              <input
                className="form-inputs"
                type="text"
                placeholder="Email"
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </div>
            <div className="error">
              <h4>{error ? `${errorMessage}` : null}</h4>
              {/* <PasswordError />
              <UsernameError /> */}
            </div>
            <div>
              <button className="form-btn" type="submit">Submit!</button>
              <div className="form-redirect-text">Already a member? <Link className="form-redirect-link" to='/login'>Login!</Link></div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
