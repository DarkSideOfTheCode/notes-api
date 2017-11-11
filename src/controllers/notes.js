const compose = require('lodash/fp/compose');

const getNoteModel = db => db.model('Note');

const newNote = ({ title, description }) => (Note) => {
  const note = new Note({
    title,
    description,
  });

  return new Promise((resolve, reject) => {
    note.save((err) => {
      if (err) {
        return reject(err);
      }

      return resolve(note);
    });
  });
};

const searchNotes = Note => new Promise((resolve, reject) => {
  Note.find({}, (err, notes) => {
    if (err) {
      return reject(err);
    }

    return resolve(notes);
  });
});

/**
 * Creates a new Note and saves it in DB
 * @param  {MongooseConnection} db
 * @param  {Object} params
 * @return {Promise}
 */
const createNote = (db, params) => compose(
  // 2. Create a new Note.
  newNote(params),
  // 1. Get Note Model.
  getNoteModel,
)(db);

/**
 * Gets all Notes from DB
 * @param  {MongooseConnection} db
 * @return {Promise}
 */
const getNotes = db => compose(
  // 2. Search notes
  searchNotes,
  // 1. Get Note Model.
  getNoteModel,
)(db);

module.exports = {
  getNotes,
  createNote,
};
