const Joi = require('joi');
const salesModel = require('../models/salesModel');

const validateBody = ({ productId, quantity }) => {
  const schema = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  });

  const { error, value } = schema.validate({ productId, quantity });
  if (error) throw error;

  return value;
};

const findById = async ({ productId }) => {
  const product = await salesModel.findById(productId);

  if (!product) {
    const error = { code: 'notFound', message: 'Product not found' };
    throw error;
  }

  return product;
};

const createSale = async (sales) => {
  await Promise.all(sales.map(async (sale) => {
    await validateBody(sale);
    const saleItemNotExists = await findById(sale);

    if (saleItemNotExists.error) return saleItemNotExists.error;
  }));

  const saleId = await salesModel.createSale();

  return saleId;
};

const insertProducts = async (saleId, sale) => {
  const finalSale = await salesModel.insertProducts(saleId, sale);

  return finalSale;
};

const getSales = () => salesModel.getSales();

const getSalesById = async (id) => {
  const saleData = await salesModel.getSalesById(id);

  if (!saleData) {
    const error = { code: 'notFound', message: 'Sale not found' };
    throw error;
  }

  return saleData;
};

const findSaleById = async (id) => {
  const saleData = await salesModel.findSaleById(id);

  if (!saleData) {
    const error = { code: 'notFound', message: 'Sale not found' };
    throw error;
  }

  return saleData;
};

const deleteSaleById = async (id) => {
  await getSalesById(id);
  const product = await salesModel.deleteSaleById(id);

  return product;
};

const updateSaleById = async (sale, id) => {
  await findSaleById(id);
  await validateBody(sale);
  const saleItemNotExists = await findById(sale);
  if (saleItemNotExists.error) return saleItemNotExists.error;

  const insert = await salesModel.updateSaleById(sale, id);
  if (!insert) {
    const error = { code: 'notFound', message: 'Sale not found' };
    throw error;
  }
  const product = await salesModel.updatedSale(id);

  return product;
};

module.exports = {
  createSale,
  findById,
  validateBody,
  insertProducts,
  getSales,
  getSalesById,
  findSaleById,
  deleteSaleById,
  updateSaleById,
};