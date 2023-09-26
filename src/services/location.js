const { getRedisConnection } = require('../../redis.js');
const Constants = require('../constants/index.js');

const updateLocation = async (driverId, coordinates) => {
    try {
        const redis = getRedisConnection();

        await redis.geoadd(Constants.Location.Redis.DriverSet, coordinates[0], coordinates[1], driverId);
        setTimeout(() => {
            redis.zrem(Constants.Location.Redis.DriverSet, driverId)
                .then(() => { console.log('deleted') })
                .catch((error) => { console.log(error) })
        }, 10000);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateLocation
};
