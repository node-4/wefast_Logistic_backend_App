const locationService = require('../services/index.js').locationService;

const updateLocation = async (req, res, next) => {
    try {
        await locationService.updateLocation(req.user._id.toString(), req.body.coordinates);

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateLocation
};
