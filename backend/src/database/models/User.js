const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const bcrypt = require("bcryptjs");
const PermissionLevel = require("../../utils/EPermissionLevel");

class User {
  initSchema() {
    const schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 1,
        unique: "Two users cannot share the same name ({VALUE})",
        trim: true
      },
      login: {
        type: String,
        required: true,
        minlength: 1,
        // unique: "Two users cannot share the same login ({VALUE})",
        unique: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
      },
      permissionLevel: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

    schema.pre("save", function(next) {
      let user = this;

      if (!user.isModified("password")) {
        return next();
      } else {
      }

      bcrypt
        .genSalt(12)
        .then(salt => {
          return bcrypt.hash(user.password, salt);
        })
        .then(hash => {
          user.password = hash;
          next();
        })
        .catch(err => {
          console.log(err);
          next(err);
        });
    });

    schema.plugin(uniqueValidator);
    schema.plugin(beautifyUnique, {
      defaultMessage: "This custom message will be used as the default"
    });

    const User = mongoose.model("User", schema);

    User.on("index", async err => {
      if (err) {
        console.error("Indexes could not be created:", err);
        return;
      }

      // Create two conflicting documents
      const admin = new User({
        name: "admin",
        login: "admin",
        password: "12345678",
        permissionLevel: PermissionLevel.ADMIN.getValue()
      });

      const suporte = new User({
        name: "suporte",
        login: "suporte",
        password: "12345678",
        permissionLevel: PermissionLevel.SUPORTE.getValue()
      });

      await mongoose
        .model("User")
        .findOne({ login: admin.login })
        .then(i => {
          if (!i) {
            admin
              .save()
              .then(() => console.log("Success saving admin!"))
              .catch(err => console.error("admin could not be saved: ", err));
          }
        });

      await mongoose
        .model("User")
        .findOne({ login: suporte.login })
        .then(i => {
          if (!i) {
            suporte
              .save()
              .then(() => console.log("Success saving suporte!"))
              .catch(err => console.error("suporte could not be saved: ", err));
          }
        });
    });
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("User");
  }
}

module.exports = User;
