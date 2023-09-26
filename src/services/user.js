const { UserModel, WalletModel } = require('../models/index.js');
const { generateOTP, verifyOTP } = require('../helpers/otp.js');
const { sendSms } = require('../helpers/sms.js');
const { ValidationError } = require('../errors/index.js');
const { generateToken } = require('../helpers/token.js');
const snakecaseKeys = require('snakecase-keys');
const camelcaseKeys = require('camelcase-keys');

exports.register = async (phoneNumber) => {
    try {
        const userExist = await UserModel.findOne({ phone_number: phoneNumber });
        if (userExist) {
            throw new ValidationError('user with phone number already exists');
        }
        const otp = await generateOTP(6);
        let otp1 = {
            magnitude: otp,
            type: 'registration'
        }
        let obj = {
            phone_number: phoneNumber,
            otp: otp1
        }
        const user = await UserModel.create(obj);
        if (user) {
            let obj2 = {
                user: user._id,
                user_type: "user"
            }
            // await WalletModel.create(obj2)
            // await sendSms({
            //     body: `otp is: ${otp}`,
            //     phoneNumber: `${user.country_code}${user.phone_number}`
            // })
            return
        }
    } catch (error) {
        throw error;
    }
}

exports.registrationOtpVerification = async (phoneNumber, otp) => {
    try {
        const user = await UserModel.findOne({
            phone_number: phoneNumber,
            "otp.magnitude": otp
        }).select("+otp");

        if (!user) {
            throw new ValidationError('invalid otp');
        }

        const isValidOtp = await verifyOTP({
            created: user.otp.created,
            magnitude: user.otp.magnitude,
            type: user.otp.type,
            reqOTPType: 'registration',
            userOTP: otp
        })

        if (!isValidOtp) {
            throw new ValidationError('invalid otp');
        }

        const token = await generateToken(user._id, 'login');

        return {
            loginToken: token,
            signupProcessCompleted: user.signup_process_complete,
            deliveryprefrencesCompleted: user.delivery_prefrences_completed
        };
    } catch (error) {
        throw error;
    }
}

exports.login = async (phoneNumber) => {
    try {
        const user = await UserModel.findOne({ phone_number: phoneNumber });

        if (!user) {
            throw new ValidationError('no user with phone number registered');
        }

        const otp = await generateOTP(6);

        user.otp = {
            magnitude: otp,
            type: 'login'
        }

        await user.save();

        await sendSms({
            body: `otp is ${otp}`,
            phoneNumber: `${user.country_code}${user.phone_number}`
        });

        return;
    } catch (error) {
        throw error;
    }
}

exports.loginOtpVerification = async (phoneNumber, otp) => {
    try {
        const user = await UserModel.findOne({
            phone_number: phoneNumber,
            "otp.magnitude": otp
        }).select("+otp");

        if (!user) {
            throw new ValidationError('invalid Otp');
        }

        const isValidOtp = await verifyOTP({
            created: user.otp.created,
            userOTP: otp,
            magnitude: user.otp.magnitude,
            reqOTPType: 'login',
            type: user.otp.type
        });

        if (!isValidOtp) {
            throw new ValidationError('invalid Otp');
        }

        const token = await generateToken(user._id, 'login');

        return {
            loginToken: token,
            signupProcessCompleted: user.signup_process_complete,
            deliveryprefrencesCompleted: user.delivery_prefrences_completed
        };
    } catch (error) {
        throw error;
    }
}

exports.updateDetails = async (userId, updatePayload) => {
    try {
        const user = await UserModel.findById(userId);

        if (!userId) {
            throw new ValidationError('invalid userId');
        }

        await user.updateOne(snakecaseKeys(updatePayload));

    } catch (error) {
        throw error;
    }
}

exports.updateDeliveryPrefrences = async (userId, prefrencesPayload) => {
    try {
        console.log(prefrencesPayload);
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('invalid userId');
        }

        await user.updateOne({ ...snakecaseKeys(prefrencesPayload), delivery_prefrences_completed: true });
    } catch (error) {
        throw error;
    }
}

exports.updateUserName = async (userId, name) => {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('invalid userId');
        }

        await user.updateOne({ name, signup_process_complete: true });
    } catch (error) {
        throw error;
    }
}

exports.getAllUsers = async (page) => {
    try {
        const users = await UserModel.find({}).sort({ createdAt: -1 }).skip(page).limit(10).lean();

        const UserResponse = users.map((user) => {
            delete user.__v;
            return camelcaseKeys(user);
        })

        return UserResponse;
    } catch (error) {
        throw error;
    }
}

exports.getUserInfo = async (userId) => {
    try {
        const user = (await UserModel.findById(userId).select({
            name: 1,
            phone_number: 1,
            profile_image: 1
        }))?.toObject();

        return camelcaseKeys(user);
    } catch (error) {
        throw error;
    }
}