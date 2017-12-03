/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails dmitrys@fb.com
 */

/*jshint evil:true*/
/*jshint -W117*/

require('mock-modules').autoMockOff();

describe('es6-rest-param-visitors', () => {
  var transformFn;
  var visitorSet;
  var arrowFuncVisitors;
  var classVisitors;
  var restParamVisitors;

  beforeEach(() => {
    require('mock-modules').dumpCache();
    arrowFuncVisitors = require('../es6-arrow-function-visitors').visitorList;
    classVisitors = require('../es6-class-visitors').visitorList;
    restParamVisitors = require('../es6-rest-param-visitors').visitorList;
    callSpreadVisitors = require('../es6-call-spread-visitors').visitorList;
    transformFn = require('../../src/jstransform').transform;

    visitorSet =
      arrowFuncVisitors
        .concat(classVisitors)
        .concat(restParamVisitors)
        .concat(callSpreadVisitors);
  });

  function transform(code) {
    return transformFn(visitorSet, code).code;
  }

  function expectTransform(code, result) {
    expect(transform(code)).toEqual(result);
  }

  describe('function expressions', () => {
    it('should capture 2 rest params, having 2 args', () => {
      var code = transform([
        '(function(x, y, ...args) {',
        '  return [x, y, args.length, args[0], args[1]];',
        '})(1, 2, 3, 4);'
      ].join('\n'));

      expect(eval(code)).toEqual([1, 2, 2, 3, 4]);
    });

    it('should transform rest parameters in nested functions', () => {
      var code = transform([
        '(function(x, ...args) {',
        '  return function(...params) {',
        '    return args.concat(params);',
        '  };',
        '})(1, 2, 3)(4, 5);'
      ].join('\n'));

      expect(eval(code)).toEqual([2, 3, 4, 5]);
    });

    it('should supply an array object', () => {
      var code = transform([
        '(function(...args) {',
        '  return Array.isArray(args);',
        '})()'
      ].join('\n'));

      expect(eval(code)).toBe(true);
    });
  });

  describe('function declarations', () => {
    it('should capture 2 rest params, having 2 args', () => {
      var code = transform([
        'function test(x, y, ...args) {',
        '  return [x, y, args.length, args[0], args[1]];',
        '}'
      ].join('\n'));

      eval(code);

      expect(test(1, 2, 3, 4)).toEqual([1, 2, 2, 3, 4]);
    });

    it('should transform rest parameters in nested functions', () => {
      var code = transform([
        'function testOuter(x, ...args) {',
        '  function testInner(...params) {',
        '    return args.concat(params);',
        '  }',
        '  return testInner;',
        '}'
      ].join('\n'));

      eval(code);

      expect(testOuter(1, 2, 3)(4, 5)).toEqual([2, 3, 4, 5]);
    });

    it('should supply an array object', () => {
      var code = transform([
        'function test(...args) {',
        '  return Array.isArray(args);',
        '}'
      ].join('\n'));

      eval(code);

      expect(test()).toBe(true);
    });

    it('should work with temp var injections', () => {
      // Use call spread as example. It injects a temp var into function scope.
      var code = transform([
        'function test(bar, ...args) {',
        '  return bar(...args);',
        '}'
      ].join('\n'));

      eval(code);

      var fn = function() {
        return Array.prototype.slice.call(arguments).map(i => i + 1);
      };
      expect(test(fn, 1, 2, 3)).toEqual([2, 3, 4]);
    });
  });

  describe('arrow functions', () => {
    it('should transform non-block bodied arrow functions', () => {
      var code = transform([
        'var test = (...args) => args;'
      ].join('\n'));

      eval(code);

      expect(test('foo', 'bar')).toEqual(['foo', 'bar']);
    });

    it('should capture 2 rest params, having 2 args', () => {
      var code = transform([
        'var test = (x, y, ...args) => {',
        '  return [x, y, args.length, args[0], args[1]];',
        '}'
      ].join('\n'));

      eval(code);

      expect(test(1, 2, 3, 4)).toEqual([1, 2, 2, 3, 4]);
    });

    it('should transform rest parameters in nested arrow functions', () => {
      var code = transform([
        'var testOuter = (x, ...args) => {',
        '  var testInner = (...params) => {',
        '    return args.concat(params);',
        '  };',
        '  return testInner;',
        '};'
      ].join('\n'));

      eval(code);

      expect(testOuter(1, 2, 3)(4, 5)).toEqual([2, 3, 4, 5]);
    });

    it('should supply an array object', () => {
      var code = transform([
        'var test = (...args) => {',
        '  return Array.isArray(args);',
        '};'
      ].join('\n'));

      eval(code);

      expect(test()).toBe(true);
    });
  });

  describe('class methods', () => {
    it('should capture 2 rest params, having 2 args', () => {
      var code = transform([
        'class Foo {',
        '  constructor(x, y, ...args) {',
        '    this.ctor = [x, y, args.length, args[0], args[1]];',
        '  }',
        '  testMethod(x, y, ...args) {',
        '    return [x, y, args.length, args[0], args[1]];',
        '  }',
        '  static testMethod(x, y, ...args) {',
        '    return [x, y, args.length, args[0], args[1]];',
        '  }',
        '}'
      ].join('\n'));

      eval(code);

      var fooInst = new Foo(1, 2, 3, 4);
      expect(fooInst.ctor).toEqual([1, 2, 2, 3, 4]);
      expect(fooInst.testMethod(1, 2, 3, 4)).toEqual([1, 2, 2, 3, 4]);
      expect(Foo.testMethod(1, 2, 3, 4)).toEqual([1, 2, 2, 3, 4]);
    });

    it('should transform rest parameters in nested functions', () => {
      var code = transform([
        'class Foo {',
        '  constructor(x, ...args) {',
        '    function inner(...params) {',
        '      return args.concat(params);',
        '    }',
        '    this.ctor = inner;',
        '  }',
        '  testMethod(x, ...args) {',
        '    function inner(...params) {',
        '      return args.concat(params);',
        '    }',
        '    return inner;',
        '  }',
        '  static testMethod(x, ...args) {',
        '    function inner(...params) {',
        '      return args.concat(params);',
        '    }',
        '    return inner;',
        '  }',
        '}'
      ].join('\n'));

      eval(code);

      var fooInst = new Foo(1, 2, 3);
      expect(fooInst.ctor(4, 5)).toEqual([2, 3, 4, 5]);
      expect(fooInst.testMethod(1, 2, 3)(4, 5)).toEqual([2, 3, 4, 5]);
      expect(Foo.testMethod(1, 2, 3)(4, 5)).toEqual([2, 3, 4, 5]);
    });

    it('should supply an array object', () => {
      var code = transform([
        'class Foo {',
        '  constructor(...args) {',
        '    this.ctor = Array.isArray(args);',
        '  }',
        '  testMethod(...args) {',
        '    return Array.isArray(args);',
        '  }',
        '  static testMethod(...args) {',
        '    return Array.isArray(args);',
        '  }',
        '}'
      ].join('\n'));

      eval(code);

      var fooInst = new Foo();
      expect(fooInst.ctor).toBe(true);
      expect(fooInst.testMethod()).toBe(true);
      expect(Foo.testMethod()).toBe(true);
    });
  });

  describe('whitespace preservation', () => {
    it('1-line function decl with 2 args', () => {
      expectTransform(
        'function foo(x, y, ...args) { return x + y + args[0]; }',
        'function foo(x, y ) {for (var args=[],$__0=2,$__1=arguments.length;' +
          '$__0<$__1;$__0++) args.push(arguments[$__0]); return x + y + ' +
          'args[0]; }'
      );
    });

    it('1-line function expression with 1 arg', () => {
      expectTransform(
        '(function(x, ...args) { return args;});',
        '(function(x ) {for (var args=[],$__0=1,$__1=arguments.length;' +
          '$__0<$__1;$__0++) args.push(arguments[$__0]); return args;});'
      );
    });

    it('1-line function expression with no args', () => {
      expectTransform(
        'map(function(...args) { return args.map(log); });',
        'map(function() {for (var args=[],$__0=0,$__1=arguments.length;' +
          '$__0<$__1;$__0++) args.push(arguments[$__0]); ' +
          'return args.map(log); });'
      );
    });

    it('preserves lines for ugly code', () => {
      expectTransform([
        'function',
        '',
        'foo    (',
        '    x,',
        '          ...args',
        '',
        ')',
        '',
        '        {',
        ' return         args;',
        '}'
      ].join('\n'), [
        'function',
        '',
        'foo    (',
        '    x',
        '          ',
        '',
        ')',
        '',
        '        {for (var args=[],$__0=1,$__1=arguments.length;$__0<$__1;' +
          '$__0++) args.push(arguments[$__0]);',
        ' return         args;',
        '}'
      ].join('\n'));
    });

    it('preserves inline comments', () => {
      expectTransform(
        'function foo(/*string*/foo, /*bool*/bar, ...args) { return args; }',
        'function foo(/*string*/foo, /*bool*/bar ) {' +
          'for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) ' +
            'args.push(arguments[$__0]); ' +
          'return args; ' +
        '}'
      );
    });
  });
});

