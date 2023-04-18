const express = require('express');
const cartsRouter = express.Router();
const { requireUser } = require('./utils');
const {
  getOpenCartIdByCustomerId,
  closeCart,
  createCart
} = require('../dist/firestore');

cartsRouter.patch('/', requireUser, async (req, res, next) => {
  const { id: customerId } = req.user;
  console.log('Inside cart patch and customer Id is', customerId);
  try {
    const { id: cartid } = await getOpenCartIdByCustomerId(customerId);

    console.log('cartId is ', cartid);
    const cart = await closeCart(cartid);
    console.log('cart is', cart);

    res.send({
      cart,
      success: 'Successfully closed the cart'
    });
  } catch ({ error, message }) {
    next({ error, message });
  }
});

cartsRouter.post('/', requireUser, async (req, res, next) => {
  const { id: customerId } = req.user;
  console.log('Inside POST for  carts and customer is', customerId);

  try {
    const { id: cartid } = await createCart(customerId);

    console.log('cartId is ', cartid);

    res.send({
      cartid,
      success: 'Successfully created a new Open cart'
    });
  } catch ({ error, message }) {
    next({ error, message });
  }
});

module.exports = cartsRouter;
