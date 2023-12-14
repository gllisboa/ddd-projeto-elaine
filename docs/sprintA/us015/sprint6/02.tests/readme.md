# US 015 - Popular posts older than five days are in red

**Test 1:**  Check the date display in red for old posts(AC1).

**Description:**

The system should display the date of the oldest posts in red to emphasise their seniority.

**Preconditions:**

There are posts older than five days in the system.

**Test steps:**

1. Access the old posts visualisation page.
2. Check the date formatting of old posts.

**Expected result:**

* For each post older than five days, the date should be displayed in red.

**Test 2:** Check the correct calculation of the hours since the post was submitted (AC2).

**Description:**

The system should correctly calculate the time elapsed since the post was submitted, considering that a day has 24 hours.

**Preconditions:**

There are recent posts in the system.

**Test steps:**

1. Identify the submission time of a recent post.
2. Calculate the time elapsed since submission.

**Expected Result:**

* The elapsed time displayed correctly corresponds to the number of hours since the post was submitted, considering a day as having 24 hours.

**Failure Test 3:** Failed to display date in red for recent posts(AC1).

**Description:**

The system should not display the date in red for recent posts, i.e. less than five days old.

**Preconditions:**

There are recent posts in the system, less than five days old.

**Test steps:**

1. Access the recent posts view page.
2. Check the date formatting of recent posts.

**Expected result:**
* The date of posts less than five days old should not be displayed in red.

**Failure Test 4:** Incorrect calculation of hours since post submission(AC2).

**Description:**

The system should not correctly calculate the time since post submission for recent posts.

**Preconditions:**

There are recent posts in the system.

**Test steps:**

1. Identify the submission time of a recent post.
2. Calculate the expected elapsed time since submission.
3. Compare the calculated time with that displayed by the system.

**Expected Result:**
* The elapsed time displayed for recent posts should not correctly correspond to the number of hours since the post was submitted. This can be confirmed by the difference between the time calculated manually and that displayed by the system.
