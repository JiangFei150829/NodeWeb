var ToolClass = require('../library/common/ToolClass');
const tool = new ToolClass();
const DataController = function() {

}
DataController.prototype.getViewCotroller = function(req, res, cb) {
    var cmd = req.query.cmd;
    if (cmd == "htmlView") cb(tool.getJson());
    else if (cmd == "") cb(tool.getJson());
}

module.exports = DataController;