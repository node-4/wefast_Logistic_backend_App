const BookingModel = require("../models/booking");
const DriverModel = require("../models/driver.js");
const WalletModel = require("../models/wallet");
const { generateOTP, verifyOTP } = require('../helpers/otp.js');
const { sendSms } = require('../helpers/sms.js');
const { ValidationError } = require('../errors/index.js');
const { generateToken } = require('../helpers/token.js');
const camelcaseKeys = require('camelcase-keys');

exports.login = async (phoneNumber) => {
    try {
        console.log('in driver service');
        let driver = await DriverModel.findOne({ phone_number: phoneNumber });
        if (!driver) {
            driver = new DriverModel({ phone_number: phoneNumber });
        }
        const otp = await generateOTP(6);
        driver.otp = { magnitude: otp, type: 'login' };
        await driver.save();
        await WalletModel.findOneAndUpdate({ user: driver._id }, { user: driver._id, user_type: "driver" }, { upsert: true, setDefaultsOnInsert: true });
        // await sendSms({ body: `otp for we fast is ${otp}`, phoneNumber: `${driver.country_code}${driver.phone_number}` });
        return driver;
    } catch (error) {
        throw error;
    }
};

exports.loginOtpVerification = async (phoneNumber, otp) => {
    try {
        const driver = await DriverModel.findOne({ phone_number: phoneNumber, "otp.magnitude": otp }).select("+otp");
        if (!driver) {
            throw new ValidationError('invalid Otp');
        }
        const isValidOtp = await verifyOTP({ created: driver.otp.created, userOTP: otp, magnitude: driver.otp.magnitude, reqOTPType: 'login', type: driver.otp.type });
        if (!isValidOtp) {
            throw new ValidationError('invalid Otp');
        }
        const loginToken = await generateToken(driver._id, 'login');
        return { loginToken, areDocumentsUploaded: !!driver.are_documents_uploaded, isVehicleRegistered: !!driver.is_vehicle_registered };
    } catch (error) {
        throw error;
    }
};

exports.uploadProfileImage = async (driverId, imageUrl) => {
    try {
        const driver = await DriverModel.findById(driverId);
        if (!driver) {
            throw new ValidationError('invalid driverId');
        }
        driver.profile_image = imageUrl;
        await driver.save();
        return;
    } catch (error) {
        throw error;
    }
};

exports.updateDriverLicense = async (driverId, licenseImage, licenseNumber) => {
    try {
        const driver = await DriverModel.findById(driverId);
        if (!driver) {
            throw new ValidationError('invalid driverId');
        }
        driver.driver_license = licenseImage;
        driver.driver_license_number = licenseNumber;
        driver.are_documents_uploaded = true;
        await driver.save();
    } catch (error) {
        throw error;
    }
};

exports.updateAadhaarOrVoter = async (driverId, idCardImages, idCardNumber) => {
    try {
        const driver = await DriverModel.findById(driverId);
        if (!driver) {
            throw new ValidationError('invalid driverId');
        }
        driver.aadhaar_or_voter_card = idCardImages;
        driver.aadhaar_or_voter_card_number = idCardNumber;
        await driver.save();
    } catch (error) {
        throw error;
    }
};
exports.getAllDrivers = async (page) => {
    try {
        const drivers = await DriverModel.find({}).sort({ createdAt: -1 }).skip(page).limit(10).lean();
        const driverResponse = drivers.map((driver) => { delete driver.__v; return camelcaseKeys(driver); });
        return driverResponse;
    } catch (error) {
        throw error;
    }
};

exports.getDriverProfile = async (driverId) => {
    try {
        const driverProfile = await DriverModel.findById(driverId).select("name profile_image is_vehicle_registered are_documents_uploaded");
        return camelcaseKeys(driverProfile.toObject());
    } catch (error) {
        throw error;
    }
};
