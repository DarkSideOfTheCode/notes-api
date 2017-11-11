const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;
const {
  ObjectId,
} = Schema;

const createNotesModel = (db) => {
  const noteTypeSchema = new Schema({
    id: ObjectId,
    name: String,
  });

  const noteSchema = new Schema({
    id: ObjectId,
    noteTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NoteType',
    },
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: Date.now },
  });

  db.model('NoteType', noteTypeSchema);
  db.model('Note', noteSchema);
};

module.exports = createNotesModel;
