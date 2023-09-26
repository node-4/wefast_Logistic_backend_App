const driverController = require('../controllers/index.js').driverController;
const express = require('express');
const router = express.Router();
const driverValidator = require('../middlewares/validators/index.js').driver;
const commonValidator = require('../middlewares/validators/index.js').commons;
const auth = require('../middlewares/auth.js');
module.exports = (app) => {

        app.post('/login', driverValidator.login, driverController.login);

        app.post('/login-otp',
                // driverValidator.loginOtpVerification,
                driverController.loginOtpVerification);

        app.put('/profile-image', auth.driver, commonValidator.profileImage, driverController.uploadProfileImage);

        app.get("/", auth.driver, driverController.getDriverProfile);

        app.get('/all', auth.admin, driverController.getAllDrivers);
};
// module.exports = router;