const { AdminModel } = require('../models/index.js');
const { ValidationError } = require('../errors/index.js');
const passwordHelper = require('../helpers/password.js');
const { generateToken } = require('../helpers/token.js');

const register = async (email, password) => {
    try {
        const adminExist = await AdminModel.findOne({ email: email });
        if (adminExist) {
            throw new ValidationError('admin with email already exists');
        }

        const hashedPassword = await passwordHelper.hashPassword(password);

        const admin = new AdminModel({
            email,
            password: hashedPassword
        });

        await admin.save();

        return;
    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const admin = await AdminModel.findOne({ email }).select('+password').lean();
        console.log(admin);
        if (!admin) {
            throw new ValidationError('wrong credentials');
        }

        const isPasswordMatch = await passwordHelper.verifyPassword(password, admin.password);

        if (!isPasswordMatch) {
            throw new ValidationError('wrong credentials');
        }

        const loginToken = await generateToken(admin._id, 'login');

        return loginToken;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    register,
    login
};
