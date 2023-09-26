const express = require('express');
const goodsTypeController = require('../controllers/index.js').goodsTypeController;
const goodsTypeValidator = require('../middlewares/validators/index.js').goodsType;
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

        app.post('/', auth.admin,
                // goodsTypeValidator.addGoodsType, 
                goodsTypeController.addGoodsType);

        app.get('/', goodsTypeController.getAllGoodsTypes);

        app.delete('/:goodsTypeId', auth.admin,
                //  goodsTypeValidator.goodsTypeId,
                goodsTypeController.deleteGoodsType);

        app.put('/:goodsTypeId', auth.admin,
                //  [goodsTypeValidator.goodsTypeId, goodsTypeValidator.updateGoodsType],
                goodsTypeController.updateGoodsType);
};
// module.exports = router;
