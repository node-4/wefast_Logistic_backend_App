const express = require('express');
const goodsTypeController = require('../controllers/index.js').goodsTypeController;
const goodsTypeValidator = require('../middlewares/validators/index.js').goodsType;
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

        app.post('/goods-type/', auth.admin,
                // goodsTypeValidator.addGoodsType, 
                goodsTypeController.addGoodsType);

        app.get('/goods-type/all', goodsTypeController.getAllGoodsTypes);

        app.delete('/goods-type/:goodsTypeId', auth.admin,
                //  goodsTypeValidator.goodsTypeId,
                goodsTypeController.deleteGoodsType);

        app.put('/goods-type/:goodsTypeId', auth.admin,
                //  [goodsTypeValidator.goodsTypeId, goodsTypeValidator.updateGoodsType],
                goodsTypeController.updateGoodsType);
};
// module.exports = router;
