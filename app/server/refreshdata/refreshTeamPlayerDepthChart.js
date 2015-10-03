/**
 * Created by athinh on 9/23/15.
 */
var Parse = require('node-parse-api').Parse;
var _ = require('underscore-contrib');
var http = require('http');
var async = require("async");
var fs = require('fs');

var application_id = "zlkwoSSufFpatC8ol6689tzcVAVsDDTqA5gQI6Jz";
var master_key = "wPpqlFfND6k7P6QHNb3CYxGCIbG3cNbFwKlHJRj1";
var className = 'PLAYER_TEAM_DEPTHCHART';
var outputjson = [];

var parse = new Parse(application_id, master_key);

var nflteams = require("./teams.json");

var teams =  nflteams.pro_teams;
for (index = 0; index < teams.length; ++index) {
    var team = teams[index];
    getPLayersfromTeam(team);
}

function getPLayersfromTeam(team) {
            console.log(team.abbr);
            var query = {
                where: {
                    pro_team: team.abbr
                },
                order: 'rank'
            };
            parse.find('PLAYER', query, function (err, response) {
                //               console.log(response);
                if(response){
                    updatePlayerRankingParse(response.results);
                }
            });
}
function updatePlayerRankingParse(players){
    console.log("Team list size "+ players.length);
    var qbpos = 0;
    var wros = 0;
    var rbpos = 0;
    var tepos = 0;
    var kpos = 0;
    var currentPos = 0;
    players.forEach(function (player) {
    //    parse.find(className, {where: {playerid: playerid}}, function (error, response) {
    //        if (!error) {
    //            var found;
    //            if (response && response.results.length > 0) {
    //                found = response.results[0];
    //            }
    //            if (!found) {


                    switch (player.position) {
                        case "QB":
                            qbpos = qbpos + 1;
                            currentPos = qbpos;
                            break;
                        case "WR":
                            wros = wros + 1;
                            currentPos = wros;
                            break;
                        case "RB":
                            rbpos = rbpos + 1;
                            currentPos = rbpos;
                            break;
                        case "TE":
                            tepos = tepos + 1;
                            currentPos = tepos;
                            break;
                        case "K":
                            kpos = kpos + 1;
                            currentPos = kpos;
                            break;
                    }
                    var playerid = getPlayerId(player);
                    playerdepthchart = {
                        "team": player.pro_team,
                        "name_id": playerid,
                        "depthchart": currentPos,
                        "position": player.position
                    };
                    //saveDatainParse(playerdepthchart);
        saveDatatoJson(playerdepthchart);
    //            }
    //        }
        });
    //});
}

function saveDatainParse(playerdepthchart){
    parse.insert(className, playerdepthchart, function (error, response) {
        console.log("response = " + response + "error= " + error);
    });
}
function saveDatatoJson(playerdepthchart){
    outputjson.push(playerdepthchart);
}
function saveDataintofile(){
    fs.writeFile('playerdepthchart.json', outputjson, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}
function getPlayerId(player){
    var playerid = player.fullname.replace(" ", "_") + "_"+player.position;
    return playerid;
}

