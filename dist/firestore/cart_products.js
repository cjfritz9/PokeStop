"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const createCartProduct = ({ cartid, productid, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('COLUMNS', cartid, productid, quantity);
    try {
        // const {
        //   rows: [cartItem],
        // } = await client.query(
        //   `
        //         INSERT INTO cart_products (cartid, productid, quantity)
        //         VALUES ($1, $2, $3)
        //         ON CONFLICT (cartid, productid) DO NOTHING
        //         RETURNING *;
        //     `,
        //   [cartid, productid, quantity]
        // );
        // return cartItem;
    }
    catch (error) {
        console.error(error);
    }
});
const updateCartProductQty = ({ id, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, quantity);
    try {
        // const { rows: [cartItem] } = await client.query(
        //   `
        //     UPDATE cart_products
        //     SET quantity = ${quantity}
        //     WHERE id = ${id}
        //     RETURNING *;
        //   `
        // )
        // return cartItem;
    }
    catch (error) {
        console.error(error);
    }
});
const deleteCartProduct = (cartProductId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(cartProductId);
    try {
        // const {
        //   rows: [cartItem],
        // } = await client.query(
        //   `
        //   DELETE FROM cart_products
        //   WHERE cart_products.id = ${cartProductId}
        //   RETURNING *;
        // `
        // );
        // return cartItem;
    }
    catch (error) {
        console.error(error);
    }
});
//This function is for an opened cart that has items in it.
const getOpenCartByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerId);
    try {
        // const { rows } = await client.query(
        //   `
        //     SELECT cart_products.id, products.id AS "productId",
        //       products.name, cart_products.quantity,
        //       products.price, products.imagelink
        //     FROM products
        //     JOIN cart_products
        //       ON cart_products.productid = products.id
        //     JOIN carts
        //       ON carts.id = cart_products.cartid
        //     WHERE carts.isopen = true
        //       AND carts.customerid = ${customerId}
        //   `
        // );
        // console.log("CART ITEMS DB", rows)
        // return rows;
    }
    catch (error) {
        console.error(error);
    }
});
const getClosedCartByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerId);
    try {
        // const { rows } = await client.query(
        //   `
        //     SELECT cart_products.id, products.id AS "productId",
        //       products.name, cart_products.quantity, cart_products.cartid,
        //       products.price, products.imagelink
        //     FROM products
        //     JOIN cart_products
        //       ON cart_products.productid = products.id
        //     JOIN carts
        //       ON carts.id = cart_products.cartid
        //     WHERE carts.isopen = false
        //       AND carts.customerid = ${customerId}
        //   `
        // );
        // console.log("CART ITEMS DB", rows);
        // return rows;
    }
    catch (error) {
        console.error(error);
    }
});
const getPastOrdersByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerId);
    try {
        // const { rows } = await client.query(
        //   `
        // SELECT cart_products.id, products.id AS "productId",
        //   products.name, cart_products.quantity,
        //   products.price, products.imagelink,
        //   carts.isopen, cart_products.cartid
        // FROM products
        // JOIN cart_products
        //   ON cart_products.productid = products.id
        // JOIN carts
        //   ON carts.id = cart_products.cartid
        // WHERE carts.customerid = ${customerId}
        //   `
        // );
        // return rows;
    }
    catch (error) {
        console.error(error);
    }
});
//This routine simply gets the cart ID of the customer's Open cart.
const getOpenCartIdByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerId);
    try {
        // const { rows: [cart] } = await client.query(
        //   `
        //     SELECT carts.id
        //     FROM carts
        //     WHERE carts.isopen = true
        //     AND carts.customerid = ${customerId}
        //   `
        // );
        // return cart;
    }
    catch (error) {
        console.error(error);
    }
});
module.exports = {
    createCartProduct,
    updateCartProductQty,
    deleteCartProduct,
    getOpenCartByCustomerId,
    getPastOrdersByCustomerId,
    getClosedCartByCustomerId,
    getOpenCartIdByCustomerId
};
