const express = require('express');
const { couponController } = require('../controllers/index.js');
const { coupon: couponValidator } = require('../middlewares/validators/index.js');
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

        app.post('/coupon/', auth.admin,
                // couponValidator.createCoupon,
                couponController.createCoupon);

        app.get('/coupon/all', auth.admin,
                couponController.getAllCoupons);

        app.get('/coupon/valid', couponController.getAllValidCoupons);

        app.delete('/coupon/:couponId', auth.admin,
                // couponValidator.couponIdParam,
                couponController.deleteCoupon);

        app.get('/coupon/check-validity/:couponId',
                // couponValidator.couponIdParam,
                couponController.checkValidity);

        app.put('/coupon/:couponId', auth.admin,
                // couponValidator.couponIdParam, 
                // couponValidator.updateCoupon,

                couponController.updateCoupon);
};
// module.exports = { couponRouter: router };
