const koa = require("koa");
const static = require("koa-static-cache");
const bodyParser = require("koa-better-body");
const convert = require("koa-convert");
const session = require("koa-session");
const Router = require("koa-router");
const ejs = require("koa-ejs");
const config = require("./config");
const app = require("./routes/index");
// 链接数据库
const db = require("./libs/db");
// 错误处理
const errorHandler = require("./libs/error_handler");
// 日志
const logs = require("./libs/log");

const server =new koa();
server.listen(config.port);
server.keys=config.secret;
// 统一处理错误
errorHandler(server);
// 写日志
logs(server);
// 将数据库实例对象绑定到cxt对象上
server.use(async (cxt, next) => {
    cxt.db = db;
    await next();
});
const mainRouter = new Router();
// 路由
mainRouter.use("/",app);

// ejs
ejs(server, {
    root: config.ejsRoot,
    layout: false,
    viewExt: ".ejs.html",
    cache: false,
    debug: false,
});
// 中间件
server.use(mainRouter.routes());
server.use(convert(bodyParser({
    uploadDir:config.uploadDir,
})));
server.use(session({}, server));
server.use(static(config.wwwDir));