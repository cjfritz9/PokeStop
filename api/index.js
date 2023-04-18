const express = require('express');
const apiRouter = express.Router();
const chalk = require('chalk');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { getCustomerById } = require('../dist/firestore');

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getCustomerById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log(chalk.green('User is set: ', req.user));
  } else {
    console.log(chalk.red('No user set.'));
  }
  next();
});

const customersRouter = require('./customers');
apiRouter.use('/customers', customersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const adminRouter = require('./admin');
apiRouter.use('/admin', adminRouter);

const cartProductsRouter = require('./cart_products');
apiRouter.use('/cart_products', cartProductsRouter);

const cartsRouter = require('./carts');
apiRouter.use('/carts', cartsRouter);

module.exports = apiRouter;
