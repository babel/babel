var SLICE$0 = Array.prototype.slice;/*
 Test note:
 ! completed test: do not edit it except to add comments !
 */

var x = function(a, b)
    {var c = arguments[2];if(c === void 0)c = 998;return a + b + c};console.log(x(1, 1) === 1000)

console.log(((function(){return function(a){return a*22.032}})())("321") === "321"*22.032)

var obj = {
    a: 1,
    some: function(){var rest = SLICE$0.call(arguments, 0);return rest.map(function(a){return a + 1})},
    b: 6
}
console.log((obj.a + obj.some(1, 2, 3, 4).join("") + obj.b) === "123456")

var y = function()
      {var a = arguments[0];if(a === void 0)a = 1;return (a + 1  , a  )}
console.log(y() === 1)

{
    var test$0 = 987;
    var result = (function() {var this$1 = this;
        var this$0 = this;

        var obj = {
            test: 123
            , arr: function()  {return function()  {return this$1.test + test$0}}
        };

        function innerTest() {
            console.log(this$0.test === "testString");
        }
        innerTest();

        return obj.arr()();
    }).call({test: "testString"});

    console.log(result === "testString987")
}

{
    var test$1 = 321;
    result = (function(){var this$1 = this;var obj = {
            test: 123
            , arr: function()  {return function()  {return function(a)  {return this$1.test + a + test$1}}}
        }

        return obj.arr()()("|");
    }).call({test: "testString"});

    console.log(result === "testString|321")
}

{
    var test$2 = 7;
    result = (function() {
        var obj = {
            test:"test",arr:function(){var a = arguments[0];if(a === void 0)a = 'String';var rest = SLICE$0.call(arguments, 1);var this$1 = this;return function(){return this$1.test+a+test$2+rest.join("")}},test2:1
        };

        return obj.arr(void 0, 7, 7)();
    }).call({test: 123});

    console.log(result === "testString777");

}

{
    function test() {var this$1 = this;
        var z = function()  {
            this$1.test();
        }
    }
}
