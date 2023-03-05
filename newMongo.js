const mongoose = require("mongoose");

const url = `mongodb+srv://btntazo:igVQLvfX9xjCMgCL@cluster0.lj790ba.mongodb.net/testBlogApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const Category = mongoose.model("Category");
console.log(Category)
