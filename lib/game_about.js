const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');

const mabiAbout = 'http://gameabout.com/mabinogi';

function queryGameAbout(callback) {
    request.get({url: mabiAbout}, function (err, httpResponse, body) {
        var elements = cheerio.load(body);

        var missions = elements('#todayMission table tr td.tit a');

        var richEmbed = new Discord.RichEmbed();

        richEmbed.setAuthor('오늘의 미션');

        missions.each(function (i, mission) {
            var split_mission = mission.children[0].data.split(', ');
 
            richEmbed.addField(split_mission[0], '**'+split_mission[1]+'**');
        })

        richEmbed.setTimestamp = new Date();

        callback(richEmbed);
    })
}

module.exports = {
    query: queryGameAbout
}