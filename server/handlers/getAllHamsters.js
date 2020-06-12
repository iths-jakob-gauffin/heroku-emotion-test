const { db } = require('../firebase');

const { orderHamsterObject } = require('./orderHamsterObject');

///// Returnerar en lista med med alla hamsterobjekt i dbn. Innan den returneras, sorteras varje hamsterobjekt, utefter dess propertys alfabetiska ordning, efter att ha passerat funktiopen "orderHamsterObject".
const getAllHamsters = async () => {
	return new Promise(async (res, rej) => {
		try {
			let hamstersArray = [];
			let snapshot = await db
				.collection('hamsters')
				.orderBy('id')
				.get();
			snapshot.forEach(doc => {
				let orderedHamsterObject = orderHamsterObject(doc.data());
				hamstersArray = [ ...hamstersArray, orderedHamsterObject ];
			});
			res(hamstersArray);
		} catch (err) {
			rej(err);
		}
	});
};
exports.getAllHamsters = getAllHamsters;
