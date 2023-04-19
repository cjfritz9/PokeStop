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
//@ts-ignore
const { db } = require('./db.js');
const createCartProduct = ({ cartid, productid, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('COLUMNS', cartid, productid, quantity);
    try {
        const docRef = yield db.collection('cart_products').add({
            cartid,
            productid,
            quantity
        });
        return docRef.id;
    }
    catch (error) {
        console.error(error);
    }
});
const updateCartProductQty = ({ id, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, quantity);
    try {
        const writeResult = yield db.collection('cart_products').doc(id).update({
            quantity
        });
        console.log('write result, update cart product qty: ', writeResult);
        console.log('cart update write time: ', writeResult.writeTime);
        return;
    }
    catch (error) {
        console.error(error);
    }
});
const deleteCartProduct = (cartProductId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(cartProductId);
    try {
        const writeResult = yield db
            .collection('cart_products')
            .doc(cartProductId)
            .delete();
        console.log('write result, update cart product qty: ', writeResult);
        console.log('cart update write time: ', writeResult.writeTime);
        return;
    }
    catch (error) {
        console.error(error);
    }
});
//This function is for an opened cart that has items in it.
const getOpenCartByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartsSnap = yield db
            .collection('carts')
            .where('customerid', '==', customerId)
            .where('isopen', '==', true)
            .get();
        let cartId;
        yield cartsSnap.forEach((doc) => {
            cartId = doc.id;
        });
        const cpSnap = yield db
            .collection('cart_products')
            .where('cartid', '==', cartId)
            .get();
        const cartItems = [];
        const setItems = () => __awaiter(void 0, void 0, void 0, function* () {
            cpSnap.forEach((doc) => {
                const { productid, quantity } = doc.data();
                console.log('cart products: ', productid, quantity);
                const fetchProduct = () => __awaiter(void 0, void 0, void 0, function* () {
                    const docRef = yield db.collection('products').doc(productid).get();
                    cartItems.push(Object.assign({ id: docRef.id, quantity }, yield docRef.data()));
                });
                fetchProduct();
            });
            return cartItems;
        });
        console.log('create cart items func: ', yield setItems());
        return yield setItems();
    }
    catch (error) {
        return console.error(error);
    }
});
const getPastOrdersByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docsSnap = yield db
            .collection('carts')
            .where('customerid', '==', customerId)
            .where('isopen', '==', false)
            .get();
        const pastOrders = [];
        docsSnap.forEach((doc) => {
            pastOrders.push(Object.assign({ id: doc.id }, doc.data()));
        });
        return pastOrders;
    }
    catch (error) {
        return console.error(error);
    }
});
//This routine simply gets the cart ID of the customer's Open cart.
const getOpenCartIdByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerId);
    try {
        const docsSnap = yield db
            .collection('carts')
            .where('customerid', '==', customerId)
            .where('isopen', '==', true)
            .get();
        let cart;
        docsSnap.forEach((doc) => {
            cart = Object.assign({ id: doc.id }, doc.data());
        });
        return cart;
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
    getOpenCartIdByCustomerId
};
