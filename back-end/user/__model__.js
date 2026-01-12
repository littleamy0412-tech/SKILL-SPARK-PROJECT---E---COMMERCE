const { model, Schema } = require("mongoose");

const userDetailsSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      default: "",
    },
    bio: {
      type: String,
      maxLength: [500, "Bio cannot exceed 500 characters"],
      default: "",
    },
    profile_pic: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
      trim: true,
      default: ""
    },
    address: {
      street: {
        type: String,
        trim: true,
        default: "",
      },
      city: {
        type: String,
        trim: true,
        default: "",
      },
      country: {
        type: String,
        trim: true,
        default: "",
      },
      zipCode: {
        type: String,
        trim: true,
        match: [/^\d{5,10}(?:[-\s]\d{4})?$/, "Please enter a valid zip code"],
        default: "",
      },
    },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [3, "Username must at least be 3 characters long"],
      maxLength: [
        255,
        "Characters Limit reached. Username length must be less than or equal to 255",
      ],
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be atleast be of 8 characters or more"],
      // select: false,
    },
    details: {
        type:userDetailsSchema,
        default: () => ({})
    },
  },
  { timestamps: true }
);

// userSchema.methods.comparePassword = async function (plainPasword) {
//     return await require('bcrypt').compare(plainPasword, this.password)
// }

// userSchema.methods.sayHi = function () {
//     return
// }

module.exports = model("user", userSchema);
