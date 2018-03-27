var foo = {};
foo[Symbol.hasInstance]= function () { return true; };

var bar = {};

expect(bar instanceof foo).toBe(true);
expect(new String).toBeInstanceOf(String);

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

expect(a).toBeInstanceOf(Greeting);
expect(b instanceof Greeting).not.toBe(true);
