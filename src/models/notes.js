const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongooseDelete = require('mongoose-delete');

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
  });
  noteSchema.plugin(timestamps);
  noteSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
  });

  db.model('NoteType', noteTypeSchema);
  db.model('Note', noteSchema);
};

module.exports = createNotesModel;
