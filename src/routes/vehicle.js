const express = require('express');
const vehicleController = require('../controllers/index.js').vehicleController;
const vehicleValidator = require('../middlewares/validators/index.js').vehicle;
const auth = require('../middlewares/auth.js');
// const router = express.Router();
module.exports = (app) => {

        app.post('/', auth.driver,
                // vehicleValidator.add,
                vehicleController.addVehicle
        );
        app.get('/all',
                auth.admin,
                // vehicleValidator.getAllVehicleQuery,
                vehicleController.getAllVehicles);
}
// module.exports = { vehicleRouter: router };
