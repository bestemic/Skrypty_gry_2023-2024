const daoProduct = require('../dao/daoProduct');
const ServiceError = require("../errorHandlers/ServiceError");
const categoryService = require("../services/categoryService");

const getAllProducts = async (categoryId) => {
    return await daoProduct.findAllCategoryProducts(categoryId);
};

const createProduct = async (categoryId, product) => {
    const category = await categoryService.getCategory(categoryId);
    if (!category) {
        throw new ServiceError('Category not found.', 404);
    }

    if (!product.name || product.name.trim() === '') {
        throw new ServiceError('Product name is missing.', 400);
    }

    if (typeof product.price !== 'number' || isNaN(product.price) || product.price <= 0) {
        throw new ServiceError('Invalid product price.', 400);
    }

    product.categoryId = categoryId;
    return await daoProduct.createProduct(product);
};

const getProduct = async (id) => {
    return await daoProduct.findProductById(id);
};

const updateProduct = async (id, product) => {
    const existingProduct = await daoProduct.findProductById(id);
    if (!existingProduct) {
        throw new ServiceError('Product not found.', 404);
    }

    if (!product.name || !product.price) {
        throw new ServiceError('Product name or prise is missing.', 400);
    }

    if (product.name.length <= 1) {
        throw new ServiceError('Invalid product name.', 400);
    }

    if (typeof product.price !== 'number' || isNaN(product.price) || product.price <= 0) {
        throw new ServiceError('Invalid product price.', 400);
    }

    const category = await categoryService.getCategory(product.categoryId);

    if (!category) {
        throw new ServiceError('Category to update not found.', 409);
    }

    return await daoProduct.updateProduct(id, product);
};

const deleteProduct = async (id) => {
    const existingProduct = await daoProduct.findProductById(id);
    if (!existingProduct) {
        throw new ServiceError('Product not found.', 404);
    }

    await daoProduct.deleteProduct(id);
};

module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};