const Joi = require("joi");

const customerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

const paymentMethodSchema = Joi.object({
  paymentMethodId: Joi.string().required(),
  customerId: Joi.string().required(),
});

const paymentIntentSchema = Joi.object({
  customerId: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  currency: Joi.string().length(3).required(),
});

const confirmPaymentIntentSchema = Joi.object({
  paymentMethodId: Joi.string().required(),
});

module.exports = {
  customerSchema,
  paymentMethodSchema,
  paymentIntentSchema,
  confirmPaymentIntentSchema,
};
