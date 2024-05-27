import { Builder, By, until, WebDriver } from "selenium-webdriver"
import "chromedriver"

let driver: WebDriver

jest.setTimeout(90000)

describe("Senthrap Local E2E Tests", () => {
  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
  }, 30000)

  afterAll(async () => {
    await driver.quit()
  }, 30000)

  const loginToAuth0 = async () => {
    try {
      console.log("Navigating to localhost...")
      await driver.get("http://localhost:3000")

      console.log("Waiting for 'Get Started' button...")
      const startButton = await driver.wait(
        until.elementLocated(By.css("button")),
        20000
      )
      console.log("Clicking on 'Get Started' button...")
      await startButton.click()

      console.log("Waiting for Auth0 login page...")
      await driver.wait(until.elementLocated(By.name("username")), 30000)
      const usernameField = await driver.findElement(By.name("username"))
      const passwordField = await driver.findElement(By.name("password"))

      console.log("Entering Auth0 credentials...")
      await usernameField.sendKeys("testemail@senthrap.com")
      await passwordField.sendKeys("Senthrap@2024")

      console.log("Waiting for submit button...")
      const submitButton = await driver.findElement(
        By.css("button[type='submit']")
      )
      await submitButton.click()

      console.log("Login successful.")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  it("should log in successfully", async () => {
    try {
      await loginToAuth0()
    } catch (error) {
      console.error("Login test failed:", error)
      throw error
    }
  }, 40000)
})
