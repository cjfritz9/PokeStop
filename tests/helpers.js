//const faker = require("faker");
const { faker } = require('@faker-js/faker');
const { createCustomer } = require('../dist/firestore/customers.js');

const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'neverTell' } = process.env;

// This contains helper functions which create fake entries in the database
// for the tests.
const createFakeCustomer = async (username = faker.random.uuid()) => {
  const fakeCustomerData = {
    username: username,
    password: faker.internet.password(),
    firstname: 'Robert',
    lastname: 'Murphy',
    address: '123 Elm St. Reno, Nevada',
    email: 'rmurphy123@gmail.com',
    isadmin: false
  };
  const customer = await createCustomer(fakeCustomerData);
  if (!customer) {
    throw new Error("createCustomer didn't return a customer");
  }
  return customer;
};

/*
const createFakeUserWithToken = async (username) => {
  const fakeUser = await createFakeUser(username);

  const token = jwt.sign(
    { id: fakeUser.id, username: fakeUser.username },
    JWT_SECRET,
    { expiresIn: "1w" }
  );

  return {
    fakeUser,
    token,
  };
};

*/

module.exports = { createFakeCustomer };
