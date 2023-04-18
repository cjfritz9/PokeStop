import { useState } from "react";
import BASE_URL from "../../api";
import "../../stylesheets/AdminCreate.css";

const AdminCreate = () => {
  const [newProductName, setNewProductName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newRarity, setNewRarity] = useState("");
  const [newAbility1, setNewAbility1] = useState("");
  const [newAbility2, setNewAbility2] = useState("");
  const [newImagelink, setNewImagelink] = useState("");
  const [newInventorycount, setNewInventorycount] = useState("");
  const [newIsactive, setNewIsactive] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const createProduct = async (
    productName,
    price,
    condition,
    rarity,
    ability1,
    ability2,
    imagelink,
    inventorycount,
    isactive
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: productName,
          price,
          condition,
          rarity,
          ability1,
          ability2,
          imagelink,
          inventorycount,
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
    createProduct(
      newProductName,
      newPrice,
      newCondition,
      newRarity,
      newAbility1,
      newAbility2,
      newImagelink,
      newInventorycount,
      newIsactive
    );
  };
  return (
    <div>
      <form
        id="create-form"
        className="form admin-form"
        onSubmit={handleSubmit}
      >
        <fieldset className="input-wrapper">
          <legend id="header-legend">
            <h2 id="create-header" className="form-header">
              Create New Product
            </h2>
          </legend>
          <div id="create-inputs" className="form-inputs">
            <div className="inner-input-wrap">
              <div className="input-pair">
                <legend id="form-legend">New Product Name:</legend>
                <input
                  id="double-column-inputs"
                  className="form-inputs"
                  type="text"
                  value={newProductName}
                  placeholder="Name"
                  required
                  onChange={(event) => {
                    setNewProductName(event.target.value);
                  }}
                ></input>
              </div>
              <div className="input-pair">
                <legend id="form-legend">New Product Price:</legend>
                <input
                  id="double-column-inputs"
                  className="form-inputs"
                  type="text"
                  value={newPrice}
                  placeholder="$$$"
                  required
                  onChange={(event) => {
                    setNewPrice(event.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="inner-input-wrap">
              <div id="radio-choices">
                <div className="input-pair">
                  <legend id="form-legend">New Product Condition:</legend>
                  <div className="single-radio-choice">
                    <input
                      type="radio"
                      id="conditionChoice1"
                      name="condition"
                      value={newCondition}
                      onChange={() => {
                        setNewCondition("Mint");
                      }}
                    ></input>
                    <label htmlFor="conditionChoice1"> Mint </label>
                  </div>
                  <div className="single-radio-choice">
                    <input
                      type="radio"
                      id="conditionChoice2"
                      name="condition"
                      value={newCondition}
                      onChange={() => {
                        setNewCondition("Good");
                      }}
                    ></input>
                    <label htmlFor="conditionChoice2"> Good </label>
                  </div>
                  <div className="single-radio-choice">
                    <input
                      type="radio"
                      id="conditionChoice3"
                      name="condition"
                      value={newCondition}
                      onChange={() => {
                        setNewCondition("Damaged");
                      }}
                    ></input>
                    <label htmlFor="conditionChoice3"> Damaged </label>
                  </div>
                </div>
              </div>
              <div id="radio-choices">
                <legend id="form-legend">New Product Rarity: </legend>
                <div className="single-radio-choice">
                  <input
                    type="radio"
                    id="rarityChoice1"
                    name="rarity"
                    value={newRarity}
                    onChange={() => {
                      setNewRarity("Holographic");
                    }}
                  ></input>
                  <label htmlFor="rarityChoice1"> Holographic </label>
                </div>
                <div className="single-radio-choice">
                  <input
                    type="radio"
                    id="rarityChoice2"
                    name="rarity"
                    value={newRarity}
                    onChange={() => {
                      setNewRarity("Rare");
                    }}
                  ></input>
                  <label htmlFor="rarityChoice2"> Rare </label>
                </div>
                <div className="single-radio-choice">
                  <input
                    type="radio"
                    id="rarityChoice3"
                    name="rarity"
                    value={newRarity}
                    onChange={() => {
                      setNewRarity("Common");
                    }}
                  ></input>
                  <label htmlFor="rarityChoice3"> Common </label>
                </div>
              </div>
            </div>
            <div className="inner-input-wrap">
              <div className="input-pair">
                <legend id="form-legend">New Product Ability 1: </legend>
                <input
                  className="form-inputs"
                  id="abilities-txt"
                  type="text"
                  value={newAbility1}
                  placeholder="Ability 1"
                  required
                  onChange={(event) => {
                    setNewAbility1(event.target.value);
                  }}
                ></input>
              </div>
              <div className="input-pair">
                <legend id="form-legend">New Product Ability 2: </legend>
                <input
                  className="form-inputs"
                  id="abilities-txt"
                  type="text"
                  value={newAbility2}
                  placeholder="Ability 2"
                  onChange={(event) => {
                    setNewAbility2(event.target.value);
                  }}
                ></input>
              </div>
            </div>
            <legend id="form-legend">New Product Image URL</legend>
            <div id="sl-input" className="inner-input-wrap">
              <input
                className="form-inputs"
                type="text"
                value={newImagelink}
                placeholder="https://images.pokemontcg.io/base1/..."
                onChange={(event) => {
                  setNewImagelink(event.target.value);
                }}
              ></input>
            </div>
            <div id="sl-input" className="inner-input-wrap">
              <legend id="form-legend">New Product Inventory:</legend>
              <input
                id="inv-ct"
                type="text"
                value={newInventorycount}
                placeholder="#"
                onChange={(event) => {
                  setNewInventorycount(event.target.value);
                }}
              ></input>
            </div>
            <div className="inner-input-wrap">
              <legend id="form-legend">New Product Status: </legend>
              <div id="isactive-choices">
                <input
                  type="radio"
                  id="isactiveChoice1"
                  name="isactive"
                  value={newIsactive}
                  checked
                  onChange={() => {
                    setNewIsactive(true);
                  }}
                ></input>
                <label htmlFor="isactiveChoice1"> Active </label>
                <input
                  type="radio"
                  id="isactiveChoice2"
                  name="isactive"
                  value={newIsactive}
                  onChange={() => {
                    setNewIsactive(false);
                  }}
                ></input>
                <label htmlFor="isactiveChoice2"> Inactive </label>
              </div>
            </div>
          </div>
        </fieldset>
        <button className="form-btn" type="submit">
          Create New Product!
        </button>
        <div className="error-message">
          {error ? `${errorMessage}` : `${success}`}
        </div>
      </form>
    </div>
  );
};

export default AdminCreate;
