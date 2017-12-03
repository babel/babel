function test1(obj) {
    var a = ((a = obj.someValue) === void 0 ? "defaultValue" : a), b = obj.b;
    if( obj.someValue === void 0 ) {
        console.log(a === "defaultValue", b === obj.b);
    }
    else {
        console.log(a === obj.someValue, b === obj.b);
    }
}

test1({b: "bValue"});
test1({someValue: 999, b: "bValue"});

(function(b) {var a = ((a = b["a"]) === void 0 ? 123 : a), b = ((b = b.b) === void 0 ? 321 : b);
    console.log(a === 123, b === 321);
})({});

function test2(auto) {var SLICE$0 = Array.prototype.slice;var c = ((c = (q = (arguments[1] !== void 0 ? arguments[1] : {a: {test: 1, q: 2}}).a).test) === void 0 ? "test" : c), q = ((q = q.q) === void 0 ? "default" : q);var a = ((a = (rest = (arguments[2] !== void 0 ? arguments[2] : ["9", null, void 0, "6", "5", "4"]))[0]) === void 0 ? 1 : a), b = ((b = rest[2]) === void 0 ? 2 : b), rest = SLICE$0.call(rest, 3);var def = arguments[3];if(def === void 0)def = "def";
    if( auto ) {
        console.log(c === 1, q === 2, a === "9", b === 2, rest.join("|") === "6|5|4", def === "def")
    }
    else {
        console.log(c === "cValue", q === "default", a === 1, b === 3, rest.join("|") === "4|5|6", def === "def")
    }
}
test2(false, {a:{test: "cValue", q: void 0}}, [void 0, 2, 3, 4, 5, 6]);
test2(true);
