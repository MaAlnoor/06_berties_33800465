# Berties Books

Sample code for Dynamic Web Applications module.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js


# Dotenv

Install dotenv:

npm install dotenv


Create a .env file in the project root and add the database configuration:

DB_HOST=localhost
DB_USER=berties_books_app
DB_PASSWORD=your_password_here
DB_NAME=berties_books


Add .env to .gitignore so it is never committed to GitHub.

In index.js, dotenv is loaded using:

require('dotenv').config();


All database credentials are now accessed securely using:

process.env.DB_HOST
process.env.DB_USER
process.env.DB_PASSWORD
process.env.DB_NAME