const dotenvConfig = require ('dotenv');
dotenvConfig.config();

const expect = require("chai").expect;
const { Given, When, Then, After, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const {

  LoginPage
} = require("../../pages/LoginPage.js")

const {
  RegisterPage
} = require("../../pages/RegisterPage.js")

const {
  BooksPage
} = require("../../pages/BooksPage.js");

const {
  BookPage,
  EXISTING_BOOK_TITLE
} = require("../../pages/BookPage.js");

const {
  ProfilePage
} = require("../../pages/ProfilePage.js");

setDefaultTimeout(5 * 5000);

Before(async (scenario) => {
  this.websitePage = new LoginPage("https://demoqa.com");
  await this.websitePage.buildSession();

})

// GIVEN

Given('user visit(s) login page', async () => {
  await this.websitePage.goTo('/login');
  await this.websitePage.initComponents();
});

Given('user visit(s) profile page', async () => {
  this.websitePage = new ProfilePage(this.websitePage.website, null, this.websitePage.driver);
  await this.websitePage.initComponents();
});

Given('user enter credentials', async () => {
  await this.websitePage.typeUsernameInput(process.env.REGISTERED_USERNAME);
  await this.websitePage.typePasswordInput(process.env.REGISTERED_PASSWORD);
  await this.websitePage.initComponents();
  await this.websitePage.clickLoginButton();
});


Given('user remove all books from collection', async () => {
  this.websitePage = new ProfilePage(this.websitePage.website, null, this.websitePage.driver);
  await this.websitePage.initComponents();


  await this.websitePage.clickButtonDeleteAllBooks();
  await this.websitePage.initComponents();
  await this.websitePage.clickButtonAggreedOnModal();
  await this.websitePage.dismissAlert();


});

Given('user visit(s) book(s) page', async () => {
  await this.websitePage.refresh();
  await this.websitePage.goTo('/books');
  this.websitePage = new BooksPage(this.websitePage.website, null, this.websitePage.driver);
  await this.websitePage.initComponents();
});

// WHEN



When('user fill in empty field for login', async () => {
  await this.websitePage.typeUsernameInput("abcdefgh");
  await this.websitePage.initComponents();
  await this.websitePage.clickLoginButton();
});

When('user search for an existing book', async () => {
  await this.websitePage.typeSearchBoxInput("non sense hamburguer");
  await this.websitePage.typeSearchBoxInput("");
  await this.websitePage.searchBoxInput.element.clear();
  await this.websitePage.typeSearchBoxInput(EXISTING_BOOK_TITLE);
  await this.websitePage.initComponents();
  await this.websitePage.pickBookSelectedItem(EXISTING_BOOK_TITLE)
});

When('user select an existing book', async () => {
  await this.websitePage.clickBookSelectedItem();
});

When('unregister user enter credentials', async () => {
  await this.websitePage.typeUsernameInput("abcdefgh");
  await this.websitePage.typePasswordInput("123abc%");
  await this.websitePage.initComponents();
  await this.websitePage.clickLoginButton();
});

When('user search book in collection', async () => {
  await this.websitePage.goTo('/profile');
  this.websitePage = new ProfilePage(this.websitePage.website, null, this.websitePage.driver);
  await this.websitePage.initComponents();
  await this.websitePage.typeSearchBoxInput("non sense hamburguer");
  await this.websitePage.searchBoxInput.element.clear();
  await this.websitePage.typeSearchBoxInput(EXISTING_BOOK_TITLE);
  await this.websitePage.initComponents();
  await this.websitePage.pickBookSelectedItem(EXISTING_BOOK_TITLE);

});

When('user delete book in collection', async () => {
  await this.websitePage.clickBookSelectedRemoveButton();
  await this.websitePage.initComponents();
  await this.websitePage.clickButtonAggreedOnModal();
  await this.websitePage.dismissAlert();
  await this.websitePage.acceptAlert();
  await this.websitePage.refresh();
  await this.websitePage.initComponents();


});

When('user view book in collection', async () => {
  await this.websitePage.clickBookSelectedAnchor();
});



When('user go to register page', async () => {
  await this.websitePage.clickNewUserButton();
  this.websitePage = new RegisterPage(this.websitePage.website, null, this.websitePage.driver);
  await this.websitePage.initComponents();
});

When('user click login button', async () => {
  await this.websitePage.submitForm();

});

When('user add book to collection', async () => {
  this.websitePage = new BookPage(this.websitePage.website, null, this.websitePage.driver);
  await this.websitePage.initComponents();
  await this.websitePage.clickButtonAddToCollection();
  await this.websitePage.dismissAlert();
  await this.websitePage.acceptAlert();
  await this.websitePage.refresh();
});

// THEN

Then('user should see require fields', async () => {
  const requiredFields = await this.websitePage.requireFields();
  expect(requiredFields).to.be.true;

});

Then('user should have no book in collection', async () => {
  const noDataLabel = await this.websitePage.labelTableNoData.getText();
  expect(noDataLabel).to.equal("No rows found");

});


Then('user should be able to see book', async () => {
  this.websitePage = new BookPage(this.websitePage.website, null, this.websitePage.driver);
  await this.websitePage.initComponents();
  const bookTitle = await this.websitePage.titleValueLabel.getText();
  expect(bookTitle).to.equal(EXISTING_BOOK_TITLE);

});

Then('user should see register form', async () => {
  expect(this.websitePage.firstnameInput).to.exist;
  expect(this.websitePage.lastnameInput).to.exist;
  expect(this.websitePage.userNameInput).to.exist;
  expect(this.websitePage.passwordInput).to.exist;
  expect(this.websitePage.registerButton).to.exist;
  expect(this.websitePage.goToLoginButton).to.exist;
});

Then('user should see an invalid error message', async () => {
  await this.websitePage.initComponents();
  const text = await this.websitePage.getTextFromErrorPanel();
  expect(text).to.equal(this.websitePage.ERROR.invalidErrorMessage);
});

Then('user should be able to see searched book on bookgrid', async () => {
  const bookSelectedItemText = await this.websitePage.bookSelectedAnchor.getText()
  await this.websitePage.initComponents();
  expect(bookSelectedItemText).to.equal(EXISTING_BOOK_TITLE);
});

Then('user should have a book in profile', async () => {

  await this.websitePage.goTo('/profile');
  this.websitePage = new ProfilePage(this.websitePage.website, null, this.websitePage.driver);
  await this.websitePage.initComponents();
  await this.websitePage.pickBookSelectedItem(EXISTING_BOOK_TITLE);

  const bookSelectedItemText = await this.websitePage.bookSelectedAnchor.getText()

  expect(bookSelectedItemText).to.equal(EXISTING_BOOK_TITLE);

});


After(async (scenario) => {
  if (this.websitePage && this.websitePage.quit) {
    await this.websitePage.quit();
  }
})
