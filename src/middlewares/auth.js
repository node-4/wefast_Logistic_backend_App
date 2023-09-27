const jwt = require('jsonwebtoken');
const tokenHelpers = require('../helpers/token.js');
const { DriverModel, AdminModel, UserModel } = require('../models/index.js');
const { AuthError } = require('../errors/index.js');

async function user(req, res, next) {
    try {
        console.log('user auth');
        const decodedToken = await getDecodedToken(req.get('Authorization'));
        console.log(decodedToken);
        if (decodedToken.scope !== 'login') {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        const user = await getUser(decodedToken.id);
        console.log(user);
        if (!user) {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        req.user = user;
        console.log(user);
        next();
    } catch (error) {
        handleAuthErrors(next, error);
    }
}

async function admin(req, res, next) {
    try {
        console.log('admin auth');
        const decodedToken = await getDecodedToken(req.get('Authorization'));
        if (decodedToken.scope !== 'login') {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        const user = await getAdmin(decodedToken.id);
        if (!user) {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        console.log(`user name ${user.name}`);
        req.user = user;
        next();
    } catch (error) {
        handleAuthErrors(next, error);
    }
}

async function driver(req, res, next) {
    try {
        console.log('driver auth');
        const decodedToken = await getDecodedToken(req.get('Authorization'));
        if (decodedToken.scope !== 'login') {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        const user = await getDriver(decodedToken.id);
        if (!user) {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        console.log(`user name ${user.name}`);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

async function userOrAdmin(req, res, next) {
    try {
        console.log('useroradmin');
        const decodedToken = await getDecodedToken(req.get('Authorization'));
        if (decodedToken.scope !== 'login') {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        const user = await getAdmin(decodedToken.id) || await getUser(decodedToken.id);
        if (!user) {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        console.log(`user name ${user.name}`);
        req.user = user;
        next();
    } catch (error) {
        handleAuthErrors(next, error);
    }
}

async function userOrdriver(req, res, next) {
    try {
        console.log('useroradmin');
        const decodedToken = await getDecodedToken(req.get('Authorization'));
        if (decodedToken.scope !== 'login') {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        const user = await getDriver(decodedToken.id) || await getUser(decodedToken.id);
        if (!user) {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        console.log(`user name ${user.name}`);
        req.user = user;
        next();
    } catch (error) {
        handleAuthErrors(next, error);
    }
}

const handleAuthErrors = (next, error) => {
    try {
        console.log(error);
        if (error instanceof AuthError || error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
            error.status = 401;
        }
        next(error);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getDecodedToken = async (authHeader) => {
    try {
        console.log('entered get decoded token utility....');
        if (!authHeader) {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }
        const authHeaderStringSplit = authHeader.split(' ');
        if (!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]) {
            return res.status(401).json({ status: 401, msg: 'invalid auth token provided', data: {} });
        }

        const token = authHeaderStringSplit[1];
        const decodedToken = tokenHelpers.getDecodedToken(token);
        return decodedToken;
    } catch (error) {
        throw error;
    }
}

const getDriver = async (driverId) => {
    try {
        const driver = await DriverModel.findById(driverId).lean();
        if (driver) {
            driver.role = 'driver';
        }
        return driver;
    } catch (error) {
        throw error;
    }
}

const getUser = async (userId) => {
    try {
        const user = await UserModel.findById(userId).lean();
        if (user) {
            user.role = 'user';
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const getAdmin = async (adminId) => {
    try {
        const admin = await AdminModel.findById(adminId).lean();
        if (admin) {
            admin.role = 'admin';
        }
        return admin;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    user,
    admin,
    driver,
    userOrAdmin,
    userOrdriver,
};
