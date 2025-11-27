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

# Audit

An audit logging feature was added to track all login attempts in the application. A new database table named audit_log was created to store the username, whether the attempt was successful or failed, and the time of the attempt. The login route was updated so that every successful login inserts a record with a status of "SUCCESS", and every failed login inserts a record with "FAIL".

A new route /users/audit was implemented to retrieve all the audit entries from the database and display them in a table using the audit.ejs view. This allows administrators to view the full history of login activity, including repeated failed attempts or suspicious behaviour.


I added access control to the search page, audit page, bargain books page, and add-book page so only logged-in users can access them. The About and Register pages remain public because users can not log in if they are not registered and new users would want to see what the website is about. Testing confirmed that protected pages redirect unauthenticated users to the login page, while logged-in users can access them normally.