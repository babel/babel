ident => "abc";

() => "abc";

() => +new Date();

(a, b, c) => 123 + 456;

ident => {

    console.log("hello");
};

(a, b, c) => {

    console.log("world");
};

() => { () => {} };

ident => this;

() => {

    var x = function() { return this; };
};

() => {

    function x() { return this; };
};

() => {

    () => this;
};

function f() { ident => arguments }

function f() { ident => (this, arguments) }

ident => this.method();

var identity = obj => obj;

// asi
1
ident => 1;
