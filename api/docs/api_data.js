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
    "url": "/books/:id",
    "title": "Get a book by id",
    "name": "Book",
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
            "type": "object",
            "optional": false,
            "field": "book",
            "description": "<p>A book with the requested id.</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "book.id",
            "description": "<p>The book id.</p>"
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
            "field": "book.cover",
            "description": "<p>A URL with a cover image for the book.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.description",
            "description": "<p>A long string with the books summary/description.</p>"
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
            "type": "array",
            "optional": false,
            "field": "book.authors",
            "description": "<p>A list of authors.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "book.reviews",
            "description": "<p>An array of reviews for the book.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.reviews.id",
            "description": "<p>The review id.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.reviews.username",
            "description": "<p>Username of the reviewer.</p>"
          },
          {
            "group": "Success 200",
            "type": "float",
            "optional": false,
            "field": "book.reviews.rating",
            "description": "<p>Star rating (1-5) of the review.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.reviews.review",
            "description": "<p>Body content of the review.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n     \"status\": \"success\",\n     \"book\": {\n       \"id\": 12,\n       \"title\": \"Mathematics\",\n       \"isbn\": \"9780393040029\",\n       \"cover\": \"https://books.google.com/books/content?id=E09fBi9StpQC&printsec=frontcover&img=1&zoom=3\",\n       \"thumbnail\": \"https://books.google.com/books/content?id=E09fBi9StpQC&printsec=frontcover&img=1&zoom=2\",\n       \"description\": \"Traces the history of mathematics and numeration, and reviews symbolic logic, set theory, series, equations, functions, geometry, trigonometry, vector analysis, fractals, matrices, calculus, probability theory, and differential equations\",\n       \"publisher\": \"W. W. Norton & Company\",\n       \"authors\": [\n         \"Jan Gullberg\",\n         \"Peter Hilton\"\n       ],\n       \"reviews\": [\n         {\n           \"id\": 13,\n           \"username\": \"admin\",\n           \"rating\": 1.5,\n           \"review\": \"I've read better\"\n         }\n       ]\n     }\n   }",
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
            "field": "NotFound",
            "description": "<p>Requested resource was not found.</p>"
          },
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
          "title": "NotFound-Response",
          "content": "HTTP/1.1 404 Not Found\n  {\n    \"status\": \"error\",\n    \"error\": \"NotFound\",\n    \"message\": \"No resource was found with the requested id\",\n  }",
          "type": "json"
        },
        {
          "title": "MissingAuth-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"error\",\n  \"error\": \"MissingAuth\",\n  \"message\": \"Please provide a token in the `Authorization` header.\",\n}",
          "type": "json"
        },
        {
          "title": "InvalidCreds-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"error\",\n  \"error\": \"InvalidCreds\",\n  \"message\": \"Invalid/Expired authorization token provided.\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/Book/index.js",
    "groupTitle": "Books"
  },
  {
    "type": "get",
    "url": "/books",
    "title": "Get a list of books",
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
            "type": "integer",
            "optional": false,
            "field": "book.id",
            "description": "<p>The book id.</p>"
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
            "field": "book.cover",
            "description": "<p>A URL with a cover image for the book.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.thumbnail",
            "description": "<p>A URL with a thumbnail image for the book.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.description",
            "description": "<p>A long string with the books summary/description.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "book.publisher",
            "description": "<p>The name of the publishing company.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n     \"status\": \"success\",\n     \"books\": [\n       {\n         \"id\": 1,\n         \"title\": \"The Math Book\",\n         \"isbn\": \"9781402757969\",\n         \"cover\": \"https://books.google.com/books/content?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=3\",\n         \"thumbnail\": \"https://books.google.com/books/content?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=2\",\n         \"description\": \"This book covers 250 milestones in mathematical history, beginning millions of years ago with ancient \\\"ant odometers\\\" and moving through time to our modern-day quest for new dimensions.\",\n         \"publisher\": \"Sterling Publishing Company, Inc.\"\n       },\n     ]\n   }",
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
          "title": "InvalidCreds-Response:",
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
  },
  {
    "type": "post",
    "url": "/reviews/:book_id",
    "title": "Create a review",
    "name": "Create_Review",
    "group": "Reviews",
    "description": "<p>NOTE: This request ID is the id of the book you want to add the review to</p>",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "float",
            "optional": false,
            "field": "rating",
            "description": "<p>The user's rating for the book.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "review",
            "description": "<p>The user's optional review content for the given book.</p>"
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
            "type": "array",
            "optional": false,
            "field": "review",
            "description": "<p>A review with the requested id.</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "review.id",
            "description": "<p>The review id.</p>"
          },
          {
            "group": "Success 200",
            "type": "float",
            "optional": false,
            "field": "reviews.rating",
            "description": "<p>Star rating (1-5) of the review.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "review.content",
            "description": "<p>Body content of the review.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n     \"status\": \"success\",\n     \"message\": \"Successfully added a review to book with id (4)\",\n     \"review\": {\n       \"id\": 14,\n       \"rating\": 1.5,\n       \"content\": \"I've read better\"\n     }\n   }",
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
            "field": "NotFound",
            "description": "<p>Requested resource was not found.</p>"
          },
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
          "title": "NotFound-Response",
          "content": "HTTP/1.1 404 Not Found\n  {\n    \"status\": \"error\",\n    \"error\": \"NotFound\",\n    \"message\": \"No resource was found with the requested id (4)\",\n  }",
          "type": "json"
        },
        {
          "title": "MissingAuth-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"error\",\n  \"error\": \"MissingAuth\",\n  \"message\": \"Please provide a token in the `Authorization` header.\",\n}",
          "type": "json"
        },
        {
          "title": "InvalidCreds-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"error\",\n  \"error\": \"InvalidCreds\",\n  \"message\": \"Invalid/Expired authorization token provided.\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/Review/index.js",
    "groupTitle": "Reviews"
  },
  {
    "type": "delete",
    "url": "/reviews/:review_id",
    "title": "Delete a review",
    "name": "Delete_Review",
    "group": "Reviews",
    "description": "<p>NOTE: This request ID is the id of the review you want to delete.</p>",
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
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Informative message indicating action(s) taken.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "review",
            "description": "<p>A review with the requested id.</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "review.id",
            "description": "<p>The review id.</p>"
          },
          {
            "group": "Success 200",
            "type": "float",
            "optional": false,
            "field": "reviews.rating",
            "description": "<p>Star rating (1-5) of the review.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "review.content",
            "description": "<p>Body content of the review.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n     \"status\": \"success\",\n     \"message\": \"You successfully deleted a comment with id (14)\",\n     \"review\": {\n       \"id\": 14,\n       \"review\": \"I've read better\",\n       \"rating\": 1.5\n     }\n   }",
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
            "field": "NotFound",
            "description": "<p>Requested resource was not found.</p>"
          },
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
          "title": "NotFound-Response",
          "content": "HTTP/1.1 404 Not Found\n  {\n    \"status\": \"error\",\n    \"error\": \"NotFound\",\n    \"message\": \"No resource was found with the requested id (4)\",\n  }",
          "type": "json"
        },
        {
          "title": "MissingAuth-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"error\",\n  \"error\": \"MissingAuth\",\n  \"message\": \"Please provide a token in the `Authorization` header.\",\n}",
          "type": "json"
        },
        {
          "title": "InvalidCreds-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"error\",\n  \"error\": \"InvalidCreds\",\n  \"message\": \"Invalid/Expired authorization token provided.\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/Review/index.js",
    "groupTitle": "Reviews"
  }
] });
