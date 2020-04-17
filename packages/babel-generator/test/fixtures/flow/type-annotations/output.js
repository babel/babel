function foo1(numVal: any) {}

function foo2(numVal: number) {}

function foo3(numVal: number, strVal: string) {}

function foo4(numVal: number, untypedVal) {}

function foo5(untypedVal, numVal: number) {}

function foo6(nullableNum: ?number) {}

function foo7(callback: () => void) {}

function foo8(callback: () => number) {}

function foo9(callback: (_: boolean) => number) {}

function foo10(callback: (_1: boolean, _2: string) => number) {}

function foo11(callback: (_1: boolean, ...foo: Array<number>) => number) {}

function foo12(): number {}

function foo13(): () => void {}

function foo14(): (_: boolean) => number {}

function foo15(): (_?: boolean) => number {}

function foo16(): {} {}

function foo17<T>() {}

function foo18<T, S>() {}

function foo19<T: F>() {}

a1 = function <T, S>() {};

a2 = {
  set fooProp(value: number) {}

};
a3 = {
  set fooProp(value: number): void {}

};
a4 = {
  get fooProp(): number {}

};
a5 = {
  id<T>(x: T): T {}

};
a6 = {
  *id<T>(x: T): T {}

};
a7 = {
  async id<T>(x: T): T {}

};
a8 = {
  123<T>(x: T): T {}

};

class Foo1 {
  set fooProp(value: number) {}

}

class Foo2 {
  set fooProp(value: number): void {}

}

class Foo3 {
  get fooProp(): number {}

}

var numVal1: number;
var numVal2: empty;
var numVal3: mixed;
var numVal4: number = otherNumVal;
var a1: {
  numVal: number
};
var a2: {
  numVal: number
};
var a3: {
  numVal: number,
  [indexer: string]: number,
};
var a4: ?{
  numVal: number
};
var a5: {
  numVal: number,
  strVal: string,
};
var a6: {
  subObj: {
    strVal: string
  }
};
var a7: {
  subObj: ?{
    strVal: string
  }
};
var a8: {
  param1: number,
  param2: string,
};
var a9: {
  param1: number,
  param2?: string,
};
var a10: {
  [a: number]: string,
  [b: number]: string,
};
var a11: {
  add(x: number, ...y: Array<string>): void
};
var a12: {
  subtract: (x: number, ...y: Array<string>) => void
};
var a13: {
  id<T>(x: T): T
};
var a14: Array<number> = [1, 2, 3];
a13 = class Foo<T> {};
a14 = class Foo<T> extends Bar<T> {};

class Foo4<T> {}

class Foo5<T> extends Bar<T> {}

class Foo6<T> extends mixin(Bar) {}

class Foo7<T> {
  bar<U>(): number {
    return 42;
  }

}

class Foo8 {
  "bar"<T>() {}

}

function foo20(requiredParam, optParam?) {}

class Foo9 {
  prop1: string;
  prop2: number;
}

class Foo10 {
  static prop1: string;
  prop2: number;
}

class Foo11 {
  #prop1: string;
  prop2: number;
}

var x1: number | string = 4;

class Array {
  concat(items: number | string) {}

}

var x2: () => number | (() => string) = fn;
var x3: typeof Y = Y;
var x4: typeof Y | number = Y;
var {
  x5
}: {
  x5: string
} = {
  x5: "hello"
};
var {
  x6
}: {
  x6: string
} = {
  x6: "hello"
};
var [x7]: Array<string> = ["hello"];

function foo21({
  x
}: {
  x: string
}) {}

function foo22([x]: Array<string>) {}

function foo23(...rest: Array<number>) {}

(function (...rest: Array<number>) {});

(...rest: Array<number>) => rest;

var a15: Map<string, Array<string>>;
var a16: Map<string, Array<string>>;
var a17: number[];
var a18: ?string[];
var a19: Promise<boolean>[];
var a20: (...rest: Array<number>) => number;
var identity1: <T>(x: T) => T;
var identity2: <T>(x: T, ...y: T[]) => T;
import type foo24 from "bar";
import type { foo25, bar1 } from "baz";
import type { foo as bar2 } from "baz";
import type from "foo";
import type2, { foo26 } from "bar";
import typeof * as namespace from "bar";
import { type Foo12 } from "bar";
import { typeof Foo13 } from "bar";
import { type Foo as Bar1 } from "bar";
import { typeof Foo as Bar2 } from "bar";
export type { foo1 };
export type { bar } from "bar";
export interface baz {
  p: number
}
export interface qux<T> {
  p: T
}
var a21: ?Array<?string>;
var a22: {|
  numVal: number
|};
var a23: {|
  numVal: number
|};
var a24: {|
  numVal: number,
  [indexer: string]: number,
|};
var a25: ?{|
  numVal: number
|};
var a26: {|
  numVal: number,
  strVal: string,
|};
var a27: {|
  subObj: {
    strVal: string
  }
|};
var a28: {|
  subObj: ?{
    strVal: string
  }
|};
var a29: {|
  param1: number,
  param2: string,
|};
var a30: {|
  param1: number,
  param2?: string,
|};
var a31: {|
  [a: number]: string,
  [b: number]: string,
|};
var a32: {|
  add(x: number, ...y: Array<string>): void
|};
var a33: {|
  subtract: (x: number, ...y: Array<string>) => void
|};
var a34: {|
  id<T>(x: T): T
|};

function foo27(numVal: number = 2) {}

function foo28(numVal?: number = 2) {}

export type * from "foo";
const foo29: symbol = Symbol();