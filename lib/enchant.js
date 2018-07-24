const request = require('request');
const cheerio = require('cheerio');

function searchEnchant(enchant, callback) {
    console.log(enchant);
    request.get({url: 'http://mabinogi.filamt.com/enchant/?na=' + encodeURI(enchant)}, function (err, httpResponse, body) {
        var elements = cheerio.load(body);

        var rtn = elements('#enchant_list tr .info').text();

        console.log(rtn);

        callback(rtn);
    })
}

module.exports = {
    searchEnchant: searchEnchant
}