const { Router } = require('express');

const router = new Router();

const { saveGame } = require('./../handlers/saveGame');
const { getAllGames } = require('./../handlers/getAllGames');

///// Returnerar en lista med alla matcher, sorterade efter game-id, så att den senaste matchen hamnar längst upp i listan.
///// Exempel på fetch: localhost:7000/games
router.get('/', async (req, res) => {
	let allGames = await getAllGames();
	res.status(200).send({ listOfAllGames: allGames });
});

///// Sparar en ny match i databasen och returnerar en lista med alla matcher. Senaste matchen (matchen man precis sparat) är längst upp i listan.
///// Exempel på post-fetch: localhost:7000/games
///// Exempel på req.body: { "contestantOne": "7",	"contestantTwo": "8",	"winner": "7"}
router.post('/', async (req, res) => {
	let allGamesArray = await saveGame(req.body);
	res.status(200).send({
		msg: 'Game saved. Latest game is the first in the list',
		allGames: allGamesArray
	});
});

module.exports = router;
