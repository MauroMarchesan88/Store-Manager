const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');
const {
  newProductResponse,
  inserItemsResponse,
  findSaleByIdResponse,
} = require('../mocks/responsesMock');

describe('SalesModel', () => {
  beforeEach(() => sinon.restore());

  describe('#createSale', () => {
    it('Creates a new sale with one item', async () => {
      sinon.stub(connection, 'query').resolves(4);
      const sale = await SalesModel.createSale();
      expect(sale).to.be.deep.eq(4);
    });
  });

  describe('#insertProducts', () => {
    it('Creates a new sale with one item', async () => {
      sinon.stub(connection, 'query').resolves(inserItemsResponse);
      const product = await SalesModel.insertProducts(3, { productId: 3, quantity: 1 });
      expect(product).to.be.deep.eq(inserItemsResponse);
    });
  });

  describe('#findById', () => {
    it('Fetchs a product by name', async () => {
      sinon.stub(connection, 'query').resolves(newProductResponse);
      const [product] = await SalesModel.findById(2);
      expect(product).to.be.deep.eq({ product_id: 2 });
    });
    it('Returns Null if product doesnt exist in DB', async () => {
      sinon.stub(connection, 'query').resolves(null);
      const product = await SalesModel.getSalesById('Lightsaber');
      expect(product).to.be.null;
    });
  });

  describe('#findSaleById', () => {
    it('Fetchs all products from the DB', async () => {
      sinon.stub(connection, 'query').resolves(findSaleByIdResponse);
      const Sales = await SalesModel.findSaleById(3);
      expect(Sales).to.be.deep.eq(findSaleByIdResponse);
    });
    it('Returns Null if sale doesnt exist in DB', async () => {
      sinon.stub(connection, 'query').resolves(null);
      const sales = await SalesModel.findSaleById(18);
      expect(sales).to.be.null;
    });
  });

  // describe('#getSales', () => {
  //   it('Fetchs all sales from the DB', async () => {
  //     sinon.stub(connection, 'query').resolves(allSales);
  //     const products = await SalesModel.getSales();
  //     console.log(products);
  //     expect(products).to.be.eq(allSales);
  //   });
  // });

  // describe('#getSalesById', () => {
  //   it('Fetchs sales by id', async () => {
  //     sinon.stub(connection, 'query').resolves(getSalesByIdResponse);
  //     const product = await SalesModel.getSalesById(2);
  //     expect(product).to.be.deep.eq(getSalesByIdResponse);
  //   });
  //   it('Returns Null if sale doesnt exist in DB', async () => {
  //     sinon.stub(connection, 'query').resolves(null);
  //     const product = await SalesModel.getSalesById(99999);
  //     expect(product).to.be.null;
  //   });
  // });

  // describe('#updateProductById', () => {
  //   it('Updates a product name', async () => {
  //     sinon.stub(connection, 'query').resolves(updatedProduct);
  //     const product = await SalesModel.updateProductById('Capacete do Loki', 4);
  //     expect(product).to.be.deep.eq(updatedProduct);
  //   });
  // });

  // describe('#deleteProductById', () => {
  //   it('Deletes a product', async () => {
  //     sinon.stub(connection, 'query').resolves(true);
  //     const product = await SalesModel.deleteProductById(4);
  //     expect(product).to.be.true;
  //   });
  //   it('Returns Null if product doesnt exist in DB', async () => {
  //     sinon.stub(connection, 'query').resolves(null);
  //     const product = await SalesModel.deleteProductById(888);
  //     expect(product).to.be.null;
  //   });
  // });
});