var test = require("./driver.js").test;
var testFail = require("./driver.js").testFail;
var testAssert = require("./driver.js").testAssert;

testFail("({a}) = 2;", "You're trying to assign to a parenthesized expression, eg. instead of `({a}) = 0` use `({a} = 0)` (1:1)");

testFail("([a]) = 2;", "You're trying to assign to a parenthesized expression, eg. instead of `([a]) = 0` use `([a] = 0)` (1:1)");

// ES7: Exponentiation Operator

test('a **= 2;', {
  type: "Program",
  start: 0,
  end: 8,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 8,
    expression: {
      type: "AssignmentExpression",
      start: 0,
      end: 7,
      operator: "**=",
      left: {
        type: "Identifier",
        start: 0,
        end: 1,
        name: "a"
      },
      right: {
        type: "Literal",
        start: 6,
        end: 7,
        value: 2
      }
    }
  }]
}, {
  features: { "es7.exponentiationOperator": true }
});

test('var squared = 2 ** 2;', {
  type: "Program",
  start: 0,
  end: 21,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 21,
    declarations: [{
      type: "VariableDeclarator",
      start: 4,
      end: 20,
      id: {
        type: "Identifier",
        start: 4,
        end: 11,
        name: "squared"
      },
      init: {
        type: "BinaryExpression",
        start: 14,
        end: 20,
        left: {
          type: "Literal",
          start: 14,
          end: 15,
          value: 2
        },
        operator: "**",
        right: {
          type: "Literal",
          start: 19,
          end: 20,
          value: 2
        }
      }
    }],
    kind: "var"
  }]
}, {
  features: { "es7.exponentiationOperator": true }
});

test("2 ** (3 ** 2)", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "BinaryExpression",
      left: {
        type: "Literal",
        value: 2
      },
      operator: "**",
      right: {
        type: "BinaryExpression",
        left: {
          type: "Literal",
          value: 3
        },
        operator: "**",
        right: {
          type: "Literal",
          value: 2
        }
      }
    }
  }]
}, {
  features: { "es7.exponentiationOperator": true }
});

test("2 ** 3 ** 2", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "BinaryExpression",
      left: {
        type: "Literal",
        value: 2
      },
      operator: "**",
      right: {
        type: "BinaryExpression",
        left: {
          type: "Literal",
          value: 3
        },
        operator: "**",
        right: {
          type: "Literal",
          value: 2
        }
      }
    }
  }]
}, {
  features: { "es7.exponentiationOperator": true }
});

test("(2 ** -1) * 2", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "BinaryExpression",
      left: {
        type: "BinaryExpression",
        left: {
          type: "Literal",
          value: 2
        },
        operator: "**",
        right: {
          type: "UnaryExpression",
          operator: "-",
          prefix: true,
          argument: {
            type: "Literal",
            value: 1
          }
        }
      },
      operator: "*",
      right: {
        type: "Literal",
        value: 2
      }
    }
  }]
}, {
  features: { "es7.exponentiationOperator": true }
});

test("2 ** -1 * 2", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "BinaryExpression",
      left: {
        type: "BinaryExpression",
        left: {
          type: "Literal",
          value: 2
        },
        operator: "**",
        right: {
          type: "UnaryExpression",
          operator: "-",
          prefix: true,
          argument: {
            type: "Literal",
            value: 1
          }
        }
      },
      operator: "*",
      right: {
        type: "Literal",
        value: 2
      }
    }
  }]
}, {
  features: { "es7.exponentiationOperator": true }
});

// ES7: Object Rest/Spread

test('let {...x} = z', {
  type: "Program",
  start: 0,
  end: 14,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 14,
    declarations: [
      {
        type: "VariableDeclarator",
        start: 4,
        end: 14,
        id: {
          type: "ObjectPattern",
          start: 4,
          end: 10,
          properties: [
            {
              type: "SpreadProperty",
              start: 5,
              end: 9,
              argument: {
                type: "Identifier",
                start: 8,
                end: 9,
                name: "x"
              }
            }
          ]
        },
        init: {
          type: "Identifier",
          start: 13,
          end: 14,
          name: "z"
        }
      }
    ],
    kind: "let"
  }]
}, {
  features: { "es7.objectRestSpread": true }
});

test('let {x, ...y} = z', {
  type: "Program",
  start: 0,
  end: 17,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 17,
    declarations: [
      {
        type: "VariableDeclarator",
        start: 4,
        end: 17,
        id: {
          type: "ObjectPattern",
          start: 4,
          end: 13,
          properties: [
            {
              type: "Property",
              start: 5,
              end: 6,
              method: false,
              shorthand: true,
              computed: false,
              key: {
                type: "Identifier",
                start: 5,
                end: 6,
                name: "x"
              },
              kind: "init",
              value: {
                type: "Identifier",
                start: 5,
                end: 6,
                name: "x"
              }
            },
            {
              type: "SpreadProperty",
              start: 8,
              end: 12,
              argument: {
                type: "Identifier",
                start: 11,
                end: 12,
                name: "y"
              }
            }
          ]
        },
        init: {
          type: "Identifier",
          start: 16,
          end: 17,
          name: "z"
        }
      }
    ],
    kind: "let"
  }]
}, {
  features: { "es7.objectRestSpread": true }
});

test('(function({x, ...y}) { })', {
  type: "Program",
  start: 0,
  end: 25,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 25,
    expression: {
      type: "FunctionExpression",
      start: 1,
      end: 24,
      id: null,
      params: [
        {
          type: "ObjectPattern",
          start: 10,
          end: 19,
          properties: [
            {
              type: "Property",
              start: 11,
              end: 12,
              method: false,
              shorthand: true,
              computed: false,
              key: {
                type: "Identifier",
                start: 11,
                end: 12,
                name: "x"
              },
              kind: "init",
              value: {
                type: "Identifier",
                start: 11,
                end: 12,
                name: "x"
              }
            },
            {
              type: "SpreadProperty",
              start: 14,
              end: 18,
              argument: {
                type: "Identifier",
                start: 17,
                end: 18,
                name: "y"
              }
            }
          ]
        }
      ],
      generator: false,
      body: {
        type: "BlockStatement",
        start: 21,
        end: 24,
        body: []
      },
      expression: false
    }
  }]
}, {
  features: { "es7.objectRestSpread": true }
});

