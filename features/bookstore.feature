Feature: Bookstore
  Registered User should be able to search for books,view books, add books to your collection

  Scenario: registered user should be able to search for book
    Given user visits login page
      And user enter credentials   
      And user visits profile page
      And user visits books page   
    When user search for an existing book
    Then user should be able to see searched book on bookgrid

  Scenario: registered user should be view a searched book
    Given user visits login page
      And user enter credentials   
      And user visits profile page
      And user visits books page   
    When user search for an existing book
      And user select an existing book
    Then user should be able to see book 

  Scenario: registered user add book to collection
    Given user visits login page
      And user enter credentials   
      And user visits profile page
      And user remove all books from collection
      And user visits books page   
    When user search for an existing book
      And user select an existing book
      And user add book to collection
    Then user should have a book in profile



  
      