const BookingModel = require("../models/booking");
const VehicleModel = require("../models/vehicle");
const WalletModel = require("../models/wallet");
const VehicleTypeModel = require('../models/vehicle-type'); // Adjust the path as needed
const { ValidationError } = require("../errors/index.js");
const snakecaseKeys = require("snakecase-keys");
const camelcaseKeys = require("camelcase-keys");
const { getRedisConnection } = require("../../redis.js");
const { Client } = require("@googlemaps/google-maps-services-js");
const Constants = require("../constants/index.js");
const googleMapsClient = new Client({});

exports.createBooking = async (userId, bookingPayload) => {
  try {
    const estimatedPrice = await getEstimatedPrice(
      bookingPayload.pickupLocation[0],
      bookingPayload.pickupLocation[1],
      bookingPayload.dropLocation[0],
      bookingPayload.dropLocation[1],
      bookingPayload.vehicleType
    );
    let pickupLocation, dropLocation;
    if (bookingPayload.pickupLocation[0] || bookingPayload.pickupLocation[1]) {
      coordinates = [parseFloat(bookingPayload.pickupLocation[0]), parseFloat(bookingPayload.pickupLocation[1])]
      pickupLocation = { type: "Point", coordinates };
    }
    if (bookingPayload.dropLocation[0] || bookingPayload.dropLocation[1]) {
      coordinates = [parseFloat(bookingPayload.dropLocation[0]), parseFloat(bookingPayload.dropLocation[1])]
      dropLocation = { type: "Point", coordinates };
    }
    let orderType;
    if (bookingPayload.loadWeight != (null || undefined)) {
      orderType = 'Load'
    } else {
      orderType = 'booking'
    }
    let obj = {
      user: userId.toString(),
      vehicle_type: bookingPayload.vehicleType,
      pickup_address: bookingPayload.pickupAddress,
      drop_address: bookingPayload.dropAddress,
      pickup_location: pickupLocation,
      drop_location: dropLocation,
      receiver_details: bookingPayload.receiverDetails,
      sender_details: bookingPayload.senderDetails,
      load_weight: bookingPayload.loadWeight,
      notes: bookingPayload.notes,
      goods_type: bookingPayload.goodsType,
      labour_needed: bookingPayload.labourNeeded,
      paid_by: bookingPayload.paidBy,
      orderType: orderType,
      amount: estimatedPrice.toFixed(2),
    }
    let booking = await BookingModel(obj).save();
    return booking;

    // const booking = new BookingModel(
    //   snakecaseKeys({
    //     user: userId.toString(),
    //     ...bookingPayload,
    //     amount: estimatedPrice,
    //     pickupLocation: pickupLocation,
    //     dropLocation: dropLocation,
    //   })
    // );
    // await booking.save();
    // await updateBookingsAvailableForDriver(
    //   booking._id,
    //   booking.pickup_location.coordinates
    // );
    // setTimeout(deleteBookingIfNotAccepted(booking._id), 180000);
  } catch (error) {
    throw error;
  }
};
exports.createScheduledBooking = async (userId, bookingPayload) => {
  try {
    let pickupLocation, dropLocation;
    if (bookingPayload.pickupLocation[0] || bookingPayload.pickupLocation[1]) {
      coordinates = [parseFloat(bookingPayload.pickupLocation[0]), parseFloat(bookingPayload.pickupLocation[1])]
      pickupLocation = { type: "Point", coordinates };
    }
    if (bookingPayload.dropLocation[0] || bookingPayload.dropLocation[1]) {
      coordinates = [parseFloat(bookingPayload.dropLocation[0]), parseFloat(bookingPayload.dropLocation[1])]
      dropLocation = { type: "Point", coordinates };
    }
    const booking = new BookingModel(
      snakecaseKeys({
        user: userId.toString(),
        booking_type: "later",
        ...bookingPayload,
        pickup_location: pickupLocation,
        drop_location: dropLocation,
      })
    );
    await booking.save();
  } catch (error) {
    throw error;
  }
};
exports.getAllBookingsOfUser = async (userId, query = ["completed", "cancelled", "on_going", "confirmed"]) => {
  try {
    console.log("userId", userId);
    const bookings = await BookingModel.find({ user: userId, orderType: "booking", status: { $in: query }, }).sort({ createdAt: -1 }).populate("driver", "name").populate({ path: "vehicle_type", select: "name image", model: 'vehicle_type' }).lean();
    console.log("bookings", bookings);
    const bookingResponse = bookings.map((booking) => {
      delete booking.__v;
      return booking;
    });

    return bookingResponse
  } catch (error) {
    throw error;
  }
};
exports.cancelBooking = async (userId, bookingId) => {
  try {
    const booking = await BookingModel.findOne({ user: userId, _id: bookingId, status: { $in: ["confirmed", "unconfirmed"] }, });
    if (!booking) {
      throw new ValidationError("invalid bookingId");
    }
    booking.status = "cancelled";
    // await removeBookingFromRedis(bookingId);
    await booking.save();
  } catch (error) {
    throw error;
  }
};
// exports.completeBooking = async (bookingId) => {
//   try {
//     const booking = await BookingModel.findById(bookingId);
//     booking.status = "completed";
//     booking.punchOut = new Date();
//     const amount = booking.amount;
//     if (booking.payment_mode === "wallet") {
//       await Promise.all([
//         booking.save(),
//         WalletModel.findOneAndUpdate(
//           { user: booking.user },
//           {
//             $inc: { balance: -1 * amount },
//           }
//         ),
//         WalletModel.findOneAndUpdate(
//           { user: booking.driver },
//           {
//             $inc: { balance: 0.9 * amount },
//           }
//         ),
//       ]);
//     } else {
//       await Promise.all([
//         booking.save(),
//         WalletModel.findOneAndUpdate(
//           { user: booking.driver },
//           {
//             $inc: { balance: -1 * 0.1 * amount },
//           }
//         ),
//       ]);
//     }
//   } catch (error) {
//     throw error;
//   }
// };
const msToTime = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  return formattedTime;
};
exports.completeBooking = async (bookingId) => {
  try {
    const booking = await BookingModel.findById(bookingId);
    booking.status = "completed";
    booking.punchOut = new Date();
    const totalRideTimeMs = new Date() - booking.punchIn;
    const totalRideTimeFormatted = msToTime(totalRideTimeMs);
    booking.totalTime = totalRideTimeFormatted;
    const amount = booking.amount;
    if (booking.payment_mode === "wallet") {
      await Promise.all([
        booking.save(),
        WalletModel.findOneAndUpdate(
          { user: booking.user },
          {
            $inc: { balance: -1 * amount },
          }
        ),
        WalletModel.findOneAndUpdate(
          { user: booking.driver },
          {
            $inc: { balance: 0.9 * amount },
          }
        ),
      ]);
    } else {
      await Promise.all([
        booking.save(),
        WalletModel.findOneAndUpdate(
          { user: booking.driver },
          {
            $inc: { balance: -1 * 0.1 * amount },
          }
        ),
      ]);
    }
  } catch (error) {
    throw error;
  }
};
exports.getEstimatedPricesForAllVehicleTypes = async (lat1, lon1, lat2, lon2,) => {
  try {
    const [vehicleTypes, distance] = await Promise.all([
      VehicleTypeModel.find({}).lean(),
      getDistance(lat1, lon1, lat2, lon2,),
    ]);
    const vehicleTypesWithPrice = vehicleTypes.map((vehicleType) => {
      vehicleType.estimatedPrice = (vehicleType.price_per_km * distance).toFixed(2);
      return camelcaseKeys(vehicleType)
    })
    return vehicleTypesWithPrice;
  } catch (error) {
    throw error;
  }
};
exports.checkBookingStatus = async (userId, bookingId) => {
  try {
    const bookingStatus = await BookingModel.findOne({ user: userId, _id: bookingId, })
      .populate('user')
      .populate('vehicle_type')
      .populate('goods_type')
    /*.select({ status: 1 })*/
    if (!bookingStatus) {
      throw new ValidationError("booking not found");
    }
    return bookingStatus;
  } catch (error) {
    throw error;
  }
};
exports.getBookingById = async (bookingId) => {
  try {
    const booking = await BookingModel.findById(bookingId).populate(


      "user driver vehicle vehicle_type goods_type",
      // "name"
    );
    delete booking.__v;

    return camelcaseKeys(booking.toObject());
  } catch (error) {
    throw error;
  }
};
exports.pickUpCheckIn = async (bookingId) => {
  try {
    let a = await BookingModel.findByIdAndUpdate({ _id: bookingId }, { $set: { status: "on_going", punchIn: new Date() } }, { new: true });
    return a
  } catch (error) {
    throw error;
  }
};
exports.acceptBooking = async (driverId, bookingId) => {
  try {
    const vehicle = await VehicleModel.findOne({ owner: driverId });
    console.log(vehicle, driverId);
    const booking = await BookingModel.findOne({ _id: bookingId, status: "unconfirmed", }).populate("pickup_location drop_location");
    if (!booking) {
      throw new ValidationError("invalid bookingId");
    }
    booking.driver = driverId;
    booking.vehicle = vehicle._id;
    booking.status = "confirmed";

    booking.save();

    // await removeBookingFromRedis(bookingId);
    return camelcaseKeys(booking.toObject());
  } catch (error) {
    throw error;
  }
};
exports.getBookingsOfDriver = async (driverId, query = ["completed", "cancelled", "on_going", "confirmed"]) => {
  try {
    const bookings = await BookingModel.find({
      driver: driverId,
      status: { $in: query },
    })
      .populate("user", "name")
      .lean();

    const bookingResponse = bookings.map((booking) => {
      delete booking.__v;
      return booking;
    });

    return camelcaseKeys(bookingResponse);
  } catch (error) {
    throw error;
  }
};
exports.getAllloadBookingsOfUser = async (userId, query = ["completed", "cancelled", "on_going", "confirmed"]) => {
  try {
    const bookings = await BookingModel.find({ user: userId, orderType: "Load", status: { $in: query }, }).sort({ createdAt: -1 }).populate("driver", "name").populate({ path: "vehicle_type", select: "name image", model: 'vehicle_type' }).lean();
    const bookingResponse = bookings.map((booking) => {
      delete booking.__v;
      return booking;
    });
    return bookingResponse
  } catch (error) {
    throw error;
  }
};
/////////////////////////////////////////////////////new function ///////////////
exports.getBookingsofAdmin = async () => {
  try {
    const bookings = await BookingModel.find({}).populate("user driver vehicle vehicle_type").lean();
    const bookingResponse = bookings.map((booking) => { delete booking.__v; return booking; });
    return camelcaseKeys(bookingResponse);
  } catch (error) {
    throw error;
  }
};
const getDistance = async (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}
exports.getEstimatedPrice = async (lat1, lon1, lat2, lon2, vehicleTypeId) => {
  try {
    const [vehicleType, distance] = await Promise.all([
      VehicleTypeModel.findById(vehicleTypeId),
      getDistance(lat1, lon1, lat2, lon2),
    ]);
    let data = vehicleType.price_per_km * distance;
    let data1 = Number(data.toFixed(2)) + vehicleType.base_fare;
    return data1;
  } catch (error) {
    throw error;
  }
};


