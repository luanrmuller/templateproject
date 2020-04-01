const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const dbPort = process.env.DB_PORT || 27017;
const dbUrl = process.env.MONGO_NAME || "localhost";
var dbCollection = process.env.DB_COLLECTION || "dev";

dbCollection = process.env.NODE_ENV === "test" ? "test" : dbCollection;

mongoose
  .connect(`mongodb://${dbUrl}/${dbCollection}`, { useNewUrlParser: true })
  .then(_ => console.log("MongoDB connection success"))
  .catch(err => console.error(err));
mongoose.set("useCreateIndex", true);
