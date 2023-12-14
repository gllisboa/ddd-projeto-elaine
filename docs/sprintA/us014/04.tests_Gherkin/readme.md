Feature: Calculating Average Number of Comments

Scenario Outline: As a member, I can login into the system

    Given I am on the login page the system
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password             | message                                                            |
      | average2 | comment2             | `You're all signed up! Logging you in.                             |
      | coments  | sobad                | "Yeahhhhh, your password should be at least 6 chars                |


  Scenario: Statistics field for entering a specific date
    Given the user is on the system
    When the user accesses the statistics field
    Then the system should display a field to enter a specific date

  Scenario: Calculate average number of comments for a specified date
    Given that the user has entered a specific date
    When the user requests the average number of comments
    Then the system should calculate the average based on available data

  Scenario: Display clear and understandable average comments
    Given that the system has calculated the average number of comments
    Then the system should display the result in a clear and understandable way

  Scenario: Rounding the average number of comments
    Given that the system has calculated the average comments
    When the system displays the average
    Then the system should round up to an appropriate decimal value

  Scenario: Handling cases with no comments on specified date
    Given that there are no comments for the specified date
    When the system receives a request for the average number of comments
    Then the system should display a message: "No comments found"

  Scenario: Providing timely feedback
    Given that the user requests the average number of comments for a specific date
    When the system processes the request
    Then the system should respond within a reasonable period of time

  Scenario: User-friendly date entry interface
    Given that the user is entering a date for the average number of comments
    Then the system interface should allow for intuitive and easy date entry

  Scenario: Exact calculation based on real data
    Given that the system has real data available for calculation
    When the system performs the calculation for a specific date
    Then the system should provide accurate results

  Scenario: Handling invalid future dates
    Given that the user enters an invalid future date for calculation
    Then the system should display a message: "Invalid date"
