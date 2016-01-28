var ansi = require("ansi");
var cursor = ansi(process.stdout);
cursor.beep();
console.log("\007");
console.log('\u0007');