var beeper = require('beeper');

beeper('***-*-*-*-***'); //SOS



var colors = require('colors');
console.log('Введите Ваше имя!'.red.bgYellow) // outputs red underlined text
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    console.log('   \\\\\\\\\\\\\\\\\\\\\//////////////'.rainbow);
    console.log('         Привет, ' + d.toString().trim() + '!'.cyan);
    console.log('         Я домашнее задание'.yellow);
    console.log('   \\\\\\\\\\\\\\\\\\\\\//////////////'.rainbow);
});