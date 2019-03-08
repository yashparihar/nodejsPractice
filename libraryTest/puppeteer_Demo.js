
const puppeteer = require('puppeteer');


(async function () {
    try {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        await page.setContent("<div>goo world</div>");
        // await page.emulateMedia('screen');
        await page.emulateMedia('print');
        await page.pdf({
            path: 'mypdf.pdf',
            format: 'A4',
            margin: {
                top: 100,
                bottom: 40,
            },
            displayHeaderFooter: true,
            headerTemplate: `<span class="ttt" style='width: 200px; font-size: 15px; background-color: #4286f4; position: relative; position: absolute; top: 30; left: 30'> Title </span>`,
            footerTemplate: `<span class='ppp' style='width: 200px; font-size: 15px; background-color: #4286f4; position: relative; position: absolute; bottom: 10;'>footer </span>`
        });

        await page.waitFor(1000);
        await page.screenshot({
            path: 'digg.png',
            fullPage: false,
            clip: {
                x: -25,
                y: -25,
                width:600,
                height:600
            }
        });

        await browser.close();

    } catch (err) {
        console.log("err: ", err);
    }
})()


/*
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' });
    await page.pdf({
        path: 'hn.pdf',
         format: 'A4',
         margin:{
            top: 40,
            bottom: 40
         },
         displayHeaderFooter: true, 
        headerTemplate: `<span class="ttt" style='width: 200px; font-size: 15px; background-color: #4286f4; position: relative; position: absolute; top: 10;'> Title </span>`,
        footerTemplate: `<span class='ppp' style='width: 200px; font-size: 15px; background-color: #4286f4; position: relative; position: absolute; bottom: 10;'>footer </span>`
    });

    await browser.close();
})();
*/