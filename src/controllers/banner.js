const bannerService = require('../services/index.js').bannerService;

const addBanner = async (req, res, next) => {
    try {
        const banner = await bannerService.addBanner(req.body.image);

        return res.status(201).json({
            msg: 'banner created',
            data: { banner }
        })
    } catch (error) {
        next(error);
    }
}

const getAllBanners = async (req, res, next) => {
    try {
        const banners = await bannerService.getAllBanners();

        return res.status(200).json({
            msg: 'all banners',
            data: { banners }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addBanner,
    getAllBanners
};
