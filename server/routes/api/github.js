/**
 * Created by urielbertoche on 03/07/15.
 */

var express = require('express');
var router = express.Router();
var apicache = require('apicache').options({ debug: true }).middleware;

var organization = require('../../api/git/organization').methods;
var member = require('../../api/git/member').methods;

router.get('/getMembers/:organization/', apicache('180 minutes'), organization.getMembers);

router.get('/getFollowers/:user/', apicache('180 minutes'), member.getFollowers);
router.get('/getFollowing/:user/', apicache('180 minutes'), member.getFollowing);
router.get('/getStarred/:user/', apicache('180 minutes'), member.getStarred);


module.exports = router