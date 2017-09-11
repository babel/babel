function foo(numVal: any) {}
function foo(numVal: number) {}
function foo(numVal: number, strVal: string) {}
function foo(numVal: number, untypedVal) {}
function foo(untypedVal, numVal: number) {}
function foo(nullableNum: ?number) {}
function foo(callback: () => void) {}
function foo(callback: () => number) {}
function foo(callback: (_: bool) => number) {}
function foo(callback: (_1: bool, _2: string) => number) {}
function foo(callback: (_1: bool, ...foo: Array<number>) => number) {}
function foo(): number{}
function foo():() => void {}
function foo():(_:bool) => number{}
function foo():(_?:bool) => number{}
function foo(): {} {}
function foo<T>() {}
function foo<T,S>() {}
a = function<T,S>() {};
a = { set fooProp(value: number) {} };
a = { set fooProp(value: number): void {} };
a = { get fooProp():number{} };
a = { id<T>(x: T): T {} };
a = { *id<T>(x: T): T {} };
a = { async id<T>(x: T): T {} };
a = { 123<T>(x: T): T {} };
class Foo {
  set fooProp(value: number) {}
}
class Foo2 {
  set fooProp(value: number): void {}
}
class Foo3 {
  get fooProp(): number {}
}
var numVal: number;
var numVal: number = otherNumVal;
var a: { numVal: number };
var a: { numVal: number; };
var a: { numVal: number; [indexer: string]: number };
var a: ?{ numVal: number };
var a: { numVal: number; strVal: string }
var a: { subObj: {strVal: string} }
var a: { subObj: ?{strVal: string} }
var a: { param1: number; param2: string }
var a: { param1: number; param2?: string }
var a: { ...any; ...{}|{p: void} };
var a: { [a: number]: string; [b: number]: string; };
var a: { add(x: number, ...y: Array<string>): void };
var a: { id<T>(x: T): T; };
var a:Array<number> = [1, 2, 3]
a = class Foo<T> {}
a = class Foo<T> extends Bar<T> {}
class Foo4<T> {}
class Foo5<T> extends Bar<T> {}
class Foo6<T> extends mixin(Bar) {}
class Foo7<T> {
  bar<U>():number { return 42; }
}
class Foo8 {
  "bar"<T>() {}
}
function foo(requiredParam, optParam?) {}
class Foo9 {
  prop1: string;
  prop2: number;
}
class Foo10 {
  static prop1: string;
  prop2: number;
}
var x: number | string = 4;
class Array { concat(items:number | string) {}; }
var x: () => number | () => string = fn;
var x: typeof Y = Y;
var x: typeof Y | number = Y;
var {x}: {x: string; } = { x: "hello" };
var {x}: {x: string } = { x: "hello" };
var [x]: Array<string> = [ "hello" ];
function foo({x}: { x: string; }) {}
function foo([x]: Array<string>) {}
function foo(...rest: Array<number>) {}
(function (...rest: Array<number>) {});
((...rest: Array<number>) => rest);
var a: Map<string, Array<string> >
var a: Map<string, Array<string>>
var a: number[]
var a: ?string[]
var a: Promise<bool>[]
var a:(...rest:Array<number>) => number
var identity: <T>(x: T) => T
var identity: <T>(x: T, ...y:T[]) => T
import type foo4 from "bar";
import type { foo2, bar } from "baz";
import type { foo as bar2 } from "baz";
import type from "foo";
import type2, { foo3 } from "bar";
import type * as namespace from "bar";
export type { foo };
export type { foo2 } from "bar";
import {type T} from "foo";
import {type T2, V1} from "foo";
import {typeof V2} from "foo";
import {typeof V3, V4} from "foo";
export interface foo5 { p: number }
export interface foo6<T> { p: T }
import 'foo';
export type * from "foo";
