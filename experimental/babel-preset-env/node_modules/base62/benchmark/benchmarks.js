"use strict";

var base62 = require('../'),
    now = 0,
    deltaTime = 0,
    i = 0,
    intResult = 0,
    strResult = 0;

function performanceNow(){
    var t = process.hrtime();

    return t[0] * 1000 + t[1] / 1000000;
}

//decode with default charset

now = performanceNow();

for (intResult = 0, i = 0; i < 1000000; i++) {
    intResult += base62.decode('00thing');
}

deltaTime = performanceNow() - now;

console.log('|', 'decoding with default charset (1000000x)', '|', intResult === 432635954000000 ? 'correct' : 'incorrect', '|', deltaTime.toFixed(2), 'ms', '|');

//encode with default charset

now = performanceNow();

for (strResult = '', i = 0; i < 1000000; i++) {
    strResult = base62.encode(i);
}

deltaTime = performanceNow() - now;

console.log('|', 'encoding with default charset (1000000x)', '|', strResult === '4c91' ? 'correct' : 'incorrect', '|', deltaTime.toFixed(2), 'ms', '|');

//decode with custom charset

base62.setCharacterSet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

now = performanceNow();

for (intResult = 0, i = 0; i < 1000000; i++) {
    intResult += base62.decode('00thing');
}

deltaTime = performanceNow() - now;

console.log('|', 'decoding with custom charset (1000000x)', '|', intResult === 823118800000000 ? 'correct' : 'incorrect', '|', deltaTime.toFixed(2), 'ms', '|');

//encode with custom charset

now = performanceNow();

for (strResult = '', i = 0; i < 1000000; i++) {
    strResult = base62.encode(i);
}

deltaTime = performanceNow() - now;

console.log('|', 'encoding with custom charset (1000000x)', '|', strResult === '4C91' ? 'correct' : 'incorrect', '|', deltaTime.toFixed(2), 'ms', '|');
