const DriverModel = require("../models/driver.js");
const BookingModel = require("../models/booking");
const driverEarning = require("../models/driverEarning.js");
const VehicleTypeModel = require('../models/vehicle-type');
const VehicleModel = require('../models/vehicle.js');
const WalletModel = require("../models/wallet.js");
const { UserModel } = require('../models/index.js');
const banner = require('../models/banners.js');
exports.driverOrderAmount = async (req, res) => {
    try {
        const findOrders = await BookingModel.findById({ _id: req.params.id });
        if (!findOrders) {
            return res.status(404).json({ status: 404, message: "Orders not found", data: {} });
        } else {
            let obj = {
                driverId: findOrders.driver,
                Orders: findOrders._id,
                amount: req.body.amount,
                type: "order"
            }
            const saveOrder = await driverEarning.create(obj);
            if (saveOrder) {
                let data2 = await BookingModel.findOneAndUpdate({ _id: findOrders._id }, { $set: { driver_earning: req.body.amount } }, { new: true });
                const findS = await DriverModel.findOne({ _id: findOrders.driver });
                let wallet = await WalletModel.findOne({ user: findS._id });
                if (wallet) {
                    let data = await WalletModel.findOneAndUpdate({ _id: wallet._id }, { $inc: { balance: req.body.amount } }, { new: true });
                    return res.status(200).json({ msg: 'Driver Earning', data: saveOrder })
                } else {
                    let obj2 = {
                        user: driver._id,
                        user_type: "driver",
                        balance: req.body.amount
                    }
                    await WalletModel.create(obj2)
                    return res.status(200).json({ msg: 'Driver Earning', data: saveOrder })
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
// exports.allEarning = async (req, res) => {
//     try {
//         const saveOrder = await driverEarning.find({ driverId: req.user._id, }).populate('Orders');
//         if (saveOrder.length == 0) {
//             return res.status(200).json({ msg: 'Driver Earning', data: {} })
//         } else {
//             return res.status(200).json({ msg: 'Driver Earning', data: saveOrder })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(501).send({ status: 501, message: "server error.", data: {}, });
//     }
// };
exports.allEarning = async (req, res) => {
    try {
        const { startDate, endDate, months } = req.query;
        const query = { driverId: req.user._id };
        if ((startDate != null) && (endDate != null)) {
            const startDateTime = new Date(`${startDate}T00:00:00Z`);
            const endDateTime = new Date(`${endDate}T23:59:59Z`);
            query.createdAt = { $gte: startDateTime, $lte: endDateTime };
        } else if (months != null) {
            // Assuming months is a number specifying the number of months to go back
            const startDateTime = new Date();
            startDateTime.setUTCMonth(startDateTime.getUTCMonth() - parseInt(months));
            query.createdAt = { $gte: startDateTime };
        }
        const saveOrder = await driverEarning.find(query).populate('Orders');
        if (saveOrder.length === 0) {
            return res.status(200).json({ msg: 'Driver Earning', data: {} });
        } else {
            return res.status(200).json({ msg: 'Driver Earning', data: saveOrder });
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {} });
    }
};
exports.allEarningforAdmin = async (req, res) => {
    try {
        const saveOrder = await driverEarning.find({}).populate('Orders driverId');
        if (saveOrder.length == 0) {
            return res.status(200).json({ msg: 'Driver Earning', data: {} })
        } else {
            return res.status(200).json({ msg: 'Driver Earning', data: saveOrder })
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.driverDashboard = async (req, res) => {
    try {
        const completedTotal = await BookingModel.find({ driverId: req.user._id, status: "completed" }).count();
        const cancelledTotal = await BookingModel.find({ driverId: req.user._id, status: "cancelled" }).count();
        const total = await driverEarning.find({ driverId: req.user._id, })
        let totalEarning = 0;
        total.forEach(element => {
            totalEarning = totalEarning + element.amount
        });
        let obj = {
            completed: completedTotal,
            cancelled: cancelledTotal,
            totalEarning: totalEarning
        }
        return res.status(200).json({ msg: 'Driver dashboard', data: obj })

    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.adminDashboard = async (req, res) => {
    try {
        const totalBooking = await BookingModel.find({ status: "completed" }).count();
        const totalVehicleType = await VehicleTypeModel.find({}).count();
        const totalVehicle = await VehicleModel.find({}).count();
        const totalDriver = await DriverModel.find({}).count();
        const totalUser = await UserModel.find({}).count();
        const totalBanner = await banner.find({}).count();

        let obj = {
            totalBooking: totalBooking,
            totalVehicleType: totalVehicleType,
            totalVehicle: totalVehicle,
            totalDriver: totalDriver,
            totalUser: totalUser,
            totalBanner: totalBanner
        }
        return res.status(200).json({ msg: 'admin dashboard', data: obj })

    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
//  ,users, banner ,