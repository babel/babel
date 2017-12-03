/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * @emails jeffmo@fb.com
 */

require('mock-modules').autoMockOff();

describe('jstransform', function() {
  var transformFn;
  var Syntax = require('esprima-fb').Syntax;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transformFn = require('../jstransform').transform;
  });

  function _runVisitor(source, nodeCount, visitor) {
    var actualVisitationCount = 0;
    function shimVisitor(traverse, node, path, state) {
      actualVisitationCount++;
      return visitor(traverse, node, path, state);
    }
    shimVisitor.test = visitor.test;
    transformFn([shimVisitor], source);
    expect(actualVisitationCount).toBe(nodeCount);
  }

  function testScopeBoundary(source, localIdents, nodeCount, visitorTest) {
    function visitor(traverse, node, path, state) {
      var actualLocalIdents = Object.keys(state.localScope.identifiers);
      expect(actualLocalIdents.sort()).toEqual(localIdents.sort());
    }
    visitor.test = visitorTest;
    _runVisitor(source, nodeCount, visitor);
  }

  function testParentScope(source, parentIdents, nodeCount, visitorTest) {
    function visitor(traverse, node, path, state) {
      parentIdents = parentIdents && parentIdents.sort();
      var parentScope = state.localScope.parentScope;
      var actualParentIdents =
        parentScope && Object.keys(parentScope.identifiers).sort();
      expect(actualParentIdents).toEqual(parentIdents);
    }
    visitor.test = visitorTest;
    _runVisitor(source, nodeCount, visitor);
  }

  describe('closure scope boundaries', function() {
    it('creates a scope boundary around Program scope', function() {
      var source =
        'var foo;' +
        'var bar, baz;' +
        'function blah() {}';
      var idents = ['foo', 'bar', 'baz', 'blah'];

      testScopeBoundary(source, idents, 3, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });
    });

    it('creates a scope boundary around FunctionDeclarations', function() {
      var source  =
        'var foo;' +
        'function blah() {' +
        '  var bar;' +
        '  function nested() {' +
        '    var baz;' +
        '  }' +
        '}';
      var programIdents = ['foo', 'blah'];
      var blahIdents = ['arguments', 'bar', 'nested'];
      var nestedIdents = ['arguments', 'baz'];

      testScopeBoundary(source, programIdents, 2, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });

      testScopeBoundary(source, blahIdents, 2, function(node, path) {
        // All direct children of blah()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionDeclaration &&
               path[1].id.name === 'blah';
      });

      testScopeBoundary(source, nestedIdents, 1, function(node, path) {
        // All direct children of nested()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionDeclaration &&
               path[1].id.name === 'nested';
      });
    });

    it('creates a scope boundary around MethodDefinitions', function() {
      var source =
        'var foo;' +
        'class ClassA {' +
        '  blah() {' +
        '    var bar;' +
        '  }' +
        '  another() {' +
        '    var baz;' +
        '  }' +
        '}';
      var programIdents = ['foo', 'ClassA'];
      var blahIdents = ['arguments', 'bar'];
      var anotherIdents = ['arguments', 'baz'];

      testScopeBoundary(source, programIdents, 2, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });

      testScopeBoundary(source, blahIdents, 1, function(node, path) {
        // All direct children of blah()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionExpression &&
               path[2] && path[2].type === Syntax.MethodDefinition &&
               path[2].key.name === 'blah';
      });

      testScopeBoundary(source, anotherIdents, 1, function(node, path) {
        // All direct children of another()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionExpression &&
               path[2] && path[2].type === Syntax.MethodDefinition &&
               path[2].key.name === 'another';
      });
    });

    it('creates a scope boundary around concise ArrowFunc exprs', function() {
      var source =
        'var foo;' +
        'var bar = baz => baz;';

      var programIdents = ['foo', 'bar'];
      var barIdents = ['arguments', 'baz'];

      testScopeBoundary(source, programIdents, 2, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });

      testScopeBoundary(source, barIdents, 1, function(node, path) {
        return path[0] && path[0].type === Syntax.ArrowFunctionExpression
               && path[0].body === node;
      });
    });

    it('uses VariableDeclarations to determine scope boundary', function() {
      var source =
        'var foo = 1;' +
        'function bar() {' +
        '  foo++;' +
        '  function baz() {' +
        '    var foo = 2;' +
        '  }' +
        '}';
      var programIdents = ['foo', 'bar'];
      var barIdents = ['arguments', 'baz'];
      var bazIdents = ['arguments', 'foo'];

      testScopeBoundary(source, programIdents, 2, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });

      testScopeBoundary(source, barIdents, 2, function(node, path) {
        // All direct children of blah()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionDeclaration &&
               path[1].id.name === 'bar';
      });

      testScopeBoundary(source, bazIdents, 1, function(node, path) {
        // All direct children of baz()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionDeclaration &&
               path[1].id.name === 'baz';
      });
    });

    it('includes function args in functions scope boundary', function() {
      var source =
        'var foo;' +
        'function blah(bar) {' +
        '  var baz;' +
        '}' +
        'var blah2 = bar2 => {var baz;};' +
        'var blah3 = bar3 => bar3;';
      var programIdents = ['foo', 'blah', 'blah2', 'blah3'];
      var blahIdents = ['arguments', 'bar', 'baz'];
      var blah2Idents = ['arguments', 'bar2', 'baz'];
      var blah3Idents = ['arguments', 'bar3'];

      testScopeBoundary(source, programIdents, 4, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });

      testScopeBoundary(source, blahIdents, 1, function(node, path) {
        // All direct children of blah()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionDeclaration &&
               path[1].id.name === 'blah';
      });

      testScopeBoundary(source, blah2Idents, 1, function(node, path) {
        // All direct children of blah2()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.ArrowFunctionExpression &&
               path[2].id.name === 'blah2';
      });

      testScopeBoundary(source, blah3Idents, 1, function(node, path) {
        // All direct children of blah3()
        return path[0] && path[0].type === Syntax.ArrowFunctionExpression &&
               path[0].body === node &&
               path[1].id.name === 'blah3';
      });
    });

    it('includes rest param args in function scope boundaries', function() {
      var source =
        'var foo;' +
        'function blah(...bar) {' +
        '  var baz;' +
        '}' +
        'var blah2 = (...bar2) => {var baz;};' +
        'var blah3 = (...bar3) => bar3;';
      var programIdents = ['foo', 'blah', 'blah2', 'blah3'];
      var blahIdents = ['arguments', 'bar', 'baz'];
      var blah2Idents = ['arguments', 'bar2', 'baz'];
      var blah3Idents = ['arguments', 'bar3'];

      testScopeBoundary(source, programIdents, 4, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });

      testScopeBoundary(source, blahIdents, 1, function(node, path) {
        // All direct children of blah()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionDeclaration &&
               path[1].id.name === 'blah';
      });

      testScopeBoundary(source, blah2Idents, 1, function(node, path) {
        // All direct children of blah2()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.ArrowFunctionExpression &&
               path[2].id.name === 'blah2';
      });

      testScopeBoundary(source, blah3Idents, 1, function(node, path) {
        // All direct children of blah3()
        return path[0] && path[0].type === Syntax.ArrowFunctionExpression &&
               path[0].body === node &&
               path[1].id.name === 'blah3';
      });
    });

    it('puts FunctionExpression names within function scope', function() {
      var source =
        'var foo;' +
        'var bar = function baz() {' +
        '  var blah;' +
        '};';
      var programIdents = ['foo', 'bar'];
      var bazIdents = ['arguments', 'baz', 'blah'];

      testScopeBoundary(source, programIdents, 2, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });

      testScopeBoundary(source, bazIdents, 1, function(node, path) {
        // All direct children of baz()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionExpression &&
               path[1].id.name === 'baz';
      });
    });
  });

  describe('block scope boundaries', function() {
    it('creates a scope boundary around CatchClauses with params', function() {
      var source =
        'var blah = 0;' +
        'try {' +
        '} catch (e) {' +
        '  blah++;' +
        '}';
      var programIdents = ['blah'];
      var catchIdents = ['e'];

      testScopeBoundary(source, programIdents, 2, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });

      testScopeBoundary(source, catchIdents, 1, function(node, path) {
        // All direct children of catch(e) block
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.CatchClause;
      });
    });

    it('includes vars defined in CatchClauses in the parent scope', function() {
      var source =
        'try {' +
        '} catch (e) {' +
        '  var blah;' +
        '}';
      var programIdents = ['blah'];
      var catchIdents = ['e'];

      testScopeBoundary(source, programIdents, 1, function(node, path) {
        return path[0] && path[0].type === Syntax.Program;
      });

      testScopeBoundary(source, catchIdents, 1, function(node, path) {
        // All direct children of catch(e) block
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.CatchClause;
      });
    });
  });

  describe('scope chain linking', function() {
    it('links parent scope boundaries', function() {
      var source =
        'var foo;' +
        'function blah() {' +
        '  var bar;' +
        '  function nested() {' +
        '    var baz;' +
        '  }' +
        '}';
      var programIdents = ['foo', 'blah'];
      var blahIdents = ['arguments', 'bar', 'nested'];

      testParentScope(source, programIdents, 2, function(node, path) {
        // All direct children of blah()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionDeclaration &&
               path[1].id.name === 'blah';
      });

      testParentScope(source, blahIdents, 1, function(node, path) {
        // All direct children of nested()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionDeclaration &&
               path[1].id.name === 'nested';
      });
    });

    it('nests MethodDefinition boundaries under parent scope', function() {
      var source =
        'var foo;' +
        'class ClassA {' +
        '  blah() {' +
        '    var bar;' +
        '  }' +
        '}';
      var programIdents = ['foo', 'ClassA'];

      testParentScope(source, programIdents, 1, function(node, path) {
        // All direct children of blah()
        return path[0] && path[0].type === Syntax.BlockStatement &&
               path[1] && path[1].type === Syntax.FunctionExpression &&
               path[2] && path[2].type === Syntax.MethodDefinition &&
               path[2].key.name === 'blah';
      });
    });
  });

  describe('"use strict" tracking', function() {
    function testStrictness(expectedStrict, source) {
      var visitedNodes = 0;
      function visitor(traverse, node, path, state) {
        visitedNodes++;
        expect(state.scopeIsStrict).toBe(expectedStrict);
      }
      visitor.test = function(node, path, state) {
        return node.type === Syntax.Literal
               && node.value === 'testStr';
      };
      transformFn([visitor], source);
      expect(visitedNodes).toBe(1);
    }

    it('detects program-level strictness', function() {
      testStrictness(false, '"testStr";');
      testStrictness(true, '"use strict"; "testStr";');
    });

    it('detects non-inherited strictness', function() {
      testStrictness(true, [
        'function foo() {',
        '  "use strict";',
        '  "testStr";',
        '}'
      ].join('\n'));
    });

    it('detects program-inherited strictness', function() {
      testStrictness(true, [
        '"use strict";',
        'function foo() {',
        '  "testStr";',
        '}'
      ].join('\n'));
    });

    it('detects function-inherited strictness', function() {
      testStrictness(true, [
        'function foo() {',
        '  "use strict";',
        '  function bar() {',
        '    "testStr";',
        '  }',
        '}'
      ].join('\n'));
    });

    it('does not detect sibling strictness', function() {
      testStrictness(false, [
        'function foo() {',
        '  "use strict";',
        '}',
        'function bar() {',
        '  "testStr";',
        '}'
      ].join('\n'));
    });
  });

  describe('visitors', function() {
    it('should visit nodes in order', function() {
      var source = [
        '// Foo comment',
        'function foo() {}',
        '',
        '// Bar comment',
        'function bar() {}'
      ].join('\n');

      var actualNodes = [];

      function visitFunction(traverse, node, path, state) {
        actualNodes.push([node.id.name, node.range[0]]);
      }
      visitFunction.test = function(node, path, state) {
        return node.type === Syntax.FunctionDeclaration;
      };

      function visitComments(traverse, node, path, state) {
        actualNodes.push([node.value, node.range[0]]);
      }
      visitComments.test = function(node, path, state) {
        return node.type === 'Line';
      };

      transformFn([visitComments, visitFunction], source);

      expect(actualNodes).toEqual([
        [' Foo comment', 0],
        ['foo', 15],
        [' Bar comment', 34],
        ['bar', 49]
      ]);
    });
  });
});
