const camelcaseKeys = require('camelcase-keys');
const snakecaseKeys = require('snakecase-keys');
const { HelpAndSupportModel } = require('../models/index.js');

const add = async (payload) => {
    try {
        let helpAndSupport = await HelpAndSupportModel.findOne({});
        if (!helpAndSupport) {
            helpAndSupport = new HelpAndSupportModel();
        }
        helpAndSupport.email = payload.email;
        helpAndSupport.address = payload.address;
        helpAndSupport.phone_number = payload.phoneNumber;
        await helpAndSupport.save();

        return camelcaseKeys(helpAndSupport.toObject());
    } catch (error) {
        throw error;
    }
}

const getHelpAndSupport = async () => {
    try {
        const helpAndSupport = await HelpAndSupportModel.findOne({});

        return camelcaseKeys(helpAndSupport.toObject());
    } catch (error) {
        throw error;
    }
}

module.exports = {
    add,
    getHelpAndSupport
};
