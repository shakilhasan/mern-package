/* eslint-disable no-undef */
const express = require("express");
const { getQuery } = require("./service");
const {
  getByIdHandler,
  saveHandler,
  updateHandler,
  searchHandler: baseSearchHandler,
  countHandler: baseCountHandler,
  deleteHandler,
} = require("../../core/controller");

const router = express.Router();

const searchHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
};

router.get("/detail", getByIdHandler);
router.post(
  "/create", saveHandler
);
router.put("/update", updateHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);

module.exports = router;
