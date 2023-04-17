const client = require("./client");

const createCart = async(customerid) => {
  try {
    
    const { rows: [cart] } = await client.query(
      `
            INSERT INTO carts (customerid)
            VALUES ($1)
            RETURNING *;
        `,
      [customerid]
    );

    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCartIdbyCustomerId = async(customerId) => {
  try {
    const { rows: [id] } = await client.query(`
      SELECT id
      FROM carts
      WHERE carts.customerid = ${customerId}
    `)

    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const closeCart = async(cartId) => {

  try {
    const { rows: [cart] } = await client.query(`
      UPDATE carts 
      SET isopen = false
      WHERE id = ${cartId}
    `)

    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports = {
    createCart,
    getCartIdbyCustomerId,
    closeCart,
};