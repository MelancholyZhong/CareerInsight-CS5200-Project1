let express = require("express");
let router = express.Router();

const { addUser } = require("../db/dbConnector_Sqlite.js");

/* GET home page. */
router.get("/add", async function (req, res) {
  res.render("userForm", { title: `Add a user`, user: null });
});

router.post("/add", async function (req, res) {
  const user = await addUser(req.body.name, req.body.school);
  res.render("userForm", { title: `Add a user`, user });
});

module.exports = router;
