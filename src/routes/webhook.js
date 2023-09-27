const express = require('express'); // Import the express module
const { razorpayWebhookController } = require("../controllers/index.js");

// const router = express.Router();
module.exports = (app) => {

        app.post("/webhook/razorpay", razorpayWebhookController.handleRazorpayWebhook);
}
// module.exports = { webhookRouter: router };
