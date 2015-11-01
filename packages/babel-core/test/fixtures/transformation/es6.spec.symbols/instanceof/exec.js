var foo = {};
foo[Symbol.hasInstance]= function () { return true; };

var bar = {};

assert.ok(bar instanceof foo);
assert.ok(new String instanceof String);

//

function Greeting(greeting) {
  this.greeting = greeting;
}

Object.defineProperty(Greeting, Symbol.hasInstance, {
  value: function(inst) {
    return inst.greeting == "hello";
  }
});

var a = new Greeting("hello");
var b = new Greeting("world");

assert.ok(a instanceof Greeting);
assert.ok(!(b instanceof Greeting));
