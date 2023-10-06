const vehicleController = require('../controllers/index.js').vehicleController;
const auth = require('../middlewares/auth.js');
module.exports = (app) => {
        app.post('/vehicle', auth.driver, vehicleController.addVehicle);
        app.get('/vehicle/all', auth.admin, vehicleController.getAllVehicles);
}
