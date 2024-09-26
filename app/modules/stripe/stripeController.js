const service = require("./stripeService");
const logger = require("../../utils/logs");

const createCustomer = async (req, res) => {
  try {
    logger.info(
      `Create customer request received with payload: ${JSON.stringify(
        req.body
      )}`
    );
    const customer = await service.createCustomer(req.body);
    logger.info("Customer ready sending response");
    res.json(customer);
  } catch (error) {
    logger.error(`Error creating customer: ${error.message}`);
    res
      .status(error.statusCode)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

const createPaymentMethod = async (req, res) => {
  try {
    logger.info(
      `Create payment method request received with payload: ${JSON.stringify(
        req.body
      )}`
    );
    const paymentMethod = await service.createPaymentMethod(req.body);
    logger.info("Payment method created sending response");
    res.json(paymentMethod);
  } catch (error) {
    logger.error(`Error creating payment method: ${error.message}`);
    res
      .status(error.statusCode)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

const createPaymentIntent = async (req, res) => {
  try {
    logger.info(
      `Create payment method request received with payload: ${JSON.stringify(
        req.body
      )}`
    );
    const paymentIntent = await service.createPaymentIntent(req.body);

    res.json(paymentIntent);
  } catch (error) {
    logger.error(`Error creating payment intent: ${error.message}`);
    res
      .status(error.statusCode)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

const confirmPaymentIntent = async (req, res) => {
  try {
    logger.info(
      `Confirm payment intent method request received with id: ${req.params.id}`
    );
    const paymentIntentId = req.params.id;
    const paymentIntent = await service.confirmPaymentIntent(
      paymentIntentId,
      req.body
    );

    res.json(paymentIntent);
  } catch (error) {
    logger.error(`Error confirming payment: ${error.message}`);
    res
      .status(error.statusCode)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

module.exports = {
  createCustomer,
  createPaymentMethod,
  createPaymentIntent,
  confirmPaymentIntent,
};
