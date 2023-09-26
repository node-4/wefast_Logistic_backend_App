const express = require('express');
const documentController = require('../controllers/index.js').documentController;
const documentValidator = require('../middlewares/validators/index.js').document;
const auth = require('../middlewares/auth.js');

const router = express.Router();
module.exports = (app) => {
        app.post('/register', auth.driver, documentValidator.initialUpload, documentController.uploadDocuments);
}
// module.exports = router;
