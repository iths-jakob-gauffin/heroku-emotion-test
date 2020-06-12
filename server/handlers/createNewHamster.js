const { db } = require('./../firebase');

///// Skapar ett nytt hamsterobjekt och lägger in det i dbn. Senare kommer klienten skicka med värden till dessa propertys. Än så länge är det bara id:t och imgName som fylls i och är unika för varje hamsterobjekt som skapas.
const createNewHamster = (id, fileNameWithExtension) => {
	return new Promise(async (res, rej) => {
		try {
			let newHamster = {
				id: id,
				name: 'NAMN',
				age: 0,
				favFood: 'FAVORITMAT',
				loves: 'ÄLSKAR ATT',
				imgName: fileNameWithExtension,
				wins: 0,
				defeats: 0,
				games: 0
			};
			await db.collection('hamsters').doc().set(newHamster);
			res('Success');
		} catch (err) {
			console.error(err);
			rej(err);
		}
	});
};

module.exports = { createNewHamster };
