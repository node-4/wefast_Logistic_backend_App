const express = require('express'); // Import the express module
const { imageUploadController } = require('../controllers/index.js');
const { userOrdriver } = require('../middlewares/auth.js');
const multer = require('multer');
const { diskStorage } = multer;

// const router = express.Router();
const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, `${req.user._id.toString()}-${(new Date()).getTime()}.${file.mimetype.split('/')[file.mimetype.split('/').length - 1]}`)
    }
});

const upload = multer({ storage });
module.exports = (app) => {
    app.post('/', userOrdriver, upload.single('image'), imageUploadController.imageUpload);
}
// module.exports = { imageUploadRouter: router };
