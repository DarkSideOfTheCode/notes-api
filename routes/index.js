const notes = require('./notes');

const createRoutes = (router) => {
  notes(router);
};

module.exports = createRoutes;
