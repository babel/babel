"use strict";

var _temp;
var fn = obj.method.bind(obj);
var fn = obj.method.bind(obj, "foob");
var fn = obj[foo].method.bind(obj[foo]);
var fn = obj.foo.method.bind(obj.foo);
var fn = (_temp = obj[foo()], _temp.method.bind(_temp));
