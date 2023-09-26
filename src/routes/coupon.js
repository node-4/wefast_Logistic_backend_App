const express = require('express');
const { couponController } = require('../controllers/index.js');
const { coupon: couponValidator } = require('../middlewares/validators/index.js');
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

        app.post('/', auth.admin,
                // couponValidator.createCoupon,
                couponController.createCoupon);

        app.get('/all', auth.admin,
                couponController.getAllCoupons);

        app.get('/',
                couponController.getAllValidCoupons);

        app.delete('/:couponId', auth.admin,
                // couponValidator.couponIdParam,
                couponController.deleteCoupon);

        app.get('/check-validity/:couponId',
                // couponValidator.couponIdParam,
                couponController.checkValidity);

        app.put('/:couponId', auth.admin,
                // couponValidator.couponIdParam, 
                // couponValidator.updateCoupon,

                couponController.updateCoupon);
};
// module.exports = { couponRouter: router };
