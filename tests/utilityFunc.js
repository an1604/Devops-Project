// Some helper functions that help with the tests. (utility functions)

function getRandomBoolean() {
    return Math.random() >= 0.5;
}

// A number within a range
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Get a random character
function getRandomCharacter() {
    const chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Get a random string at fixed length
function getRandomString(strLength) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < strLength; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getPassword(passwd_len) {
    let passwd = '';
    for (let i = 0; i < passwd_len; i++) {
        const new_char = getRandomCharacter();
        passwd += new_char;
    }
    return passwd;
}

// Get a random string in a collection
function getRandomStringIn(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Generate random person names, emails, addresses with Faker
const { faker } = require('@faker-js/faker');

function getFakeEmail() {
    return faker.internet.email();
}

function getFakeName() {
    return `${faker.person.firstName()} ${faker.person.lastName()}`;
}

function getFakeUserName() {
    return getFakeName().replace(/ /g, '_');
}

module.exports = {
    getRandomBoolean,
    getRandomInteger,
    getRandomCharacter,
    getRandomString,
    getPassword,
    getRandomStringIn,
    getFakeEmail,
    getFakeName,
    getFakeUserName
};
