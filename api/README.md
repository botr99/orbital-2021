## Usage (for development)

Open up `package.json`, find the `"scripts"` section of the file,
and replace the value for `"serverstart"` to

`"DEBUG=express-locallibrary-tutorial:* npm run devstart"`
on Linux and macOS

or `"SET DEBUG=express-locallibrary-tutorial:* & npm run devstart"`
on Windows.

Next, run the following on the command line:

```bash
npm install
npm run devstart
```

Open up http://localhost:5000/ in the browser.
