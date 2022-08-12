const { expect } = require('chai');
const sinon = require('sinon');
const ProductsController = require('../../../controllers/productController');
const ProductService = require('../../../services/productService');
const {
  getAllProductsResponse,
  newProductController,
} = require('../mocks/responsesMock');

describe('ProductController', () => {

  beforeEach(() => sinon.restore());

  describe('#getAllProducts', () => {
    it('Fetchs all products from the DB', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(ProductService, 'getAllProducts').resolves(getAllProductsResponse);
      await ProductsController.getAllProducts(req, res);
      expect(res.status.calledWith(200));
    });
  });

  describe('#getProductsById', () => {
    it('Fetchs all products from the DB', async () => {
      const req = { params: 3 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(ProductService, 'getProductsById').resolves(getAllProductsResponse[2]);
      await ProductsController.getProductsById(req, res);
      expect(res.status.calledWith(200));
      expect(res.json.calledWith(getAllProductsResponse[2]));
    });
  });

  describe('#createProduct', () => {
    it('Inserts new product in the DB', async () => {
      const req = { body: 'Dagas do Loki' };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(ProductService, 'createProduct').resolves(newProductController);
      await ProductsController.createProduct(req, res);
      expect(res.status.calledWith(200));
      expect(res.json.calledWith(newProductController));
    });
  });
});