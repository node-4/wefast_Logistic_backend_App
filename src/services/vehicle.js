const { VehicleModel, DriverModel, VehicleTypeModel } = require('../models/index.js');
const { ValidationError } = require('../errors/index.js');
const snakecaseKeys = require('snakecase-keys');
const camelcaseKeys = require('camelcase-keys');


exports.addVehicle = async (driverId, payload) => {
    try {
        const vehicleTypeExists = await VehicleTypeModel.findById(payload.vehicleType);
        if (!vehicleTypeExists) {
            throw new ValidationError('invalid vehicleType');
        }

        const vehicleWithNumber = await VehicleModel.findOne({
            vehicle_number: payload.vehicleNumber
        });
        if (vehicleWithNumber) {
            throw new ValidationError('vehicle with number already exists');
        }

        await DriverModel.findByIdAndUpdate(driverId, {
            name: payload.name,
            is_vehicle_registered: true
        });

        const vehicle = new VehicleModel({
            ...snakecaseKeys(payload),
            owner: driverId
        });

        await vehicle.save();

        return camelcaseKeys(vehicle.toObject());
    } catch (error) {
        throw error;
    }
}

exports.updateRc = async (driverId, rcImage, rcNumber) => {
    try {
        const vehicle = await VehicleModel.findOne({
            owner: driverId
        });
        if (!vehicle) {
            throw new ValidationError(`user doesn't have any vehicle registered`);
        }

        vehicle.vehicle_rc = rcImage;
        vehicle.vehicle_rc_number = rcNumber;
        await vehicle.save();

        return;
    } catch (error) {
        throw error;
    }
}

exports.updateInsurance = async (driverId, insuranceImages, insuranceNumber) => {
    try {
        const vehicle = await VehicleModel.findOne({ owner: driverId });
        if (!vehicle) {
            throw new ValidationError(`user doesn't have any vehicle registered`);
        }

        vehicle.vehicle_insurance = insuranceImages;
        vehicle.vehicle_insurance_number = insuranceNumber;
        await vehicle.save();

        return;
    } catch (error) {
        throw error;
    }
}

exports.getAllVehicles = async (page, vehicleType) => {
    try {
        let query = {};
        if (vehicleType) {
            query.vehicle_type = vehicleType;
        }

        const vehicles = await VehicleModel.find(query).sort({ createdAt: -1 }).skip(page)
            .limit(10).populate("owner", "name").lean().populate('vehicle_type');

        const vehicleResponse = vehicles.map((vehicle) => {
            delete vehicle.__v;
            return camelcaseKeys(vehicle)
        })

        return vehicleResponse;
    } catch (error) {
        throw error;
    }
}