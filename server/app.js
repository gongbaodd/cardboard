var serve = require('koa-static');
var koa = require('koa');
var app = koa();

app.use(serve('../dist'));

app.listen(3000);
console.log('loging port 3000')