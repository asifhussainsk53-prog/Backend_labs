# Lab 2: SQLite Database and CRUD Routes

## Course Information

| Field | Details |
| --- | --- |
| Course | Backend Development Fundamentals |
| Year/Term | Year II, Term II |
| University | Aurora Deemed to be University |
| Faculty | Mr. Joel Prashanth D |

## Student Details

| Field | Details |
| --- | --- |
| Name | Shaik Asif Hussain |
| Registration Number | 252U1R9144 |
| Section | S-26 |

## Project Overview

This project connects an Express.js server to an SQLite database and provides HTTP routes to create, retrieve, update, and delete book records.

**Live deployment:** [https://backend-labs-lab-02.onrender.com/books](https://backend-labs-lab-02.onrender.com/books)

Render deploys this project from the `lab-02` root directory using the repository's [`render.yaml`](../render.yaml) Blueprint configuration.

## Project Objective

Connect an Express.js server to an SQLite database and implement CRUD operations over HTTP using asynchronous database operations, parameterized SQL queries, and appropriate HTTP status codes.

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- `sqlite3`
- `sqlite`
- [Nodemon](https://nodemon.io/)
- [VS Code REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [Postman](https://www.postman.com/)

## Features

1. Creates the `book` table if it does not exist.
2. Inserts ten sample books when the table is empty.
3. Retrieves all books or a single book by ID.
4. Adds, updates, and deletes books.
5. Uses `async`/`await` for database operations.
6. Uses parameterized SQL queries with `?` placeholders.
7. Returns HTTP status codes for successful requests, missing required fields, books not found, and server or database errors.

## Database Schema

The `book` table contains the following columns:

| Column | Type | Description |
| --- | --- | --- |
| `id` | `INTEGER` | Auto-incrementing primary key |
| `title` | `TEXT` | Book title |
| `author` | `TEXT` | Book author |
| `price` | `INTEGER` | Book price |
| `pages` | `INTEGER` | Number of pages |

## API Endpoints

| Method | Endpoint | Description | Success status |
| --- | --- | --- | --- |
| `GET` | `/books/` | Retrieve all books | `200 OK` |
| `GET` | `/books/:bookId/` | Retrieve one book by ID | `200 OK` |
| `POST` | `/books/` | Add a book | `201 Created` |
| `PUT` | `/books/:bookId/` | Update a book | `200 OK` |
| `DELETE` | `/books/:bookId/` | Delete a book | `200 OK` |

### Request body

`POST /books/` and `PUT /books/:bookId/` expect all four fields in a JSON body:

```json
{
  "title": "Python Basics",
  "author": "John",
  "price": 350,
  "pages": 250
}
```

The application returns `400 Bad Request` if any of these fields is missing. A request to an ID that does not exist returns `404 Not Found`. Other database or server errors return `500 Internal Server Error`.

### Response and error status codes

| Situation | Status code |
| --- | --- |
| Successful `GET`, `PUT`, or `DELETE` | `200 OK` |
| Successful `POST` | `201 Created` |
| Required request fields are missing | `400 Bad Request` |
| Book not found | `404 Not Found` |
| Unexpected server or database error | `500 Internal Server Error` |

## Project Structure

```text
lab-02/
├── app.js
├── app.http
├── goodreads.db
├── package.json
├── package-lock.json
├── README.md
└── Screenshots/
    ├── add-book.png
    ├── books-database.png
    ├── delete-book.png
    ├── get-all-books.png
    ├── get-book-by-id.png
    └── update-book.png
```

## Installation and Running

### Prerequisites

- Node.js and npm installed.
- VS Code with the REST Client extension, or Postman, for API testing.

### Install dependencies

Open a terminal in the `lab-02` directory and run:

```bash
npm install
```

### Start the server

Start the development server with Nodemon:

```bash
npm run dev
```

Or start it directly with Node.js:

```bash
npm start
```

The server runs at `http://localhost:3000`. On startup, `app.js` creates the `book` table in `goodreads.db` if necessary and inserts the ten sample books only when the table is empty.

## Testing with VS Code REST Client

The [`app.http`](./app.http) file contains request examples that can be run with the VS Code REST Client extension.

1. Open the `lab-02` folder in VS Code.
2. Start the server with `npm run dev`.
3. Open [`app.http`](./app.http).
4. Select **Send Request** above a request to execute it.
5. Check the response status and body in the editor tab that opens.

The request examples cover:

| Method | Endpoint in `app.http` | Expected result |
| --- | --- | --- |
| `GET` | `/books/` | `200 OK` with a JSON array |
| `GET` | `/books/4/` | `200 OK` with one book, if ID `4` exists |
| `POST` | `/books/` | `201 Created` with a success message and the new book ID |
| `PUT` | `/books/6/` | `200 OK` with a success message, if ID `6` exists |
| `DELETE` | `/books/9/` | `200 OK` with a success message, if ID `9` exists |

The `POST` and `PUT` requests include sample JSON bodies in `app.http`. Update the IDs as needed to match the records in your database. A `PUT` or `DELETE` request for a missing ID returns `404 Not Found`.

## Testing with Postman

1. Start the server with `npm run dev`.
2. Create requests using `http://localhost:3000` as the base URL.
3. For `POST` and `PUT`, select **Body** → **raw** → **JSON**, and include `title`, `author`, `price`, and `pages`.
4. Send each request and verify its response status and body.

### Retrieve all books

- **Method:** `GET`
- **URL:** `http://localhost:3000/books/`
- **Expected status:** `200 OK`

### Retrieve one book

- **Method:** `GET`
- **URL:** `http://localhost:3000/books/4/`
- **Expected status:** `200 OK` if book ID `4` exists; otherwise `404 Not Found`.

### Add a book

- **Method:** `POST`
- **URL:** `http://localhost:3000/books/`
- **Header:** `Content-Type: application/json`
- **Expected status:** `201 Created`

```json
{
  "title": "Python Basics",
  "author": "John",
  "price": 350,
  "pages": 250
}
```

The response contains a success message and the newly created book ID.

### Update a book

- **Method:** `PUT`
- **URL:** `http://localhost:3000/books/6/`
- **Header:** `Content-Type: application/json`
- **Expected status:** `200 OK` if book ID `6` exists.

```json
{
  "title": "Python Programming",
  "author": "John",
  "price": 450,
  "pages": 300
}
```

The request body supplies all four fields for the updated record.

### Delete a book

- **Method:** `DELETE`
- **URL:** `http://localhost:3000/books/9/`
- **Expected status:** `200 OK` if book ID `9` exists.

An ID that does not exist returns `404 Not Found`.

### Test missing fields

Send a `POST` or `PUT` request without one or more of the required fields. The expected status is `400 Bad Request`.

## Screenshots

### Retrieve all books

![REST Client response for retrieving all books](./Screenshots/get-all-books.png)

### Retrieve one book

![REST Client response for retrieving a book by ID](./Screenshots/get-book-by-id.png)

### Add a book

![REST Client response for adding a book](./Screenshots/add-book.png)

### Update a book

![REST Client response for updating a book](./Screenshots/update-book.png)

### Delete a book

![REST Client response for deleting a book](./Screenshots/delete-book.png)

### Database view

![SQLite database table view](./Screenshots/books-database.png)

## Problems Faced and Solutions

| Problem faced | Solution |
| --- | --- |
| Installing and configuring SQLite with Node.js. | Installed the required packages and configured the database connection. |
| Errors while testing CRUD endpoints. | Corrected API routes, request parameters, HTTP methods, and SQL queries. |
| GitHub push errors due to an incorrect remote URL. | Verified the Git remote URL and configured the correct repository. |
| Render deployment configuration issues. | Set the root directory to `lab-02` and configured the build and start commands. |
| SQLite native module compatibility issues on Render. | Updated the SQLite dependency and attempted to rebuild the native module from source. |

## Learning Outcomes

- Created and configured an SQLite database using Node.js.
- Connected an Express.js application to an SQLite database.
- Implemented CRUD operations using `GET`, `POST`, `PUT`, and `DELETE`.
- Executed SQL queries and managed database records.
- Tested API endpoints using VS Code REST Client.
- Gained experience deploying a backend application using GitHub and Render.
- Practiced debugging database and deployment issues.
