const express = require('express');
// const router = express.Router();
const userController = require('../controllers/index.js').userController;
const userValidator = require('../middlewares/validators/index.js').user;
const auth = require('../middlewares/auth.js');


module.exports = (app) => {

        app.post('/user/register', userValidator.bodyPhoneNumber, userController.register);

        app.post('/registration-otp', userValidator.otpVerification,
                userController.registrationOtpVerification);

        app.get('/', auth.user, userController.getUserInfo);

        app.post('/login', userValidator.bodyPhoneNumber, userController.login);

        app.post('/login-otp', userValidator.otpVerification, userController.loginOtpVerification);

        app.put('/', auth.user, userValidator.updateDetails, userController.updateDetails);

        app.put('/delivery-preference', auth.user, userValidator.deliveryPreference, userController.updateDeliveryPreferences);

        app.put('/update-name', auth.user, userValidator.name, userController.updateUserName);

        app.get('/all', auth.admin, userController.getAllUsers);
};
// module.exports = { userRouter: router };
