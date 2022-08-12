const Joi = require('joi');
const ProductModel = require('../models/productsModel');

const getAllProducts = async () => ProductModel.getAllProducts();

const getProductsById = async (id) => {
  const product = await ProductModel.getProductsById(id);

  if (!product) {
    const error = { code: 'notFound', message: 'Product not found' };
    throw error;
  }

  return product;
};

const validateBody = (name) => {
  const { error } = Joi.object({
    name: Joi.string()
      .min(5)
      .not()
      .empty()
      .required()
      .messages({
        'string.min': '"name" length must be at least 5 characters long',
      }),
  }).validate({ name });

  if (error) throw error;
};

const createProduct = async (name) => {
  await validateBody(name);

  const existingProduct = await ProductModel.findByName(name);

  if (existingProduct) {
    return {
      error:
        { code: 'alreadyExists', message: 'Já existe um produto com esse nome' },
    };
  }

  const { id } = await ProductModel.createProduct(name);

  return ({ id, name });
};

const updateProductById = async (name, id) => {
  await validateBody(name);
  await getProductsById(id);
  const product = await ProductModel.updateProductById(name, id);

  return product;
};

const deleteProductById = async (id) => {
  await getProductsById(id);
  const product = await ProductModel.deleteProductById(id);

  return product;
};

const getProductsByName = async (name) => {
  if (!name) {
    const all = await getAllProducts();
    return all;
  }

  const product = await ProductModel.findByName(name);

  return product;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductsByName,
};