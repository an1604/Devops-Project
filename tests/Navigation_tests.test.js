const webdriver = require('selenium-webdriver');
const { Builder, By, until } = webdriver;
const { describe, it, before, after } = require('mocha');
const assert = require('assert');
const path = require('path');
const utilityFunc = require('./utilityFunc'); 

const MachineIP = 'localhost';
const url_prefix = `http://${MachineIP}:5173/`;

async function registerUser(driver, username, email, password) {
    console.log(`Email used: ${email}`);
    console.log(`Username used: ${username}`);
    console.log(`Password used: ${password}`);

    await driver.get(url_prefix + 'register');
    await driver.wait(until.elementLocated(By.id('username')), 5000);

    await driver.findElement(By.id('username')).sendKeys(username);
    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('password')).sendKeys(password);

    // Upload profile image process
    const uploadButton = await driver.findElement(By.className("btn position-absolute end-0 bottom-0"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", uploadButton);
    await uploadButton.click();

    const filePath = path.resolve(__dirname, 'juice.jpg');
    const fileInput = await driver.findElement(By.xpath("//input[@type='file']"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", fileInput);
    await fileInput.sendKeys(filePath);

    const imgElement = await driver.findElement(By.className('imgProfile'));
    await driver.wait(until.elementIsVisible(imgElement), 5000);

    const button = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", button);
    await driver.wait(until.elementIsEnabled(button), 5000);
    await driver.wait(until.elementIsVisible(button), 5000);
    await button.click();

    await driver.wait(until.urlIs(url_prefix + 'login'), 10000); 
}

async function loginUser(driver, email, password) {
    await driver.get(url_prefix + 'login');
    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.xpath('//*[@id="root"]/div/form/button')).click();
    await driver.wait(until.urlIs(url_prefix + 'home'), 10000); 
}

async function createPost(driver) {
    await driver.get(url_prefix + 'home');
    await driver.findElement(By.className('create-post-btn')).click();
    await driver.wait(until.urlIs(url_prefix + 'create-post'), 10000);

    let form = await driver.findElement(By.css('form'));
    let inputs = await form.findElements(By.css('input'));

    for (let input of inputs) {
        let type = await input.getAttribute('type');
        let placeholder = await input.getAttribute('placeholder');
        console.log(`Input type: ${type}, placeholder: ${placeholder}`);

        if (type === 'text') {
            await input.sendKeys('RIP bro!');
        } else if (type === 'file') {
            let filePath = path.resolve(__dirname, 'juice.jpg');
            await input.sendKeys(filePath);
        }
    }

    let submitButton = await form.findElement(By.css('button[type="submit"]'));
    await submitButton.click();
}

describe('End-to-End Tests for My Application', function() {
    this.timeout(60000);

    let driver;
    const username = utilityFunc.getFakeUserName().replace();
    const email = utilityFunc.getFakeEmail();
    const password = utilityFunc.getPassword(8);

    before(async () => {
        driver = new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        await driver.quit();
    });

    it('should register a new user', async function() {
        await registerUser(driver, username, email, password);
    });

    it('should log in with the new user', async function() {
        await loginUser(driver, email, password);
    });

    it('should create a new post', async function() {
        await createPost(driver);
    });
});