test('let z = {...x}', {
  type: "Program",
  start: 0,
  end: 14,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 14,
    declarations: [
      {
        type: "VariableDeclarator",
        start: 4,
        end: 14,
        id: {
          type: "Identifier",
          start: 4,
          end: 5,
          name: "z"
        },
        init: {
          type: "ObjectExpression",
          start: 8,
          end: 14,
          properties: [
            {
              type: "SpreadProperty",
              start: 9,
              end: 13,
              argument: {
                type: "Identifier",
                start: 12,
                end: 13,
                name: "x"
              }
            }
          ]
        }
      }
    ],
    kind: "let"
  }]
}, {
  features: { "es7.objectRestSpread": true }
});

test('z = {x, ...y}', {
  type: "Program",
  start: 0,
  end: 13,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 13,
    expression: {
      type: "AssignmentExpression",
      start: 0,
      end: 13,
      operator: "=",
      left: {
        type: "Identifier",
        start: 0,
        end: 1,
        name: "z"
      },
      right: {
        type: "ObjectExpression",
        start: 4,
        end: 13,
        properties: [
          {
            type: "Property",
            start: 5,
            end: 6,
            method: false,
            shorthand: true,
            computed: false,
            key: {
              type: "Identifier",
              start: 5,
              end: 6,
              name: "x"
            },
            kind: "init",
            value: {
              type: "Identifier",
              start: 5,
              end: 6,
              name: "x"
            }
          },
          {
            type: "SpreadProperty",
            start: 8,
            end: 12,
            argument: {
              type: "Identifier",
              start: 11,
              end: 12,
              name: "y"
            }
          }
        ]
      }
    }
  }]
}, {
  features: { "es7.objectRestSpread": true }
});

test('({x, ...y, a, ...b, c})', {
  type: "Program",
  start: 0,
  end: 23,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 23,
    expression: {
      type: "ObjectExpression",
      start: 1,
      end: 22,
      properties: [
        {
          type: "Property",
          start: 2,
          end: 3,
          method: false,
          shorthand: true,
          computed: false,
          key: {
            type: "Identifier",
            start: 2,
            end: 3,
            name: "x"
          },
          kind: "init",
          value: {
            type: "Identifier",
            start: 2,
            end: 3,
            name: "x"
          }
        },
        {
          type: "SpreadProperty",
          start: 5,
          end: 9,
          argument: {
            type: "Identifier",
            start: 8,
            end: 9,
            name: "y"
          }
        },
        {
          type: "Property",
          start: 11,
          end: 12,
          method: false,
          shorthand: true,
          computed: false,
          key: {
            type: "Identifier",
            start: 11,
            end: 12,
            name: "a"
          },
          kind: "init",
          value: {
            type: "Identifier",
            start: 11,
            end: 12,
            name: "a"
          }
        },
        {
          type: "SpreadProperty",
          start: 14,
          end: 18,
          argument: {
            type: "Identifier",
            start: 17,
            end: 18,
            name: "b"
          }
        },
        {
          type: "Property",
          start: 20,
          end: 21,
          method: false,
          shorthand: true,
          computed: false,
          key: {
            type: "Identifier",
            start: 20,
            end: 21,
            name: "c"
          },
          kind: "init",
          value: {
            type: "Identifier",
            start: 20,
            end: 21,
            name: "c"
          }
        }
      ]
    }
  }]
}, {
  features: { "es7.objectRestSpread": true }
});

// ES7: Async Functions

testFail("function foo(promise) { await promise; }", "Unexpected token (1:30)", {
  features: { "es7.asyncFunctions": true }
});

testFail("var x = async\n(x) => x + 1;", "Unexpected token (2:4)", {
  features: { "es7.asyncFunctions": true }
});

test("async\nfunction foo() {}", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Identifier",
        name: "async",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 5}
        }
      },
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 5}
      }
    },
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "foo",
        loc: {
          start: {line: 2, column: 9},
          end: {line: 2, column: 12}
        }
      },
      params: [],
      body: {
        type: "BlockStatement",
        body: [],
        loc: {
          start: {line: 2, column: 15},
          end: {line: 2, column: 17}
        }
      },
      generator: false,
      expression: false,
      async: false,
      loc: {
        start: {line: 2, column: 0},
        end: {line: 2, column: 17}
      }
    }
  ]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true
});

test('async function foo(promise) { await promise; }', {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "foo",
      loc: {
        start: {line: 1, column: 15},
        end: {line: 1, column: 18}
      }
    },
    params: [{
      type: "Identifier",
      name: "promise",
      loc: {
        start: {line: 1, column: 19},
        end: {line: 1, column: 26}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [{
        type: "ExpressionStatement",
        expression: {
          type: "AwaitExpression",
          argument: {
            type: "Identifier",
            name: "promise",
            loc: {
              start: {line: 1, column: 36},
              end: {line: 1, column: 43}
            }
          },
          loc: {
            start: {line: 1, column: 30},
            end: {line: 1, column: 43}
          }
        },
        loc: {
          start: {line: 1, column: 30},
          end: {line: 1, column: 44}
        }
      }],
      loc: {
        start: {line: 1, column: 28},
        end: {line: 1, column: 46}
      }
    },
    generator: false,
    expression: false,
    async: true,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 46}
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true
});

test('(function(x) { async function inner() { await x } })', {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "x",
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 11}
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "FunctionDeclaration",
            id: {
              type: "Identifier",
              name: "inner",
              loc: {
                start: {line: 1, column: 30},
                end: {line: 1, column: 35}
              }
            },
            params: [],
            body: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "AwaitExpression",
                    argument: {
                      type: "Identifier",
                      name: "x",
                      loc: {
                        start: {line: 1, column: 46},
                        end: {line: 1, column: 47}
                      }
                    },
                    loc: {
                      start: {line: 1, column: 40},
                      end: {line: 1, column: 47}
                    }
                  },
                  loc: {
                    start: {line: 1, column: 40},
                    end: {line: 1, column: 47}
                  }
                }
              ],
              loc: {
                start: {line: 1, column: 38},
                end: {line: 1, column: 49}
              }
            },
            generator: false,
            expression: false,
            async: true,
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 49}
            }
          }
        ],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 51}
        }
      },
      generator: false,
      expression: false,
      loc: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 51}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 52}
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true
});

