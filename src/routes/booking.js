const express = require('express');
const { bookingController } = require('../controllers/index.js');
const { booking: bookingValidator } = require('../middlewares/validators/index.js');
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

    app.post('/', auth.user,
        // bookingValidator.createBooking,
        bookingController.createBooking);

    app.get("/suggestions", auth.driver,
        bookingController.getBookingSuggestion)

    app.post('/schedule', auth.user,
        // bookingValidator.createScheduledBooking,
        bookingController.createScheduledBooking);

    // app.get('/', auth.userOrdriver,
    //     // bookingValidator.statusQuery, (req, res, next) => {
    //         if (req.user.role == 'user') {
    //     return bookingController.getAllBookingsOfUser(req, res, next);
    // }
    // return bookingController.getBookingsofDriver(req, res, next);
    //     });

    app.get('/user/:userId', auth.admin,
        // bookingValidator.userIdParam,
        // bookingValidator.statusQuery,
        bookingController.getAllBookingsOfUser);

    app.get('/driver/:driverId', auth.admin,
        // bookingValidator.driverIdParam,
        // bookingValidator.statusQuery,
        bookingController.getBookingsofDriver);

    app.post('/reject/:bookingId', auth.driver,
        bookingController.rejectBooking);

    app.get('/status/:bookingId', auth.user,
        bookingController.checkBookingStatus);

    app.post("/estimated-price",
        bookingController.getEstimatedPrice);

    app.post("/estimated-price/all",
        bookingController.getEstimatedPricesForAllVehicleTypes)

    app.get("/:bookingId", auth.userOrdriver,
        bookingController.getBookingById);

    app.put("/:bookingId/pickup", auth.userOrdriver,
        bookingController.pickUpCheckIn);

    app.put("/:bookingId/complete", auth.userOrdriver,
        bookingController.completeBooking)

    app.post('/:bookingId/cancel', auth.user,
        bookingController.cancelBooking);

    app.post('/:bookingId/accept', auth.driver,
        bookingController.acceptBooking);
}
// module.exports = { bookingRouter: router };
