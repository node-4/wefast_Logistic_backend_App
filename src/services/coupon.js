const { CouponModel } = require('../models/index.js');
const { randomInt } = require('crypto');
const snakecaseKeys = require('snakecase-keys');
const camelcaseKeys = require('camelcase-keys');
const { ValidationError } = require('../errors/validation-error.js');
const moment = require('moment');

const generateCouponCode = () => {
    try {
        const alphaNumericSet = '0123456789abcdefghijklmnopqrstuvwxyzABSDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 6; ++i) {
            code += alphaNumericSet[randomInt(0, alphaNumericSet.length)];
        }
        return code;
    } catch (error) {
        throw error;
    }
}

exports.createCoupon = async (couponPayload) => {
    try {
        if (couponPayload.couponCode && await CouponModel.findOne({
            coupon_code: couponPayload.couponCode
        })) {
            throw new ValidationError('coupon with code already exists')
        }

        if (!couponPayload.couponCode) {
            couponPayload.couponCode = generateCouponCode();
        }

        const coupon = new CouponModel(snakecaseKeys(couponPayload));
        await coupon.save();

        return camelcaseKeys(coupon.toObject());
    } catch (error) {
        throw error;
    }
}

exports.getAllCoupons = async () => {
    try {
        const coupons = await CouponModel.aggregate([
            {
                $addFields: {
                    expired: {
                        $cond: {
                            if: { $gt: [new Date(moment().format('YYYY-MM-DD')), "$valid_till"] },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $project: {
                    __v: 0
                }
            }
        ])

        return camelcaseKeys(coupons);
    } catch (error) {
        throw error;
    }
}

exports.getValidCoupons = async () => {
    try {
        const coupons = await CouponModel.find({
            valid_till: { $gte: new Date(moment().format('YYYY-MM-DD')) }
        }).lean();

        const couponResponse = coupons.map((coupon) => {
            delete coupon.__v;
            return coupon;
        })

        return camelcaseKeys(couponResponse);
    } catch (error) {
        throw error;
    }
}

exports.deleteCoupon = async (couponId) => {
    try {
        const coupon = await CouponModel.findById(couponId);

        if (!coupon) {
            throw new ValidationError('invalid couponId');
        }

        await CouponModel.findByIdAndDelete(couponId);
    } catch (error) {
        throw error;
    }
}

exports.checkValidity = async (couponId) => {
    try {
        const coupon = await CouponModel.findById(couponId).lean();
        if (!coupon) {
            throw new ValidationError('invalid couponId');
        }

        return moment(moment().format('YYYY-MM-DD')).isSameOrBefore(coupon.valid_till) ? true : false;
    } catch (error) {
        throw error;
    }
}

exports.updateCoupon = async (couponId, updatePayload) => {
    try {
        const coupon = await CouponModel.findById(couponId);
        if (!coupon) {
            throw new ValidationError('invalid couponId');
        }

        updatePayload.validFrom = updatePayload.validFrom || coupon.valid_from;
        if (updatePayload.validTill &&
            moment(updatePayload.validTill).isSameOrBefore(updatePayload.validFrom)) {
            throw new ValidationError('invalid validTill date');
        }

        await coupon.updateOne(snakecaseKeys(updatePayload));

        const updatedCoupon = (await CouponModel.findById(couponId)).toObject();

        return camelcaseKeys(updatedCoupon);
    } catch (error) {
        throw error;
    }
}