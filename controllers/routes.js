const express = require('express')
const Routes = express.Router()

Routes.get('/name', function(req, res) {
    res.send('hello,routes ')
});
module.exports = Routes;