const Router = require('koa-better-router');
const Koa = require('koa');
const createRoutes = require('./routes');

const router = Router().loadMethods();
createRoutes(router);

const api = Router({ prefix: '/v1' });

// add `router`'s routes to api router
api.extend(router);

const app = new Koa();

app.use(router.middleware());
app.use(api.middleware());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening in port ${port}`);
  console.log(router.routes);
});
