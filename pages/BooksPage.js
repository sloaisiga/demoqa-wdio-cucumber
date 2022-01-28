const { BasePage, Element } = require("./BasePage");
const { Builder, By, Key, until } = require('selenium-webdriver');



class BooksPage extends BasePage {

  searchBoxInput;
  bookSelectedItem;
  bookSelectedAnchor;

  constructor(website, browser, driver) {
    super(website, browser, driver)
  }

  async initComponents() {
    this.searchBoxInput = await (new Element(this)).findById("searchBox");

  }
  async typeSearchBoxInput(textValue) {
    await this.searchBoxInput.type(textValue);
  }

  async pickBookSelectedItem(bookTitle) {
    let elementRaw = await this.driver.findElement(By.id(`see-book-${bookTitle}`));
    let elementsRaw = await elementRaw.findElements(By.css("a"));
    const element = (new Element(this));
    this.bookSelectedAnchor = element.element = elementsRaw[0];
  }

  async clickBookSelectedItem() {
    await this.bookSelectedAnchor.click()
  }

}

module.exports = { BooksPage };
