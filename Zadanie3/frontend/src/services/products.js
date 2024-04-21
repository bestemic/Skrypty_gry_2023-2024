import api from './api.js';

const getProducts = (categoryId) => {
    return api.get(`/categories/${categoryId}/products`)
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data.message;
        });
};

const getProduct = (productId) => {
    return api.get(`/products/${productId}`)
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data.message;
        });
};

const createProduct = (categoryId, productData) => {
    return api.post(`/categories/${categoryId}/products`, productData)
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data.message;
        });
};

const updateProduct = (productId, productData) => {
    return api.put(`/products/${productId}`, productData)
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data.message;
        });
};

const deleteProduct = (productId) => {
    return api.delete(`/products/${productId}`)
        .catch(error => {
            throw error.response.data.message;
        });
};

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
