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

require('mock-modules').autoMockOff();

describe('es6-object-short-notation-visitors', function() {
  var transformFn;

  var destructuringVisitors;
  var shortObjectsVisitors;

  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../../src/jstransform').transform;

    shortObjectsVisitors = require('../es6-object-short-notation-visitors').visitorList;
    destructuringVisitors = require('../es6-destructuring-visitors').visitorList;

    visitors = shortObjectsVisitors.concat(destructuringVisitors);
  });

  function transform(code) {
    return transformFn(visitors, code).code;
  }

  function expectTransform(code, result) {
    expect(transform(code)).toEqual(result);
  }

  // Functional tests.

  it('should transform short notation and return 5', function() {
    var code = transform([
      '(function(x, y) {',
      '  var data = {x, y};',
      '  return data.x + data.y;',
      '})(2, 3);'
    ].join('\n'));

    expect(eval(code)).toEqual(5);
  });

  it('should transform work with destructuring and return 10', function() {
    var code = transform([
      'var x = 5, y = 5;',
      '(function({x, y}) {',
      '  var data = {x, y};',
      '  return data.x + data.y;',
      '})({x, y});'
    ].join('\n'));

    expect(eval(code)).toEqual(10);
  });

  // Source code tests.
  it('should transform simple short notation', function() {

    // Should transform simple short notation.
    expectTransform(
      'function foo(x, y) { return {x, y}; }',
      'function foo(x, y) { return {x:x, y:y}; }'
    );

    // Should preserve lines transforming ugly code.
    expectTransform([
      'function',
      '',
      'foo    (',
      '    x,',
      '          y',
      '',
      ')',
      '',
      '        {',
      ' return         {',
      '          x,',
      '  y};',
      '}'
    ].join('\n'), [
      'function',
      '',
      'foo    (',
      '    x,',
      '          y',
      '',
      ')',
      '',
      '        {',
      ' return         {',
      '          x:x,',
      '  y:y};',
      '}'
    ].join('\n'));
  });

});


