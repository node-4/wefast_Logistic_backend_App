const { GoodsTypeModel } = require('../models/index.js');
const { ValidationError } = require('../errors/index.js');
const camelcaseKeys = require('camelcase-keys');

/**
 * 
 * @param {object} goodsTypePayload
 * @param {string} goodsTypePayload.name
 * @param {string} [goodsTypePayload.description]
 * @returns {object}
 */
exports.addGoodsType = async (goodsTypePayload) => {
    try {
        const goodsTypeWithName = await GoodsTypeModel.findOne({
            lowercase_name: goodsTypePayload.name.toLowerCase()
        });
        if (goodsTypeWithName) {
            return { status: 409, message: "goods type with name already exist." }
        }

        const goodsType = new GoodsTypeModel({
            ...goodsTypePayload
        });
        await goodsType.save();

        let data = camelcaseKeys(goodsType.toObject())
        return { status: 200, message: "Goods type.", data: data }

    } catch (error) {
        throw error;
    }
}

exports.getAllGoodTypes = async () => {
    try {
        const goodsTypes = await GoodsTypeModel.find({}).lean();

        const goodsTypesResponse = goodsTypes.map((goodsType) => {
            delete goodsType.__v;
            return camelcaseKeys(goodsType);
        })

        return goodsTypesResponse;
    } catch (error) {
        throw error;
    }
}

exports.deleteGoodsType = async (goodsTypeId) => {
    try {
        const goodsType = await GoodsTypeModel.findById(goodsTypeId);
        if (!goodsType) {
            throw new ValidationError('invalid goodsTypeId');
        }

        await GoodsTypeModel.findByIdAndDelete(goodsType);
    } catch (error) {
        throw error;
    }
}

exports.updateGoodsType = async (goodsTypeId, updatePayload) => {
    try {
        const goodsType = await GoodsTypeModel.findById(goodsTypeId);
        if (!goodsType) {
            throw new ValidationError('invalid goodsTypeId');
        }

        if (updatePayload.name && goodsType.lowercase_name !== updatePayload.name.toLowerCase()) {
            const goodsTypeWithName = await GoodsTypeModel.findOne({
                lowercase_name: updatePayload.name.toLowerCase()
            })

            if (goodsTypeWithName) {
                throw new ValidationError('goods type with name already exists');
            }

            updatePayload.lowercase_name = updatePayload.name.toLowerCase();
        }

        await goodsType.updateOne(updatePayload);

        const updatedGoodsType = (await GoodsTypeModel.findById(goodsTypeId)).toObject();
        return camelcaseKeys(updatedGoodsType);
    } catch (error) {
        throw error;
    }
}