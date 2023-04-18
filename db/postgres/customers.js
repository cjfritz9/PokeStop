const client = require("./client");
const bcrypt = require("bcrypt");

const createCustomer = async ({
  username,
  password,
  firstname,
  lastname,
  email,
  address,
  isadmin = false,
}) => {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [customer],
    } = await client.query(
      `
            INSERT INTO customers (username, password, firstname, lastname, email, address, isadmin)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (username, email) DO NOTHING
            RETURNING id, username;
        `,
      [username, hashedPassword, firstname, lastname, email, address, isadmin]
    );

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateCustomer = async ({ id, ...fields }) => {
  console.log("FIELDS", fields);
  if (fields.password) {
    const SALT_COUNT = 10;
    fields.password = await bcrypt.hash(fields.password, SALT_COUNT);
  }
  const columns = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (columns.length === 0) {
    return;
  }

  try {
    const {
      rows: [customer],
    } = await client.query(
      `
            UPDATE customers
            SET ${columns}
            WHERE id = ${id}
            RETURNING *;
        `,
      Object.values(fields)
    );

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomer = async ({ username, password }) => {
  try {
    const customer = await getCustomerByUsername(username);
    if (!customer) {
      return;
    }

    const hashedPassword = customer.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      const validCustomer = {
        id: customer.id,
        username: customer.username,
        admin: customer.isadmin,
      };
      return validCustomer;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomerById = async (customerId) => {
  try {
    const {
      rows: [customer],
    } = await client.query(`
            SELECT id, username
            FROM customers
            WHERE id = ${customerId};
        `);

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomerByUsername = async (username) => {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
            SELECT *
            FROM customers
            WHERE username = '${username}';
        `
    );

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomerByEmail = async (email) => {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
            SELECT *
            FROM customers
            WHERE email = $1;
        `,
      [email]
    );

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
  getCustomerByEmail,
};
