var serve = require('koa-static');
var compress = require('koa-compress');
var koa = require('koa');
var app = koa();

app.use(compress());
app.use(serve('../dist'));

app.listen(3000);
console.log('loging port 3000')
