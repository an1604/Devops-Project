const webdriver = require('selenium-webdriver');
const { Builder, By, until } = webdriver; // Ensure 'until' is imported
const { describe, it, before, after } = require('mocha');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');
const MachineIP = 'localhost' 

// Test 1- Get browser type and version
describe('Check the browser type and version', function() {
    this.timeout(3000);
    let driver;

    before(async () => {
        driver = new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        await driver.quit();
    });

    it('The actual test for the version itself.', async function() {
        const caps = await driver.getCapabilities();
        assert.equal("chrome", caps.getBrowserName());
        console.log(caps.getBrowserVersion());
    });
});

// Test 2 - Manage Cookies 
describe('Check out the cookies managment of the browser with the application', function(){
    this.timeout(3000);
    let driver;

    before(async ()=>{
        driver = new Builder().forBrowser('chrome').build();
    });

    after(async ()=>{
        await driver.quit();
    });

    it('should check the cookies managment', function(){
        driver.get(`http://${MachineIP}:5713`);
        //Checking the default cookies' capacity.
        driver.manage().getCookies().then(function(cookies){
            assert.equal(1,cookies.length);
        });
        
        // Adding another cookie, and then checks the capacity again.
        driver.manage().addCookie({name:"username",value:"Gal"});
        driver.manage().getCookies().then(function(cookies){
            assert.equal(2,cookies.length);
        });
    });
});