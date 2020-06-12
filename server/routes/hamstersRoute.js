const { Router } = require('express');

const { db } = require('./../firebase');

const router = new Router();

// Handlers (tror jag det heter?), promises som anropas vid olika requests
const { getAllHamsters } = require('./../handlers/getAllHamsters');
const { getSpecificHamster } = require('./../handlers/getSpecificHamster');
const { checkIfIdIsValid } = require('./../handlers/checkIfIdIsValid');

////7 Returnerar en lista med alla hamstrar (hamsterobjekt) som finns i databasen.
///// Exempel på fetch: localhost:7000/hamsters
router.get('/', async (req, res) => {
	try {
		let hamstersArray = await getAllHamsters();
		res.status(200).send({
			numberOfHamsterObjects: hamstersArray.length,
			hamsterObjects: hamstersArray
		});
	} catch (err) {
		res.status(500).send({ Error: err.toString() });
	}
});

///// Slumpar fram ett hamsterobjekt.
///// Exempel på fetch: localhost:7000/hamsters/random
router.get('/random', async (req, res) => {
	try {
		let hamstersArray = await getAllHamsters();
		let randomNumber =
			Math.floor(Math.random() * hamstersArray.length) + 1;
		let randomHamster = await getSpecificHamster(randomNumber);
		res.status(200).send({ randomHamster });
	} catch (err) {
		console.error(err);
		res.status(500).send({ Error: err.toString() });
	}
});

///// Returnerar ett specifikt hamsterobjekt baserat på det id man har med som resurs.
///// Exempel på fetch: localhost:7000/hamsters/7
router.get('/:id', async (req, res) => {
	try {
		if (await checkIfIdIsValid(req.params.id)) {
			let specificHamster = await getSpecificHamster(req.params.id);
			res.status(200).send({ msg: specificHamster });
		}
	} catch (err) {
		console.error(err);
		res.status(err.status).send({ Error: err.msg });
	}
});

///// Uppdaterar ett hamsterobjekts propertys: wins, games, defeats.
///// Exempel på put-fetch: localhost:7000/hamsters/37/result
///// i req.bodyn står det t.ex.: {	"wins": 0, "games": 1, "defeats": 1}
router.put('/:id/result', async (req, res) => {
	try {
		if (await checkIfIdIsValid(req.params.id)) {
			let hamsterToUpdate = await db
				.collection('hamsters')
				.where('id', '==', req.params.id * 1)
				.get();

			hamsterToUpdate.forEach(async doc => {
				let { wins, games, defeats } = doc.data();
				let updateResultsObj = {
					wins: wins + req.body.wins,
					games: games + req.body.games,
					defeats: defeats + req.body.defeats
				};

				await db
					.collection('hamsters')
					.doc(doc.id)
					.update(updateResultsObj);

				let resultHamster = await getSpecificHamster(
					req.params.id
				);
				res.status(200).send({
					msg: 'Result updated',
					hamster: resultHamster
				});
			});
		}
	} catch (err) {
		console.error(err);
		res.status(err.status).send({ Error: err.msg });
	}
});

module.exports = router;