exports.getAllBookingsOfDriverbefore = async () => {
  try {
    const bookings = await BookingModel.find({ orderType: "booking", status: "unconfirmed", }).sort({ createdAt: -1 }).populate({ path: "vehicle_type", select: "name image", model: 'vehicle_type' }).lean();
    const bookingResponse = bookings.map((booking) => {
      delete booking.__v;
      return booking;
    });

    return bookingResponse
  } catch (error) {
    throw error;
  }
};
const { getEstimatedPrice } = module.exports;
//////////////////////////////////////////
















// exports.createBooking = async (userId, bookingPayload) => {
//   try {
//     const estimatedPrice = await getEstimatedPrice(
//       {
//         lng: bookingPayload.pickupLocation[0],
//         lat: bookingPayload.pickupLocation[1],
//       },
//       {
//         lng: bookingPayload.dropLocation[0],
//         lat: bookingPayload.dropLocation[1],
//       },
//       bookingPayload.vehicleType
//     );
//     const booking = new BookingModel(
//       snakecaseKeys({
//         user: userId.toString(),
//         ...bookingPayload,
//         amount: estimatedPrice,
//       })
//     );
//     await booking.save();
//     await updateBookingsAvailableForDriver(
//       booking._id,
//       booking.pickup_location.coordinates
//     );
//     setTimeout(deleteBookingIfNotAccepted(booking._id), 180000);
//   } catch (error) {
//     throw error;
//   }
// };

