const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');
const {
  getAllProductsResponse,
  getByIdResponse,
  newProduct,
  newProductResponse,
  updatedProduct } = require('../mocks/responsesMock');

describe('ProductsModel', () => {
  beforeEach(() => sinon.restore());

  describe('#getAllProducts', () => {
    it('Fetchs all products from the DB', async () => {
      sinon.stub(connection, 'query').resolves(getAllProductsResponse);
      const products = await ProductsModel.getAllProducts();
      expect(products).to.be.deep.eq(getAllProductsResponse);
    });
  });

  describe('#getProductsById', () => {
    it('Fetchs products by id', async () => {
      sinon.stub(connection, 'query').resolves(getByIdResponse);
      const product = await ProductsModel.getProductsById(2);
      expect(product).to.be.deep.eq(getByIdResponse);
    });
    it('Returns Null if product doesnt exist in DB', async () => {
      sinon.stub(connection, 'query').resolves(null);
      const product = await ProductsModel.getProductsById(99999);
      expect(product).to.be.null;
    });
  });

  describe('#createProduct', () => {
    it('Creates a new product', async () => {
      sinon.stub(connection, 'query').resolves(newProductResponse);
      const product = await ProductsModel.createProduct(newProduct);
      expect(product).to.be.deep.eq(newProductResponse);
    });
  });

  describe('#findByName', () => {
    it('Fetchs a product by name', async () => {
      sinon.stub(connection, 'query').resolves(newProductResponse);
      const [product] = await ProductsModel.findByName(newProduct);
      expect(product).to.be.deep.eq(newProductResponse);
    });
    it('Returns Null if product doesnt exist in DB', async () => {
      sinon.stub(connection, 'query').resolves(null);
      const product = await ProductsModel.getProductsById('Lightsaber');
      expect(product).to.be.null;
    });
  });

  describe('#updateProductById', () => {
    it('Updates a product name', async () => {
      sinon.stub(connection, 'query').resolves(updatedProduct);
      const product = await ProductsModel.updateProductById('Capacete do Loki', 4);
      expect(product).to.be.deep.eq(updatedProduct);
    });
  });

  describe('#deleteProductById', () => {
    it('Deletes a product', async () => {
      sinon.stub(connection, 'query').resolves(true);
      const product = await ProductsModel.deleteProductById(4);
      expect(product).to.be.true;
    });
    it('Returns Null if product doesnt exist in DB', async () => {
      sinon.stub(connection, 'query').resolves(null);
      const product = await ProductsModel.deleteProductById(888);
      expect(product).to.be.null;
    });
  });
});