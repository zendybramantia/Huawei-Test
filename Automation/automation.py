from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()

driver.get("http://localhost:3001")

# automation register
name_input = driver.find_element("id","name")
name_input.send_keys("John Doe")

email_input = driver.find_element("id","email")
email_input.send_keys("john.doe@example.com")

phone_input = driver.find_element("id","phone")
phone_input.send_keys("1234567890")

password_input = driver.find_element("id","password")
password_input.send_keys("securepassword")

button = driver.find_element("id","register-button")
button.click()

time.sleep(3)
driver.quit()
