const { getAllHamsters } = require('./getAllHamsters');

///// Validerar om req.params.id är giltigt.
const checkIfIdIsValid = id => {
	return new Promise(async (res, rej) => {
		let hamstersArray = await getAllHamsters();
		if (id * 1 > 0 && id * 1 < hamstersArray.length + 1) {
			res(true);
		} else {
			rej({
				status: 400,
				msg: `Wrong id. Id must be between 1 and ${hamstersArray.length}`
			});
		}
	});
};

module.exports = { checkIfIdIsValid };
