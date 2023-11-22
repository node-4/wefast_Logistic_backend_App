const camelcaseKeys = require('camelcase-keys');
const snakecaseKeys = require('snakecase-keys');
const HelpAndSupportModel = require("../models/help-and-support.js");

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
        const helpAndSupport = await HelpAndSupportModel.find({});

        return helpAndSupport;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    add,
    getHelpAndSupport
};
