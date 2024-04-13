const categoryService = require('../services/categoryService');
const ServiceError = require('../errorHandlers/ServiceError');

const getCategories = async (req, res) => {
    try {
        const allCategories = await categoryService.getAllCategories();
        res.status(200).json({status: 200, data: allCategories, message: "Successfully retrieved all categories"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({status: 201, data: category, message: "Category created successfully"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await categoryService.getCategory(req.params.categoryId);
        if (category) {
            res.status(200).json({status: 200, data: category, message: "Category retrieved successfully"});
        } else {
            res.status(404).json({status: 404, message: "Category not found"});
        }
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
};

const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.categoryId, req.body);
        res.status(200).json({status: 200, data: updatedCategory, message: "Category updated successfully"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
};

const deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.categoryId);
        res.status(204).send();
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
};

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}