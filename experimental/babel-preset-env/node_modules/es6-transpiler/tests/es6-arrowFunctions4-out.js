
{
    {
        var arr = [ {a: 4}, {a: 0}, {a: 1}, {a: 3}, {a: 2} ];
        arr = arr
            .sort( function(a, b)  {var a = a.a;var b = b.a;return a - b}  )
            .map(function(a){var a = a.a;return a});
        console.log(arr.join("|") === [0, 1, 2, 3, 4].join("|"));
    }

    {
        var arr$0 = [ {a: 4}, {a: 0}, {a: 1}, {a: 3}, {a: 2} ];
        arr$0 = arr$0
            .sort( function()  {var a = (arguments[0] !== void 0 ? arguments[0] : {}).a;var b = (arguments[1] !== void 0 ? arguments[1] : {}).a;return a - b}  )
            .map(function(){var a = (arguments[0] !== void 0 ? arguments[0] : {}).a;return a})
        console.log(arr$0.join("|") === [0, 1, 2, 3, 4].join("|"));
    }
}

{
    var test1 = function(a)  {var a = a.a;return [a]}
    console.log(test1({a: 1}).join("|") === [1].join("|"))

    var test2 = function(a)  {return a}
    console.log(test2(2) === 2)

    var test3 = function(a) {var a = a.a;return a}
    console.log(test3({a: 3}) === 3)

    var test4 = function(a)  {return [a]}
    console.log(test4(4).join("|") === [4].join("|"))

    var test5 = function(a)
        {return a}
    console.log(test5(5) === 5)

    var test6 = function(a ) {return [
        a
    ]}
    console.log(test6(6).join("|") === [6].join("|"))

    var test7 = function(a)  //some comments 1
        {var a = a.a;return a}
    /*some comments 2*/
    console.log(test7({a: 7}) === 7)

    var test8 = (99,function(a)  {return a + 1})(7)
    console.log(test8 === 8)

    var test9 = (98,function(a ) {return a + 1})(8)
    console.log(test9 === 9)

    var test10 = (97,function(a)  {return a + 1})(9)
    console.log(test10 === 10)

    var test11 = (96,function(a ) {return a + 1})(10)
    console.log(test11 === 11)

    var test12 = (function(a)  {return ++a})(11)
    console.log(test12 === 12)

    var test13 = (function(a ) {return ++a})(12)
    console.log(test13 === 13)

    var test14 = function(a)  {return ++a}
    console.log(test14(13) === 14)

    var test15 = function(a ) {return ++a}
    console.log(test15(14) === 15)
}
