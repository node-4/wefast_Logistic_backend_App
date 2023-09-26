// export * as driverController from './driver.js';
// export * as adminController from './admin.js';
// export * as vehicleTypeController from './vehicle-type.js';
// export * as userController from './user.js';
// export * as vehicleController from './vehicle.js';
// export * as documentController from './document.js';
// export * as goodsTypeController from './goods-type.js';
// export * as notificationController from './notification.js';
// export * as couponController from './coupon.js';
// export * as bookingController from './booking.js';
// export * as locationController from './location.js';
// export * as bannerController from './banner.js';
// export * as imageUploadController from './image-upload.js';
// export * as helpAndSupportController from './help-and-support.js';
// export * as walletController from "./wallet.js";
// export * as razorpayWebhookController from "./razorpay-webhook.js"
const driverController = require('./driver.js');
const adminController = require('./admin.js');
const vehicleTypeController = require('./vehicle-type.js');
const userController = require('./user.js');
const vehicleController = require('./vehicle.js');
const documentController = require('./document.js');
const goodsTypeController = require('./goods-type.js');
const notificationController = require('./notification.js');
const couponController = require('./coupon.js');
const bookingController = require('./booking.js');
const locationController = require('./location.js');
const bannerController = require('./banner.js');
const imageUploadController = require('./image-upload.js');
const helpAndSupportController = require('./help-and-support.js');
const walletController = require('./wallet.js');
const razorpayWebhookController = require('./razorpay-webhook.js');

module.exports = {
        driverController,
        adminController,
        vehicleTypeController,
        userController,
        vehicleController,
        documentController,
        goodsTypeController,
        notificationController,
        couponController,
        bookingController,
        locationController,
        bannerController,
        imageUploadController,
        helpAndSupportController,
        walletController,
        razorpayWebhookController
};
