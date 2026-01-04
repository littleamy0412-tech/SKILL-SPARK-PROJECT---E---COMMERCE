const router = require("express").Router();
const create = require("./controller/__create__.js");
const login = require("./controller/__login__.js");

router.post("/create", create.v, create.c);
router.post("/login", login.v, login.l);

module.exports = router;
