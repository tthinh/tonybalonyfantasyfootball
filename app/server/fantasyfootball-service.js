'use strict';
var Parse = require('node-parse-api').Parse;
var Promise = require('promise');

var application_id = "zlkwoSSufFpatC8ol6689tzcVAVsDDTqA5gQI6Jz";
var master_key = "wPpqlFfND6k7P6QHNb3CYxGCIbG3cNbFwKlHJRj1";
var className = 'PLAYER_TEAM_DEPTHCHART';
var parse = new Parse(application_id, master_key);


//console.log(results);

exports.findplayer = function (teamName){
    var team = {abbr:teamName};
    var query = {
        where: {
            team: team.abbr
        },
        order: 'rank'
    };
    return new Promise(function (fulfill, reject){
        parse.find(className, query, function (err, res) {
            if (err) reject(err);
            else fulfill(res);
        });
    });
};
