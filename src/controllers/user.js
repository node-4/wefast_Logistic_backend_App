const userService = require('../services/index.js').userService;

const register = async (req, res, next) => {
    try {
        await userService.register(req.body.phoneNumber);

        return res.status(201).json({ msg: `otp sent to ${req.body.phoneNumber}` });
    } catch (error) {
        next(error);
    }
};

const registrationOtpVerification = async (req, res, next) => {
    try {
        const result = await userService.registrationOtpVerification(req.body.phoneNumber, req.body.otp);

        return res.status(200).json({
            msg: 'registration otp successfully verified',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        await userService.login(req.body.phoneNumber);

        return res.status(200).json({
            msg: `if user is registered you will receive otp on ${req.body.phoneNumber}`
        });
    } catch (error) {
        next(error);
    }
};

const loginOtpVerification = async (req, res, next) => {
    try {
        const result = await userService.loginOtpVerification(req.body.phoneNumber, req.body.otp);

        return res.status(200).json({
            msg: 'successfully logged in',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const updateDetails = async (req, res, next) => {
    try {
        await userService.updateDetails(req.user._id, req.body);

        return res.status(200).json({
            msg: 'user details successfully updated'
        });
    } catch (error) {
        next(error);
    }
};

const updateDeliveryPreferences = async (req, res, next) => {
    try {
        await userService.updateDeliveryPreferences(req.user, req.body);

        return res.status(200).json({
            msg: "delivery preferences updated"
        });
    } catch (error) {
        next(error);
    }
};

const updateUserName = async (req, res, next) => {
    try {
        await userService.updateUserName(req.user._id, req.body.name);

        return res.status(200).json({
            msg: 'user name updated'
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        let page = 0;
        if (req.query.page > 0) {
            page = req.query.page - 1;
        }

        const users = await userService.getAllUsers(page);

        return res.status(200).json({
            msg: 'users',
            data: { drivers: users }
        });
    } catch (error) {
        next(error);
    }
};

const getUserInfo = async (req, res, next) => {
    try {
        const user = await userService.getUserInfo(req.user._id);

        return res.status(200).json({
            msg: 'user info',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    registrationOtpVerification,
    login,
    loginOtpVerification,
    updateDetails,
    updateDeliveryPreferences,
    updateUserName,
    getAllUsers,
    getUserInfo
};
