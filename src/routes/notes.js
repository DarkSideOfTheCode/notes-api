const createNoteRoutes = ({ router, db }) => {
  router.get('/notes', (ctx, next) => {
    const Note = db.model('Note');
    return Note.find({}, (err, notes) => {
      if (err) {
        return ctx.throw(500, err);
      }
      ctx.body = { notes };
      return next();
    });
  });
};

module.exports = createNoteRoutes;
