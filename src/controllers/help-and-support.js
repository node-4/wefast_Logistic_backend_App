const helpAndSupportService = require('../services/index.js');

module.exports.add = async (req, res, next) => {
    try {
        const helpAndSupport = await helpAndSupportService.add(req.body);

        return res.status(200).json({
            msg: 'help and support updated',
            data: { helpAndSupport }
        })
    } catch (error) {
        next(error);
    }
}

module.exports.getHelpAndSupport = async (req, res, next) => {
    try {
        const helpAndSupport = await helpAndSupportService.getHelpAndSupport();

        return res.status(200).json({
            msg: 'help and support',
            data: { ...helpAndSupport }
        })
    } catch (error) {
        next(error);
    }
}
