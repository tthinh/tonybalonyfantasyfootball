/**
 * Created by athinh on 9/23/15.
 */
var Parse = require('node-parse-api').Parse;
var _ = require('underscore-contrib');

var application_id = "zlkwoSSufFpatC8ol6689tzcVAVsDDTqA5gQI6Jz";
var master_key = "wPpqlFfND6k7P6QHNb3CYxGCIbG3cNbFwKlHJRj1";
var className = 'TEAM';
var nflteams = {
        "pro_teams" : [
            {
                "abbr" : "ARI",
                "nickname" : "Cardinals",
                "name" : "Arizona"
            },
            {
                "abbr" : "ATL",
                "nickname" : "Falcons",
                "name" : "Atlanta"
            },
            {
                "abbr" : "BAL",
                "nickname" : "Ravens",
                "name" : "Baltimore"
            },
            {
                "abbr" : "BUF",
                "nickname" : "Bills",
                "name" : "Buffalo"
            },
            {
                "abbr" : "CAR",
                "nickname" : "Panthers",
                "name" : "Carolina"
            },
            {
                "abbr" : "CHI",
                "nickname" : "Bears",
                "name" : "Chicago"
            },
            {
                "abbr" : "CIN",
                "nickname" : "Bengals",
                "name" : "Cincinnati"
            },
            {
                "abbr" : "CLE",
                "nickname" : "Browns",
                "name" : "Cleveland"
            },
            {
                "abbr" : "DAL",
                "nickname" : "Cowboys",
                "name" : "Dallas"
            },
            {
                "abbr" : "DEN",
                "nickname" : "Broncos",
                "name" : "Denver"
            },
            {
                "abbr" : "DET",
                "nickname" : "Lions",
                "name" : "Detroit"
            },
            {
                "abbr" : "GB",
                "nickname" : "Packers",
                "name" : "Green Bay"
            },
            {
                "abbr" : "HOU",
                "nickname" : "Texans",
                "name" : "Houston"
            },
            {
                "abbr" : "IND",
                "nickname" : "Colts",
                "name" : "Indianapolis"
            },
            {
                "abbr" : "JAC",
                "nickname" : "Jaguars",
                "name" : "Jacksonville"
            },
            {
                "abbr" : "KC",
                "nickname" : "Chiefs",
                "name" : "Kansas City"
            },
            {
                "abbr" : "MIA",
                "nickname" : "Dolphins",
                "name" : "Miami"
            },
            {
                "abbr" : "MIN",
                "nickname" : "Vikings",
                "name" : "Minnesota"
            },
            {
                "abbr" : "NE",
                "nickname" : "Patriots",
                "name" : "New England"
            },
            {
                "abbr" : "NO",
                "nickname" : "Saints",
                "name" : "New Orleans"
            },
            {
                "abbr" : "NYG",
                "nickname" : "Giants",
                "name" : "New York"
            },
            {
                "abbr" : "NYJ",
                "nickname" : "Jets",
                "name" : "New York"
            },
            {
                "abbr" : "OAK",
                "nickname" : "Raiders",
                "name" : "Oakland"
            },
            {
                "abbr" : "PHI",
                "nickname" : "Eagles",
                "name" : "Philadelphia"
            },
            {
                "abbr" : "PIT",
                "nickname" : "Steelers",
                "name" : "Pittsburgh"
            },
            {
                "abbr" : "SD",
                "nickname" : "Chargers",
                "name" : "San Diego"
            },
            {
                "abbr" : "SF",
                "nickname" : "49ers",
                "name" : "San Francisco"
            },
            {
                "abbr" : "SEA",
                "nickname" : "Seahawks",
                "name" : "Seattle"
            },
            {
                "abbr" : "STL",
                "nickname" : "Rams",
                "name" : "St. Louis"
            },
            {
                "abbr" : "TB",
                "nickname" : "Buccaneers",
                "name" : "Tampa Bay"
            },
            {
                "abbr" : "TEN",
                "nickname" : "Titans",
                "name" : "Tennessee"
            },
            {
                "abbr" : "WAS",
                "nickname" : "Redskins",
                "name" : "Washington"
            }
        ]
};

var parse = new Parse(application_id, master_key);

addNflTeamsToParse();


function addNflTeamsToParse() {
    console.log("addNflTeamsToParse");

    _.each(nflteams.pro_teams, function (team) {
        parse.find(className, {where: {abbr: team.abbr}}, function (error, response) {
            console.log("find = " + response);
            var found;
            if (response && response.results.length > 0) {
                found = response.results[0];
            }
            if (!found) {
                parse.insert(className, team, function (error, response) {
                    console.log(response);
                });
            }
            // console.log(team.abbr);
        });
    });
}

