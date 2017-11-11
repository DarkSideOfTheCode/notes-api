const Router = require('koa-better-router');
const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');

require('dotenv').config();

const createRoutes = require('./src/routes');
const createModels = require('./src/models');

const db = createModels();

const router = Router().loadMethods();
createRoutes({ router, db });

const api = Router({ prefix: '/v1' });

// add `router`'s routes to api router
api.extend(router);

const app = new Koa();

app.use(json());
app.use(bodyParser());
app.use(router.middleware());
app.use(api.middleware());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening in port ${port}`);
  console.log(router.routes);
});
