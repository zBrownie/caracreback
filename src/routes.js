const { Router } = require("express");
const UserController = require("./controllers/user_controller");
const User = require("./models/User");
const routes = Router();

routes.get("/", UserController.index);
routes.put("/userdata/:email", UserController.updateUserInfo);
routes.post("/", UserController.store);
routes.put("/user/:email", UserController.update);

module.exports = routes;
