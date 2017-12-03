/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails sema@fb.com
 */

/*jshint evil:true*/

require('mock-modules').autoMockOff();

describe('es7-rest-property-visitors', function() {
  var transformFn;

  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../../src/jstransform').transform;

    visitors = require('../es6-destructuring-visitors').visitorList;
  });

  function transform(code) {
    var lines = Array.prototype.join.call(arguments, '\n');
    return transformFn(visitors, lines).code;
  }

  // Semantic tests.

  it('picks off remaining properties from an object', function() {
    var code = transform(
      '({ x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 });',
      '([ x, y, z ]);'
    );
    expect(eval(code)).toEqual([1, 2, { a: 3, b: 4 }]);
  });

  it('picks off remaining properties from a nested object', function() {
    var code = transform(
      'var complex = {',
      '  x: { a: 1, b: 2, c: 3 },',
      '  y: [4, 5, 6]',
      '};',
      'var {',
      '  x: { a: xa, ...xbc },',
      '  y: [y0, ...y12]',
      '} = complex;',
      '([ xa, xbc, y0, y12 ]);'
    );
    expect(eval(code)).toEqual([ 1, { b: 2, c: 3 }, 4, [5, 6] ]);
  });

  it('only extracts own properties', function() {
    var code = transform(
      'var obj = Object.create({ x: 1 });',
      'obj.y = 2;',
      '({ ...y } = obj);',
      '(y);'
    );
    expect(eval(code)).toEqual({ y: 2 });
  });

  it('only extracts own properties, except when they are explicit', function() {
    var code = transform(
      'var obj = Object.create({ x: 1, y: 2 });',
      'obj.z = 3;',
      '({ y, ...z } = obj);',
      '([ y, z ]);'
    );
    expect(eval(code)).toEqual([ 2, { z: 3 } ]);
  });

  it('avoids passing extra properties when they are picked off', function() {
    var code = transform(
      'function base({ a, b, x }) { return [ a, b, x ]; }',
      'function wrapper({ x, y, ...restConfig }) {',
      '  return base(restConfig);',
      '}',
      'wrapper({ x: 1, y: 2, a: 3, b: 4 });'
    );
    expect(eval(code)).toEqual([ 3, 4, undefined ]);
  });

  // Syntax tests.

  it('throws on leading rest properties', function () {
    expect(() => transform('({ ...x, y, z } = obj)')).toThrow();
  });

  it('throws on multiple rest properties', function () {
    expect(() => transform('({ x, ...y, ...z } = obj)')).toThrow();
  });

  // TODO: Ideally identifier reuse should fail to transform
  // it('throws on identifier reuse', function () {
  //  expect(() => transform('({ x: { ...z }, y: { ...z } } = obj)')).toThrow();
  // });

});
