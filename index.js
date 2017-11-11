const Router = require('koa-better-router');
const Koa = require('koa');

const router = Router().loadMethods();

router.get('/', (ctx, next) => {
  ctx.body = `Hello world! Prefix: ${ctx.route.prefix}`;
  return next();
});

// can use generator middlewares
router.get('/foobar', function* foobar(next) {
  this.body = `Foo Bar Baz! ${this.route.prefix}`;
  yield next;
});

const api = Router({ prefix: '/v1' });

// add `router`'s routes to api router
api.extend(router);

const app = new Koa();

app.use(router.middleware());
app.use(api.middleware());

app.listen(process.env.PORT || 3000, () => {
  console.log('Try out /, /foobar, /api/foobar and /api');
});
