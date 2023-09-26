const express = require('express');
const { notificationController } = require('../controllers/index.js');
const { notification: notificationValidator } = require('../middlewares/validators/index.js');
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

        app.post('/driver', auth.admin,
                // notificationValidator.sendToDrivers,
                notificationController.sendNotificationToDrivers);

        app.post('/user', auth.admin,
                // notificationValidator.sendToUsers,
                notificationController.sendNotificationToUsers);

        app.get('/', auth.userOrdriver, notificationController.getNotifications);

        app.get('/driver/:driverId', auth.admin,
                // notificationValidator.driverId,
                notificationController.getDriversNotifications);

        app.get('/user/:userId', auth.admin,
                // notificationValidator.userId,
                notificationController.getUsersNotifications);

        app.delete('/', auth.userOrdriver,
                // notificationValidator.deleteNotification,
                notificationController.deleteNotification);
};
// module.exports = { notificationRouter: router };
