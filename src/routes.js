const { Router } = require("express");
const UserController = require("./controllers/user_controller");

const routes = Router();

routes.get("/",UserController.index);
routes.get("/user",UserController.checkout);
routes.post("/",UserController.store);

module.exports = routes;
