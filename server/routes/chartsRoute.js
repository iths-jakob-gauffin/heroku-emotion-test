const { getFive } = require('../handlers/getFive');

const { Router } = require('express');

const router = new Router();

///// Returnerar en lista med de fem hamstrar som har bäst "plus-minus-statistik". Detta returneras som en lista med fem hamsterobjekt, där "plus-minus-statistiken" är uträknad under propertyn "radio". Listan är i fallande ordning. Den mest vinnande hamstern är alltså längst upp.
///// Exempel på fetch: localhost:7000/charts/top
router.get('/top', async (req, res) => {
	try {
		const topFive = await getFive('top');
		res.status(200).send({ length: topFive.length, topFive: topFive });
	} catch (err) {
		console.error(err);
		res.status(500).send({ Error: err.toString });
	}
});

///// Samma som ovan men här får man de fem fem hamstrar som har sämst plus-minus-statistik. Listan är i fallande ordning, dvs den sista hamstern har förlorat mest.
///// Exempel på fetch: localhost:7000/charts/bottom
router.get('/bottom', async (req, res) => {
	try {
		const bottomFive = await getFive('bottom');
		res
			.status(200)
			.send({ length: bottomFive.length, bottomFive: bottomFive });
	} catch (err) {
		console.error(err);
		res.status(500).send({ Error: err.toString() });
	}
});

module.exports = router;
