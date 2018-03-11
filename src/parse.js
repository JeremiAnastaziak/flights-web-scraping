const parseUrl = require('query-string').parse;
const airports = require('airport-codes');

function getCityName(cities) {
    return JSON.parse(cities).map(iata => airports.findWhere({iata}).get('name'));
}

function filterProps({
    dataPowrotuOd,
    dataWylotuOd,
    miastaPowrotuDo,
    miastaPowrotuZ,
    miastaWylotuDo,
    miastaWylotuZ
}, index) {
    return {
        startDate: dataWylotuOd,
        returnDate: dataPowrotuOd,
        startCityDestination: getCityName(miastaWylotuZ),
        startCityFrom: getCityName(miastaWylotuDo),
        returnCityFrom: getCityName(miastaPowrotuZ),
        returnCityDestination: getCityName(miastaPowrotuDo),
    };
}

module.exports = (links, prices) =>
    links.map(parseUrl)
        .map(filterProps)
        .map((flight, index) => ({...flight, price: prices[index]}))
