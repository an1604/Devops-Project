import pytest
from pymongo import MongoClient

MachineIP = '127.0.0.1'
dbName = 'test'
collectionName = 'users'


def test_retrieve_retirement_data():
    client = MongoClient(f'mongodb://{MachineIP}:27017/{dbName}')
    db = client[dbName]

    collection = db[collectionName]
    data = list(collection.find())

    assert isinstance(data, list)
    assert len(data) > 0

    for item in data:
        assert 'email' in item
        assert 'username' in item
        assert 'imgUrl' in item
        assert 'password' in item
        assert 'posts' in item

# TODO: ADD MORE DB CHECKS FOR MORE THAN USERS COLLECTION...
