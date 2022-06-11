// load repository.js
const { name: ModelName } = require("./model");

const getQuery = (payload) => {
  const queries = [];

  if (payload.title) {
    queries.push({ title: { $regex: payload.title, $options: "i" } });
  }
  if (payload.description) {
    queries.push({ description: { $regex: payload.description, $options: "i" } });
  }
  if (payload.startingPrice) {
    queries.push({ startingPrice: parseInt(payload.startingPrice, 10) });
  }
  if (payload.duration) {
    queries.push({ duration: payload.duration });
  }
  if (payload.isMostPopular) {
    queries.push({ isMostPopular: payload.isMostPopular });
  }
  if (payload.isActive) {
    queries.push({ isActive: payload.isActive });
  }
  if (payload.cityName) {
    queries.push({ cityName: payload.cityName });
  }


  let query = {};
  if (queries.length === 1) {
    query = { ...queries[0] };
  }
  if (queries.length > 1) {
    query = { $and: queries };
  }
  return query;
};

const setupEventListeners = () => {
  // eventEmitter.on(`${modelName}Created`, (model) => {
  //   // console.log(`${modelName} created`, model);
  // });
  // eventEmitter.on(`${modelName}Updated`, (model) => {
  //   // console.log(`${modelName} updated`, model);
  // });
  // eventEmitter.on(`${modelName}Deleted`, (model) => {
  //   // console.log(`${modelName} deleted`, model);
  // });
};

setupEventListeners();

module.exports = {
  getQuery,
  modelName: ModelName,
};