test('var foo = async function(promise) { await promise; }', {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [
      {
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "foo",
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 7}
          }
        },
        init: {
          type: "FunctionExpression",
          id: null,
          params: [
            {
              type: "Identifier",
              name: "promise",
              loc: {
                start: {line: 1, column: 25},
                end: {line: 1, column: 32}
              }
            }
          ],
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "AwaitExpression",
                  argument: {
                    type: "Identifier",
                    name: "promise",
                    loc: {
                      start: {line: 1, column: 42},
                      end: {line: 1, column: 49}
                    }
                  },
                  loc: {
                    start: {line: 1, column: 36},
                    end: {line: 1, column: 49}
                  }
                },
                loc: {
                  start: {line: 1, column: 36},
                  end: {line: 1, column: 50}
                }
              }
            ],
            loc: {
              start: {line: 1, column: 34},
              end: {line: 1, column: 52}
            }
          },
          generator: false,
          expression: false,
          async: true,
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 52}
          }
        },
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 52}
        }
      }
    ],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 52}
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true
});

test('var o = { a: 1, async foo(promise) { await promise } }', {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [
      {
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "o",
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 5}
          }
        },
        init: {
          type: "ObjectExpression",
          properties: [
            {
              type: "Property",
              key: {
                type: "Identifier",
                name: "a",
                loc: {
                  start: {line: 1, column: 10},
                  end: {line: 1, column: 11}
                }
              },
              value: {
                type: "Literal",
                value: 1,
                loc: {
                  start: {line: 1, column: 13},
                  end: {line: 1, column: 14}
                }
              },
              kind: "init",
              method: false,
              shorthand: false,
              computed: false,
              loc: {
                start: {line: 1, column: 10},
                end: {line: 1, column: 14}
              }
            },
            {
              type: "Property",
              key: {
                type: "Identifier",
                name: "foo",
                loc: {
                  start: {line: 1, column: 22},
                  end: {line: 1, column: 25}
                }
              },
              value: {
                type: "FunctionExpression",
                id: null,
                params: [
                  {
                    type: "Identifier",
                    name: "promise",
                    loc: {
                      start: {line: 1, column: 26},
                      end: {line: 1, column: 33}
                    }
                  }
                ],
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AwaitExpression",
                        argument: {
                          type: "Identifier",
                          name: "promise",
                          loc: {
                            start: {line: 1, column: 43},
                            end: {line: 1, column: 50}
                          }
                        },
                        loc: {
                          start: {line: 1, column: 37},
                          end: {line: 1, column: 50}
                        }
                      },
                      loc: {
                        start: {line: 1, column: 37},
                        end: {line: 1, column: 50}
                      }
                    }
                  ],
                  loc: {
                    start: {line: 1, column: 35},
                    end: {line: 1, column: 52}
                  }
                },
                generator: false,
                expression: false,
                async: true,
                loc: {
                  start: {line: 1, column: 25},
                  end: {line: 1, column: 52}
                }
              },
              kind: "init",
              method: true,
              shorthand: false,
              computed: false,
              loc: {
                start: {line: 1, column: 16},
                end: {line: 1, column: 52}
              }
            }
          ],
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 54}
          }
        },
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 54}
        }
      }
    ],
    kind: "var",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 54}
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true
});

test('class Foo { async bar(promise) { await promise } }', {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "Foo",
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 9}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          key: {
            type: "Identifier",
            name: "bar",
            loc: {
              start: {line: 1, column: 18},
              end: {line: 1, column: 21}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [
              {
                type: "Identifier",
                name: "promise",
                loc: {
                  start: {line: 1, column: 22},
                  end: {line: 1, column: 29}
                }
              }
            ],
            body: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "AwaitExpression",
                    argument: {
                      type: "Identifier",
                      name: "promise",
                      loc: {
                        start: {line: 1, column: 39},
                        end: {line: 1, column: 46}
                      }
                    },
                    loc: {
                      start: {line: 1, column: 33},
                      end: {line: 1, column: 46}
                    }
                  },
                  loc: {
                    start: {line: 1, column: 33},
                    end: {line: 1, column: 46}
                  }
                }
              ],
              loc: {
                start: {line: 1, column: 31},
                end: {line: 1, column: 48}
              }
            },
            generator: false,
            expression: false,
            async: true,
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 48}
            }
          },
          kind: "method",
          static: false,
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 48}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 10},
        end: {line: 1, column: 50}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 50}
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true
});

test('f(a, async promise => await promise)', {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "f",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      arguments: [
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 3}
          }
        },
        {
          type: "ArrowFunctionExpression",
          id: null,
          params: [
            {
              type: "Identifier",
              name: "promise",
              loc: {
                start: {line: 1, column: 11},
                end: {line: 1, column: 18}
              }
            }
          ],
          body: {
            type: "AwaitExpression",
            argument: {
              type: "Identifier",
              name: "promise",
              loc: {
                start: {line: 1, column: 28},
                end: {line: 1, column: 35}
              }
            },
            loc: {
              start: {line: 1, column: 22},
              end: {line: 1, column: 35}
            }
          },
          generator: false,
          expression: true,
          async: true,
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 35}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 36}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 36}
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true
});

test('f(a, async(x, y) => await [x, y], b)', {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "f",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      arguments: [
        {
          type: "Identifier",
          name: "a",
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 3}
          }
        },
        {
          type: "ArrowFunctionExpression",
          id: null,
          params: [
            {
              type: "Identifier",
              name: "x",
              loc: {
                start: {line: 1, column: 11},
                end: {line: 1, column: 12}
              }
            },
            {
              type: "Identifier",
              name: "y",
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            }
          ],
          body: {
            type: "AwaitExpression",
            argument: {
              type: "ArrayExpression",
              elements: [
                {
                  type: "Identifier",
                  name: "x",
                  loc: {
                    start: {line: 1, column: 27},
                    end: {line: 1, column: 28}
                  }
                },
                {
                  type: "Identifier",
                  name: "y",
                  loc: {
                    start: {line: 1, column: 30},
                    end: {line: 1, column: 31}
                  }
                }
              ],
              loc: {
                start: {line: 1, column: 26},
                end: {line: 1, column: 32}
              }
            },
            loc: {
              start: {line: 1, column: 20},
              end: {line: 1, column: 32}
            }
          },
          generator: false,
          expression: true,
          async: true,
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 32}
          }
        },
        {
          type: "Identifier",
          name: "b",
          loc: {
            start: {line: 1, column: 34},
            end: {line: 1, column: 35}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 36}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 36}
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true
});

