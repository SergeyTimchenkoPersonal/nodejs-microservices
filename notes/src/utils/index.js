const wrap = (fn) => {
	return (...args) => fn(...args).catch(args[2]);
};

module.exports = {
	wrap,
};
