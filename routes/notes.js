const createNoteRoutes = router => router.addRoute(
  'GET /notes',
  (ctx, next) => {
    ctx.body = `first ${ctx.route.path};`;
    return next();
  },
);

module.exports = createNoteRoutes;
