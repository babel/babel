var __this = this; (function(ident) { return "abc"; });

(function() { return "abc"; });

(function() { return +new Date(); });

(function(a, b, c) { return 123 + 456; });

(function(ident) {

    console.log("hello");
});

(function(a, b, c) {

    console.log("world");
});

(function() { (function() {}) });

(function(ident) { return __this; });

(function() {

    var x = function() { return this; };
});

(function() {

    function x() { return this; };
});

(function() {

    (function() { return __this; });
});

function f() { var __arguments = arguments;  (function(ident) { return __arguments; }) }

function f() { var __this = this, __arguments = arguments;  (function(ident) { return (__this, __arguments); }) }

(function(ident) { return __this.method(); });

var identity = function(obj) { return obj; };

// asi
1
;(function(ident) { return 1; });
