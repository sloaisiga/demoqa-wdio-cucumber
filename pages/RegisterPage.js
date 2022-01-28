const { BasePage, Element } = require("./BasePage");



class RegisterPage extends BasePage {
  firstnameInput;
  lastnameInput;
  userNameInput;
  passwordInput;
  registerButton;
  goToLoginButton;

  constructor(website, browser, driver) {
    super(website, browser, driver)
  }

  async initComponents() {
    this.firstnameInput = await (new Element(this)).findById("firstname");
    this.lastnameInput = await (new Element(this)).findById("lastname");
    this.userNameInput = await (new Element(this)).findById("userName");
    this.passwordInput = await (new Element(this)).findById("password");
    this.registerButton = await (new Element(this)).findById("register");
    this.goToLoginButton = await (new Element(this)).findById("gotologin");

  }
  async typeUsernameInput(textValue) {
   await  this.usernameInput.type(textValue);
  }
  async typePasswordInput(textValue) {
    await this.passwordInput.type(textValue);
  }
  async clickRegisterButton() {
    await this.registerButton.click(); 
  }
  async clickGoToLoginButton() {
    await this.goToLoginButton.click();   
  } 
}

module.exports = { RegisterPage };
