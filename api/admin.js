const express = require('express');
const adminRouter = express.Router();
const {
  adminCreateProduct,
  adminGetProductIdByName,
  adminUpdateProductById,
  adminSetActiveProductById,
  adminGetCustomerByUsername,
  setAdminStatus,
  adminDeleteCustomer
} = require('../dist/firestore');
const { requireAdmin } = require('./utils');

adminRouter.post('/products', requireAdmin, async (req, res, next) => {
  const fieldName = ({
    name: productName,
    price,
    condition,
    rarity,
    ability1,
    ability2,
    imagelink,
    inventorycount,
    isactive
  } = req.body);

  try {
    const _product = await adminGetProductIdByName(productName);
    if (_product) {
      next({
        error: 'Product Exists',
        message: `${productName} already exists. Try making it active.`
      });
    }
    const product = await adminCreateProduct(fieldName);
    if (!product) {
      next({
        error: 'Error Creating Product',
        message: 'Error Creating Product'
      });
    }
    res.send({
      product,
      success: 'Product Created!'
    });
  } catch ({ error, message }) {
    next({ error, message });
  }
});

adminRouter.patch('/editproduct', requireAdmin, async (req, res, next) => {
  const adminInputs = ({
    currentName,
    name: productName,
    price,
    condition,
    rarity,
    ability1,
    ability2,
    imagelink,
    inventorycount,
    isactive
  } = req.body);
  console.log('ADMIN INPUTS', adminInputs);

  Object.keys(adminInputs).forEach((key) => {
    if (adminInputs[key] === '') {
      delete adminInputs[key];
    }
  });

  console.log('ADMIN INPUTS AFTER CHANGE', adminInputs);
  const product = await adminGetProductIdByName(currentName);
  console.log('PRODUCT', product);
  const _product = await adminGetProductIdByName(productName);

  if (!product) {
    next({
      error: "Product doesn't exist",
      message: `${currentName} doesn't exist in our inventory yet.`
    });
  }
  if (_product) {
    next({
      error: 'Product already exists',
      message: `${productName} already exists in our inventory.`
    });
  }
  try {
    adminInputs.id = product.id;
    delete adminInputs.currentName;
    const updatedProduct = await adminUpdateProductById(adminInputs);

    if (updatedProduct) {
      res.send({
        updatedProduct,
        success: `Successfully updated fields: ${adminInputs}`
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

adminRouter.patch('/setactiveproduct', requireAdmin, async (req, res, next) => {
  const { name: productName, isactive } = req.body;
  try {
    const product = await adminGetProductIdByName(productName);
    if (!product) {
      next({
        error: "Product doesn't exist",
        message: `${productName} doesn't exist in our inventory yet.`
      });
    } else {
      const id = product.id;
      await adminSetActiveProductById(id, isactive);

      res.send({
        success: `Successfully changed active status for ${productName}`
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

adminRouter.get('/:username/info', requireAdmin, async (req, res, next) => {
  const { username } = req.params;
  try {
    const viewCustomer = await adminGetCustomerByUsername(username);
    console.log('CUST', viewCustomer);
    if (!viewCustomer) {
      next({
        error: "Customer doesn't exist",
        message: `${username} is not a registered customer.`
      });
    } else {
      res.send({
        viewCustomer,
        success: `${username}`
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

adminRouter.delete('/deletecustomer', requireAdmin, async (req, res, next) => {
  const { id } = req.body;
  try {
    const { username } = await adminDeleteCustomer(id);

    res.send({
      success: `${username} successfully deleted`
    });
  } catch ({ error, message }) {
    next({ error, message });
  }
});

adminRouter.patch('/setadmin', requireAdmin, async (req, res, next) => {
  const { id, isadmin } = req.body;
  try {
    const { username, isadmin: adminStatus } = await setAdminStatus(
      id,
      isadmin
    );

    if (adminStatus) {
      res.send({
        success: `${username} is now an Admin.`
      });
    } else {
      res.send({
        success: `${username} is no longer an Admin.`
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

module.exports = adminRouter;
