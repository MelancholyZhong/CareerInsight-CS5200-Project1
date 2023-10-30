let express = require("express");
let router = express.Router();

const { getPositions } = require("../db/dbConnector_Sqlite.js");

/* GET home page. */
router.get("/:title", async function (req, res) {
  const positions = await getPositions(req.params.title);
  console.log(`get positions of ${req.params.title}`, positions.length);
  res.render("position", { title: `All ${req.params.title}`, positions });
});

module.exports = router;
