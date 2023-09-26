const express = require('express'); // Import the express module
const { helpAndSupportController } = require('../controllers/index.js');
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

        app.post('/', auth.admin, helpAndSupportController.add);

        app.get('/', helpAndSupportController.getHelpAndSupport);
}
// module.exports = { helpAndSupportRouter: router };
