const express = require("express");
const ticketsController = require("./ticket.controller")
const {authToken, auth} = require('../../utils/middlewares/auth');
const isAdminMiddleware = require("../../utils/middlewares/isAdmin")
const { ticketValidator } = require('../../utils/validation/ticket.validator');
const validate = require('../../utils/middlewares/validate');
const multer = require('./../../utils/middlewares/multer');

const router = express.Router();

router
  .route("/")
  .post(authToken,ticketValidator(),validate, ticketsController.create)
  .get(authToken, ticketsController.getAll);

router
  .route("/department")
  .post(authToken,isAdminMiddleware,ticketsController.createDepartment)
  .get(authToken, ticketsController.getAllDepartment);

router
  .route("/department/:id/subdepartment")
  .post(authToken,isAdminMiddleware,ticketsController.createSubDepartment)
  .get(authToken,ticketsController.getSubDepartment)

router.route("/user").get(authToken,ticketsController.userTicket);
router.route("/answer").post(authToken, isAdminMiddleware, ticketsController.setAnswer);
router.route("/:id/answer").get(authToken, ticketsController.getAnswer);


module.exports = router