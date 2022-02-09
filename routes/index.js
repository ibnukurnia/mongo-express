const routes = require("express").Router();
const controller = require("../controllers/products");

routes.get("/", controller.getProducts);
routes.post("/", controller.storeProduct);
routes.get("/:id", controller.findProduct);
routes.patch("/:id", controller.updateProduct);
routes.delete("/:id", controller.deleteProduct);

module.exports = routes;
