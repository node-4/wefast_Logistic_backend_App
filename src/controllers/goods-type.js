const goodsTypeService = require('../services/index.js').goodsTypeService;

const addGoodsType = async (req, res, next) => {
    try {
        const goodsType = await goodsTypeService.addGoodsType(req.body);

        return res.status(200).json(goodsType);
    } catch (error) {
        next(error);
    }
};

const getAllGoodsTypes = async (req, res, next) => {
    try {
        const goodsTypes = await goodsTypeService.getAllGoodTypes();

        return res.status(200).json({
            msg: 'goods types',
            data: goodsTypes
        });
    } catch (error) {
        next(error);
    }
};

const deleteGoodsType = async (req, res, next) => {
    try {
        await goodsTypeService.deleteGoodsType(req.params.goodsTypeId);

        return res.status(200).json({
            msg: 'goods type deleted'
        });
    } catch (error) {
        next(error);
    }
};

const updateGoodsType = async (req, res, next) => {
    try {
        const goodsType = await goodsTypeService.updateGoodsType(req.params.goodsTypeId, req.body);

        return res.status(200).json({
            msg: 'update goods type',
            data: goodsType
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addGoodsType,
    getAllGoodsTypes,
    deleteGoodsType,
    updateGoodsType
};