// exports.createScheduledBooking = async (userId, bookingPayload) => {
//   try {
//     const booking = new BookingModel(
//       snakecaseKeys({
//         user: userId.toString(),
//         booking_type: "later",
//         ...bookingPayload,
//       })
//     );
//     await booking.save();
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getAllBookingsOfUser = async (
//   userId,
//   query = ["completed", "cancelled", "on_going", "confirmed"]
// ) => {
//   try {
//     const bookings = await BookingModel.find({
//       user: userId,
//       status: { $in: query },
//     })
//       .populate("driver", "name")
//       .populate("vehicle", "vehicle_number")
//       .populate("vehicle_type", "name image")
//       .populate("vehicle", "vehicle_number")
//       .lean();

//     const bookingResponse = bookings.map((booking) => {
//       delete booking.__v;
//       return booking;
//     });

//     return camelcaseKeys(bookingResponse);
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getBookingsOfDriver = async (
//   driverId,
//   query = ["completed", "cancelled", "on_going", "confirmed"]
// ) => {
//   try {
//     const bookings = await BookingModel.find({
//       driver: driverId,
//       status: { $in: query },
//     })
//       .populate("user", "name")
//       .lean();

//     const bookingResponse = bookings.map((booking) => {
//       delete booking.__v;
//       return booking;
//     });

//     return camelcaseKeys(bookingResponse);
//   } catch (error) {
//     throw error;
//   }
// };

// exports.cancelBooking = async (userId, bookingId) => {
//   try {
//     const booking = await BookingModel.findOne({
//       user: userId,
//       _id: bookingId,
//       status: { $in: ["confirmed", "unconfirmed"] },
//     });

//     if (!booking) {
//       throw new ValidationError("invalid bookingId");
//     }

//     booking.status = "cancelled";
//     await removeBookingFromRedis(bookingId);
//     await booking.save();
//   } catch (error) {
//     throw error;
//   }
// };

// exports.acceptBooking = async (driverId, bookingId) => {
//   try {
//     const vehicle = await VehicleModel.find({ owner: driverId });
//     const booking = await BookingModel.findOne({
//       _id: bookingId,
//       status: "unconfirmed",
//     }).populate("pickup_location drop_location");

//     if (!booking) {
//       throw new ValidationError("invalid bookingId");
//     }
//     booking.driver = driverId;
//     booking.vehicle = vehicle._id;
//     booking.status = "confirmed";

//     booking.save();

//     await removeBookingFromRedis(bookingId);
//     return camelcaseKeys(booking.toObject());
//   } catch (error) {
//     throw error;
//   }
// };

// exports.checkBookingStatus = async (userId, bookingId) => {
//   try {
//     const bookingStatus = (
//       await BookingModel.findOne({
//         user: userId,
//         _id: bookingId,
//       }).select({ status: 1 })
//     ).toObject();

//     if (!bookingStatus) {
//       throw new ValidationError("booking not found");
//     }

//     return bookingStatus;
//   } catch (error) {
//     throw error;
//   }
// };

// exports.rejectBooking = async (driverId, bookingId) => {
//   try {
//     removeBookingForDriver(driverId, bookingId);
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getBookingSuggestion = async (driverId) => {
//   try {
//     const redis = getRedisConnection();

//     const bookingIds = await redis.smembers(`${driverId}:bookings`);
//     console.log("bookingIds");
//     console.log(bookingIds);
//     const bookings = await BookingModel.find({
//       _id: { $in: bookingIds },
//     })
//       .populate("user", "name")
//       .lean();

//     const bookingResponse = bookings.map((booking) => {
//       delete booking.__v;
//       return booking;
//     });

//     return camelcaseKeys(bookingResponse);
//     // return bookings;
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getBookingById = async (bookingId) => {
//   try {
//     const booking = await BookingModel.findById(bookingId).populate(
//       "user",
//       "name"
//     );
//     delete booking.__v;

//     return camelcaseKeys(booking.toObject());
//   } catch (error) {
//     throw error;
//   }
// };

// exports.pickUpCheckIn = async (driverId, bookingId) => {
//   try {
//     await BookingModel.findByIdAndUpdate(bookingId, {
//       status: "on_going",
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// exports.completeBooking = async (bookingId) => {
//   try {
//     const booking = await BookingModel.findById(bookingId);
//     booking.status = "completed";

//     const amount = booking.amount;

//     if (booking.payment_mode === "wallet") {
//       await Promise.all([
//         booking.save(),
//         WalletModel.findOneAndUpdate(
//           { user: booking.user },
//           {
//             $inc: { balance: -1 * amount },
//           }
//         ),
//         WalletModel.findOneAndUpdate(
//           { user: booking.driver },
//           {
//             $inc: { balance: 0.9 * amount },
//           }
//         ),
//       ]);
//     } else {
//       await Promise.all([
//         booking.save(),
//         WalletModel.findOneAndUpdate(
//           { user: booking.driver },
//           {
//             $inc: { balance: -1 * 0.1 * amount },
//           }
//         ),
//       ]);
//     }
//   } catch (error) {
//     throw error;
//   }
// };


// exports.getEstimatedPricesForAllVehicleTypes = async (origin, destination) => {
//   try {
//     console.log("entered get estimated price");
//     console.log(origin, destination);
//     const [vehicleTypes, distance] = await Promise.all([
//       VehicleTypeModel.find({}).lean(),
//       getDistance(origin, destination),
//     ]);

//     // console.log(vehicleTypes)
//     const vehicleTypesWithPrice = vehicleTypes.map((vehicleType) => {
//       vehicleType.estimatedPrice = vehicleType.price_per_km * distance;
//       return camelcaseKeys(vehicleType)
//     })

//     return vehicleTypesWithPrice;

//   } catch (error) {
//     throw error;
//   }
// };


// const getDistance = async (origin, destination) => {
//   try {
//     return 50;

//     const distanceMatrixRequest = {
//       params: {
//         origins: [origin],
//         destinations: [destination],
//         key: process.env.GOOGLE_API_KEY,
//         units: "metric",
//       },
//     };
//     const distanceMatrixResponse = await googleMapsClient.distancematrix(distanceMatrixRequest);

//     console.log("distance: ", distanceMatrixResponse.data.rows[0].elements[0].distance.value);
//     return (distanceMatrixResponse.data.rows[0].elements[0].distance.value / 1000);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const updateBookingsAvailableForDriver = async (bookingId, coordinates) => {
//   try {
//     console.log("coordinates", coordinates);
//     const redis = getRedisConnection();
//     const driversInVicinity = await redis.geosearch(
//       Constants.Location.Redis.DriverSet,
//       "FROMLONLAT",
//       coordinates[0],
//       coordinates[1],
//       "BYRADIUS",
//       Constants.Bookings.SearchRadius,
//       Constants.Bookings.SearchRadiusUnit,
//       "COUNT",
//       8
//     );
//     console.log("driversinvicinity", driversInVicinity);
//     for await (const driver of driversInVicinity) {
//       await redis.sadd(`${driver}:bookings`, bookingId);
//       await redis.lpush(`${bookingId}:drivers`, driver);
//       setTimeout(() => {
//         removeBookingForDriver(driver, bookingId);
//       }, 180000);
//     }

//     setTimeout(() => {
//       redis
//         .del(`${bookingId}:drivers`)
//         .then(() => {
//           console.log(`booking ${bookingId} removed`);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }, 180000);
//   } catch (error) {
//     throw error;
//   }
// };

// const removeBookingForDriver = (driverId, bookingId) => {
//   const redis = getRedisConnection();
//   redis
//     .srem(`${driverId}:bookings`, bookingId)
//     .then(() => {
//       console.log(`booking ${bookingId} removed from driver ${driverId}`);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const removeBookingFromRedis = async (bookingId) => {
//   try {
//     const redis = getRedisConnection();
//     const drivers = await redis.lrange(`${bookingId}:drivers`, 0, -1);
//     await redis.del(`${bookingId}:drivers`);
//     console.log("deleted booking");
//     for await (const driver of drivers) {
//       await redis.srem(`${driver}:bookings`, bookingId);
//       console.log("deleted booking from drivers");
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteBookingIfNotAccepted = (bookingId) => {
//   return async () => {
//     console.log("remove if not accepted");
//     console.log(bookingId);
//     await BookingModel.findOneAndUpdate(
//       { _id: bookingId, status: "unconfirmed" },
//       {
//         status: "timeout_cancelled",
//       }
//     );
//   };
// };
