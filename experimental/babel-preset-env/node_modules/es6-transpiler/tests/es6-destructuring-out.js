"use strict";

function test0() {var y = arguments[0];if(y === void 0)y = 1;var x = (z = (arguments[1] !== void 0 ? arguments[1] : [{x: 2}, {z: 3}]))[0].x, z = (z[1]).z;
    var a = ((a = (c = {}).someValue) === void 0 ? "defaultValue" : a), b = c.b, c = ((c = c.c) === void 0 ? 2 : c), h = {}, t = 1;

    console.log(y === 1, x === 2, z === 3, a === "defaultValue", b === void 0, c === 2, typeof h === "object", t === 1);
}
test0();

function test1(opt2) {var opt1 = opt2.opt1, opt2 = opt2.opt2;
    {
        var opt1$0 = (opt2$0 = {a: 9, b: 8}).a, opt2$0 = opt2$0.b;
        console.log(opt1$0 === 9, opt2$0 === 8);
        {
            var opt1$1 = (opt2$1 = {"opt1": 7, opt2: 6})["opt1"], opt2$1 = opt2$1.opt2;
            console.log(opt1$1 === 7, opt2$1 === 6);
        }
    }
    console.log(opt1 === 1, opt2 === 2);
}
test1({opt1: 1, opt2: 2});

function test2(obj) {
    var a = obj.a, bVar = obj.b;
    console.log(a === 1, bVar === 2);
}
test2({a: 1, b: 2});

function test3(array) {var $D$0;
    var a = 1, b = 2, b$0;
    {
        var a$0 = array[0], b$1 = array[2], c = array[3];
        console.log(a$0 === 9, b$1 === 7, c === 6, (a$0 = ($D$0 = (array.unshift(777), array))[0], b$1 = $D$0[2], c = $D$0[3], $D$0)[3] === 7);
        console.log(a$0 === 777, b$1 === null, c === 7);
    ;$D$0 = void 0}
    console.log(a === 1, b === 2, b$0 === void 0);
}
test3([9,null,7,6]);

function test4(array) {
    var a = array[0], b = array[2], c = array[4];
    console.log(a === 1, b === 2, c === 3);
}
test4([1, null, 2, null ,3]);

function test5() {
    var obj = { obj: {a: 1, b: 2, cObj: {test: 3}}, test: "test" };
    var a = (c = obj.obj).a, b = c.b, c = c.cObj, testStr = obj.test;

    console.log(a === 1, b === 2, c.test === 3, testStr === "test");
}
test5();

function test6(b, c) {var a = b.a, b = b.b;var c = c.c;
    console.log(a === 1, b === 2, c === 3)
}
test6({a: 1, b: 2}, {c: 3});
