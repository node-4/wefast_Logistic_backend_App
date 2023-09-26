const couponService = require('../services/index.js').couponService;

const createCoupon = async (req, res, next) => {
    try {
        const coupon = await couponService.createCoupon(req.body);

        return res.status(201).json({
            msg: 'coupon created',
            data: { coupon }
        });
    } catch (error) {
        next(error);
    }
};

const getAllCoupons = async (req, res, next) => {
    try {
        const coupons = await couponService.getAllCoupons();

        return res.status(200).json({
            msg: 'all coupons',
            data: { coupons }
        });
    } catch (error) {
        next(error);
    }
};

const getAllValidCoupons = async (req, res, next) => {
    try {
        const coupons = await couponService.getValidCoupons();

        return res.status(200).json({
            msg: 'all coupons',
            data: { coupons }
        });
    } catch (error) {
        next(error);
    }
};

const deleteCoupon = async (req, res, next) => {
    try {
        await couponService.deleteCoupon(req.params.couponId);

        return res.status(200).json({
            msg: 'coupon deleted'
        });
    } catch (error) {
        next(error);
    }
};

const checkValidity = async (req, res, next) => {
    try {
        const valid = await couponService.checkValidity(req.params.couponId);

        return res.status(200).json({
            msg: 'validity of coupon',
            data: { valid }
        });
    } catch (error) {
        next(error);
    }
};

const updateCoupon = async (req, res, next) => {
    try {
        const coupon = await couponService.updateCoupon(req.params.couponId, req.body);

        return res.status(200).json({
            msg: 'coupon updated',
            data: { coupon }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCoupon,
    getAllCoupons,
    getAllValidCoupons,
    deleteCoupon,
    checkValidity,
    updateCoupon
};
