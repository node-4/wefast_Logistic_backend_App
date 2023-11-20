// const loadEnvironment = require('./load-environment.js');
// const { fileURLToPath } = require('url');
// const path = require('path');
// const { router } = require('./src/routes/index.js');
// const { errorHandler } = require('./error-handler.js');
// // require('./redis.js');
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyparser = require("body-parser");
const serverless = require("serverless-http");
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
const PORT = process.env.PORT
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).then(() => { console.log("Db conneted succesfully"); }).catch((err) => { console.log(err); });
app.get("/", (req, res) => { return res.status(200).send({ msg: "Working App" }); });
// const admin = require('./src/routes/index.js');
// app.use('/api/v1', admin);

require("./src/routes/driver")(app);
require("./src/routes/admin")(app);
require("./src/routes/vehicle-type")(app);
require("./src/routes/user")(app);
require("./src/routes/vehicle")(app);
require("./src/routes/document")(app);
require("./src/routes/goods-type")(app);
require("./src/routes/notification")(app);
require("./src/routes/coupon")(app);
require("./src/routes/booking")(app);
require("./src/routes/location")(app);
require("./src/routes/banner")(app);
require("./src/routes/image-upload")(app);
require("./src/routes/help-and-support")(app);
require("./src/routes/wallet")(app);
require("./src/routes/webhook")(app);
require("./src/routes/driverEarning")(app);

// app.use("/driver", driverRouter);
// app.use("/admin", adminRouter);
// app.use("/vehicle-type", vehicleTypeRouter);
// app.use("/user", userRouter);
// app.use("/vehicle", vehicleRouter);
// app.use("/document", documentRouter);
// app.use("/goods-type", goodsTypeRouter);
// app.use("/notification", notificationRouter);
// app.use("/coupon", couponRouter);
// app.use("/booking", bookingRouter);
// app.use("/location", locationRouter);
// app.use("/banner", bannerRouter);
// app.use("/image-upload", imageUploadRouter);
// app.use("/help-and-support", helpAndSupportRouter);
// app.use("/wallet", walletRouter);
// app.use("/webhook", webhookRouter);



app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
module.exports = { handler: serverless(app) };