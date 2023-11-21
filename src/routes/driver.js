const driverController = require('../controllers/index.js').driverController;
const express = require('express');
const router = express.Router();
const driverValidator = require('../middlewares/validators/index.js').driver;
const commonValidator = require('../middlewares/validators/index.js').commons;
const auth = require('../middlewares/auth.js');
module.exports = (app) => {

        app.post('/driver/login', driverValidator.login, driverController.login);

        app.post('/driver/login-otp',
                // driverValidator.loginOtpVerification,
                driverController.loginOtpVerification);

        app.put('/driver/profile-image', auth.driver, commonValidator.profileImage, driverController.uploadProfileImage);

        app.get("/driver", auth.driver, driverController.getDriverProfile);

        app.get('/driver/all', auth.admin, driverController.getAllDrivers);
        app.delete("/driver/:driverId", auth.admin, driverController.deleteDriver);
        app.get("/driverbyId/:driverId", driverController.getDriver);
};
// module.exports = router;