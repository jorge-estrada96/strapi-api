const Joi = require('joi');

const customerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

const paymentMethodSchema = Joi.object({
  paymentMethodId: Joi.string().required(),
  customerId: Joi.string().required(),
});

const paymentSchema = Joi.object({
  customerId: Joi.string().required(),
  paymentMethodId: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  currency: Joi.string().length(3).required(),
});


module.exports = {
  customerSchema,
  paymentMethodSchema,
  paymentSchema,
};

