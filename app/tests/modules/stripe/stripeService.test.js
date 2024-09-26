const sinon = require("sinon");
const stripe = require("../../../libs/stripe");
const {
  createCustomer,
  createPaymentMethod,
  createPaymentIntent,
  confirmPaymentIntent,
} = require("../../../modules/stripe/stripeService");

describe("createCustomer", () => {
  let stripeListStub;
  let stripeCreateStub;

  beforeEach(() => {
    stripeListStub = sinon.stub(stripe.customers, "list");
    stripeCreateStub = sinon.stub(stripe.customers, "create");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return existing customer if customer already exists", async () => {
    const validPayload = { name: "testing user", email: "test@example.com" };
    const existingCustomer = { id: "cus_existing" };

    stripeListStub.resolves({ data: [existingCustomer] });

    const customer = await createCustomer(validPayload);
    expect(customer).toEqual(existingCustomer);
  });

  it("should create a new customer if not exists", async () => {
    const validPayload = { name: "testing user", email: "test@example.com" };
    const newCustomer = { id: "cus_new" };

    stripeListStub.resolves({ data: [] });
    stripeCreateStub.resolves(newCustomer);

    const customer = await createCustomer(validPayload);
    expect(customer).toEqual(newCustomer);
  });
});

describe("createPaymentMethod", () => {
  let stripeAttachStub;

  beforeEach(() => {
    stripeAttachStub = sinon.stub(stripe.paymentMethods, "attach");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should attach the payment method to the customer", async () => {
    const validPayload = { paymentMethodId: "pm_test", customerId: "cus_test" };
    const attachedPaymentMethod = { id: "pm_test" };

    stripeAttachStub.resolves(attachedPaymentMethod);

    const paymentMethod = await createPaymentMethod(validPayload);
    expect(paymentMethod).toEqual(attachedPaymentMethod);
  });
});

describe("createPaymentIntent", () => {
  let stripeCreateStub;

  beforeEach(() => {
    stripeCreateStub = sinon.stub(stripe.paymentIntents, "create");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create a payment intent with the payload", async () => {
    const validPayload = {
      customerId: "cus_test",
      amount: 1000,
      currency: "usd",
    };
    const paymentIntent = { id: "pi_test" };

    stripeCreateStub.resolves(paymentIntent);

    const result = await createPaymentIntent(validPayload);
    expect(result).toEqual(paymentIntent);
  });
});

describe("confirmPaymentIntent", () => {
  let stripeConfirmStub;

  beforeEach(() => {
    stripeConfirmStub = sinon.stub(stripe.paymentIntents, "confirm");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create a payment intent with the payload", async () => {
    const validPayload = {
      paymentMethodId: "pm_test",
    };
    const paymentIntent = { id: "pi_test" };

    stripeConfirmStub.resolves(paymentIntent);

    const result = await confirmPaymentIntent(paymentIntent.id, validPayload);
    expect(result).toEqual(paymentIntent);
  });
});
