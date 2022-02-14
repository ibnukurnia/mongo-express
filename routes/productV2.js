const routeV2 = require("express").Router();
const controller = require("../controllers/productsV2");
const imgUpload = require("../middleware/uploadImg");

routeV2.get("/", controller.getProducts);
routeV2.post("/", imgUpload, controller.storeProduct);
routeV2.get("/:id", controller.findProduct);
routeV2.patch("/:id", imgUpload, controller.updateProduct);
routeV2.delete("/:id", controller.deleteProduct);

module.exports = routeV2;
