const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});
productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.startDate = returnedObject.startDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    returnedObject.endDate = returnedObject.endDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    delete returnedObject._id;
    delete returnedObject.category;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Product", productSchema);
