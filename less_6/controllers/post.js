'use strict';


class PostController {

    constructor(model) {
        this.model = model;
    }

    // get actions
    index(req, res) {

        //console.log('SESS: ' + req.session);

        this.model.list((data) => {
            res.render('index', {
            title: 'MySQL Application',
            articles: data,
            index: 'index'
        });
    });
    }

    view(req, res) {
        this.model.get(req.params.id, (data) => {
            res.render('index', {
                title: 'MySQL Application',
                article: data[0],
                view: 'view'
            });
        });
    }

    addForm(req, res) {
        res.render('index', {
            title: 'MySQL Application',
            article: {name: '', content: ''},
            action: '/article/add',
            addform: 'addForm'
        });
    }

    editForm(req, res) {
        this.model.get(req.params.id, (data) => {
            res.render('index', {
            title: 'MySQL Application',
            article: data[0],
            action: '/post/edit/' + data.id,
            editform: 'editForm'
        });
    });
    }

    // post actions
    add(req, res) {
        console.log(req.body);
        let article = req.body;
        article.user_id = 1;
        this.model.add(article, (insertId) => {
            res.redirect('/post/' + insertId);
    });
    }

    edit(req, res) {
        this.model.edit(req.params.id, req.body, () => {
            res.redirect('/post/' + req.params.id);
    });
    }

    delete(req, res) {
        this.model.delete(req.params.id, () => {
            res.redirect('/post');
    });
    }

}



module.exports = (model) => {
    return new PostController(model);
};