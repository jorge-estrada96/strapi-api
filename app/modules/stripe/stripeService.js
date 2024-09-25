const stripe = require('../../libs/stripe');
const logger = require('../../utils/logs')
const { ValidationError } = require('../../utils/errors')
const { customerSchema, paymentMethodSchema, paymentSchema } = require('./stripeValidation')


const createCustomer = async (payload) => {
  logger.info('Validating customer payload...')
  const { value: validatedCustomer, error } = customerSchema.validate(payload)
  if (error) throw new ValidationError(JSON.stringify(error.details))

  logger.info('Validating if customer already exists')
  const { data: customers } = await stripe.customers.list({ email: validatedCustomer.email });
  if (customers.length) { 
    logger.info(`Customer already exists with id ${customers[0].id}`)
    return customers[0]
  }

  logger.info(`Creating customer with payload ${JSON.stringify(validatedCustomer)}`)
  const customer = await stripe.customers.create(validatedCustomer);

  return customer
};

const createPaymentMethod = async (payload) => {
  logger.info('Validating payment method payload...')
  const { value: validatedPaymentMethod, error } = paymentMethodSchema.validate(payload)
  if (error) throw new ValidationError(JSON.stringify(error.details))

  logger.info(`Creating payment method with payload ${JSON.stringify(validatedPaymentMethod)}`)
  const paymentMethod = await stripe.paymentMethods.attach(validatedPaymentMethod.paymentMethodId, {
    customer: validatedPaymentMethod.customerId,
  });

  return paymentMethod
};

const createPayment = async (payload) => {
  logger.info('Validating payment payload...')
  const { value: validatedPayment, error } = paymentSchema.validate(payload)
  if (error) throw new ValidationError(JSON.stringify(error.details))

  logger.info(`Creating payment with payload ${JSON.stringify(validatedPayment)}`)
  const paymentIntent = await stripe.paymentIntents.create({
    customer: validatedPayment.customerId,
    amount: validatedPayment.amount * 100,
    currency: validatedPayment.currency,
    payment_method: validatedPayment.paymentMethodId,
    confirm: true,
  });

  return paymentIntent
};

module.exports = {
  createCustomer,
  createPaymentMethod,
  createPayment,
  
};