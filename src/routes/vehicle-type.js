const express = require('express');
// const router = express.Router();
const vehicleTypeController = require('../controllers/index.js').vehicleTypeController;
const vehicleTypeValidator = require('../middlewares/validators/index.js').vehicleType;
const auth = require('../middlewares/auth.js');

module.exports = (app) => {

        app.post('/', auth.admin, vehicleTypeValidator.addVehicleType, vehicleTypeController.addvehicleType);

        app.get('/', vehicleTypeController.getAllVehicleTypes);

        app.get('/:vehicleTypeId', vehicleTypeValidator.getVehicleTypeId, vehicleTypeController.getVehicleType);

        app.put('/:vehicleTypeId', auth.admin,
                [vehicleTypeValidator.update.vehicleTypeId, vehicleTypeValidator.update.updatePayload],
                vehicleTypeController.updateVehicleType)
}
