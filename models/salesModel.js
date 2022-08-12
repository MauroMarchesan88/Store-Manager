const connection = require('./connection');

const createSale = async () => {
  const [sales] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return sales.insertId;
};

const insertProducts = async (saleId, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
    [saleId, productId, quantity],
  );
  return ({ productId, quantity });
};

const findById = async (productId) => {
  const query = `
      SELECT product_id
      FROM StoreManager.sales_products
      WHERE product_id = ?
    `;

  const [productData] = await connection.execute(query, [productId]);

  if (productData.length === 0) return null;
  return productData;
};

const findSaleById = async (saleId) => {
  const query = `
      SELECT
        product_id AS productId,
        quantity
      FROM StoreManager.sales AS sales
      JOIN StoreManager.sales_products AS products
      ON sales.id = products.sale_id
      WHERE sales.id = ?
      ORDER BY products.sale_id, products.product_id;
    `;

  const [productData] = await connection.execute(query, [saleId]);

  if (productData.length === 0) return null;
  return productData;
};

const getSales = async () => {
  const [sales] = await connection.execute(`
      SELECT 
        id, 
        sale_id AS saleId,
        date,
        product_id AS productId,
        quantity
      FROM StoreManager.sales AS sales
      JOIN StoreManager.sales_products AS products
      ON sales.id = products.sale_id
      ORDER BY products.sale_id, products.product_id;
    `);
  return sales;
};

const getSalesById = async (id) => {
  const query = `
      SELECT 
        date,
        product_id AS productId,
        quantity
      FROM StoreManager.sales AS sales
      JOIN StoreManager.sales_products AS products
      ON sales.id = products.sale_id
      WHERE sales.id = ?
      ORDER BY products.sale_id, products.product_id;
    `;
  const [saleData] = await connection.execute(query, [id]);

  if (saleData.length === 0) return null;

  return saleData;
};

const deleteSaleById = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?;';
  const queryItems = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';

  const [productData] = await connection.execute(query, [id]);
  await connection.execute(queryItems, [id]);

  if (productData.affectedRows === 0) return null;

  return true;
};

const updateSaleById = async (sale, id) => {
  const { productId, quantity } = sale;
  const query = `
    UPDATE StoreManager.sales_products 
    SET product_id = ?, quantity = ?
    WHERE sale_id = ? AND product_id = ?
    `;

  await connection.execute(query, [productId, quantity, id, productId]);

  return ({ saleId: id, itemsUpdated: [{ productId, quantity }] });
};

const updatedSale = async (id) => {
  const query = `
      SELECT 
        sale_id AS saleId,
        product_id AS productId,
        quantity
      FROM StoreManager.sales AS sales
      JOIN StoreManager.sales_products AS products
      ON sales.id = products.sale_id
      WHERE sales.id = ?
      ORDER BY products.sale_id, products.product_id;
    `;
  const [saleData] = await connection.execute(query, [id]);

  if (saleData.length === 0) return null;

  return saleData;
};

module.exports = {
  createSale,
  insertProducts,
  findById,
  getSales,
  getSalesById,
  findSaleById,
  deleteSaleById,
  updateSaleById,
  updatedSale,
};