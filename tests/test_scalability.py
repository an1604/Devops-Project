import pytest
from selenium import webdriver
from test_e2e import register_user, login_user, create_post, create_comment
from utilFunc import get_fake_email, get_fake_username, get_password, get_headless_chrome_driver

MachineIP = 'localhost'
url_prefix = f'http://{MachineIP}:5173/'


def test_end_to_end_with_different_screen_size():
    passed = True
    # Initialization of all params.
    username = get_fake_username()
    email = get_fake_email()
    password = get_password(8)
    # driver = webdriver.Chrome()
    driver = get_headless_chrome_driver()

    # Set the window size to a mobile screen size
    driver.set_window_size(375, 667)

    # Perform the tests
    register_user(driver, username, email, password, passed)
    login_user(driver, email, password, passed)
    create_post(driver, passed)
    create_comment(driver, passed)

    driver.quit()
    assert passed == True
