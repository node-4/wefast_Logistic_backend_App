const vehicleService = require('../services/index.js').vehicleService;
const driverService = require('../services/index.js').driverService;

const uploadDocuments = async (req, res, next) => {
    try {
        const uploadVehicleRc = vehicleService.updateRc(
            req.user._id,
            req.body.vehicleRc,
            req.body.vehicleRcNumber
        );
        const uploadvehicleInsurance = vehicleService.updateInsurance(
            req.user._id,
            req.body.vehicleInsurance,
            req.body.vehicleInsuranceNumber
        );
        const uploadDriverLicense = driverService.updateDriverLicense(
            req.user._id,
            req.body.driverLicense,
            req.body.driverLicenseNumber
        );
        const uploadId = driverService.updateAadhaarOrVoter(
            req.user._id,
            req.body.aadhaarOrVoterCard,
            req.body.aadhaarOrVoterCardNumber
        );

        await Promise.all([
            uploadDriverLicense,
            uploadVehicleRc,
            uploadvehicleInsurance,
            uploadId
        ]);

        return res.status(200).json({
            msg: 'documents successfully updated'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadDocuments
};
