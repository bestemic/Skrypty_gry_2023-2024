const express = require('express');
const categoryProductRouter = express.Router({mergeParams: true});
const productsRouter = express.Router();

const productController = require('../controllers/productController');

categoryProductRouter.get('/', productController.getProducts);
categoryProductRouter.post('/', productController.createProduct);

productsRouter.get('/:productId', productController.getProduct);
productsRouter.put('/:productId', productController.updateProduct);
productsRouter.delete('/:productId', productController.deleteProduct);

module.exports = {
    categoryProductRouter,
    productsRouter
};
