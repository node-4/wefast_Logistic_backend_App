const express = require("express")
// const router = express.Router();
const driverRouter = require("./driver.js");
const adminRouter = require("./admin.js");
const vehicleTypeRouter = require("./vehicle-type.js");
const userRouter = require("./user.js");
const vehicleRouter = require("./vehicle.js");
const documentRouter = require("./document.js");
const goodsTypeRouter = require("./goods-type.js");
const notificationRouter = require("./notification.js");
const couponRouter = require("./coupon.js");
const bookingRouter = require("./booking.js");
const locationRouter = require("./location.js");
const bannerRouter = require("./banner.js");
const imageUploadRouter = require("./image-upload.js");
const helpAndSupportRouter = require("./help-and-support.js");
const walletRouter = require("./wallet.js");
const webhookRouter = require("./webhook.js");

router.use("/driver", driverRouter);
router.use("/admin", adminRouter);
router.use("/vehicle-type", vehicleTypeRouter);
router.use("/user", userRouter);
router.use("/vehicle", vehicleRouter);
router.use("/document", documentRouter);
router.use("/goods-type", goodsTypeRouter);
router.use("/notification", notificationRouter);
router.use("/coupon", couponRouter);
router.use("/booking", bookingRouter);
router.use("/location", locationRouter);
router.use("/banner", bannerRouter);
router.use("/image-upload", imageUploadRouter);
router.use("/help-and-support", helpAndSupportRouter);
router.use("/wallet", walletRouter);
router.use("/webhook", webhookRouter);

module.exports = router;
