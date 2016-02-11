'use strict';


class AutoriseController {

    constructor(model) {
        this.model = model;
    }

    // get actions
    index(req, res) {
        var data = {
            mail: '',
            password: ''
        };
        res.render('autorise', {
            title: 'MySQL Application',
            data: data,
            index: 'index'
        });
    }

    getuser(req, res) {
        //var sess = req.session;
        //console.log(req);
        //console.log('mail    ' + req.body.mail);
        //console.log('password    ' + req.body.password);
        this.model.getin(req.body.mail, req.body.password, (data) => {
            if(data){
                res.redirect('/post/');
            } else {
                res.redirect('/');
            }
        });
    }

}



module.exports = (model) => {
    return new AutoriseController(model);
};