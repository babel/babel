/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails jeffmo@fb.com
 */

/*jshint evil:true*/
/*jshint -W117*/

jest.autoMockOff();

describe('es6-classes', function() {
  var transformFn;
  var classVisitors;
  var arrowFunctionVisitors;
  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();

    transformFn = require('../../src/jstransform').transform;

    classVisitors = require('../es6-class-visitors').visitorList;
    arrowFunctionVisitors = require('../es6-arrow-function-visitors').visitorList;

    visitors = classVisitors.concat(arrowFunctionVisitors);
  });

  function transform(code, opts) {
    return transformFn(visitors, code, opts).code;
  }

  describe('ClassDeclarations', function() {
    describe('preserves line numbers', function() {
      it('does not add "use strict" unless necessary', function() {
        var code = [
          'function strictStuff() {',
          '  "use strict";',
          '  class A {',
          '    foo() {}',
          '  }',
          '}',
          'class B {',
          '  bar() {',
          '    class C {}',
          '  }',
          '}'
        ].join('\n');

        var expected = [
          'function strictStuff() {',
          '  "use strict";',
          '  function A(){}',
          '    Object.defineProperty(A.prototype,"foo",{writable:true,configurable:true,value:function() {}});',
          '  ',
          '}',
          'function B(){"use strict";}',
          '  Object.defineProperty(B.prototype,"bar",{writable:true,configurable:true,value:function() {"use strict";',
          '    function C(){}',
          '  }});',
          ''
        ].join('\n');

        expect(transform(code)).toBe(expected);
      });

      it('preserves lines with no inheritance', function() {
        var code = [
          '"use strict";',
          'class Foo {',
          '  foo() {',
          '    ',
          '    ',
          '  }',
          '',
          '  constructor(p1,',
          '              p2) {',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '',
          '  bar(){}',
          '  static baz() {',
          '}',
          '}'
        ].join('\n');

        var expected = [
          '"use strict";',
          '',
          '  Object.defineProperty(Foo.prototype,"foo",{writable:true,configurable:true,value:function() {',
          '    ',
          '    ',
          '  }});',
          '',
          '  function Foo(p1,',
          '              p2) {',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '',
          '  Object.defineProperty(Foo.prototype,"bar",{writable:true,configurable:true,value:function(){}});',
          '  Object.defineProperty(Foo,"baz",{writable:true,configurable:true,value:function() {',
          '}});',
          ''
        ].join('\n');

        expect(transform(code)).toBe(expected);
      });

      it('preserves lines with inheritance from identifier', function() {
        var code = [
          'class Foo extends Bar {',
          '  foo() {',
          '    ',
          '    ',
          '    super(p1,',
          '          p2);',
          '  }',
          '',
          '  constructor(p1,',
          '              p2) {',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '    super.blah(p1,',
          '               p2);',
          '  }',
          '',
          '  bar(){}',
          '  static baz() {',
          '}',
          '}'
        ].join('\n');

        var expected = [
          'for(var Bar____Key in Bar){' +
            'if(Bar.hasOwnProperty(Bar____Key)){' +
              'Foo[Bar____Key]=Bar[Bar____Key];' +
            '}' +
          '}' +
          'var ____SuperProtoOfBar=' +
            'Bar===null' +
              '?null:' +
              'Bar.prototype;' +
          'Foo.prototype=Object.create(____SuperProtoOfBar);' +
          'Foo.prototype.constructor=Foo;' +
          'Foo.__superConstructor__=Bar;',

          '  Object.defineProperty(Foo.prototype,"foo",{writable:true,configurable:true,value:function() {"use strict";',
          '    ',
          '    ',
          '    ____SuperProtoOfBar.foo.call(this,p1,',
          '          p2);',
          '  }});',
          '',
          '  function Foo(p1,',
          '              p2) {"use strict";',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '    ____SuperProtoOfBar.blah.call(this,p1,',
          '               p2);',
          '  }',
          '',
          '  Object.defineProperty(Foo.prototype,"bar",{writable:true,configurable:true,value:function(){"use strict";}});',
          '  Object.defineProperty(Foo,"baz",{writable:true,configurable:true,value:function() {"use strict";',
          '}});',
          ''
        ].join('\n');

        expect(transform(code)).toBe(expected);
      });

      it('preserves lines with inheritance from expression', function() {
        var code = [
          'class Foo extends mixin(Bar, Baz) {',
          '  foo() {',
          '    ',
          '    ',
          '  }',
          '',
          '  constructor(p1,',
          '              p2) {',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '',
          '  bar(){}',
          '  static baz() {',
          '}',
          '}'
        ].join('\n');

        var expected = [
          'var ____Class0=mixin(Bar, Baz);' +
          'for(var ____Class0____Key in ____Class0){' +
            'if(____Class0.hasOwnProperty(____Class0____Key)){' +
              'Foo[____Class0____Key]=____Class0[____Class0____Key];' +
            '}' +
          '}' +
          'var ____SuperProtoOf____Class0=' +
            '____Class0===null' +
              '?null' +
              ':____Class0.prototype;' +
          'Foo.prototype=Object.create(____SuperProtoOf____Class0);' +
          'Foo.prototype.constructor=Foo;' +
          'Foo.__superConstructor__=____Class0;',

          '  Object.defineProperty(Foo.prototype,"foo",{writable:true,configurable:true,value:function() {"use strict";',
          '    ',
          '    ',
          '  }});',
          '',
          '  function Foo(p1,',
          '              p2) {"use strict";',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '',
          '  Object.defineProperty(Foo.prototype,"bar",{writable:true,configurable:true,value:function(){"use strict";}});',
          '  Object.defineProperty(Foo,"baz",{writable:true,configurable:true,value:function() {"use strict";',
          '}});',
          ''
        ].join('\n');

        expect(transform(code)).toBe(expected);
      });
    });

    describe('functional tests', function() {
      it('handles an empty body', function() {
        var code = transform(
          'class Foo {}'
        );

        eval(code);

        var fooInst = new Foo();
        expect(fooInst instanceof Foo).toBe(true);
      });

      it('handles constructors without params', function() {
        var code = transform([
          'class Foo {',
          '  constructor() {',
          '    this.test = "testValue";',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        expect(fooInst.test).toBe('testValue');
      });

      it('handles constructors with params', function() {
        var code = transform([
          'class Foo {',
          '  constructor(p1, p2) {',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo('a', 'b');
        expect(fooInst.p1).toBe('a');
        expect(fooInst.p2).toBe('b');
      });

      it('handles prototype methods without params', function() {
        var code = transform([
          'class Foo {',
          '  bar() {',
          '    return "stuff";',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        expect(fooInst.bar()).toBe('stuff');
      });

      it('handles prototype methods with params', function() {
        var code = transform([
          'class Foo {',
          '  bar(p1, p2) {',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        fooInst.bar('a', 'b');
        expect(fooInst.p1).toBe('a');
        expect(fooInst.p2).toBe('b');
      });

      it('handles static methods without params', function() {
        var code = transform([
          'class Foo {',
          '  static bar() {',
          '    return "stuff";',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        expect(Foo.bar()).toBe('stuff');
        var fooInst = new Foo();
        expect(fooInst.bar).toBe(undefined);
      });

      it('handles static methods with params', function() {
        var code = transform([
          'class Foo {',
          '  static bar(p1, p2) {',
          '    return [p1, p2];',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        expect(Foo.bar('a', 'b')).toEqual(['a', 'b']);
        var fooInst = new Foo();
        expect(fooInst.bar).toBe(undefined);
      });

      it('handles extension from an identifier', function() {
        var code = transform([
          'function Parent() {}',
          'Parent.prototype.protoProp = "protoProp";',
          'Parent.staticProp = "staticProp";',

          'class Child extends Parent {}'
        ].join('\n'));

        var exports = new Function(
          code + 'return {Child: Child, Parent: Parent};'
        )();
        var Child = exports.Child;
        var Parent = exports.Parent;

        expect(Child.protoProp).toBe(undefined);
        expect(Child.staticProp).toBe('staticProp');
        var childInst = new Child();
        expect(childInst instanceof Child).toBe(true);
        expect(childInst instanceof Parent).toBe(true);
        expect(childInst.protoProp).toBe('protoProp');
      });

      // ES6 draft section 14.5
      it('handles extension from a left hand expression', function() {
        var code = transform([
          'function Parent1() {}',
          'Parent1.prototype.protoProp = "protoProp";',
          'Parent1.staticProp = "staticProp";',

          'function Parent2() {}',

          'class Child extends (true ? Parent1 : Parent2) {}'
        ].join('\n'));

        var exports = new Function(
          code + 'return {Parent1: Parent1, Child: Child};'
        )();
        var Child = exports.Child;
        var Parent1 = exports.Parent1;

        expect(Child.protoProp).toBe(undefined);
        expect(Child.staticProp).toBe('staticProp');
        var childInst = new Child();
        expect(childInst instanceof Child).toBe(true);
        expect(childInst instanceof Parent1).toBe(true);
        expect(childInst.protoProp).toBe('protoProp');
        expect(childInst.staticProp).toBe(undefined);
      });

      it('runs parent constructor when child constructor absent', function() {
        var code = transform([
          'class Parent {',
          '  constructor(p1, p2) {',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '}',

          'class Child extends Parent {}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child('a', 'b');
        expect(childInst.p1).toBe('a');
        expect(childInst.p2).toBe('b');
      });

      it('sets constructor property to point at constructor func', function() {
        var code = transform([
          'class Parent {}',
          'class Child extends Parent {}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child();
        expect(childInst.constructor).toBe(Child);
      });

      it('handles super CallExpressions within constructors', function() {
        var code = transform([
          'class Parent {',
          '  constructor(p1, p2) {',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '}',

          'class Child extends Parent {',
          '  constructor() {',
          '    super("a", "b");',
          '    this.childRan = true;',
          '  }',
          '}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child();
        expect(childInst.p1).toBe('a');
        expect(childInst.p2).toBe('b');
        expect(childInst.childRan).toBe(true);
      });

      it('handles super CallExpressions within proto methods', function() {
        var code = transform([
          'class Parent {',
          '  bar(p1, p2) {',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '  "baz qux"(p3) {',
          '    this.p3 = p3;',
          '  }',
          '}',

          'class Child extends Parent {',
          '  bar() {',
          '    super("a", "b");',
          '    this.barRan = true;',
          '  }',
          '  "baz qux"() {',
          '    super("c");',
          '    this["baz qux run"] = true;',
          '  }',
          '}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child();
        expect(childInst.p1).toBe(undefined);
        expect(childInst.p2).toBe(undefined);
        expect(childInst.barRan).toBe(undefined);

        childInst.bar();
        expect(childInst.p1).toBe('a');
        expect(childInst.p2).toBe('b');
        expect(childInst.barRan).toBe(true);

        expect(childInst.p3).toBe(undefined);
        expect(childInst['baz qux run']).toBe(undefined);

        childInst['baz qux']();
        expect(childInst.p3).toBe('c');
        expect(childInst['baz qux run']).toBe(true);
      });

      it('handles computed super MemberExpressions',
         function() {
        var code = transform([
          'class Parent {',
          '  constructor() {',
          '    this.counter = 0;',
          '  }',
          '  incrementCounter(amount) {',
          '    this.counter += amount;',
          '  }',
          '}',

          'class Child extends Parent {',
          '  childIncrement() {',
          '    super["increment" + "Counter"](2);',
          '  }',
          '}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child();
        expect(childInst.counter).toBe(0);
        childInst.childIncrement();
        expect(childInst.counter).toBe(2);
      });

      it('handles simple super MemberExpression access', function() {
        var code = transform([
          'class Parent {',
          '  getFoo(p) {',
          '    return "foo" + p;',
          '  }',
          '}',

          'class Child extends Parent {',
          '  getChildFoo() {',
          '    var x = super.getFoo;',
          '    return x("bar");',
          '  }',
          '}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child();
        expect(childInst.getChildFoo()).toBe('foobar');
      });

      it('handles CallExpression on a super MemberExpression', function() {
        var code = transform([
          'class Parent {',
          '  getFoo(p) {',
          '    this.fooValue = "foo";',
          '    return this.fooValue + p;',
          '  }',
          '}',

          'class Child extends Parent {',
          '  getChildFoo() {',
          '    return super.getFoo.call(this, "bar");',
          '  }',
          '}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child();
        expect(childInst.getChildFoo()).toBe('foobar');
        expect(childInst.fooValue).toBe('foo');
      });

      it('handles super MemberExpressions within constructors', function() {
        var code = transform([
          'class Parent {',
          '  setParams(p1, p2) {',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '}',

          'class Child extends Parent {',
          '  constructor() {',
          '    super.setParams("a", "b");',
          '  }',
          '}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child();
        expect(childInst.p1).toBe('a');
        expect(childInst.p2).toBe('b');
      });

      it('handles super MemberExpressions within proto methods', function() {
        var code = transform([
          'class Parent {',
          '  setParams(p1, p2) {',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '}',

          'class Child extends Parent {',
          '  bar() {',
          '    super.setParams("a", "b");',
          '    this.barRan = true;',
          '  }',
          '}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child();
        expect(childInst.p1).toBe(undefined);
        expect(childInst.p2).toBe(undefined);
        expect(childInst.barRan).toBe(undefined);
        childInst.bar();
        expect(childInst.p1).toBe('a');
        expect(childInst.p2).toBe('b');
        expect(childInst.barRan).toBe(true);
      });

      it('consistently munges private property identifiers', function() {
        var code = transform([
          'class Foo {',
          '  constructor(p1) {',
          '    this._p1 = p1;',
          '  }',
          '  getP1() {',
          '    return this._p1;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo('a');
        expect(fooInst._p1).toBe(undefined);
        expect(fooInst.getP1()).toBe('a');
      });

      it('stores munged private properties on the instance', function() {
        // Protects against subtle transform bugs like:
        //   `this._p1 = 42` -> `this$Foo_p1 = 42`
        var code = transform([
          'class Foo {',
          '  constructor(p1) {',
          '    this._p1 = p1;',
          '  }',
          '  getP1() {',
          '    return this._p1;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst1 = new Foo('a');
        var fooInst2 = new Foo('b');
        expect(fooInst1.getP1()).toBe('a');
        expect(fooInst2.getP1()).toBe('b');
      });

      it('consistently munges nested private property identifiers', function() {
        var code = transform([
          'class Foo {',
          '  constructor(p1) {',
          '    this._data = {_p1: null};',
          '    this._data._p1 = p1;',
          '  }',
          '  getData() {',
          '    return this._data;',
          '  }',
          '  getP1() {',
          '    return this._data._p1;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo('a');
        expect(fooInst.getData()._p1).toBe(undefined);
        expect(fooInst.getP1()).toBe('a');
      });

      it('consistently munges private method identifiers', function() {
        var code = transform([
          'class Foo {',
          '  getBar() {',
          '    return this._getBar();',
          '  }',
          '  _getBar() {',
          '    return 42;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        expect(fooInst._getBar).toBe(undefined);
        expect(fooInst.getBar()).toBe(42);
      });

      it('consistently munges private method params', function() {
        var code = transform([
          'class Foo {',
          '  bar(_counter, _function) {',
          '    this.counter = _counter;',
          '    _function();',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        var callbackCalled = false;
        fooInst.bar(42, function() { callbackCalled = true; });
        expect(fooInst.counter).toBe(42);
        expect(callbackCalled).toBe(true);
      });

      it('consistently munges private idents in super call params', function() {
        var code = transform([
          'class Parent {',
          '  constructor(foo) {',
          '    this.foo = foo;',
          '  }',
          '  setBar(bar) {',
          '    this.bar = bar;',
          '  }',
          '}',
          'class Child extends Parent {',
          '  constructor(_foo, _bar) {',
          '    super(_foo);',
          '    super.setBar(_bar);',
          '  }',
          '}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child('foo', 'bar');
        expect(childInst.foo).toBe('foo');
        expect(childInst.bar).toBe('bar');
      });

      it('consistently munges private idents in nested funcs', function() {
        var code = transform([
          'class Foo {',
          '  bar(_p1, p2) {',
          '    return function(_a) {',
          '      return [_p1, p2, _a];',
          '    };',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        expect(fooInst.bar('a', 'b')('c')).toEqual(['a', 'b', 'c']);
      });

      it('consistently munges private idents in nested arrow funcs', function() {
        var code = transform([
          'class Foo {',
          '  bar(_p1, p2) {',
          '    return (_a, b) => {',
          '      return [_p1, p2, _a, b];',
          '    };',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        expect(fooInst.bar('a', 'b')('c', 'd')).toEqual(['a', 'b', 'c', 'd']);
      });

      it('does not munge dunder-scored properties', function() {
        var code = transform([
          'class Foo {',
          '  constructor(p1) {',
          '    this.__p1 = p1;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo('a');
        expect(fooInst.__p1).toBe('a');
      });

      it('does not munge dunder-scored methods', function() {
        var code = transform([
          'class Foo {',
          '  __getBar() {',
          '    return 42;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        expect(fooInst.__getBar()).toBe(42);
      });

      it('properly handles private vars declared in outer scope', function() {
        var code = transform([
          'var _bar = "outer";',
          'class Foo {',
          '  getOuterBar() {',
          '    return _bar;',
          '  }',
          '}'
        ].join('\n'));

        var Foo = new Function(code + 'return Foo;')();

        var fooInst = new Foo();
        expect(fooInst.getOuterBar()).toBe('outer');
      });

      it('does not munge outer-declared private vars when used to calculate ' +
         'a computed member expression', function() {
        var code = transform([
          'var _privateObjKey = "pvt";',
          'var outerDataStore = {pvt: 42};',
          'class Foo {',
          '  getStuff() {',
          '    return outerDataStore[_privateObjKey];',
          '  }',
          '}'
        ].join('\n'));

        var Foo = new Function(code + 'return Foo;')();

        var fooInst = new Foo();
        expect(fooInst.getStuff()).toBe(42);
      });

      it('properly handles private vars declared in inner scope', function() {
        var code = transform([
          'var _bar = {_private: 42};',
          'class Foo {',
          '  getBarPrivate(p1) {',
          '    var _bar = {_private: p1};',
          '    return _bar._private;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        expect(fooInst.getBarPrivate('a')).toBe('a');
      });

      it('munges properties of private vars declared out of scope', function() {
        var code = transform([
          'var _bar = {_private: 42}',
          'class Foo {',
          '  getOuterPrivate() {',
          '    return _bar._private;',
          '  }',
          '}'
        ].join('\n'));

        var exports = new Function(code + 'return {_bar: _bar, Foo: Foo};')();
        var _bar = exports._bar;
        var Foo = exports.Foo;

        var fooInst = new Foo();
        expect(_bar._private).toBe(42);
        expect(fooInst.getOuterPrivate()).toBe(undefined);
      });

      it('does not munge when @preventMunge is specified', function() {
        var code = transform([
          '/**',
          ' * @preventMunge',
          ' */',
          'class Foo {',
          '  constructor(p1) {',
          '    this._p1 = p1;',
          '  }',
          '  _privateMethod() {',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo('a');
        expect(fooInst._p1).toBe('a');
        expect(fooInst._privateMethod).not.toBe(undefined);
      });

      it('minifies private properties when minify opt is set', function() {
        var code = transform([
          'class Foo {',
          '  constructor(p1) {',
          '    this._p1 = p1;',
          '  }',
          '}'
        ].join('\n'), {minify: true});

        eval(code);

        var fooInst = new Foo('a');
        expect(fooInst.$Foo0).toBe('a');
      });

      it('minifies private methods when minify opt is set', function() {
        var code = transform([
          'class Foo {',
          '  _bar() {',
          '    return 42;',
          '  }',
          '}'
        ].join('\n'), {minify: true});

        eval(code);

        var fooInst = new Foo();
        expect(fooInst.$Foo0()).toBe(42);
      });

      it('munges child class different from parent in same file', function() {
        var code = transform([
          'class Parent {',
          '  setParentFoo(foo) {',
          '    this._foo = foo;',
          '  }',
          '  getParentFoo() {',
          '    return this._foo;',
          '  }',
          '}',

          'class Child extends Parent {',
          '  setChildFoo(foo) {',
          '    this._foo = foo;',
          '  }',
          '  getChildFoo() {',
          '    return this._foo;',
          '  }',
          '}'
        ].join('\n'));

        var Child = new Function(code + 'return Child;')();

        var childInst = new Child();
        childInst.setParentFoo('parent');
        childInst.setChildFoo('child');
        expect(childInst.getParentFoo()).toBe('parent');
        expect(childInst.getChildFoo()).toBe('child');
      });

      it('munges child class different from parent in other file', function() {
        var code1 = transform([
          'class Parent {',
          '  setParentFoo(foo) {',
          '    this._foo = foo;',
          '  }',
          '  getParentFoo() {',
          '    return this._foo;',
          '  }',
          '}'
        ].join('\n'));

        var code2 = transform([
          'class Child extends Parent {',
          '  setChildFoo(foo) {',
          '    this._foo = foo;',
          '  }',
          '  getChildFoo() {',
          '    return this._foo;',
          '  }',
          '}'
        ].join('\n'));

        var exports = new Function(
          code1 + code2 + 'return {Parent: Parent, Child: Child};'
        )();
        var Child = exports.Child;

        var childInst = new Child();
        childInst.setParentFoo('parent');
        childInst.setChildFoo('child');
        expect(childInst.getParentFoo()).toBe('parent');
        expect(childInst.getChildFoo()).toBe('child');
      });

      it('makes class methods implicitly "use strict"', function() {
        var code = transform([
          'class Foo {',
          '  constructor() {',
          '    this.constructorIsStrict = ' +
                 '(function() {return this === undefined;})();',
          '  }',
          '  protoFn() {',
          '    return (function() {return this === undefined;})();',
          '  }',
          '  static staticFn() {',
          '    return (function() {return this === undefined;})();',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        expect(fooInst.constructorIsStrict).toBe(true);
        expect(fooInst.protoFn()).toBe(true);
        expect(Foo.staticFn()).toBe(true);
      });

      it('preserves generators', function() {
        var code =  transform([
          'class Foo {',
          '  static *title() {',
          '    yield 21;',
          '  }',
          '',
          '  *gen() {',
          '    yield 42;',
          '  }',
          '}'
        ].join('\n'));

        expect(code).toMatch(/function\*\(/);
        expect(code).toMatch(/function\*\(/);
      });

      it('properly handles methods in ES3 compat mode', function() {
        var code =  transform([
          'class Foo {',
          '  title() {',
          '    return 42;',
          '  }',
          '}'
        ].join('\n'), {es3: true});

        eval(code);

        var fooInst = new Foo();
        var descriptor =
          Object.getOwnPropertyDescriptor(Foo.prototype, 'title');

        expect(fooInst.title()).toBe(42);
        expect(descriptor.enumerable).toBe(true);
        expect(descriptor.configurable).toBe(true);
      });

      it('properly handles static methods in ES3 compat mode', function() {
        var code =  transform([
          'class Foo {',
          '  static title() {',
          '    return 42;',
          '  }',
          '}'
        ].join('\n'), {es3: true});

        eval(code);

        var descriptor =
          Object.getOwnPropertyDescriptor(Foo, 'title');

        expect(Foo.title()).toBe(42);
        expect(descriptor.enumerable).toBe(true);
        expect(descriptor.configurable).toBe(true);
      });

      it('properly handles getter methods in ES5 compat mode', function() {
        var code =  transform([
          'class Foo {',
          '  get title() {',
          '    return 42;',
          '  }',
          '  get "foo bar"() {',
          '    return 21;',
          '  }',
          '}'
        ].join('\n'), {es5: true});

        eval(code);

        var fooInst = new Foo();
        var descriptor =
          Object.getOwnPropertyDescriptor(Foo.prototype, 'title');

        expect(fooInst.title).toBe(42);
        expect(descriptor.enumerable).toBe(false);
        expect(descriptor.configurable).toBe(true);
        expect(fooInst['foo bar']).toBe(21);
      });

      it('properly handles setter methods in ES5 compat mode', function() {
        var code =  transform([
          'class Foo {',
          '  set title(value) {',
          '    this.__title = 42;',
          '  }',
          '  set "foo bar"(value) {',
          '    this.__fooBar = 21;',
          '  }',
          '}'
        ].join('\n'), {es5: true});

        eval(code);

        var fooInst = new Foo();
        fooInst.title = 42;
        fooInst['foo bar'] = 21;
        var descriptor =
          Object.getOwnPropertyDescriptor(Foo.prototype, 'title');

        expect(fooInst.__title).toBe(42);
        expect(descriptor.enumerable).toBe(false);
        expect(descriptor.configurable).toBe(true);
        expect(fooInst.__fooBar).toBe(21);
      });

      it('properly handles getters and setters in ES5 compat mode', function() {
        var code =  transform([
          'class Foo {',
          '  get title() {',
          '    return this.__title;',
          '  }',
          '',
          '  set title(value) {',
          '    this.__title = value;',
          '  }',
          '}'
        ].join('\n'), {es5: true});

        eval(code);

        var fooInst = new Foo();
        var descriptor =
          Object.getOwnPropertyDescriptor(Foo.prototype, 'title');
        fooInst.title = 42;

        expect(fooInst.__title).toBe(42);
        expect(fooInst.title).toBe(42);
        expect(descriptor.enumerable).toBe(false);
        expect(descriptor.configurable).toBe(true);
      });

      it('properly handles static and non-static getters and setters ' +
         'with the same name in ES5 compat mode', function() {
        var code =  transform([
          'class Foo {',
          '  static get title() {',
          '    return this._title;',
          '  }',
          '',
          '  static set title(value) {',
          '    this._title = value;',
          '  }',
          '',
          '  get title() {',
          '    return this.__title;',
          '  }',
          '',
          '  set title(value) {',
          '    this.__title = value;',
          '  }',
          '}'
        ].join('\n'), {es5: true});

        eval(code);

        var fooInst = new Foo();
        Foo.title = 21;
        fooInst.title = 42;

        expect(Foo.title).toBe(21);
        expect(fooInst.title).toBe(42);
      });

      it('properly handles private getters and setters in ES5 compat mode',
          function() {
        var code =  transform([
          'class Foo {',
          '  get title() {',
          '    return this._private;',
          '  }',
          '',
          '  set title(value) {',
          '    this._private = value;',
          '  }',
          '',
          '  get _private() {',
          '    return this.__superPrivate;',
          '  }',
          '',
          '  set _private(value) {',
          '    this.__superPrivate = value;',
          '  }',
          '}'
        ].join('\n'), {es5: true});

        eval(code);

        var fooInst = new Foo();
        fooInst.title = 42;

        expect(fooInst.__superPrivate).toBe(42);
      });

      it('throws upon encountering getter methods', function() {
        expect(function() {
          transform([
            'class Foo {',
            '  get title() {',
            '    return 42;',
            '  }',
            '}'
          ].join('\n'));
        }).toThrow(
          'This transform does not support getter methods for ES6 classes. ' +
          '(line: 2, col: 2)'
        );
      });

      it('throws upon encountering setter methods', function() {
        expect(function() {
          transform([
            'class Foo {',
            '  set title(value) {',
            '    this._title = value;',
            '  }',
            '}'
          ].join('\n'));
        }).toThrow(
          'This transform does not support setter methods for ES6 classes. ' +
          '(line: 2, col: 2)'
        );
      });

      it('properly handles computed static methods', function() {
        var code = transform([
          'var bar = "foobar";',
          'class Foo {',
          '  static [bar]() {',
          '    return 42;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        expect(Foo.foobar()).toBe(42);
      });

      it('properly handles computed instance methods', function() {
        var code = transform([
          'var bar = "foobar";',
          'class Foo {',
          '  [bar]() {',
          '    return 42;',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        expect(fooInst.foobar()).toBe(42);
      });
    });
  });

  describe('ClassExpressions', function() {
    describe('preserves line numbers', function() {
      it('preserves lines with no inheritance', function() {
        var code = [
          'var Foo = class {',
          '  foo() {',
          '    ',
          '    ',
          '  }',
          '',
          '  constructor(p1,',
          '              p2) {',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '',
          '  bar(){}',
          '  static baz() {',
          '}',
          '}'
        ].join('\n');

        var expected = [
          'var Foo = (function(){',
          '  Object.defineProperty(____Class0.prototype,"foo",{writable:true,configurable:true,value:function() {"use strict";',
          '    ',
          '    ',
          '  }});',
          '',
          '  function ____Class0(p1,',
          '              p2) {"use strict";',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '',
          '  Object.defineProperty(____Class0.prototype,"bar",{writable:true,configurable:true,value:function(){"use strict";}});',
          '  Object.defineProperty(____Class0,"baz",{writable:true,configurable:true,value:function() {"use strict";',
          '}});',
          'return ____Class0;})()'
        ].join('\n');

        expect(transform(code)).toBe(expected);
      });

      it('preserves lines with inheritance from identifier', function() {
        var code = [
          'var Foo = class extends Bar {',
          '  foo() {',
          '    ',
          '    ',
          '    super(p1,',
          '          p2);',
          '  }',
          '',
          '  constructor(p1,',
          '              p2) {',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '    super.blah(p1,',
          '               p2);',
          '  }',
          '',
          '  bar(){}',
          '  static baz() {',
          '}',
          '}'
        ].join('\n');

        var expected = [
          'var Foo = (function(){' +
          'for(var Bar____Key in Bar){' +
            'if(Bar.hasOwnProperty(Bar____Key)){' +
              '____Class0[Bar____Key]=Bar[Bar____Key];' +
            '}' +
          '}' +
          'var ____SuperProtoOfBar=' +
            'Bar===null' +
              '?null' +
              ':Bar.prototype;' +
          '____Class0.prototype=Object.create(____SuperProtoOfBar);' +
          '____Class0.prototype.constructor=____Class0;' +
          '____Class0.__superConstructor__=Bar;',

          '  Object.defineProperty(____Class0.prototype,"foo",{writable:true,configurable:true,value:function() {"use strict";',
          '    ',
          '    ',
          '    ____SuperProtoOfBar.foo.call(this,p1,',
          '          p2);',
          '  }});',
          '',
          '  function ____Class0(p1,',
          '              p2) {"use strict";',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '    ____SuperProtoOfBar.blah.call(this,p1,',
          '               p2);',
          '  }',
          '',
          '  Object.defineProperty(____Class0.prototype,"bar",{writable:true,configurable:true,value:function(){"use strict";}});',
          '  Object.defineProperty(____Class0,"baz",{writable:true,configurable:true,value:function() {"use strict";',
          '}});',
          'return ____Class0;})()'
        ].join('\n');

        expect(transform(code)).toBe(expected);
      });

      it('preserves lines with inheritance from expression', function() {
        var code = [
          'var Foo = class extends mixin(Bar, Baz) {',
          '  foo() {',
          '    ',
          '    ',
          '  }',
          '',
          '  constructor(p1,',
          '              p2) {',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '',
          '  bar(){}',
          '  static baz() {',
          '}',
          '}'
        ].join('\n');

        var expected = [
          'var Foo = (function(){' +
          'var ____Class1=mixin(Bar, Baz);' +
          'for(var ____Class1____Key in ____Class1){' +
            'if(____Class1.hasOwnProperty(____Class1____Key)){' +
              '____Class0[____Class1____Key]=____Class1[____Class1____Key];' +
            '}' +
          '}' +
          'var ____SuperProtoOf____Class1=' +
            '____Class1===null' +
              '?null' +
              ':____Class1.prototype;' +
          '____Class0.prototype=Object.create(____SuperProtoOf____Class1);' +
          '____Class0.prototype.constructor=____Class0;' +
          '____Class0.__superConstructor__=____Class1;',

          '  Object.defineProperty(____Class0.prototype,"foo",{writable:true,configurable:true,value:function() {"use strict";',
          '    ',
          '    ',
          '  }});',
          '',
          '  function ____Class0(p1,',
          '              p2) {"use strict";',
          '',
          '    this.p1 = p1;',
          '    this.p2 = p2;',
          '  }',
          '',
          '  Object.defineProperty(____Class0.prototype,"bar",{writable:true,configurable:true,value:function(){"use strict";}});',
          '  Object.defineProperty(____Class0,"baz",{writable:true,configurable:true,value:function() {"use strict";',
          '}});',
          'return ____Class0;})()'
        ].join('\n');

        expect(transform(code)).toBe(expected);
      });
    });

    describe('functional tests', function() {
      it('scopes each anonymous class separately', function() {
        var code = transform([
          'var Foo = class {',
          '  constructor() {',
          '    this._name = "foo";',
          '    var properties = [];',
          '    for (var key in this) {',
          '      properties.push(key);',
          '    }',
          '    this.properties = properties',
          '  }',
          '};',

          'var Bar = class {',
          '  constructor() {',
          '    this._name = "bar";',
          '    var properties = [];',
          '    for (var key in this) {',
          '      properties.push(key);',
          '    }',
          '    this.properties = properties',
          '  }',
          '}'
        ].join('\n'));

        eval(code);

        var fooInst = new Foo();
        var barInst = new Bar();
        expect(fooInst.properties).not.toEqual(barInst.properties);
        expect(fooInst[fooInst.properties[0]]).toBe('foo');
        expect(barInst[barInst.properties[0]]).toBe('bar');
      });
    });
  });

  describe('handles reserved words', function() {
    it('handles reserved words', function() {
      expect(transform([
        'class Foo {',
        '  delete(x, y) {',
        '    bar();',
        '  }',
        '}'
      ].join('\n'))).toBe([
        'function Foo(){"use strict";}',
        '  Object.defineProperty(Foo.prototype,"delete",{writable:true,configurable:true,value:function(x, y) {"use strict";',
        '    bar();',
        '  }});',
        ''
      ].join('\n'));
    });
  });

  describe('preserves non-class syntax/style', function() {
    it('preserve newlines', function() {
      expect(transform([
        'class Foo {',
        '  A',
        '   (',
        '     x, y) {',
        '    bar();',
        '  }',
        '}'
      ].join('\n'))).toBe([
        'function Foo(){"use strict";}',
        '  Object.defineProperty(Foo.prototype,"A",{writable:true,configurable:true,value:function(',
        '',
        'x, y) {"use strict";',
        '    bar();',
        '  }});',
        ''
      ].join('\n'));
    });

    it('preserves comments between method params and open-bracket', function() {
      expect(transform([
        'class Foo {',
        '  testMethod() /* comment */ {}',
        '}',
      ].join('\n'))).toBe([
        'function Foo(){"use strict";}',
        '  Object.defineProperty(Foo.prototype,"testMethod",{writable:true,configurable:true,value:function() /* comment */ {"use strict";}});',
        ''
      ].join('\n'));
    });
  });
});
