var mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchme = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", productSchme);
