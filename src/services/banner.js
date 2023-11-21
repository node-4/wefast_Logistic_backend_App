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
const deleteBanner = async (driverId) => {
    try {
        const goodsType = await BannerModel.findById(driverId);
        if (!goodsType) {
            let a = { msg: 'invalid bannerId' }
            return a
        }
        await BannerModel.findByIdAndDelete(driverId);
        let a = { msg: 'banner deleted' }
        return a
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addBanner,
    getAllBanners,
    deleteBanner
};
