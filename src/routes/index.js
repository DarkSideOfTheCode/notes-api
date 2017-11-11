const notes = require('./notes');

const createRoutes = (params) => {
  notes(params);
};

module.exports = createRoutes;