test('f(async function(promise) { await promise })', {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "f",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      arguments: [
        {
          type: "FunctionExpression",
          id: null,
          params: [
            {
              type: "Identifier",
              name: "promise",
              loc: {
                start: {line: 1, column: 17},
                end: {line: 1, column: 24}
              }
            }
          ],
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "AwaitExpression",
                  argument: {
                    type: "Identifier",
                    name: "promise",
                    loc: {
                      start: {line: 1, column: 34},
                      end: {line: 1, column: 41}
                    }
                  },
                  loc: {
                    start: {line: 1, column: 28},
                    end: {line: 1, column: 41}
                  }
                },
                loc: {
                  start: {line: 1, column: 28},
                  end: {line: 1, column: 41}
                }
              }
            ],
            loc: {
              start: {line: 1, column: 26},
              end: {line: 1, column: 43}
            }
          },
          generator: false,
          expression: false,
          async: true,
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 43}
          }
        }
      ],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 44}
      }
    },
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 44}
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true
});

test('f(a, async(1, 2), b)', {
  type: "Program",
  body: [{
    "type": "ExpressionStatement",
    "expression": {
      "type": "CallExpression",
      "callee": {
        "type": "Identifier",
        "name": "f",
        "range": [
          0,
          1
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 1
          }
        }
      },
      "arguments": [
        {
          "type": "Identifier",
          "name": "a",
          "range": [
            2,
            3
          ],
          "loc": {
            "start": {
              "line": 1,
              "column": 2
            },
            "end": {
              "line": 1,
              "column": 3
            }
          }
        },
        {
          "type": "CallExpression",
          "callee": {
            "type": "Identifier",
            "name": "async",
            "range": [
              5,
              10
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 5
              },
              "end": {
                "line": 1,
                "column": 10
              }
            }
          },
          "arguments": [
            {
              "type": "Literal",
              "value": 1,
              "raw": "1",
              "range": [
                11,
                12
              ],
              "loc": {
                "start": {
                  "line": 1,
                  "column": 11
                },
                "end": {
                  "line": 1,
                  "column": 12
                }
              }
            },
            {
              "type": "Literal",
              "value": 2,
              "raw": "2",
              "range": [
                14,
                15
              ],
              "loc": {
                "start": {
                  "line": 1,
                  "column": 14
                },
                "end": {
                  "line": 1,
                  "column": 15
                }
              }
            }
          ],
          "range": [
            5,
            16
          ],
          "loc": {
            "start": {
              "line": 1,
              "column": 5
            },
            "end": {
              "line": 1,
              "column": 16
            }
          }
        },
        {
          "type": "Identifier",
          "name": "b",
          "range": [
            18,
            19
          ],
          "loc": {
            "start": {
              "line": 1,
              "column": 18
            },
            "end": {
              "line": 1,
              "column": 19
            }
          }
        }
      ],
      "range": [
        0,
        20
      ],
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 20
        }
      }
    },
    "range": [
      0,
      20
    ],
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 1,
        "column": 20
      }
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true,
  ranges: true
});

test('var ok = async(x)', {
  type: "Program",
  body: [{
    "type": "VariableDeclaration",
    "declarations": [
      {
        "type": "VariableDeclarator",
        "id": {
          "type": "Identifier",
          "name": "ok",
          "range": [
            4,
            6
          ],
          "loc": {
            "start": {
              "line": 1,
              "column": 4
            },
            "end": {
              "line": 1,
              "column": 6
            }
          }
        },
        "init": {
          "type": "CallExpression",
          "callee": {
            "type": "Identifier",
            "name": "async",
            "range": [
              9,
              14
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 9
              },
              "end": {
                "line": 1,
                "column": 14
              }
            }
          },
          "arguments": [
            {
              "type": "Identifier",
              "name": "x",
              "range": [
                15,
                16
              ],
              "loc": {
                "start": {
                  "line": 1,
                  "column": 15
                },
                "end": {
                  "line": 1,
                  "column": 16
                }
              }
            }
          ],
          "range": [
            9,
            17
          ],
          "loc": {
            "start": {
              "line": 1,
              "column": 9
            },
            "end": {
              "line": 1,
              "column": 17
            }
          }
        },
        "range": [
          4,
          17
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 4
          },
          "end": {
            "line": 1,
            "column": 17
          }
        }
      }
    ],
    "kind": "var",
    "range": [
      0,
      17
    ],
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 1,
        "column": 17
      }
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true,
  ranges: true
});

test('(function() { var async; async = 10 })', {
  type: "Program",
  body: [{
    "type": "ExpressionStatement",
    "expression": {
      "type": "FunctionExpression",
      "id": null,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "async",
                  "range": [
                    18,
                    23
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  }
                },
                "init": null,
                "range": [
                  18,
                  23
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 18
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                }
              }
            ],
            "kind": "var",
            "range": [
              14,
              24
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 14
              },
              "end": {
                "line": 1,
                "column": 24
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "Identifier",
                "name": "async",
                "range": [
                  25,
                  30
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 25
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                }
              },
              "right": {
                "type": "Literal",
                "value": 10,
                "raw": "10",
                "range": [
                  33,
                  35
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 33
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                }
              },
              "range": [
                25,
                35
              ],
              "loc": {
                "start": {
                  "line": 1,
                  "column": 25
                },
                "end": {
                  "line": 1,
                  "column": 35
                }
              }
            },
            "range": [
              25,
              35
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 25
              },
              "end": {
                "line": 1,
                "column": 35
              }
            }
          }
        ],
        "range": [
          12,
          37
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 12
          },
          "end": {
            "line": 1,
            "column": 37
          }
        }
      },
      "generator": false,
      "expression": false,
      "range": [
        1,
        37
      ],
      "loc": {
        "start": {
          "line": 1,
          "column": 1
        },
        "end": {
          "line": 1,
          "column": 37
        }
      }
    },
    "range": [
      0,
      38
    ],
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 1,
        "column": 38
      }
    }
  }]
}, {
  features: { "es7.asyncFunctions": true },
  locations: true,
  ranges: true
});

