/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/*jshint evil: true*/
/*jshint loopfunc: true*/

if (!!module.parent) {
  module.exports = {
    'TypeAnnotations': [
      'function foo(numVal: any){}',
      'function foo(numVal: number){}',
      'function foo(numVal: number, strVal: string){}',
      'function foo(numVal: number, untypedVal){}',
      'function foo(untypedVal, numVal: number){}',
      'function foo(nullableNum: ?number){}',
      'function foo(callback: () => void){}',
      'function foo(callback: () => number){}',
      'function foo(callback: (_:bool) => number){}',
      'function foo(callback: (_1:bool, _2:string) => number){}',
      'function foo(callback: (_1:bool, ...foo:Array<number>) => number){}',
      'function foo():number{}',
      'function foo():() => void{}',
      'function foo():(_:bool) => number{}',
      'function foo():(_?:bool) => number{}',
      'function foo(): {} {}',
      'function foo<T>() {}',
      'function foo<T: Foo>() {}',
      'function foo<T,S>() {}',
      'a=function<T,S>() {}',
      'a={set fooProp(value:number){}}',
      'a={set fooProp(value:number): void{}}',
      'a={get fooProp(): number {}}',
      'class Foo {set fooProp(value:number){}}',
      'class Foo {set fooProp(value:number): void{}}',
      'class Foo {get fooProp(): number{}}',
      'var numVal:number;',
      'var numVal:number = otherNumVal;',
      'var a: {numVal: number};',
      'var a: {numVal: number;};',
      'var a: {numVal: number; [indexer: string]: number};',
      'var a: ?{numVal: number};',
      'var a: {numVal: number; strVal: string}',
      'var a: {subObj: {strVal: string}}',
      'var a: {subObj: ?{strVal: string}}',
      'var a: {param1: number; param2: string}',
      'var a: {param1: number; param2?: string}',
      'var a: {add(x:number, ...y:Array<string>): void}',
      'var a: { id<T>(x: T): T; }',
      'var a:Array<number> = [1, 2, 3]',
      'a = class Foo<T> { }',
      'a = class Foo<T> extends Bar<T> { }',
      'class Foo<T> {}',
      'class Foo<T: Bar> {}',
      'class Foo<T> extends Bar<T> { }',
      'class Foo<T> extends mixin(Bar) { }',
      'class Foo<T> { bar<U>():number { return 42; }}',
      'class Foo { "bar"<T>() { } }',
      'function foo(requiredParam, optParam?) {}',
      'class Foo { prop1:string; prop2:number; }',
      'var x : number | string = 4;',
      'class Array { concat(items:number | string) {}; }',
      'var x : () => number | () => string = fn;',
      'var x: typeof Y = Y;',
      'var x: typeof Y | number = Y;',
      'var {x}: {x: string; } = { x: "hello" };',
      'var {x}: {x: string } = { x: "hello" };',
      'var [x]: Array<string> = [ "hello" ];',
      'function foo({x}: { x: string; }) {}',
      'function foo([x]: Array<string>) {}',
      'function foo(...rest: Array<number>) {}',
      '(function (...rest: Array<number>) {})',
      '((...rest: Array<number>) => rest)',
      'var a: Map<string, Array<string> >',
      'var a: Map<string, Array<string>>',
      'var a: number[]',
      'var a: ?string[]',
      'var a: Promise<bool>[]',
      'var a:(...rest:Array<number>) => number'
    ],
    'Type Alias': [
        'type FBID = number;',
        'type Foo<T> = Bar<T>',
    ],
    'Interfaces': [
        'interface A {}',
        'interface A extends B {}',
        'interface A<T> extends B<T>, C<T> {}',
        'interface A { foo: () => number; }',
        'interface Dictionary { [index: string]: string; length: number; }',
        'class Foo implements Bar {}',
        'class Foo extends Bar implements Bat, Man<number> {}',
        'class Foo extends class Bar implements Bat {} {}',
        'class Foo extends class Bar implements Bat {} implements Man {}',
    ],
    'Type Grouping': [
        'var a: (number)',
        'var a: (() => number) | () => string',
        'var a: number & (string | bool)',
        'var a: (typeof A)',
    ],
    'XJS': [
        '<a />',
        '<n:a n:v />',
        '<a n:foo="bar"> {value} <b><c /></b></a>',
        '<a b={" "} c=" " d="&amp;" e="id=1&group=2" f="&#123456789" g="&#123*;" h="&#x;" />',
        '<a\n/>',
        '<日本語></日本語>',
        '<AbC-def\n  test="&#x0026;&#38;">\nbar\nbaz\r\n</AbC-def>',
        '<a b={x ? <c /> : <d />} />',
        '<a>{}</a>',
        '<a>{/* this is a comment */}</a>',
        '<div>@test content</div>',
        '<div><br />7x invalid-js-identifier</div>',
        '<LeftRight left=<a /> right=<b>monkeys</b> />',
        '<a.b></a.b>',
        '<a.b.c></a.b.c>',
        '(<div />) < x;',
        '<div {...props} />',
        '<div {...props} post="attribute" />',
        '<div pre="leading" pre2="attribute" {...props}></div>',
        '<a>    </a>',
    ],
    'Call Properties': [
        'var a : { (): number }',
        'var a : { (): number; }',
        'var a : { (): number; y: string; (x: string): string }',
        'var a : { <T>(x: T): number; }',
        'interface A { (): number; }',
    ],
    'String Literal Types': [
        'function createElement(tagName: "div"): HTMLDivElement {}',
        'function createElement(tagName: \'div\'): HTMLDivElement {}',
    ],
    'Qualified Generic Type': [
        'var a : A.B',
        'var a : A.B.C',
        'var a : A.B<T>',
        'var a : typeof A.B<T>',
    ],
    'Declare Statements': [
        'declare var foo',
        'declare var foo;',
        'declare function foo(): void',
        'declare function foo(): void;',
        'declare function foo<T>(): void;',
        'declare function foo(x: number, y: string): void;',
        'declare class A {}',
        'declare class A<T> extends B<T> { x: number }',
        'declare class A { static foo(): number; static x : string }',
        'declare class A { static [ indexer: number]: string }',
        'declare class A { static () : number }',
    ],
    'Declare Module': [
        'declare module A {}',
        'declare module "./a/b.js" {}',
        'declare module A { declare var x: number; }',
        'declare module A { declare function foo(): number; }',
        'declare module A { declare class B { foo(): number; } }',
    ],
    'Typecasts': [
        '(xxx: number)',
        '({xxx: 0, yyy: "hey"}: {xxx: number; yyy: string})',
        // distinguish between function type params and typecasts
        '((xxx) => xxx + 1: (xxx: number) => number)',
        // parens disambiguate groups from casts
        '((xxx: number), (yyy: string))',
        '((xxx: any): number)',
    ],
  };
} else {
  require('mock-modules').autoMockOff();
  var tests = require('./gen/type-syntax-test.rec.js');
  var transform = require('../../src/jstransform').transform;
  var visitors = require('../type-syntax').visitorList;

  describe('transforms match expectations', function() {
    Object.keys(tests).forEach(function(sectionName) {
      var section = tests[sectionName];
      Object.keys(section).forEach(function(testCode) {
        it('transforms "' + testCode + '"', function() {
          expect(transform(visitors, testCode).code).toBe(section[testCode].transformed);
        });

        it('evals "' + testCode + '"', function() {
          var transformed = transform(visitors, testCode).code;
          var expected = section[testCode].eval;

          var evalFn = function() {
            eval(transformed);
          };

          if (expected === 'No error') {
            expect(evalFn).not.toThrow();
          } else {
            expect(evalFn).toThrow(expected);
          }
        });
      });
    });
  });
}
