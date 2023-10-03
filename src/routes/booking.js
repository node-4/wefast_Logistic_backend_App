const express = require('express');
const { bookingController } = require('../controllers/index.js');
const { booking: bookingValidator } = require('../middlewares/validators/index.js');
const auth = require('../middlewares/auth.js');

// const router = express.Router();
module.exports = (app) => {

    app.post('/booking', auth.user,
        // bookingValidator.createBooking,
        bookingController.createBooking);
    app.post('/booking/schedule', auth.user,
        // bookingValidator.createScheduledBooking,
        bookingController.createScheduledBooking);
    app.post("/booking/estimated-price",
        bookingController.getEstimatedPrice);
    app.post('/booking/:bookingId/cancel', auth.user,
        bookingController.cancelBooking);
    app.put("/booking/:bookingId/complete", auth.userOrdriver,
        bookingController.completeBooking)
    app.post("/booking/estimated-price/all",
        bookingController.getEstimatedPricesForAllVehicleTypes)
    app.get('/booking/status/:bookingId', auth.user,
        bookingController.checkBookingStatus);
    app.get("/booking/:bookingId",
        bookingController.getBookingById);
    app.put("/booking/:bookingId/pickup",
        bookingController.pickUpCheckIn);
    app.post('/booking/:bookingId/accept', auth.driver,
        bookingController.acceptBooking);
    app.get('/booking/user/:userId', auth.admin,
        // bookingValidator.userIdParam,
        // bookingValidator.statusQuery,
        bookingController.getAllBookingsOfUser);
        app.get('/booking/driver/:driverId', auth.admin,
        // bookingValidator.driverIdParam,
        // bookingValidator.statusQuery,
        bookingController.getBookingsofDriver);
    //////////////////////////////////////////////////////////////////////////////////////////////



    app.get("/booking/booking/suggestions", auth.driver,
        bookingController.getBookingSuggestion)
    // app.get('/booking/', auth.userOrdriver,
    //     // bookingValidator.statusQuery, (req, res, next) => {
    //         if (req.user.role == 'user') {
    //     return bookingController.getAllBookingsOfUser(req, res, next);
    // }
    // return bookingController.getBookingsofDriver(req, res, next);
    //     });



  

    app.post('/booking/reject/:bookingId', auth.driver,
        bookingController.rejectBooking);







}
// module.exports = { bookingRouter: router };
