const express = require('express');
const cartProductsRouter = express.Router();
const {
  getOpenCartByCustomerId,
  getOpenCartIdByCustomerId,
  getPastOrdersByCustomerId,
  createCartProduct,
  updateCartProductQty,
  deleteCartProduct
} = require('../dist/firestore');
const { requireUser } = require('./utils');

cartProductsRouter.get('/', requireUser, async (req, res, next) => {
  const { id } = req.user;
  console.log('USER', req.user);

  try {
    const cart = await getOpenCartByCustomerId(id);

    console.log('CART', cart);

    if (cart.length === 0 || Object.keys(cart).length === 0) {
      res.send({
        message: 'Cart is Empty'
      });
    } else {
      res.send(cart);
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

cartProductsRouter.post('/', requireUser, async (req, res, next) => {
  const { id: customerId } = req.user;
  const { productid, quantity } = req.body;

  try {
    const cart = await getOpenCartIdByCustomerId(customerId);
    const cartid = cart.id;

    const cartItem = await createCartProduct({ cartid, productid, quantity });

    res.send({
      cartItem,
      success: 'Successfully added to cart'
    });
  } catch ({ error, message }) {
    next({ error, message });
  }
});

cartProductsRouter.patch('/', requireUser, async (req, res, next) => {
  const { id, quantity } = req.body;
  console.log('IN PATCH', id, quantity);
  try {
    const updatedItem = await updateCartProductQty({ id, quantity });
    console.log('IN PATCH', updatedItem);

    res.send({
      updatedItem,
      success: `Updated ${updatedItem.name}'s quantity to ${updatedItem.quantity}`
    });
  } catch ({ error, message }) {
    next({ error, message });
  }
});

cartProductsRouter.delete('/', requireUser, async (req, res, next) => {
  const { id: cartProductId } = req.body;

  try {
    const deletedProduct = await deleteCartProduct(cartProductId);

    if (Object.keys(deletedProduct).length === 0) {
      next({
        error: 'Item already deleted, please refresh.'
      });
    } else {
      res.send({
        deletedProduct,
        success: `Successfully removed ${deletedProduct.name} from cart`
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

cartProductsRouter.get('/closedcarts', requireUser, async (req, res, next) => {
  const { id } = req.user;
  console.log('USER', req.user);

  try {
    const cart = await getPastOrdersByCustomerId(id);

    console.log('CART', cart);

    if (cart.length === 0 || Object.keys(cart).length === 0) {
      res.send({
        message: 'Cart is Empty'
      });
    } else {
      res.send(cart);
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

module.exports = cartProductsRouter;
