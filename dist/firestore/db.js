"use strict";
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
initializeApp({
    credential: applicationDefault()
});
//@ts-ignore
const db = getFirestore();
module.exports = {
    db
};
