const { use, expect } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const ProductsModel = require('../../../models/productsModel');
const ProductService = require('../../../services/productService');
const {
  getAllProductsResponse,
  getByIdResponse,
  createNewProduct,
  updateService,
} = require('../mocks/responsesMock');

use(chaiAsPromised);

describe('ProductService', () => {
  beforeEach(() => sinon.restore());

  describe('#getAllProducts', () => {
    it('Fetchs all products from the DB', async () => {
      sinon.stub(ProductsModel, 'getAllProducts').resolves(getAllProductsResponse);
      const products = await ProductService.getAllProducts();
      expect(products).to.be.deep.eq(getAllProductsResponse);
    });
  });

  describe('#getProductsById', () => {
    it('Fetchs all products from the DB', async () => {
      sinon.stub(ProductsModel, 'getProductsById').resolves(getByIdResponse);
      const products = await ProductService.getProductsById(2);
      expect(products).to.be.deep.eq(getByIdResponse);
    });
    it('Returns Error if product doesnt exist in DB', async () => {
      sinon.stub(ProductsModel, 'getProductsById').resolves(getByIdResponse);
      const product = await ProductService.getProductsById(99999);
      expect(product).to.throw;
    });
    it('Returns Error if name already exist in DB', async () => {
      sinon.stub(ProductsModel, 'createProduct').resolves(createNewProduct);
      const product = await ProductService.createProduct('Martelo de Thor');
      expect(product).to.throw;
    });
  });

  describe('#createProduct', () => {
    it('Creates a new product', async () => {
      sinon.stub(ProductsModel, 'createProduct').resolves(createNewProduct);
      const products = await ProductService.createProduct('Dagas do Loki');
      expect(products).to.be.deep.eq(createNewProduct);
    });
    it('Returns Error if name already exist in DB', async () => {
      sinon.stub(ProductsModel, 'createProduct').resolves(createNewProduct);
      const product = await ProductService.createProduct('Dagas do Loki');
      expect(product).to.throw;
    });
  });

  describe('#updateProductById', () => {
    it('Updates a product name', async () => {
      sinon.stub(ProductsModel, 'updateProductById').resolves(updateService);
      const product = await ProductService.updateProductById('Arco do Gavião', 3);
      expect(product).to.be.deep.eq(updateService);
    });
    it('Returns Error if name doesnt validate in DB', async () => {
      sinon.stub(ProductsModel, 'updateProductById').resolves(false);
      const product = ProductService.updateProductById('asd', 3);
      return expect(product).to.eventually.rejected;
    });
    it('Returns Error if id doesnt exist in DB', async () => {
      sinon.stub(ProductsModel, 'updateProductById').resolves(false);
      const product = ProductService.updateProductById('Arco do Gavião', 777);
      return expect(product).to.eventually.rejected;
    });
  });

  describe('#deleteProductById', () => {
    it('Deletes a product by id', async () => {
      sinon.stub(ProductsModel, 'deleteProductById').resolves(true);
      const product = await ProductService.deleteProductById(3);
      expect(product).to.be.true;
    });
    it('Returns Error if id doesnt exist in DB', async () => {
      sinon.stub(ProductsModel, 'deleteProductById').resolves(false);
      const product = ProductService.deleteProductById(777);
      return expect(product).to.eventually.rejected;
    });
  });
});
