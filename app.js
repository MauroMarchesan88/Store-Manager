const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const errorMiddleware = require('./middlewares/error');
const Products = require('./controllers/productController');
const Sales = require('./controllers/salesController');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.get('/products/search', rescue(Products.getProductsByName));
app.get('/products', rescue(Products.getAllProducts));
app.get('/products/:id', rescue(Products.getProductsById));
app.post('/products', rescue(Products.createProduct));
app.put('/products/:id', rescue(Products.updateProductById));
app.delete('/products/:id', rescue(Products.deleteProductById));

app.get('/sales', rescue(Sales.getSales));
app.get('/sales/:id', rescue(Sales.getSalesById));
app.post('/sales', rescue(Sales.createSale));
app.delete('/sales/:id', rescue(Sales.deleteSaleById));
app.put('/sales/:id', rescue(Sales.updateSaleById));

app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);
module.exports = app;