var Data = require('./Data');
const data = new Data();
const ToolClass = function() {

}

ToolClass.prototype.getJson = function() {
    return data.getJsonTest();
}
module.exports = ToolClass;