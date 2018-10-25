var express = require('express');
var path = require('path');
var app = express();
var DataController = require("./controllers/dataController");
var PageJump = require("./controllers/pageJump");


const routes = require('./controllers/routes');


app.use('/routes', routes);

var dataController = new DataController();
var pageJump = new PageJump();
//设置静态文件目录--引用的时候从 assets的下一级开始（例如<script src="/packages/vue/vue.min.js"></script>）
app.use(express.static(path.join(__dirname, '/assets')));
app.use(express.static(path.join(__dirname, '/web/js')));
app.use(express.static(path.join(__dirname, '/web/css')));

//ajax的模式进行数据加载和交互 
app.get('/', function(req, res) {
    res.sendfile('./web/html/htmlView.html');
});
//请求json数据
app.get('/getJson', function(req, res) {
    dataController.getViewCotroller(req, res, (data) => {
        res.send(data);
    });
});
//页面跳转
app.get('/pageJump', function(req, res) {
    pageJump.getPage(req, res, (view) => {
        res.sendfile(view);
    });
});

//开启网络服务
var server = app.listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;
});

//----------测试保留区-----------
//使用ejs模板进行数据的加载
var Testdynamic = require("./examples/dynamicView/testdynamic");
var test = new Testdynamic();
app.get('/testdynamic', function(req, res) {
    test.getHtmlCode((code) => {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(code);
    })

});
//----------测试保留区-----------