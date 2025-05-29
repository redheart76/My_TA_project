@unauthenticated
Feature: Place Order

     Scenario: Ensure a cusstomer can register a new account before checking out and the new account can be used to login

          Given I am on the homepage
          When I click on the "Sign Up" button
          And I fill in the registration form with valid details
          Then I should be able to create a new account
          And I am able to contiune to use the account
          When I add a product to the cart
          And I proceed to checkout
          And I complete the payment details
          And I confirm the order
          Then I should be placed the order successfully
          When I delete the account
          Then I am able to delete the account successfully
          And I am on the homepage

     Scenario: Ensure a customer can register a new account while checking out and the new account can be used to login
          Given I am on the homepage
          And I add a product to the cart
          When I click on the "Sign Up" button
          And I fill in the registration form with valid details
          Then I should be able to create a new account
          And I am able to contiune to use the account
          When I review the cart
          And I proceed to checkout
          And I complete the payment details
          And I confirm the order
          Then I should be placed the order successfully
          When I delete the account
          Then I am able to delete the account successfully
          And I am on the homepage
