const compose = require('lodash/fp/compose');

const getNoteModel = db => db.model('Note');

const saveNote = note => new Promise((resolve, reject) => {
  note.save((err) => {
    if (err) {
      return reject(err);
    }

    return resolve(note);
  });
});

const newNote = ({ title, description }) => (Note) => {
  const note = new Note({
    title,
    description,
  });

  return saveNote(note);
};

const editNote = (id, { title, description }) => Note => new Promise((resolve, reject) => {
  Note.findById(id, (err, note) => {
    if (err) {
      return reject(err);
    }

    note.title = title;
    note.description = description;
    note.updatedAt = Date.now();

    return resolve(saveNote(note));
  });
});


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
 * Edits an existing Note and saves it in DB
 * @param  {MongooseConnection} db
 * @param  {String} id
 * @param  {Object} params
 * @return {Promise}
 */
const updateNote = (db, id, params) => compose(
  // 2. Update the new Note.
  editNote(id, params),
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
  updateNote,
  createNote,
};
