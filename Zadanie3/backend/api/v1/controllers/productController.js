const productService = require('../services/productService');
const ServiceError = require('../errorHandlers/ServiceError');
const categoryService = require("../services/categoryService");

const getProducts = async (req, res) => {
    try {
        const allProducts = await productService.getAllProducts(req.params.categoryId);
        res.status(200).json({status: 200, data: allProducts, message: "Successfully retrieved all products"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.params.categoryId, req.body);
        res.status(201).json({status: 201, data: product, message: "Product created successfully"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await productService.getProduct(req.params.productId);
        if (product) {
            res.status(200).json({status: 200, data: product, message: "Product retrieved successfully"});
        } else {
            res.status(404).json({status: 404, message: "Product not found"});
        }
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.productId, req.body);
        res.status(200).json({status: 200, data: updatedProduct, message: "Product updated successfully"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
};

const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.productId);
        res.status(204).send();
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}