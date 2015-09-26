/**
 * Created by athinh on 9/23/15.
 */
var Parse = require('node-parse-api').Parse;
var _ = require('underscore-contrib');
var http = require('http');
var async = require("async");
var sleep = require('sleep');


var application_id = "zlkwoSSufFpatC8ol6689tzcVAVsDDTqA5gQI6Jz";
var master_key = "wPpqlFfND6k7P6QHNb3CYxGCIbG3cNbFwKlHJRj1";
var className = 'PLAYER';
var playerlistALL = require("./players.json");
var playername = {
    "bye_week": "7",
    "firstname": "Jared",
    "photo": "https://auth.cbssports.com/images/football/nfl/players/170x170/1700530.png",
    "position": "WR",
    "lastname": "Abbrederis",
    "age": 24,
    "elias_id": "ABB650964",
    "pro_status": "A",
    "jersey": "84",
    "fullname": "Jared Abbrederis",
    "id": "1700530",
    "pro_team": "GB"
};

var parse = new Parse(application_id, master_key);
var playerlist = playerlistALL.body.rankings.positions[5].players;
console.log("player list size "+ playerlist.length);


//updatePlayerData();
addPLayerListToParse();
//console.log(getPlayerId(playername));
//updateplayers();





function updatePlayerData(){
    return http.get({
        host: 'api.cbssports.com',
        path: '/fantasy/players/list?version=3.0&SPORT=football&response_format=JSON'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            playerlist = JSON.parse(body);
            addPLayerListToParse();
        });
    });

}


function addPLayerListToParse() {
    console.log("addPLayerToParse");

    playerlist.forEach(function (player) {
        var playerid = getPlayerId(player);
        //sleep.sleep(5);
        parse.find(className, {where: {playerid: playerid}}, function (error, response) {
            if(!error) {

                //console.log("find = " + response);
                var found;
                if (response && response.results.length > 0) {
                    found = response.results[0];
                }
                if (!found) {
                    player.playerid = playerid;
                    delete player.icons;

                    console.log(playerid);

                    console.log("calling parse.");
                    parse.insert(className, player, function (error, response) {
                        console.log("response = " + response + "error= " + error);
                    });
                }
            }
        });
    });
}

function updateplayers() {
    var asyncTasks = [];
    playerlist.body.players.forEach(function (player) {
        asyncTasks.push(function (callback) {
            var playerid = getPlayerId(player);
            player.playerid = playerid;
            delete player.icons;
            parse.insert(className, player, function (error, response) {
                console.log("response = " + response);
                callback();
            });
        });
    });

    asyncTasks.push(function (callback) {
        // Set a timeout for 3 seconds
        setTimeout(function () {
            // It's been 3 seconds, alert via callback
            callback();
        }, 300000);
    });

    async.parallel(asyncTasks, function () {
        console.log("done");
    });
}


function getPlayerId(player){
    var playerid = player.fullname.replace(" ", "_") + "_"+player.position;
    return playerid;
}

