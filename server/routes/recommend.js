const express = require("express");
const router = express.Router();
const Career = require("../models/Career");

router.post("/", async (req, res) => {
  const { interest, skills, salary, worktype, location } = req.body;
  console.log(req.body);
  const results = await Career.find({
    // tags: { $in: [interest, skills] },
    salary,
    worktype,
    location,
  }).limit(5);
  res.json(results);
});

router.get("/", async (req, res) => {
  //const { interest, skills } = req.body;
  const results = await Career.find();
  res.json(results);
});

module.exports = router;
