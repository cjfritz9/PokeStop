// const client = require("./client");
const bcrypt = require('bcrypt');
//@ts-ignore
const { db } = require('./db.js');

const createCustomer = async ({
  username,
  password,
  firstname,
  lastname,
  email,
  address,
  isadmin = false
}: any) => {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    console.log(
      username,
      firstname,
      lastname,
      email,
      hashedPassword,
      address,
      isadmin
    );

    const docRef: any = await db.collection('customers').add({
      username,
      password: hashedPassword,
      firstname,
      lastname,
      email,
      address,
      isadmin
    });
    if (!docRef.id) return;
    const addedCustomer = (
      await db.collection('customers').doc(docRef.id).get()
    ).data();

    return {
      id: docRef.id,
      ...addedCustomer
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateCustomer = async ({ id, ...fields }: any) => {
  console.log('FIELDS', fields);
  if (fields.password) {
    const SALT_COUNT = 10;
    fields.password = await bcrypt.hash(fields.password, SALT_COUNT);
  }
  try {
    const writeResult = await db
      .collection('customers')
      .doc(id)
      .update({
        ...fields
      });
    console.log('update customer, result: ', writeResult);
    console.log('update time: ', writeResult.writeTime);
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomer = async ({ username, password }: any): Promise<any> => {
  try {
    const customer: any = await getCustomerByUsername(username);
    if (!customer) {
      return;
    }

    const hashedPassword = customer.password;
    console.log('created customers PWs', password, hashedPassword);
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      return {
        id: customer.id,
        username: customer.username,
        admin: customer.isadmin
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const getCustomerById = async (customerId: string) => {
  try {
    const docRef: any = await db.collection('customers').doc(customerId).get();
    if (docRef && docRef.empty) return;

    return {
      id: docRef.id,
      ...docRef.data()
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomerByUsername = async (username: string) => {
  console.log(username);
  try {
    const docRef: any = await db
      .collection('customers')
      .where('username', '==', username)
      .get();
    if (docRef.empty) return;
    let customer: any = {};
    docRef.forEach((doc: any) => {
      customer = {
        id: doc.id,
        ...doc.data()
      };
    });

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomerByEmail = async (email: string) => {
  console.log(email);
  try {
    const docRef: any = await db
      .collection('customers')
      .where('email', '==', email)
      .get();
    if (docRef.empty) return;
    let customer: any = {};
    docRef.forEach((doc: any) => {
      customer = {
        id: doc.id,
        ...doc.data()
      };
    });

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createCustomer,
  updateCustomer,
  getCustomer,
  getCustomerById,
  getCustomerByUsername,
  getCustomerByEmail
};
