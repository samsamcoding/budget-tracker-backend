const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required."],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    // required: [true, 'Password is required']
  },
  mobileNo: {
    type: String,
    // required: [true, 'Mobile number is required.']
  },
  avatar: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  loginType: {
    type: String,
    required: [true, "Login type is required."],
  },
  balance: {
    type: Number,
    default: 0,
  },
  categories: [
    {
      categoryIcon: {
        type: String,
        required: [true, "Category icon is required"],
      },
      categoryType: {
        type: String,
        required: [true, "Category type is required."],
      },
      categoryName: {
        type: String,
        required: [true, "Category name is required."],
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  ],
  records: [
    {
      dateCreated: {
        type: String,
      },
      categoryType: {
        type: String,
        required: [true, "Category type is required."],
      },
      categoryName: {
        type: String,
        required: [true, "Category name is required."],
      },

      categoryIcon: {
        type: String,
        required: false,
      },
      amount: {
        type: Number,
        required: [true, "Amount is required."],
      },

      description: {
        type: String,
        required: [true, "Description is required."],
      },
      createdOn: {
        type: Date,
        default: new Date(),
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      debit: {
        type: Number,
        default: 0,
      },
      credit: {
        type: Number,
        default: 0,
      },

      transactionBalance: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
