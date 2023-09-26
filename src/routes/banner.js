const express = require('express'); // Import the express module
const { bannerController } = require('../controllers/index.js');
const auth = require('../middlewares/auth.js');
const { banner: bannerValidator } = require('../middlewares/validators/index.js');

// // const router = express.Router();
module.exports = (app) => {

        app.post('/', auth.admin, bannerValidator.addBanner, bannerController.addBanner);

        app.get('/', bannerController.getAllBanners);
}
// module.exports = { bannerRouter: router };
