const express = require('express');
const customersRouter = express.Router();
const {
  createCustomer,
  getCustomer,
  getCustomerByUsername,
  updateCustomer,
  getCustomerByEmail,
  createCart,
  getCustomerById
} = require('../dist/firestore');
const { requireUser } = require('./utils');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// LOGIN
customersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const customer = await getCustomer({ username, password });

  if (!username || !password) {
    next({
      error: 'MissingCredentials',
      message: 'Please provide both a username and password'
    });
  }

  try {
    if (customer) {
      const token = jwt.sign(customer, JWT_SECRET, { expiresIn: '1w' });

      res.send({
        customer,
        message: 'Login successful.',
        token
      });
    } else {
      next({
        error: 'Invalid Credentials',
        message: 'Incorrect username or password.'
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

// REGISTER
customersRouter.post('/register', async (req, res, next) => {
  const {
    username,
    password,
    confirmPassword,
    firstname,
    lastname,
    email,
    address
  } = req.body;

  try {
    const _customer = await getCustomerByUsername(username);
    console.log('taken customer name', _customer)
    const _email = await getCustomerByEmail(email);
    if (_customer) {
      next({
        error: 'Username Exists',
        message: `${username} is already taken.`
      });
    } else if (_email) {
      next({
        error: 'E-mail Exists',
        message: `${email} is already taken.`
      });
    } else if (password.length < 8) {
      next({
        error: 'Password Too Short',
        message: 'Minimum password length is 8 characters'
      });
    } else if (password !== confirmPassword) {
      next({
        error: 'Passwords do not match',
        message: 'Passwords do not match'
      });
    } else {
      const customerData = await createCustomer({
        username,
        password,
        firstname,
        lastname,
        email,
        address
      });

      const { id } = customerData;
      await createCart(id);

      const token = jwt.sign(customerData, JWT_SECRET, {
        expiresIn: '1w'
      });

      res.send({
        customer: customerData,
        success: 'Thanks for signing up!',
        token
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

// PATCH
customersRouter.patch(
  '/:username/edit',
  requireUser,
  async (req, res, next) => {
    const { id, username: _username } = req.user;
    const { username } = req.params;
    const customerInputs = ({
      firstname,
      lastname,
      password,
      confirmPassword,
      email,
      address
    } = req.body);
    customerInputs.id = id;

    Object.keys(customerInputs).forEach((key) => {
      if (customerInputs[key] === '') {
        delete customerInputs[key];
      }
    });

    if (password && password !== confirmPassword) {
      next({
        error: 'Passwords do not match',
        message: 'Passwords do not match'
      });
    } else if (password && password.length < 8) {
      next({
        error: 'Password Too Short',
        message: 'Minimum password length is 8 characters'
      });
    } else if (!Object.keys(customerInputs).length) {
      next({
        error: 'No Fields Submitted',
        message: 'You must update at least one field before submission'
      });
    } else {
      try {
        const _email = await getCustomerByEmail(email);

        if (username !== _username) {
          res.status(403).send({
            name: 'Unauthorized User',
            message: `${_username} cannot update ${username}'s information.`
          });
        } else if (_email) {
          next({
            error: 'E-mail Exists',
            message: `${email} is already taken.`
          });
        } else {
          if (customerInputs.confirmPassword) {
            delete customerInputs.confirmPassword;
          }
          console.log('CUSTOMER INPUTS', customerInputs);
          await updateCustomer(customerInputs);

          res.send({
            customerInputs,
            success: `Successfully updated ${username}'s profile!`
          });
        }
      } catch ({ error, message }) {
        next({ error, message });
      }
    }
  }
);

// GET /api/customers/me PLACEHOLDER
customersRouter.get('/me', requireUser, async (req, res, next) => {
  const { username } = req.user;
  try {
    const customer = await getCustomerByUsername(username);
    res.send(customer);
  } catch ({ error, message }) {
    next({ error, message });
  }
});

module.exports = customersRouter;
