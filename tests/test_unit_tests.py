import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
from utilFunc import *


def test_user_can_login():
    driver = webdriver.Chrome()
    driver.get('http://localhost:5173/login')

    driver.find_element(By.ID, 'email').send_keys('admin@gmail.com')
    driver.find_element(By.NAME, 'password').send_keys('aaaa1111')
    driver.find_element(By.XPATH, '//*[@id="root"]/div/form/button').click()

    WebDriverWait(driver, 5).until(EC.title_is('Posty-Club'))

    the_title = driver.title
    print(the_title)
    assert the_title == 'Posty-Club'
    driver.quit()


def test_register_new_user():
    driver = webdriver.Chrome()
    driver.get('http://localhost:5173/register')
    register_url = driver.current_url
    assert register_url == 'http://localhost:5173/register'

    email = get_fake_email()
    username = get_fake_username()
    password = get_password(8)

    driver.find_element(By.ID, 'username').send_keys(username)
    driver.find_element(By.ID, 'email').send_keys(email)
    driver.find_element(By.ID, 'password').send_keys(password)

    # Scroll down the page before clicking the upload button
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait for the upload button to be clickable
    upload_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, ".btn.position-absolute.end-0.bottom-0"))
    )
    upload_button.click()

    file_path = os.path.abspath('juice.jpg')
    file_input = driver.find_element(By.XPATH, "//input[@type='file']")
    print(f'filePath: {file_path}')
    file_input.send_keys(file_path)

    img_element = driver.find_element(By.CLASS_NAME, 'imgProfile')
    WebDriverWait(driver, 5).until(EC.visibility_of(img_element))

    # Scroll to the bottom again before interacting with the button
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    button = driver.find_element(By.XPATH, '//*[@id="root"]/div/form/button')

    if button:
        is_enabled = button.is_enabled()
        is_visible = button.is_displayed()
        if is_enabled and is_visible:
            driver.execute_script("arguments[0].scrollIntoView(true);", button)
            WebDriverWait(driver, 10).until(EC.element_to_be_clickable(button))
            button.click()

            WebDriverWait(driver, 5).until(EC.url_to_be('http://localhost:5173/login'))
            login_url = driver.current_url
            assert login_url == 'http://localhost:5173/login'
        else:
            print('Button not visible or enabled')
    else:
        print('Button not found')

    driver.quit()
