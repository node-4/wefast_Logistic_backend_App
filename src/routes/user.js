const userController = require('../controllers/index.js').userController;
const userValidator = require('../middlewares/validators/index.js').user;
const auth = require('../middlewares/auth.js');


module.exports = (app) => {
        // app.post('/user/register', userValidator.bodyPhoneNumber, userController.register);
        // app.post('/user/registration-otp', userValidator.otpVerification, userController.registrationOtpVerification);
        app.get('/user/getProfile', auth.user, userController.getUserInfo);
        app.post('/user/login', userValidator.bodyPhoneNumber, userController.login);
        app.post('/user/login-otp', userValidator.otpVerification, userController.loginOtpVerification);
        app.put('/user/update-name', auth.user, userValidator.name, userController.updateUserName);
        app.get('/user/all', auth.admin, userController.getAllUsers);
        app.put('/user/delivery-preference', auth.user, userValidator.deliveryPreference, userController.updateDeliveryPreferences);
        app.put('/user/update', auth.user, userValidator.updateDetails, userController.updateDetails);
        app.put('/user/update/Location', auth.user, userController.updateLocation);
};
