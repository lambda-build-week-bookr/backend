define({ "api": [
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register new user",
    "name": "AuthUser",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Users unique (private) login email.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique (public) username.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Informative message indicating action(s) taken.</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "user",
            "description": "<p>User information.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "user.email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "user.token",
            "description": "<p>Users authentication token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Successfully registered a user with email test@gmail.com\",\n  \"user\": {\n     \"username\": \"Taz\",\n     \"email\": \"test@gmail.com\",\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NjEzMjI0NzksImV4cCI6MTU2MTQwODg3OX0.PC45fmQnUYAFXO_UaHY9Eefr8RnylExAul-pIFtUgBw\",\n  },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NonUnique",
            "description": "<p>Unique constraint was not met.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidType",
            "description": "<p>An invalid field type was sent with the request.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingField",
            "description": "<p>An expected field was not sent with the request.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NonUnique-Response",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"error\",\n  \"error\": \"NonUnique\",\n  \"message\": \"Provided `email` must be unique: test@gmail.com already exists in the database\",\n}",
          "type": "json"
        },
        {
          "title": "InvalidType-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"status\": \"error\",\n  \"error\": \"InvalidType\",\n  \"message\": \"Expected type for (password) to be string, but instead saw number\",\n}",
          "type": "json"
        },
        {
          "title": "MissingField-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"status\": \"error\",\n  \"error\": \"MissingField\",\n  \"message\": \"Missing required field (email)\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/Auth/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login existing user",
    "name": "LoginUser",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Users (private) login email.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Informative message indicating action(s) taken.</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "user",
            "description": "<p>User information.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "user.email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "user.token",
            "description": "<p>Users authentication token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Successfully logged in with `email` test@gmail.com\",\n  \"user\": {\n    \"username\": \"Taz\",\n    \"email\": \"test@gmail.com\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NjEzMjI0NzksImV4cCI6MTU2MTQwODg3OX0.PC45fmQnUYAFXO_UaHY9Eefr8RnylExAul-pIFtUgBw\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentials",
            "description": "<p>Provided credentials could not be validated.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidType",
            "description": "<p>An invalid field type was sent with the request.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingField",
            "description": "<p>An expected field was not sent with the request.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidCredentials-Response:",
          "content": "HTTP/1.1 401 Not Authorized\n{\n  \"status\": \"error\",\n  \"error\": \"InvalidCredentials\",\n  \"message\": \"Invalid Credentials\",\n}",
          "type": "json"
        },
        {
          "title": "InvalidType-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"status\": \"error\",\n  \"error\": \"InvalidType\",\n  \"message\": \"Expected type for (password) to be string, but instead saw number\",\n}",
          "type": "json"
        },
        {
          "title": "MissingField-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"status\": \"error\",\n  \"error\": \"MissingField\",\n  \"message\": \"Missing required field (email)\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/Auth/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/books",
    "title": "Gets a list of books",
    "name": "BookList",
    "group": "Books",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users token provided on registration/login</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the request.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "books",
            "description": "<p>A list of books.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.title",
            "description": "<p>The book title.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.isbn",
            "description": "<p>The 10 digit ISBN.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.publisher",
            "description": "<p>The name of the publishing company.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.cover",
            "description": "<p>A URL with a cover image for the book.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.edition",
            "description": "<p>A short string regarding the edition of the book.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.description",
            "description": "<p>A long string with the books summary/description.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"status\": \"success\",\n    \"books\": [\n      {\n        \"title\": \"Book Title\",\n        \"isbn\": \"1234567890\",\n        \"publisher\": \"Publisher Name\",\n        \"cover\": \"https://link.to/image.png\",\n        \"edition\": \"5th Edition\",\n        \"description\": \"This is a generic book description.\",\n      },\n    ],\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/Book/index.js",
    "groupTitle": "Books",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingAuth",
            "description": "<p>No Authorization header was sent with the request.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCreds",
            "description": "<p>Token sent with the request is invalid or expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingAuth-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"error\",\n  \"error\": \"MissingAuth\",\n  \"message\": \"Please provide a token in the `Authorization` header.\",\n}",
          "type": "json"
        },
        {
          "title": "InavlidCreds-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"error\",\n  \"error\": \"InvalidCreds\",\n  \"message\": \"Invalid/Expired authorization token provided.\",\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "api/docs/main.js",
    "group": "C__xampp_htdocs_git_lambda_bookr_backend_api_docs_main_js",
    "groupTitle": "C__xampp_htdocs_git_lambda_bookr_backend_api_docs_main_js",
    "name": ""
  }
] });
