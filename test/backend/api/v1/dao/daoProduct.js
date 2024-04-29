const db = require("../models/sqConfig");
const ServiceError = require("../errorHandlers/ServiceError");
const Product = db.product;

const findAllCategoryProducts = (categoryId) => {
    return Product
        .findAll({
            where: {
                categoryId: categoryId
            },
            order: [
                ["name", "ASC"]
            ]
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const createProduct = (product) => {
    return Product
        .create(product)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const findProductById = (id) => {
    return Product
        .findByPk(id)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const updateProduct = (id, productData) => {
    return Product
        .findByPk(id)
        .then(product => {
            return product.update(productData);
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

const deleteProduct = (id) => {
    return Product
        .destroy({
            where: {id: id}
        })
        .catch(err => {
            throw new ServiceError('Database error ' + err.message, 500);
        });
};

module.exports = {
    findAllCategoryProducts,
    createProduct,
    findProductById,
    updateProduct,
    deleteProduct
}