const { orderHamsterObject } = require('./orderHamsterObject');

const { db } = require('../firebase');

///// Tar fram ett eller flera specifika hamsterobjekt, beroende på hur många argument man anropar getSpecificHamster med, tack vare spreadoperatorn.
const getSpecificHamster = async (...ids) => {
	return new Promise(async (res, rej) => {
		try {
			let arr = [];
			for (let id of ids) {
				let snapshot = await db
					.collection('hamsters')
					.where('id', '==', id * 1)
					.get();

				await snapshot.forEach(async doc => {
					let unOrderedSpecificHamster = doc.data();
					let specificHamster = await orderHamsterObject(
						unOrderedSpecificHamster
					);
					arr = [ ...arr, specificHamster ];
				});
			}
			res(arr);
		} catch (err) {
			rej(err);
		}
	});
};

exports.getSpecificHamster = getSpecificHamster;
