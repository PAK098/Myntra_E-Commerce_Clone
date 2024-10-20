const mongoose = require("mongoose");
const { Schema } = mongoose;

// const addressSchema = new Schema({
//   pincode: {
//     type: Number,
//     required: true,
//   },
//   street: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//     minLength: 10,
//     maxLength: 10,
//   },
// });
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 16,
  },
  lastName: {
    type: String,
    maxLength: 16,
  },
  cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  age: {
    type: Number,
    min: 12,
    max: 100,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        // Regular expression to validate email format
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  token: String,
  // address: addressSchema, // Embedding the address schema
});
exports.User = mongoose.model("User", userSchema);
