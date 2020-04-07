const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
