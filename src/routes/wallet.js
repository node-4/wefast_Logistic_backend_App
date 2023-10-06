const express = require('express'); // Import the express module
const { walletController } = require("../controllers/index.js");
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {
        app.post("/wallet/add-money", auth.user, walletController.createOrderToAddBalance);
        app.get("/wallet", auth.userOrdriver, walletController.getWallet);











        // app.post("/wallet", auth.user, walletController.createOrderToAddBalance);
        // app.post("/wallet/payout", auth.driver, walletController.payout);
}
// module.exports = { walletRouter: router };
