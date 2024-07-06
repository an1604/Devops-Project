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
