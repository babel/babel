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
/*jshint -W117*/

require('mock-modules').autoMockOff();

describe('es6ArrowFunctionsTransform', function() {
  var transformFn;
  var visitors;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    visitors = require('../es6-arrow-function-visitors').visitorList;
    transformFn = require('../../src/jstransform').transform;
  });

  function transform(code) {
    return transformFn(visitors, code).code;
  }

  function expectTransform(code, result) {
    expect(transform(code)).toEqual(result);
  }

  it('should capture correct this value at different levels', function() {
    var code = transform([
      'var foo = {',
      '  createFooGetter: function() {',
      '    return (x) => [x, this];', // captures foo
      '  },',
      '  getParentThis: () => this', // captures parent this
      '};'
    ].join('\n'));

    eval(code);

    expect(typeof foo.createFooGetter).toBe('function');
    expect(typeof foo.createFooGetter()).toBe('function');
    expect(typeof foo.getParentThis).toBe('function');

    expect(foo.getParentThis()).toEqual(this);
    expect(foo.createFooGetter()(10)).toEqual([10, foo]);
  });

  it('should map an array using arrow capturing this value', function() {
    this.factor = 10;

    var code = transform(
      '[1, 2, 3].map(x => x * x * this.factor);'
    );

    expect(eval(code)).toEqual([10, 40, 90]);
  });

  it('binds if any `super` keyword is referenced', function() {
    var code = transform(
      'var fn=x=>super;'
    );

    // We have to do a source text comparison here because `super` is a reserved
    // keyword (so we can't eval it).
    expect(code).toEqual('var fn=function(x){return super;}.bind(this);');
  });

  it('should filter an array using arrow with two params', function() {
    this.factor = 0;

    var code = transform([
      '[1, 2, 3].filter((v, idx) => {',
      '  if (idx > 1 && this.factor > 0) {',
      '    return true;',
      '  }',
      '  this.factor++;',
      '  return false;',
      '});'
    ].join('\n'));

    expect(eval(code)).toEqual([3]);
  });

  it('should fetch this value data from nested arrow', function() {
    var code = transform([
      '({',
      '  bird: 22,',
      '  run: function() {',
      '    return () => () => this.bird;',
      '  }',
      '}).run()()();'
    ].join('\n'));

    expect(eval(code)).toEqual(22);
  });

  // Syntax tests.

  it('should correctly transform arrows', function() {
    // 0 params, expression.
    expectTransform(
      '() => this.value;',
      '(function()  {return this.value;}.bind(this));'
    );

    // 0 params, expression wrapped in parens
    expectTransform(
      '() => (this.value);',
      '(function()  {return this.value;}.bind(this));'
    );

    // 1 param, no-parens, expression, no this.
    expectTransform(
      'x => x * x;',
      '(function(x)  {return x * x;});'
    );

    // 1 param, parens, expression, as argument, no this.
    expectTransform(
      'map((x) => x * x);',
      'map(function(x)  {return x * x;});'
    );

    // 2 params, block, as argument, nested.
    expectTransform(
      'makeRequest((response, error) => {'.concat(
      '  return this.update(data => this.onData(data), response);',
      '});'),
      'makeRequest(function(response, error)  {'.concat(
      '  return this.update(function(data)  {return this.onData(data);}.bind(this), response);',
      '}.bind(this));')
    );

    // Assignment to a var, simple, 1 param.
    expectTransform(
      'var action = (value) => this.performAction(value);',
      'var action = function(value)  {return this.performAction(value);}.bind(this);'
    );

    // Preserve lines transforming ugly code.
    expectTransform([
      '(',
      '',
      '',
      '    x,',
      ' y',
      '',
      ')',
      '',
      '         =>',
      '',
      '        {',
      ' return         x + y;',
      '};'
    ].join('\n'), [
      '(function(',
      '',
      '',
      '    x,',
      ' y)',
      '',
      '',
      '',
      '         ',
      '',
      '        {',
      ' return         x + y;',
      '});'
    ].join('\n'));

    // Preserve line numbers with single parens-free param ugly code.
    expectTransform([
      'x',
      '',
      '     =>',
      '   x;'
    ].join('\n'), [
      '(function(x)',
      '',
      '     ',
      '   {return x;});'
    ].join('\n'));

    // Preserve line numbers with single parens param ugly code.
    expectTransform([
      '(',
      '',
      '   x',
      '',
      ')',
      '',
      '     =>',
      '   x;'
    ].join('\n'), [
      '(function(',
      '',
      '   x)',
      '',
      '',
      '',
      '     ',
      '   {return x;});'
    ].join('\n'));

    // Preserve line numbers with parens around expression.
    expectTransform([
      '(x) => (',
      '  x',
      ');'
    ].join('\n'), [
      '(function(x)  ',
      '  {return x;}',
      ');'
    ].join('\n'));

    // Preserve typechecker annotation.
    expectTransform(
      '(/*string*/foo, /*bool*/bar) => foo;',
      '(function(/*string*/foo, /*bool*/bar)  {return foo;});'
    );

    // Binds this for arrows containing <this />
    expectTransform(
      '(() => <this />)',
      '((function()  {return <this />;}.bind(this)))'
    );
  });
});

