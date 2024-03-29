//@ts-ignore
const { db } = require('./db.js');

const getAllProducts = async () => {
  console.log('Inside db/getAllProducts');
  try {
    const collectionRef: any = await db.collection('products').get();

    console.log('coll docs', collectionRef.docs);
    return collectionRef.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const seedProducts = async (products: any[]) => {
//   try {
//     products.forEach(async (card) => {
//       const docRef = await db.collection('products').add(card);
//       console.log('newly created product doc: ', docRef.id, docRef);
//     });
//   } catch (err) {
//     return console.error(err);
//   }
// };

const getProductById = async (productId: any) => {
  console.log(productId);
  try {
    const docRef: any = await db.collection('products').doc(productId).get();
    return {
      id: productId,
      ...docRef.data()
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById
};
