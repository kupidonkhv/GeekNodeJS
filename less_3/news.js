var request = require('request');
var cheerio = require('cheerio');


request('http://komsomolsk.su/novosti/', function(error, response, body){
    if(error){
        console.error('Error: ', error);
        return;
    }

    if(response.statusCode == 200){
        var $ = cheerio.load(body);
        $('h1.blog-title a').each(function(i, elem) {
            console.log($(this).text() + ' | ' + $(this).attr('href'));
        });
    }
});