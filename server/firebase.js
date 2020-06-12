var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://hamster-wars-iths.firebaseio.com',
	storageBucket: 'hamster-bilder/'
	// storageBucket: 'hamster-wars-iths.appspot.com/'
});

const db = admin.firestore();
const fbStorage = admin.storage();

module.exports = { db, fbStorage };
