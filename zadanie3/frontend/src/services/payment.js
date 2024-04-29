import api from './api.js';

const createPayment = (paymentData) => {
    return api.post('/payments', paymentData)
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data.message;
        });
};

export {
    createPayment
};
