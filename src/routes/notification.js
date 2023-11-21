const express = require('express');
const { notificationController } = require('../controllers/index.js');
const { notification: notificationValidator } = require('../middlewares/validators/index.js');
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

        app.post('/notification/driver', auth.admin,
                // notificationValidator.sendToDrivers,
                notificationController.sendNotificationToDrivers);

        app.post('/notification/user', auth.admin,
                // notificationValidator.sendToUsers,
                notificationController.sendNotificationToUsers);

        app.get('/notification', auth.userOrdriver, notificationController.getNotifications);

        app.get('/notification/driver/:driverId', auth.admin,
                // notificationValidator.driverId,
                notificationController.getDriversNotifications);

        app.get('/notification/user/:userId', auth.admin,
                // notificationValidator.userId,
                notificationController.getUsersNotifications);

        app.delete('/notification/', auth.userOrdriver,
                // notificationValidator.deleteNotification,
                notificationController.deleteNotification);
        app.get('/getNotificationsforAdmin', auth.admin, notificationController.getNotificationsforAdmin);
};
// module.exports = { notificationRouter: router };
