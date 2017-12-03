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

describe('es6-destructuring-visitors', function() {
  var transformFn;

  var destructuringVisitors;
  var conciseMethodVisitors;
  var shortObjectsVisitors;
  var reservedWordsVisitors;
  var restParamVisitors;
  var classVisitorsVisitors;
  var arrowFunctionVisitors;

  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../../src/jstransform').transform;

    destructuringVisitors = require('../es6-destructuring-visitors').visitorList;
    conciseMethodVisitors = require('../es6-object-concise-method-visitors').visitorList;
    shortObjectsVisitors = require('../es6-object-short-notation-visitors').visitorList;
    reservedWordsVisitors = require('../reserved-words-visitors').visitorList;
    restParamVisitors = require('../es6-rest-param-visitors').visitorList;
    classVisitorsVisitors = require('../es6-class-visitors').visitorList;
    arrowFunctionVisitors = require('../es6-arrow-function-visitors').visitorList;

    visitors = destructuringVisitors.concat(
      conciseMethodVisitors,
      shortObjectsVisitors,
      restParamVisitors,
      classVisitorsVisitors,
      arrowFunctionVisitors,
      reservedWordsVisitors
    );
  });

  function transform(code) {
    return transformFn(visitors, code).code;
  }

  function expectTransform(code, result) {
    expect(transform(code)).toEqual(result);
  }

  it('should handle simple object pattern', function() {
    var code = transform([
      'var {x, y} = {x: 10, y: 20};',
      '(x + y);'
    ].join('\n'));

    expect(eval(code)).toEqual(30);
  });

  it('should handle literal property names', function() {
    var code = transform([
      'var {x, "y y": yy, 0: z} = {x: 10, "y y": 20, 0: 30};',
      '([x, yy, z]);'
    ].join('\n'));

    expect(eval(code)).toEqual([10, 20, 30]);
  });

  it('should handle array pattern assignment expression', function() {
    var code = transform([
      'var x = 10, y = 20;',
      '[x, y] = [y, x];',
      '([x, y]);'
    ].join('\n'));

    expect(eval(code)).toEqual([20, 10]);
  });

  it('should should not redeclare vars with assignment expression', function() {
    var code = transform([
      'var x = 10, y = 20;',
      '(function() {',
      '  [x, y] = [y, x];',
      '})();',
      '([x, y]);'
    ].join('\n'));

    expect(eval(code)).toEqual([20, 10]);
  });

  it('should handle object pattern assignment expression', function() {
    var code = transform([
      'var x = 10, y = 20;',
      '({x, y} = {y, x});',
      '({x, y});'
    ].join('\n'));

    expect(eval(code)).toEqual({x: 10, y: 20});
  });

  it('should destructure result of a function', function() {
    var code = transform([
      'var [x, y] = (function({x, y}) { return [x, y]; })({x: 1, y: 2});',
      '([x, y]);'
    ].join('\n'));

    expect(eval(code)).toEqual([1, 2]);
  });

  it('should handle skipped array elements', function() {
    var code = transform([
      'var [x, , y] = [1, 2, 3];',
      '([x, y]);'
    ].join('\n'));

    expect(eval(code)).toEqual([1, 3]);
  });

  it('should handle rest elements of an array', function() {
    var code = transform([
      'var [x, ...xs] = [1, 2, 3];'
    ].join('\n'));

    eval(code);

    expect(x).toEqual(1);
    expect(xs).toEqual([2, 3]);
  });

  it('should swap two variables w/o third using pattern', function() {
    var code = transform([
      'var x = 10, y = 20;',
      'var [x, y] = [y, x];',
      '([x, y]);'
    ].join('\n'));

    expect(eval(code)).toEqual([20, 10]);
  });

  it('should transform complex pattern argument', function() {
    var code = transform([
      'function init(user, {ip, coords: [x, y], port}) {',
      '  return [user, ip, x, y, port].join(", ");',
      '}'
    ].join('\n'));

    eval(code);

    expect(init(
      'John Doe', {
        ip: '127.0.0.1',
        coords: [1, 2],
        port: 8080
      }
    )).toBe('John Doe, 127.0.0.1, 1, 2, 8080');
  });

  it('should work with rest params', function() {
    var code = transform([
      'function foo({bar, baz}, ...rest) {',
      '  return {bar, baz, qux: rest[0]};',
      '}'
    ].join('\n'));

    eval(code);

    expect(foo({bar: 10, baz: 20}, 30))
      .toEqual({bar: 10, baz: 20, qux: 30});
  });

  it('should work with class methods', function() {
    var code = transform([
      'class Point {',
      '  constructor({x, y}) {',
      '    this._x = x;',
      '    this._y = y;',
      '  }',
      '',
      '  getData([deltaX, deltaY]) {',
      '    return this._x + deltaX + this._y + deltaY',
      '  }',
      '}'
    ].join('\n'));

    eval(code);

    var x = 10, y = 20;
    var foo = new Point({x: x, y: y});
    var data = foo.getData([30, 40]);

    expect(data).toBe(100);
  });

  it('should work with object concise methods', function() {
    var code = transform([
      'var foo = {',
      '  bar({x, y}) {',
      '    return {x, y};',
      '  }',
      '}'
    ].join('\n'));

    eval(code);

    expect(foo.bar({x: 10, y: 20}))
      .toEqual({x: 10, y: 20});
  });

  it('should work with arrows', function() {
    var code = transform([
      'var foo = ({x, y}, z) => x + y + z;'
    ].join('\n'));

    eval(code);

    expect(foo({x: 10, y: 20}, 30))
      .toEqual(60);
  });

  it('should work with arrows without other arguments', function() {
    var code = transform([
      'var foo = ({x, y}) => x + y;',
      'var bar = ([x, y]) => x + y;'
    ].join('\n'));

    eval(code);

    expect(foo({x: 10, y: 20}))
      .toEqual(30);
    expect(bar([10, 20]))
      .toEqual(30);
  });

  // Auto-generated temp vars test.
  it('should allocate correct temp index', function() {
    var code = transform([
      'function foo(x, {y}, {z}) {',
      '  var {q} = {q: 30};',
      '  return [$__0, $__1, $__2];',
      '}'
    ].join('\n'));

    eval(code);

    expect(foo(1, {y: 10}, {z: 20}))
      .toEqual([{y: 10}, {z: 20}, {q: 30}]);
  });

  it('should allocate correct temp nested index', function() {
    var code = transform([
      'var foo = function(x, {y}, {z}) {',
      '  var {q, m: {v}} = {q: 30, m: {v: 40}};',
      '  var {a} = (function({a}) { return $__0; })({a: 50});',
      '  return [$__0, $__1, $__2, $__3, a];',
      '}'
    ].join('\n'));

    eval(code);

    expect(foo(1, {y: 10}, {z: 20}))
      .toEqual([{y: 10}, {z: 20}, {q: 30, m: {v: 40}}, {v: 40}, 50]);
  });



  // Syntax tests.

  it('should correctly transform structured patterns', function() {

    // Variable declaration.
    expectTransform(
      'var a, {x, data: [y, , z]} = {x: 10, data: [1, 2, 3]};',
      'var a, $__0=      {x: 10, data: [1, 2, 3]},x=$__0.x,$__1=$__0.data,y=$__1[0],z=$__1[2];'
    );

    // Function parameters.
    expectTransform(
      'function f(a, {x, data: [y, z]}, b) {}',
      'function f(a, $__0   , b) {var x=$__0.x,$__1=$__0.data,y=$__1[0],z=$__1[1];}'
    );
  });

  it('should handle reserved words', function() {
    expectTransform(
      'var {delete: x} = {delete: 1};',
      'var $__0=   {"delete": 1},x=$__0["delete"];'
    );
  });
});


