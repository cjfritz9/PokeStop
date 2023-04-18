/* 

DO NOT CHANGE THIS FILE

*/
require('dotenv').config();
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const client = require('../../db/client');
const {
  getCustomerById,
  createCustomer,
  getCustomer
} = require('../../dist/firestore');
const { createFakeCustomer } = require('../helpers');

describe('DB customers', () => {
  let finalTestId = 0;

  describe('createCustomer({ username, password })', () => {
    it('Creates the Customer', async () => {
      const fakeCustomerData = {
        username: 'kylet',
        password: faker.internet.password(),
        firstname: 'Kyle',
        lastname: 'Tucker',
        address: '456 Main St. Houston, Florida',
        email: 'ktastros@gmail.com',
        isadmin: false
      };

      const customer = await createCustomer(fakeCustomerData);
      console.log('customer is', customer);

      const queriedCustomer = await getCustomerById(customer.id);

      console.log('queried customer is', queriedCustomer);

      expect(customer.username).toBe(fakeCustomerData.username);
      expect(queriedCustomer.username).toBe(fakeCustomerData.username);
    });

    it('EXTRA CREDIT: Does not store plaintext password in the database', async () => {
      const fakeCustomerData = {
        username: 'josea',
        password: faker.internet.password(),
        firstname: 'Jose',
        lastname: 'Altuve',
        address: '11221 Pearland Pkwy, Pearland, Texas',
        email: 'ja27astros@gmail.com',
        isadmin: false
      };
      const customer = await createCustomer(fakeCustomerData);
      const queriedCustomer = await getCustomerById(customer.id);
      expect(queriedCustomer.password).not.toBe(fakeCustomerData.password);
    });
  }); //end first describe

  describe('getCustomer({ username, password })', () => {
    it('returns the user when the password verifies', async () => {
      const fakeCustomerData = {
        username: 'Nicole',
        password: faker.internet.password(),
        firstname: 'Nicole',
        lastname: 'Simpson',
        address: '11221 Rodeo Drive, Los Angeles, California',
        email: 'nsss@gmail.com',
        isadmin: false
      };
      await createCustomer(fakeCustomerData);

      const customer = await getCustomer(fakeCustomerData);
      expect(customer).toBeTruthy();
      expect(customer.username).toBe(fakeCustomerData.username);
    });

    it("Does not return the user if the password doesn't verify", async () => {
      const fakeCustomerData = {
        username: 'Issac',
        password: faker.internet.password(),
        firstname: 'Issac',
        lastname: 'Hayes',
        address: '11221 Plum St, Sacramento, California',
        email: 'ibruce@gmail.com',
        isadmin: false
      };
      await createCustomer(fakeCustomerData);

      const customer = await getCustomer({
        username: 'Issac',
        password: 'Bad Password'
      });

      expect(customer).toBeFalsy();
    });

    it('Does NOT return the password', async () => {
      const fakeCustomerData = {
        username: 'dennism',
        password: faker.internet.password(),
        firstname: 'Dennis',
        lastname: 'Menace',
        address: '13456 Orange St, San Diego, California',
        email: 'dmenace@gmail.com',
        isadmin: false
      };
      await createCustomer(fakeCustomerData);
      const customer = await getCustomer(fakeCustomerData);
      finalTestId = customer.id;
      expect(customer.password).toBeFalsy();
    });
  }); //end 2nd describe

  describe('getCustomerById', () => {
    it('Gets a customer based on the customer Id', async () => {
      const customer = await getCustomerById(finalTestId);
      expect(customer).toBeTruthy();
      expect(customer.id).toBe(finalTestId);
    });

    it('does not return the password', async () => {
      const customer = await getCustomerById(finalTestId);
      expect(customer.password).toBeFalsy();
    });
  });
});
