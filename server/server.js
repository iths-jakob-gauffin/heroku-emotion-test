const express = require('express');

const fileUpload = require('express-fileupload');

const helmet = require('helmet');

const app = express();

var cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

///// Få in hamsterdatan (data.json) i firestore, anropar därför denna funktion endast en gång. Jag skickar med den trots funktionen inte anropas.
const data = require('./data.json');
const { getDataIntoFirestore } = require('./uploadDataToFirestore');
///// Initera databasen
// getDataIntoFirestore(data);

///// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(helmet());
// app.use(express.static('public'));
app.use(express.static(__dirname + '/../build'));
app.use(cors());

///// Kontrollera om API-nyckeln stämmer med KEY i .dotenv-dokumentet.
// app.use((req, res, next) => {
// 	if (req.headers['authorization'] === process.env.key) {
// 		next();
// 	} else {
// 		res.status(401).send({
// 			Error: `API-nyckeln saknas/stämmer inte. Nyckeln finns i .env-dokumentet under propertyn 'KEY'.`
// 		});
// 	}
// });

// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');

// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	);

// 	next();
// });

//Routes
const hamstersRoutes = require('./routes/hamstersRoute');
const chartsRoutes = require('./routes/chartsRoute');
const gamesRoutes = require('./routes/gamesRoute');
const statsRoutes = require('./routes/statsRoute');
const filesRoutes = require('./routes/filesRoute');
const assetsRoutes = require('./routes/assetsRoute');

///// Denna är när jag vill serva bilderna direkt ifrån mappen på resursen /assets. Men eftersom jag använder firebase storage så har jag avmarkerat denna kodrad
// app.use('/assets', express.static('hamsters'));
app.use('/api/assets', assetsRoutes);
app.use('/api/hamsters', hamstersRoutes);
app.use('/api/charts', chartsRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/files', filesRoutes);

///// Om en felaktig resurs anges i req.url ges ett felmeddelande och en 404. Detta kodstycke har jag copypejstat in från stackoverflow.
app.all('*', function(req, res) {
	throw new Error('Bad request');
});

app.use(function(e, req, res, next) {
	if (e.message === 'Bad request') {
		res
			.status(404)
			.json({ error: { msg: e.message, stack: e.stack } });
	}
});
///////////////////////
const serverPort = process.env.PORT || 1234;

app.listen(serverPort, () => {
	console.log(`Server is running on port ${serverPort}`);
});
