const Products = require("../models/ProductsV2");
const { ImgUpload } = require("../middleware/uploadImg");

const fs = require("fs");

exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    products.map((product) => (product.img_url = "http://localhost:8000/" + product.img_url));

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

exports.findProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findOne({ _id: id });

    if (!product) return res.status(404).send("not found");

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

exports.storeProduct = async (req, res) => {
  const { product_name, price, stock, status } = req.body;
  const isImage = () => {
    if (!req.file) return "uploads/default.jpg";

    return req.file.path;
  };
  try {
    if (!product_name || !price) return res.status(400).send("field cannot be empty");

    const product = await Products.create({
      product_name,
      price,
      stock,
      status,
      img_url: isImage(),
    });

    res.status(201).json({
      msg: "product created!",
      product,
    });
  } catch (error) {
    res.send(400).json(error.message);
    // res.status(500).send("internal server error");
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, price, stock, status } = req.body;

  const isImage = () => {
    if (req.file) return req.file.path;
  };

  try {
    const product = await Products.findOne({ _id: id });

    if (!product) return res.status(404).send("not found");

    if (req.file) deleteImg(product.img_url);

    await Products.updateOne(
      {
        _id: product._id,
      },
      { product_name, price, stock, status, img_url: isImage() }
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
    if (!product) return res.status(404).send("not found");
    deleteImg(product.img_url);
    await Products.deleteOne({ _id: id });

    res.status(200).send(`product with id : ${product._id} deleted`);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const deleteImg = (path) => {
  if (path !== "uploads/default.jpg") fs.unlink(path, (err) => console.log(err));
};
