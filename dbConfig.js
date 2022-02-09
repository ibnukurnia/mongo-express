const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mern-stack");
    console.log("connected to dbase");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnection;
