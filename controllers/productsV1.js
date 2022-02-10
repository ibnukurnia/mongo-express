const { ObjectId } = require("mongodb");
const { db } = require("../dbConfig");

const collection = db.collection("products");

exports.getProducts = async (req, res) => {
  try {
    const products = await collection.find().toArray();

    res.status(200).send(products);
  } catch (error) {
    console.log(error.message);
  }
};

exports.findProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await collection.findOne({ _id: ObjectId(id) });

    if (!product) return res.status(404).send("not found");

    res.status(200).send(product);
  } catch (error) {
    console.log(error.message);
  }
};

exports.storeProduct = async (req, res) => {
  const { product_name, price } = req.body;
  let { stock, status } = req.body;
  try {
    if (!product_name || !price) return res.status(400).send("field cannot be empty");

    if (!stock) stock = 1;

    if (!status) status = false;

    const product = await collection.insertOne({ product_name, price, stock, status });

    res.status(201).json({
      msg: "product created",
      product,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  //   const { product_name, price, stock, status } = req.body;

  try {
    const product = await collection.findOne({ _id: ObjectId(id) });

    if (!product) return res.status(404).send("not found");

    await collection.updateOne(
      {
        _id: ObjectId(product._id),
      },
      { $set: req.body }
    );

    res.status(200).send(`product with id : ${product._id} updated`);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await collection.findOne({ _id: ObjectId(id) });
    if (!product) return res.status(404).send("not found");

    await collection.deleteOne({ _id: ObjectId(product._id) });

    res.status(200).send(`product with id : ${product._id} deleted`);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};
