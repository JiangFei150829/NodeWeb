var ejs = require("ejs");
var fs = require("fs");


var dictionary = {
    a: 6,
    news: ["行吧", "说的", "很牛逼"],
    url: '/pageJump?page=test'
};
const Testdynamic = function() {}
Testdynamic.prototype.getHtmlCode = function getHtmlCode(cb) {
    fs.readFile("./examples/dynamicView/testdynamic.ejs", function(err, data) {
        var template = data.toString();
        var html = ejs.render(template, dictionary);
        cb(html);
    });
}
module.exports = Testdynamic;