test('class Test { async() {} }', {
  type: "Program",
  start: 0,
  end: 25,
  body: [{
    type: "ClassDeclaration",
    start: 0,
    end: 25,
    id: {
      type: "Identifier",
      start: 6,
      end: 10,
      name: "Test"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      start: 11,
      end: 25,
      body: [{
        type: "MethodDefinition",
        start: 13,
        end: 23,
        static: false,
        key: {
          type: "Identifier",
          start: 13,
          end: 18,
          name: "async"
        },
        kind: "method",
        value: {
          type: "FunctionExpression",
          start: 18,
          end: 23,
          id: null,
          params: [],
          generator: false,
          async: false,
          body: {
            type: "BlockStatement",
            start: 21,
            end: 23,
            body: []
          },
          expression: false
        }
      }]
    }
  }]
}, {
  features: { "es7.asyncFunctions": true }
});

test('var obj = { async: "test" };', {
  type: "Program",
  start: 0,
  end: 28,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 28,
    declarations: [{
      type: "VariableDeclarator",
      start: 4,
      end: 27,
      id: {
        type: "Identifier",
        start: 4,
        end: 7,
        name: "obj"
      },
      init: {
        type: "ObjectExpression",
        start: 10,
        end: 27,
        properties: [{
          type: "Property",
          start: 12,
          end: 25,
          method: false,
          shorthand: false,
          key: {
            type: "Identifier",
            start: 12,
            end: 17,
            name: "async"
          },
          value: {
            type: "Literal",
            start: 19,
            end: 25,
            value: "test",
            raw: "\"test\""
          },
          kind: "init"
        }]
      }
    }],
    kind: "var"
  }]
}, {
  features: { "es7.asyncFunctions": true }
});

test('var obj = { async() {} };', {
  type: "Program",
  start: 0,
  end: 25,
  body: [{
    type: "VariableDeclaration",
    start: 0,
    end: 25,
    declarations: [{
      type: "VariableDeclarator",
      start: 4,
      end: 24,
      id: {
        type: "Identifier",
        start: 4,
        end: 7,
        name: "obj"
      },
      init: {
        type: "ObjectExpression",
        start: 10,
        end: 24,
        properties: [{
          type: "Property",
          start: 12,
          end: 22,
          method: true,
          shorthand: false,
          key: {
            type: "Identifier",
            start: 12,
            end: 17,
            name: "async"
          },
          kind: "init",
          value: {
            type: "FunctionExpression",
            start: 17,
            end: 22,
            id: null,
            params: [],
            generator: false,
            body: {
              type: "BlockStatement",
              start: 20,
              end: 22,
              body: []
            },
            expression: false
          }
        }]
      }
    }],
    kind: "var"
  }]
}, {
  features: { "es7.asyncFunctions": true }
});

test('export async function foo(){}', {
  "type": "Program",
  "start": 0,
  "end": 29,
  "body": [{
    "type": "ExportNamedDeclaration",
    "start": 0,
    "end": 29,
    "declaration": {
      "type": "FunctionDeclaration",
      "start": 7,
      "end": 29,
      "id": {
        "type": "Identifier",
        "start": 22,
        "end": 25,
        "name": "foo"
      },
      "params": [],
      "generator": false,
      "async": true,
      "body": {
        "type": "BlockStatement",
        "start": 27,
        "end": 29,
        "body": []
      },
      "expression": false
    },
    "specifiers": [],
    "source": null
  }]
}, {
  sourceType: "module",
  features: { "es7.asyncFunctions": true }
});

// ES7 decorators - https://github.com/wycats/javascript-decorators

test("@foo class Foo {}", {
  "start": 0,
  "body": [
    {
      "start": 5,
      "decorators": [
        {
          "start": 0,
          "expression": {
            "start": 1,
            "name": "foo",
            "type": "Identifier",
            "end": 4
          },
          "type": "Decorator",
          "end": 4
        }
      ],
      "id": {
        "start": 11,
        "name": "Foo",
        "type": "Identifier",
        "end": 14
      },
      "superClass": null,
      "body": {
        "start": 15,
        "body": [],
        "type": "ClassBody",
        "end": 17
      },
      "type": "ClassDeclaration",
      "end": 17
    }
  ],
  "type": "Program",
  "end": 17
}, {
  features: { "es7.decorators": true }
});

test("var Foo = @foo class Foo {}", {
  "start": 0,
  "body": [
    {
      "start": 0,
      "declarations": [
        {
          "start": 4,
          "id": {
            "start": 4,
            "name": "Foo",
            "type": "Identifier",
            "end": 7
          },
          "init": {
            "start": 15,
            "decorators": [
              {
                "start": 10,
                "expression": {
                  "start": 11,
                  "name": "foo",
                  "type": "Identifier",
                  "end": 14
                },
                "type": "Decorator",
                "end": 14
              }
            ],
            "id": {
              "start": 21,
              "name": "Foo",
              "type": "Identifier",
              "end": 24
            },
            "superClass": null,
            "body": {
              "start": 25,
              "body": [],
              "type": "ClassBody",
              "end": 27
            },
            "type": "ClassExpression",
            "end": 27
          },
          "type": "VariableDeclarator",
          "end": 27
        }
      ],
      "kind": "var",
      "type": "VariableDeclaration",
      "end": 27
    }
  ],
  "type": "Program",
  "end": 27
}, {
  features: { "es7.decorators": true }
});

test("class Foo { @foo bar() {} }", {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 17,
            "decorators": [
              {
                "start": 12,
                "expression": {
                  "start": 13,
                  "name": "foo",
                  "type": "Identifier",
                  "end": 16
                },
                "type": "Decorator",
                "end": 16
              }
            ],
            "computed": false,
            "key": {
              "start": 17,
              "name": "bar",
              "type": "Identifier",
              "end": 20
            },
            "static": false,
            "kind": "method",
            "value": {
              "start": 20,
              "id": null,
              "generator": false,
              "expression": false,
              "params": [],
              "body": {
                "start": 23,
                "body": [],
                "type": "BlockStatement",
                "end": 25
              },
              "type": "FunctionExpression",
              "end": 25
            },
            "type": "MethodDefinition",
            "end": 25
          }
        ],
        "type": "ClassBody",
        "end": 27
      },
      "type": "ClassDeclaration",
      "end": 27
    }
  ],
  "type": "Program",
  "end": 27
}, {
  features: { "es7.decorators": true }
});

