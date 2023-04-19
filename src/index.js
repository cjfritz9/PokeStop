import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Footer,
  Register,
  Login,
  Header,
  Products,
  Details,
  Admin,
  MyCart,
  Checkout,
  MyProfile,
  Thanks,
} from "./components";

const container = document.getElementById("app");
const root = createRoot(container);

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isadmin, setIsadmin] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0)
  // const [chosenCard, setChosenCard] = useState(0);
  // const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setLoggedIn(true);
    }

    const loggedInAdmin = localStorage.getItem("admin");
    if (loggedInAdmin) {
      setIsadmin(true);
    }
  }, []);

  return (
    <div>
      <Header
        loggedIn={loggedIn}
        token={token}
        // setLoggedIn={setLoggedIn}
        setUsername={setUsername}
        setPassword={setPassword}
        isadmin={isadmin}
      />
      <Routes>
        <Route
          path="/register"
          element={
            <Register
              setToken={setToken}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        ></Route>
        <Route path="/admin" element={<Admin token={token} />}></Route>
        <Route path="/thanks" element={<Thanks />}></Route>
        <Route
          path="/mycart"
          element={
            <MyCart
              priceTotal={priceTotal}
              setPriceTotal={setPriceTotal}
              token={token}
              loggedIn={loggedIn}
              // cartItems={cartItems}
              // setCartItems={setCartItems}
            />
          }
        ></Route>
        <Route
          path="/products"
          element={
            <Products
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              // chosenCard={chosenCard}
              // setChosenCard={setChosenCard}
            />
          }
        ></Route>
        <Route
          path="/products/:productId"
          element={
            <Details
              priceTotal={priceTotal}
              setPriceTotal={setPriceTotal}
              token={token}
              setToken={setToken}
              loggedIn={loggedIn}
              // chosenCard={chosenCard}
              // cartItems={cartItems}
              // setCartItems={setCartItems}
            />
          }
        ></Route>
        <Route
          exact
          path="/"
          element={
            <Products
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              // chosenCard={chosenCard}
              // setChosenCard={setChosenCard}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              setIsadmin={setIsadmin}
            />
          }
        ></Route>
        <Route
          path="/checkout" 
          element={
            <Checkout 
              priceTotal={priceTotal}
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={<MyProfile password={password} setPassword={setPassword} />}
        ></Route>
        <Route path="/thanks" element={<Thanks />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

root.render(
  <Router>
    <App />
  </Router>
);
