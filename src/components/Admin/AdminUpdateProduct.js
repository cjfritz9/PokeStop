import { useState } from "react";
import BASE_URL from "../../api";
import "../../stylesheets/AdminUpdateProduct.css";

const AdminUpdateProduct = () => {
  const [currentProductName, setCurrentProductName] = useState("");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateCondition, setUpdateCondition] = useState("");
  const [updateRarity, setUpdateRarity] = useState("");
  const [updateAbility1, setUpdateAbility1] = useState("");
  const [updateAbility2, setUpdateAbility2] = useState("");
  const [updateImagelink, setUpdateImagelink] = useState("");
  const [updateInventorycount, setUpdateInventorycount] = useState("");
  const [updateIsactive, setUpdateIsactive] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const updateProduct = async (
    currentName,
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
      const response = await fetch(`${BASE_URL}/admin/editproduct`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentName,
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
      {
        result.success ? setSuccess("Successfully updated") : null;
      }
      setError(result.error);
      setErrorMessage(result.message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct(
      currentProductName,
      updateProductName,
      updatePrice,
      updateCondition,
      updateRarity,
      updateAbility1,
      updateAbility2,
      updateImagelink,
      updateInventorycount,
      updateIsactive
    );
  };
  return (
    <div>
      <form
        id="update-form"
        className="form admin-form"
        onSubmit={handleSubmit}
      >
        <fieldset className="input-wrapper">
          <legend id="header-legend">
            <h2 id="update-header" className="form-header">
              Update A Product
            </h2>
          </legend>
          <div id="update-inputs" className="form-inputs">
            <div id="update-product-inputs">
              <div id="current-name">
                <legend id="form-legend">Current Product Name: </legend>
                <input
                  id="current-name-input"
                  type="text"
                  //   value={currentProductName}
                  placeholder="Current Name"
                  required
                  onChange={(event) => {
                    setCurrentProductName(event.target.value);
                  }}
                ></input>
              </div>
              <div className="inner-input-wrap">
                <div className="input-pair">
                  <legend id="form-legend">Update Product Name:</legend>
                  <input
                    id="double-column-inputs"
                    className="form-inputs"
                    type="text"
                    //   value={updateProductName}
                    placeholder="Name"
                    onChange={(event) => {
                      setUpdateProductName(event.target.value);
                    }}
                  ></input>
                </div>
                <div className="input-pair">
                  <legend id="form-legend">Update Product Price:</legend>
                  <input
                    id="double-column-inputs"
                    className="form-inputs"
                    type="text"
                    //   value={updatePrice}
                    placeholder="Price"
                    onChange={(event) => {
                      setUpdatePrice(event.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="inner-input-wrap">
              <div id="radio-choices">
                <div className="input-pair">
                  <legend id="form-legend">Update Product Condition:</legend>
                  <div id="condition-choices">
                    <div className="single-radio-choice">
                      <input
                        type="radio"
                        id="conditionChoice1"
                        name="condition"
                        // value={updateCondition}
                        onChange={() => {
                          setUpdateCondition("Mint");
                        }}
                      ></input>
                      <label htmlFor="conditionChoice1"> Mint </label>
                    </div>
                    <div className="single-radio-choice">
                      <input
                        type="radio"
                        id="conditionChoice2"
                        name="condition"
                        // value={updateCondition}
                        onChange={() => {
                          setUpdateCondition("Good");
                        }}
                      ></input>
                      <label htmlFor="conditionChoice2"> Good </label>
                    </div>
                    <div className="single-radio-choice">
                      <input
                        type="radio"
                        id="conditionChoice3"
                        name="condition"
                        // value={updateCondition}
                        onChange={() => {
                          setUpdateCondition("Damaged");
                        }}
                      ></input>
                      <label htmlFor="conditionChoice3"> Damaged </label>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div id="radio-choices">
                <legend id="form-legend">Update Product Rarity: </legend>
                <div id="rarity-choices">
                  <div className="single-radio-choice">
                    <input
                      type="radio"
                      id="rarityChoice1"
                      name="rarity"
                      // value={updateRarity}
                      onChange={() => {
                        setUpdateRarity("Holographic");
                      }}
                    ></input>
                    <label htmlFor="rarityChoice1"> Holographic </label>
                  </div>
                  <div className="single-radio-choice"></div>
                  <input
                    type="radio"
                    id="rarityChoice2"
                    name="rarity"
                    // value={updateRarity}
                    onChange={() => {
                      setUpdateRarity("Rare");
                    }}
                  ></input>
                  <label htmlFor="rarityChoice2"> Rare </label>
                </div>
                <div className="single-radio-choice">
                  <input
                    type="radio"
                    id="rarityChoice3"
                    name="rarity"
                    // value={updateRarity}
                    onChange={() => {
                      setUpdateRarity("Common");
                    }}
                  ></input>
                  <label htmlFor="rarityChoice3"> Common </label>
                </div>
              </div>
            </div>
            <div className="inner-input-wrap">
              <div className="input-pair">
                <legend id="form-legend">Update Product Ability 1: </legend>
                <input
                  className="form-inputs"
                  id="abilities-txt"
                  type="text"
                  //   value={updateAbility1}
                  placeholder="Ability 1"
                  onChange={(event) => {
                    setUpdateAbility1(event.target.value);
                  }}
                ></input>
              </div>
              <div className="input-pair">
                <legend id="form-legend">Update Product Ability 2: </legend>
                <input
                  className="form-inputs"
                  id="abilities-txt"
                  type="text"
                  //   value={updateAbility2}
                  placeholder="Ability 2"
                  onChange={(event) => {
                    setUpdateAbility2(event.target.value);
                  }}
                ></input>
              </div>
            </div>
            <legend id="form-legend">Update Product Image URL</legend>
            <div id="sl-input" className="inner-input-wrap">
              <input
                className="form-inputs"
                type="text"
                //   value={updateImagelink}
                placeholder="https://different.image.than.before.pokemontcg.io/base1..."
                onChange={(event) => {
                  setUpdateImagelink(event.target.value);
                }}
              ></input>
            </div>
            <div id="sl-input" className="inner-input-wrap">
              <legend id="form-legend">Update Product Inventory: </legend>
              <input
                id="inv-ct"
                type="text"
                //   value={updateInventorycount}
                placeholder="#"
                onChange={(event) => {
                  setUpdateInventorycount(event.target.value);
                }}
              ></input>
            </div>
            <div className="inner-input-wrap">
              <legend id="form-legend">Update Product Active Status</legend>
              <div id="isactive-choices">
                <input
                  type="radio"
                  id="isactiveChoice1"
                  name="isactive"
                  // value={updateIsactive}
                  checked
                  onChange={() => {
                    setUpdateIsactive(true);
                  }}
                ></input>
                <label htmlFor="isactiveChoice1"> Active </label>
                <input
                  type="radio"
                  id="isactiveChoice2"
                  name="isactive"
                  // value={updateIsactive}
                  onChange={() => {
                    setUpdateIsactive(false);
                  }}
                ></input>
                <label htmlFor="isactiveChoice2"> Inactive </label>
              </div>
            </div>
          </div>
        </fieldset>
        <button className="form-btn" type="submit">
          Update Product!
        </button>
        <div className="error-message">
          {error ? `${errorMessage}` : `${success}`}
        </div>
      </form>
    </div>
  );
};

export default AdminUpdateProduct;
