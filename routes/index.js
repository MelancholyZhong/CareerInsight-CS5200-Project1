let express = require("express");
let router = express.Router();

const { getCompanies } = require("../db/dbConnector_Sqlite.js");

/* GET home page. */
router.get("/", async function (req, res) {
  const companies = await getCompanies();
  console.log("route / called  -  companies.length", companies.length);
  res.render("index", { title: "All companies", companies });
});

module.exports = router;
