# Express.js backend

## Developer Usage

Follow Steps 1 to 3 below to get the server running.

Follow all steps to run the tests.

### 1. Install the required dependencies

```bash
npm install
```

### 2. Set up the environment variables

Create a `.env` file in the same directory, and include the following keys with the corresponding values:

- DB_URI_DEV=MONGODBATLASURI
- secret=INSERTYOURSECRETKEY

`DB_URI_DEV` is the URI connection string needed to connect to a MongoDB database. `secret` is the secret key for JWT authentication.

### 3. Run the server

Execute `npm run devstart` to run the server.

### 4. Additional set up of environment variables

Some optional keys that are used for production and testing purposes can be included, but are not required for the app to run in development:

- DB_URI_TEST=MONGODBATLASURI2
- DB_URI_PRODUCTION=MONGODBATLASURI3

`DB_URI_TEST` and `DB_URI_PRODUCTION` are similar to `DB_URI_DEV` except that the connection strings are different. It is best to use 3 different MongoDB databases for development, production and testing so that data stored is not affected.

### 5. (Optional) Set up email integration

Uncomment the following block of code in `utils/mailer/mailer.js`:

```bash
try {
  await transporter.sendMail(mailOptions);
} catch (err) {
  console.log(err);
}
```

Next, include the following environment variables in the `.env` file:

- MAILTRAP_USER=FROMMAILTRAPACCOUNT
- MAILTRAP_PASS=FROMMAILTRAPACCOUNT
- MAILTRAP_API_TOKEN=FROMMAILTRAPACCOUNT
- MAILTRAP_INBOX_ID=FROMMAILTRAPACCOUNT

Refer to the [Mailtrap guide](https://help.mailtrap.io/article/12-getting-started-guide#send-to-Mailtrap) to set up a Mailtrap account. Under `Option 2` in the guide, copy the username and password to `MAILTRAP_USER` and `MAILTRAP_PASS` respectively.

`MAILTRAP_API_TOKEN` and `MAILTRAP_INBOX_ID` are used for testing in `utils/mailer/mailer.test.js`. Refer to the [Mailtrap guide](https://help.mailtrap.io/article/12-getting-started-guide#API) to obtain the values required.

### 6. Run the tests

To run all the tests, execute `npm test`.

Currently, tests have been written to test the following functionality:

- All Express middleware functions, located in the `middleware` folder. Unit tests are stored under each function's folder.

- Login and signup routes. The integration tests are stored in `routes/api/user/user.test.js`.

- Sending email in a development environment via Mailtrap. The test is stored in `utils/mailer/mailer.test.js`. For the test to pass, email integration should be set up by following Step 5.
