const config = {
	PORT: parseInt(process.env.PORT, 10) || 5000,

	JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
