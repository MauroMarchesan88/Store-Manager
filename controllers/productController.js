const ProductServices = require('../services/productService');

const getAllProducts = async (_req, res, next) => {
  const products = await ProductServices.getAllProducts();

  if (products.error) return next(products.error);

  res.status(200).json(products);
};

const getProductsById = async (req, res, next) => {
  const { id } = req.params;

  const products = await ProductServices.getProductsById(id);

  if (products.error) return next(products.error);

  return res.status(200).json(products);
};

const createProduct = async (req, res, next) => {
  const { name } = req.body;

  const newProduct = await ProductServices.createProduct(name);

  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct);
};

const updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const newProduct = await ProductServices.updateProductById(name, id);

  if (newProduct.error) return next(newProduct.error);

  return res.status(200).json(newProduct);
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;

  const newProduct = await ProductServices.deleteProductById(id);

  if (newProduct.error) return next(newProduct.error);

  return res.status(204).json({ message: 'ok' });
};

const getProductsByName = async (req, res, next) => {
  const { q } = req.query;

  const products = await ProductServices.getProductsByName(q);

  if (products.error) return next(products.error);

  return res.status(200).json(products);
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductsByName,
};