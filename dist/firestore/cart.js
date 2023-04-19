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
// const client = require("./client");
//@ts-ignore
const { db } = require('./db.js');
const createCart = (customerid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerid);
    try {
        const docRef = yield db.collection('carts').add({
            customerid,
            isopen: true
        });
        if (!docRef.id)
            return;
        return docRef.id;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getCartIdbyCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerId);
    try {
        const docsSnap = yield db
            .collection('carts')
            .where('customerid', '==', customerId)
            .get();
        let cartId = '';
        docsSnap.forEach((doc) => {
            cartId = doc.id;
        });
        return cartId;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const closeCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield db.collection('carts').doc(cartId).update({
            isopen: false
        });
        if (docRef.empty)
            return;
        return {
            success: true,
            id: docRef.id
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
module.exports = {
    createCart,
    getCartIdbyCustomerId,
    closeCart
};
