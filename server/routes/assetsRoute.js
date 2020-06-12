const { Router } = require('express');

const { checkIfIdIsValid } = require('./../handlers/checkIfIdIsValid');

const { fbStorage } = require('./../firebase');

const router = new Router();

//// Servar hamsterbilden ifrån firebase storage.
//// Exempel på fetch: localhost:7000/assets/1
router.get('/:id', async (req, res) => {
	try {
		if (await checkIfIdIsValid(req.params.id)) {
			fbStorage
				.bucket('hamster-bilder')
				.file(`hamster-${req.params.id * 1}.jpg`)
				.createReadStream()
				.on('error', err => {
					if (err) {
						console.error(err.message);
						res.status(400).send({
							msg:
								'Something went wrong trying to get the requested image',
							error: err.message.toString()
						});
					}
				})
				.on('response', streamResponse => {
					res.setHeader(
						'Content-Type',
						streamResponse.headers['content-type']
					);
				})
				.on('end', () => {
					res.end();
				})
				.pipe(res);
		}
	} catch (err) {
		console.error(err);
		res.status(err.status).send({ Error: err.msg });
	}
});

module.exports = router;
