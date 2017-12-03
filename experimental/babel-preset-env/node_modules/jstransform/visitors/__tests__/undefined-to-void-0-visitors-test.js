/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails oncall+jsinfra@xmail.facebook.com
 */

/*jshint evil:true*/

require('mock-modules').autoMockOff();

describe('undefined to void 0', function() {
  var transformFn;
  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    visitors = require('../undefined-to-void-0-visitors').visitorList;
    transformFn = require('../../src/jstransform').transform;
  });

  function transform(code) {
    return transformFn(visitors, code).code;
  }

  it('should transform when undefined is not in scope', function() {
    var code = [
      '(function() {',
      '  foo.undefined = bar;',
      '  ({undefined: foo});',
      '  var bar = undefined;',
      '  bar = undefined;',
      '  foo.bar = undefined;',
      '  undefined.foo = bar;',
      '  foo[undefined] = bar;',
      '  ({foo: undefined});',
      '})(undefined);'
    ].join('\n');

    var result = [
      '(function() {',
      '  foo.undefined = bar;',
      '  ({undefined: foo});',
      '  var bar = (void 0);',
      '  bar = (void 0);',
      '  foo.bar = (void 0);',
      '  (void 0).foo = bar;',
      '  foo[(void 0)] = bar;',
      '  ({foo: (void 0)});',
      '})((void 0));'
    ].join('\n');

    expect(transform(code)).toEqual(result);
  });

  it('should not transform when undefined is function argument', function() {
    var code = [
      '(function(undefined) {', // declared here
      '  return undefined;',
      '})(1);'
    ].join('\n');

    var result = [
      '(function(undefined) {', // declared here
      '  return undefined;',
      '})(1);'
    ].join('\n');

    expect(transform(code)).toEqual(result);
  });

  it('should not transform when undefined is defined in local scope', function() {
    var code = [
      '(function() {',
      '  var undefined;', // declared here
      '  undefined = 1;', // assignment to declared variable
      '  return undefined;',
      '})();'
    ].join('\n');

    var result = [
      '(function() {',
      '  var undefined;', // declared here
      '  undefined = 1;', // assignment to declared variable
      '  return undefined;',
      '})();'
    ].join('\n');

    expect(transform(code)).toEqual(result);
  });

  it('should not transform when undefined is defined in lexical scope', function() {
    var code = [
      '(function(undefined) {', // declared here
      '  return (function() {',
      '    return undefined;', // respects lexical scope
      '  })();',
      '})();'
    ].join('\n');

    var result = [
      '(function(undefined) {', // declared here
      '  return (function() {',
      '    return undefined;', // respects lexical scope
      '  })();',
      '})();'
    ].join('\n');

    expect(transform(code)).toEqual(result);
  });

});


