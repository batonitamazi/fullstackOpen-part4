const categoriesRouter = require("express").Router();
const Category = require("../models/categories");

categoriesRouter.get("/", async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

categoriesRouter.post("/", async (req, res) => {
  const body = req.body;
  const newCategory = new Category({
    code: body.code,
    name: body.name,
    children: [...body.children],
    parent: body.parent,
  });
  const savedCategory = await newCategory.save();
  res.json(savedCategory.toJSON());
});

categoriesRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const code = req.params.id;
  const category = await Category.find({ code: code });
  if (category) {
    const categoryToUpdate = {
      code: body.code,
      name: body.name,
      children: [...body.children],
      parent: body.parent,
    };
    const updatedCategory = await Category.findOneAndUpdate(
      { code: code },
      categoryToUpdate,
      {
        new: true,
      }
    );
    return res.json(updatedCategory.toJSON());
  } else {
    return res.status(401).json({ error: "raghaca erroria" });
  }
});
module.exports = categoriesRouter;
