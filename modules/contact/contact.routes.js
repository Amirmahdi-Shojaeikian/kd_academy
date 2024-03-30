const express = require('express');
const contactsController = require("./contact.controller")
const {authToken, auth} = require('../../utils/middlewares/auth');
const isAdminMiddleware = require("../../utils/middlewares/isAdmin")

const router =express.Router();

router.route("/")
    .get(authToken,isAdminMiddleware,contactsController.getAll)
    .post(contactsController.create)

router.route("/:id").delete(authToken,isAdminMiddleware,contactsController.remove)

router.route("/answer").post(authToken,isAdminMiddleware,contactsController.answer)


module.exports = router