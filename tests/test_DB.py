import pytest
from pymongo import MongoClient
from utilFunc import generate_test_user, generate_test_post

MachineIP = '127.0.0.1'
dbName = 'test'


def test_retrieve_data_from_users():
    collectionName = 'users'
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


def test_retrieve_data_from_posts():
    usersCollectionName = 'users'
    postsCollectionName = 'posts'
    client = MongoClient(f'mongodb://{MachineIP}:27017/{dbName}')
    db = client[dbName]

    # Generate and insert a test user
    test_user = generate_test_user()
    print(f"Test user: {test_user}")

    users_collection = db[usersCollectionName]
    user_insert_result = users_collection.insert_one(test_user)
    user_id = user_insert_result.inserted_id

    # Generate and insert a test post for the user
    test_post = generate_test_post(user_id)
    print(f"Test post: {test_post}")

    posts_collection = db[postsCollectionName]
    posts_collection.insert_one(test_post)

    # Retrieve data from the posts' collection
    data = list(posts_collection.find({'userId': user_id}))

    assert isinstance(data, list)
    assert len(data) > 0

    for item in data:
        assert 'userId' in item
        assert 'title' in item
        assert 'content' in item
        assert 'imgUrl' in item
        assert 'date' in item
        assert 'numComments' in item

    # Cleanup the test data
    posts_collection.delete_one({'_id': test_post['_id']})
    users_collection.delete_one({'_id': user_id})


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
