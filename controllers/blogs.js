const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res, next) => {
  try {
    Blog.find({}).then((blogs) => {
      res.json(blogs);
    });
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get("/:id", (req, res, next) => {
  try {
    Blog.findById(req.params.id).then((blog) => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).end();
      }
    });
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
