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

describe('es7-spread-property-visitors', function() {
  var transformFn;
  var originalAssign = Object.assign;
  var visitors;

  // These are placeholder variables in scope that we can use to assert that a
  // specific variable reference was passed, rather than an object clone of it.
  var x = 123456;
  var y = 789012;
  var z = 345678;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../../src/jstransform').transform;

    visitors = require('../es7-spread-property-visitors').visitorList;
  });

  function transform(code) {
    return transformFn(visitors, code).code;
  }

  function expectTransform(code, result) {
    expect(transform(code)).toEqual(result);
  }

  function expectObjectAssign(code) {
    var objectAssignMock = jest.genMockFunction();
    Object.assign = objectAssignMock;
    eval(transform(code));
    return expect(objectAssignMock);
  }

  afterEach(function() {
    Object.assign = originalAssign;
  });

  // Polyfill sanity checks

  it('has access to a working Object.assign implementation', function() {
    expect(typeof Object.assign).toBe('function');
    expect(Object.assign({ b: 2 }, null, { a: 1 })).toEqual({ a: 1, b: 2 });
  });

  // Semantic tests.

  it('uses Object.assign with an empty new target object', function() {
    expectObjectAssign(
      'var xy = { ...x, y: 2 }'
    ).toBeCalledWith({}, x, { y: 2 });
  });

  it('coalesces consecutive properties into a single object', function() {
    expectObjectAssign(
      'var xyz = { ...x, y: 2, z: z }'
    ).toBeCalledWith({}, x, { y: 2, z: z });

  });

  it('avoids an unnecessary empty object when spread is not first', function() {
    expectObjectAssign(
      'var xy = { x: 1, ...y }'
    ).toBeCalledWith({ x: 1}, y);
  });

  it('passes the same value multiple times to Object.assign', function() {
    expectObjectAssign(
      'var xyz = { x: 1, y: 2, ...z, ...z }'
    ).toBeCalledWith({ x: 1, y: 2}, z, z);
  });

  it('keeps object literals as separate arguments to assign', function() {
    expectObjectAssign(
      'var xyz = { x: 1, ...({ y: 2 }), z: 3 }'
    ).toBeCalledWith({ x: 1}, { y: 2 }, {z: 3 });
  });

  it('does not call assign when there are no spread properties', function() {
    expectObjectAssign(
      'var xy = { x: 1, y: 2 }'
    ).not.toBeCalled();
  });

  // Syntax tests.

  it('should preserve extra whitespace', function() {
    expectTransform(
      'let xyz = { x: 1, y : \n 2, ... \nz,  ...  z   }',
      'let xyz = Object.assign({ x: 1, y : \n 2},  \nz,    z   )'
    );
  });

  it('should preserve parenthesis', function() {
    expectTransform(
      'let xyz = { x: 1, ...({ y: 2 }), z: 3 }',
      'let xyz = Object.assign({ x: 1}, ({ y: 2 }), {z: 3 })'
    );
  });

  it('should remove trailing commas after properties', function() {
    expectTransform(
      'let xyz = { ...x, y: 1, }',
      'let xyz = Object.assign({}, x, {y: 1 })'
    );
  });

  it('should remove trailing commas after spread', function() {
    expectTransform(
      'let xyz = { x: 1, ...y, }',
      'let xyz = Object.assign({ x: 1}, y )'
    );
  });

  // Don't transform

  it('should not transform destructuring assignment', function() {
    expectTransform(
      'let { x, ...y } = z',
      'let { x, ...y } = z'
    );
  });

  // Accessors are unsupported. We leave it unprocessed so that other,
  // chained transforms, can take over.

  it('should not transform when there are getters', function() {
    expectTransform(
      'let xy = { ...x, get x() { } }',
      'let xy = { ...x, get x() { } }'
    );
  });

  it('should not transform when there are setters', function() {
    expectTransform(
      'let xy = { set x(v) { }, ...y }',
      'let xy = { set x(v) { }, ...y }'
    );
  });

  it('should silently ignore falsy values', function() {
    /*globals obj*/
    var code = transform([
      'var x = null;',
      'var y = { y: "y" };',
      'var obj = { ...x, ...y, ...{ ...false, z: "z", ...y } };'
    ].join('\n'));

    eval(code);

    expect(obj).toEqual({ y: 'y', z: 'z' });
  });
});
