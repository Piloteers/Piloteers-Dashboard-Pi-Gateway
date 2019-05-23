"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
exports.router = router;
const { version } = require('../../package.json');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { version: version });
});
//# sourceMappingURL=index.js.map