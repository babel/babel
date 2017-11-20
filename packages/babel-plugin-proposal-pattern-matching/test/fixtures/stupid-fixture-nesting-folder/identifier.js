"use strict"

var arr = [1,2,3]

assert.equal(match(arr) {
  Array: "array",
  else: "errror"
}, "array");

class Foo {

}

var foo = new Foo()

assert.equal(match(foo) {
  Foo: "foo",
  else: "bar"
}, "foo");

var testReg = /hello/

assert.equal(match("helloworld") {
  Array: "array",
  Foo: "fooooooo",
  testReg: "foo",
  else: "bar"
}, "foo");
