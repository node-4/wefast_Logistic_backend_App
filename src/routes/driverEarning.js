const driverEarning = require('../controllers/driverEarning.js');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');
module.exports = (app) => {
        app.post('/Earning/addEarning/:id', auth.admin, driverEarning.driverOrderAmount);
        app.get("/Earning/allEarning", auth.driver, driverEarning.allEarning);
        app.get("/Earning/driverDashboard", auth.driver, driverEarning.driverDashboard);
        app.get("/Earning/allEarningforAdmin", driverEarning.allEarningforAdmin);
};
// module.exports = router;