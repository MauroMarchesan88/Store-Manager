const getAllProductsResponse = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const getByIdResponse = {
  "id": 2,
  "name": "Traje de encolhimento"
};

const newProduct = 'Dagas do Loki';
const newProductController = { name: 'Dagas do Loki' }
const newProductResponse = { id: 4, name: 'Dagas do Loki' };
const createNewProduct = { id: 5, name: 'Dagas do Loki' };
const createNewSale = [{ productId: 3, quantity: 1 }];
const createNewSaleController = [{ productId: 1, quantity: 1 }];
const createNewSaleNoProdId = [{ productId: '', quantity: 1 }];
const createNewSaleNoProdQt = [{ productId: 3, quantity: '' }];

const inserItemsResponse = { productId: 3, quantity: 1 };

const findSaleByIdResponse = [{ productId: 1, quantity: 1 }, { productId: 3, quantity: 1 }];

const newSaleResponse = { id: 1, itemsSold: { productId: 3, quantity: 1 } };
const newSaleTwoResponse = [{ id: 1, itemsSold: [{ productId: 3, quantity: 1 }, { productId: 2, quantity: 1 }] }];
const allSales = [
  {
    id: 1,
    saleId: 1,
    date: '2022 - 07 - 03T15: 53: 59.000Z',
    productId: 1,
    quantity: 5
  },
  {
    id: 1,
    saleId: 1,
    date: '2022 - 07 - 03T15: 53: 59.000Z',
    productId: 2,
    quantity: 10
  },
  {
    id: 2,
    saleId: 2,
    date: '2022 - 07 - 03T15: 53: 59.000Z',
    productId: 3,
    quantity: 15
  },
  {
    id: 3,
    saleId: 3,
    date: '2022 - 07 - 03T15: 54: 06.000Z',
    productId: 3,
    quantity: 1
  }
];

const getSalesByIdResponse = [{
  id: 2,
  saleId: 2,
  date: '2022 - 07 - 03T15: 53: 59.000Z',
  productId: 3,
  quantity: 15
}];

const updatedProduct = { id: 4, name: 'Capacete do Loki' };
const updateService = { id: 3, name: 'Arco do Gavião' };

const notFound = { code: 'notFound', message: 'Product not found' };

module.exports = {
  getAllProductsResponse,
  getByIdResponse,
  newProduct,
  newProductResponse,
  updatedProduct,
  createNewProduct,
  updateService,
  notFound,
  newSaleResponse,
  newSaleTwoResponse,
  inserItemsResponse,
  findSaleByIdResponse,
  allSales,
  getSalesByIdResponse,
  createNewSale,
  createNewSaleNoProdId,
  createNewSaleNoProdQt,
  newProductController,
  createNewSaleController,
};