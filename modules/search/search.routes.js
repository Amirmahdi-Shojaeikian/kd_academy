const express = require('express');
const searchController = require("./search.controller")

const router = express.Router();

router.route("/:keyword").get(searchController.get)


module.exports = router