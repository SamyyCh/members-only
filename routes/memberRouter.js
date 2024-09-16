// routes/movieRouter.js
const { Router } = require("express");
const membersController = require("../controllers/membersController");
const memberRouter = Router();

memberRouter.get("/");

module.exports = memberRouter;
