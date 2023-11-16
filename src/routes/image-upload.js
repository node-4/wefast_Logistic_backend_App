const express = require('express'); // Import the express module
const { imageUploadController } = require('../controllers/index.js');
const { userOrdriver } = require('../middlewares/auth.js');
// const multer = require('multer');
// const { diskStorage } = multer;

// // const router = express.Router();
// const storage = diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${req.user._id.toString()}-${(new Date()).getTime()}.${file.mimetype.split('/')[file.mimetype.split('/').length - 1]}`)
//     }
// });
// const upload = multer({ storage });

var multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: 'djgrqoefp', api_key: '274167243253962', api_secret: '3mkqkDDusI5Hf4flGNkJNz4PHYg', });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/Product", allowed_formats: ["webp", "avif", "jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });
module.exports = (app) => {
    app.post('/image-upload', userOrdriver, upload.single('image'), imageUploadController.imageUpload);
}
// module.exports = { imageUploadRouter: router };
