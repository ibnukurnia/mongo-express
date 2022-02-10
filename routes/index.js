const routes = require("express").Router();
const routeV1 = require("./productV1");
const routeV2 = require("./productV2");

routes.use("/v1/products", routeV1);
routes.use("/v2/products", routeV2);

module.exports = routes;
