const fs = require('fs');
const { fbStorage } = require('./../firebase');

const uploadFileToCloud = fileName => {
	return new Promise(async (res, rej) => {
		try {
			///// Ladda upp filen till firebase storage
			await fbStorage
				.bucket('hamster-bilder')
				.upload(`./tempPathBeforeCloud/${fileName}`, {
					gzip: true,
					metadata: {
						cacheControl: 'public, max-age=31536000'
					}
				});

			///// Radera filen ifrån tempPathBeforeCloud-mappen
			await fs.unlink(`./tempPathBeforeCloud/${fileName}`, err => {
				if (err) throw err;
				return;
			});
			res('Success');
		} catch (err) {
			console.error(err);
			rej(err);
		}
	});
};

module.exports = { uploadFileToCloud };
