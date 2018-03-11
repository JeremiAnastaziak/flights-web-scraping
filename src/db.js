const mongoose = require('mongoose');
const Flight = require('./model/flight');

function upsertFlight(flightObj) {

	const DB_URL = 'mongodb://localhost/flights';

  	if (mongoose.connection.readyState == 0) { mongoose.connect(DB_URL); }

    // if this email exists, update the entry, don't insert
	let conditions = { returnCityFrom: flightObj.returnCityFrom };
	let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    Flight.findOneAndUpdate(conditions, flightObj, options, (err, result) => {
  		if (err) throw err;
  	});
}

module.exports = upsertFlight;
