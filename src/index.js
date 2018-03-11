const puppeteer = require('puppeteer');

const selectors = require('./selectors');
const massageData = require('./parse');
const upsertFlight = require('./db');

async function run() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://biletyczarterowe.r.pl/');

    const links = await page.$$eval(selectors.link, links =>
        links.map(link => link.href)
    );

    const prices = await page.$$eval(selectors.price, prices =>
        prices.map(price => Number(price.innerHTML))
    );

    const flights = massageData(links, prices);
    flights.forEach(flight => upsertFlight(flight))

    browser.close();
}

run();
