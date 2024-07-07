import pytest
from selenium import webdriver
from test_e2e import register_user, login_user, create_post, create_comment
from utilFunc import get_fake_email, get_fake_username, get_password

MachineIP = 'localhost'
url_prefix = f'http://{MachineIP}:5173/'

def test_end_to_end_with_different_screen_size():
    # Initialization of all params.
    username = get_fake_username()
    email = get_fake_email()
    password = get_password(8)
    driver = webdriver.Chrome()

    # Set the window size to a different screen size
    driver.set_window_size(1024, 768)  # Example of different screen size

    # Perform the tests
    register_user(driver, username, email, password)
    login_user(driver, email, password)
    create_post(driver)
    create_comment(driver)

    driver.quit()
