const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;
