const mongoose = require('mongoose');
const createNotesModel = require('./notes');

const createModels = () => {
  const db = mongoose.createConnection(`${process.env.DATABASE_HOST}${process.env.DATABASE_NAME}`);
  createNotesModel(db);


  return db;
};

module.exports = createModels;
