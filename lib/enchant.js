const request = require('request');
const cheerio = require('cheerio');

const filamt = 'http://mabinogi.filamt.com/enchant/';

function searchEnchant(enchant, callback) {
    console.log(enchant);
    request.get({url: filamt + '?na=' + encodeURI(enchant)}, function (err, httpResponse, body) {
        var elements = cheerio.load(body);

        var view_path = elements('#enchant_list tr td a').last().attr('href');

        request.get({url: filamt + view_path}, function (view_err, view_httpResponse, view_body) {
            var view_elements = cheerio.load(view_body);

            var infos = view_elements('#enchant_view td#apply div');

            var rtn = '```diff\n';

            infos.each(function (i, info) {
                switch (info.attribs.class) {
                    case 'blue':
                        rtn += '+ ' + info.children[0].data + '\n';
                        return;
                    case 'red':
                        rtn += '- ' + info.children[0].data + '\n';
                        return;
                    case undefined:
                        rtn += '*** ' + info.children[0].data + '\n';
                        return;
                }
            })
            rtn += '```';
            callback(rtn);
        })
    })
}

module.exports = {
    searchEnchant: searchEnchant
}