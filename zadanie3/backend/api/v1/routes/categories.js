const express = require('express');
const router = express.Router();
const {categoryProductRouter} = require('../routes/products');

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.get('/:categoryId', categoryController.getCategory);
router.put('/:categoryId', categoryController.updateCategory);
router.delete('/:categoryId', categoryController.deleteCategory);

router.use('/:categoryId/products', categoryProductRouter);


module.exports = router;