const express = require("express");
const productsRouter = express.Router();
const client = require("../db/client");

const { 
  getAllProducts, 
  getProductById 
} = require("../db");

//Get all the products
productsRouter.get("/", async (req, res, next) => {
  console.log("Inside GET for all products");
  try {
    const products = await getAllProducts();
    res.send({
      data: products,
      success: true,
    });
  } catch ({ error, message }) {
    next({ error, message });
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  console.log("PRODUCT ID", productId)

  try {
    const product = await getProductById(productId);

    if (!product) {
      next({
        error: "InvalidProductID",
        message: `No product found matching ID: ${productId}`
      })
    } else {
      res.send({
        data: product,
        success: true
      })
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
})

productsRouter.patch("/", async (req, res, next) => {

  const { id, amountToSubtract } = req.body;

  console.log("inside patch product and params are", id, amountToSubtract);

  try {
    const { rows: [product] } = await client.query(
      `
      UPDATE products
      SET inventorycount = inventorycount - ${amountToSubtract}
      WHERE products.id = ${id}
      RETURNING *;
    `);
    
    return product;
  } catch ({ error, message }) {
    next({ error, message });
  }
})

module.exports = productsRouter;
