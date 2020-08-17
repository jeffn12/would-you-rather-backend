var express = require("express");
var router = express.Router();

/* GET questions listings. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

/* POST a question. */
router.post("/", (req, res, next) => {
  res.send("respond with a resource");
});

/* DELETE a question listing. */
router.delete("/", (req, res, next) => {
  res.send("respond with a resource");
});

module.exports = router;
