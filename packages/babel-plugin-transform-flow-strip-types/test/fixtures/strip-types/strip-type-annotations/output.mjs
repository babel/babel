function foo1(numVal) {}
function foo2(numVal) {}
function foo3(numVal, strVal) {}
function foo4(numVal, untypedVal) {}
function foo5(untypedVal, numVal) {}
function foo6(nullableNum) {}
function foo7(callback) {}
function foo8(callback) {}
function foo9(callback) {}
function foo10(callback) {}
function foo11(callback) {}
function foo12() {}
function foo13() {}
function foo14() {}
function foo15() {}
function foo16() {}
function foo17() {}
function foo18() {}
a1 = function () {};
a2 = {
  set fooProp(value) {}
};
a3 = {
  set fooProp(value) {}
};
a4 = {
  get fooProp() {}
};
a5 = {
  id(x) {}
};
a6 = {
  *id(x) {}
};
a7 = {
  async id(x) {}
};
a8 = {
  123(x) {}
};
class Foo {
  set fooProp(value) {}
}
class Foo2 {
  set fooProp(value) {}
}
class Foo3 {
  get fooProp() {}
}
var numVal;
var numVal = otherNumVal;
var a1;
var a2;
var a3;
var a4;
var a5;
var a6;
var a7;
var a8;
var a9;
var a10;
var a11;
var a12;
var a13;
var a14 = [1, 2, 3];
a13 = class Foo {};
a14 = class Foo extends Bar {};
class Foo4 {}
class Foo5 extends Bar {}
class Foo6 extends mixin(Bar) {}
class Foo7 {
  bar() {
    return 42;
  }
}
class Foo8 {
  "bar"() {}
}
function foo19(requiredParam, optParam) {}
class Foo9 {
  prop1;
  prop2;
}
class Foo10 {
  static prop1;
  prop2;
}
class Foo11 {
  #prop1;
  #prop2;
}
var x1 = 4;
class Array {
  concat(items) {}
}
var x2 = fn;
var x3 = Y;
var x4 = Y;
var {
  x5
} = {
  x5: "hello"
};
var {
  x6
} = {
  x6: "hello"
};
var [x7] = ["hello"];
function foo20({
  x
}) {}
function foo21([x]) {}
function foo22(...rest) {}
(function (...rest) {});
(...rest) => rest;
var a15;
var a16;
var a17;
var a18;
var a19;
var a20;
var identity1;
var identity2;
import type from "foo";
import { V1 } from "foo";
import { V4 } from "foo";
import 'foo';
