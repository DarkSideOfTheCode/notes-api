const {
  getNotes,
  createNote,
  updateNote,
} = require('../controllers/notes');

const handleError = ctx => err => ctx.throw(500, err);

const sendNote = (ctx, next) => (note) => {
  ctx.body = { note };
  return next();
};

const sendNotes = (ctx, next) => (notes) => {
  ctx.body = { notes };
  return next();
};

const createNoteRoutes = ({ router, db }) => {
  /**
   * Get All notes
   */
  router.get('/notes', (ctx, next) => getNotes(db)
    .then(sendNotes(ctx, next))
    .catch(handleError(ctx)));

  /**
   * Update an existing note
   */
  router.patch('/notes/:id', (ctx, next) => updateNote(db, ctx.params.id, ctx.request.body)
    .then(sendNote(ctx, next))
    .catch(handleError(ctx)));

  /**
   * Create a new note
   */
  router.post('/notes', (ctx, next) => createNote(db, ctx.request.body)
    .then(sendNote(ctx, next))
    .catch(handleError(ctx)));
};

module.exports = createNoteRoutes;
