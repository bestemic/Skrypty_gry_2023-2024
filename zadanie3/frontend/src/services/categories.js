import api from './api.js';

const getCategories = () => {
    return api.get('/categories')
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data.message;
        });
};

const getCategory = (categoryId) => {
    return api.get(`/categories/${categoryId}`)
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data.message;
        });
};

const createCategory = (categoryData) => {
    return api.post('/categories', categoryData)
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data.message;
        });
};

const updateCategory = (categoryId, categoryData) => {
    return api.put(`/categories/${categoryId}`, categoryData)
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data.message;
        });
};

const deleteCategory = (categoryId) => {
    return api.delete(`/categories/${categoryId}`)
        .catch(error => {
            throw error.response.data.message;
        });
};

export {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
