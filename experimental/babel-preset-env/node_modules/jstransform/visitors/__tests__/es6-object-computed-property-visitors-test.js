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

describe('es6-computed-property-visitors', function() {
  var transformFn;
  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../../src/jstransform').transform;

    visitors = require('../es6-object-computed-property-visitors').visitorList
      .concat(require('../es6-object-concise-method-visitors').visitorList)
      .concat(require('../es6-object-short-notation-visitors').visitorList)
      .concat(require('../es7-spread-property-visitors').visitorList);
  });

  function transform(code, options) {
    return transformFn(visitors, code, options).code;
  }

  it('should transforms simple computed properties', function() {
    var result;
    eval(transform([
      'var x = "foo", q = "bar";',
      'var result = {[x]: 1, y: 2, "z": 3, [x + q]: 4};',
    ].join('\n')));

    expect(result).toEqual({foo: 1, y: 2, z: 3, foobar: 4});
  });

  it('should transform computed property', function() {
    expect(transform('var x = {alpha: 12, \'beta\': 34, [\'gam\' + \'ma\']: 56};'))
      .toEqual('var $__0;var x = ($__0={},$__0.alpha= 12,$__0[ \'beta\']= 34,$__0[ \'gam\' + \'ma\']= 56,$__0);');
  });

  it('should handle spread operator', function() {
    expect(transform('({[\'a\'+\'b\']: \'ab\', ...cde})'))
      .toEqual('var $__0;(($__0={},$__0[\'a\'+\'b\']= \'ab\',Object.assign($__0 ,cde),$__0))');
  });

  it('should handle consecutive spread operators', function() {
    expect(transform('({...a, [1+1]: 2, ...c, ...d})'))
      .toEqual('var $__0;(($__0={},Object.assign($__0,a),$__0[ 1+1]= 2,Object.assign($__0 ,c, d),$__0))');
  });

  it('should handle everything individually while preserving whitespace', function() {
    var original = [
      '\n...\na\n', // spread property
      '\tb\t', // short object
      '\nc\n(\nx\n)\n{ return x * x; }\n', // concise method
      '\t[\td? "e": "f"\t]\t:\tfunction(y)\t{ return y * y; }\t', // computed property
      '\ng\n:\n"h"\n' // normal property
    ].join(',');
    var transformed = [
      'Object.assign($__0\n,\na\n',
      '\t{b:b\t',
      '\nc:function\n(\nx\n)\n{ return x * x; }})',
      '$__0[\n\t\td? "e": "f"]=\t\t\tfunction(y)\t{ return y * y; }',
      '$__0.g=\t\n\n\n"h"\n'
    ].join(',');
    expect(transform('({' + original + '})'))
      .toEqual('var $__0;(($__0={},' + transformed + ',$__0))');
  });

  it('should fail for short notation with computed names', function() {
    expect(transform.bind(null, '({["a" + "b"]})')).toThrow();
  });

  it('should handle concise generator methods with computed names', function() {
    expect(transform('({*["a" + b ](c) { return c * c; },\t*d(e) { return e * e; }})'))
      .toEqual('var $__0;(($__0={},$__0["a" + b]= function*(c) { return c * c; },$__0.d=\tfunction*(e) { return e * e; },$__0))');
  });

  it('should evaluate simple object with computed properties', function() {
    var result = eval(transform('({["alp"+\'ha\']:1, [1>2?"beta":"gamma"]:3})'));
    expect(result).toEqual({alpha: 1, gamma: 3});
  });

  it('should evaluate complex objects with computed properties', function() {
    var complex;
    eval(transform([
      'var spread = {identifier: 1, "literal": 2, ["comp"+"uted"]: "overwritten"};',
      'var short = "value";',
      'var complex = {short, ...spread, ["con"+"cise"]() { return "method"; }, [String.fromCharCode(100-1)+"omputed"]: "actual"};',
    ].join('\n')));
    expect(complex).toEqual({
      short: 'value',
      identifier: 1,
      literal: 2,
      concise: complex.concise,
      computed: 'actual',
    });
  });

});
