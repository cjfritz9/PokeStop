const express = require("express");
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { getCustomerById } = require("../db");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

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
    console.log("User is set: ", req.user);
  } else {
    console.log("No user set.");
  }
  next();
});

const customersRouter = require("./customers");
const productsRouter = require("./products");
apiRouter.use("/customers", customersRouter);
apiRouter.use("/products", productsRouter);

module.exports = apiRouter;
