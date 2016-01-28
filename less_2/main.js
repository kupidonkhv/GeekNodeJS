var readline = require('readline');
var fs = require('fs');
var logfile = './log.txt';

var data = fs.readFileSync(logfile,'utf8');


// { "all": 0, "win": 0, "loss": 0, "prew": 1, "cons": 0 , "max_win": 0 , "max_loss": 0 }
// Всего / Побед / Проигрышей / Предыдущая партия: проигрыш или победа / Подряд побед или проигрышей .......


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.exists(logfile, function (exists) {
    if(!exists){
        console.log('Не найден файл логов!');
    }
});

function writelog(iswin){
    var obj = JSON.parse(data);
    if(iswin==1){
        obj.win = obj.win + 1;
    } else {
        obj.loss = obj.loss + 1;
    }
    obj.all = obj.all + 1;
    if(iswin==obj.prew){
        obj.cons = obj.cons + 1;
    } else {
        obj.cons = 0;
        obj.prew = iswin;
    }
    if(iswin==1 && obj.cons > obj.max_win){
        obj.max_win = obj.cons;
    }
    if(iswin==0 && obj.cons > obj.max_loss){
        obj.max_loss = obj.cons;
    }
    var todata = {
        all: obj.all,
        win: obj.win,
        loss: obj.loss,
        prew: obj.prew,
        cons: obj.cons,
        max_win: obj.max_win,
        max_loss: obj.max_loss
    };

    data = JSON.stringify(todata);

    fs.writeFile(logfile, data, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

console.log('Орёл, или решка?');
console.log('1: Орёл');
console.log('2: Решка');

function gen(){
    if(Math.floor(Math.random() * 100) % 2 == 0){
        return 1;
    } else {
        return 2;
    }
}

rl.on('line', function (cm) {
    var oir = gen();

    if(cm == 1 || cm == 2){

        if(oir==1){

            console.log('Выпал Орёл ');
            if(cm==oir){
                console.log('Вы угадали!');
                writelog(1);
            }else {
                console.log('Вы НЕ угадали!');
                writelog(0);
            }

        } else if(oir==2){

            console.log('Выпала Решка');
            if(cm==oir){
                console.log('Вы угадали!');
                writelog(1);
            }else {
                console.log('Вы НЕ угадали!');
                writelog(0);
            }

        } else {
            console.log('СГЕНЕРИРОВАЛИ: ' + oir);
        }

    } else {
        console.log('Вы ввели неверный параметр!');
        rl.close();
    }

});