// This file tests the DB healthy, its possibility to retrieve data from.  
import { MongoClient } from 'mongodb';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

const MachineIP = '127.0.0.1';

describe('Retirement Users From DB Test', function() {
    let client;
    let db;
    const dbName = 'test';
    const collectionName = 'users';

    // Increase the timeout for the before hook
    this.timeout(10000);

    // Connecting to the DB.
    before(async function() {
        client = new MongoClient(`mongodb://${MachineIP}:27017/${dbName}`);
        await client.connect();
        db = client.db();
    });

    // Close the connection after tests are done.
    after(async function() {
        await client.close();
    });

    it('should retrieve retirement data', async function() {
        // Get the target collection.
        const collection = db.collection(collectionName);
        const data = await collection.find().toArray();

        // Specific fields in the data.
        expect(data).to.be.an('array');
        expect(data).to.have.length.above(0);

        // Check foreach element in the collection, to see if it has all the information needed in its basic case.
        data.forEach(item => {
            expect(item).to.have.property('email');
            expect(item).to.have.property('username');
            expect(item).to.have.property('imgUrl');
            expect(item).to.have.property('password');
            expect(item).to.have.property('posts');
        });
    });
});