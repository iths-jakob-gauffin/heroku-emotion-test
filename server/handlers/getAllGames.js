const { db } = require('./../firebase');

const { orderHamsterObject } = require('./orderHamsterObject');

///// Returnerar listan med alla matchobjekt.
const getAllGames = async () => {
	return new Promise(async (res, rej) => {
		try {
			let allGamesArray = [];
			let snapshot = await db.collection('games').get();
			snapshot.forEach(doc => {
				let orderedGameObject = orderHamsterObject(doc.data());
				allGamesArray = [ ...allGamesArray, orderedGameObject ];
			});
			// Sorterar arrayen desc, efter game-id:t så den senaste matchen hamnar längst upp i listan
			allGamesArray = allGamesArray.sort((a, b) => b.id - a.id);
			res(allGamesArray);
		} catch (err) {
			console.error(err);
			rej(err);
		}
	});
};

module.exports = { getAllGames };
