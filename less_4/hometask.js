var express = require('express');
var cheerio = require('cheerio');
var cookieParser = require('cookie-parser');
var request = require('request');
var app = express();

var newscount = 1;
var selectedsite = 'ria.ru';

var selectors = {
    'habrahabr.ru': {
        post: '.post',
        title: '.title',
        content: '.content',
        anchor: '.title a'
    },
    'ria.ru': {
        post: '.day_news_item',
        title: '.day_news_item_title',
        content: '.day_news_item_announce',
        anchor: '.day_news_item_title'
    },
    'vesti.ru/news/': {
        post: '.b-item__inner',
        title: '.b-item__title',
        content: '.b-item__title',
        anchor: '.b-item__title a'
    }
};


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

var templates = require('consolidate');
app.engine('hbs', templates.handlebars);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    console.log(req.query.id);

    if (req.cookies.selectedsite != undefined) selectedsite = req.cookies.selectedsite;
    if (req.cookies.newscount != undefined) newscount = req.cookies.newscount;

    templates.handlebars(
        'views/layout.hbs',
        {
            selectedsite: selectedsite,
            newscount: newscount
        },
        function(err, html) {
            if (err) throw err;
            res.send(html);
        }
    );
});



app.post('/', function (req, res) {
    var selectedsite = req.body.selectedsite,
        newscount = parseInt(req.body.newscount);

    res.cookie('selectedsite', selectedsite);
    res.cookie('newscount', newscount);


    request('http://'+selectedsite, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var $ = cheerio.load(body),
                articles = [],
                i = 0;

            $(selectors[selectedsite].post).each(function() {
                if (i<newscount) {
                    articles.push({
                        title: $(this).find(selectors[selectedsite].title).text().trim(),
                        content: $(this).find(selectors[selectedsite].content).text().trim(),
                        anchor: $(this).find(selectors[selectedsite].anchor).attr('href')
                    });
                    i++;
                }
            });

            templates.handlebars(
                'views/layout.hbs',
                {
                    selectedsite: selectedsite,
                    newscount: newscount,
                    articles: articles
                },
                function(err, html) {
                    if (err) throw err;
                    res.send(html);
                }
            );
        }
    });

    console.log(req.body);
    //res.send(req.body);
});

app.listen(5000);