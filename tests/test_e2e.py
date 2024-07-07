import time

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
from utilFunc import get_fake_email, get_fake_username, get_password

MachineIP = 'localhost'
url_prefix = f'http://{MachineIP}:5173/'


def register_user(driver, username, email, password):
    print(f"Email used: {email}")
    print(f"Username used: {username}")
    print(f"Password used: {password}")

    driver.get(url_prefix + 'register')
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, 'username')))

    driver.find_element(By.ID, 'username').send_keys(username)
    driver.find_element(By.ID, 'email').send_keys(email)
    driver.find_element(By.ID, 'password').send_keys(password)

    # Upload profile image process
    upload_button = driver.find_element(By.CLASS_NAME, "btn.position-absolute.end-0.bottom-0")
    driver.execute_script("arguments[0].scrollIntoView(true);", upload_button)
    upload_button.click()

    file_path = os.path.abspath('juice.jpg')
    file_input = driver.find_element(By.XPATH, "//input[@type='file']")
    driver.execute_script("arguments[0].scrollIntoView(true);", file_input)
    file_input.send_keys(file_path)

    img_element = driver.find_element(By.CLASS_NAME, 'imgProfile')
    WebDriverWait(driver, 5).until(EC.visibility_of(img_element))

    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    button = driver.find_element(By.XPATH, '//*[@id="root"]/div/form/button')

    if button:
        is_enabled = button.is_enabled()
        is_visible = button.is_displayed()
        if is_enabled and is_visible:
            driver.execute_script("arguments[0].scrollIntoView(true);", button)
            WebDriverWait(driver, 10).until(EC.element_to_be_clickable(button))
            button.click()
        else:
            print('Button not found')
    else:
        print('Button not found')


def login_user(driver, email, password):
    driver.get(url_prefix + 'login')
    driver.find_element(By.ID, 'email').send_keys(email)
    driver.find_element(By.ID, 'password').send_keys(password)
    driver.find_element(By.XPATH, '//*[@id="root"]/div/form/button').click()
    WebDriverWait(driver, 10).until(EC.url_to_be(url_prefix + 'home'))


def create_post(driver):
    driver.get(url_prefix + 'home')
    driver.find_element(By.CLASS_NAME, 'create-post-btn').click()
    WebDriverWait(driver, 10).until(EC.url_to_be(url_prefix + 'create-post'))

    form = driver.find_element(By.CSS_SELECTOR, 'form')
    inputs = form.find_elements(By.CSS_SELECTOR, 'input')

    for input in inputs:
        type = input.get_attribute('type')
        placeholder = input.get_attribute('placeholder')
        print(f'Input type: {type}, placeholder: {placeholder}')

        if type == 'text':
            input.send_keys('RIP bro!')
        elif type == 'file':
            file_path = os.path.abspath('juice.jpg')
            input.send_keys(file_path)

    submit_button = form.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
    submit_button.click()


def create_comment(driver):
    driver.get(url_prefix + 'home')

    post = driver.find_element(By.CLASS_NAME, 'postcomp')

    if post:
        add_comment = driver.find_element(By.CLASS_NAME, 'add-comment')

        if add_comment:
            driver.find_element(By.XPATH, '//*[@id="root"]/div/ul/div/div[4]/input').send_keys('Test Comment!')
            add_comment.find_element(By.TAG_NAME, 'button').click()
            result_url = url_prefix + 'comments'
            time.sleep(2)
            current_url = driver.current_url
            assert result_url in current_url
        else:
            print('Add comment section not found')
    else:
        print('No posts found')


def test_end_to_end():
    # Initialization of all params.
    username = get_fake_username()
    email = get_fake_email()
    password = get_password(8)
    driver = webdriver.Chrome()

    # Tests performance.
    register_user(driver, username, email, password)
    login_user(driver, email, password)
    create_post(driver)
    create_comment(driver)

    driver.quit()
