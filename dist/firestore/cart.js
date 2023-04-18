"use strict";
// const client = require("./client");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const createCart = (customerid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerid);
    try {
        // const { rows: [cart] } = await client.query(
        //   `
        //         INSERT INTO carts (customerid)
        //         VALUES ($1)
        //         RETURNING *;
        //     `,
        //   [customerid]
        // );
        // return cart;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getCartIdbyCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerId);
    try {
        // const { rows: [id] } = await client.query(`
        //   SELECT id
        //   FROM carts
        //   WHERE carts.customerid = ${customerId}
        // `)
        // return id;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const closeCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(cartId);
    try {
        // const { rows: [cart] } = await client.query(`
        //   UPDATE carts 
        //   SET isopen = false
        //   WHERE id = ${cartId}
        // `)
        // return cart;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
module.exports = {
    createCart,
    getCartIdbyCustomerId,
    closeCart,
};
