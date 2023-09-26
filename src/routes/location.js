const express = require('express'); // Import the express module
const { locationController } = require('../controllers/index.js');
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

        app.put('/', auth.driver, locationController.updateLocation);
};
// module.exports = { locationRouter: router };
