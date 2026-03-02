// test262/test/language/expressions/super/call-spread-err-sngl-err-itr-get-get.js

var iter = {};
Object.defineProperty(iter, Symbol.iterator, {
  get: function() {
    throw new Error("err");
  }
});

class Test262ParentClass {
  constructor() {}
}

class Test262ChildClass extends Test262ParentClass {
  constructor() {
    super(...iter);
  }
}

expect(()=>{
  new Test262ChildClass();
}).toThrow("err");
