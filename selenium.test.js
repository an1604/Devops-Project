const {Builder, By, until} = require('selenium-webdriver');

async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:5173');
        let element = await driver.findElement(By.name('q'));
        await element.sendKeys('webdriver');
        await element.submit();
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
}

async function checkUrl() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the URL
        await driver.get('http://localhost:5173');

        // Wait until the page title contains the expected text (adjust as necessary)
        await driver.wait(until.titleIs('Expected Page Title'), 10000);

        // Optionally, you can check for the presence of a specific element
        // await driver.wait(until.elementLocated(By.id('specific-element-id')), 10000);

        console.log('Page loaded successfully');
    } catch (err) {
        console.error('Error loading page:', err);
    } finally {
        await driver.quit();
    }
}

// example();
checkUrl();