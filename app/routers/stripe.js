const { Router } = require("express");
const controller = require("../modules/stripe/stripeController");

const stripeRouter = Router();

stripeRouter.post("/stripe/customers", controller.createCustomer);
stripeRouter.post("/stripe/payment-methods", controller.createPaymentMethod);
stripeRouter.post("/stripe/payment-intents", controller.createPaymentIntent);
stripeRouter.patch(
  "/stripe/payment-intents/:id/confirm",
  controller.confirmPaymentIntent
);

module.exports = stripeRouter;
