const { adminService } = require('../services/index.js');

const register = async (req, res, next) => {
    try {
        await adminService.register(req.body.email, req.body.password);

        return res.status(200).json({
            msg: 'admin registered'
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const loginToken = await adminService.login(req.body.email, req.body.password);

        return res.status(200).json({
            msg: 'successfully logged in',
            data: { loginToken }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};
