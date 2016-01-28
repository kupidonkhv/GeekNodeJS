var readline = require('readline');
var fs = require('fs');

// { "all": 0, "win": 0, "loss": 0, "prew": 1, "cons": 0 , "max_win": 0 , "max_loss": 0 }
// Всего / Побед / Проигрышей / Предыдущая партия: проигрыш или победа / Подряд побед или проигрышей .......

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Введите название файла логов: (xxx.txt)');

rl.on('line', function (cm){
    fs.exists(cm, function (exists) {
        if(!exists){
            console.log('Не найден файл логов!');
        } else {
            var data = fs.readFileSync(cm,'utf8');
            var obj = JSON.parse(data);
            console.log('Всего партий:                          ' + obj.all);
            console.log('Из них побед:                          ' + obj.win);
            //console.log('Из них проигрышей:  ' + obj.all);
            //console.log('Процент побед:                         ' + (obj.win * 100 / obj.all));
            console.log('максимальное число побед               ' + obj.max_win);
            console.log('максимальное число проигрышей подряд:  ' + obj.max_loss);
        }
    });
    rl.close();
});