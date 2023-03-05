const productsRouter = require("express").Router();
const Product = require("../models/products");
const Category = require("../models/categories");

productsRouter.get("/:id", async (req, res) => {
  const code = req.params.id;
  const category = await Category.findOne({ code: code });
  const products = await Product.find({ category: category });
  res.json(products);
});

productsRouter.post("/", async (req, res) => {
  const body = req.body;
  const category = await Category.findOne({ code: body.category });
  const newProduct = new Product({
    code: body.code,
    title: body.title,
    price: body.price,
    country: body.country,
    startDate: body.startDate,
    endDate: body.endDate,
    category: category.id,
  });
  const savedProduct = await newProduct.save();
  return res.json(savedProduct.toJSON());
});
productsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const category = await Category.findOne({ code: body.category });
  const newProduct = {
    code: body.code,
    title: body.title,
    price: body.price,
    country: body.country,
    startDate: body.startDate,
    endDate: body.endDate,
    category: category.id,
  };
  const updaedProduct = await Product.findByIdAndUpdate(id, newProduct, {
    new: true,
  });
  return res.json(updaedProduct.toJSON());
});

productsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const product = Product.findById(id);
  if (product) {
    await Product.findByIdAndRemove(id);
    res.status(204).end();
  } else {
    return res.status(401).json({ error: "raghaca shecdomaa" });
  }
});
module.exports = productsRouter;
