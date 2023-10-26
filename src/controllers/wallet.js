const { walletService } = require("../services/index.js");

module.exports.getWallet = async (req, res, next) => {
  try {
    const wallet = await walletService.getBalance(req.user._id);

    return res.status(200).json({
      msg: `user's wallet`,
      data: wallet,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.createOrderToAddBalance = async (req, res, next) => {
  try {
    const order = await walletService.addMoneyToWallet(req.user._id, req.body.amount);
    return res.status(200).json({ msg: "adding money to wallet", data: order })
  } catch (error) {
    next(error);
  }
};


// module.exports.createOrderToAddBalance = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const amount = req.body.amount;

//     const updatedWallet = await walletService.addMoneyToWallet(userId, amount);

//     const order = {
//       key: 'rzp_test_RCA60YesrxgJwm',
//       amount: amount,
//       order_id: generateOrderId(),
//       name: 'We Fast',
//       description: 'Adding Money to wallet',
//     };

//     return res.status(200).json({ msg: "Adding money to wallet", data: order });
//   } catch (error) {
//     next(error);
//   }
// };

// function generateOrderId() {
//   const timestamp = new Date().getTime();
//   const random = Math.floor(Math.random() * 1000);
//   const orderId = `Order_${timestamp}_${random}`;

//   return orderId;
// }



module.exports.payout = async (req, res, next) => {
  try {
    await walletService.payout(req.user._id);
    return res.status(200).json({ msg: "payout request sent" })
  } catch (error) {
    next(error);
  }
}
