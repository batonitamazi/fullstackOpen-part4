const mongoose = require("mongoose");

/**
 *   id     |  name  |  children       |  parent  |
 * products    ....   agrictulure,food     null
 * ...
 */

const categorySchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  children: {
    type: [String],
  },
  parent: {
    type: String,
  },
});

categorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Category", categorySchema);