test("class Foo { @foo set bar(f) {} }", {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 17,
            "decorators": [
              {
                "start": 12,
                "expression": {
                  "start": 13,
                  "name": "foo",
                  "type": "Identifier",
                  "end": 16
                },
                "type": "Decorator",
                "end": 16
              }
            ],
            "computed": false,
            "key": {
              "start": 21,
              "name": "bar",
              "type": "Identifier",
              "end": 24
            },
            "static": false,
            "kind": "set",
            "value": {
              "start": 24,
              "id": null,
              "generator": false,
              "expression": false,
              "params": [{
                "type": "Identifier",
                "name": "f"
              }],
              "body": {
                "start": 28,
                "body": [],
                "type": "BlockStatement",
                "end": 30
              },
              "type": "FunctionExpression",
              "end": 30
            },
            "type": "MethodDefinition",
            "end": 30
          }
        ],
        "type": "ClassBody",
        "end": 32
      },
      "type": "ClassDeclaration",
      "end": 32
    }
  ],
  "type": "Program",
  "end": 32
}, {
  features: { "es7.decorators": true }
});

test("class Foo { @foo get bar() {} }", {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 17,
            "decorators": [
              {
                "start": 12,
                "expression": {
                  "start": 13,
                  "name": "foo",
                  "type": "Identifier",
                  "end": 16
                },
                "type": "Decorator",
                "end": 16
              }
            ],
            "computed": false,
            "key": {
              "start": 21,
              "name": "bar",
              "type": "Identifier",
              "end": 24
            },
            "static": false,
            "kind": "get",
            "value": {
              "start": 24,
              "id": null,
              "generator": false,
              "expression": false,
              "params": [],
              "body": {
                "start": 27,
                "body": [],
                "type": "BlockStatement",
                "end": 29
              },
              "type": "FunctionExpression",
              "end": 29
            },
            "type": "MethodDefinition",
            "end": 29
          }
        ],
        "type": "ClassBody",
        "end": 31
      },
      "type": "ClassDeclaration",
      "end": 31
    }
  ],
  "type": "Program",
  "end": 31
}, {
  features: { "es7.decorators": true }
});

test("class Foo { @foo @bar bar() {} }", {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 22,
            "decorators": [
              {
                "start": 12,
                "expression": {
                  "start": 13,
                  "name": "foo",
                  "type": "Identifier",
                  "end": 16
                },
                "type": "Decorator",
                "end": 16
              },
              {
                "start": 17,
                "expression": {
                  "start": 18,
                  "name": "bar",
                  "type": "Identifier",
                  "end": 21
                },
                "type": "Decorator",
                "end": 21
              }
            ],
            "computed": false,
            "key": {
              "start": 22,
              "name": "bar",
              "type": "Identifier",
              "end": 25
            },
            "static": false,
            "kind": "method",
            "value": {
              "start": 25,
              "id": null,
              "generator": false,
              "expression": false,
              "params": [],
              "body": {
                "start": 28,
                "body": [],
                "type": "BlockStatement",
                "end": 30
              },
              "type": "FunctionExpression",
              "end": 30
            },
            "type": "MethodDefinition",
            "end": 30
          }
        ],
        "type": "ClassBody",
        "end": 32
      },
      "type": "ClassDeclaration",
      "end": 32
    }
  ],
  "type": "Program",
  "end": 32
}, {
  features: { "es7.decorators": true }
});

test('@foo({ @bar foo: "bar" }) @bar class Foo {}', {
  "start": 0,
  "body": [{
    "start": 31,
    "decorators": [{
      "start": 0,
      "expression": {
        "start": 1,
        "callee": {
          "start": 1,
          "name": "foo",
          "type": "Identifier",
          "end": 4
        },
        "arguments": [{
          "start": 5,
          "properties": [{
            "start": 12,
            "decorators": [{
              "start": 7,
              "expression": {
                "start": 8,
                "name": "bar",
                "type": "Identifier",
                "end": 11
              },
              "type": "Decorator",
              "end": 11
            }],
            "method": false,
            "shorthand": false,
            "computed": false,
            "key": {
              "start": 12,
              "name": "foo",
              "type": "Identifier",
              "end": 15
            },
            "value": {
              "start": 17,
              "value": "bar",
              "raw": "\"bar\"",
              "type": "Literal",
              "end": 22
            },
            "kind": "init",
            "type": "Property",
            "end": 22
          }],
          "type": "ObjectExpression",
          "end": 24
        }],
        "type": "CallExpression",
        "end": 25
      },
      "type": "Decorator",
      "end": 25
    },
    {
      "start": 26,
      "expression": {
        "start": 27,
        "name": "bar",
        "type": "Identifier",
        "end": 30
      },
      "type": "Decorator",
      "end": 30
    }],
    "id": {
      "start": 37,
      "name": "Foo",
      "type": "Identifier",
      "end": 40
    },
    "superClass": null,
    "body": {
      "start": 41,
      "body": [],
      "type": "ClassBody",
      "end": 43
    },
    "type": "ClassDeclaration",
    "end": 43
  }],
  "sourceType": "script",
  "type": "Program",
  "end": 43
}, {
  features: { "es7.decorators": true }
});

test('@bar class Foo extends @foo class Bar {} {}', {
  "start": 0,
  "body": [{
    "start": 5,
    "decorators": [{
      "start": 0,
      "expression": {
        "start": 1,
        "name": "bar",
        "type": "Identifier",
        "end": 4
      },
      "type": "Decorator",
      "end": 4
    }],
    "id": {
      "start": 11,
      "name": "Foo",
      "type": "Identifier",
      "end": 14
    },
    "superClass": {
      "start": 28,
      "decorators": [{
        "start": 23,
        "expression": {
          "start": 24,
          "name": "foo",
          "type": "Identifier",
          "end": 27
        },
        "type": "Decorator",
        "end": 27
      }],
      "id": {
        "start": 34,
        "name": "Bar",
        "type": "Identifier",
        "end": 37
      },
      "superClass": null,
      "body": {
        "start": 38,
        "body": [],
        "type": "ClassBody",
        "end": 40
      },
      "type": "ClassExpression",
      "end": 40
    },
    "body": {
      "start": 41,
      "body": [],
      "type": "ClassBody",
      "end": 43
    },
    "type": "ClassDeclaration",
    "end": 43
  }],
  "sourceType": "script",
  "type": "Program",
  "end": 43
}, {
  features: { "es7.decorators": true }
});

