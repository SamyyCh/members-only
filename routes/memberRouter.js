const { Router } = require("express");
const membersController = require("../controllers/membersController");
const ensureAuthenticated = require("../middlewares/auth");
const memberRouter = Router();

memberRouter.get("/", membersController.renderIndex);
memberRouter.get("/sign-up", membersController.getSignUp);
memberRouter.post("/sign-up", membersController.postSignUp);
memberRouter.get("/log-in", membersController.getLogin);
memberRouter.post("/log-in", membersController.postLogin);
memberRouter.get("/members", ensureAuthenticated, membersController.renderMembers);
memberRouter.get("/log-out", membersController.logOut);
memberRouter.get("/new-message", membersController.getMessage);
memberRouter.post('/new-message', membersController.postMessage);
memberRouter.post("/delete/:id", membersController.deleteMessage);

module.exports = memberRouter;
