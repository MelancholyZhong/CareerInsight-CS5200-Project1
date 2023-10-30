let express = require("express");
let router = express.Router();

const { addInterest, deleteInterest } = require("../db/dbConnector_Sqlite.js");

/* GET home page. */
router.get("/add", async function (req, res) {
  res.render("interestForm", {
    action: "/interest/add",
    title: `Add a Interest for User`,
    interest: null,
    error: null,
  });
});

router.post("/add", async function (req, res) {
  const errorMessage = `"${req.body.name}" or "${req.body.category}" does not exist or the interest already exist!`;
  const interest = await addInterest(req.body.name, req.body.category);
  res.render("interestForm", {
    action: "/interest/add",
    title: `Add a Interest for User`,
    interest,
    error: interest ? null : errorMessage,
  });
});

router.get("/delete", async function (req, res) {
  res.render("interestForm", {
    action: "/interest/delete",
    title: `Delete a Interest for User`,
    interest: null,
    error: null,
  });
});

router.post("/delete", async function (req, res) {
  const errorMessage = `"${req.body.name}" or "${req.body.category}" does not exist`;
  const interest = await deleteInterest(req.body.name, req.body.category);
  res.render("interestForm", {
    action: "/interest/delete",
    title: `Delete a Interest for User`,
    interest,
    error: interest ? null : errorMessage,
  });
});

module.exports = router;
