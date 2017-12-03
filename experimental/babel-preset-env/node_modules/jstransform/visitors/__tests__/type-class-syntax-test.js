/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/*jshint evil:true*/
/*jshint -W117*/

require('mock-modules').autoMockOff();

describe('static type class syntax', function() {
  var classSyntaxVisitors;
  var visitorList;
  var flowSyntaxVisitors;
  var jstransform;

  beforeEach(function() {
    require('mock-modules').dumpCache();

    classSyntaxVisitors =
      require('../es6-class-visitors').visitorList;
    flowSyntaxVisitors = require('../type-syntax.js').visitorList;
    jstransform = require('jstransform');

    visitorList = classSyntaxVisitors;
  });

  function transform(code, visitors) {
    visitors = visitors ? visitorList.concat(visitors) : visitorList;

    code = jstransform.transform(
      flowSyntaxVisitors,
      code.join('\n')
    ).code;

    return jstransform.transform(
      visitors,
      code
    ).code;
  }

  describe('param type annotations', () => {
    it('strips single param annotation', () => {
      var code = transform([
        'class Foo {',
        '  method1(param1: bool) {',
        '    return param1;',
        '  }',
        '}',
        '',
        'var Bar = class {',
        '  method1(param1: bool) {',
        '    return param1;',
        '  }',
        '}'
      ]);
      eval(code);
      expect((new Foo()).method1(42)).toBe(42);
      expect((new Bar()).method1(42)).toBe(42);
    });

    it('strips multiple param annotations', () => {
      var code = transform([
        'class Foo {',
        '  method1(param1: bool, param2: number) {',
        '    return [param1, param2];',
        '  }',
        '}',
        '',
        'var Bar = class {',
        '  method1(param1: bool, param2: number) {',
        '    return [param1, param2];',
        '  }',
        '}'
      ]);
      eval(code);
      expect((new Foo()).method1(true, 42)).toEqual([true, 42]);
      expect((new Bar()).method1(true, 42)).toEqual([true, 42]);
    });

    it('strips higher-order param annotations', () => {
      var code = transform([
        'class Foo {',
        '  method1(param1: (_:bool) => number) {',
        '    return param1;',
        '  }',
        '}',
        '',
        'var Bar = class {',
        '  method1(param1: (_:bool) => number) {',
        '    return param1;',
        '  }',
        '}'
      ]);
      eval(code);

      var callback = function(param) {
        return param ? 42 : 0;
      };
      expect((new Foo()).method1(callback)).toBe(callback);
      expect((new Bar()).method1(callback)).toBe(callback);
    });

    it('strips annotated params next to non-annotated params', () => {
      var code = transform([
        'class Foo {',
        '  method1(param1, param2: number) {',
        '    return [param1, param2];',
        '  }',
        '}',
        '',
        'var Bar = class {',
        '  method1(param1, param2: number) {',
        '    return [param1, param2];',
        '  }',
        '}'
      ]);
      eval(code);
      expect((new Foo()).method1('p1', 42)).toEqual(['p1', 42]);
      expect((new Bar()).method1('p1', 42)).toEqual(['p1', 42]);
    });

    it('strips annotated params before a rest parameter', () => {
      var restParamVisitors =
        require('../es6-rest-param-visitors').visitorList;

      var code = transform([
        'class Foo {',
        '  method1(param1: number, ...args) {',
        '    return [param1, args];',
        '  }',
        '}',
        '',
        'var Bar = class {',
        '  method1(param1: number, ...args) {',
        '    return [param1, args];',
        '  }',
        '}'
      ], restParamVisitors);
      eval(code);
      expect((new Foo()).method1(42, 43, 44)).toEqual([42, [43, 44]]);
      expect((new Bar()).method1(42, 43, 44)).toEqual([42, [43, 44]]);
    });
  });

  describe('return type annotations', () => {
    it('strips method return types', () => {
      var code = transform([
        'class Foo {',
        '  method1(param1:number): () => number {',
        '    return function() { return param1; };',
        '  }',
        '}',
        '',
        'var Bar = class {',
        '  method1(param1:number): () => number {',
        '    return function() { return param1; };',
        '  }',
        '}'
      ]);
      eval(code);
      expect((new Foo()).method1(42)()).toBe(42);
      expect((new Bar()).method1(42)()).toBe(42);
    });
  });

  describe('parametric type annotation', () => {
    it('strips parametric class type annotations', () => {
      var code = transform([
        'class Foo<T> {',
        '  method1(param1) {',
        '    return param1;',
        '  }',
        '}',
        '',
        // TODO: Need to add support to esprima for this
        // 'var Bar = class<T> {',
        // '  method1(param1) {',
        // '    return param1;',
        // '  }',
        // '}'
      ]);
      eval(code);
      expect((new Foo()).method1(42)).toBe(42);
      // expect((new Bar()).method1(42)).toBe(42);
    });

    it('strips multi-parameter class type annotations', () => {
      var code = transform([
        'class Foo<T,S> {',
        '  method1(param1) {',
        '    return param1;',
        '  }',
        '}',
        '',
        // TODO: Need to add support to esprima for this
        // 'var Bar = class<T> {',
        // '  method1(param1) {',
        // '    return param1;',
        // '  }',
        // '}'
      ]);
      eval(code);
      expect((new Foo()).method1(42)).toBe(42);
      // expect(bar(42)).toBe(42);
    });

    it('strips parametric method type annotations', () => {
      var code = transform([
        'class Foo<T> {',
        '  method1<T>(param1) {',
        '    return param1;',
        '  }',
        '}',
        '',
        // TODO: Need to add support to esprima for this
        // 'var Bar = class<T> {',
        // '  method1<T>(param1) {',
        // '    return param1;',
        // '  }',
        // '}'
      ]);
      eval(code);
      expect((new Foo()).method1(42)).toBe(42);
      // expect((new Bar()).method1(42)).toBe(42);
    });

    it('strips multi-parameter class type annotations', () => {
      var code = transform([
        'class Foo<T,S> {',
        '  method1<T,S>(param1) {',
        '    return param1;',
        '  }',
        '}',
        '',
        // TODO: Need to add support to esprima for this
        // 'var Bar = class<T> {',
        // '  method1(param1) {',
        // '    return param1;',
        // '  }',
        // '}'
      ]);
      eval(code);
      expect((new Foo()).method1(42)).toBe(42);
      // expect(bar(42)).toBe(42);
    });
  });

  describe('class property annotations', () => {
    it('strips single class property', () => {
      var code = transform([
        'class Foo {',
        '  prop1: T;',
        '}'
      ]);
      eval(code);
      expect((new Foo()).prop1).toEqual(undefined);
    });

    it('strips multiple adjacent class properties', () => {
      var code = transform([
        'class Foo {',
        '  prop1: T;',
        '  prop2: U;',
        '}'
      ]);
      eval(code);
      expect((new Foo()).prop1).toEqual(undefined);
      expect((new Foo()).prop2).toEqual(undefined);
    });

    it('strips class properties between methods', () => {
      var code = transform([
        'class Foo {',
        '  method1() {}',
        '  prop1: T;',
        '  method2() {}',
        '  prop2: U;',
        '  method3() {}',
        '}'
      ]);
      eval(code);
      expect((new Foo()).prop1).toEqual(undefined);
      expect((new Foo()).prop2).toEqual(undefined);
    });
  });
});
