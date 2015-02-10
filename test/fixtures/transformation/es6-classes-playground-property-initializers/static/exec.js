class MyClass {
  static myProp = { someValue: 42 };
}

assert.equal(MyClass.myProp.someValue, 42);
