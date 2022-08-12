const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/salesController');
const SalesService = require('../../../services/salesService');
const {
  allSales,
  getSalesByIdResponse,
  createNewSaleController,
} = require('../mocks/responsesMock');

describe('SalesController', () => {
  beforeEach(() => sinon.restore());

  describe('#getSales', () => {
    it('Fetchs all products from the DB', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SalesService, 'getSales').resolves(allSales);
      await SalesController.getSales(req, res);

      expect(res.status.calledWith(200));
      expect(res.json.calledWith(allSales));
    });
  });

  describe('#getSalesById', () => {
    it('Fetchs all products from the DB', async () => {
      const req = { params: 3 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SalesService, 'getSalesById').resolves(getSalesByIdResponse);
      await SalesController.getSalesById(req, res);

      expect(res.status.calledWith(200));
      expect(res.json.calledWith(getSalesByIdResponse));
    });
  });

  describe('#createSale', () => {
    it('Fetchs all products from the DB', async () => {
      const req = { body: [{ productId: 1, quantity: 1 }] };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SalesService, 'getSalesById').resolves(createNewSaleController);
      await SalesController.createSale(req, res);

      expect(res.status.calledWith(200));
      expect(res.json.calledWith(createNewSaleController));
    });
  });

  describe('#deleteSaleById', () => {
    it('Fetchs all products from the DB', async () => {
      const req = { params: 3 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SalesService, 'deleteSaleById').resolves({ message: 'ok' });
      await SalesController.deleteSaleById(req, res);

      expect(res.status.calledWith(200));
    });
  });
});