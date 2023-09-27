const { vehicleTypeService } = require('../services/index.js');

const addvehicleType = async (req, res, next) => {
    try {
        const vehicleType = await vehicleTypeService.addvehicleType(req.body);

        return res.status(200).json({
            msg: 'vehicle type added successfully',
            data: vehicleType
        });
    } catch (error) {
        next(error);
    }
};

const updateVehicleType = async (req, res, next) => {
    try {
        const vehicleType = await vehicleTypeService.updateVehicleType(req.params.vehicleTypeId, req.body);

        return res.status(200).json({
            msg: 'vehicle type updated',
            data: vehicleType
        });
    } catch (error) {
        next(error);
    }
};

const getAllVehicleTypes = async (req, res, next) => {
    try {
        const vehicleTypes = await vehicleTypeService.getAllVehicleTypes();

        return res.status(200).json({
            msg: 'vehicle types',
            data: vehicleTypes
        });
    } catch (error) {
        next(error);
    }
};

const getVehicleType = async (req, res, next) => {
    try {
        const vehicleType = await vehicleTypeService.getVehicletype(req.params.vehicleTypeId);

        return res.status(200).json({
            msg: 'vehicle type details',
            data: vehicleType
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addvehicleType,
    updateVehicleType,
    getAllVehicleTypes,
    getVehicleType,
};
