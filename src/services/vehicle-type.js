// const { VehicleTypeModel } = require('../models/index.js');
const VehicleTypeModel = require('../models/vehicle-type');
const { ValidationError } = require('../errors/index.js');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');


/**
 * 
 * @param {object} payload
 * @param {string} payload.name
 * @param {number} payload.loadWeight 
 * @param {number} payload.baseFare
 * @param {number} payload.pricePerKm
 * @param {number} payload.pricePerMin
 */
exports.addvehicleType = async (payload) => {
    try {
        const vehicleTypeExist = await VehicleTypeModel.findOne({
            lowercase_name: payload.name.toLowerCase()
        });
        if (vehicleTypeExist) {
            let a = { msg: 'vehicle type with name already exists', data: {} }
            return a
        }

        const vehicleType = new VehicleTypeModel(snakeCaseKeys(payload));

        await vehicleType.save();
        let a = { msg: 'vehicle type added successfully', data: camelCaseKeys(vehicleType.toObject()) }
        return a
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} vehicleTypeId
 * @param {object} updatePayload
 * @param {string} [updatePayload.name]
 * @param {number} [updatePayload.loadWeight] 
 * @param {number} [updatePayload.baseFare]
 * @param {number} [updatePayload.pricePerKm]
 * @param {number} [updatePayload.pricePerMin]
 */
exports.updateVehicleType = async (vehicleTypeId, updatePayload) => {
    try {
        const vehicleType = await VehicleTypeModel.findById(vehicleTypeId);
        if (!vehicleType) {
            let a = { msg: 'invalid vehicleTypeId', data: {} }
            return a
        }
        if (updatePayload.name && updatePayload.lowercase_name !== vehicleType.name.toLowerCase()) {
            const nameExist = await VehicleTypeModel.findOne({
                lowercase_name: updatePayload.name.toLowerCase()
            });
            updatePayload.lowercase_name = updatePayload.name.toLowerCase();
            if (nameExist) {
                let a = { msg: 'vehicle type with name already exist', data: {} }
                return a
            }
        }
        await vehicleType.updateOne(snakeCaseKeys(updatePayload));
        const updatedVehicleType = await VehicleTypeModel.findById(vehicleType.id).lean();
        delete updatedVehicleType.__v;
        let a = { msg: 'vehicle type updated', data: camelCaseKeys(updatedVehicleType) }
        return a
    } catch (error) {
        throw error;
    }
}

exports.getAllVehicleTypes = async () => {
    try {
        const vehicleTypes = await VehicleTypeModel.find().select({}).lean();

        const vehicleTypesResponse = vehicleTypes.map((vehicleType) => {
            delete vehicleType.__v;
            delete vehicleType.createdAt;
            delete vehicleType.updatedAt;
            return camelCaseKeys(vehicleType);
        })
        return vehicleTypesResponse;
    } catch (error) {
        throw error;
    }
}

exports.getVehicletype = async (vehicleTypeId) => {
    try {
        const vehicleType = (await VehicleTypeModel.findById(vehicleTypeId))?.toJSON();

        if (!vehicleType) {
            throw new ValidationError('invalid vehicleTypeId');
        }

        return camelCaseKeys(vehicleType);
    } catch (error) {
        throw error;
    }
}


exports.deleteVehicleType = async (vehicleTypeId) => {
    try {
        console.log("fmn8fmfdm", vehicleTypeId);
        const vehicleType = await VehicleTypeModel.findById({ _id: vehicleTypeId });
        if (!vehicleType) {
            throw new ValidationError('invalid vehicleTypeId');
        } else {
            await vehicleType.remove();
            return camelCaseKeys(vehicleType);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};
