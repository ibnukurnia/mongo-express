const routeV1 = require("express").Router();
const controller = require("../controllers/productsV1");

routeV1.get("/", controller.getProducts);
routeV1.get("/:id", controller.findProduct);
routeV1.post("/", controller.storeProduct);
routeV1.patch("/:id", controller.updateProduct);
routeV1.delete("/:id", controller.deleteProduct);

module.exports = routeV1;
