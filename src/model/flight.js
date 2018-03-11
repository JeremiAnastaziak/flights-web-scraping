const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    startDate: String,
    returnDate: String,
    startCityDestination: [String],
    startCityFrom: [String],
    returnCityFrom: [String],
    returnCityDestination: [String],
    price: Number
})

module.exports = mongoose.model('Flight', flightSchema);
