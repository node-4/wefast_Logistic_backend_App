const driverService = require('../services/index.js').driverService;
exports.login = async (req, res, next) => {
    try {
        const result = await driverService.login(req.body.phoneNumber);

        return res.status(200).json({ msg: 'otp sent to phone number', data: result });
    } catch (error) {
        next(error);
    }
};

exports.loginOtpVerification = async (req, res, next) => {
    try {
        const loginResponse = await driverService.loginOtpVerification(req.body.phoneNumber, req.body.otp);

        return res.status(200).json({
            msg: 'successfully logged in',
            data: loginResponse
        });
    } catch (error) {
        next(error);
    }
};

exports.uploadProfileImage = async (req, res, next) => {
    try {
        await driverService.uploadProfileImage(req.user._id, req.body.imageUrl);
        return res.status(200).json({ msg: 'image uploaded successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getAllDrivers = async (req, res, next) => {
    try {
        let page = 0;
        if (req.query.page > 0) {
            page = req.query.page - 1;
        }
        const drivers = await driverService.getAllDrivers(page);
        return res.status(200).json({ msg: 'drivers', data: drivers });
    } catch (error) {
        next(error);
    }
};

exports.getDriverProfile = async (req, res, next) => {
    try {
        const driver = await driverService.getDriverProfile(req.user._id);
        return res.status(200).json({ msg: "driver", data: driver });
    } catch (error) {
        next(error);
    }
};
