const { BasePage, Element } = require("./BasePage");
const { Builder, By, Key, until, locateWith } = require('selenium-webdriver');

class BookPage extends BasePage {

  titleValueLabel
  titleLabel
  buttonAddToCollection
  constructor(website, browser, driver) {
    super(website, browser, driver)
  }

  async initComponents() {
    
    try {

      let divButtonWrapper = await this.driver.findElement(By.css(`.fullButtonWrap`));
      const wrapperButtons = await divButtonWrapper.findElements(By.css("button"));
      this.buttonAddToCollection = (new Element(this));
      this.buttonAddToCollection.element = wrapperButtons[wrapperButtons.length -1]

      let titleWrapper = await this.driver.findElement(By.id(`title-wrapper`));
      const wrapperLabels = await titleWrapper.findElements(By.css("label"));
      this.titleLabel = (new Element(this))
      this.titleValueLabel = (new Element(this));
  
      this.titleLabel.element = wrapperLabels[0];
      this.titleValueLabel.element = wrapperLabels[1];    
    } catch(e) {
      console.log('not able to find wrapper');
    }
    
  }
  async typeSearchBoxInput(textValue) {
    await this.searchBoxInput.type(textValue);
  }

  async clickButtonAddToCollection() {
    await this.buttonAddToCollection.click();
    
  }


}

module.exports = { BookPage,   EXISTING_BOOK_TITLE: "Speaking JavaScript" };
