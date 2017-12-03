/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails jeffmo@fb.com
 */

/*jshint evil:true*/

jest.autoMockOff();

describe('reserved-words', function() {
  var transformFn;
  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    visitors = require('../reserved-words-visitors').visitorList;
    transformFn = require('../../src/jstransform').transform;
  });

  function transform(code, opts) {
    // No need for visitors as long as we are not in es5 mode.
    return transformFn(visitors, code, opts).code;
  }

  describe('reserved words in member expressions', function() {
    it('should transform to reserved word members to computed', function() {
      var code = 'foo.delete;';

      expect(transform(code)).toEqual('foo["delete"];');
    });

    it('should handle parenthesis', function() {
      var code = '(foo++).delete;';
      expect(transform(code)).toEqual('(foo++)["delete"];');

      code = '(foo.bar()).delete;';
      expect(transform(code)).toEqual('(foo.bar())["delete"];');
    });

    it('should handle call expressions', function() {
      var code = 'foo.return();';

      expect(transform(code)).toEqual('foo["return"]();');
    });

    it('should only quote ES3 reserved words', function() {
      var code = 'foo.await();';

      expect(transform(code)).toEqual('foo.await();');
    });

    it('should work with newlines', function() {
      var code = 'foo.\ncatch();';
      expect(transform(code)).toEqual('foo\n["catch"]();');

      // This one is weird but it works.
      code = 'foo.\n  catch();';
      expect(transform(code)).toEqual('foo\n  ["catch"]();');

      code = 'foo\n.catch();';
      expect(transform(code)).toEqual('foo\n["catch"]();');

      code = 'foo\n  .catch();';
      expect(transform(code)).toEqual('foo\n  ["catch"]();');
    });
  });

  describe('reserved words in properties', function() {
    it('should quote reserved words in properties', function() {
      var code = 'var x = {null: 1};';

      expect(transform(code)).toEqual('var x = {"null": 1};');
    });

    it('should only quote ES3 reserved words', function() {
      var code = 'var x = {await: 1};';

      expect(transform(code)).toEqual('var x = {await: 1};');
    });
  });
});
