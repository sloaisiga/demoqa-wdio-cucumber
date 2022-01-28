Feature: Profile
  Registered User should be able to search within their book collection, delete specific book from their collection, view specific book from collection

  Scenario: registered user should be able to search for book in their collection
    Given user visits login page
      And user enter credentials   
      And user visits profile page
      And user remove all books from collection
      And user visits books page   
    When user search for an existing book
      And user select an existing book
      And user add book to collection
      And user search book in collection
    Then user should have a book in profile


  Scenario: registered user should be able to delete a book in collection
    Given user visits login page
      And user enter credentials   
      And user visits profile page
      And user remove all books from collection
      And user visits books page   
    When user search for an existing book
      And user select an existing book
      And user add book to collection
      And user search book in collection
      And user delete book in collection
    Then user should have no book in collection

  Scenario: registered user should be able to view a book in collection
    Given user visits login page
      And user enter credentials   
      And user visits profile page
      And user remove all books from collection
      And user visits books page   
    When user search for an existing book
      And user select an existing book
      And user add book to collection
      And user search book in collection
      And user view book in collection
    Then user should be able to see book

