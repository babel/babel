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

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../../src/jstransform').transform;

    visitors = require('../es6-call-spread-visitors').visitorList;
  });

  function transform(code, options) {
    return transformFn(visitors, code, options).code;
  }

  it('should spread given data with context', function() {
    expect(transform('Math.max(1,\t[2], 3, ...[4, 5, 6])'))
      .toEqual('var $__0;($__0 = Math).max.apply($__0, [1,\t[2], 3].concat([4, 5, 6]))');
  });

  it('should avoid unnecessary concat call', function() {
    expect(transform('window.Math.max(...list)'))
      .toEqual('var $__0;($__0 = window.Math).max.apply($__0, list)');
  });

  it('should default to undefined context', function() {
    expect(transform('max(1, 2, ...list)'))
      .toEqual('max.apply(undefined, [1, 2].concat(list))');
  });

  it('should handle computed method names', function() {
    expect(transform('Math["m" + (0 ? "in" : "ax")](1, 2, ...list)'))
      .toEqual('var $__0;($__0 = Math)["m" + (0 ? "in" : "ax")].apply($__0, [1, 2].concat(list))');
  });

  it('should handle immediately invoked function expressions', function() {
    expect(transform('(function(a, b, c) { return a+b+c; })(1, 2, ...more)'))
      .toEqual('(function(a, b, c) { return a+b+c; }).apply(undefined, [1, 2].concat(more))');
  });

  it('should spread while creating new instances', function() {
    expect(transform('new Set(1, 2, ...list)'))
      .toEqual('new (Function.prototype.bind.apply(Set, [null, 1, 2].concat(list)))');
  });

  it('should create temporary variables when necessary in program scope', function() {
    expect(transform('foo().bar(arg1, arg2, ...more)'))
      .toEqual('var $__0;($__0 = foo()).bar.apply($__0, [arg1, arg2].concat(more))');
  });

  it('should create temporary variables when necessary in function scope', function() {
    expect(transform('function fn(){ return foo().bar(arg1, arg2, ...more); }'))
      .toEqual('function fn(){var $__0; return ($__0 = foo()).bar.apply($__0, [arg1, arg2].concat(more)); }');
  });

  it('should not evaluate context more than once', function() {
    var code = transform([
      'var obj = {',
      '  calls: 0,',
      '  get context() {',
      '    this.calls++;',
      '    return {',
      '      add: function(a, b) { return a + b; }',
      '    };',
      '  }',
      '};',
      'var nums = [1, 2];',
      'obj.context.add(...nums);',
      'obj.calls === 1;',
    ].join('\n'));
    expect(eval(code)).toEqual(true);
  });

  it('should transform nested spread expressions', function() {
    var code = transform([
      'function getBase() {',
      '  return {',
      '    getParams: function(a, b) {',
      '      return [a, b];',
      '    }',
      '  };',
      '}',
      '[].concat(...getBase().getParams(...[1, 2, 3])).join(" ");',
    ].join('\n'));
    expect(eval(code)).toEqual("1 2");
  });

});
