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

describe('es7-trailing-comma-visitors', function() {
  var transformFn;
  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../../src/jstransform').transform;

    visitors = require('../es6-arrow-function-visitors').visitorList
      .concat(require('../es6-rest-param-visitors').visitorList)
      .concat(require('../es7-trailing-comma-visitors').visitorList);
  });

  function transform(code) {
    return transformFn(visitors, code).code;
  }

  function expectTransform(code, result) {
    expect(transform(code)).toEqual(result);
  }

  it('should eliminate trailing commas in function calls', function() {
    expectTransform(
      'Math.max(1, 2 , )',
      'Math.max(1, 2  )'
    );
  });

  it('should eliminate trailing commas when creating new objects', function() {
    expectTransform(
      'var pet = new Animal(\'cat\', NATURE_EVIL,\t);',
      'var pet = new Animal(\'cat\', NATURE_EVIL\t);'
    );
  });

  it('should eliminate trailing commas in function expressions', function() {
    expectTransform(
      'var Animal = function(species, nature,) { this.species = species; };',
      'var Animal = function(species, nature) { this.species = species; };'
    );
  });

  it('should eliminate trailing commas in function definitions', function() {
    expectTransform(
      'function Animal(species, nature,) { this.species = species; };',
      'function Animal(species, nature) { this.species = species; };'
    );
  });

  it('should eliminate trailing commas in method definitions', function() {
    expectTransform(
      'class Animal{ setNature(nature,) { this.nature = nature; } }',
      'class Animal{ setNature(nature) { this.nature = nature; } }'
    );
  });

  it('should eliminate trailing commas in arrow functions', function() {
    expectTransform(
      'var cube = ((x,) => x * x * x);',
      'var cube = (function(x)  {return x * x * x;});'
    );

    expectTransform(
      'var multiply = ((x,y,z,) => x * y * z);',
      'var multiply = (function(x,y,z)  {return x * y * z;});'
    );
  });

  it('should eliminate trailing commas after default arguments', function() {
    expectTransform(
      '(function foo(x = 5,) {})',
      '(function foo(x = 5) {})'
    );
    expectTransform(
      '(function foo({x} = {},) {})',
      '(function foo({x} = {}) {})'
    );
  });

});
