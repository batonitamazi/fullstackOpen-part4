const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get("/:id", (req, res) => {
  Blog.findById(req.params.id).then((blog) => {
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  });
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = req.user;
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.json(savedBlog.toJSON());
});
blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const user = req.user;
  if (!body.likes) {
    body.likes = 0;
  }
  const blog = await Blog.findById(req.params.id);
  if (blog.user._id.toString() === user._id.toString()) {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.json(updatedBlog.toJSON());
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});
blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);
  if (blog.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    return res.status(401).json({ error: "Unauthorized request" });
  }
});

module.exports = blogsRouter;
