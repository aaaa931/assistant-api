const Koa = require("koa");
const serve = require("koa-static");
const path = require("path");

const app = new Koa();
const staticPath = "./";
const port = process.env.PORT || 3000;

app.use(serve(path.join(__dirname, staticPath)));

app.listen(port, () => {
    console.log(`[Message]: Server is listening on port ${port}`);
});
