const ServiceError = require("../errorHandlers/ServiceError");

const createPayment = async (payment) => {
    console.log(payment)
    if (!payment.blik || !payment.cart) {
        throw new ServiceError('Payment blik or cart is missing.', 400);
    }

    const total = payment.cart.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0);

    return {
        total: total.toFixed(2)
    };
};

module.exports = {
    createPayment
}