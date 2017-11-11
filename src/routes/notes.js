const createNoteRoutes = ({ router, db }) => {
  const Note = db.model('Note');

  router.get('/notes', (ctx, next) =>
    Note.find({}, (err, notes) => {
      if (err) {
        return ctx.throw(500, err);
      }
      ctx.body = { notes };
      return next();
    }));

  router.post('/notes', (ctx, next) => {
    const {
      title,
      description,
    } = ctx.request.body;

    const note = new Note({
      title,
      description,
    });

    return note.save((err) => {
      if (err) {
        return ctx.throw(500, err);
      }
      ctx.body = { note };
      return next();
    });
  });
};

module.exports = createNoteRoutes;
