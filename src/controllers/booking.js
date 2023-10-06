const bookingService = require('../services/index.js').bookingService;

const createBooking = async (req, res, next) => {
    try {
        let data = await bookingService.createBooking(req.user._id, req.body);
        return res.status(200).json({ msg: 'booking created', data: data });
    } catch (error) {
        next(error);
    }
};
const createScheduledBooking = async (req, res, next) => {
    try {
        await bookingService.createScheduledBooking(req.user._id, req.body);
        return res.status(200).json({ msg: 'booking created' });
    } catch (error) {
        next(error);
    }
};
const getAllBookingsOfUser = async (req, res, next) => {
    try {
        if (req.query.status && !Array.isArray(req.query.status)) {
            req.query.status = [req.query.status];
        }
        let userId;
        if (req.user.role == 'admin') {
            userId = req.params.userId;
        } else {
            userId = req.user._id;
        }
        const bookings = await bookingService.getAllBookingsOfUser(userId, req.query.status);
        return res.status(200).json({msg: 'bookings',data: bookings});
    } catch (error) {
        next(error);
    }
};
const getEstimatedPrice = async (req, res, next) => {
    try {
        const price = await bookingService.getEstimatedPrice(req.body.origin.lat, req.body.origin.lng, req.body.destination.lat, req.body.destination.lng, req.body.vehicleType);

        return res.status(200).json({
            msg: "estimated price",
            data: { price }
        });
    } catch (error) {
        next(error);
    }
};
const cancelBooking = async (req, res, next) => {
    try {
        await bookingService.cancelBooking(req.user._id, req.params.bookingId);
        return res.status(200).json({ msg: 'booking cancelled' });
    } catch (error) {
        next(error);
    }
};
const completeBooking = async (req, res, next) => {
    try {
        await bookingService.completeBooking(req.params.bookingId);
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};
const getEstimatedPricesForAllVehicleTypes = async (req, res, next) => {
    try {
        const vehicleTypes = await bookingService.getEstimatedPricesForAllVehicleTypes(req.body.origin.lat, req.body.origin.lng, req.body.destination.lat, req.body.destination.lng,);

        return res.status(200).json({
            msg: "estimated price",
            data: { vehicleTypes }
        });
    } catch (error) {
        next(error);
    }
};
const checkBookingStatus = async (req, res, next) => {
    try {
        const bookingStatus = await bookingService.checkBookingStatus(req.user._id, req.params.bookingId);

        return res.status(200).json({
            msg: 'booking status',
            data: { bookingStatus }
        });
    } catch (error) {
        next(error);
    }
};
const getBookingById = async (req, res, next) => {
    try {
        const booking = await bookingService.getBookingById(req.params.bookingId);

        return res.status(200).json({ msg: "booking", data: booking });
    } catch (error) {
        next(error);
    }
};
const pickUpCheckIn = async (req, res, next) => {
    try {
        const booking = await bookingService.pickUpCheckIn(req.params.bookingId);
        return res.status(200).json({ msg: "booking is on going", data: booking });
    } catch (error) {
        next(error);
    }
};
const acceptBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.acceptBooking(req.user._id, req.params.bookingId);
        return res.status(200).json({ msg: 'booking accepted', data: booking });
    } catch (error) {
        next(error);
    }
};
const getBookingsofDriver = async (req, res, next) => {
    try {
        if (req.query.status && !Array.isArray(req.query.status)) {
            req.query.status = [req.query.status];
        }
        let driverId;
        if (req.user.role == 'admin') {
            driverId = req.params.driverId;
        } else {
            driverId = req.user._id;
        }
        const bookings = await bookingService.getBookingsOfDriver(driverId, req.query.status);

        return res.status(200).json({
            msg: 'bookings',
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};














const getBookingSuggestion = async (req, res, next) => {
    try {
        const bookings = await bookingService.getBookingSuggestion(req.user._id);

        return res.status(200).json({
            msg: "bookings suggestion",
            data: { bookings }
        });
    } catch (error) {
        next(error);
    }
};
const rejectBooking = async (req, res, next) => {
    try {
        await bookingService.rejectBooking(req.user._id, req.params.bookingId);

        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};
module.exports = {
    createBooking,
    createScheduledBooking,
    getAllBookingsOfUser,
    getBookingsofDriver,
    cancelBooking,
    acceptBooking,
    checkBookingStatus,
    rejectBooking,
    getBookingSuggestion,
    getBookingById,
    pickUpCheckIn,
    completeBooking,
    getEstimatedPrice,
    getEstimatedPricesForAllVehicleTypes
};
