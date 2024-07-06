// This is the basic operations in the application, login and register tests (As units!).
const utilityFunc = require('./utilityFunc');
const MachineIP = 'localhost'
const webdriver = require('selenium-webdriver');
const {Builder, By, until} = webdriver;
const {describe, it, before, after} = require('mocha');
const assert = require('assert');
const path = require('path');

// User login test
describe('User can login', function () {
    this.timeout(30000); 
    let driver;

    before(async () => {
        driver = new Builder().forBrowser('chrome').build();

    });

    after(async () => {
        await driver.quit(); 
    });

    it('should login and verify the title', async function () {
        await driver.get(`http://${MachineIP}:5173/login`);

        await driver.findElement(By.id('email')).sendKeys('admin@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('aaaa1111');
        await driver.findElement(By.xpath('//*[@id="root"]/div/form/button')).click();

        await driver.wait(until.titleIs('Posty-Club'), 5000);

        let the_title = await driver.getTitle();
        console.log(the_title);
        assert.strictEqual(the_title, 'Posty-Club');
    });
});

describe('Register new user', function () {
    this.timeout(30000);
    let driver;

    before(async () => {
        driver = new Builder().forBrowser('chrome').build();
        await driver.manage().window().setRect({ width: 1280, height: 800 });
    });

    after(async () => {
        await driver.quit();
    });

    it('should register and get to the login page', async function () {
        await driver.get(`http://${MachineIP}:5173/register`);

        // Get the current URL
        let register_url = await driver.getCurrentUrl();
        assert.strictEqual(register_url, `http://${MachineIP}:5173/register`);

        let email = utilityFunc.getFakeEmail();
        let username = utilityFunc.getFakeUserName();
        let password = utilityFunc.getPassword(8);

        await driver.findElement(By.id('username')).sendKeys(username);
        await driver.findElement(By.id('email')).sendKeys(email);
        await driver.findElement(By.id('password')).sendKeys(password);

        // Upload profile image process
        const uploadButton = await driver.findElement(By.className("btn position-absolute end-0 bottom-0"));
        uploadButton.click();

        const filePath = path.resolve(__dirname, 'juice.jpg');
        const fileInput = await driver.findElement(By.xpath("//input[@type='file']"));
        console.log(`filePath: ${filePath}`);
        await fileInput.sendKeys(filePath);

        // Ensure the img's source is updated
        const imgElement = await driver.findElement(By.className('imgProfile'));
        await driver.wait(until.elementIsVisible(imgElement), 5000);

        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        const button = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));

        if (button) {
            console.log('Button found:', button);
            const tagName = await button.getTagName();
            console.log(`Tag name: ${tagName}`);
            const buttonText = await button.getText();
            console.log(`Button text: ${buttonText}`);
            const buttonClass = await button.getAttribute('class');
            console.log(`Button class: ${buttonClass}`);
            const isEnabled = await button.isEnabled();
            const isVisible = await button.isDisplayed();
            console.log(`Button is enabled: ${isEnabled}`);
            console.log(`Button is visible: ${isVisible}`);
        } else {
            console.log('Button not found');
        }

        await driver.executeScript("arguments[0].scrollIntoView(true);", button);
        await driver.wait(until.elementIsEnabled(button), 10000);
        await driver.wait(until.elementIsVisible(button), 10000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/form/button')), 5000);

        await button.click();

        this.timeout(10000);

        await driver.wait(until.urlIs(`http://${MachineIP}:5173/login`), 5000);
        let login_url = await driver.getCurrentUrl();
        assert.strictEqual(login_url, `http://${MachineIP}:5173/login`);
    });
});