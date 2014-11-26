if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
  var testAssert = require("./driver.js").testAssert;
}

// Pretzel map

test("arr.map(:toUpperCase)", {
  type: "Program",
  start: 0,
  end: 21,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 21,
    expression: {
      type: "CallExpression",
      start: 0,
      end: 21,
      callee: {
        type: "MemberExpression",
        start: 0,
        end: 7,
        object: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "arr"
        },
        property: {
          type: "Identifier",
          start: 4,
          end: 7,
          name: "map"
        },
        computed: false
      },
      arguments: [{
        type: "PretzelMapExpression",
        start: 8,
        end: 20,
        callee: {
          type: "Identifier",
          start: 9,
          end: 20,
          name: "toUpperCase"
        },
        arguments: []
      }]
    }
  }]
}, {
  playground: true
});

test("arr.map(:toFixed(2))", {
  type: "Program",
  start: 0,
  end: 20,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 20,
    expression: {
      type: "CallExpression",
      start: 0,
      end: 20,
      callee: {
        type: "MemberExpression",
        start: 0,
        end: 7,
        object: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "arr"
        },
        property: {
          type: "Identifier",
          start: 4,
          end: 7,
          name: "map"
        },
        computed: false
      },
      arguments: [{
        type: "PretzelMapExpression",
        start: 8,
        end: 19,
        callee: {
          type: "Identifier",
          start: 9,
          end: 16,
          name: "toFixed"
        },
        arguments: [{
          type: "Literal",
          start: 17,
          end: 18,
          value: 2,
          raw: "2"
        }]
      }]
    }
  }]
}, {
  playground: true
});

// Memoization assignment operator

testFail("obj ?= 2;", "You can only use member expressions in memoization assignment (1:0)");

test("obj.x ?= 2;", {
  type: "Program",
  start: 0,
  end: 11,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 11,
    expression: {
      type: "AssignmentExpression",
      start: 0,
      end: 10,
      left: {
        type: "MemberExpression",
        start: 0,
        end: 5,
        object: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "obj"
        },
        property: {
          type: "Identifier",
          start: 4,
          end: 5,
          name: "x"
        },
        computed: false
      },
      right: {
        type: "Literal",
        start: 9,
        end: 10,
        value: 2,
        raw: "2"
      },
      operator: "?="
    }
  }]
}, {
  playground: true
});

// Method binding

test("var fn = obj:method", {
  type: "Program",
  start: 0,
  end: 19,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 19,
    declarations: [{
      type: "VariableDeclarator",
      start: 4,
      end: 19,
      id: {
        type: "Identifier",
        start: 4,
        end: 6,
        name: "fn"
      },
      init: {
        type: "BindMemberExpression",
        start: 9,
        end: 19,
        object: {
          type: "Identifier",
          start: 9,
          end: 12,
          name: "obj"
        },
        property: {
          type: "Identifier",
          start: 13,
          end: 19,
          name: "method"
        },
        arguments: []
      }
    }],
    kind: "var"
    }]
}, {
  playground: true
});

test("var fn = obj:method('foo', 5)", {
  type: "Program",
  start: 0,
  end: 29,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 29,
    declarations: [{
      type: "VariableDeclarator",
      start: 4,
      end: 29,
      id: {
        type: "Identifier",
        start: 4,
        end: 6,
        name: "fn"
      },
      init: {
        type: "BindMemberExpression",
        start: 9,
        end: 29,
        object: {
          type: "Identifier",
          start: 9,
          end: 12,
          name: "obj"
        },
        property: {
          type: "Identifier",
          start: 13,
          end: 19,
          name: "method"
        },
        arguments: [
          {
            type: "Literal",
            start: 20,
            end: 25,
            value: "foo",
            raw: "'foo'"
          },
          {
            type: "Literal",
            start: 27,
            end: 28,
            value: 5,
            raw: "5"
          }
        ]
      }
    }],
    kind: "var"
  }]
}, {
  playground: true
});

test("var fn = obj[foob]:method('foo', 5)", {
  type: "Program",
  start: 0,
  end: 35,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 35,
    declarations: [{
      type: "VariableDeclarator",
      start: 4,
      end: 35,
      id: {
        type: "Identifier",
        start: 4,
        end: 6,
        name: "fn"
      },
      init: {
        type: "BindMemberExpression",
        start: 9,
        end: 35,
        object: {
          type: "MemberExpression",
          start: 9,
          end: 18,
          object: {
            type: "Identifier",
            start: 9,
            end: 12,
            name: "obj"
          },
          property: {
            type: "Identifier",
            start: 13,
            end: 17,
            name: "foob"
          },
          computed: true
        },
        property: {
          type: "Identifier",
          start: 19,
          end: 25,
          name: "method"
        },
        arguments: [
          {
            type: "Literal",
            start: 26,
            end: 31,
            value: "foo",
            raw: "'foo'"
          },
          {
            type: "Literal",
            start: 33,
            end: 34,
            value: 5,
            raw: "5"
          }
        ]
      }
    }],
    kind: "var"
  }]
}, {
  playground: true
});

test("var fn = obj[foob].test:method('foo', 5)", {
  type: "Program",
  start: 0,
  end: 40,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 40,
    declarations: [
      {
        type: "VariableDeclarator",
        start: 4,
        end: 40,
        id: {
          type: "Identifier",
          start: 4,
          end: 6,
          name: "fn"
        },
        init: {
          type: "BindMemberExpression",
          start: 9,
          end: 40,
          object: {
            type: "MemberExpression",
            start: 9,
            end: 23,
            object: {
              type: "MemberExpression",
              start: 9,
              end: 18,
              object: {
                type: "Identifier",
                start: 9,
                end: 12,
                name: "obj"
              },
              property: {
                type: "Identifier",
                start: 13,
                end: 17,
                name: "foob"
              },
              computed: true
            },
            property: {
              type: "Identifier",
              start: 19,
              end: 23,
              name: "test"
            },
            computed: false
          },
          property: {
            type: "Identifier",
            start: 24,
            end: 30,
            name: "method"
          },
          arguments: [
            {
              type: "Literal",
              start: 31,
              end: 36,
              value: "foo",
              raw: "'foo'"
            },
            {
              type: "Literal",
              start: 38,
              end: 39,
              value: 5,
              raw: "5"
            }
          ]
        }
      }
    ],
    kind: "var"
  }]
}, {
  playground: true
});
