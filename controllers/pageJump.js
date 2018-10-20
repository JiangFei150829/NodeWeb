 const PageJump = function() {

 }
 PageJump.prototype.getPage = function(req, res, cb) {
     var page = req.query.page;
     if (page == "test") cb(pageConfig.test.path);
     else if (page == "htmlView") cb(pageConfig.htmlView.path);
 }
 var pageConfig = {
     test: {
         path: "./examples/test.html"
     },
     htmlView: {
         path: "./web/html/htmlView.html"
     }
 }
 module.exports = PageJump;