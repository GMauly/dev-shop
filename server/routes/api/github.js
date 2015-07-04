/**
 * Created by urielbertoche on 03/07/15.
 */

var express = require('express');
var router = express.Router();

var api = require('../../api/git/organization').methods;

/* GET home page. */
router.get('/getMembers/:organization/', api.getMembers);

module.exports = router