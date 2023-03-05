const mongoose = require("mongoose");

const url = `mongodb+srv://btntazo:igVQLvfX9xjCMgCL@cluster0.lj790ba.mongodb.net/testBlogApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const categorySchema = new mongoose.Schema({
  _id: String,
  path: String,
});

const Category = mongoose.model("Category", categorySchema);

const category = new Category({
  _id: "dbm",
  path: ",Books,Programming,Databases,",
});
const funqcia = async () => {
  // const data = await Category.find().sort({ path: 1 });
  const data = await Category.find({ path: /,Programming,/ })
  console.log(data);
  mongoose.connection.close();
};

funqcia();
// category.save().then((result) => {
//   console.log("category saved!");
//   mongoose.connection.close();
// });

// const raghaca = await Category.aggregate([
//     {
//       $match: {
//         _id: "Programming",
//       },
//     },
//     {
//       $lookup: {
//         from: "Category",
//         let: {
//           parent: "$_id",
//         },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $eq: ["$$parent", "$parent"],
//               },
//             },
//           },
//           {
//             $lookup: {
//               from: "Category",
//               localField: "_id",
//               foreignField: "parent",
//               as: "children",
//             },
//           },
//         ],
//         as: "children",
//       },
//     },
//   ]);
// console.log(await raghaca);
// for await (const doc of raghaca) {
//   console.log('adasda');
// }
