const { Router } = require('express');
const controller = require('../modules/stripe/stripeController');

const stripeRouter = Router()

stripeRouter.post('/stripe/customer', controller.createCustomer);
stripeRouter.post('/stripe/payment-method', controller.createPaymentMethod);
stripeRouter.post('/stripe/payment', controller.createPayment);

module.exports = stripeRouter