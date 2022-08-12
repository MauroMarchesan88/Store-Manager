const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';

  const [result] = await connection.execute(query);

  return result;
};

const getProductsById = async (id) => {
  const query = 'SELECT id, name FROM StoreManager.products WHERE id = ? ORDER BY id';

  const [productData] = await connection.execute(query, [id]);

  if (productData.length === 0) return null;
  return productData[0];
};

const createProduct = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return ({ id: product.insertId, name });
};

const findByName = async (name) => {
  const finalName = `%${name}%`;
  const query = `
      SELECT id, name
      FROM StoreManager.products
      WHERE name LIKE ?
    `;

  const [productData] = await connection.execute(query, [finalName]);

  if (productData.length === 0) return null;
  return productData;
};

const updateProductById = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';

  await connection.execute(query, [name, id]);

  return ({ id, name });
};

const deleteProductById = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';

  const [productData] = await connection.execute(query, [id]);

  if (productData.affectedRows === 0) return null;

  return true;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  findByName,
  updateProductById,
  deleteProductById,
};