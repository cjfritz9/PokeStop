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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const adminCheckById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDoc = yield db
            .collection('customers')
            .doc(id)
            .get();
        if (userDoc.empty)
            return;
        const user = userDoc.data();
        if (user.isadmin) {
            return user;
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const adminCreateProduct = ({ name, price, condition, rarity, ability1, ability2, imagelink, inventorycount, isactive }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preexistingProduct = yield db
            .collection('products')
            .where('name', '==', name)
            .get();
        if (preexistingProduct)
            return;
        const product = yield db.collection('products').add({
            name,
            price,
            condition,
            rarity,
            ability1,
            ability2,
            imagelink,
            inventorycount,
            isactive
        });
        if (!product.id)
            return;
        const addedProduct = (yield db.collection('products').doc(product.id).get()).data();
        return addedProduct;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const adminGetProductIdByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!name) {
            return;
        }
        const productsSnapshot = yield db
            .collection('products')
            .where('name', '==', name)
            .get();
        if (!productsSnapshot)
            return;
        let product;
        productsSnapshot.forEach((_product) => {
            product = _product.data();
        });
        return product;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const adminUpdateProductById = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { id } = _a, fields = __rest(_a, ["id"]);
    const docFields = Object.keys(fields)
        .map((key, idx) => `"${key}"=$${idx + 1}`)
        .join(', ');
    if (docFields.length === 0) {
        return;
    }
    try {
        const docRef = yield db.collection('products').doc(id).get();
        if (docRef.empty)
            return;
        yield docRef.update(Object.assign({}, fields));
        const updatedProduct = (yield db.collection('products').doc(id).get()).data();
        return updatedProduct;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const adminSetActiveProductById = (id, bool) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = db.collection('products').doc(id);
        const snapshot = yield docRef.update({ isactive: bool });
        if (!snapshot)
            return;
        const updatedProduct = (yield docRef.get()).data();
        return updatedProduct;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const adminGetCustomerByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield db
            .collection('customers')
            .where('username', '==', username)
            .get();
        if (docRef.empty)
            return;
        let customer;
        docRef.forEach((doc) => {
            customer = doc.data();
        });
        return customer;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getCartsByCustomerId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield db
            .collection('carts')
            .where('customerid', '==', id)
            .get();
        docRef.empty();
        const carts = [];
        docRef.forEach((cart) => {
            carts.push(cart.data());
        });
        return carts;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getCartProductsByCartId = (cartid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield db
            .collection('cart_products')
            .where('cartid', '==', cartid)
            .get();
        if (docRef.empty())
            return;
        const cartProducts = [];
        docRef.forEach((cart) => {
            cartProducts.push(cart.data());
        });
        return cartProducts;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const adminDeleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = db.collection('customers').doc(id);
        yield docRef.delete();
        const customer = yield docRef.get();
        const cartsRef = yield db
            .collection('carts')
            .where('customerid', '==', id)
            .get();
        cartsRef.forEach((cart) => {
            db.collection('carts').doc(cart.id).delete();
            db.collection('cart_products')
                .where('cartid', '==', cart.id)
                .get()
                .then((products) => {
                products.forEach((product) => {
                    db.collection('cart_products').doc(product.id).delete();
                });
            })
                .catch((err) => {
                console.error('deleting customer related data error', err);
            });
        });
        return customer.data();
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const setAdminStatus = (id, bool) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = db.collection('customers').doc(id);
        if (!(yield docRef.get().exists))
            return;
        yield docRef.update({ isadmin: bool });
        const customer = yield db.collection('customers').doc(id).get();
        return Object.assign({ id: customer.id }, customer.data());
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
module.exports = {
    adminCheckById,
    adminCreateProduct,
    adminGetProductIdByName,
    adminUpdateProductById,
    adminSetActiveProductById,
    adminGetCustomerByUsername,
    adminDeleteCustomer,
    getCartProductsByCartId,
    setAdminStatus
};
