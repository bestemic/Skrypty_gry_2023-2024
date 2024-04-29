const paymentService = require('../services/paymentService');
const ServiceError = require('../errorHandlers/ServiceError');

const createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPayment(req.body);
        res.status(201).json({status: 201, data: payment, message: "Payment created successfully"});
    } catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).json({status: err.code, message: err.message});
        }
    }
}

module.exports = {
    createPayment
}