# US 014 - Check average comments

# Tests model - AAA

**Test 1:** Check that the statistics field exists. - AC1.

**Description:**

The system displays a statistics field next to the login where the user can enter a specific date to find out the average number of comments.

**Preconditions:**
//Arrange:
1. The user is logged in to the forum site.

**Test steps:**
//Act:
1. Check that the statistics field exists.

**Expected result:**
//Assert:
* The statistics field is visible in the user interface.

**Test 2:** Calculate and display average comments for the specified date - AC2, AC3.

**Description:**

The system must calculate the average number of comments based on the data available for the specified date and display it clearly and comprehensibly to the user.

**Preconditions:**
//Arrange:
1. The user is logged in to the forum site.
2. The user has entered a specific date for the calculation.

**Test steps:**
//Act:
1. enter a specific date in the date input field.
2. Submit the calculation request.
3. Check that the average of the comments is presented in a clear and understandable way.

**Expected result**
//Assert:
* The system correctly calculates the average number of comments based on the available data.
* The average number of comments is presented in a clear and understandable way.

**Test 3:** Check rounding of average comments - AC4.

**Description:**

The system should round the value of the average comments to an appropriate number of decimal places, for reasons of clarity (round up).

**Preconditions:**
//Arrange:
1. The user is logged in to the forum site.
2. The user has entered a specific date for the calculation.

**Test steps:**
//Act:
1. Enter a specific date in the date input field.
2. Submit the calculation request.
3. Check that the value of the average comments is rounded appropriately.

**Expected result**
//Assert:
* The system rounds the value of the average comments to the appropriate precision.

**Test 4:** Handle cases with no comments on the specified date. - AC5.

**Description:**

The system should handle cases where there were no comments on the specified date and display an appropriate message or value.

**Preconditions:**
//Arrange:
1. The user is logged in to the forum site.
2. The user has entered a specific date for the calculation.

**Test steps:**
//Act:
1. Enter a specific date in the date input field.
2. Submit the calculation request.

**Expected result:**
//Assert:
* The system displays an appropriate message indicating that there were no comments on the specified date. Message: "No comments found"

**Test 5:** Provide timely feedback for the average request for comments. - AC6.

**Description:**

The system must respond to the request for average comments within a reasonable time.

**Preconditions:**
//Arrange:
1. The user is logged in to the forum site.
2. The user has entered a specific date for the calculation.

**Test steps:**
//Act:
1. Enter a specific date in the date input field.
2. Submit the calculation request.
3. Measure the time it takes for the system to respond.

**Expected result**
//Assert:
* The system provides a response within a reasonable timeframe, without significant delays.

**Test 6:** Evaluate the user-friendly date entry interface - AC7.

**Description:**

The user interface must be easy to use and allow the user to enter the date intuitively.

**Preconditions:**
//Arrange:
1. The user is logged in to the forum site.

**Test steps:**
//Act:
1. Go to the page to calculate the average number of comments.
2. Evaluate the date entry interface for usability.

**Expected result:**
//Assert:
* The user interface allows the user to enter the date intuitively and without confusion.

**Test 7:** Ensure an accurate calculation based on real data. - AC8.

**Description:**

The system must perform the average calculation of comments based on real data and provide accurate results.

**Preconditions:**
//Arrange:
1. The user is logged in to the forum site.
2. The system has real data available for calculation.

**Test steps:**
//Act:
1. Enter a specific date in the date input field.
2. Submit the calculation request.

**Expected result:**
//Assert:
* The system performs the calculation accurately based on the actual data available.


**Test 8 (Failure):** Check the handling of an invalid date. -AC9

**Description:**

The system must properly handle an invalid date entry and provide adequate feedback to the user.

**Preconditions:**
//Arrange:
1. The user is logged in to the forum site.

**Test steps:**
//Act:
1. Go to the page to calculate the average number of comments.
2. Enter an invalid date in the date input field (future date).


**Expected result:**
//Assert:
* The system provides feedback indicating that the date is invalid. Message: "Invalid date"

**Test 9 (Failure):** Check the handling of a calculation request without a specified date - AC8

**Description:**

The system must properly handle a calculation request for the average of comments without a specified date and provide appropriate feedback to the user.

**Preconditions:**
//Arrange:
1. The user is logged in to the forum site.

**Test steps:**
//Act:
1. Go to the page to calculate the average number of comments.
2. Leave the date input field empty.
3. Submit the calculation request.

**Expected result**:
//Assert:
* The system provides feedback indicating that the date is mandatory and has not been specified.