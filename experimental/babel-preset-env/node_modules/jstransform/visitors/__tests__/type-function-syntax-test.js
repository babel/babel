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

describe('static type function syntax', function() {
  var flowSyntaxVisitors;
  var jstransform;

  beforeEach(function() {
    require('mock-modules').dumpCache();

    flowSyntaxVisitors = require('../type-syntax.js').visitorList;
    jstransform = require('jstransform');
  });

  function transform(code, visitors) {
    code = code.join('\n');

    // We run the flow transform first
    code = jstransform.transform(
      flowSyntaxVisitors,
      code
    ).code;

    if (visitors) {
      code = jstransform.transform(
        visitors,
        code
      ).code;
    }
    return code;
  }

  describe('param type annotations', () => {
    it('strips single param annotation', () => {
      var code = transform([
        'function foo(param1: bool) {',
        '  return param1;',
        '}',
        '',
        'var bar = function(param1: bool) {',
        '  return param1;',
        '}'
      ]);
      eval(code);
      expect(foo(42)).toBe(42);
      expect(bar(42)).toBe(42);
    });

    it('strips multiple param annotations', () => {
      var code = transform([
        'function foo(param1: bool, param2: number) {',
        '  return [param1, param2];',
        '}',
        '',
        'var bar = function(param1: bool, param2: number) {',
        '  return [param1, param2];',
        '}'
      ]);
      eval(code);
      expect(foo(true, 42)).toEqual([true, 42]);
      expect(bar(true, 42)).toEqual([true, 42]);
    });

    it('strips higher-order param annotations', () => {
      var code = transform([
        'function foo(param1: (_:bool) => number) {',
        '  return param1;',
        '}',
        '',
        'var bar = function(param1: (_:bool) => number) {',
        '  return param1;',
        '}'
      ]);
      eval(code);

      var callback = function(param) {
        return param ? 42 : 0;
      };
      expect(foo(callback)).toBe(callback);
      expect(bar(callback)).toBe(callback);
    });

    it('strips annotated params next to non-annotated params', () => {
      var code = transform([
        'function foo(param1, param2: number) {',
        '  return [param1, param2];',
        '}',
        '',
        'var bar = function(param1, param2: number) {',
        '  return [param1, param2];',
        '}'
      ]);
      eval(code);
      expect(foo('p1', 42)).toEqual(['p1', 42]);
      expect(bar('p1', 42)).toEqual(['p1', 42]);
    });

    it('strips annotated params before a rest parameter', () => {
      var restParamVisitors =
        require('../es6-rest-param-visitors').visitorList;

      var code = transform([
        'function foo(param1: number, ...args) {',
        '  return [param1, args];',
        '}',
        '',
        'var bar = function(param1: number, ...args) {',
        '  return [param1, args];',
        '}'
      ], restParamVisitors);
      eval(code);
      expect(foo(42, 43, 44)).toEqual([42, [43, 44]]);
      expect(bar(42, 43, 44)).toEqual([42, [43, 44]]);
    });

    it('strips annotated rest parameter', () => {
      var restParamVisitors =
        require('../es6-rest-param-visitors').visitorList;

      var code = transform([
        'function foo(param1: number, ...args: Array<number>) {',
        '  return [param1, args];',
        '}',
        '',
        'var bar = function(param1: number, ...args: Array<number>) {',
        '  return [param1, args];',
        '}'
      ], restParamVisitors);
      eval(code);
      expect(foo(42, 43, 44)).toEqual([42, [43, 44]]);
      expect(bar(42, 43, 44)).toEqual([42, [43, 44]]);
    });

    it('strips optional param marker without type annotation', () => {
      var code = transform([
        'function foo(param1?, param2 ?) {',
        '  return 42;',
        '}'
      ]);
      eval(code);
      expect(foo()).toBe(42);
    });

    it('strips optional param marker with type annotation', () => {
      var code = transform([
        'function foo(param1?:number, param2 ?: string, param3 ? : bool) {',
        '  return 42;',
        '}'
      ]);
      eval(code);
      expect(foo()).toBe(42);
    });
  });

  describe('return type annotations', () => {
    it('strips function return types', () => {
      var code = transform([
        'function foo(param1:number): () => number {',
        '  return function() { return param1; };',
        '}',
        '',
        'var bar = function(param1:number): () => number {',
        '  return function() { return param1; };',
        '}'
      ]);
      eval(code);
      expect(foo(42)()).toBe(42);
      expect(bar(42)()).toBe(42);
    });

    it('strips void return types', () => {
      var code = transform([
        'function foo(param1): void {',
        '  param1();',
        '}',
        '',
        'var bar = function(param1): void {',
        '  param1();',
        '}'
      ]);
      eval(code);

      var counter = 0;
      function testFn() {
        counter++;
      }

      foo(testFn);
      expect(counter).toBe(1);

      bar(testFn);
      expect(counter).toBe(2);
    });

    it('strips void return types with rest params', () => {
      var code = transform(
        [
          'function foo(param1, ...rest): void {',
          '  param1();',
          '}',
          '',
          'var bar = function(param1, ...rest): void {',
          '  param1();',
          '}'
        ],
        require('../es6-rest-param-visitors').visitorList
      );
      eval(code);

      var counter = 0;
      function testFn() {
        counter++;
      }

      foo(testFn);
      expect(counter).toBe(1);

      bar(testFn);
      expect(counter).toBe(2);
    });

    it('strips object return types', () => {
      var code = transform([
        'function foo(param1:number): {num: number} {',
        '  return {num: param1};',
        '}',
        '',
        'var bar = function(param1:number): {num: number} {',
        '  return {num: param1};',
        '}'
      ]);

      eval(code);
      expect(foo(42)).toEqual({num: 42});
      expect(bar(42)).toEqual({num: 42});
    });
  });

  describe('parametric type annotation', () => {
    it('strips parametric type annotations', () => {
      var code = transform([
        'function foo<T>(param1) {',
        '  return param1;',
        '}',
        '',
        'var bar = function<T>(param1) {',
        '  return param1;',
        '}',
      ]);
      eval(code);
      expect(foo(42)).toBe(42);
      expect(bar(42)).toBe(42);
    });

    it('strips multi-parameter type annotations', () => {
      var restParamVisitors =
        require('../es6-rest-param-visitors').visitorList;

      var code = transform([
        'function foo<T, S>(param1) {',
        '  return param1;',
        '}',
        '',
        'var bar = function<T,S>(param1) {',
        '  return param1;',
        '}'
      ], restParamVisitors);
      eval(code);
      expect(foo(42)).toBe(42);
      expect(bar(42)).toBe(42);
    });
  });

  describe('arrow functions', () => {
    // TODO: We don't currently support arrow functions, but we should
    //       soon! The only reason we don't now is because we don't
    //       need it at this very moment and I'm in a rush to get the
    //       basics in.
  });
});
