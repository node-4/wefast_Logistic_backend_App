// image-upload.js
const { ValidationError } = require('../errors/index.js');

async function imageUpload(req, res, next) {
    try {
        if (!req.file) {
            throw new ValidationError('no image provided');
        }

        return res.status(200).json({
            data: {
                image: req.file.path
            }
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            error.status = 400;
        }
        next(error);
    }
}

module.exports = { imageUpload };
