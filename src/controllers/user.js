const userService = require('../services/index.js').userService;
// const register = async (req, res, next) => {
//     try {
//         await userService.register(req.body.phoneNumber);

//         return res.status(201).json({ msg: `otp sent to ${req.body.phoneNumber}` });
//     } catch (error) {
//         next(error);
//     }
// };
// const registrationOtpVerification = async (req, res, next) => {
//     try {
//         const result = await userService.registrationOtpVerification(req.body.phoneNumber, req.body.otp);

//         return res.status(200).json({
//             msg: 'registration otp successfully verified',
//             data: result
//         });
//     } catch (error) {
//         next(error);
//     }
// };
const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body.phoneNumber);
        return res.status(200).json({ msg: `if user is registered you will receive otp on ${req.body.phoneNumber}`, data: result });
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
const updateUserName = async (req, res, next) => {
    try {
        await userService.updateUserName(req.user._id, req.body.name);
        return res.status(200).json({ msg: 'user name updated' });
    } catch (error) {
        next(error);
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        let page = 0;
        if (req.query.page > 0) { page = req.query.page - 1; }
        const users = await userService.getAllUsers(page);
        return res.status(200).json({ msg: 'users', data: users });
    } catch (error) {
        next(error);
    }
};
const getUserInfo = async (req, res, next) => {
    try {
        const user = await userService.getUserInfo(req.user._id);
        return res.status(200).json({ msg: 'user info', data: user });
    } catch (error) {
        next(error);
    }
};
const updateDeliveryPreferences = async (req, res, next) => {
    try {
        let result = await userService.updateDeliveryPrefrences(req.user, req.body);

        return res.status(200).json({ msg: "delivery preferences updated", data: result });
    } catch (error) {
        next(error);
    }
};
const updateDetails = async (req, res, next) => {
    try {
        let result = await userService.updateDetails(req.user._id, req.body);

        return res.status(200).json({ msg: 'user details successfully updated', data: result });
    } catch (error) {
        next(error);
    }
};
const updateLocation = async (req, res) => {
    try {
        let result = await userService.updateLocation(req.user._id, req.body.currentLat, req.body.currentLong);
        return res.status(200).send({ status: 200, message: "Location update successfully.", data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 500, message: "Server error" + error.message });
    }
};
const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.userId);
        return res.status(200).json({ msg: 'User deleted' });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    // register,
    // registrationOtpVerification,
    login,
    loginOtpVerification,
    updateDetails,
    updateDeliveryPreferences,
    updateUserName,
    getAllUsers,
    getUserInfo,
    updateLocation,
    deleteUser
};
