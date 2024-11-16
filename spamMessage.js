const fs = require('fs');
const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const { parseEnv } = require('util');

(async () => {
  const results = [];

  // Wrap the CSV parsing in a Promise to handle async behavior
  const loadCSV = () => {
    return new Promise((resolve, reject) => {
      fs.createReadStream('commenters.csv') // Replace with your file name
        .pipe(csv())
        .on('data', (row) => {
          results.push(row); // Each row will be pushed as an object
        })
        .on('end', () => {
          console.log('CSV loaded:', results); // Log the array of objects
          resolve(results);
        })
        .on('error', reject); // Handle errors
    });
  };

  try {
    // Wait for CSV to load
    await loadCSV();

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the first URL from the CSV
    if (results.length > 0) {
      await page.goto(results[0].URL);
      console.log(`Navigated to: ${results[0].URL}`);
      await page.waitForSelector('a')
      const links = await page.$$('a');
      for(const link of links ){
        const targetLink = await page.evaluate(el=>el.textContent === 'Log in',link)
        if(targetLink){
          console.log('Found link');
          await link.click();
          await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay

          await page.waitForSelector('input[name="username"]')
          const input1 = await page.$('input[name="username"]')
          const input2 = await page.$('input[name="password"]')
          if(input1 && input2) {
            await input1.type('esendufranklinebi@gmail.com')
            await input2.type('franky@1')
            const button = await page.$('button[type="submit"]')
            if(button){
              await button.click();
              console.log('Logged in');
              
              await new Promise(resolve=>setTimeout(resolve,5000))

              await page.waitForSelector('.x78zum5.xdt5ytf.x1e56ztr')

              const notNowButton = await page.$('.x78zum5.xdt5ytf.x1e56ztr div[role="button"]')
              if(notNowButton){
                await notNowButton.click();
                console.log('Not now clicked');
                await page.goto(results[0].URL);
                await new Promise(resolve=>setTimeout(resolve,3000))
                await page.waitForSelector('.x6s0dn4.x78zum5.xdt5ytf.xl56j7k')
                const options = await page.$('.x6s0dn4.x78zum5.xdt5ytf.xl56j7k svg[aria-label="Options"]')
                if(options){
                  await options.click()
                  await new Promise(resolve=>setTimeout(resolve,3000))
                  const buttons = await page.$$('button')
                  for (const button of buttons){
                    console.log(buttons.length)
                    const targetButton = await page.evaluate(el=>el.textContent === 'Send message',button)
                    if(targetButton){
                      await button.click();
                      await new Promise(resolve=>setTimeout(resolve,3000))
                      await page.waitForSelector('._a9--._ap36._a9_1')
                      const newNotNow = await page.$('._a9--._ap36._a9_1')
                      if(newNotNow){
                        await newNotNow.click();
                        console.log('New not now clicked');
                        await new Promise(resolve=>setTimeout(resolve,3000))
                        await page.waitForSelector('div[aria-describedby="Message"]')
                        const messageInput = await page.$('div[aria-describedby="Message"]')
                        if(messageInput){
                          await messageInput.type("Ciao mio adorabile fan")
                          const sendButtons = await page.$$('div[role="button"]')
                          for (const sendButton of sendButtons){
                            const targetButton = await page.evaluate(el=>el.textContent === 'Send',sendButton)
                            if(targetButton){
                              await targetButton.click()
                              console.log('message sent')
                            }
                          }

                        }
                        break;
                      }
                      break;
                    }
                    else{
                      console.log('No send message button')
                    }
                    

                  }
                }

              }
              else{
                console.log('no not now button')
              }
            }
          }

          break;
        }
      }
    } else {
      console.error('No URLs found in the CSV file!');
    }

    // Add any further Puppeteer actions here...

    // Close the browser
    // await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
