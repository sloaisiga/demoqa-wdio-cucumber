const { Builder, By, Key, until } = require('selenium-webdriver');
const { BasePage, Element } = require("./BasePage");
class LoginPage extends BasePage {
  usernameInput;
  passwordInput;
  loginButton;
  errorPanel;
  newUserButton;

  ERROR = {
    invalidErrorMessage: "Invalid username or password!"
  }

  constructor(website, browser, driver) {
    super(website, browser, driver)
  }
  async initComponents() {
    this.usernameInput = await (new Element(this)).findById("userName");
    this.passwordInput = await (new Element(this)).findById("password");
    this.loginButton = await (new Element(this)).findById("login");
    this.errorPanel = await (new Element(this)).findById("name");
    this.newUserButton = await (new Element(this)).findById("newUser");
    
  }
  async typeUsernameInput(textValue) {
    await this.usernameInput.type(textValue);
  }
  async typePasswordInput(textValue) {
    await this.passwordInput.type(textValue);
  }
  async clickLoginButton() {
    await this.loginButton.click();    
  }

  async submitForm() {
    await this.usernameInput.type(Key.ENTER);
  }

  async requireFields() {
    const isPasswordRequired = await this.passwordInput.isRequired();
    const isUsernameRequired = await this.usernameInput.isRequired();

    return isPasswordRequired && isUsernameRequired;
  }

  async clickNewUserButton() {
    await this.newUserButton.click();
    
  }

  async getTextFromErrorPanel() {
    const text = await this.errorPanel.getText();
    return text;
  }
}

module.exports = { LoginPage };
