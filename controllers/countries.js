const countriesRouter = require("express").Router();
const Country = require("../models/countries");

countriesRouter.get("/", async (req, res) => {
  const blogs = await Country.find({});
  res.json(blogs);
});

countriesRouter.post("/", async (req, res) => {
  const body = req.body;
  const newCountry = new Country({
    name: body.name,
  });
  const savedCountry = await newCountry.save();
  res.json(savedCountry.toJSON());
});
module.exports = countriesRouter;
