const express = require('express');
// const router = express.Router();
const vehicleTypeController = require('../controllers/index.js').vehicleTypeController;
const vehicleTypeValidator = require('../middlewares/validators/index.js').vehicleType;
const auth = require('../middlewares/auth.js');

module.exports = (app) => {
        app.post('/vehicle-type', auth.admin, vehicleTypeValidator.addVehicleType, vehicleTypeController.addvehicleType);
        app.get('/vehicle-type', vehicleTypeController.getAllVehicleTypes);
        app.get('/vehicle-type/:vehicleTypeId', vehicleTypeValidator.getVehicleTypeId, vehicleTypeController.getVehicleType);
        app.put('/vehicle-type/:vehicleTypeId', auth.admin, [vehicleTypeValidator.update.vehicleTypeId, vehicleTypeValidator.update.updatePayload], vehicleTypeController.updateVehicleType)
        app.delete('/vehicle-type/:vehicleTypeId', vehicleTypeValidator.getVehicleTypeId, vehicleTypeController.deleteVehicleType);
}