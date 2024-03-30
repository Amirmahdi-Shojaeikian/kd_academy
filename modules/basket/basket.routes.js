const express = require("express");
const basketController = require("./basket.controller");
const { authToken, auth } = require("../../utils/middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(authToken, basketController.getBasket)
  .post(authToken, basketController.add);

router.route("/:id/finished").post(authToken, basketController.finished);

router.route("/:idBasket").put(basketController.update);

router.route("/:idProduct/remove").delete(basketController.removeOne);

module.exports = router;
