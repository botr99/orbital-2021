## Usage (for development)

Create a `.env` in the api directory, and set `DB_URI` to be the
connection uri that mongoDB will connect to.

From the api directory, execute the following commands to populate
the mongoDB database.

```bash
npm install
cd seeds/
node index.js
```

Next, run the server using this command:

```bash
npm run devstart
```
