const mongoose = require("mongoose");



const url = `mongodb+srv://btntazo:igVQLvfX9xjCMgCL@cluster0.lj790ba.mongodb.net/testBlogApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: "tazikas blogs",
  author: 'tazika',
  url: 'jandabamdec gza ar gqonia',
  likes: 100
});

blog.save().then((result) => {
  console.log("blog saved!");
  mongoose.connection.close();
});
