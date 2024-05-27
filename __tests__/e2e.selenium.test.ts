import { Builder, By, until, WebDriver } from "selenium-webdriver"
import "chromedriver"

let driver: WebDriver

jest.setTimeout(200000)

describe("Senthrap Local E2E Tests", () => {
  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
  }, 30000)

  afterAll(async () => {
    // await driver.quit()
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

  it("should log in successfully and submit a message in AI Chat", async () => {
    try {
      await loginToAuth0()

      console.log("Navigating to AI Chat screen...")
      await driver.get("http://localhost:3000/screens/AIChat/Chat")

      console.log("Entering message into chat textarea...")
      const chatTextarea = await driver.wait(
        until.elementLocated(
          By.css("textarea[placeholder='How are you feeling?']")
        ),
        20000
      )
      await chatTextarea.sendKeys("Hello, this is a test message.")

      console.log("Submitting the message...")
      const submitButton = await driver.findElement(
        By.css("button[type='submit']")
      )
      await submitButton.click()

      console.log("Waiting for the message to appear in the chat...")
      await driver.wait(
        until.elementLocated(
          By.xpath("//*[contains(text(), 'Hello, this is a test message.')]")
        ),
        20000
      )

      const submittedMessage = await driver.findElement(
        By.xpath("//*[contains(text(), 'Hello, this is a test message.')]")
      )
      const submittedMessageText = await submittedMessage.getText()
      expect(submittedMessageText).toContain("Hello, this is a test message.")
      console.log("AI Chat test passed.")
    } catch (error) {
      console.error("AI Chat test failed:", error)
      throw error
    }
  }, 40000)
})
