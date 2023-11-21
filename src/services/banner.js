const BannerModel = require("../models/banners.js");
const addBanner = async (bannerImage) => {
    try {
        const banner = new BannerModel({ image: bannerImage });
        await banner.save();

        return banner;
    } catch (error) {
        throw error;
    }
}
const getAllBanners = async () => {
    try {
        const banners = await BannerModel.find({});

        const bannersResponse = banners.map((banner) => {
            return banner.toObject();
        })

        return bannersResponse;
    } catch (error) {
        throw error;
    }
}
exports.deleteBanner = async (driverId) => {
    try {
        const goodsType = await BannerModel.findById(driverId);
        if (!goodsType) {
            throw new ValidationError('invalid bannerId');
        }
        await BannerModel.findByIdAndDelete(driverId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addBanner,
    getAllBanners,
    deleteBanner
};
