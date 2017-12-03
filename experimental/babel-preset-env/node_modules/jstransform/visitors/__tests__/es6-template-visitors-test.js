/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails mroch@fb.com
 */

/*jshint evil:true*/

require('mock-modules').autoMockOff();

describe('ES6 Template Visitor', function() {
  var transformFn;
  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    visitors = require('../es6-template-visitors').visitorList;
    transformFn = require('../../src/jstransform').transform;
  });

  function transform(code) {
    return transformFn(visitors, code).code;
  }

  function expectTransform(code, result) {
    expect(transform(code)).toEqual(result);
  }

  function expectEval(code, result, setupFn) {
    var actual;
    if (setupFn) {
      eval(setupFn);
    }
    eval('actual = ' + transform(code));
    expect(actual).toEqual(result);
  }

  function expectEvalTag(code, tagFn, scope) {
    /*jshint unused:false*/
    if (scope) {
      Object.keys(scope).forEach((key) => this[key] = scope[key]);
    }

    var tagCalls = 0;
    var tag = function(...args) {
      tagCalls++;
      return tagFn.apply(this, args);
    };
    var result = transform(code);
    expect(result.split('\n').length).toBe(code.split('\n').length);
    eval(result);
    expect(tagCalls).toBe(1);
  }

  function expectSiteObj(siteObj, cooked, raw) {
    expect(Array.isArray(siteObj)).toBe(true);
    expect(Object.isFrozen(siteObj)).toBe(true);
    expect(Array.isArray(siteObj.raw)).toBe(true);
    expect(Object.isFrozen(siteObj.raw)).toBe(true);
    expect(siteObj.length).toBe(cooked.length);
    expect(siteObj.raw.length).toBe(raw.length);
    for (var ii = 0; ii < cooked.length; ii++) {
      expect(siteObj[ii]).toEqual(cooked[ii]);
    }
    expect(siteObj.raw).toEqual(raw);
  }

  it('should transform simple literals', function() {
    expectTransform('`foo bar`', '("foo bar")');

    expectEval('`foo bar`', 'foo bar');
    expectEval('`$`', '$');
    expectEval('`$foo`', '$foo');
  });

  it('should properly escape templates containing quotes', function() {
    expectTransform('`foo "bar"`', '("foo \\"bar\\"")');
    expectEval('`foo "bar"`', 'foo "bar"');

    expectTransform("`foo 'bar'`", '("foo \'bar\'")');
    expectEval("`foo 'bar'`", "foo 'bar'");

    // `foo \\"bar\\"` (foo, literal slash, "bar", literal slash)
    expectTransform('`foo \\\\"bar\\\\"`', '("foo \\\\\\"bar\\\\\\"")');
    expectEval('`foo \\\\\\"bar\\\\\\"`', 'foo \\"bar\\"');
  });

  it('should transform simple substitutions', function() {
    expectTransform('`foo ${bar}`', '("foo " + bar)');
    expectTransform('`${foo} bar`', '("" + foo + " bar")');
    expectTransform('`${foo} ${bar}`', '("" + foo + " " + bar)');
    expectTransform('`${foo}${bar}`', '("" + foo + bar)');
  });

  it('should transform expressions', function() {
    expectTransform('`foo ${bar()}`', '("foo " + bar())');
    expectTransform('`foo ${bar.baz}`', '("foo " + bar.baz)');
    expectTransform('`foo ${bar + 5}`', '("foo " + (bar + 5))');
    expectTransform('`${foo + 5} bar`', '("" + (foo + 5) + " bar")');
    expectTransform('`${foo + 5} ${bar}`', '("" + (foo + 5) + " " + bar)');
    expectTransform(
      '`${(function(b) {alert(4);})(a)}`',
      '("" + (function(b) {alert(4);})(a))');
    expectTransform("`${4 + 5}`", '("" + (4 + 5))');
  });

  it('should transform tags with simple templates', function() {
    /*jshint unused:false*/
    var tag = function(elements) {
      expectSiteObj(elements, ['foo bar'], ['foo bar']);
    };
    var result = transform("tag`foo bar`");
    expect(result.split('\n').length).toBe(1);
    eval(result);

    var a = { b: tag };
    eval(transform("a.b`foo bar`"));
    eval(transform("a['b']`foo bar`"));

    var getTag = function() { return tag; };
    eval(transform("getTag()`foo bar`"));
    eval(transform("(getTag())`foo bar`"));
  });

  it('should transform tags with substitutions', function() {
    expectTransform(
      "tag`foo ${bar} baz`",
      'tag(function() { var siteObj = ["foo ", " baz"]; ' +
      'siteObj.raw = ["foo ", " baz"]; Object.freeze(siteObj.raw); ' +
      'Object.freeze(siteObj); return siteObj; }(), bar)'
    );

    expectEvalTag(
      "tag`foo ${bar + 'abc'} baz`",
      function(elements, ...args) {
        expectSiteObj(elements, ['foo ', ' baz'], ['foo ', ' baz']);
        expect(args.length).toBe(1);
        expect(args[0]).toBe('barabc');
      },
      {bar: 'bar'}
    );

    expectEvalTag(
      "tag`foo ${bar + 'abc'}`",
      function(elements, ...args) {
        expectSiteObj(elements, ['foo ', ''], ['foo ', '']);
        expect(args.length).toBe(1);
        expect(args[0]).toBe('barabc');
      },
      {bar: 'bar'}
    );

    expectEvalTag(
      "tag`foo\n\n\nbar`",
      (elements) => {
        expectSiteObj(elements, ['foo\n\n\nbar'], ['foo\n\n\nbar']);
      }
    );

    expectEvalTag(
      "tag`a\nb\n${c}\nd`",
      (elements, ...args) => {
        expectSiteObj(elements, ['a\nb\n', '\nd'], ['a\nb\n', '\nd']);
        expect(args.length).toBe(1);
        expect(args[0]).toBe('c');
      },
      {c: 'c'}
    );
  });

  it('should maintain line numbers', function() {
    expectTransform("`foo\n\nbar`", '("foo\\n\\nbar"\n\n)');
    expectTransform("`foo\n${bar}\nbaz`", '("foo\\n" + \nbar + "\\nbaz"\n)');
    expectTransform("`foo\\nbar`", '("foo\\nbar")');

    expectTransform(
      "tag`a\nb\n${c}${d}\ne`",
      'tag(function() { var siteObj = ["a\\nb\\n", "", "\\ne"]; ' +
      'siteObj.raw = ["a\\nb\\n", "", "\\ne"]; Object.freeze(siteObj.raw); ' +
      'Object.freeze(siteObj); return siteObj; }(), \n\nc, d\n)'
    );
  });

  it('should handle multiple lines', function() {
    expectEval("`foo\n\nbar`", 'foo\n\nbar');
    expectEval("`foo\\nbar`", 'foo\nbar');
    expectEval("`foo\\\\nbar`", 'foo\\nbar');
    expectEval("`foo\n${bar}\nbaz`", 'foo\nabc\nbaz', 'var bar = "abc";');
  });

  it('should handle numeric expressions', function() {
    expectEval("`foo${1}bar${2}`", 'foo1bar2');
    expectEval("`foo${1}${2}bar`", 'foo12bar');
    expectEval("`${1}${2}foo`", '12foo');
    expectEval("`${1}${2}`", '12');
  });

  it('should handle primitive literals', function() {
    expectTransform("`${42}`", '("" + 42)');
    expectEval("`${42}`", '42');

    expectTransform("`${'42'}`", '("" + \'42\')');
    expectEval("`${'42'}`", '42');

    expectTransform("`${true}`", '("" + true)');
    expectEval("`${true}`", 'true');

    expectTransform("`${null}`", '("" + null)');
    expectEval("`${null}`", 'null');

    // undefined is actually an Identifier but it falls into the same category
    expectTransform("`${undefined}`", '("" + undefined)');
    expectEval("`${undefined}`", 'undefined');
  }),

  it('should canonicalize line endings', function() {
    // TODO: should this be '("foo\\nbar"\r\n)' to maintain the number of lines
    // for editors that break on \r\n? I don't think we care in the transformed
    // code.
    expectTransform("`foo\r\nbar`", '("foo\\nbar"\n)');
    // TODO: same as above but with trailing \r
    expectTransform("`foo\rbar`", '("foo\\nbar")');

    expectEval("`foo\r\nbar`", 'foo\nbar');
    expectEval("`foo\rbar`", 'foo\nbar');
    expectEval("`foo\r\n${bar}\r\nbaz`", 'foo\nabc\nbaz', 'var bar = "abc";');

    expectEvalTag(
      "tag`foo\rbar`",
      (elements) => {
        expectSiteObj(elements, ['foo\nbar'], ['foo\rbar']);
      }
    );
  });
});