testFail("@foo function bar() {}", "Leading decorators must be attached to a class declaration (1:5)", {
  features: { "es7.decorators": true }
})

testFail("class Foo { @foo }", "You have trailing decorators with no method (1:18)", {
  features: { "es7.decorators": true }
})

// ES7 class property initializers - https://gist.github.com/jeffmo/054df782c05639da2adb

test('class Foo { foo = "bar"; }', {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 12,
            "computed": false,
            "key": {
              "start": 12,
              "name": "foo",
              "type": "Identifier",
              "end": 15
            },
            "static": false,
            "value": {
              "start": 18,
              "value": "bar",
              "raw": "\"bar\"",
              "type": "Literal",
              "end": 23
            },
            "type": "ClassProperty",
            "end": 24
          }
        ],
        "type": "ClassBody",
        "end": 26
      },
      "type": "ClassDeclaration",
      "end": 26
    }
  ],
  "type": "Program",
  "end": 26
}, {
  features: { "es7.classProperties": true }
});

test('class Foo { foo; }', {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 12,
            "computed": false,
            "key": {
              "start": 12,
              "name": "foo",
              "type": "Identifier",
              "end": 15
            },
            "static": false,
            "value": null,
            "type": "ClassProperty",
            "end": 16
          }
        ],
        "type": "ClassBody",
        "end": 18
      },
      "type": "ClassDeclaration",
      "end": 18
    }
  ],
  "type": "Program",
  "end": 18
}, {
  features: { "es7.classProperties": true }
});

test('class Foo { static foo; }', {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 12,
            "computed": false,
            "key": {
              "start": 19,
              "name": "foo",
              "type": "Identifier",
              "end": 22
            },
            "static": true,
            "value": null,
            "type": "ClassProperty",
            "end": 23
          }
        ],
        "type": "ClassBody",
        "end": 25
      },
      "type": "ClassDeclaration",
      "end": 25
    }
  ],
  "type": "Program",
  "end": 25
}, {
  features: { "es7.classProperties": true }
});

test('class Foo { static foo = "bar"; }', {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 12,
            "computed": false,
            "key": {
              "start": 19,
              "name": "foo",
              "type": "Identifier",
              "end": 22
            },
            "static": true,
            "value": {
              "start": 25,
              "value": "bar",
              "raw": "\"bar\"",
              "type": "Literal",
              "end": 30
            },
            "type": "ClassProperty",
            "end": 31
          }
        ],
        "type": "ClassBody",
        "end": 33
      },
      "type": "ClassDeclaration",
      "end": 33
    }
  ],
  "type": "Program",
  "end": 33
}, {
  features: { "es7.classProperties": true }
});

test('class Foo { @bar foo = "bar"; }', {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 17,
            "decorators": [
              {
                "start": 12,
                "expression": {
                  "start": 13,
                  "name": "bar",
                  "type": "Identifier",
                  "end": 16
                },
                "type": "Decorator",
                "end": 16
              }
            ],
            "computed": false,
            "key": {
              "start": 17,
              "name": "foo",
              "type": "Identifier",
              "end": 20
            },
            "static": false,
            "value": {
              "start": 23,
              "value": "bar",
              "raw": "\"bar\"",
              "type": "Literal",
              "end": 28
            },
            "type": "ClassProperty",
            "end": 29
          }
        ],
        "type": "ClassBody",
        "end": 31
      },
      "type": "ClassDeclaration",
      "end": 31
    }
  ],
  "type": "Program",
  "end": 31
}, {
  features: { "es7.classProperties": true, "es7.decorators": true }
});

test('class Foo { @bar static foo = "bar"; }', {
  "start": 0,
  "body": [
    {
      "start": 0,
      "id": {
        "start": 6,
        "name": "Foo",
        "type": "Identifier",
        "end": 9
      },
      "superClass": null,
      "body": {
        "start": 10,
        "body": [
          {
            "start": 17,
            "decorators": [
              {
                "start": 12,
                "expression": {
                  "start": 13,
                  "name": "bar",
                  "type": "Identifier",
                  "end": 16
                },
                "type": "Decorator",
                "end": 16
              }
            ],
            "computed": false,
            "key": {
              "start": 24,
              "name": "foo",
              "type": "Identifier",
              "end": 27
            },
            "static": true,
            "value": {
              "start": 30,
              "value": "bar",
              "raw": "\"bar\"",
              "type": "Literal",
              "end": 35
            },
            "type": "ClassProperty",
            "end": 36
          }
        ],
        "type": "ClassBody",
        "end": 38
      },
      "type": "ClassDeclaration",
      "end": 38
    }
  ],
  "type": "Program",
  "end": 38
}, {
  features: { "es7.classProperties": true, "es7.decorators": true }
});

test("var obj = { @foo bar: 'wow' };", {
  "start": 0,
  "body": [{
    "start": 0,
    "declarations": [{
      "start": 4,
      "id": {
        "start": 4,
        "name": "obj",
        "type": "Identifier",
        "end": 7
      },
      "init": {
        "start": 10,
        "properties": [{
          "start": 17,
          "key": {
            "start": 17,
            "name": "bar",
            "type": "Identifier",
            "end": 20
          },
          "value": {
            "start": 22,
            "value": "wow",
            "raw": "'wow'",
            "type": "Literal",
            "end": 27
          },
          "kind": "init",
          "decorators": [{
            "start": 12,
            "expression": {
              "start": 13,
              "name": "foo",
              "type": "Identifier",
              "end": 16
            },
            "type": "Decorator",
            "end": 16
          }],
          "type": "Property",
          "end": 27
        }],
        "type": "ObjectExpression",
        "end": 29
      },
      "type": "VariableDeclarator",
      "end": 29
    }],
    "kind": "var",
    "type": "VariableDeclaration",
    "end": 30
  }],
  "type": "Program",
  "end": 30
}, {
  features: { "es7.decorators": true }
});

