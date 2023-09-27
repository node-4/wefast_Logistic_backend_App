const express = require('express');
// const router = express.Router();
const adminController = require('../controllers/index.js').adminController;
const adminValidator = require('../middlewares/validators/index.js').admin;
const auth = require('../middlewares/auth.js');
module.exports = (app) => {
        app.post('/admin/register', adminValidator.registerAndLogin, adminController.register);
        app.post('/admin/login', adminValidator.registerAndLogin, adminController.login);
}
