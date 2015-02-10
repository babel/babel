class MyClass {
  myProp = { someValue: 42 };
}

var myClass = new MyClass;
assert.ok(myClass.myProp !== MyClass.prototype.myProp);
assert.equal(myClass.myProp.someValue, 42);
