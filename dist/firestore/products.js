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
const { db } = require('./db');
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Inside db/getAllProducts');
    try {
        const collectionRef = yield db.collection('products').get();
        console.log('coll docs', collectionRef.docs);
        return collectionRef.docs.map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(productId);
    try {
        const docRef = yield db.collection('products').doc(productId).get();
        return Object.assign({ id: productId }, docRef.data());
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
module.exports = {
    getAllProducts,
    getProductById
};
