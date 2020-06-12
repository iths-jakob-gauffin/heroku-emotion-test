const { db } = require('./firebase');

async function getDataIntoFirestore(data) {
	data.map(async hamsterObj => {
		await db.collection('hamsters').doc().set(hamsterObj);
	});
}

module.exports = { getDataIntoFirestore };
