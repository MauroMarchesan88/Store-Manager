const { use, expect } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const SalesModel = require('../../../models/salesModel');
const SalesService = require('../../../services/salesService');
const {
  getByIdResponse,
  createNewProduct,
  createNewSale,
  createNewSaleNoProdQt,
  createNewSaleNoProdId,
} = require('../mocks/responsesMock');

use(chaiAsPromised);

describe('SalesService', () => {
  beforeEach(() => sinon.restore());

  // describe('#getSales', () => {
  //   it('Fetchs all products from the DB', async () => {
  //     sinon.stub(SalesModel, 'getSales').resolves(allSales);
  //     const products = await SalesService.getSales();
  //     expect(products).to.be.deep.eq(allSales);
  //   });
  // });

  describe('#getSalesById', () => {
    it('Fetchs a sale with id from the DB', async () => {
      sinon.stub(SalesModel, 'getSalesById').resolves(getByIdResponse);
      const products = await SalesService.getSalesById(2);
      expect(products).to.be.deep.eq(getByIdResponse);
    });
    it('Returns Error if sale doesnt exist in DB', async () => {
      sinon.stub(SalesModel, 'getSalesById').resolves(getByIdResponse);
      const product = await SalesService.getSalesById(99999);
      expect(product).to.throw;
    });
  });

  describe('#createSale', () => {
    it('Creates a new product', async () => {
      sinon.stub(SalesModel, 'createSale').resolves(createNewProduct);
      const products = await SalesService.createSale(createNewSale);
      expect(products).to.be.deep.eq(createNewProduct);
    });
    it('Returns Error if productId doesnt exist in DB', async () => {
      sinon.stub(SalesModel, 'createSale').resolves(createNewProduct);
      const product = SalesService.createSale(createNewSaleNoProdId);
      return expect(product).to.eventually.rejected;
    });
    it('Returns Error if quantity doesnt exist in DB', async () => {
      sinon.stub(SalesModel, 'createSale').resolves(createNewProduct);
      const product = SalesService.createSale(createNewSaleNoProdQt);
      return expect(product).to.eventually.rejected;
    });
  });

  // describe('#updateProductById', () => {
  //   it('Updates a product name', async () => {
  //     sinon.stub(SalesModel, 'updateProductById').resolves(updateService);
  //     const product = await SalesService.updateProductById('Arco do Gavião', 3);
  //     expect(product).to.be.deep.eq(updateService);
  //   });
  //   it('Returns Error if name doesnt validate in DB', async () => {
  //     sinon.stub(SalesModel, 'updateProductById').resolves(false);
  //     const product = SalesService.updateProductById('asd', 3);
  //     return expect(product).to.eventually.rejected;
  //   });
  //   it('Returns Error if id doesnt exist in DB', async () => {
  //     sinon.stub(SalesModel, 'updateProductById').resolves(false);
  //     const product = SalesService.updateProductById('Arco do Gavião', 777);
  //     return expect(product).to.eventually.rejected;
  //   });
  // });

  // describe('#deleteProductById', () => {
  //   it('Deletes a product by id', async () => {
  //     sinon.stub(SalesModel, 'deleteProductById').resolves(true);
  //     const product = await SalesService.deleteProductById(3);
  //     expect(product).to.be.true;
  //   });
  //   it('Returns Error if id doesnt exist in DB', async () => {
  //     sinon.stub(SalesModel, 'deleteProductById').resolves(false);
  //     const product = SalesService.deleteProductById(777);
  //     return expect(product).to.eventually.rejected;
  //   });
  // });
});
