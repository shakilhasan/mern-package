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
const fetch = require('node-fetch');
const redis = require('redis');


const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

// Set response
function setResponse(username, repos) {
  return `<h2>${username} has ${repos} Github repos</h2>`;
}

// Make request to Github for data
async function getRepos(req, res, next) {
  try {
    console.log('Fetching Data...');

    const { username } = req.params;
    console.log("username-------",username)

    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    const repos = data.public_repos;

    // Set data to Redis
    client.setex(username, 3600, repos);

    res.send(setResponse(username, repos));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

// Cache middleware
function cache(req, res, next) {
  const { username } = req.params;

  client.get(username, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  });
}
const searchHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
};

app.get('/repos/:username', cache, getRepos);
router.get("/detail", getByIdHandler);
router.post(
  "/create", saveHandler
);
router.put("/update", updateHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);

module.exports = router;
