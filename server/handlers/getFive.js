const { getAllHamsters } = require('./getAllHamsters');

//// Räknar ut plus-minus-statistiken och skriver in den som en ny property: "ratio", på en tillfällig lista av alla hamstrar. Ratio-propertyn skrivs inte in i dbn. Den här tillfälliga listan sorteras efter ratiovärdet och returneras.
const getRatio = async listOfHamsters => {
	return new Promise(async (res, rej) => {
		try {
			let hamstersWithRatio = await listOfHamsters.map(hamster => {
				hamster.ratio = hamster.wins - hamster.defeats;
				return hamster;
			});
			hamstersWithRatio.sort((a, b) => b.ratio - a.ratio);
			res(hamstersWithRatio);
		} catch (err) {
			console.error(err);
			rej(err);
		}
	});
};

///// Returnerar en lista med de fem mest vinnande eller förlorande hamstrarna, beroende på vilken req.url det är i parametern "chartTopOrBottom".
const getFive = async chartTopOrBottom => {
	return new Promise(async (res, rej) => {
		try {
			let allHamstersArray = await getAllHamsters();
			let hamstersWithRatio = await getRatio(allHamstersArray);
			let five = null;
			if (chartTopOrBottom === 'top') {
				five = hamstersWithRatio.slice(0, 5);
			} else {
				five = hamstersWithRatio.slice(-5);
			}
			res(five);
		} catch (err) {
			console.error(err);
			rej(err);
		}
	});
};
exports.getFive = getFive;
