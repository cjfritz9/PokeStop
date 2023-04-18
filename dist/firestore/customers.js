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
// const client = require("./client");
const bcrypt = require('bcrypt');
//@ts-ignore
const { db } = require('./db.js');
const createCustomer = ({ username, password, firstname, lastname, email, address, isadmin = false }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SALT_COUNT = 10;
        const hashedPassword = yield bcrypt.hash(password, SALT_COUNT);
        console.log(username, firstname, lastname, email, hashedPassword, address, isadmin);
        const docRef = yield db.collection('customers').add({
            username,
            hashedPassword,
            firstname,
            lastname,
            email,
            address,
            isadmin
        });
        if (!docRef.id)
            return;
        const addedCustomer = (yield db.collection('customers').doc(docRef.id).get()).data();
        return Object.assign({ id: docRef.id }, addedCustomer);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const updateCustomer = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { id } = _a, fields = __rest(_a, ["id"]);
    console.log('FIELDS', fields);
    if (fields.password) {
        const SALT_COUNT = 10;
        fields.password = yield bcrypt.hash(fields.password, SALT_COUNT);
    }
    try {
        // const {
        //   rows: [customer]
        // } = await client.query(
        //   `
        //         UPDATE customers
        //         SET ${columns}
        //         WHERE id = ${id}
        //         RETURNING *;
        //     `,
        //   Object.values(fields)
        // );
        // return customer;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getCustomer = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield getCustomerByUsername(username);
        console.log('get customer after register', customer);
        if (!customer) {
            return;
        }
        const hashedPassword = customer.password;
        console.log('created customers PWs', password, hashedPassword);
        const passwordsMatch = yield bcrypt.compare(password, hashedPassword);
        if (passwordsMatch) {
            return {
                id: customer.id,
                username: customer.username,
                admin: customer.isadmin
            };
        }
    }
    catch (error) {
        console.error(error);
    }
});
const getCustomerById = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerId);
    try {
        // const {
        //   rows: [customer]
        // } = await client.query(`
        //         SELECT id, username
        //         FROM customers
        //         WHERE id = ${customerId};
        //     `);
        // return customer;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getCustomerByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(username);
    try {
        const docRef = yield db
            .collection('customers')
            .where('username', '==', username)
            .get();
        if (docRef.empty)
            return;
        let customer = {};
        docRef.forEach((doc) => {
            customer = Object.assign({ id: doc.id }, doc.data());
        });
        return customer;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getCustomerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email);
    try {
        // const {
        //   rows: [customer]
        // } = await client.query(
        //   `
        //         SELECT *
        //         FROM customers
        //         WHERE email = $1;
        //     `,
        //   [email]
        // );
        // return customer;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
module.exports = {
    createCustomer,
    updateCustomer,
    getCustomer,
    getCustomerById,
    getCustomerByUsername,
    getCustomerByEmail
};
