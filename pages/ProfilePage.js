const { BasePage, Element } = require("./BasePage");
const { Builder, By, Key, until, locateWith } = require('selenium-webdriver');
class ProfilePage extends BasePage {

  buttonDeleteAllBooks;
  goToBookstoreButton;
  buttonAggreedOnModal;
  labelTableNoData;
  searchBoxInput;

  bookSelectedItem;
  bookSelectedAnchor;
  bookSelectedRemoveButton;
  constructor(website, browser, driver) {
    super(website, browser, driver)
  }

  async initComponents() {
    this.goToBookstoreButton = await (new Element(this)).findById("gotoStore");
    this.labelTableNoData = await (new Element(this)).findByCSS(".rt-noData");
    this.searchBoxInput = await (new Element(this)).findById("searchBox");

    this.buttonAggreedOnModal = await (new Element(this)).findById("closeSmallModal-ok");
    let buttonWrapper

    try {
      buttonWrapper = await this.driver.findElements(By.css(`.buttonWrap`));
      buttonWrapper = buttonWrapper[0];
      const wrapperButtons = await buttonWrapper.findElements(By.css("button"));
      this.buttonDeleteAllBooks = (new Element(this))
      this.buttonDeleteAllBooks.element = wrapperButtons[wrapperButtons.length - 1]
    } catch (e) {
      console.log("unable to load wrapper")
    }
  }
  async typeSearchBoxInput(textValue) {
    await this.searchBoxInput.type(textValue);
  }
  async clickGoToBookstoreButton() {
    await this.goToBookstoreButton.click();
  }
  async clickButtonDeleteAllBooks() {
    this.driver.executeScript("window.scrollBy(0,250)");
    await this.initComponents();
    await this.buttonDeleteAllBooks.click();
  }

  async clickBookSelectedRemoveButton() {
    await this.bookSelectedRemoveButton.click();
  }

  async clickBookSelectedAnchor() {
    await this.bookSelectedAnchor.click();
  }

  async pickBookSelectedItem(bookTitle) {
    try {
      let elementRaw = await this.driver.findElement(By.id(`see-book-${bookTitle}`));
      let elementsRaw = await elementRaw.findElements(By.css("a"));
      const element = (new Element(this));
      this.bookSelectedAnchor = element.element = elementsRaw[0];

      this.bookSelectedRemoveButton = await (new Element(this)).findById("delete-record-undefined"); 
    } catch (e) {

    }

  }

  async clickButtonAggreedOnModal() {
    await this.buttonAggreedOnModal.click();
  }
}

module.exports = { ProfilePage };
