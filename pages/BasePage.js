const { Builder, By, Key, until, Capabilities } = require('selenium-webdriver');
const fs = require("fs");
class Element {
  basePage;
  component;
  element;
  constructor(basePage) {
    if (basePage) {
      this.basePage = basePage;
    }
  }

  async findByCSS(cssLocator) {
    try {
      const element = await this.basePage.driver.findElement(By.css(cssLocator));
      this.element = element;
    } catch (error) {
      console.log();
    }

    return this;
  }
  async findById(elementId) {
    try {
      const element = await this.basePage.driver.findElement(By.id(elementId));
      this.element = element;
    } catch (error) {
      console.log();
    }

    return this;
  }

  async isRequired() {
    const isRequiredElement = await this.getAttribute("required");
    return isRequiredElement === "true";
  }
  async getAttribute(attr) {
    const attribute = await this.element.getAttribute(attr);
    return attribute;
  }
  async type(textValue) {
    await this.basePage.screenshot();
    if (textValue.length === 0) {
      await this.element.clear();

    } else {
      this.element.sendKeys(textValue);
      await this.basePage.screenshot();
    }

    return this;
  }

  async click() {
    this.element.click();
    await this.basePage.timeout(1)
    await this.basePage.screenshot();
    return this;
  }
  async getText() {
    const text = await this.element.getText();
    return text;
  }

  async clear() {
    await this.element.clear();
    await this.basePage.screenshot();

  }
}
class BasePage {
  browser = "chrome";
  driver;
  website;
  options = {}
  constructor(website, browser, driver) {
    if (website) {
      this.website = website;
    }
    if (browser) {
      this.browser = browser;
    }
    if (driver) {
      this.driver = driver;

    }
  }

  async refresh() {
    await this.driver.navigate().refresh();
    await this.screenshot();
  }
  async buildSession() {


    const chromeCapabilities = Capabilities.chrome();
    const chromeOptions = {
        'args': [ '--disable-notifications']}

        chromeCapabilities.set('chromeOptions', chromeOptions);
    this.driver = await new Builder().forBrowser(this.browser).withCapabilities(chromeCapabilities).build();
  }
  async goTo(pageURL) {

    const urlPath = this.website && !pageURL.includes(this.website)? `${this.website}${pageURL}` : pageURL
    await this.driver.get(urlPath);
    await this.screenshot();
  }

  async screenshot() {
    try {
      if (process.env.SCREENSHOT && process.env.SCREENSHOT_PATH) {
        const image = await this.driver.takeScreenshot();
        const filename = `${process.env.SCREENSHOT_PATH}/${(new Date()).toISOString()}.png`;
        fs.writeFileSync(filename, image, "base64");
      }

    } catch (e) {
      console.log("unable to take screenshot");
    }
  }

  async dismissAlert() {
    try {
    

      // await this.driver.wait(until.alertIsPresent());
      const alert = await this.driver.switchTo().alert();
      await alert.dismiss();
    
    } catch (e) {
      console.log()
    }

  }

  async acceptAlert() {
    try {
    
        // await this.driver.wait(until.alertIsPresent());
        const alert = await this.driver.switchTo().alert();
        await alert.accept();
    
    } catch (e) {
      console.log()
    }

  }
  async timeout(seconds) {
    await this.driver.manage().setTimeouts({ implicit: seconds * 1000 });
  }

  async quit() {
    await this.driver.quit();
  }
}


module.exports = {
  Element,
  BasePage,
}
