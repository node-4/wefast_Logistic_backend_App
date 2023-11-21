// const { NotificationModel, DriverModel, UserModel } = require("../models/index.js");
const { ValidationError } = require("../errors/index.js");
const camelcaseKeys = require("camelcase-keys");
const { login } = require("./driver.js");
const DriverModel = require("../models/driver.js");
const NotificationModel = require("../models/notification.js");
const UserModel = require("../models/user.js");


exports.sendNotificationToDrivers = async (
  driverIds,
  message,
  sender = "We Fast"
) => {
  try {
    const notificationsPromises = driverIds.map((driverId) => {
      let notification = new NotificationModel({
        receiver: driverId,
        sender,
        receiver_entity_type: "driver",
        message,
      });
      return notification.save();
    });

    const notifications = await Promise.all(notificationsPromises);
  } catch (error) {
    throw error;
  }
};

exports.sendNotificationToUsers = async (
  userIds,
  message,
  sender = "We Fast"
) => {
  try {
    const notificationsPromises = userIds.map((userId) => {
      let notification = new NotificationModel({
        receiver: userId,
        sender,
        receiver_entity_type: "user",
        message,
      });
      return notification.save();
    });

    const notifications = await Promise.all(notificationsPromises);
  } catch (error) {
    throw error;
  }
};

exports.getDriversNotification = async (driverId) => {
  try {
    const driver = await DriverModel.findById(driverId);
    if (!driver) {
      return { status: 404, message: "invalid driverId." }
    }

    const notifications = await NotificationModel.find({ receiver: driverId })
      .select("+receiver_entity_type")
      .populate("receiver", "name")
      .lean();

    const notificationsResponse = notifications.map((notification) => {
      delete notification.__v;
      delete notification.receiver_entity_type;
      return camelcaseKeys(notification);
    });

    return notificationsResponse;
  } catch (error) {
    throw error;
  }
};

exports.getUsersNotification = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return { status: 404, message: "invalid userId." }
    }

    const notifications = await NotificationModel.find({ receiver: userId })
      .select("+receiver_entity_type")
      .populate("receiver", "name")
      .lean();

    const notificationsResponse = notifications.map((notification) => {
      delete notification.__v;
      delete notification.receiver_entity_type;
      return camelcaseKeys(notification);
    });

    return notificationsResponse;
  } catch (error) {
    throw error;
  }
};

exports.deleteNotification = async (receiverId, notificationId) => {
  try {
    const notification = await NotificationModel.findOne({
      _id: notificationId,
      receiver: receiverId,
    });

    if (!notification) {
      return { status: 404, message: "invalid notificationId." }
    }

    await NotificationModel.findByIdAndDelete(notificationId);
  } catch (error) {
    throw error;
  }
};

exports.getNotification = async () => {
  try {
    const notifications = await NotificationModel.find({}).select("+receiver_entity_type").populate("receiver", "name").lean();
    const notificationsResponse = notifications.map((notification) => {
      delete notification.__v;
      return camelcaseKeys(notification);
    });

    return notificationsResponse;
  } catch (error) {
    throw error;
  }
};