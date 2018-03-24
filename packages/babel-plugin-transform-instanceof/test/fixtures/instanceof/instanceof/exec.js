var foo = {};
foo[Symbol.hasInstance]= function () { return true; };

var bar = {};

expect(bar instanceof foo).toBe(true);
expect(new String instanceof String).toBe(true);

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

expect(a instanceof Greeting).toBe(true);
expect(b instanceof Greeting).toBe(false);
