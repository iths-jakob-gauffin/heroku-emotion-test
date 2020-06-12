///// Sorterar hamsterobjektet utefter dess propertys i alfabetsordning.
const orderHamsterObject = hamsterObject => {
	const specificHamster = {};
	Object.keys(hamsterObject).sort().forEach(function(key) {
		specificHamster[key] = hamsterObject[key];
	});
	return specificHamster;
};
exports.orderHamsterObject = orderHamsterObject;
