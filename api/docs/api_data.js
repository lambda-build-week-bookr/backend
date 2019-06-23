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
            "description": "<p>Users unique email.</p>"
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
          "content": "HTTP/1.1 201 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Successfully registered a user with email test@gmail.com\",\n  \"user\": {\n     \"email\": \"test@gmail.com\",\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NjEzMjI0NzksImV4cCI6MTU2MTQwODg3OX0.PC45fmQnUYAFXO_UaHY9Eefr8RnylExAul-pIFtUgBw\",\n  },\n}",
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
            "description": "<p>Users email.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Successfully logged in with `email` test@gmail.com\",\n  \"user\": {\n    \"email\": \"test@gmail.com\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NjEzMjI0NzksImV4cCI6MTU2MTQwODg3OX0.PC45fmQnUYAFXO_UaHY9Eefr8RnylExAul-pIFtUgBw\",\n  }\n}",
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
  }
] });
