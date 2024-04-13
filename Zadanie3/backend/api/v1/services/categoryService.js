const daoCategory = require('../dao/daoCategory');
const ServiceError = require("../errorHandlers/ServiceError");

const getAllCategories = async () => {
    return await daoCategory.findAllCategories();
};

const createCategory = async (category) => {
    if (!category.name || !category.description) {
        throw new ServiceError('Category name or description is missing.', 400);
    }

    if (category.name.length <= 1 || /^\d+$/.test(category.name) || category.name.length > 25) {
        throw new ServiceError('Invalid category name.', 400);
    }

    const existingCategory = await daoCategory.findCategoryByName(category.name);
    if (existingCategory) {
        throw new ServiceError('Category with the provided name already exists.', 409);
    }

    return await daoCategory.createCategory(category);
};

const getCategory = async (id) => {
    return await daoCategory.findCategoryById(id);
};

const updateCategory = async (id, category) => {
    const existingCategory = await daoCategory.findCategoryById(id);
    if (!existingCategory) {
        throw new ServiceError('Category not found.', 404);
    }

    if (!category.name || !category.description) {
        throw new ServiceError('Category name or description is missing.', 400);
    }

    if (category.name.length <= 1 || /^\d+$/.test(category.name) || category.name.length > 25) {
        throw new ServiceError('Invalid category name.', 400);
    }

    const existingCategoryByName = await daoCategory.findCategoryByName(category.name);
    if (existingCategoryByName && existingCategoryByName.id.toString() !== id) {
        throw new ServiceError('Another category with the same name already exists.', 409);
    }

    return await daoCategory.updateCategory(id, category);
};

const deleteCategory = async (id) => {
    const existingCategory = await daoCategory.findCategoryById(id);
    if (!existingCategory) {
        throw new ServiceError('Category not found.', 404);
    }

    await daoCategory.deleteCategory(id)
};


module.exports = {
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}