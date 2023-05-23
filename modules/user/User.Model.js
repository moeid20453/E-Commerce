const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let saltrounds = 5;

let UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please provide a First name"],
    minlength: 3,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, "please provide a last name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  active: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, saltrounds);
  next();
});
UserSchema.post("save", async function () {
  console.log(this._id);
});
let UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
