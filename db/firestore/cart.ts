// const client = require("./client");
//@ts-ignore
const { db } = require('./db.js');

const createCart = async (customerid: string) => {
  console.log(customerid);
  try {
    const docRef = await db.collection('carts').add({
      customerid,
      isopen: true
    });
    if (!docRef.id) return;
    return docRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCartIdbyCustomerId = async (customerId: string) => {
  console.log(customerId);
  try {
    const docsSnap = await db
      .collection('carts')
      .where('customerid', '==', customerId)
      .get();
    let cartId = '';
    docsSnap.forEach((doc: any) => {
      cartId = doc.id;
    });
    return cartId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const closeCart = async (cartId: string) => {
  try {
    const docRef = await db.collection('carts').doc(cartId).update({
      isopen: false
    });
    if (docRef.empty) return;
    return {
      success: true,
      id: docRef.id
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createCart,
  getCartIdbyCustomerId,
  closeCart
};
