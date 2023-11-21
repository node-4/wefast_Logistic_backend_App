const notificationService = require('../services/index.js').notificationService;

const sendNotificationToDrivers = async (req, res, next) => {
    try {
        await notificationService.sendNotificationToDrivers(req.body.drivers, req.body.message);

        return res.status(200).json({
            msg: 'notifications sent'
        });
    } catch (error) {
        next(error);
    }
};

const getNotifications = async (req, res, next) => {
    try {
        let notifications;
        if (req.user.role === 'driver') {
            notifications = await notificationService.getDriversNotification(req.user._id);
        } else if (req.user.role === 'driver') {
            notifications = await notificationService.getUsersNotification(req.user._id);
        } else {
            notifications = await notificationService.getNotification();
        }
        return res.status(200).json({
            msg: `${req.user.role} notifications`,
            data: notifications
        });
    } catch (error) {
        next(error);
    }
};

const getNotificationsforAdmin = async (req, res, next) => {
    try {
        let notifications = await notificationService.getNotification();
        return res.status(200).json({
            msg: `notifications`,
            data: notifications
        });
    } catch (error) {
        next(error);
    }
};
const getDriversNotifications = async (req, res, next) => {
    try {
        const notifications = await notificationService.getDriversNotification(req.params.driverId);

        return res.status(200).json({
            msg: `driver's notifications`,
            data: notifications
        });
    } catch (error) {
        next(error);
    }
};

const sendNotificationToUsers = async (req, res, next) => {
    try {
        await notificationService.sendNotificationToUsers(req.body.users, req.body.message);

        return res.status(200).json({
            msg: 'notifications sent'
        });
    } catch (error) {
        next(error);
    }
};

const getUsersNotifications = async (req, res, next) => {
    try {
        const notifications = await notificationService.getUsersNotification(req.params.userId);

        return res.status(200).json({
            msg: `driver's notifications`,
            data: notifications
        });
    } catch (error) {
        next(error);
    }
};

const deleteNotification = async (req, res, next) => {
    try {
        await notificationService.deleteNotification(req.user._id, req.body.notificationId);

        return res.status(200).json({
            msg: 'notification deleted'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendNotificationToDrivers,
    getNotifications,
    getDriversNotifications,
    sendNotificationToUsers,
    getUsersNotifications,
    getNotificationsforAdmin,
    deleteNotification
};
