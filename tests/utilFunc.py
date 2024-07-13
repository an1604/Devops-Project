import os
from selenium.webdriver.chrome.options import Options
from faker import Faker
import random

fake = Faker()  # Creating a faker object to generate some fake information.


def get_fake_email():
    return fake.email()


def get_fake_username():
    return fake.user_name()


def get_random_character():
    chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ"
    return random.choice(chars)


def get_password(passwd_len):
    passwd = ''.join(get_random_character() for _ in range(passwd_len))
    return passwd


def create_post():
    return fake.text()


def create_comment():
    return fake.sentence()


def generate_test_user():
    return {
        'email': get_fake_email(),
        'username': get_fake_username(),
        'imgUrl': fake.image_url(),
        'password': get_password(10),
        'posts': [create_post() for _ in range(5)],
        # 'comments': [create_comment_or_post() for _ in range(5)],
    }


def generate_test_post(user_id):
    current_directory = os.getcwd()
    imgUrl = os.path.join(current_directory, 'juice.jpg')
    return {
        'userId': user_id,
        'title': fake.sentence(),
        'content': fake.text(),
        'imgUrl': imgUrl,
        'date': fake.date(),
        'numComments': random.randint(1, 10),
    }


def generate_test_comment(post_id, user_id, username):
    return {
        'postId': post_id,
        'content': fake.text(),
        'name': username,
        'date': fake.past_date(start_date="-30d", tzinfo=None)  # Ensuring the date is past the post date
    }


def get_headless_chrome_driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(options=options)
    return driver
