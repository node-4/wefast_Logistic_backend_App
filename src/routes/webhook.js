const express = require('express'); // Import the express module
const { razorpayWebhookController } = require("../controllers/index.js");

// const router = express.Router();
module.exports = (app) => {

        app.post("/razorpay", razorpayWebhookController.handleRazorpayWebhook);
}
// module.exports = { webhookRouter: router };
