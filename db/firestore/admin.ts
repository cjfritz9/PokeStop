import { DocumentData } from 'firebase-admin/firestore';
import db from './db.js';

const adminCheckById = async (id: string) => {
  try {
    const userDoc: DocumentData = await db
      .collection('customers')
      .doc(id)
      .get();
    if (userDoc.empty) return;
    const user: any = userDoc.data();
    if (user.isadmin) {
      return user;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminCreateProduct = async ({
  name,
  price,
  condition,
  rarity,
  ability1,
  ability2,
  imagelink,
  inventorycount,
  isactive
}: any) => {
  try {
    const preexistingProduct = await db
      .collection('products')
      .where('name', '==', name)
      .get();
    if (preexistingProduct) return;
    const product: any = await db.collection('products').add({
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
    if (!product.id) return;
    const addedProduct = (
      await db.collection('products').doc(product.id).get()
    ).data();

    return addedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminGetProductIdByName = async (name: string) => {
  try {
    if (!name) {
      return;
    }

    const productsSnapshot: any = await db
      .collection('products')
      .where('name', '==', name)
      .get();
    if (!productsSnapshot) return;
    let product: any;
    productsSnapshot.forEach((_product: any) => {
      product = _product.data();
    });
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminUpdateProductById = async ({ id, ...fields }) => {
  const docFields = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(', ');

  if (docFields.length === 0) {
    return;
  }
  try {
    const docRef: any = await db.collection('products').doc(id).get();
    if (docRef.empty) return;
    await docRef.update({ ...fields });
    const updatedProduct: any = (
      await db.collection('products').doc(id).get()
    ).data();

    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminSetActiveProductById = async (id: string, bool: boolean) => {
  try {
    const docRef = db.collection('products').doc(id);
    const snapshot = await docRef.update({ isactive: bool });
    if (!snapshot) return;
    const updatedProduct = (await docRef.get()).data();
    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminGetCustomerByUsername = async (username: string) => {
  try {
    const docRef = await db
      .collection('customers')
      .where('username', '==', username)
      .get();
    if (docRef.empty) return;
    let customer: any;
    docRef.forEach((doc: any) => {
      customer = doc.data();
    });
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCartsByCustomerId = async (id: string) => {
  try {
    const docRef: any = await db
      .collection('carts')
      .where('customerid', '==', id)
      .get();
    docRef.empty();
    const carts: any[] = [];
    docRef.forEach((cart: any) => {
      carts.push(cart.data());
    });
    return carts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCartProductsByCartId = async (cartid: string) => {
  try {
    const docRef: any = await db
      .collection('cart_products')
      .where('cartid', '==', cartid)
      .get();
    if (docRef.empty()) return;

    const cartProducts: any[] = [];
    docRef.forEach((cart: any) => {
      cartProducts.push(cart.data());
    });
    return cartProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminDeleteCustomer = async (id: string) => {
  try {
    const docRef: any = db.collection('customers').doc(id);
    await docRef.delete();
    const customer: any = await docRef.get();

    const cartsRef = await db
      .collection('carts')
      .where('customerid', '==', id)
      .get();
    cartsRef.forEach((cart: any) => {
      db.collection('carts').doc(cart.id).delete();
      db.collection('cart_products')
        .where('cartid', '==', cart.id)
        .get()
        .then((products: any) => {
          products.forEach((product: any) => {
            db.collection('cart_products').doc(product.id).delete();
          });
        })
        .catch((err: any) => {
          console.error('deleting customer related data error', err);
        });
    });
    return customer.data();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const setAdminStatus = async (id: string, bool: boolean) => {
  try {
    const docRef: any = db.collection('customers').doc(id);
    if (!(await docRef.get().exists)) return;
    await docRef.update({ isadmin: bool });
    const customer = await db.collection('customers').doc(id).get();
    return {
      id: customer.id,
      ...customer.data()
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
