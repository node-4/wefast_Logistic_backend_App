const vehicleService = require('../services/index.js').vehicleService;

const addVehicle = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.addVehicle(req.user._id, req.body);

        return res.status(200).json({
            msg: 'vehicle added',
            data: vehicle
        });
    } catch (error) {
        next(error);
    }
};

const getAllVehicles = async (req, res, next) => {
    try {
        let page = 0;

        if (req.query.page > 0) {
            page = req.query.page - 1;
        }

        const vehicles = await vehicleService.getAllVehicles(page, req.query.vehicleType);

        return res.status(200).json({
            msg: 'vehicles',
            data: vehicles
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addVehicle,
    getAllVehicles
};
