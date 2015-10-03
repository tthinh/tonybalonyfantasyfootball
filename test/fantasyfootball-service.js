'use strict';
var Parse = require('node-parse-api').Parse;
var async = require('async');
var Promise = require('promise');
var ffs = require('../app/server/fantasyfootball-service.js');
var results;


ffs.findplayer("SD").then(function(res){
    console.log(res);
    results= res;
});