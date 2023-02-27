import express from "express";

let router = express.Router();

router.get("/", function (req, res) {
  return res.json({ status: "green" });
});

export default router;
