# Action

**Method:** Get

**URL:** http://localhost:5001/api/v1/posts/unpopular


# Description

Get the unpopular messages from the Domain Driven Designers forum site, as a user or member.


# Request parameters

>
* **Headers**

| Key           | Value                            | Description          | 
|-------------  |----------------------------------|----------------------|
| Authorization | access token                    | This header is optional for a user that wants to get unpopular posts. |

>
* **Query parameters**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Offset        | null                             | It specifies the number of posts to skip. Should be optional, but only assumes a null value. |

# Possible response codes and results

## Successful responses

>Response for a get unpopular posts request, for a member.

>Response for a get unpopular posts request, when the user is logged in and the access token is correct or is empty or is not included in the request.


* **Status**

| Status Code   | Description           |

|--------|-----------------------|---------------------------------|
| 200    | OK                    |


* **Body**

```json 
{
    "posts": [
        {
            "slug": "string",
            "title": "string",
            "createdAt": "string",
            "memberPostedBy": {
                "reputation": "number",
                "user": {
                    "username": "string"
                }
            },
            "numComments": "number",
            "points": "number",
            "text": "string",
            "link": "string",
            "type": "text",
            "wasUpVotedByMe": "boolean",
            "wasDownVotedByMe": "boolean"

        },
        {
            "slug": "string",
            "title": "string",
            "createdAt": "string",
            "memberPostedBy": {
                "reputation": "number",
                "user": {
                    "username": "string"
                }
            },
            "numComments": "number",
            "points": "number",
            "text": "string",
            "link": "string",
            "type": "text",
            "wasUpVotedByMe": "boolean",
            "wasDownVotedByMe": "boolean"

        } 
        
    ]
}

```

  ## Error responses

>Response for a get unpopular posts request, when the user is logged in but the access token expired or is not correct.

* **Status**

| Status Code   | Description           |

|--------|-----------------------|---------------------------------|
| 403     | Forbidden                   |

* **Body**

```json 
{
    "message": "Token signature expired."
}
```

## Server error responses

>Response for a get unpopular posts request, when the ofsset query parameter is not null.

* **Status**

| Status Code   | Description           |

|--------|-----------------------|---------------------------------|
| 500     | Internal Server Error                   |


* **Body**

```json 
{
    "message": "An unexpected error occurred."
}
```

## Reference to related use cases and acceptance criteria

**User Story 13: Unpopular Posts**

* **AC1:** Unpopular posts should be automatically sorted in ascending order by number of votes
* **AC2:** The user must be able to see the number of votes for each post.
* **AC3:** Posts with the same number of votes should be sorted in order of publication, with the most recent being displayed first.
