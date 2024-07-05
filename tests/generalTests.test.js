const webdriver = require('selenium-webdriver');
const {Builder, By, until} = webdriver;
const {describe, it, before, after} = require('mocha');
const assert = require('assert');

// User login test
describe('User can login', function () {
    this.timeout(30000); // Setting a timeout to avoid failure on tests before the driver closes
    let driver;

    before(async () => {
        driver = new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        await driver.quit(); // Ensure the driver quits after the test
    });

    it('should login and verify the title', async function () {
        await driver.get('http://localhost:5173/login');

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
    })
    after(async () => {
        await driver.quit();
    })

    it('should register and get to the login page', async function () {
        await driver.get('http://localhost:5173/register');
        let register_url = await driver.URL;
        assert.strictEqual(login_url, 'http://localhost:5173/register');

        await driver.findElement(By.id('username')).sendKeys('new user');
        await driver.findElement(By.id('email')).sendKeys('new_user@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('aaaa1111');
        await driver.findElement(By.xpath('//*[@id="root"]/div/form/button')).click()

        await driver.wait(until.urlIs('http://localhost:5173/login'), 5000);
        let login_url = await driver.URL;
        assert.strictEqual(login_url, 'http://localhost:5173/login');
    })
})