// ES7 export extensions - https://github.com/leebyron/ecmascript-more-export-from

test('export foo, { bar } from "bar";', {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    start: 0,
    end: 31,
    specifiers: [{
      type: "ExportDefaultSpecifier",
      exported: {
        type: "Identifier",
        name: "foo",
        start: 7,
        end: 10,
      }
    }, {
      type: "ExportSpecifier",
      exported: {
        type: "Identifier",
        name: "bar"
      }
    }],
    source: {
      type: "Literal",
      value: "bar",
      start: 25,
      end: 30
    }
  }]
}, {
  sourceType: "module",
  features: { "es7.exportExtensions": true }
});

test('export * as foo, { bar } from "bar";', {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    start: 0,
    end: 36,
    specifiers: [{
      type: "ExportNamespaceSpecifier",
      exported: {
        type: "Identifier",
        name: "foo",
        start: 12,
        end: 15,
      }
    }, {
      type: "ExportSpecifier",
      exported: {
        type: "Identifier",
        name: "bar"
      }
    }],
    source: {
      type: "Literal",
      value: "bar",
      start: 30,
      end: 35
    }
  }]
}, {
  sourceType: "module",
  features: { "es7.exportExtensions": true }
});

test('export foo from "bar";', {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    start: 0,
    end: 22,
    specifiers: [{
      type: "ExportDefaultSpecifier",
      exported: {
        type: "Identifier",
        name: "foo",
        start: 7,
        end: 10,
      }
    }],
    source: {
      type: "Literal",
      value: "bar",
      start: 16,
      end: 21
    }
  }]
}, {
  sourceType: "module",
  features: { "es7.exportExtensions": true }
});

test('export default from "bar";', {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    start: 0,
    end: 26,
    specifiers: [{
      type: "ExportDefaultSpecifier",
      exported: {
        type: "Identifier",
        name: "default",
        start: 7,
        end: 14,
      }
    }],
    source: {
      type: "Literal",
      value: "bar",
      start: 20,
      end: 25
    }
  }]
}, {
  sourceType: "module",
  features: { "es7.exportExtensions": true }
});

test('export * as foo from "bar";', {
  type: "Program",
  body: [{
    type: "ExportNamedDeclaration",
    start: 0,
    end: 27,
    specifiers: [{
      type: "ExportNamespaceSpecifier",
      exported: {
        type: "Identifier",
        name: "foo",
        start: 12,
        end: 15,
      }
    }],
    source: {
      type: "Literal",
      value: "bar",
      start: 21,
      end: 26
    }
  }]
}, {
  sourceType: "module",
  features: { "es7.exportExtensions": true }
});

// ES7: Trailing Function Commas

test("log(n, '=', 2,);", {
  type: "Program",
  start: 0,
  end: 16,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 16,
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "log",
        start: 0,
        end: 3
      },
      arguments: [{
        type: "Identifier",
        name: "n",
        start: 4,
        end: 5
      }, {
        type: "Literal",
        value: "=",
        raw: "'='",
        start: 7,
        end: 10
      }, {
        type: "Literal",
        raw: "2",
        value: 2,
        start: 12,
        end: 13
      }]
    }
  }]
}, {
  features: { "es7.trailingFunctionCommas": true }
});

test("function log(n, op, val,) { }", {
  type: "Program",
  start: 0,
  end: 29,
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "log",
      start: 9,
      end: 12
    },
    start: 0,
    end: 29,
    expression: false,
    params: [{
      type: "Identifier",
      name: "n",
      start: 13,
      end: 14
    }, {
      type: "Identifier",
      name: "op",
      start: 16,
      end: 18
    }, {
      type: "Identifier",
      name: "val",
      start: 20,
      end: 23
    }],
    body: {
      type: "BlockStatement",
      start: 26,
      end: 29,
      body: []
    }
  }]
}, {
  features: { "es7.trailingFunctionCommas": true }
});

test("class Foo { bar(a,) { } }", {
  type: "Program",
  start: 0,
  end: 25,
  body: [{
    type: "ClassDeclaration",
    start: 0,
    end: 25,
    id: {
      type: "Identifier",
      name: "Foo",
      start: 6,
      end: 9
    },
    superClass: null,
    body: {
      type: "ClassBody",
      start: 10,
      end: 25,
      body: [{
        type: "MethodDefinition",
        start: 12,
        end: 23,
        static: false,
        key: {
          type: "Identifier",
          start: 12,
          end: 15,
          name: "bar"
        },
        kind: "method",
        value: {
          type: "FunctionExpression",
          start: 15,
          end: 23,
          id: null,
          params: [{
            type: "Identifier",
            name: "a",
            start: 16,
            end: 17
          }],
          generator: false,
          body: {
            type: "BlockStatement",
            start: 20,
            end: 23,
            body: []
          },
          expression: false
        }
      }]
    }
  }]
}, {
  features: { "es7.trailingFunctionCommas": true }
});

test("(x, y, ) => 1;", {
  start: 0,
  body: [{
    start: 0,
    expression: {
      start: 0,
      id: null,
      generator: false,
      expression: true,
      params: [
        {
          start: 1,
          name: "x",
          type: "Identifier",
          end: 2
        },
        {
          start: 4,
          name: "y",
          type: "Identifier",
          end: 5
        }
      ],
      body: {
        start: 12,
        value: 1,
        raw: "1",
        type: "Literal",
        end: 13
      },
      type: "ArrowFunctionExpression",
      end: 13
    },
    type: "ExpressionStatement",
    end: 14
  }],
  type: "Program",
  end: 14
}, {
  features: { "es7.trailingFunctionCommas": true }
});

testFail("log(,);", "Unexpected token (1:4)", {
  features: { "es7.trailingFunctionCommas": true }
});

testFail("function log(,) { }", "Unexpected token (1:13)", {
  features: { "es7.trailingFunctionCommas": true }
});

testFail("('foo',)", "Unexpected token (1:7)", {
  features: { "es7.trailingFunctionCommas": true }
});
