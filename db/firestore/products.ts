const client = require("./client");

const getAllProducts = async () => {
  console.log("Inside db/getAllProducts");
  try {
    const { rows } = await client.query(`
                SELECT * FROM products
                WHERE isactive=true;
            `);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getProductById = async(productId) => {
  try {
    const { rows: [product] } = await client.query(`
      SELECT * FROM products
      WHERE id = ${productId}
        AND isactive = true;
    `)
    console.log("PRODUCT", product)
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
} 

module.exports = {
  getAllProducts,
  getProductById
};
