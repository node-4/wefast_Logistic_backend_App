const crypto = require("crypto");
const { walletService } = require("../services/index.js");

module.exports.handleRazorpayWebhook = async (req, res, next) => {
  try {
    console.log("webhook");
    // console.log(req.body.event);
    const webhookPayloadJson = JSON.stringify(req.body);
    const receivedRazorpaySignature = req.headers["x-razorpay-signature"];
    // console.log(req.headers);

    const calculatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(webhookPayloadJson)
      .digest("hex");

    if (receivedRazorpaySignature !== calculatedSignature) {
      console.log("hmac signature does not matches");
      console.log(receivedRazorpaySignature);
      console.log(calculatedSignature);
      return res.sendStatus(400);
    }

    const webhookPayload = req.body;

    switch (webhookPayload.event) {
      case "order.paid":
        await walletService.updateTransactionStatus(
          webhookPayload.payload.order.entity.id,
          "captured"
        );
        break;
      case "payment.failed":
        await walletService.updateTransactionStatus(
          webhookPayload.payload.payment.entity.order_id,
          "failed"
        );
        break;
      default:
        break;
    }

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
