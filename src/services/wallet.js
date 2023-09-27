const camelcaseKeys = require("camelcase-keys");
const { ValidationError } = require("../errors/validation-error.js");
const WalletModel = require("../models/wallet.js");
const TransactionModel = require("../models/transactions.js");

require('dotenv').config();
const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const getBalance = async (userId) => {
  try {
    let wallet = await WalletModel.findOne({ user: userId });
    if (!wallet) {
      throw new ValidationError("invalid userId");
    }

    return camelcaseKeys(wallet.toObject());
  } catch (error) {
    throw error;
  }
};

const createOrderToAddBalance = async (userId, amount) => {
  try {
    if (amount < 10) {
      throw new ValidationError("amount must be greater than 10");
    }
    const orderOptions = {
      amount: amount * 100,
      currency: "INR",
    };

    const paymentGatewayOrder = await razorpayInstance.orders.create(
      orderOptions
    );

    await TransactionModel.create({
      user: userId,
      amount,
      payment_gateway_order_id: paymentGatewayOrder.id,
    });

    return {
      orderId: paymentGatewayOrder.id,
      amount,
    };
  } catch (error) {
    throw error;
  }
};

const payout = async (driverId) => {
  try {
    const wallet = await WalletModel.findOne({ user: driverId });

    if (wallet.balance <= 0) {
      throw new ValidationError("Payout not possible because of low balance!!!");
    }

    return;
  } catch (error) {
    throw error;
  }
};

const updateTransactionStatus = async (orderId, status) => {
  try {
    console.log("in update transaction status");
    const transaction = await TransactionModel.findOne({
      payment_gateway_order_id: orderId,
    });

    transaction.status = status;

    if (status == "captured") {
      addMoneyToWallet(transaction.user, transaction.amount);
    }

    await transaction.save();
  } catch (error) {
    throw error;
  }
};

const addMoneyToWallet = async (userId, amount) => {
  try {
    console.log(userId);
    console.log(amount);
    await WalletModel.findOneAndUpdate({ user: userId }, { $inc: { balance: amount } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBalance,
  createOrderToAddBalance,
  payout,
  updateTransactionStatus,
};
