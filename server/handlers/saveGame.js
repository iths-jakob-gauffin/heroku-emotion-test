const { db } = require('./../firebase');

const { getSpecificHamster } = require('./getSpecificHamster');
const { getAllGames } = require('./getAllGames');

const moment = require('moment');

// Den här funktionen kollar efter det högsta id-numret bland matchobjekten. Sen returneras ett unikt id genom att ta det högsta id-numret +1.
const getNewIdNum = () => {
	return new Promise(async (res, rej) => {
		let highestNumber = 0;
		let snapshot = await db.collection('games').get();
		snapshot.forEach(doc => {
			if (doc.data().id > highestNumber) {
				highestNumber = doc.data().id;
			}
		});
		res(highestNumber + 1);
	});
};

///// Sparar en ny match i dbn. Jag har valt att uppdatera wins/defeats/games med "localhost:7000/hamsters/:id/result". Men denna request görs från frontenden.

const saveGame = async reqBody => {
	return new Promise(async (res, rej) => {
		try {
			const { contestantOne, contestantTwo, winner } = reqBody;
			getSpecificHamster(
				contestantOne,
				contestantTwo,
				winner
			).then(async specificHamsters => {
				let [
					hamsterOne,
					hamsterTwo,
					winningHamster
				] = specificHamsters;

				// Tar fram ett nytt id för matchen.
				let idNum = await getNewIdNum();

				// Matchobjekt skapas
				let gameObj = {
					id: idNum,
					timeStamp: moment(new Date()).format('llll'),
					contestants: [
						{
							contestantOne: hamsterOne,
							constestantTwo: hamsterTwo
						}
					],
					winner: winningHamster
				};

				// Matchobjektet läggs till i dbn.
				await db.collection('games').doc().set(gameObj);
				let allGames = await getAllGames();
				res(allGames);
			});
		} catch (err) {
			rej(err);
		}
	});
};

module.exports = { saveGame };
