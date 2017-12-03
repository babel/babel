function test1_1(a) {var a = ((a = a.a) === void 0 ? 1 : a);
    {
        var a$0 = 2;
    }
    return 1 === a
}
console.log(test1_1({}))

function test1_2(b) {var a = ((a = b.a) === void 0 ? 2 : a), b = ((b = b.b) === void 0 ? a + 1 : b);
	{
		var a$1 = 3, b$0 = 99;
	}
	return 2 === a && 3 === b;
}
console.log(test1_2({}))

function test1_3(c) {var a = ((a = c.a) === void 0 ? 3 : a), b = ((b = c.b) === void 0 ? a + 1 : b), c = ((c = c.c) === void 0 ? b + a + 1 : c);
	{
		var a$2 = 4, b$1 = 99, c$0 = 999;
	}
	return 3 === a && 4 === b && 8 === c;
}
console.log(test1_3({}))

function test2_1(a) {var a = ((a = a[0]) === void 0 ? 1 : a);
    {
        var a$3 = 2;
    }
    return 1 === a;
}
console.log(test2_1([]))

function test2_2(b) {var a = ((a = b[0]) === void 0 ? 2 : a), b = ((b = b[1]) === void 0 ? a + 1 : b);
    {
        var a$4 = 3, b$2 = 99;
    }
    return 2 === a && 3 === b;
}
console.log(test2_2([]))

function test2_3(c) {var a = ((a = c[0]) === void 0 ? 3 : a), b = ((b = c[1]) === void 0 ? a + 1 : b), c = ((c = c[2]) === void 0 ? b + a + 1 : c);
    {
        var a$5 = 4, b$3 = 99, c$1 = 999;
    }
    return 3 === a && 4 === b && 8 === c;
}
console.log(test2_3([]))

function test3_1() {var a = ((a = (arguments[0] !== void 0 ? arguments[0] : {}).a) === void 0 ? 1 : a);
    {
        var a$6 = 2;
    }
    return 1 === a
}
console.log(test3_1())

function test3_2() {var a = ((a = (b = (arguments[0] !== void 0 ? arguments[0] : {})).a) === void 0 ? 2 : a), b = ((b = b.b) === void 0 ? a + 1 : b);
    {
        var a$7 = 3, b$4 = 99;
    }
    return 2 === a && 3 === b;
}
console.log(test3_2())

function test3_3() {var a = ((a = (c = (arguments[0] !== void 0 ? arguments[0] : {})).a) === void 0 ? 3 : a), b = ((b = c.b) === void 0 ? a + 1 : b), c = ((c = c.c) === void 0 ? b + a + 1 : c);
    {
        var a$8 = 4, b$5 = 99, c$2 = 999;
    }
    return 3 === a && 4 === b && 8 === c;
}
console.log(test3_3())

// with 'arguments'
function test4_1($D$0) {var a = ((a = $D$0.a) === void 0 ? 2 : a), b = ((b = $D$0.b) === void 0 ? a + 1 : b);
    {
        var a$9 = 3, b$6 = 99;
    }
    return 22 === a && 23 === b && 22 === arguments[0].a;
}
console.log(test4_1({a: 22}))

function test4_2($D$1) {var a = ((a = $D$1[0]) === void 0 ? 2 : a), b = ((b = $D$1[1]) === void 0 ? a + 1 : b);
    {
        var a$10 = 4, b$7 = 99;
    }
    return 22 === a && 23 === b && 22 === arguments[0][0];
}
console.log(test4_2([22]))
