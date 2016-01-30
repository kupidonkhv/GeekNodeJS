var http = require('http');
var https = require('https');
var url = require("url");
var request = require('request');

//      Помогите, плиз:
//      Не получается достать результат от выполнения request (body.text)
//      для выдачи не в консоль, а в браузер пользователю... :-(


var yandex = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160130T051628Z.3abc1521a20b09cd.dd533a7666baf6d2569988954e6ad612bbe0562d&lang=ru-en&text=';

function onRequest(req, response) {
    var pathname = url.parse(req.url).pathname;
    var params = url.parse(req.url);

    if(pathname!='/favicon.ico'){

        var body = request(yandex+params['query'], function(error, response, body){
            if(error){
                console.error('Error: ', error);
                return;
            }

            if(response.statusCode == 200){
                body = JSON.parse(body);
                console.log('ПЕРЕВОД: ', body.text);
            }
        });

        //var out = body;

        response.writeHead(200, {"Content-Type": "text/plain"});

        //response.write(body);
        //console.log(params['query']);
    }
    response.end();
}

http.createServer(onRequest).listen(5000);
console.log("Server has started.");



