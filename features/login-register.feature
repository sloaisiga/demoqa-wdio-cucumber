Feature: Login Register validation
  Login page should be able to validate correct data

  Scenario: unregister user should not be able to login
    Given user visit login page
    When unregister user enter credentials
    Then user should see an invalid error message

  Scenario: user should be able to access register
    Given user visit login page
    When user go to register page
    Then user should see register form

  Scenario: user should not submit empty fields
    Given user visit login page
    When user fill in empty field for login
    Then user should see require fields

  
      