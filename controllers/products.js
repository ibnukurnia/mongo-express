const Products = require("../models/Products");

exports.getProducts = async (req, res) => {
  try {
    const product = await Products.find();

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

exports.findProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findOne({ _id: id });

    if (!product) return res.status(404).send("not found");
    console.log(product);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

exports.storeProduct = async (req, res) => {
  const { product_name, price, stock, status } = req.body;

  try {
    if (!product_name || !price) return res.status(400).send("field cannot be empty");

    const product = await Products.create({ product_name, price, stock, status });

    res.status(201).json({
      msg: "product created!",
      product,
    });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, price, stock, status } = req.body;

  try {
    const product = await Products.findOne({ _id: id });

    if (!product) return res.status(404).send("not found");

    await Products.updateOne(
      {
        _id: product._id,
      },
      { product_name, price, stock, status }
    );

    res.status(200).send(`product with id : ${product._id} updated`);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findOne({ _id: id });
    if (!product) res.status(404).send("not found");

    await Products.deleteOne({ _id: id });

    res.status(200).send(`product with id : ${product._id} deleted`);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};
