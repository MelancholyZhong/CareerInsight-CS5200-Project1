let express = require("express");
let router = express.Router();

const { updateSalary } = require("../db/dbConnector_Sqlite.js");

/* GET home page. */
router.get("/", async function (req, res) {
  res.render("salaryForm", {
    title: `Update a salary`,
    position: null,
    error: null,
  });
});

router.post("/", async function (req, res) {
  const errorMessage = `"${req.body.positionId}" does not exist`;
  const position = await updateSalary(req.body.positionId, req.body.salary);
  res.render("salaryForm", {
    title: `Update a salary`,
    position,
    error: position.length ? null : errorMessage,
  });
});

module.exports = router;
