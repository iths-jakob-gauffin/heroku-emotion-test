const { getAllGames } = require('./../handlers/getAllGames');

const { Router } = require('express');

const router = new Router();

////7 Returnerar hur många matcher som ägt rum.
///// Exempel på fetch: localhost:7000/stats/total
router.get('/total', async (req, res) => {
	try {
		let allGames = await getAllGames();
		res.status(200).send({
			totalGames: allGames.length,
			msg: `There has been ${allGames.length} games so far.`
		});
	} catch (err) {
		res.status(400).send('Something went wrong', err);
	}
});

module.exports = router;
