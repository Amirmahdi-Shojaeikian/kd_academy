const express = require('express');
const articlesController = require("./articles.controller")
const {authToken, auth} = require('../../utils/middlewares/auth');
const isAdminMiddleware = require("../../utils/middlewares/isAdmin")
const { articleValidator } = require('../../utils/validation/articles.validator');
const validate = require('../../utils/middlewares/validate');
const multer = require('./../../utils/middlewares/multer');


const router = express.Router();


router.route("/")
    .get(authToken,isAdminMiddleware,articlesController.getAll)
    .post(authToken,isAdminMiddleware,multer.single("cover"),articleValidator(),validate
          ,articlesController.create)

router.route("/:id")
    .delete(authToken,isAdminMiddleware,articlesController.remove)
    .put(authToken,isAdminMiddleware,articlesController.update)


module.exports = router