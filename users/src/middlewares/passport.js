const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('../config');

const JwtSecretKey = config.JWT_SECRET;

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JwtSecretKey,
};

const jwtStrategy = () =>
	new JwtStrategy(opts, (payload, next) => {
		return next(null, payload);
	});

const passportAuthMiddleware = () => {
	return passport.authenticate(jwtStrategy(), {
		session: false,
	});
};

module.exports = passportAuthMiddleware;
