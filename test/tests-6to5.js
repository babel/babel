if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
  var testAssert = require("./driver.js").testAssert;
}

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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
      defaults: [],
      rest: null,
      generator: false,
      async: false,
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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
  ecmaVersion: 7
});

// ES7: Async Functions

testFail("function foo(promise) { await promise; }", "Unexpected token (1:30)", {ecmaVersion: 7});

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
    defaults: [],
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
    rest: null,
    generator: false,
    expression: false,
    async: true,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 46}
    }
  }]
}, {
  ecmaVersion: 7,
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
      defaults: [],
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
            defaults: [],
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
            rest: null,
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
      rest: null,
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
  ecmaVersion: 7,
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
          defaults: [],
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
          rest: null,
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
  ecmaVersion: 7,
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
                defaults: [],
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
                rest: null,
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
  ecmaVersion: 7,
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
            defaults: [],
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
            rest: null,
            generator: false,
            expression: false,
            async: true,
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 48}
            }
          },
          kind: "",
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
  ecmaVersion: 7,
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
          defaults: [],
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
          rest: null,
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
  ecmaVersion: 7,
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
          defaults: [],
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
          rest: null,
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
  ecmaVersion: 7,
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
          defaults: [],
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
          rest: null,
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
  ecmaVersion: 7,
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
  ecmaVersion: 7,
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
  ecmaVersion: 7,
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
      "defaults": [],
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
      "rest": null,
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
  ecmaVersion: 7,
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
        kind: "",
        value: {
          type: "FunctionExpression",
          start: 18,
          end: 23,
          id: null,
          params: [],
          defaults: [],
          rest: null,
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
  ecmaVersion: 7
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
  ecmaVersion: 7
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
            defaults: [],
            rest: null,
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
  ecmaVersion: 7
});

test('export async function foo(){}', {
  "type": "Program",
  "start": 0,
  "end": 29,
  "body": [{
    "type": "ExportDeclaration",
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
      "defaults": [],
      "rest": null,
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
    "default": false,
    "specifiers": null,
    "source": null
  }]
}, {
  ecmaVersion: 7
});

// ES7: Abstract references

test('foo::bar;', {
  type: "Program",
  start: 0,
  end: 9,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 9,
    expression: {
      type: "VirtualPropertyExpression",
      start: 0,
      end: 8,
      object: {
        type: "Identifier",
        start: 0,
        end: 3,
        name: "foo"
      },
      property: {
        type: "Identifier",
        start: 5,
        end: 8,
        name: "bar"
      }
    }
  }]
}, {
  ecmaVersion: 7
});

test('foo::bar::baz;', {
  type: "Program",
  start: 0,
  end: 14,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 14,
    expression: {
      type: "VirtualPropertyExpression",
      start: 0,
      end: 13,
      object: {
        type: "VirtualPropertyExpression",
        start: 0,
        end: 8,
        object: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        property: {
          type: "Identifier",
          start: 5,
          end: 8,
          name: "bar"
        }
      },
      property: {
        type: "Identifier",
        start: 10,
        end: 13,
        name: "baz"
      }
    }
  }]
}, {
  ecmaVersion: 7
});

test('foo::baz();', {
  type: "Program",
  start: 0,
  end: 11,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 11,
    expression: {
      type: "CallExpression",
      start: 0,
      end: 10,
      callee: {
        type: "VirtualPropertyExpression",
        start: 0,
        end: 8,
        object: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        property: {
          type: "Identifier",
          start: 5,
          end: 8,
          name: "baz"
        }
      },
      arguments: []
    }
  }]
}, {
  ecmaVersion: 7
});

test('foo::bar = "baz";', {
  type: "Program",
  start: 0,
  end: 17,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 17,
    expression: {
      type: "AssignmentExpression",
      start: 0,
      end: 16,
      operator: "=",
      left: {
        type: "VirtualPropertyExpression",
        start: 0,
        end: 8,
        object: {
          type: "Identifier",
          start: 0,
          end: 3,
          name: "foo"
        },
        property: {
          type: "Identifier",
          start: 5,
          end: 8,
          name: "bar"
        }
      },
      right: {
        type: "Literal",
        start: 11,
        end: 16,
        value: "baz"
      }
    }
  }]
}, {
  ecmaVersion: 7
});

test('delete foo::bar;', {
  type: "Program",
  start: 0,
  end: 16,
  body: [{
    type: "ExpressionStatement",
    start: 0,
    end: 16,
    expression: {
      type: "UnaryExpression",
      start: 0,
      end: 15,
      operator: "delete",
      prefix: true,
      argument: {
        type: "VirtualPropertyExpression",
        start: 7,
        end: 15,
        object: {
          type: "Identifier",
          start: 7,
          end: 10,
          name: "foo"
        },
        property: {
          type: "Identifier",
          start: 12,
          end: 15,
          name: "bar"
        }
      }
    }
  }]
}, {
  ecmaVersion: 7
});

test("private A;", {
  type: "Program",
  start: 0,
  end: 10,
  body: [{
    type: "PrivateDeclaration",
    start: 0,
    end: 10,
    declarations: [{
      type: "Identifier",
      start: 8,
      end: 9,
      name: "A"
    }]
  }]
}, {
  ecmaVersion: 7
});

test("private A, B;", {
  type: "Program",
  start: 0,
  end: 13,
  body: [{
    type: "PrivateDeclaration",
    start: 0,
    end: 13,
    declarations: [
      {
        type: "Identifier",
        start: 8,
        end: 9,
        name: "A"
      },
      {
        type: "Identifier",
        start: 11,
        end: 12,
        name: "B"
      }
    ]
  }]
}, {
  ecmaVersion: 7
});

test("class A { private A; }", {
  type: "Program",
  start: 0,
  end: 22,
  body: [{
    type: "ClassDeclaration",
    start: 0,
    end: 22,
    id: {
      type: "Identifier",
      start: 6,
      end: 7,
      name: "A"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      start: 8,
      end: 22,
      body: [{
        type: "PrivateDeclaration",
        start: 10,
        end: 20,
        declarations: [
          {
            type: "Identifier",
            start: 18,
            end: 19,
            name: "A"
          }
        ]
      }]
    }
  }]
}, {
  ecmaVersion: 7
});

test("class A { private A, B; }", {
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
      end: 7,
      name: "A"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      start: 8,
      end: 25,
      body: [{
        type: "PrivateDeclaration",
        start: 10,
        end: 23,
        declarations: [
          {
            type: "Identifier",
            start: 18,
            end: 19,
            name: "A"
          },
          {
            type: "Identifier",
            start: 21,
            end: 22,
            name: "B"
          }
        ]
      }]
    }
  }]
}, {
  ecmaVersion: 7
});
