# Action

**Method:** GET

**URL**

http://localhost:5001/api/v1/comments/average/{specificDate}


# Description

This endpoint calculates the average number of comments for a specific day.


# Request Parameters

* **Headers**

| Key           | Value                            | Description                                                     |
|-------------  |----------------------------------|-----------------------------------------------------------------|
| Authorization | acccess token                    |                                                            |

* **Query Parameters**

| Parameter   | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| date        | string | Specific date for calculating the average number of comments   |


# Possible response codes and results

## Successful responses

>Response for a successful request with a valid date.

| Code | Description           |
|------|-----------------------|
| 200  | OK                    | 

* **Body**

```json
{
    "average": "4.0000" //média de comentarios
}
```

## Client error response

>Response for a request with an invalid date.

|Code  | Description | 
|------|-------------|
| 400  | Bad request |

* **Body**

```json
{
    "error": "string"
}
```
## Server error response

> Response for an invalid request.

|Code  | Description           |
|------|-----------------------|
| 500  | Internal Server Error | 

* **Body**

```json
{
    "message": "An unexpected error occurred."
}
```


# Reference to related use cases and acceptance criteria

**User Story 06:** Comment on a post

**Acceptance Criteria:** AC1, AC2, AC3, AC4, AC5, AC6.