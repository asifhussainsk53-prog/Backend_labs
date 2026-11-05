# Lab 1: Node.js and Express Server

**Subject:** Backend Development Fundamentals  
**Year/Term:** Year II, Term II  
**University:** Aurora Deemed to be University  
**Faculty:** Mr. Joel Prashanth D

| Student detail | Value |
| --- | --- |
| Name | Shaik Asif Hussain |
| Registration number | 252U1R9144 |
| Section | S-26 |

## Project Overview

This Lab 1 project demonstrates a small Node.js backend built with Express.js. It covers HTTP route handling, text and JSON responses, current date and time generation, and a not-found response for unknown routes. The same application can run locally or on Render.

## Technologies Used

- Node.js
- Express.js (`^5.3.0`)
- npm
- JavaScript using CommonJS modules

## Project Structure

```text
lab-01/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── server.js
└── Screenshots/
    ├── about.png
    ├── error.png
    ├── home.png
    └── time.png
```

`node_modules/` is created locally by npm and excluded from Git.

The application provides these routes:

| Method | Path | Response |
| --- | --- | --- |
| GET | `/` | `Welcome to my server!` |
| GET | `/about` | JSON object with `name` and `section` values |
| GET | `/time` | Current date and time as a string |
| Any | Other paths | HTTP 404 with `Page Not Found` |

## Prerequisites

- Node.js 18 or later
- npm (included with Node.js)

## Installation and Setup

From the project root, install the dependencies declared in `package.json` and locked in `package-lock.json`:

```bash
npm install
```

## Running the Application Locally

Start the application with:

```bash
npm start
```

By default, it listens at `http://localhost:3000`. The server uses the `PORT` environment variable when provided and falls back to port 3000.

To run on another port in PowerShell:

```powershell
$env:PORT=4000
npm start
```

To check the JavaScript syntax, run:

```bash
npm test
```

## Live Deployment

The application is live at:

**[https://lab-report-1.onrender.com/](https://lab-report-1.onrender.com/)**

The deployed root route returns the welcome message. The `/about` and `/time` routes are also available.

## Render Deployment Configuration

Configure the Render Web Service with:

- Runtime: Node
- Branch: `main`
- Root Directory: leave blank (the Node.js application is at the repository root)
- Build Command: `npm install`
- Start Command: `npm start`

Render supplies the `PORT` environment variable at runtime. This project does not require other environment variables, a database, or additional services.

## GitHub Repository

The source repository is:

**[https://github.com/asifhussainsk53-prog/lab_report_1](https://github.com/asifhussainsk53-prog/lab_report_1)**

Clone it and install dependencies to work locally:

```bash
git clone https://github.com/asifhussainsk53-prog/lab_report_1.git
cd lab_report_1
npm install
```

## Learning Outcomes

- Set up a Node.js project and manage its dependency with npm.
- Create an Express application and implement GET routes.
- Return text and JSON responses and generate the current date and time.
- Handle unknown routes with an HTTP 404 response.
- Configure an application to use a hosting platform's assigned port.
- Prepare and document a Node.js application for Render deployment.
