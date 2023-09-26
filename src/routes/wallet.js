const express = require('express'); // Import the express module
const { walletController } = require("../controllers/index.js");
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

        app.get("/", auth.userOrdriver, walletController.getWallet);

        app.post("/", auth.user, walletController.createOrderToAddBalance);

        app.post("/add-money", auth.user, walletController.createOrderToAddBalance);

        app.post("/payout", auth.driver, walletController.payout);
}
// module.exports = { walletRouter: router };
