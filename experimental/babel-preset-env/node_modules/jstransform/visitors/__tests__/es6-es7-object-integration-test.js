/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails sema@fb.com javascript@lists.facebook.com
 */

/*jshint evil:true*/

require('mock-modules').autoMockOff();

describe('es6-es7-object-integration-test', function() {
  var transformFn;

  var visitors;

  // These are placeholder variables in scope that we can use to assert that a
  // specific variable reference was passed, rather than an object clone of it.
  var x = 123456;
  var z = 345678;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../../src/jstransform').transform;

    var conciseMethodVisitors = require('../es6-object-concise-method-visitors').visitorList;
    var shortObjectsVisitors = require('../es6-object-short-notation-visitors').visitorList;
    var spreadPropertyVisitors = require('../es7-spread-property-visitors').visitorList;

    visitors = spreadPropertyVisitors.concat(
      shortObjectsVisitors,
      conciseMethodVisitors
    );
  });

  function transform(code) {
    return transformFn(visitors, code).code;
  }

  it('handles spread with concise methods and short notation', function() {
    var code = 'var xyz = { ...x, y() { return 42; }, z }';
    var objectAssignMock = jest.genMockFunction();
    Object.assign = objectAssignMock;
    eval(transform(code));

    var assignCalls = objectAssignMock.mock.calls;
    expect(assignCalls.length).toBe(1);
    expect(assignCalls[0].length).toBe(3);
    expect(assignCalls[0][0]).toEqual({});
    expect(assignCalls[0][1]).toEqual(x);

    var trailingObject = assignCalls[0][2];
    expect(trailingObject.y()).toEqual(42);
    expect(trailingObject.z).toEqual(z);
  });

  it('does not call assign when there are no spread properties', function() {
    var code = 'var xyz = { x, y() { return 42 }, z }';
    var objectAssignMock = jest.genMockFunction();
    Object.assign = objectAssignMock;
    eval(transform(code));
    expect(objectAssignMock).not.toBeCalled();
  });

});
