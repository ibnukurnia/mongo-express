const routeV2 = require("express").Router();
const controller = require("../controllers/productsV2");

routeV2.get("/", controller.getProducts);
routeV2.post("/", controller.storeProduct);
routeV2.get("/:id", controller.findProduct);
routeV2.patch("/:id", controller.updateProduct);
routeV2.delete("/:id", controller.deleteProduct);

module.exports = routeV2;
