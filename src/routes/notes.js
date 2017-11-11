const {
  getNotes,
  createNote,
} = require('../controllers/notes');

const handleError = ctx => err => ctx.throw(500, err);

const createNoteRoutes = ({ router, db }) => {
  router.get('/notes', (ctx, next) => getNotes(db)
    .then((notes) => {
      ctx.body = { notes };
      return next();
    })
    .catch(handleError(ctx)));

  router.post('/notes', (ctx, next) => createNote(db, ctx.request.body)
    .then((note) => {
      ctx.body = { note };
      return next();
    })
    .catch(handleError(ctx)));
};

module.exports = createNoteRoutes;
