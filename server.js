require("dotenv").config();
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
