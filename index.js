const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config()
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: './tmp',
        defaultViewport: false
    });

    const page = await browser.newPage();
    await page.goto(process.env.PROFILE_LINK, { waitUntil: 'load' });

    // Wait for the first link to click
    await page.waitForSelector("section main div div:nth-child(3) div div:nth-child(1) div:nth-child(1) a");
    const aTag = await page.$("section main div div:nth-child(3) div div:nth-child(1) div:nth-child(1) a");
    
    if (aTag) {
        await aTag.click();
    } else {
        console.log('Image link not found');
        await browser.close();
        return; // Exit if the link is not found
    }

    // Wait for the people section to load
    await page.waitForSelector("div._a9zr h3 div span > div > a");
    const people = await page.$$("div._a9zr h3 div span > div > a");

    // Array to hold the scraped data
    const data = [];

    // Extract names and URLs
    for (const person of people) {
        const name = await page.evaluate(el => el.innerText, person);
        const url = await page.evaluate(el => el.href, person); // Get the href for the URL
        
        data.push({ name, url }); // Push the object into the data array
    }
    await seeMore()

    //click see more function 
    async function seeMore(){
        await page.waitForSelector('div li div button');
        const button = await page.$('div li div button')
        await button.click().then(()=>{

            console.log('see more clicked')

        })

    }

    // Write to a CSV file
    const csvHeader = "Name,URL\n"; // CSV header
    const csvRows = data.map(row => `"${row.name}","${row.url}"`).join("\n"); // Create CSV rows
    fs.writeFileSync('commenters.csv', csvHeader + csvRows, 'utf8'); // Write to CSV

    console.log('Data saved to people.csv');

    // Optionally, close the browser
    await browser.close()
})();
