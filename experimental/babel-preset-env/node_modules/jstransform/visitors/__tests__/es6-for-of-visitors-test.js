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

describe('es6-call-spread-visitors', function() {
  var transformFn;
  var visitors;
  var results;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../../src/jstransform').transform;

    visitors = require('../es6-for-of-visitors').visitorList;
    results = undefined;
  });

  function transform(code, options) {
    return transformFn(visitors, code, options).code;
  }

  it('should correctly transform and run the simple case', function() {
    eval(transform([
      'var results = [];',
      'var y = [10, 20, 30];',
      'for (var x of y) {',
      '  results.push(x);',
      '}',
    ].join('\n')));

    expect(results).toEqual([10, 20, 30]);
  });

  it('should correctly run a simple for of without block', function() {
    eval(transform([
      'var results = [];',
      'var y = [10, 20, 30];',
      'for (var x of y)',
      '  results.push(x);',
    ].join('\n')));

    expect(results).toEqual([10, 20, 30]);
  });


  it('should correctly run a simple for of without a var', function() {
    var x;
    eval(transform([
      'var results = [];',
      'var x;',
      'var y = [10, 20, 30];',
      'for (x of y) {',
      '  results.push(x);',
      '}',
    ].join('\n')));

    expect(results).toEqual([10, 20, 30]);
    expect(x).toEqual(30);
  });

  it('should correctly run a for of with expr on rhs', function() {
    eval(transform([
      'var results = [];',
      'for (var x of [10, 20, 30]) {',
      '  results.push(x);',
      '}',
    ].join('\n')));

    expect(results).toEqual([10, 20, 30]);
  });

  it('should correctly work with an interable', function() {

    // Custom iterable object.
    var foo = {
      _data: [10, 20, 30],
      _index: 0,
      '@@iterator': function() {
        this._index = 0;
        return {
          next: () => {
            return {
              value: this._data[this._index++],
              done: this._index > this._data.length
            };
          }
        };
      }
    };
    // dummy statement to appease lint.
    foo;

    eval(transform([
      'var results = [];',
      'for (var x of foo) {',
      '  results.push(x);',
      '}',
    ].join('\n')));

    expect(results).toEqual([10, 20, 30]);
  });
});
