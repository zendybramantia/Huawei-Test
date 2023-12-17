from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.alert import Alert

import time

driver = webdriver.Chrome()

driver.get("http://localhost:3001")

# automation register
driver.find_element("id","name").send_keys("Autotest")
time.sleep(0.5)
driver.find_element("id","email").send_keys("autotest@example.com")
time.sleep(0.5)
driver.find_element("id","phone").send_keys("1234567890")
time.sleep(0.5)
driver.find_element("id","password").send_keys("autotest")
time.sleep(0.5)
driver.find_element("id","register-button").click()
time.sleep(0.5)
driver.implicitly_wait(5)

# Handle alert jika muncul
try:
    alert = Alert(driver)
    alert_text = alert.text

    # Verifikasi teks alert
    if "Register Success!" in alert_text:
        print("Register Success!")
        alert.accept()
    else:
        print(f"Unexpected alert: {alert_text}")
except:
    pass

driver.find_element("id","email").send_keys("autotest@example.com")
time.sleep(0.5)
driver.find_element("id","password").send_keys("autotest")
time.sleep(0.5)
button = driver.find_element("id","login-button").click()
time.sleep(0.5)
driver.implicitly_wait(5)

try:
    alert = Alert(driver)
    alert_text = alert.text

    if "Login Success!" in alert_text:
        print("Login Success!")
        alert.accept()
    else:
        print(f"Unexpected alert: {alert_text}")
except:
    pass

driver.find_element("id","emailInput").send_keys("autotest@example.com")
time.sleep(0.5)
button = driver.find_element("id","findUserButton").click()

time.sleep(3)
driver.quit()
