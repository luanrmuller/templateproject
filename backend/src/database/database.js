const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const dbPort = process.env.DB_PORT || 27017;
const dbUrl = process.env.MONGO_NAME || "localhost";
var dbCollection = process.env.DB_COLLECTION || "dev";

dbCollection = process.env.NODE_ENV === "test" ? "test" : dbCollection;

class Connection {
  constructor() {
    const url =
      process.env.MONGODB_URI || `mongodb://${dbUrl}:${dbPort}/${dbCollection}`;
    console.log("Establish new connection with url", url);
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(url);
  }
}

module.exports = new Connection();



  
// const mongoose = require("mongoose");

// const port = process.env.PORT || 3000;
// const dbPort = process.env.DB_PORT || 27017;
// const dbUrl = process.env.MONGO_NAME || "localhost";
// var dbCollection = process.env.DB_COLLECTION || "dev";

// dbCollection = process.env.NODE_ENV === "test" ? "test" : dbCollection;

// mongoose
//   .connect(`mongodb://${dbUrl}/${dbCollection}`, { useNewUrlParser: true })
//   .then(_ => console.log("MongoDB connection success"))
//   .catch(err => console.error(err));
// mongoose.set("useCreateIndex", true);