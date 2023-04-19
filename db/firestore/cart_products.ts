//@ts-ignore
const { db } = require('./db.js');

const createCartProduct = async ({ cartid, productid, quantity }: any) => {
  console.log('COLUMNS', cartid, productid, quantity);
  try {
    const docRef = await db.collection('cart_products').add({
      cartid,
      productid,
      quantity
    });
    return docRef.id;
  } catch (error) {
    console.error(error);
  }
};

const updateCartProductQty = async ({ id, quantity }: any) => {
  console.log(id, quantity);

  try {
    const writeResult = await db.collection('cart_products').doc(id).update({
      quantity
    });
    console.log('write result, update cart product qty: ', writeResult);
    console.log('cart update write time: ', writeResult.writeTime);
    return;
  } catch (error) {
    console.error(error);
  }
};

const deleteCartProduct = async (cartProductId: string) => {
  console.log(cartProductId);
  try {
    const writeResult = await db
      .collection('cart_products')
      .doc(cartProductId)
      .delete();
    console.log('write result, update cart product qty: ', writeResult);
    console.log('cart update write time: ', writeResult.writeTime);
    return;
  } catch (error) {
    console.error(error);
  }
};

//This function is for an opened cart that has items in it.
const getOpenCartByCustomerId = async (customerId: string) => {
  try {
    const cartsSnap = await db
      .collection('carts')
      .where('customerid', '==', customerId)
      .where('isopen', '==', true)
      .get();
    let cartId: any;
    await cartsSnap.forEach((doc: any) => {
      cartId = doc.id;
    });
    const cpSnap = await db
      .collection('cart_products')
      .where('cartid', '==', cartId)
      .get();
    const cartItems: any[] = [];
    const setItems = async () => {
      cpSnap.forEach((doc: any) => {
        const { productid, quantity } = doc.data();
        console.log('cart products: ', productid, quantity);
        const fetchProduct = async () => {
          const docRef = await db.collection('products').doc(productid).get();
          cartItems.push({ id: docRef.id, quantity, ...await docRef.data() });
        };
        fetchProduct();
      });
      return cartItems;
    };
    console.log('create cart items func: ', await setItems());
    return await setItems();
  } catch (error) {
    return console.error(error);
  }
};

const getPastOrdersByCustomerId = async (customerId: string) => {
  try {
    const docsSnap = await db
      .collection('carts')
      .where('customerid', '==', customerId)
      .where('isopen', '==', false)
      .get();
    const pastOrders: any[] = [];
    docsSnap.forEach((doc: any) => {
      pastOrders.push({ id: doc.id, ...doc.data() });
    });
    return pastOrders;
  } catch (error) {
    return console.error(error);
  }
};

//This routine simply gets the cart ID of the customer's Open cart.
const getOpenCartIdByCustomerId = async (customerId: string) => {
  console.log(customerId);
  try {
    const docsSnap = await db
      .collection('carts')
      .where('customerid', '==', customerId)
      .where('isopen', '==', true)
      .get();
    let cart: any;
    docsSnap.forEach((doc: any) => {
      cart = {
        id: doc.id,
        ...doc.data()
      };
    });
    return cart;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createCartProduct,
  updateCartProductQty,
  deleteCartProduct,
  getOpenCartByCustomerId,
  getPastOrdersByCustomerId,
  getOpenCartIdByCustomerId
};
