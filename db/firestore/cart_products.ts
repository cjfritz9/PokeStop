const client = require("./client");

const createCartProduct = async ({ cartid, productid, quantity }) => {
  console.log("COLUMNS", cartid, productid, quantity);
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
            INSERT INTO cart_products (cartid, productid, quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT (cartid, productid) DO NOTHING
            RETURNING *;
        `,
      [cartid, productid, quantity]
    );

    return cartItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateCartProductQty = async({id, quantity}) => {
  
  try {
    const { rows: [cartItem] } = await client.query(
      `
        UPDATE cart_products
        SET quantity = ${quantity}
        WHERE id = ${id}
        RETURNING *;
      `
    )
    return cartItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const deleteCartProduct = async (cartProductId) => {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
      DELETE FROM cart_products
      WHERE cart_products.id = ${cartProductId}
      RETURNING *;
    `
    );

    return cartItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//This function is for an opened cart that has items in it.
const getOpenCartByCustomerId = async (customerId) => {
  try {
    const { rows } = await client.query(
      `
        SELECT cart_products.id, products.id AS "productId",
          products.name, cart_products.quantity,
          products.price, products.imagelink
        FROM products
        JOIN cart_products
          ON cart_products.productid = products.id
        JOIN carts
          ON carts.id = cart_products.cartid
        WHERE carts.isopen = true
          AND carts.customerid = ${customerId}
      `
    );

    // console.log("CART ITEMS DB", rows)
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getClosedCartByCustomerId = async (customerId) => {
  try {
    const { rows } = await client.query(
      `
        SELECT cart_products.id, products.id AS "productId",
          products.name, cart_products.quantity, cart_products.cartid,
          products.price, products.imagelink
        FROM products
        JOIN cart_products
          ON cart_products.productid = products.id
        JOIN carts
          ON carts.id = cart_products.cartid
        WHERE carts.isopen = false
          AND carts.customerid = ${customerId}
      `
    );

    console.log("CART ITEMS DB", rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPastOrdersByCustomerId = async (customerId) => {
  try {
    const { rows } = await client.query(
      `
    SELECT cart_products.id, products.id AS "productId",
      products.name, cart_products.quantity,
      products.price, products.imagelink, 
      carts.isopen, cart_products.cartid
    FROM products
    JOIN cart_products
      ON cart_products.productid = products.id
    JOIN carts
      ON carts.id = cart_products.cartid
    WHERE carts.customerid = ${customerId}
      `
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//This routine simply gets the cart ID of the customer's Open cart. 
const getOpenCartIdByCustomerId = async (customerId) => {
  try {
    const { rows: [cart] } = await client.query(
      `
        SELECT carts.id
        FROM carts
        WHERE carts.isopen = true
        AND carts.customerid = ${customerId}
      `
    );

    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
    createCartProduct,
    updateCartProductQty,
    deleteCartProduct,
    getOpenCartByCustomerId,
    getPastOrdersByCustomerId,
    getClosedCartByCustomerId,
    getOpenCartIdByCustomerId,
};
