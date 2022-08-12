const salesService = require('../services/salesService');

const createSale = async (req, res, next) => {
  const sales = req.body;

  const newSaleId = await salesService.createSale(sales);
  if (newSaleId.error) return next(newSaleId.error);

  await Promise.all(sales.map(async (sale) => {
    const insertProducts = await salesService.insertProducts(newSaleId, sale);
    if (insertProducts.error) return next(insertProducts.error);
  }));

  const finalSale = await salesService.findSaleById(newSaleId);

  return res.status(201).json({ id: newSaleId, itemsSold: finalSale });
};

const getSales = async (_req, res) => {
  const sales = await salesService.getSales();

  res.status(200).json(sales);
};

const getSalesById = async (req, res, next) => {
  const { id } = req.params;

  const sales = await salesService.getSalesById(id);

  if (sales.error) return next(sales.error);

  return res.status(200).json(sales);
};

const deleteSaleById = async (req, res, next) => {
  const { id } = req.params;

  const newSale = await salesService.deleteSaleById(id);

  if (newSale.error) return next(newSale.error);

  return res.status(204).json({ message: 'ok' });
};

const updateSaleById = async (req, res, next) => {
  const { id } = req.params;
  const sales = req.body;

  await Promise.all(sales.map(async (sale) => {
    const insertProducts = await salesService.updateSaleById(sale, id);
    if (insertProducts.error) return next(insertProducts.error);
  }));

  const finalSale = await salesService.findSaleById(id);
  console.log(finalSale);

  return res.status(200).json({ saleId: id, itemsUpdated: finalSale });
};

module.exports = {
  createSale,
  getSales,
  getSalesById,
  deleteSaleById,
  updateSaleById,
};