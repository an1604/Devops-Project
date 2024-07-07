import pytest
from pymongo import MongoClient
from utilFunc import generate_test_user

MachineIP = '127.0.0.1'
dbName = 'test'
collectionName = 'users'


def test_retrieve_data_from_users():
    client = MongoClient(f'mongodb://{MachineIP}:27017/{dbName}')
    db = client[dbName]
    test_user = generate_test_user()
    print(f"Test user: {test_user}")

    collection = db[collectionName]
    collection.insert_one(test_user)
    data = list(collection.find())

    assert isinstance(data, list)
    assert len(data) > 0

    for item in data:
        assert 'email' in item
        assert 'username' in item
        assert 'imgUrl' in item
        assert 'password' in item
        assert 'posts' in item


"""
steps foreach collection [Users, Comments, Posts]: 
1) Create random data.
2) Check if data exists.

Future work: 
1) test_retrieve_data_from_posts.
2) Create tests for the application's size (If the application can be used in a mobile screen size).

Optional: 
1) test_retrieve_data_from_comments.
2) Inspect the application and find some cool stuff to test it.
"""
