// Tests largely based on those of Esprima
// (http://esprima.org/test/)

if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
}

test("this\n", {
  type: "Program",
  start: {
    line: 1,
    column: 0
  },
  body: [
    {
      type: "ExpressionStatement",
      start: {
        line: 1,
        column: 0
      },
      expression: {
        type: "ThisExpression",
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 4}
    }
  ],
  end: {line: 1, column: 4}
});

test("null\n", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: null,
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 4}
    }
  ],
  end: {line: 1, column: 4}
});

test("\n    42\n\n", {
  type: "Program",
  start: {line: 2, column: 4},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 2, column: 4},
      expression: {
        type: "Literal",
        start: {line: 2, column: 4},
        value: 42,
        end: {line: 2, column: 6}
      },
      end: {line: 2, column: 6}
    }
  ],
  end: {line: 2, column: 6}
});

test("(1 + 2 ) * 3", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 1},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 1},
          left: {
            type: "Literal",
            start: {line: 1, column: 1},
            value: 1,
            end: {line: 1, column: 2}
          },
          operator: "+",
          right: {
            type: "Literal",
            start: {line: 1, column: 5},
            value: 2,
            end: {line: 1, column: 6}
          },
          end: {line: 1, column: 6}
        },
        operator: "*",
        right: {
          type: "Literal",
          start: {line: 1, column: 11},
          value: 3,
          end: {line: 1, column: 12}
        },
        end: {line: 1, column: 12}
      },
      end: {line: 1, column: 12}
    }
  ],
  end: {line: 1, column: 12}
});

test("x = []", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 4},
          elements: [],
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x = [ ]", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 4},
          elements: [],
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x = [ 42 ]", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 4},
          elements: [
            {
              type: "Literal",
              start: {line: 1, column: 6},
              value: 42,
              end: {line: 1, column: 8}
            }
          ],
          end: {line: 1, column: 10}
        },
        end: {line: 1, column: 10}
      },
      end: {line: 1, column: 10}
    }
  ],
  end: {line: 1, column: 10}
});

test("x = [ 42, ]", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 4},
          elements: [
            {
              type: "Literal",
              start: {line: 1, column: 6},
              value: 42,
              end: {line: 1, column: 8}
            }
          ],
          end: {line: 1, column: 11}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("x = [ ,, 42 ]", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 4},
          elements: [
            null,
            null,
            {
              type: "Literal",
              start: {line: 1, column: 9},
              value: 42,
              end: {line: 1, column: 11}
            }
          ],
          end: {line: 1, column: 13}
        },
        end: {line: 1, column: 13}
      },
      end: {line: 1, column: 13}
    }
  ],
  end: {line: 1, column: 13}
});

test("x = [ 1, 2, 3, ]", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 4},
          elements: [
            {
              type: "Literal",
              start: {line: 1, column: 6},
              value: 1,
              end: {line: 1, column: 7}
            },
            {
              type: "Literal",
              start: {line: 1, column: 9},
              value: 2,
              end: {line: 1, column: 10}
            },
            {
              type: "Literal",
              start: {line: 1, column: 12},
              value: 3,
              end: {line: 1, column: 13}
            }
          ],
          end: {line: 1, column: 16}
        },
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("x = [ 1, 2,, 3, ]", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 4},
          elements: [
            {
              type: "Literal",
              start: {line: 1, column: 6},
              value: 1,
              end: {line: 1, column: 7}
            },
            {
              type: "Literal",
              start: {line: 1, column: 9},
              value: 2,
              end: {line: 1, column: 10}
            },
            null,
            {
              type: "Literal",
              start: {line: 1, column: 13},
              value: 3,
              end: {line: 1, column: 14}
            }
          ],
          end: {line: 1, column: 17}
        },
        end: {line: 1, column: 17}
      },
      end: {line: 1, column: 17}
    }
  ],
  end: {line: 1, column: 17}
});

test("日本語 = []", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "日本語",
          end: {line: 1, column: 3}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 6},
          elements: [],
          end: {line: 1, column: 8}
        },
        end: {line: 1, column: 8}
      },
      end: {line: 1, column: 8}
    }
  ],
  end: {line: 1, column: 8}
});

test("T‿ = []", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "T‿",
          end: {line: 1, column: 2}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 5},
          elements: [],
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("T‌ = []", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "T‌",
          end: {line: 1, column: 2}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 5},
          elements: [],
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("T‍ = []", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "T‍",
          end: {line: 1, column: 2}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 5},
          elements: [],
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("ⅣⅡ = []", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "ⅣⅡ",
          end: {line: 1, column: 2}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 5},
          elements: [],
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("ⅣⅡ = []", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "ⅣⅡ",
          end: {line: 1, column: 2}
        },
        right: {
          type: "ArrayExpression",
          start: {line: 1, column: 5},
          elements: [],
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x = {}", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [],
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x = { }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [],
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x = { answer: 42 }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "answer",
                end: {line: 1, column: 12}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 14},
                value: 42,
                end: {line: 1, column: 16}
              },
              kind: "init"
            }
          ],
          end: {line: 1, column: 18}
        },
        end: {line: 1, column: 18}
      },
      end: {line: 1, column: 18}
    }
  ],
  end: {line: 1, column: 18}
});

test("x = { if: 42 }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "if",
                end: {line: 1, column: 8}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 10},
                value: 42,
                end: {line: 1, column: 12}
              },
              kind: "init"
            }
          ],
          end: {line: 1, column: 14}
        },
        end: {line: 1, column: 14}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("x = { true: 42 }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "true",
                end: {line: 1, column: 10}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 12},
                value: 42,
                end: {line: 1, column: 14}
              },
              kind: "init"
            }
          ],
          end: {line: 1, column: 16}
        },
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("x = { false: 42 }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "false",
                end: {line: 1, column: 11}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 13},
                value: 42,
                end: {line: 1, column: 15}
              },
              kind: "init"
            }
          ],
          end: {line: 1, column: 17}
        },
        end: {line: 1, column: 17}
      },
      end: {line: 1, column: 17}
    }
  ],
  end: {line: 1, column: 17}
});

test("x = { null: 42 }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "null",
                end: {line: 1, column: 10}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 12},
                value: 42,
                end: {line: 1, column: 14}
              },
              kind: "init"
            }
          ],
          end: {line: 1, column: 16}
        },
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("x = { \"answer\": 42 }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Literal",
                start: {line: 1, column: 6},
                value: "answer",
                end: {line: 1, column: 14}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 16},
                value: 42,
                end: {line: 1, column: 18}
              },
              kind: "init"
            }
          ],
          end: {line: 1, column: 20}
        },
        end: {line: 1, column: 20}
      },
      end: {line: 1, column: 20}
    }
  ],
  end: {line: 1, column: 20}
});

test("x = { x: 1, x: 2 }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "x",
                end: {line: 1, column: 7}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 9},
                value: 1,
                end: {line: 1, column: 10}
              },
              kind: "init"
            },
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 12},
                name: "x",
                end: {line: 1, column: 13}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 15},
                value: 2,
                end: {line: 1, column: 16}
              },
              kind: "init"
            }
          ],
          end: {line: 1, column: 18}
        },
        end: {line: 1, column: 18}
      },
      end: {line: 1, column: 18}
    }
  ],
  end: {line: 1, column: 18}
});

test("x = { get width() { return m_width } }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "width",
                end: {line: 1, column: 15}
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 15},
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 18},
                  body: [
                    {
                      type: "ReturnStatement",
                      start: {line: 1, column: 20},
                      argument: {
                        type: "Identifier",
                        start: {line: 1, column: 27},
                        name: "m_width",
                        end: {line: 1, column: 34}
                      },
                      end: {line: 1, column: 34}
                    }
                  ],
                  end: {line: 1, column: 36}
                },
                end: {line: 1, column: 36}
              }
            }
          ],
          end: {line: 1, column: 38}
        },
        end: {line: 1, column: 38}
      },
      end: {line: 1, column: 38}
    }
  ],
  end: {line: 1, column: 38}
});

test("x = { get undef() {} }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "undef",
                end: {line: 1, column: 15}
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 15},
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 18},
                  body: [],
                  end: {line: 1, column: 20}
                },
                end: {line: 1, column: 20}
              }
            }
          ],
          end: {line: 1, column: 22}
        },
        end: {line: 1, column: 22}
      },
      end: {line: 1, column: 22}
    }
  ],
  end: {line: 1, column: 22}
});

test("x = { get if() {} }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "if",
                end: {line: 1, column: 12}
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 12},
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 15},
                  body: [],
                  end: {line: 1, column: 17}
                },
                end: {line: 1, column: 17}
              }
            }
          ],
          end: {line: 1, column: 19}
        },
        end: {line: 1, column: 19}
      },
      end: {line: 1, column: 19}
    }
  ],
  end: {line: 1, column: 19}
});

test("x = { get true() {} }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "true",
                end: {line: 1, column: 14}
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 14},
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 17},
                  body: [],
                  end: {line: 1, column: 19}
                },
                end: {line: 1, column: 19}
              }
            }
          ],
          end: {line: 1, column: 21}
        },
        end: {line: 1, column: 21}
      },
      end: {line: 1, column: 21}
    }
  ],
  end: {line: 1, column: 21}
});

test("x = { get false() {} }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "false",
                end: {line: 1, column: 15}
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 15},
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 18},
                  body: [],
                  end: {line: 1, column: 20}
                },
                end: {line: 1, column: 20}
              }
            }
          ],
          end: {line: 1, column: 22}
        },
        end: {line: 1, column: 22}
      },
      end: {line: 1, column: 22}
    }
  ],
  end: {line: 1, column: 22}
});

test("x = { get null() {} }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "null",
                end: {line: 1, column: 14}
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 14},
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 17},
                  body: [],
                  end: {line: 1, column: 19}
                },
                end: {line: 1, column: 19}
              }
            }
          ],
          end: {line: 1, column: 21}
        },
        end: {line: 1, column: 21}
      },
      end: {line: 1, column: 21}
    }
  ],
  end: {line: 1, column: 21}
});

test("x = { get \"undef\"() {} }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Literal",
                start: {line: 1, column: 10},
                value: "undef",
                end: {line: 1, column: 17}
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 17},
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 20},
                  body: [],
                  end: {line: 1, column: 22}
                },
                end: {line: 1, column: 22}
              }
            }
          ],
          end: {line: 1, column: 24}
        },
        end: {line: 1, column: 24}
      },
      end: {line: 1, column: 24}
    }
  ],
  end: {line: 1, column: 24}
});

test("x = { get 10() {} }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Literal",
                start: {line: 1, column: 10},
                value: 10,
                end: {line: 1, column: 12}
              },
              kind: "get",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 12},
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 15},
                  body: [],
                  end: {line: 1, column: 17}
                },
                end: {line: 1, column: 17}
              }
            }
          ],
          end: {line: 1, column: 19}
        },
        end: {line: 1, column: 19}
      },
      end: {line: 1, column: 19}
    }
  ],
  end: {line: 1, column: 19}
});

test("x = { set width(w) { m_width = w } }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "width",
                end: {line: 1, column: 15}
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 15},
                id: null,
                params: [
                  {
                    type: "Identifier",
                    start: {line: 1, column: 16},
                    name: "w",
                    end: {line: 1, column: 17}
                  }
                ],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 19},
                  body: [
                    {
                      type: "ExpressionStatement",
                      start: {line: 1, column: 21},
                      expression: {
                        type: "AssignmentExpression",
                        start: {line: 1, column: 21},
                        operator: "=",
                        left: {
                          type: "Identifier",
                          start: {line: 1, column: 21},
                          name: "m_width",
                          end: {line: 1, column: 28}
                        },
                        right: {
                          type: "Identifier",
                          start: {line: 1, column: 31},
                          name: "w",
                          end: {line: 1, column: 32}
                        },
                        end: {line: 1, column: 32}
                      },
                      end: {line: 1, column: 32}
                    }
                  ],
                  end: {line: 1, column: 34}
                },
                end: {line: 1, column: 34}
              }
            }
          ],
          end: {line: 1, column: 36}
        },
        end: {line: 1, column: 36}
      },
      end: {line: 1, column: 36}
    }
  ],
  end: {line: 1, column: 36}
});

test("x = { set if(w) { m_if = w } }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "if",
                end: {line: 1, column: 12}
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 12},
                id: null,
                params: [
                  {
                    type: "Identifier",
                    start: {line: 1, column: 13},
                    name: "w",
                    end: {line: 1, column: 14}
                  }
                ],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 16},
                  body: [
                    {
                      type: "ExpressionStatement",
                      start: {line: 1, column: 18},
                      expression: {
                        type: "AssignmentExpression",
                        start: {line: 1, column: 18},
                        operator: "=",
                        left: {
                          type: "Identifier",
                          start: {line: 1, column: 18},
                          name: "m_if",
                          end: {line: 1, column: 22}
                        },
                        right: {
                          type: "Identifier",
                          start: {line: 1, column: 25},
                          name: "w",
                          end: {line: 1, column: 26}
                        },
                        end: {line: 1, column: 26}
                      },
                      end: {line: 1, column: 26}
                    }
                  ],
                  end: {line: 1, column: 28}
                },
                end: {line: 1, column: 28}
              }
            }
          ],
          end: {line: 1, column: 30}
        },
        end: {line: 1, column: 30}
      },
      end: {line: 1, column: 30}
    }
  ],
  end: {line: 1, column: 30}
});

test("x = { set true(w) { m_true = w } }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "true",
                end: {line: 1, column: 14}
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 14},
                id: null,
                params: [
                  {
                    type: "Identifier",
                    start: {line: 1, column: 15},
                    name: "w",
                    end: {line: 1, column: 16}
                  }
                ],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 18},
                  body: [
                    {
                      type: "ExpressionStatement",
                      start: {line: 1, column: 20},
                      expression: {
                        type: "AssignmentExpression",
                        start: {line: 1, column: 20},
                        operator: "=",
                        left: {
                          type: "Identifier",
                          start: {line: 1, column: 20},
                          name: "m_true",
                          end: {line: 1, column: 26}
                        },
                        right: {
                          type: "Identifier",
                          start: {line: 1, column: 29},
                          name: "w",
                          end: {line: 1, column: 30}
                        },
                        end: {line: 1, column: 30}
                      },
                      end: {line: 1, column: 30}
                    }
                  ],
                  end: {line: 1, column: 32}
                },
                end: {line: 1, column: 32}
              }
            }
          ],
          end: {line: 1, column: 34}
        },
        end: {line: 1, column: 34}
      },
      end: {line: 1, column: 34}
    }
  ],
  end: {line: 1, column: 34}
});

test("x = { set false(w) { m_false = w } }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "false",
                end: {line: 1, column: 15}
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 15},
                id: null,
                params: [
                  {
                    type: "Identifier",
                    start: {line: 1, column: 16},
                    name: "w",
                    end: {line: 1, column: 17}
                  }
                ],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 19},
                  body: [
                    {
                      type: "ExpressionStatement",
                      start: {line: 1, column: 21},
                      expression: {
                        type: "AssignmentExpression",
                        start: {line: 1, column: 21},
                        operator: "=",
                        left: {
                          type: "Identifier",
                          start: {line: 1, column: 21},
                          name: "m_false",
                          end: {line: 1, column: 28}
                        },
                        right: {
                          type: "Identifier",
                          start: {line: 1, column: 31},
                          name: "w",
                          end: {line: 1, column: 32}
                        },
                        end: {line: 1, column: 32}
                      },
                      end: {line: 1, column: 32}
                    }
                  ],
                  end: {line: 1, column: 34}
                },
                end: {line: 1, column: 34}
              }
            }
          ],
          end: {line: 1, column: 36}
        },
        end: {line: 1, column: 36}
      },
      end: {line: 1, column: 36}
    }
  ],
  end: {line: 1, column: 36}
});

test("x = { set null(w) { m_null = w } }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "null",
                end: {line: 1, column: 14}
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 14},
                id: null,
                params: [
                  {
                    type: "Identifier",
                    start: {line: 1, column: 15},
                    name: "w",
                    end: {line: 1, column: 16}
                  }
                ],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 18},
                  body: [
                    {
                      type: "ExpressionStatement",
                      start: {line: 1, column: 20},
                      expression: {
                        type: "AssignmentExpression",
                        start: {line: 1, column: 20},
                        operator: "=",
                        left: {
                          type: "Identifier",
                          start: {line: 1, column: 20},
                          name: "m_null",
                          end: {line: 1, column: 26}
                        },
                        right: {
                          type: "Identifier",
                          start: {line: 1, column: 29},
                          name: "w",
                          end: {line: 1, column: 30}
                        },
                        end: {line: 1, column: 30}
                      },
                      end: {line: 1, column: 30}
                    }
                  ],
                  end: {line: 1, column: 32}
                },
                end: {line: 1, column: 32}
              }
            }
          ],
          end: {line: 1, column: 34}
        },
        end: {line: 1, column: 34}
      },
      end: {line: 1, column: 34}
    }
  ],
  end: {line: 1, column: 34}
});

test("x = { set \"null\"(w) { m_null = w } }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Literal",
                start: {line: 1, column: 10},
                value: "null",
                end: {line: 1, column: 16}
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 16},
                id: null,
                params: [
                  {
                    type: "Identifier",
                    start: {line: 1, column: 17},
                    name: "w",
                    end: {line: 1, column: 18}
                  }
                ],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 20},
                  body: [
                    {
                      type: "ExpressionStatement",
                      start: {line: 1, column: 22},
                      expression: {
                        type: "AssignmentExpression",
                        start: {line: 1, column: 22},
                        operator: "=",
                        left: {
                          type: "Identifier",
                          start: {line: 1, column: 22},
                          name: "m_null",
                          end: {line: 1, column: 28}
                        },
                        right: {
                          type: "Identifier",
                          start: {line: 1, column: 31},
                          name: "w",
                          end: {line: 1, column: 32}
                        },
                        end: {line: 1, column: 32}
                      },
                      end: {line: 1, column: 32}
                    }
                  ],
                  end: {line: 1, column: 34}
                },
                end: {line: 1, column: 34}
              }
            }
          ],
          end: {line: 1, column: 36}
        },
        end: {line: 1, column: 36}
      },
      end: {line: 1, column: 36}
    }
  ],
  end: {line: 1, column: 36}
});

test("x = { set 10(w) { m_null = w } }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Literal",
                start: {line: 1, column: 10},
                value: 10,
                end: {line: 1, column: 12}
              },
              kind: "set",
              value: {
                type: "FunctionExpression",
                start: {line: 1, column: 12},
                id: null,
                params: [
                  {
                    type: "Identifier",
                    start: {line: 1, column: 13},
                    name: "w",
                    end: {line: 1, column: 14}
                  }
                ],
                body: {
                  type: "BlockStatement",
                  start: {line: 1, column: 16},
                  body: [
                    {
                      type: "ExpressionStatement",
                      start: {line: 1, column: 18},
                      expression: {
                        type: "AssignmentExpression",
                        start: {line: 1, column: 18},
                        operator: "=",
                        left: {
                          type: "Identifier",
                          start: {line: 1, column: 18},
                          name: "m_null",
                          end: {line: 1, column: 24}
                        },
                        right: {
                          type: "Identifier",
                          start: {line: 1, column: 27},
                          name: "w",
                          end: {line: 1, column: 28}
                        },
                        end: {line: 1, column: 28}
                      },
                      end: {line: 1, column: 28}
                    }
                  ],
                  end: {line: 1, column: 30}
                },
                end: {line: 1, column: 30}
              }
            }
          ],
          end: {line: 1, column: 32}
        },
        end: {line: 1, column: 32}
      },
      end: {line: 1, column: 32}
    }
  ],
  end: {line: 1, column: 32}
});

test("x = { get: 42 }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "get",
                end: {line: 1, column: 9}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 11},
                value: 42,
                end: {line: 1, column: 13}
              },
              kind: "init"
            }
          ],
          end: {line: 1, column: 15}
        },
        end: {line: 1, column: 15}
      },
      end: {line: 1, column: 15}
    }
  ],
  end: {line: 1, column: 15}
});

test("x = { set: 43 }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "ObjectExpression",
          start: {line: 1, column: 4},
          properties: [
            {
              key: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "set",
                end: {line: 1, column: 9}
              },
              value: {
                type: "Literal",
                start: {line: 1, column: 11},
                value: 43,
                end: {line: 1, column: 13}
              },
              kind: "init"
            }
          ],
          end: {line: 1, column: 15}
        },
        end: {line: 1, column: 15}
      },
      end: {line: 1, column: 15}
    }
  ],
  end: {line: 1, column: 15}
});

test("/* block comment */ 42", {
  type: "Program",
  start: {line: 1, column: 20},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 20},
      expression: {
        type: "Literal",
        start: {line: 1, column: 20},
        value: 42,
        end: {line: 1, column: 22}
      },
      end: {line: 1, column: 22}
    }
  ],
  end: {line: 1, column: 22}
});

test("42 /*The*/ /*Answer*/", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 42,
        end: {line: 1, column: 2}
      },
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test("42 /*the*/ /*answer*/", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 42,
        end: {line: 1, column: 2}
      },
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test("/* multiline\ncomment\nshould\nbe\nignored */ 42", {
  type: "Program",
  start: {line: 5, column: 11},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 5, column: 11},
      expression: {
        type: "Literal",
        start: {line: 5, column: 11},
        value: 42,
        end: {line: 5, column: 13}
      },
      end: {line: 5, column: 13}
    }
  ],
  end: {line: 5, column: 13}
});

test("/*a\r\nb*/ 42", {
  type: "Program",
  start: {line: 2, column: 4},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 2, column: 4},
      expression: {
        type: "Literal",
        start: {line: 2, column: 4},
        value: 42,
        end: {line: 2, column: 6}
      },
      end: {line: 2, column: 6}
    }
  ],
  end: {line: 2, column: 6}
});

test("/*a\rb*/ 42", {
  type: "Program",
  start: {line: 2, column: 4},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 2, column: 4},
      expression: {
        type: "Literal",
        start: {line: 2, column: 4},
        value: 42,
        end: {line: 2, column: 6}
      },
      end: {line: 2, column: 6}
    }
  ],
  end: {line: 2, column: 6}
});

test("/*a\nb*/ 42", {
  type: "Program",
  start: {line: 2, column: 4},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 2, column: 4},
      expression: {
        type: "Literal",
        start: {line: 2, column: 4},
        value: 42,
        end: {line: 2, column: 6}
      },
      end: {line: 2, column: 6}
    }
  ],
  end: {line: 2, column: 6}
});

test("/*a\nc*/ 42", {
  type: "Program",
  start: {line: 2, column: 4},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 2, column: 4},
      expression: {
        type: "Literal",
        start: {line: 2, column: 4},
        value: 42,
        end: {line: 2, column: 6}
      },
      end: {line: 2, column: 6}
    }
  ],
  end: {line: 2, column: 6}
});

test("// line comment\n42", {
  type: "Program",
  start: {line: 2, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 2, column: 0},
      expression: {
        type: "Literal",
        start: {line: 2, column: 0},
        value: 42,
        end: {line: 2, column: 2}
      },
      end: {line: 2, column: 2}
    }
  ],
  end: {line: 2, column: 2}
});

test("42 // line comment", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 42,
        end: {line: 1, column: 2}
      },
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test("// Hello, world!\n42", {
  type: "Program",
  start: {line: 2, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 2, column: 0},
      expression: {
        type: "Literal",
        start: {line: 2, column: 0},
        value: 42,
        end: {line: 2, column: 2}
      },
      end: {line: 2, column: 2}
    }
  ],
  end: {line: 2, column: 2}
});

test("// Hello, world!\n", {
  type: "Program",
  start: {line: 2, column: 0},
  body: [],
  end: {line: 2, column: 0}
});

test("// Hallo, world!\n", {
  type: "Program",
  start: {line: 2, column: 0},
  body: [],
  end: {line: 2, column: 0}
});

test("//\n42", {
  type: "Program",
  start: {line: 2, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 2, column: 0},
      expression: {
        type: "Literal",
        start: {line: 2, column: 0},
        value: 42,
        end: {line: 2, column: 2}
      },
      end: {line: 2, column: 2}
    }
  ],
  end: {line: 2, column: 2}
});

test("//", {
  type: "Program",
  start: {line: 1, column: 2},
  body: [],
  end: {line: 1, column: 2}
});

test("// ", {
  type: "Program",
  start: {line: 1, column: 3},
  body: [],
  end: {line: 1, column: 3}
});

test("/**/42", {
  type: "Program",
  start: {line: 1, column: 4},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 4},
      expression: {
        type: "Literal",
        start: {line: 1, column: 4},
        value: 42,
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("// Hello, world!\n\n//   Another hello\n42", {
  type: "Program",
  start: {line: 4, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 4, column: 0},
      expression: {
        type: "Literal",
        start: {line: 4, column: 0},
        value: 42,
        end: {line: 4, column: 2}
      },
      end: {line: 4, column: 2}
    }
  ],
  end: {line: 4, column: 2}
});

test("if (x) { // Some comment\ndoThat(); }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "IfStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Identifier",
        start: {line: 1, column: 4},
        name: "x",
        end: {line: 1, column: 5}
      },
      consequent: {
        type: "BlockStatement",
        start: {line: 1, column: 7},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 2, column: 0},
            expression: {
              type: "CallExpression",
              start: {line: 2, column: 0},
              callee: {
                type: "Identifier",
                start: {line: 2, column: 0},
                name: "doThat",
                end: {line: 2, column: 6}
              },
              arguments: [],
              end: {line: 2, column: 8}
            },
            end: {line: 2, column: 9}
          }
        ],
        end: {line: 2, column: 11}
      },
      alternate: null,
      end: {line: 2, column: 11}
    }
  ],
  end: {line: 2, column: 11}
});

test("switch (answer) { case 42: /* perfect */ bingo() }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "SwitchStatement",
      start: {line: 1, column: 0},
      discriminant: {
        type: "Identifier",
        start: {line: 1, column: 8},
        name: "answer",
        end: {line: 1, column: 14}
      },
      cases: [
        {
          type: "SwitchCase",
          start: {line: 1, column: 18},
          consequent: [
            {
              type: "ExpressionStatement",
              start: {line: 1, column: 41},
              expression: {
                type: "CallExpression",
                start: {line: 1, column: 41},
                callee: {
                  type: "Identifier",
                  start: {line: 1, column: 41},
                  name: "bingo",
                  end: {line: 1, column: 46}
                },
                arguments: [],
                end: {line: 1, column: 48}
              },
              end: {line: 1, column: 48}
            }
          ],
          test: {
            type: "Literal",
            start: {line: 1, column: 23},
            value: 42,
            end: {line: 1, column: 25}
          },
          end: {line: 1, column: 50}
        }
      ],
      end: {line: 1, column: 50}
    }
  ],
  end: {line: 1, column: 50}
});

test("0", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 0,
        end: {line: 1, column: 1}
      },
      end: {line: 1, column: 1}
    }
  ],
  end: {line: 1, column: 1}
});

test("3", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 3,
        end: {line: 1, column: 1}
      },
      end: {line: 1, column: 1}
    }
  ],
  end: {line: 1, column: 1}
});

test("5", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 5,
        end: {line: 1, column: 1}
      },
      end: {line: 1, column: 1}
    }
  ],
  end: {line: 1, column: 1}
});

test("42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 42,
        end: {line: 1, column: 2}
      },
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test(".14", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 0.14,
        end: {line: 1, column: 3}
      },
      end: {line: 1, column: 3}
    }
  ],
  end: {line: 1, column: 3}
});

test("3.14159", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 3.14159,
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("6.02214179e+23", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 6.02214179e+23,
        end: {line: 1, column: 14}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("1.492417830e-10", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 1.49241783e-10,
        end: {line: 1, column: 15}
      },
      end: {line: 1, column: 15}
    }
  ],
  end: {line: 1, column: 15}
});

test("0x0", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 0,
        end: {line: 1, column: 3}
      },
      end: {line: 1, column: 3}
    }
  ],
  end: {line: 1, column: 3}
});

test("0e+100", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 0,
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("0xabc", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 2748,
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("0xdef", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 3567,
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("0X1A", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 26,
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 4}
    }
  ],
  end: {line: 1, column: 4}
});

test("0x10", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 16,
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 4}
    }
  ],
  end: {line: 1, column: 4}
});

test("0x100", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 256,
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("0X04", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 4,
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 4}
    }
  ],
  end: {line: 1, column: 4}
});

test("02", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 2,
        end: {line: 1, column: 2}
      },
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test("012", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 10,
        end: {line: 1, column: 3}
      },
      end: {line: 1, column: 3}
    }
  ],
  end: {line: 1, column: 3}
});

test("0012", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: 10,
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 4}
    }
  ],
  end: {line: 1, column: 4}
});

test("\"Hello\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello",
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("\"\\n\\r\\t\\v\\b\\f\\\\\\'\\\"\\0\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "\n\r\t\u000b\b\f\\'\"\u0000",
        end: {line: 1, column: 22}
      },
      end: {line: 1, column: 22}
    }
  ],
  end: {line: 1, column: 22}
});

test("\"\\u0061\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "a",
        end: {line: 1, column: 8}
      },
      end: {line: 1, column: 8}
    }
  ],
  end: {line: 1, column: 8}
});

test("\"\\x61\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "a",
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("\"Hello\\nworld\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello\nworld",
        end: {line: 1, column: 14}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("\"Hello\\\nworld\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Helloworld",
        end: {line: 2, column: 6}
      },
      end: {line: 2, column: 6}
    }
  ],
  end: {line: 2, column: 6}
});

test("\"Hello\\02World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello\u0002World",
        end: {line: 1, column: 15}
      },
      end: {line: 1, column: 15}
    }
  ],
  end: {line: 1, column: 15}
});

test("\"Hello\\012World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello\nWorld",
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("\"Hello\\122World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "HelloRWorld",
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("\"Hello\\0122World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello\n2World",
        end: {line: 1, column: 17}
      },
      end: {line: 1, column: 17}
    }
  ],
  end: {line: 1, column: 17}
});

test("\"Hello\\312World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "HelloÊWorld",
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("\"Hello\\412World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello!2World",
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("\"Hello\\812World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello812World",
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("\"Hello\\712World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello92World",
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("\"Hello\\0World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello\u0000World",
        end: {line: 1, column: 14}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("\"Hello\\\r\nworld\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Helloworld",
        end: {line: 2, column: 6}
      },
      end: {line: 2, column: 6}
    }
  ],
  end: {line: 2, column: 6}
});

test("\"Hello\\1World\"", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Literal",
        start: {line: 1, column: 0},
        value: "Hello\u0001World",
        end: {line: 1, column: 14}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("var x = /[a-z]/i", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 8},
            value: {},
            end: {line: 1, column: 16}
          },
          end: {line: 1, column: 16}
        }
      ],
      kind: "var",
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("var x = /[x-z]/i", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 8},
            value: {},
            end: {line: 1, column: 16}
          },
          end: {line: 1, column: 16}
        }
      ],
      kind: "var",
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("var x = /[a-c]/i", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 8},
            value: {},
            end: {line: 1, column: 16}
          },
          end: {line: 1, column: 16}
        }
      ],
      kind: "var",
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("var x = /[P QR]/i", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 8},
            value: {},
            end: {line: 1, column: 17}
          },
          end: {line: 1, column: 17}
        }
      ],
      kind: "var",
      end: {line: 1, column: 17}
    }
  ],
  end: {line: 1, column: 17}
});

test("var x = /foo\\/bar/", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 8},
            value: {},
            end: {line: 1, column: 18}
          },
          end: {line: 1, column: 18}
        }
      ],
      kind: "var",
      end: {line: 1, column: 18}
    }
  ],
  end: {line: 1, column: 18}
});

test("var x = /=([^=\\s])+/g", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 8},
            value: {},
            end: {line: 1, column: 21}
          },
          end: {line: 1, column: 21}
        }
      ],
      kind: "var",
      end: {line: 1, column: 21}
    }
  ],
  end: {line: 1, column: 21}
});

test("var x = /[P QR]/\\u0067", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 8},
            value: {},
            end: {line: 1, column: 22}
          },
          end: {line: 1, column: 22}
        }
      ],
      kind: "var",
      end: {line: 1, column: 22}
    }
  ],
  end: {line: 1, column: 22}
});

test("new Button", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "NewExpression",
        start: {line: 1, column: 0},
        callee: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "Button",
          end: {line: 1, column: 10}
        },
        arguments: [],
        end: {line: 1, column: 10}
      },
      end: {line: 1, column: 10}
    }
  ],
  end: {line: 1, column: 10}
});

test("new Button()", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "NewExpression",
        start: {line: 1, column: 0},
        callee: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "Button",
          end: {line: 1, column: 10}
        },
        arguments: [],
        end: {line: 1, column: 12}
      },
      end: {line: 1, column: 12}
    }
  ],
  end: {line: 1, column: 12}
});

test("new new foo", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "NewExpression",
        start: {line: 1, column: 0},
        callee: {
          type: "NewExpression",
          start: {line: 1, column: 4},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "foo",
            end: {line: 1, column: 11}
          },
          arguments: [],
          end: {line: 1, column: 11}
        },
        arguments: [],
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("new new foo()", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "NewExpression",
        start: {line: 1, column: 0},
        callee: {
          type: "NewExpression",
          start: {line: 1, column: 4},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "foo",
            end: {line: 1, column: 11}
          },
          arguments: [],
          end: {line: 1, column: 13}
        },
        arguments: [],
        end: {line: 1, column: 13}
      },
      end: {line: 1, column: 13}
    }
  ],
  end: {line: 1, column: 13}
});

test("new foo().bar()", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "CallExpression",
        start: {line: 1, column: 0},
        callee: {
          type: "MemberExpression",
          start: {line: 1, column: 0},
          object: {
            type: "NewExpression",
            start: {line: 1, column: 0},
            callee: {
              type: "Identifier",
              start: {line: 1, column: 4},
              name: "foo",
              end: {line: 1, column: 7}
            },
            arguments: [],
            end: {line: 1, column: 9}
          },
          property: {
            type: "Identifier",
            start: {line: 1, column: 10},
            name: "bar",
            end: {line: 1, column: 13}
          },
          computed: false,
          end: {line: 1, column: 13}
        },
        arguments: [],
        end: {line: 1, column: 15}
      },
      end: {line: 1, column: 15}
    }
  ],
  end: {line: 1, column: 15}
});

test("new foo[bar]", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "NewExpression",
        start: {line: 1, column: 0},
        callee: {
          type: "MemberExpression",
          start: {line: 1, column: 4},
          object: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "foo",
            end: {line: 1, column: 7}
          },
          property: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "bar",
            end: {line: 1, column: 11}
          },
          computed: true,
          end: {line: 1, column: 12}
        },
        arguments: [],
        end: {line: 1, column: 12}
      },
      end: {line: 1, column: 12}
    }
  ],
  end: {line: 1, column: 12}
});

test("new foo.bar()", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "NewExpression",
        start: {line: 1, column: 0},
        callee: {
          type: "MemberExpression",
          start: {line: 1, column: 4},
          object: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "foo",
            end: {line: 1, column: 7}
          },
          property: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "bar",
            end: {line: 1, column: 11}
          },
          computed: false,
          end: {line: 1, column: 11}
        },
        arguments: [],
        end: {line: 1, column: 13}
      },
      end: {line: 1, column: 13}
    }
  ],
  end: {line: 1, column: 13}
});

test("( new foo).bar()", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "CallExpression",
        start: {line: 1, column: 2},
        callee: {
          type: "MemberExpression",
          start: {line: 1, column: 2},
          object: {
            type: "NewExpression",
            start: {line: 1, column: 2},
            callee: {
              type: "Identifier",
              start: {line: 1, column: 6},
              name: "foo",
              end: {line: 1, column: 9}
            },
            arguments: [],
            end: {line: 1, column: 9}
          },
          property: {
            type: "Identifier",
            start: {line: 1, column: 11},
            name: "bar",
            end: {line: 1, column: 14}
          },
          computed: false,
          end: {line: 1, column: 14}
        },
        arguments: [],
        end: {line: 1, column: 16}
      },
      end: {line: 1, column: 16}
    }
  ],
  end: {line: 1, column: 16}
});

test("foo(bar, baz)", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "CallExpression",
        start: {line: 1, column: 0},
        callee: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "foo",
          end: {line: 1, column: 3}
        },
        arguments: [
          {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "bar",
            end: {line: 1, column: 7}
          },
          {
            type: "Identifier",
            start: {line: 1, column: 9},
            name: "baz",
            end: {line: 1, column: 12}
          }
        ],
        end: {line: 1, column: 13}
      },
      end: {line: 1, column: 13}
    }
  ],
  end: {line: 1, column: 13}
});

test("(    foo  )()", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "CallExpression",
        start: {line: 1, column: 5},
        callee: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "foo",
          end: {line: 1, column: 8}
        },
        arguments: [],
        end: {line: 1, column: 13}
      },
      end: {line: 1, column: 13}
    }
  ],
  end: {line: 1, column: 13}
});

test("universe.milkyway", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "universe",
          end: {line: 1, column: 8}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 9},
          name: "milkyway",
          end: {line: 1, column: 17}
        },
        computed: false,
        end: {line: 1, column: 17}
      },
      end: {line: 1, column: 17}
    }
  ],
  end: {line: 1, column: 17}
});

test("universe.milkyway.solarsystem", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "MemberExpression",
          start: {line: 1, column: 0},
          object: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "universe",
            end: {line: 1, column: 8}
          },
          property: {
            type: "Identifier",
            start: {line: 1, column: 9},
            name: "milkyway",
            end: {line: 1, column: 17}
          },
          computed: false,
          end: {line: 1, column: 17}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 18},
          name: "solarsystem",
          end: {line: 1, column: 29}
        },
        computed: false,
        end: {line: 1, column: 29}
      },
      end: {line: 1, column: 29}
    }
  ],
  end: {line: 1, column: 29}
});

test("universe.milkyway.solarsystem.Earth", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "MemberExpression",
          start: {line: 1, column: 0},
          object: {
            type: "MemberExpression",
            start: {line: 1, column: 0},
            object: {
              type: "Identifier",
              start: {line: 1, column: 0},
              name: "universe",
              end: {line: 1, column: 8}
            },
            property: {
              type: "Identifier",
              start: {line: 1, column: 9},
              name: "milkyway",
              end: {line: 1, column: 17}
            },
            computed: false,
            end: {line: 1, column: 17}
          },
          property: {
            type: "Identifier",
            start: {line: 1, column: 18},
            name: "solarsystem",
            end: {line: 1, column: 29}
          },
          computed: false,
          end: {line: 1, column: 29}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 30},
          name: "Earth",
          end: {line: 1, column: 35}
        },
        computed: false,
        end: {line: 1, column: 35}
      },
      end: {line: 1, column: 35}
    }
  ],
  end: {line: 1, column: 35}
});

test("universe[galaxyName, otherUselessName]", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "universe",
          end: {line: 1, column: 8}
        },
        property: {
          type: "SequenceExpression",
          start: {line: 1, column: 9},
          expressions: [
            {
              type: "Identifier",
              start: {line: 1, column: 9},
              name: "galaxyName",
              end: {line: 1, column: 19}
            },
            {
              type: "Identifier",
              start: {line: 1, column: 21},
              name: "otherUselessName",
              end: {line: 1, column: 37}
            }
          ],
          end: {line: 1, column: 37}
        },
        computed: true,
        end: {line: 1, column: 38}
      },
      end: {line: 1, column: 38}
    }
  ],
  end: {line: 1, column: 38}
});

test("universe[galaxyName]", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "universe",
          end: {line: 1, column: 8}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 9},
          name: "galaxyName",
          end: {line: 1, column: 19}
        },
        computed: true,
        end: {line: 1, column: 20}
      },
      end: {line: 1, column: 20}
    }
  ],
  end: {line: 1, column: 20}
});

test("universe[42].galaxies", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "MemberExpression",
          start: {line: 1, column: 0},
          object: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "universe",
            end: {line: 1, column: 8}
          },
          property: {
            type: "Literal",
            start: {line: 1, column: 9},
            value: 42,
            end: {line: 1, column: 11}
          },
          computed: true,
          end: {line: 1, column: 12}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 13},
          name: "galaxies",
          end: {line: 1, column: 21}
        },
        computed: false,
        end: {line: 1, column: 21}
      },
      end: {line: 1, column: 21}
    }
  ],
  end: {line: 1, column: 21}
});

test("universe(42).galaxies", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "CallExpression",
          start: {line: 1, column: 0},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "universe",
            end: {line: 1, column: 8}
          },
          arguments: [
            {
              type: "Literal",
              start: {line: 1, column: 9},
              value: 42,
              end: {line: 1, column: 11}
            }
          ],
          end: {line: 1, column: 12}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 13},
          name: "galaxies",
          end: {line: 1, column: 21}
        },
        computed: false,
        end: {line: 1, column: 21}
      },
      end: {line: 1, column: 21}
    }
  ],
  end: {line: 1, column: 21}
});

test("universe(42).galaxies(14, 3, 77).milkyway", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "CallExpression",
          start: {line: 1, column: 0},
          callee: {
            type: "MemberExpression",
            start: {line: 1, column: 0},
            object: {
              type: "CallExpression",
              start: {line: 1, column: 0},
              callee: {
                type: "Identifier",
                start: {line: 1, column: 0},
                name: "universe",
                end: {line: 1, column: 8}
              },
              arguments: [
                {
                  type: "Literal",
                  start: {line: 1, column: 9},
                  value: 42,
                  end: {line: 1, column: 11}
                }
              ],
              end: {line: 1, column: 12}
            },
            property: {
              type: "Identifier",
              start: {line: 1, column: 13},
              name: "galaxies",
              end: {line: 1, column: 21}
            },
            computed: false,
            end: {line: 1, column: 21}
          },
          arguments: [
            {
              type: "Literal",
              start: {line: 1, column: 22},
              value: 14,
              end: {line: 1, column: 24}
            },
            {
              type: "Literal",
              start: {line: 1, column: 26},
              value: 3,
              end: {line: 1, column: 27}
            },
            {
              type: "Literal",
              start: {line: 1, column: 29},
              value: 77,
              end: {line: 1, column: 31}
            }
          ],
          end: {line: 1, column: 32}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 33},
          name: "milkyway",
          end: {line: 1, column: 41}
        },
        computed: false,
        end: {line: 1, column: 41}
      },
      end: {line: 1, column: 41}
    }
  ],
  end: {line: 1, column: 41}
});

test("earth.asia.Indonesia.prepareForElection(2014)", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "CallExpression",
        start: {line: 1, column: 0},
        callee: {
          type: "MemberExpression",
          start: {line: 1, column: 0},
          object: {
            type: "MemberExpression",
            start: {line: 1, column: 0},
            object: {
              type: "MemberExpression",
              start: {line: 1, column: 0},
              object: {
                type: "Identifier",
                start: {line: 1, column: 0},
                name: "earth",
                end: {line: 1, column: 5}
              },
              property: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "asia",
                end: {line: 1, column: 10}
              },
              computed: false,
              end: {line: 1, column: 10}
            },
            property: {
              type: "Identifier",
              start: {line: 1, column: 11},
              name: "Indonesia",
              end: {line: 1, column: 20}
            },
            computed: false,
            end: {line: 1, column: 20}
          },
          property: {
            type: "Identifier",
            start: {line: 1, column: 21},
            name: "prepareForElection",
            end: {line: 1, column: 39}
          },
          computed: false,
          end: {line: 1, column: 39}
        },
        arguments: [
          {
            type: "Literal",
            start: {line: 1, column: 40},
            value: 2014,
            end: {line: 1, column: 44}
          }
        ],
        end: {line: 1, column: 45}
      },
      end: {line: 1, column: 45}
    }
  ],
  end: {line: 1, column: 45}
});

test("universe.if", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "universe",
          end: {line: 1, column: 8}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 9},
          name: "if",
          end: {line: 1, column: 11}
        },
        computed: false,
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("universe.true", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "universe",
          end: {line: 1, column: 8}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 9},
          name: "true",
          end: {line: 1, column: 13}
        },
        computed: false,
        end: {line: 1, column: 13}
      },
      end: {line: 1, column: 13}
    }
  ],
  end: {line: 1, column: 13}
});

test("universe.false", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "universe",
          end: {line: 1, column: 8}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 9},
          name: "false",
          end: {line: 1, column: 14}
        },
        computed: false,
        end: {line: 1, column: 14}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("universe.null", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "MemberExpression",
        start: {line: 1, column: 0},
        object: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "universe",
          end: {line: 1, column: 8}
        },
        property: {
          type: "Identifier",
          start: {line: 1, column: 9},
          name: "null",
          end: {line: 1, column: 13}
        },
        computed: false,
        end: {line: 1, column: 13}
      },
      end: {line: 1, column: 13}
    }
  ],
  end: {line: 1, column: 13}
});

test("x++", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        end: {line: 1, column: 3}
      },
      end: {line: 1, column: 3}
    }
  ],
  end: {line: 1, column: 3}
});

test("x--", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "--",
        prefix: false,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        end: {line: 1, column: 3}
      },
      end: {line: 1, column: 3}
    }
  ],
  end: {line: 1, column: 3}
});

test("eval++", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "eval",
          end: {line: 1, column: 4}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("eval--", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "--",
        prefix: false,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "eval",
          end: {line: 1, column: 4}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("arguments++", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "arguments",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("arguments--", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "--",
        prefix: false,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "arguments",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("++x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "++",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 2},
          name: "x",
          end: {line: 1, column: 3}
        },
        end: {line: 1, column: 3}
      },
      end: {line: 1, column: 3}
    }
  ],
  end: {line: 1, column: 3}
});

test("--x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "--",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 2},
          name: "x",
          end: {line: 1, column: 3}
        },
        end: {line: 1, column: 3}
      },
      end: {line: 1, column: 3}
    }
  ],
  end: {line: 1, column: 3}
});

test("++eval", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "++",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 2},
          name: "eval",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("--eval", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "--",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 2},
          name: "eval",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("++arguments", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "++",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 2},
          name: "arguments",
          end: {line: 1, column: 11}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("--arguments", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UpdateExpression",
        start: {line: 1, column: 0},
        operator: "--",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 2},
          name: "arguments",
          end: {line: 1, column: 11}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("+x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UnaryExpression",
        start: {line: 1, column: 0},
        operator: "+",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 1},
          name: "x",
          end: {line: 1, column: 2}
        },
        end: {line: 1, column: 2}
      },
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test("-x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UnaryExpression",
        start: {line: 1, column: 0},
        operator: "-",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 1},
          name: "x",
          end: {line: 1, column: 2}
        },
        end: {line: 1, column: 2}
      },
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test("~x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UnaryExpression",
        start: {line: 1, column: 0},
        operator: "~",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 1},
          name: "x",
          end: {line: 1, column: 2}
        },
        end: {line: 1, column: 2}
      },
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test("!x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UnaryExpression",
        start: {line: 1, column: 0},
        operator: "!",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 1},
          name: "x",
          end: {line: 1, column: 2}
        },
        end: {line: 1, column: 2}
      },
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test("void x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UnaryExpression",
        start: {line: 1, column: 0},
        operator: "void",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "x",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("delete x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UnaryExpression",
        start: {line: 1, column: 0},
        operator: "delete",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 7},
          name: "x",
          end: {line: 1, column: 8}
        },
        end: {line: 1, column: 8}
      },
      end: {line: 1, column: 8}
    }
  ],
  end: {line: 1, column: 8}
});

test("typeof x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "UnaryExpression",
        start: {line: 1, column: 0},
        operator: "typeof",
        prefix: true,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 7},
          name: "x",
          end: {line: 1, column: 8}
        },
        end: {line: 1, column: 8}
      },
      end: {line: 1, column: 8}
    }
  ],
  end: {line: 1, column: 8}
});

test("x * y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "*",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x / y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "/",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x % y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "%",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x + y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "+",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x - y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "-",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x << y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "<<",
        right: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "y",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x >> y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: ">>",
        right: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "y",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x >>> y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: ">>>",
        right: {
          type: "Identifier",
          start: {line: 1, column: 6},
          name: "y",
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x < y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "<",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x > y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: ">",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x <= y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "<=",
        right: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "y",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x >= y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: ">=",
        right: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "y",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x in y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "in",
        right: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "y",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x instanceof y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "instanceof",
        right: {
          type: "Identifier",
          start: {line: 1, column: 13},
          name: "y",
          end: {line: 1, column: 14}
        },
        end: {line: 1, column: 14}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("x < y < z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "<",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "<",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x == y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "==",
        right: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "y",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x != y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "!=",
        right: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "y",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x === y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "===",
        right: {
          type: "Identifier",
          start: {line: 1, column: 6},
          name: "y",
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x !== y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "!==",
        right: {
          type: "Identifier",
          start: {line: 1, column: 6},
          name: "y",
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x & y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "&",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x ^ y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "^",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x | y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "|",
        right: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "y",
          end: {line: 1, column: 5}
        },
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("x + y + z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "+",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "+",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x - y + z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "-",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "+",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x + y - z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "+",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "-",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x - y - z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "-",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "-",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x + y * z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "+",
        right: {
          type: "BinaryExpression",
          start: {line: 1, column: 4},
          left: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          operator: "*",
          right: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "z",
            end: {line: 1, column: 9}
          },
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x + y / z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "+",
        right: {
          type: "BinaryExpression",
          start: {line: 1, column: 4},
          left: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          operator: "/",
          right: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "z",
            end: {line: 1, column: 9}
          },
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x - y % z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "-",
        right: {
          type: "BinaryExpression",
          start: {line: 1, column: 4},
          left: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          operator: "%",
          right: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "z",
            end: {line: 1, column: 9}
          },
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x * y * z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "*",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "*",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x * y / z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "*",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "/",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x * y % z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "*",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "%",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x % y * z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "%",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "*",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x << y << z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "<<",
          right: {
            type: "Identifier",
            start: {line: 1, column: 5},
            name: "y",
            end: {line: 1, column: 6}
          },
          end: {line: 1, column: 6}
        },
        operator: "<<",
        right: {
          type: "Identifier",
          start: {line: 1, column: 10},
          name: "z",
          end: {line: 1, column: 11}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("x | y | z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "|",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "|",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x & y & z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "&",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "&",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x ^ y ^ z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "^",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "^",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x & y | z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "BinaryExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "&",
          right: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        },
        operator: "|",
        right: {
          type: "Identifier",
          start: {line: 1, column: 8},
          name: "z",
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x | y ^ z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "|",
        right: {
          type: "BinaryExpression",
          start: {line: 1, column: 4},
          left: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          operator: "^",
          right: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "z",
            end: {line: 1, column: 9}
          },
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x | y & z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "BinaryExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "|",
        right: {
          type: "BinaryExpression",
          start: {line: 1, column: 4},
          left: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "y",
            end: {line: 1, column: 5}
          },
          operator: "&",
          right: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "z",
            end: {line: 1, column: 9}
          },
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x || y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "LogicalExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "||",
        right: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "y",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x && y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "LogicalExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "&&",
        right: {
          type: "Identifier",
          start: {line: 1, column: 5},
          name: "y",
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("x || y || z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "LogicalExpression",
        start: {line: 1, column: 0},
        left: {
          type: "LogicalExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "||",
          right: {
            type: "Identifier",
            start: {line: 1, column: 5},
            name: "y",
            end: {line: 1, column: 6}
          },
          end: {line: 1, column: 6}
        },
        operator: "||",
        right: {
          type: "Identifier",
          start: {line: 1, column: 10},
          name: "z",
          end: {line: 1, column: 11}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("x && y && z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "LogicalExpression",
        start: {line: 1, column: 0},
        left: {
          type: "LogicalExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "&&",
          right: {
            type: "Identifier",
            start: {line: 1, column: 5},
            name: "y",
            end: {line: 1, column: 6}
          },
          end: {line: 1, column: 6}
        },
        operator: "&&",
        right: {
          type: "Identifier",
          start: {line: 1, column: 10},
          name: "z",
          end: {line: 1, column: 11}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("x || y && z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "LogicalExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "||",
        right: {
          type: "LogicalExpression",
          start: {line: 1, column: 5},
          left: {
            type: "Identifier",
            start: {line: 1, column: 5},
            name: "y",
            end: {line: 1, column: 6}
          },
          operator: "&&",
          right: {
            type: "Identifier",
            start: {line: 1, column: 10},
            name: "z",
            end: {line: 1, column: 11}
          },
          end: {line: 1, column: 11}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("x || y ^ z", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "LogicalExpression",
        start: {line: 1, column: 0},
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        operator: "||",
        right: {
          type: "BinaryExpression",
          start: {line: 1, column: 5},
          left: {
            type: "Identifier",
            start: {line: 1, column: 5},
            name: "y",
            end: {line: 1, column: 6}
          },
          operator: "^",
          right: {
            type: "Identifier",
            start: {line: 1, column: 9},
            name: "z",
            end: {line: 1, column: 10}
          },
          end: {line: 1, column: 10}
        },
        end: {line: 1, column: 10}
      },
      end: {line: 1, column: 10}
    }
  ],
  end: {line: 1, column: 10}
});

test("y ? 1 : 2", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "ConditionalExpression",
        start: {line: 1, column: 0},
        test: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "y",
          end: {line: 1, column: 1}
        },
        consequent: {
          type: "Literal",
          start: {line: 1, column: 4},
          value: 1,
          end: {line: 1, column: 5}
        },
        alternate: {
          type: "Literal",
          start: {line: 1, column: 8},
          value: 2,
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x && y ? 1 : 2", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "ConditionalExpression",
        start: {line: 1, column: 0},
        test: {
          type: "LogicalExpression",
          start: {line: 1, column: 0},
          left: {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          operator: "&&",
          right: {
            type: "Identifier",
            start: {line: 1, column: 5},
            name: "y",
            end: {line: 1, column: 6}
          },
          end: {line: 1, column: 6}
        },
        consequent: {
          type: "Literal",
          start: {line: 1, column: 9},
          value: 1,
          end: {line: 1, column: 10}
        },
        alternate: {
          type: "Literal",
          start: {line: 1, column: 13},
          value: 2,
          end: {line: 1, column: 14}
        },
        end: {line: 1, column: 14}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("x = 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 4},
          value: 42,
          end: {line: 1, column: 6}
        },
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("eval = 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "eval",
          end: {line: 1, column: 4}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 7},
          value: 42,
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("arguments = 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "arguments",
          end: {line: 1, column: 9}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 12},
          value: 42,
          end: {line: 1, column: 14}
        },
        end: {line: 1, column: 14}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("x *= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "*=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 5},
          value: 42,
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x /= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "/=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 5},
          value: 42,
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x %= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "%=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 5},
          value: 42,
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x += 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "+=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 5},
          value: 42,
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x -= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "-=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 5},
          value: 42,
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x <<= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "<<=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 6},
          value: 42,
          end: {line: 1, column: 8}
        },
        end: {line: 1, column: 8}
      },
      end: {line: 1, column: 8}
    }
  ],
  end: {line: 1, column: 8}
});

test("x >>= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: ">>=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 6},
          value: 42,
          end: {line: 1, column: 8}
        },
        end: {line: 1, column: 8}
      },
      end: {line: 1, column: 8}
    }
  ],
  end: {line: 1, column: 8}
});

test("x >>>= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: ">>>=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 7},
          value: 42,
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("x &= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "&=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 5},
          value: 42,
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x ^= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "^=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 5},
          value: 42,
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("x |= 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "AssignmentExpression",
        start: {line: 1, column: 0},
        operator: "|=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 0},
          name: "x",
          end: {line: 1, column: 1}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 5},
          value: 42,
          end: {line: 1, column: 7}
        },
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("{ foo }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [
        {
          type: "ExpressionStatement",
          start: {line: 1, column: 2},
          expression: {
            type: "Identifier",
            start: {line: 1, column: 2},
            name: "foo",
            end: {line: 1, column: 5}
          },
          end: {line: 1, column: 5}
        }
      ],
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("{ doThis(); doThat(); }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [
        {
          type: "ExpressionStatement",
          start: {line: 1, column: 2},
          expression: {
            type: "CallExpression",
            start: {line: 1, column: 2},
            callee: {
              type: "Identifier",
              start: {line: 1, column: 2},
              name: "doThis",
              end: {line: 1, column: 8}
            },
            arguments: [],
            end: {line: 1, column: 10}
          },
          end: {line: 1, column: 11}
        },
        {
          type: "ExpressionStatement",
          start: {line: 1, column: 12},
          expression: {
            type: "CallExpression",
            start: {line: 1, column: 12},
            callee: {
              type: "Identifier",
              start: {line: 1, column: 12},
              name: "doThat",
              end: {line: 1, column: 18}
            },
            arguments: [],
            end: {line: 1, column: 20}
          },
          end: {line: 1, column: 21}
        }
      ],
      end: {line: 1, column: 23}
    }
  ],
  end: {line: 1, column: 23}
});

test("{}", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [],
      end: {line: 1, column: 2}
    }
  ],
  end: {line: 1, column: 2}
});

test("var x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: null,
          end: {line: 1, column: 5}
        }
      ],
      kind: "var",
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 5}
});

test("var x, y;", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: null,
          end: {line: 1, column: 5}
        },
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 7},
          id: {
            type: "Identifier",
            start: {line: 1, column: 7},
            name: "y",
            end: {line: 1, column: 8}
          },
          init: null,
          end: {line: 1, column: 8}
        }
      ],
      kind: "var",
      end: {line: 1, column: 8}
    }
  ],
  end: {line: 1, column: 9}
});

test("var x = 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 8},
            value: 42,
            end: {line: 1, column: 10}
          },
          end: {line: 1, column: 10}
        }
      ],
      kind: "var",
      end: {line: 1, column: 10}
    }
  ],
  end: {line: 1, column: 10}
});

test("var eval = 42, arguments = 42", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "eval",
            end: {line: 1, column: 8}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 11},
            value: 42,
            end: {line: 1, column: 13}
          },
          end: {line: 1, column: 13}
        },
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 15},
          id: {
            type: "Identifier",
            start: {line: 1, column: 15},
            name: "arguments",
            end: {line: 1, column: 24}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 27},
            value: 42,
            end: {line: 1, column: 29}
          },
          end: {line: 1, column: 29}
        }
      ],
      kind: "var",
      end: {line: 1, column: 29}
    }
  ],
  end: {line: 1, column: 29}
});

test("var x = 14, y = 3, z = 1977", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 8},
            value: 14,
            end: {line: 1, column: 10}
          },
          end: {line: 1, column: 10}
        },
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 12},
          id: {
            type: "Identifier",
            start: {line: 1, column: 12},
            name: "y",
            end: {line: 1, column: 13}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 16},
            value: 3,
            end: {line: 1, column: 17}
          },
          end: {line: 1, column: 17}
        },
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 19},
          id: {
            type: "Identifier",
            start: {line: 1, column: 19},
            name: "z",
            end: {line: 1, column: 20}
          },
          init: {
            type: "Literal",
            start: {line: 1, column: 23},
            value: 1977,
            end: {line: 1, column: 27}
          },
          end: {line: 1, column: 27}
        }
      ],
      kind: "var",
      end: {line: 1, column: 27}
    }
  ],
  end: {line: 1, column: 27}
});

test("var implements, interface, package", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "implements",
            end: {line: 1, column: 14}
          },
          init: null,
          end: {line: 1, column: 14}
        },
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 16},
          id: {
            type: "Identifier",
            start: {line: 1, column: 16},
            name: "interface",
            end: {line: 1, column: 25}
          },
          init: null,
          end: {line: 1, column: 25}
        },
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 27},
          id: {
            type: "Identifier",
            start: {line: 1, column: 27},
            name: "package",
            end: {line: 1, column: 34}
          },
          init: null,
          end: {line: 1, column: 34}
        }
      ],
      kind: "var",
      end: {line: 1, column: 34}
    }
  ],
  end: {line: 1, column: 34}
});

test("var private, protected, public, static", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "private",
            end: {line: 1, column: 11}
          },
          init: null,
          end: {line: 1, column: 11}
        },
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 13},
          id: {
            type: "Identifier",
            start: {line: 1, column: 13},
            name: "protected",
            end: {line: 1, column: 22}
          },
          init: null,
          end: {line: 1, column: 22}
        },
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 24},
          id: {
            type: "Identifier",
            start: {line: 1, column: 24},
            name: "public",
            end: {line: 1, column: 30}
          },
          init: null,
          end: {line: 1, column: 30}
        },
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 32},
          id: {
            type: "Identifier",
            start: {line: 1, column: 32},
            name: "static",
            end: {line: 1, column: 38}
          },
          init: null,
          end: {line: 1, column: 38}
        }
      ],
      kind: "var",
      end: {line: 1, column: 38}
    }
  ],
  end: {line: 1, column: 38}
});

test(";", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "EmptyStatement",
      start: {line: 1, column: 0},
      end: {line: 1, column: 1}
    }
  ],
  end: {line: 1, column: 1}
});

test("x", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Identifier",
        start: {line: 1, column: 0},
        name: "x",
        end: {line: 1, column: 1}
      },
      end: {line: 1, column: 1}
    }
  ],
  end: {line: 1, column: 1}
});

test("x, y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "SequenceExpression",
        start: {line: 1, column: 0},
        expressions: [
          {
            type: "Identifier",
            start: {line: 1, column: 0},
            name: "x",
            end: {line: 1, column: 1}
          },
          {
            type: "Identifier",
            start: {line: 1, column: 3},
            name: "y",
            end: {line: 1, column: 4}
          }
        ],
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 4}
    }
  ],
  end: {line: 1, column: 4}
});

test("\\u0061", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Identifier",
        start: {line: 1, column: 0},
        name: "a",
        end: {line: 1, column: 6}
      },
      end: {line: 1, column: 6}
    }
  ],
  end: {line: 1, column: 6}
});

test("a\\u0061", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "Identifier",
        start: {line: 1, column: 0},
        name: "aa",
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    }
  ],
  end: {line: 1, column: 7}
});

test("if (morning) goodMorning()", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "IfStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Identifier",
        start: {line: 1, column: 4},
        name: "morning",
        end: {line: 1, column: 11}
      },
      consequent: {
        type: "ExpressionStatement",
        start: {line: 1, column: 13},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 13},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 13},
            name: "goodMorning",
            end: {line: 1, column: 24}
          },
          arguments: [],
          end: {line: 1, column: 26}
        },
        end: {line: 1, column: 26}
      },
      alternate: null,
      end: {line: 1, column: 26}
    }
  ],
  end: {line: 1, column: 26}
});

test("if (morning) (function(){})", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "IfStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Identifier",
        start: {line: 1, column: 4},
        name: "morning",
        end: {line: 1, column: 11}
      },
      consequent: {
        type: "ExpressionStatement",
        start: {line: 1, column: 13},
        expression: {
          type: "FunctionExpression",
          start: {line: 1, column: 14},
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            start: {line: 1, column: 24},
            body: [],
            end: {line: 1, column: 26}
          },
          end: {line: 1, column: 26}
        },
        end: {line: 1, column: 27}
      },
      alternate: null,
      end: {line: 1, column: 27}
    }
  ],
  end: {line: 1, column: 27}
});

test("if (morning) var x = 0;", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "IfStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Identifier",
        start: {line: 1, column: 4},
        name: "morning",
        end: {line: 1, column: 11}
      },
      consequent: {
        type: "VariableDeclaration",
        start: {line: 1, column: 13},
        declarations: [
          {
            type: "VariableDeclarator",
            start: {line: 1, column: 17},
            id: {
              type: "Identifier",
              start: {line: 1, column: 17},
              name: "x",
              end: {line: 1, column: 18}
            },
            init: {
              type: "Literal",
              start: {line: 1, column: 21},
              value: 0,
              end: {line: 1, column: 22}
            },
            end: {line: 1, column: 22}
          }
        ],
        kind: "var",
        end: {line: 1, column: 22}
      },
      alternate: null,
      end: {line: 1, column: 23}
    }
  ],
  end: {line: 1, column: 23}
});

test("if (morning) function a(){}", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "IfStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Identifier",
        start: {line: 1, column: 4},
        name: "morning",
        end: {line: 1, column: 11}
      },
      consequent: {
        type: "FunctionDeclaration",
        start: {line: 1, column: 13},
        id: {
          type: "Identifier",
          start: {line: 1, column: 22},
          name: "a",
          end: {line: 1, column: 23}
        },
        params: [],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 25},
          body: [],
          end: {line: 1, column: 27}
        },
        end: {line: 1, column: 27}
      },
      alternate: null,
      end: {line: 1, column: 27}
    }
  ],
  end: {line: 1, column: 27}
});

test("if (morning) goodMorning(); else goodDay()", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "IfStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Identifier",
        start: {line: 1, column: 4},
        name: "morning",
        end: {line: 1, column: 11}
      },
      consequent: {
        type: "ExpressionStatement",
        start: {line: 1, column: 13},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 13},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 13},
            name: "goodMorning",
            end: {line: 1, column: 24}
          },
          arguments: [],
          end: {line: 1, column: 26}
        },
        end: {line: 1, column: 27}
      },
      alternate: {
        type: "ExpressionStatement",
        start: {line: 1, column: 33},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 33},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 33},
            name: "goodDay",
            end: {line: 1, column: 40}
          },
          arguments: [],
          end: {line: 1, column: 42}
        },
        end: {line: 1, column: 42}
      },
      end: {line: 1, column: 42}
    }
  ],
  end: {line: 1, column: 42}
});

test("do keep(); while (true)", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "DoWhileStatement",
      start: {line: 1, column: 0},
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 3},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 3},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 3},
            name: "keep",
            end: {line: 1, column: 7}
          },
          arguments: [],
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 10}
      },
      test: {
        type: "Literal",
        start: {line: 1, column: 18},
        value: true,
        end: {line: 1, column: 22}
      },
      end: {line: 1, column: 23}
    }
  ],
  end: {line: 1, column: 23}
});

test("do keep(); while (true);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "DoWhileStatement",
      start: {line: 1, column: 0},
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 3},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 3},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 3},
            name: "keep",
            end: {line: 1, column: 7}
          },
          arguments: [],
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 10}
      },
      test: {
        type: "Literal",
        start: {line: 1, column: 18},
        value: true,
        end: {line: 1, column: 22}
      },
      end: {line: 1, column: 23}
    },
    {
      type: "EmptyStatement",
      start: {line: 1, column: 23},
      end: {line: 1, column: 24}
    }
  ],
  end: {line: 1, column: 24}
});

test("do { x++; y--; } while (x < 10)", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "DoWhileStatement",
      start: {line: 1, column: 0},
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 3},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 5},
            expression: {
              type: "UpdateExpression",
              start: {line: 1, column: 5},
              operator: "++",
              prefix: false,
              argument: {
                type: "Identifier",
                start: {line: 1, column: 5},
                name: "x",
                end: {line: 1, column: 6}
              },
              end: {line: 1, column: 8}
            },
            end: {line: 1, column: 9}
          },
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 10},
            expression: {
              type: "UpdateExpression",
              start: {line: 1, column: 10},
              operator: "--",
              prefix: false,
              argument: {
                type: "Identifier",
                start: {line: 1, column: 10},
                name: "y",
                end: {line: 1, column: 11}
              },
              end: {line: 1, column: 13}
            },
            end: {line: 1, column: 14}
          }
        ],
        end: {line: 1, column: 16}
      },
      test: {
        type: "BinaryExpression",
        start: {line: 1, column: 24},
        left: {
          type: "Identifier",
          start: {line: 1, column: 24},
          name: "x",
          end: {line: 1, column: 25}
        },
        operator: "<",
        right: {
          type: "Literal",
          start: {line: 1, column: 28},
          value: 10,
          end: {line: 1, column: 30}
        },
        end: {line: 1, column: 30}
      },
      end: {line: 1, column: 31}
    }
  ],
  end: {line: 1, column: 31}
});

test("{ do { } while (false) false }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [
        {
          type: "DoWhileStatement",
          start: {line: 1, column: 2},
          body: {
            type: "BlockStatement",
            start: {line: 1, column: 5},
            body: [],
            end: {line: 1, column: 8}
          },
          test: {
            type: "Literal",
            start: {line: 1, column: 16},
            value: false,
            end: {line: 1, column: 21}
          },
          end: {line: 1, column: 22}
        },
        {
          type: "ExpressionStatement",
          start: {line: 1, column: 23},
          expression: {
            type: "Literal",
            start: {line: 1, column: 23},
            value: false,
            end: {line: 1, column: 28}
          },
          end: {line: 1, column: 28}
        }
      ],
      end: {line: 1, column: 30}
    }
  ],
  end: {line: 1, column: 30}
});

test("while (true) doSomething()", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 13},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 13},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 13},
            name: "doSomething",
            end: {line: 1, column: 24}
          },
          arguments: [],
          end: {line: 1, column: 26}
        },
        end: {line: 1, column: 26}
      },
      end: {line: 1, column: 26}
    }
  ],
  end: {line: 1, column: 26}
});

test("while (x < 10) { x++; y--; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "BinaryExpression",
        start: {line: 1, column: 7},
        left: {
          type: "Identifier",
          start: {line: 1, column: 7},
          name: "x",
          end: {line: 1, column: 8}
        },
        operator: "<",
        right: {
          type: "Literal",
          start: {line: 1, column: 11},
          value: 10,
          end: {line: 1, column: 13}
        },
        end: {line: 1, column: 13}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 15},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 17},
            expression: {
              type: "UpdateExpression",
              start: {line: 1, column: 17},
              operator: "++",
              prefix: false,
              argument: {
                type: "Identifier",
                start: {line: 1, column: 17},
                name: "x",
                end: {line: 1, column: 18}
              },
              end: {line: 1, column: 20}
            },
            end: {line: 1, column: 21}
          },
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 22},
            expression: {
              type: "UpdateExpression",
              start: {line: 1, column: 22},
              operator: "--",
              prefix: false,
              argument: {
                type: "Identifier",
                start: {line: 1, column: 22},
                name: "y",
                end: {line: 1, column: 23}
              },
              end: {line: 1, column: 25}
            },
            end: {line: 1, column: 26}
          }
        ],
        end: {line: 1, column: 28}
      },
      end: {line: 1, column: 28}
    }
  ],
  end: {line: 1, column: 28}
});

test("for(;;);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForStatement",
      start: {line: 1, column: 0},
      init: null,
      test: null,
      update: null,
      body: {
        type: "EmptyStatement",
        start: {line: 1, column: 7},
        end: {line: 1, column: 8}
      },
      end: {line: 1, column: 8}
    }
  ],
  end: {line: 1, column: 8}
});

test("for(;;){}", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForStatement",
      start: {line: 1, column: 0},
      init: null,
      test: null,
      update: null,
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 7},
        body: [],
        end: {line: 1, column: 9}
      },
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("for(x = 0;;);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForStatement",
      start: {line: 1, column: 0},
      init: {
        type: "AssignmentExpression",
        start: {line: 1, column: 4},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "x",
          end: {line: 1, column: 5}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 8},
          value: 0,
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      test: null,
      update: null,
      body: {
        type: "EmptyStatement",
        start: {line: 1, column: 12},
        end: {line: 1, column: 13}
      },
      end: {line: 1, column: 13}
    }
  ],
  end: {line: 1, column: 13}
});

test("for(var x = 0;;);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForStatement",
      start: {line: 1, column: 0},
      init: {
        type: "VariableDeclaration",
        start: {line: 1, column: 4},
        declarations: [
          {
            type: "VariableDeclarator",
            start: {line: 1, column: 8},
            id: {
              type: "Identifier",
              start: {line: 1, column: 8},
              name: "x",
              end: {line: 1, column: 9}
            },
            init: {
              type: "Literal",
              start: {line: 1, column: 12},
              value: 0,
              end: {line: 1, column: 13}
            },
            end: {line: 1, column: 13}
          }
        ],
        kind: "var",
        end: {line: 1, column: 13}
      },
      test: null,
      update: null,
      body: {
        type: "EmptyStatement",
        start: {line: 1, column: 16},
        end: {line: 1, column: 17}
      },
      end: {line: 1, column: 17}
    }
  ],
  end: {line: 1, column: 17}
});

test("for(var x = 0, y = 1;;);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForStatement",
      start: {line: 1, column: 0},
      init: {
        type: "VariableDeclaration",
        start: {line: 1, column: 4},
        declarations: [
          {
            type: "VariableDeclarator",
            start: {line: 1, column: 8},
            id: {
              type: "Identifier",
              start: {line: 1, column: 8},
              name: "x",
              end: {line: 1, column: 9}
            },
            init: {
              type: "Literal",
              start: {line: 1, column: 12},
              value: 0,
              end: {line: 1, column: 13}
            },
            end: {line: 1, column: 13}
          },
          {
            type: "VariableDeclarator",
            start: {line: 1, column: 15},
            id: {
              type: "Identifier",
              start: {line: 1, column: 15},
              name: "y",
              end: {line: 1, column: 16}
            },
            init: {
              type: "Literal",
              start: {line: 1, column: 19},
              value: 1,
              end: {line: 1, column: 20}
            },
            end: {line: 1, column: 20}
          }
        ],
        kind: "var",
        end: {line: 1, column: 20}
      },
      test: null,
      update: null,
      body: {
        type: "EmptyStatement",
        start: {line: 1, column: 23},
        end: {line: 1, column: 24}
      },
      end: {line: 1, column: 24}
    }
  ],
  end: {line: 1, column: 24}
});

test("for(x = 0; x < 42;);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForStatement",
      start: {line: 1, column: 0},
      init: {
        type: "AssignmentExpression",
        start: {line: 1, column: 4},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "x",
          end: {line: 1, column: 5}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 8},
          value: 0,
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      test: {
        type: "BinaryExpression",
        start: {line: 1, column: 11},
        left: {
          type: "Identifier",
          start: {line: 1, column: 11},
          name: "x",
          end: {line: 1, column: 12}
        },
        operator: "<",
        right: {
          type: "Literal",
          start: {line: 1, column: 15},
          value: 42,
          end: {line: 1, column: 17}
        },
        end: {line: 1, column: 17}
      },
      update: null,
      body: {
        type: "EmptyStatement",
        start: {line: 1, column: 19},
        end: {line: 1, column: 20}
      },
      end: {line: 1, column: 20}
    }
  ],
  end: {line: 1, column: 20}
});

test("for(x = 0; x < 42; x++);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForStatement",
      start: {line: 1, column: 0},
      init: {
        type: "AssignmentExpression",
        start: {line: 1, column: 4},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "x",
          end: {line: 1, column: 5}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 8},
          value: 0,
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      test: {
        type: "BinaryExpression",
        start: {line: 1, column: 11},
        left: {
          type: "Identifier",
          start: {line: 1, column: 11},
          name: "x",
          end: {line: 1, column: 12}
        },
        operator: "<",
        right: {
          type: "Literal",
          start: {line: 1, column: 15},
          value: 42,
          end: {line: 1, column: 17}
        },
        end: {line: 1, column: 17}
      },
      update: {
        type: "UpdateExpression",
        start: {line: 1, column: 19},
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 19},
          name: "x",
          end: {line: 1, column: 20}
        },
        end: {line: 1, column: 22}
      },
      body: {
        type: "EmptyStatement",
        start: {line: 1, column: 23},
        end: {line: 1, column: 24}
      },
      end: {line: 1, column: 24}
    }
  ],
  end: {line: 1, column: 24}
});

test("for(x = 0; x < 42; x++) process(x);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForStatement",
      start: {line: 1, column: 0},
      init: {
        type: "AssignmentExpression",
        start: {line: 1, column: 4},
        operator: "=",
        left: {
          type: "Identifier",
          start: {line: 1, column: 4},
          name: "x",
          end: {line: 1, column: 5}
        },
        right: {
          type: "Literal",
          start: {line: 1, column: 8},
          value: 0,
          end: {line: 1, column: 9}
        },
        end: {line: 1, column: 9}
      },
      test: {
        type: "BinaryExpression",
        start: {line: 1, column: 11},
        left: {
          type: "Identifier",
          start: {line: 1, column: 11},
          name: "x",
          end: {line: 1, column: 12}
        },
        operator: "<",
        right: {
          type: "Literal",
          start: {line: 1, column: 15},
          value: 42,
          end: {line: 1, column: 17}
        },
        end: {line: 1, column: 17}
      },
      update: {
        type: "UpdateExpression",
        start: {line: 1, column: 19},
        operator: "++",
        prefix: false,
        argument: {
          type: "Identifier",
          start: {line: 1, column: 19},
          name: "x",
          end: {line: 1, column: 20}
        },
        end: {line: 1, column: 22}
      },
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 24},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 24},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 24},
            name: "process",
            end: {line: 1, column: 31}
          },
          arguments: [
            {
              type: "Identifier",
              start: {line: 1, column: 32},
              name: "x",
              end: {line: 1, column: 33}
            }
          ],
          end: {line: 1, column: 34}
        },
        end: {line: 1, column: 35}
      },
      end: {line: 1, column: 35}
    }
  ],
  end: {line: 1, column: 35}
});

test("for(x in list) process(x);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForInStatement",
      start: {line: 1, column: 0},
      left: {
        type: "Identifier",
        start: {line: 1, column: 4},
        name: "x",
        end: {line: 1, column: 5}
      },
      right: {
        type: "Identifier",
        start: {line: 1, column: 9},
        name: "list",
        end: {line: 1, column: 13}
      },
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 15},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 15},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 15},
            name: "process",
            end: {line: 1, column: 22}
          },
          arguments: [
            {
              type: "Identifier",
              start: {line: 1, column: 23},
              name: "x",
              end: {line: 1, column: 24}
            }
          ],
          end: {line: 1, column: 25}
        },
        end: {line: 1, column: 26}
      },
      end: {line: 1, column: 26}
    }
  ],
  end: {line: 1, column: 26}
});

test("for (var x in list) process(x);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForInStatement",
      start: {line: 1, column: 0},
      left: {
        type: "VariableDeclaration",
        start: {line: 1, column: 5},
        declarations: [
          {
            type: "VariableDeclarator",
            start: {line: 1, column: 9},
            id: {
              type: "Identifier",
              start: {line: 1, column: 9},
              name: "x",
              end: {line: 1, column: 10}
            },
            init: null,
            end: {line: 1, column: 10}
          }
        ],
        kind: "var",
        end: {line: 1, column: 10}
      },
      right: {
        type: "Identifier",
        start: {line: 1, column: 14},
        name: "list",
        end: {line: 1, column: 18}
      },
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 20},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 20},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 20},
            name: "process",
            end: {line: 1, column: 27}
          },
          arguments: [
            {
              type: "Identifier",
              start: {line: 1, column: 28},
              name: "x",
              end: {line: 1, column: 29}
            }
          ],
          end: {line: 1, column: 30}
        },
        end: {line: 1, column: 31}
      },
      end: {line: 1, column: 31}
    }
  ],
  end: {line: 1, column: 31}
});

test("for (var x = 42 in list) process(x);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForInStatement",
      start: {line: 1, column: 0},
      left: {
        type: "VariableDeclaration",
        start: {line: 1, column: 5},
        declarations: [
          {
            type: "VariableDeclarator",
            start: {line: 1, column: 9},
            id: {
              type: "Identifier",
              start: {line: 1, column: 9},
              name: "x",
              end: {line: 1, column: 10}
            },
            init: {
              type: "Literal",
              start: {line: 1, column: 13},
              value: 42,
              end: {line: 1, column: 15}
            },
            end: {line: 1, column: 15}
          }
        ],
        kind: "var",
        end: {line: 1, column: 15}
      },
      right: {
        type: "Identifier",
        start: {line: 1, column: 19},
        name: "list",
        end: {line: 1, column: 23}
      },
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 25},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 25},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 25},
            name: "process",
            end: {line: 1, column: 32}
          },
          arguments: [
            {
              type: "Identifier",
              start: {line: 1, column: 33},
              name: "x",
              end: {line: 1, column: 34}
            }
          ],
          end: {line: 1, column: 35}
        },
        end: {line: 1, column: 36}
      },
      end: {line: 1, column: 36}
    }
  ],
  end: {line: 1, column: 36}
});

test("for (var i = function() { return 10 in [] } in list) process(x);", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ForInStatement",
      start: {line: 1, column: 0},
      left: {
        type: "VariableDeclaration",
        start: {line: 1, column: 5},
        declarations: [
          {
            type: "VariableDeclarator",
            start: {line: 1, column: 9},
            id: {
              type: "Identifier",
              start: {line: 1, column: 9},
              name: "i",
              end: {line: 1, column: 10}
            },
            init: {
              type: "FunctionExpression",
              start: {line: 1, column: 13},
              id: null,
              params: [],
              body: {
                type: "BlockStatement",
                start: {line: 1, column: 24},
                body: [
                  {
                    type: "ReturnStatement",
                    start: {line: 1, column: 26},
                    argument: {
                      type: "BinaryExpression",
                      start: {line: 1, column: 33},
                      left: {
                        type: "Literal",
                        start: {line: 1, column: 33},
                        value: 10,
                        end: {line: 1, column: 35}
                      },
                      operator: "in",
                      right: {
                        type: "ArrayExpression",
                        start: {line: 1, column: 39},
                        elements: [],
                        end: {line: 1, column: 41}
                      },
                      end: {line: 1, column: 41}
                    },
                    end: {line: 1, column: 41}
                  }
                ],
                end: {line: 1, column: 43}
              },
              end: {line: 1, column: 43}
            },
            end: {line: 1, column: 43}
          }
        ],
        kind: "var",
        end: {line: 1, column: 43}
      },
      right: {
        type: "Identifier",
        start: {line: 1, column: 47},
        name: "list",
        end: {line: 1, column: 51}
      },
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 53},
        expression: {
          type: "CallExpression",
          start: {line: 1, column: 53},
          callee: {
            type: "Identifier",
            start: {line: 1, column: 53},
            name: "process",
            end: {line: 1, column: 60}
          },
          arguments: [
            {
              type: "Identifier",
              start: {line: 1, column: 61},
              name: "x",
              end: {line: 1, column: 62}
            }
          ],
          end: {line: 1, column: 63}
        },
        end: {line: 1, column: 64}
      },
      end: {line: 1, column: 64}
    }
  ],
  end: {line: 1, column: 64}
});

test("while (true) { continue; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 13},
        body: [
          {
            type: "ContinueStatement",
            start: {line: 1, column: 15},
            label: null,
            end: {line: 1, column: 24}
          }
        ],
        end: {line: 1, column: 26}
      },
      end: {line: 1, column: 26}
    }
  ],
  end: {line: 1, column: 26}
});

test("while (true) { continue }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 13},
        body: [
          {
            type: "ContinueStatement",
            start: {line: 1, column: 15},
            label: null,
            end: {line: 1, column: 23}
          }
        ],
        end: {line: 1, column: 25}
      },
      end: {line: 1, column: 25}
    }
  ],
  end: {line: 1, column: 25}
});

test("done: while (true) { continue done }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "LabeledStatement",
      start: {line: 1, column: 0},
      body: {
        type: "WhileStatement",
        start: {line: 1, column: 6},
        test: {
          type: "Literal",
          start: {line: 1, column: 13},
          value: true,
          end: {line: 1, column: 17}
        },
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 19},
          body: [
            {
              type: "ContinueStatement",
              start: {line: 1, column: 21},
              label: {
                type: "Identifier",
                start: {line: 1, column: 30},
                name: "done",
                end: {line: 1, column: 34}
              },
              end: {line: 1, column: 34}
            }
          ],
          end: {line: 1, column: 36}
        },
        end: {line: 1, column: 36}
      },
      label: {
        type: "Identifier",
        start: {line: 1, column: 0},
        name: "done",
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 36}
    }
  ],
  end: {line: 1, column: 36}
});

test("done: while (true) { continue done; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "LabeledStatement",
      start: {line: 1, column: 0},
      body: {
        type: "WhileStatement",
        start: {line: 1, column: 6},
        test: {
          type: "Literal",
          start: {line: 1, column: 13},
          value: true,
          end: {line: 1, column: 17}
        },
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 19},
          body: [
            {
              type: "ContinueStatement",
              start: {line: 1, column: 21},
              label: {
                type: "Identifier",
                start: {line: 1, column: 30},
                name: "done",
                end: {line: 1, column: 34}
              },
              end: {line: 1, column: 35}
            }
          ],
          end: {line: 1, column: 37}
        },
        end: {line: 1, column: 37}
      },
      label: {
        type: "Identifier",
        start: {line: 1, column: 0},
        name: "done",
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 37}
    }
  ],
  end: {line: 1, column: 37}
});

test("while (true) { break }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 13},
        body: [
          {
            type: "BreakStatement",
            start: {line: 1, column: 15},
            label: null,
            end: {line: 1, column: 20}
          }
        ],
        end: {line: 1, column: 22}
      },
      end: {line: 1, column: 22}
    }
  ],
  end: {line: 1, column: 22}
});

test("done: while (true) { break done }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "LabeledStatement",
      start: {line: 1, column: 0},
      body: {
        type: "WhileStatement",
        start: {line: 1, column: 6},
        test: {
          type: "Literal",
          start: {line: 1, column: 13},
          value: true,
          end: {line: 1, column: 17}
        },
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 19},
          body: [
            {
              type: "BreakStatement",
              start: {line: 1, column: 21},
              label: {
                type: "Identifier",
                start: {line: 1, column: 27},
                name: "done",
                end: {line: 1, column: 31}
              },
              end: {line: 1, column: 31}
            }
          ],
          end: {line: 1, column: 33}
        },
        end: {line: 1, column: 33}
      },
      label: {
        type: "Identifier",
        start: {line: 1, column: 0},
        name: "done",
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 33}
    }
  ],
  end: {line: 1, column: 33}
});

test("done: while (true) { break done; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "LabeledStatement",
      start: {line: 1, column: 0},
      body: {
        type: "WhileStatement",
        start: {line: 1, column: 6},
        test: {
          type: "Literal",
          start: {line: 1, column: 13},
          value: true,
          end: {line: 1, column: 17}
        },
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 19},
          body: [
            {
              type: "BreakStatement",
              start: {line: 1, column: 21},
              label: {
                type: "Identifier",
                start: {line: 1, column: 27},
                name: "done",
                end: {line: 1, column: 31}
              },
              end: {line: 1, column: 32}
            }
          ],
          end: {line: 1, column: 34}
        },
        end: {line: 1, column: 34}
      },
      label: {
        type: "Identifier",
        start: {line: 1, column: 0},
        name: "done",
        end: {line: 1, column: 4}
      },
      end: {line: 1, column: 34}
    }
  ],
  end: {line: 1, column: 34}
});

test("(function(){ return })", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "FunctionExpression",
        start: {line: 1, column: 1},
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 11},
          body: [
            {
              type: "ReturnStatement",
              start: {line: 1, column: 13},
              argument: null,
              end: {line: 1, column: 19}
            }
          ],
          end: {line: 1, column: 21}
        },
        end: {line: 1, column: 21}
      },
      end: {line: 1, column: 22}
    }
  ],
  end: {line: 1, column: 22}
});

test("(function(){ return; })", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "FunctionExpression",
        start: {line: 1, column: 1},
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 11},
          body: [
            {
              type: "ReturnStatement",
              start: {line: 1, column: 13},
              argument: null,
              end: {line: 1, column: 20}
            }
          ],
          end: {line: 1, column: 22}
        },
        end: {line: 1, column: 22}
      },
      end: {line: 1, column: 23}
    }
  ],
  end: {line: 1, column: 23}
});

test("(function(){ return x; })", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "FunctionExpression",
        start: {line: 1, column: 1},
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 11},
          body: [
            {
              type: "ReturnStatement",
              start: {line: 1, column: 13},
              argument: {
                type: "Identifier",
                start: {line: 1, column: 20},
                name: "x",
                end: {line: 1, column: 21}
              },
              end: {line: 1, column: 22}
            }
          ],
          end: {line: 1, column: 24}
        },
        end: {line: 1, column: 24}
      },
      end: {line: 1, column: 25}
    }
  ],
  end: {line: 1, column: 25}
});

test("(function(){ return x * y })", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "FunctionExpression",
        start: {line: 1, column: 1},
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 11},
          body: [
            {
              type: "ReturnStatement",
              start: {line: 1, column: 13},
              argument: {
                type: "BinaryExpression",
                start: {line: 1, column: 20},
                left: {
                  type: "Identifier",
                  start: {line: 1, column: 20},
                  name: "x",
                  end: {line: 1, column: 21}
                },
                operator: "*",
                right: {
                  type: "Identifier",
                  start: {line: 1, column: 24},
                  name: "y",
                  end: {line: 1, column: 25}
                },
                end: {line: 1, column: 25}
              },
              end: {line: 1, column: 25}
            }
          ],
          end: {line: 1, column: 27}
        },
        end: {line: 1, column: 27}
      },
      end: {line: 1, column: 28}
    }
  ],
  end: {line: 1, column: 28}
});

test("with (x) foo = bar", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WithStatement",
      start: {line: 1, column: 0},
      object: {
        type: "Identifier",
        start: {line: 1, column: 6},
        name: "x",
        end: {line: 1, column: 7}
      },
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 9},
        expression: {
          type: "AssignmentExpression",
          start: {line: 1, column: 9},
          operator: "=",
          left: {
            type: "Identifier",
            start: {line: 1, column: 9},
            name: "foo",
            end: {line: 1, column: 12}
          },
          right: {
            type: "Identifier",
            start: {line: 1, column: 15},
            name: "bar",
            end: {line: 1, column: 18}
          },
          end: {line: 1, column: 18}
        },
        end: {line: 1, column: 18}
      },
      end: {line: 1, column: 18}
    }
  ],
  end: {line: 1, column: 18}
});

test("with (x) foo = bar;", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WithStatement",
      start: {line: 1, column: 0},
      object: {
        type: "Identifier",
        start: {line: 1, column: 6},
        name: "x",
        end: {line: 1, column: 7}
      },
      body: {
        type: "ExpressionStatement",
        start: {line: 1, column: 9},
        expression: {
          type: "AssignmentExpression",
          start: {line: 1, column: 9},
          operator: "=",
          left: {
            type: "Identifier",
            start: {line: 1, column: 9},
            name: "foo",
            end: {line: 1, column: 12}
          },
          right: {
            type: "Identifier",
            start: {line: 1, column: 15},
            name: "bar",
            end: {line: 1, column: 18}
          },
          end: {line: 1, column: 18}
        },
        end: {line: 1, column: 19}
      },
      end: {line: 1, column: 19}
    }
  ],
  end: {line: 1, column: 19}
});

test("with (x) { foo = bar }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WithStatement",
      start: {line: 1, column: 0},
      object: {
        type: "Identifier",
        start: {line: 1, column: 6},
        name: "x",
        end: {line: 1, column: 7}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 9},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 11},
            expression: {
              type: "AssignmentExpression",
              start: {line: 1, column: 11},
              operator: "=",
              left: {
                type: "Identifier",
                start: {line: 1, column: 11},
                name: "foo",
                end: {line: 1, column: 14}
              },
              right: {
                type: "Identifier",
                start: {line: 1, column: 17},
                name: "bar",
                end: {line: 1, column: 20}
              },
              end: {line: 1, column: 20}
            },
            end: {line: 1, column: 20}
          }
        ],
        end: {line: 1, column: 22}
      },
      end: {line: 1, column: 22}
    }
  ],
  end: {line: 1, column: 22}
});

test("switch (x) {}", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "SwitchStatement",
      start: {line: 1, column: 0},
      discriminant: {
        type: "Identifier",
        start: {line: 1, column: 8},
        name: "x",
        end: {line: 1, column: 9}
      },
      cases: [],
      end: {line: 1, column: 13}
    }
  ],
  end: {line: 1, column: 13}
});

test("switch (answer) { case 42: hi(); break; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "SwitchStatement",
      start: {line: 1, column: 0},
      discriminant: {
        type: "Identifier",
        start: {line: 1, column: 8},
        name: "answer",
        end: {line: 1, column: 14}
      },
      cases: [
        {
          type: "SwitchCase",
          start: {line: 1, column: 18},
          consequent: [
            {
              type: "ExpressionStatement",
              start: {line: 1, column: 27},
              expression: {
                type: "CallExpression",
                start: {line: 1, column: 27},
                callee: {
                  type: "Identifier",
                  start: {line: 1, column: 27},
                  name: "hi",
                  end: {line: 1, column: 29}
                },
                arguments: [],
                end: {line: 1, column: 31}
              },
              end: {line: 1, column: 32}
            },
            {
              type: "BreakStatement",
              start: {line: 1, column: 33},
              label: null,
              end: {line: 1, column: 39}
            }
          ],
          test: {
            type: "Literal",
            start: {line: 1, column: 23},
            value: 42,
            end: {line: 1, column: 25}
          },
          end: {line: 1, column: 41}
        }
      ],
      end: {line: 1, column: 41}
    }
  ],
  end: {line: 1, column: 41}
});

test("switch (answer) { case 42: hi(); break; default: break }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "SwitchStatement",
      start: {line: 1, column: 0},
      discriminant: {
        type: "Identifier",
        start: {line: 1, column: 8},
        name: "answer",
        end: {line: 1, column: 14}
      },
      cases: [
        {
          type: "SwitchCase",
          start: {line: 1, column: 18},
          consequent: [
            {
              type: "ExpressionStatement",
              start: {line: 1, column: 27},
              expression: {
                type: "CallExpression",
                start: {line: 1, column: 27},
                callee: {
                  type: "Identifier",
                  start: {line: 1, column: 27},
                  name: "hi",
                  end: {line: 1, column: 29}
                },
                arguments: [],
                end: {line: 1, column: 31}
              },
              end: {line: 1, column: 32}
            },
            {
              type: "BreakStatement",
              start: {line: 1, column: 33},
              label: null,
              end: {line: 1, column: 39}
            }
          ],
          test: {
            type: "Literal",
            start: {line: 1, column: 23},
            value: 42,
            end: {line: 1, column: 25}
          },
          end: {line: 1, column: 39}
        },
        {
          type: "SwitchCase",
          start: {line: 1, column: 40},
          consequent: [
            {
              type: "BreakStatement",
              start: {line: 1, column: 49},
              label: null,
              end: {line: 1, column: 54}
            }
          ],
          test: null,
          end: {line: 1, column: 56}
        }
      ],
      end: {line: 1, column: 56}
    }
  ],
  end: {line: 1, column: 56}
});

test("start: for (;;) break start", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "LabeledStatement",
      start: {line: 1, column: 0},
      body: {
        type: "ForStatement",
        start: {line: 1, column: 7},
        init: null,
        test: null,
        update: null,
        body: {
          type: "BreakStatement",
          start: {line: 1, column: 16},
          label: {
            type: "Identifier",
            start: {line: 1, column: 22},
            name: "start",
            end: {line: 1, column: 27}
          },
          end: {line: 1, column: 27}
        },
        end: {line: 1, column: 27}
      },
      label: {
        type: "Identifier",
        start: {line: 1, column: 0},
        name: "start",
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 27}
    }
  ],
  end: {line: 1, column: 27}
});

test("start: while (true) break start", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "LabeledStatement",
      start: {line: 1, column: 0},
      body: {
        type: "WhileStatement",
        start: {line: 1, column: 7},
        test: {
          type: "Literal",
          start: {line: 1, column: 14},
          value: true,
          end: {line: 1, column: 18}
        },
        body: {
          type: "BreakStatement",
          start: {line: 1, column: 20},
          label: {
            type: "Identifier",
            start: {line: 1, column: 26},
            name: "start",
            end: {line: 1, column: 31}
          },
          end: {line: 1, column: 31}
        },
        end: {line: 1, column: 31}
      },
      label: {
        type: "Identifier",
        start: {line: 1, column: 0},
        name: "start",
        end: {line: 1, column: 5}
      },
      end: {line: 1, column: 31}
    }
  ],
  end: {line: 1, column: 31}
});

test("throw x;", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ThrowStatement",
      start: {line: 1, column: 0},
      argument: {
        type: "Identifier",
        start: {line: 1, column: 6},
        name: "x",
        end: {line: 1, column: 7}
      },
      end: {line: 1, column: 7}
    },
    {
      type: "EmptyStatement",
      start: {line: 1, column: 7},
      end: {line: 1, column: 8}
    }
  ],
  end: {line: 1, column: 8}
});

test("throw x * y", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ThrowStatement",
      start: {line: 1, column: 0},
      argument: {
        type: "BinaryExpression",
        start: {line: 1, column: 6},
        left: {
          type: "Identifier",
          start: {line: 1, column: 6},
          name: "x",
          end: {line: 1, column: 7}
        },
        operator: "*",
        right: {
          type: "Identifier",
          start: {line: 1, column: 10},
          name: "y",
          end: {line: 1, column: 11}
        },
        end: {line: 1, column: 11}
      },
      end: {line: 1, column: 11}
    }
  ],
  end: {line: 1, column: 11}
});

test("throw { message: \"Error\" }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ThrowStatement",
      start: {line: 1, column: 0},
      argument: {
        type: "ObjectExpression",
        start: {line: 1, column: 6},
        properties: [
          {
            key: {
              type: "Identifier",
              start: {line: 1, column: 8},
              name: "message",
              end: {line: 1, column: 15}
            },
            value: {
              type: "Literal",
              start: {line: 1, column: 17},
              value: "Error",
              end: {line: 1, column: 24}
            },
            kind: "init"
          }
        ],
        end: {line: 1, column: 26}
      },
      end: {line: 1, column: 26}
    }
  ],
  end: {line: 1, column: 26}
});

test("try { } catch (e) { }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "TryStatement",
      start: {line: 1, column: 0},
      block: {
        type: "BlockStatement",
        start: {line: 1, column: 4},
        body: [],
        end: {line: 1, column: 7}
      },
      handlers: [
        {
          type: "CatchClause",
          start: {line: 1, column: 8},
          param: {
            type: "Identifier",
            start: {line: 1, column: 15},
            name: "e",
            end: {line: 1, column: 16}
          },
          guard: null,
          body: {
            type: "BlockStatement",
            start: {line: 1, column: 18},
            body: [],
            end: {line: 1, column: 21}
          },
          end: {line: 1, column: 21}
        }
      ],
      finalizer: null,
      end: {line: 1, column: 21}
    }
  ],
  end: {line: 1, column: 21}
});

test("try { } catch (eval) { }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "TryStatement",
      start: {line: 1, column: 0},
      block: {
        type: "BlockStatement",
        start: {line: 1, column: 4},
        body: [],
        end: {line: 1, column: 7}
      },
      handlers: [
        {
          type: "CatchClause",
          start: {line: 1, column: 8},
          param: {
            type: "Identifier",
            start: {line: 1, column: 15},
            name: "eval",
            end: {line: 1, column: 19}
          },
          guard: null,
          body: {
            type: "BlockStatement",
            start: {line: 1, column: 21},
            body: [],
            end: {line: 1, column: 24}
          },
          end: {line: 1, column: 24}
        }
      ],
      finalizer: null,
      end: {line: 1, column: 24}
    }
  ],
  end: {line: 1, column: 24}
});

test("try { } catch (arguments) { }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "TryStatement",
      start: {line: 1, column: 0},
      block: {
        type: "BlockStatement",
        start: {line: 1, column: 4},
        body: [],
        end: {line: 1, column: 7}
      },
      handlers: [
        {
          type: "CatchClause",
          start: {line: 1, column: 8},
          param: {
            type: "Identifier",
            start: {line: 1, column: 15},
            name: "arguments",
            end: {line: 1, column: 24}
          },
          guard: null,
          body: {
            type: "BlockStatement",
            start: {line: 1, column: 26},
            body: [],
            end: {line: 1, column: 29}
          },
          end: {line: 1, column: 29}
        }
      ],
      finalizer: null,
      end: {line: 1, column: 29}
    }
  ],
  end: {line: 1, column: 29}
});

test("try { } catch (e) { say(e) }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "TryStatement",
      start: {line: 1, column: 0},
      block: {
        type: "BlockStatement",
        start: {line: 1, column: 4},
        body: [],
        end: {line: 1, column: 7}
      },
      handlers: [
        {
          type: "CatchClause",
          start: {line: 1, column: 8},
          param: {
            type: "Identifier",
            start: {line: 1, column: 15},
            name: "e",
            end: {line: 1, column: 16}
          },
          guard: null,
          body: {
            type: "BlockStatement",
            start: {line: 1, column: 18},
            body: [
              {
                type: "ExpressionStatement",
                start: {line: 1, column: 20},
                expression: {
                  type: "CallExpression",
                  start: {line: 1, column: 20},
                  callee: {
                    type: "Identifier",
                    start: {line: 1, column: 20},
                    name: "say",
                    end: {line: 1, column: 23}
                  },
                  arguments: [
                    {
                      type: "Identifier",
                      start: {line: 1, column: 24},
                      name: "e",
                      end: {line: 1, column: 25}
                    }
                  ],
                  end: {line: 1, column: 26}
                },
                end: {line: 1, column: 26}
              }
            ],
            end: {line: 1, column: 28}
          },
          end: {line: 1, column: 28}
        }
      ],
      finalizer: null,
      end: {line: 1, column: 28}
    }
  ],
  end: {line: 1, column: 28}
});

test("try { } finally { cleanup(stuff) }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "TryStatement",
      start: {line: 1, column: 0},
      block: {
        type: "BlockStatement",
        start: {line: 1, column: 4},
        body: [],
        end: {line: 1, column: 7}
      },
      handlers: [],
      finalizer: {
        type: "BlockStatement",
        start: {line: 1, column: 16},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 18},
            expression: {
              type: "CallExpression",
              start: {line: 1, column: 18},
              callee: {
                type: "Identifier",
                start: {line: 1, column: 18},
                name: "cleanup",
                end: {line: 1, column: 25}
              },
              arguments: [
                {
                  type: "Identifier",
                  start: {line: 1, column: 26},
                  name: "stuff",
                  end: {line: 1, column: 31}
                }
              ],
              end: {line: 1, column: 32}
            },
            end: {line: 1, column: 32}
          }
        ],
        end: {line: 1, column: 34}
      },
      end: {line: 1, column: 34}
    }
  ],
  end: {line: 1, column: 34}
});

test("try { doThat(); } catch (e) { say(e) }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "TryStatement",
      start: {line: 1, column: 0},
      block: {
        type: "BlockStatement",
        start: {line: 1, column: 4},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 6},
            expression: {
              type: "CallExpression",
              start: {line: 1, column: 6},
              callee: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "doThat",
                end: {line: 1, column: 12}
              },
              arguments: [],
              end: {line: 1, column: 14}
            },
            end: {line: 1, column: 15}
          }
        ],
        end: {line: 1, column: 17}
      },
      handlers: [
        {
          type: "CatchClause",
          start: {line: 1, column: 18},
          param: {
            type: "Identifier",
            start: {line: 1, column: 25},
            name: "e",
            end: {line: 1, column: 26}
          },
          guard: null,
          body: {
            type: "BlockStatement",
            start: {line: 1, column: 28},
            body: [
              {
                type: "ExpressionStatement",
                start: {line: 1, column: 30},
                expression: {
                  type: "CallExpression",
                  start: {line: 1, column: 30},
                  callee: {
                    type: "Identifier",
                    start: {line: 1, column: 30},
                    name: "say",
                    end: {line: 1, column: 33}
                  },
                  arguments: [
                    {
                      type: "Identifier",
                      start: {line: 1, column: 34},
                      name: "e",
                      end: {line: 1, column: 35}
                    }
                  ],
                  end: {line: 1, column: 36}
                },
                end: {line: 1, column: 36}
              }
            ],
            end: {line: 1, column: 38}
          },
          end: {line: 1, column: 38}
        }
      ],
      finalizer: null,
      end: {line: 1, column: 38}
    }
  ],
  end: {line: 1, column: 38}
});

test("try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "TryStatement",
      start: {line: 1, column: 0},
      block: {
        type: "BlockStatement",
        start: {line: 1, column: 4},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 6},
            expression: {
              type: "CallExpression",
              start: {line: 1, column: 6},
              callee: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "doThat",
                end: {line: 1, column: 12}
              },
              arguments: [],
              end: {line: 1, column: 14}
            },
            end: {line: 1, column: 15}
          }
        ],
        end: {line: 1, column: 17}
      },
      handlers: [
        {
          type: "CatchClause",
          start: {line: 1, column: 18},
          param: {
            type: "Identifier",
            start: {line: 1, column: 25},
            name: "e",
            end: {line: 1, column: 26}
          },
          guard: null,
          body: {
            type: "BlockStatement",
            start: {line: 1, column: 28},
            body: [
              {
                type: "ExpressionStatement",
                start: {line: 1, column: 30},
                expression: {
                  type: "CallExpression",
                  start: {line: 1, column: 30},
                  callee: {
                    type: "Identifier",
                    start: {line: 1, column: 30},
                    name: "say",
                    end: {line: 1, column: 33}
                  },
                  arguments: [
                    {
                      type: "Identifier",
                      start: {line: 1, column: 34},
                      name: "e",
                      end: {line: 1, column: 35}
                    }
                  ],
                  end: {line: 1, column: 36}
                },
                end: {line: 1, column: 36}
              }
            ],
            end: {line: 1, column: 38}
          },
          end: {line: 1, column: 38}
        }
      ],
      finalizer: {
        type: "BlockStatement",
        start: {line: 1, column: 47},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 49},
            expression: {
              type: "CallExpression",
              start: {line: 1, column: 49},
              callee: {
                type: "Identifier",
                start: {line: 1, column: 49},
                name: "cleanup",
                end: {line: 1, column: 56}
              },
              arguments: [
                {
                  type: "Identifier",
                  start: {line: 1, column: 57},
                  name: "stuff",
                  end: {line: 1, column: 62}
                }
              ],
              end: {line: 1, column: 63}
            },
            end: {line: 1, column: 63}
          }
        ],
        end: {line: 1, column: 65}
      },
      end: {line: 1, column: 65}
    }
  ],
  end: {line: 1, column: 65}
});

test("debugger;", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "DebuggerStatement",
      start: {line: 1, column: 0},
      end: {line: 1, column: 8}
    },
    {
      type: "EmptyStatement",
      start: {line: 1, column: 8},
      end: {line: 1, column: 9}
    }
  ],
  end: {line: 1, column: 9}
});

test("function hello() { sayHi(); }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "FunctionDeclaration",
      start: {line: 1, column: 0},
      id: {
        type: "Identifier",
        start: {line: 1, column: 9},
        name: "hello",
        end: {line: 1, column: 14}
      },
      params: [],
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 17},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 19},
            expression: {
              type: "CallExpression",
              start: {line: 1, column: 19},
              callee: {
                type: "Identifier",
                start: {line: 1, column: 19},
                name: "sayHi",
                end: {line: 1, column: 24}
              },
              arguments: [],
              end: {line: 1, column: 26}
            },
            end: {line: 1, column: 27}
          }
        ],
        end: {line: 1, column: 29}
      },
      end: {line: 1, column: 29}
    }
  ],
  end: {line: 1, column: 29}
});

test("function eval() { }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "FunctionDeclaration",
      start: {line: 1, column: 0},
      id: {
        type: "Identifier",
        start: {line: 1, column: 9},
        name: "eval",
        end: {line: 1, column: 13}
      },
      params: [],
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 16},
        body: [],
        end: {line: 1, column: 19}
      },
      end: {line: 1, column: 19}
    }
  ],
  end: {line: 1, column: 19}
});

test("function arguments() { }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "FunctionDeclaration",
      start: {line: 1, column: 0},
      id: {
        type: "Identifier",
        start: {line: 1, column: 9},
        name: "arguments",
        end: {line: 1, column: 18}
      },
      params: [],
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 21},
        body: [],
        end: {line: 1, column: 24}
      },
      end: {line: 1, column: 24}
    }
  ],
  end: {line: 1, column: 24}
});

test("function test(t, t) { }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "FunctionDeclaration",
      start: {line: 1, column: 0},
      id: {
        type: "Identifier",
        start: {line: 1, column: 9},
        name: "test",
        end: {line: 1, column: 13}
      },
      params: [
        {
          type: "Identifier",
          start: {line: 1, column: 14},
          name: "t",
          end: {line: 1, column: 15}
        },
        {
          type: "Identifier",
          start: {line: 1, column: 17},
          name: "t",
          end: {line: 1, column: 18}
        }
      ],
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 20},
        body: [],
        end: {line: 1, column: 23}
      },
      end: {line: 1, column: 23}
    }
  ],
  end: {line: 1, column: 23}
});

test("(function test(t, t) { })", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "FunctionExpression",
        start: {line: 1, column: 1},
        id: {
          type: "Identifier",
          start: {line: 1, column: 10},
          name: "test",
          end: {line: 1, column: 14}
        },
        params: [
          {
            type: "Identifier",
            start: {line: 1, column: 15},
            name: "t",
            end: {line: 1, column: 16}
          },
          {
            type: "Identifier",
            start: {line: 1, column: 18},
            name: "t",
            end: {line: 1, column: 19}
          }
        ],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 21},
          body: [],
          end: {line: 1, column: 24}
        },
        end: {line: 1, column: 24}
      },
      end: {line: 1, column: 25}
    }
  ],
  end: {line: 1, column: 25}
});

test("function eval() { function inner() { \"use strict\" } }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "FunctionDeclaration",
      start: {line: 1, column: 0},
      id: {
        type: "Identifier",
        start: {line: 1, column: 9},
        name: "eval",
        end: {line: 1, column: 13}
      },
      params: [],
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 16},
        body: [
          {
            type: "FunctionDeclaration",
            start: {line: 1, column: 18},
            id: {
              type: "Identifier",
              start: {line: 1, column: 27},
              name: "inner",
              end: {line: 1, column: 32}
            },
            params: [],
            body: {
              type: "BlockStatement",
              start: {line: 1, column: 35},
              body: [
                {
                  type: "ExpressionStatement",
                  start: {line: 1, column: 37},
                  expression: {
                    type: "Literal",
                    start: {line: 1, column: 37},
                    value: "use strict",
                    end: {line: 1, column: 49}
                  },
                  end: {line: 1, column: 49}
                }
              ],
              end: {line: 1, column: 51}
            },
            end: {line: 1, column: 51}
          }
        ],
        end: {line: 1, column: 53}
      },
      end: {line: 1, column: 53}
    }
  ],
  end: {line: 1, column: 53}
});

test("function hello(a) { sayHi(); }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "FunctionDeclaration",
      start: {line: 1, column: 0},
      id: {
        type: "Identifier",
        start: {line: 1, column: 9},
        name: "hello",
        end: {line: 1, column: 14}
      },
      params: [
        {
          type: "Identifier",
          start: {line: 1, column: 15},
          name: "a",
          end: {line: 1, column: 16}
        }
      ],
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 18},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 20},
            expression: {
              type: "CallExpression",
              start: {line: 1, column: 20},
              callee: {
                type: "Identifier",
                start: {line: 1, column: 20},
                name: "sayHi",
                end: {line: 1, column: 25}
              },
              arguments: [],
              end: {line: 1, column: 27}
            },
            end: {line: 1, column: 28}
          }
        ],
        end: {line: 1, column: 30}
      },
      end: {line: 1, column: 30}
    }
  ],
  end: {line: 1, column: 30}
});

test("function hello(a, b) { sayHi(); }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "FunctionDeclaration",
      start: {line: 1, column: 0},
      id: {
        type: "Identifier",
        start: {line: 1, column: 9},
        name: "hello",
        end: {line: 1, column: 14}
      },
      params: [
        {
          type: "Identifier",
          start: {line: 1, column: 15},
          name: "a",
          end: {line: 1, column: 16}
        },
        {
          type: "Identifier",
          start: {line: 1, column: 18},
          name: "b",
          end: {line: 1, column: 19}
        }
      ],
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 21},
        body: [
          {
            type: "ExpressionStatement",
            start: {line: 1, column: 23},
            expression: {
              type: "CallExpression",
              start: {line: 1, column: 23},
              callee: {
                type: "Identifier",
                start: {line: 1, column: 23},
                name: "sayHi",
                end: {line: 1, column: 28}
              },
              arguments: [],
              end: {line: 1, column: 30}
            },
            end: {line: 1, column: 31}
          }
        ],
        end: {line: 1, column: 33}
      },
      end: {line: 1, column: 33}
    }
  ],
  end: {line: 1, column: 33}
});

test("var hi = function() { sayHi() };", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "hi",
            end: {line: 1, column: 6}
          },
          init: {
            type: "FunctionExpression",
            start: {line: 1, column: 9},
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              start: {line: 1, column: 20},
              body: [
                {
                  type: "ExpressionStatement",
                  start: {line: 1, column: 22},
                  expression: {
                    type: "CallExpression",
                    start: {line: 1, column: 22},
                    callee: {
                      type: "Identifier",
                      start: {line: 1, column: 22},
                      name: "sayHi",
                      end: {line: 1, column: 27}
                    },
                    arguments: [],
                    end: {line: 1, column: 29}
                  },
                  end: {line: 1, column: 29}
                }
              ],
              end: {line: 1, column: 31}
            },
            end: {line: 1, column: 31}
          },
          end: {line: 1, column: 31}
        }
      ],
      kind: "var",
      end: {line: 1, column: 31}
    }
  ],
  end: {line: 1, column: 32}
});

test("var hi = function eval() { };", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "hi",
            end: {line: 1, column: 6}
          },
          init: {
            type: "FunctionExpression",
            start: {line: 1, column: 9},
            id: {
              type: "Identifier",
              start: {line: 1, column: 18},
              name: "eval",
              end: {line: 1, column: 22}
            },
            params: [],
            body: {
              type: "BlockStatement",
              start: {line: 1, column: 25},
              body: [],
              end: {line: 1, column: 28}
            },
            end: {line: 1, column: 28}
          },
          end: {line: 1, column: 28}
        }
      ],
      kind: "var",
      end: {line: 1, column: 28}
    }
  ],
  end: {line: 1, column: 29}
});

test("var hi = function arguments() { };", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "hi",
            end: {line: 1, column: 6}
          },
          init: {
            type: "FunctionExpression",
            start: {line: 1, column: 9},
            id: {
              type: "Identifier",
              start: {line: 1, column: 18},
              name: "arguments",
              end: {line: 1, column: 27}
            },
            params: [],
            body: {
              type: "BlockStatement",
              start: {line: 1, column: 30},
              body: [],
              end: {line: 1, column: 33}
            },
            end: {line: 1, column: 33}
          },
          end: {line: 1, column: 33}
        }
      ],
      kind: "var",
      end: {line: 1, column: 33}
    }
  ],
  end: {line: 1, column: 34}
});

test("var hello = function hi() { sayHi() };", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "hello",
            end: {line: 1, column: 9}
          },
          init: {
            type: "FunctionExpression",
            start: {line: 1, column: 12},
            id: {
              type: "Identifier",
              start: {line: 1, column: 21},
              name: "hi",
              end: {line: 1, column: 23}
            },
            params: [],
            body: {
              type: "BlockStatement",
              start: {line: 1, column: 26},
              body: [
                {
                  type: "ExpressionStatement",
                  start: {line: 1, column: 28},
                  expression: {
                    type: "CallExpression",
                    start: {line: 1, column: 28},
                    callee: {
                      type: "Identifier",
                      start: {line: 1, column: 28},
                      name: "sayHi",
                      end: {line: 1, column: 33}
                    },
                    arguments: [],
                    end: {line: 1, column: 35}
                  },
                  end: {line: 1, column: 35}
                }
              ],
              end: {line: 1, column: 37}
            },
            end: {line: 1, column: 37}
          },
          end: {line: 1, column: 37}
        }
      ],
      kind: "var",
      end: {line: 1, column: 37}
    }
  ],
  end: {line: 1, column: 38}
});

test("(function(){})", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "FunctionExpression",
        start: {line: 1, column: 1},
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 11},
          body: [],
          end: {line: 1, column: 13}
        },
        end: {line: 1, column: 13}
      },
      end: {line: 1, column: 14}
    }
  ],
  end: {line: 1, column: 14}
});

test("{ x\n++y }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [
        {
          type: "ExpressionStatement",
          start: {line: 1, column: 2},
          expression: {
            type: "Identifier",
            start: {line: 1, column: 2},
            name: "x",
            end: {line: 1, column: 3}
          },
          end: {line: 1, column: 3}
        },
        {
          type: "ExpressionStatement",
          start: {line: 2, column: 0},
          expression: {
            type: "UpdateExpression",
            start: {line: 2, column: 0},
            operator: "++",
            prefix: true,
            argument: {
              type: "Identifier",
              start: {line: 2, column: 2},
              name: "y",
              end: {line: 2, column: 3}
            },
            end: {line: 2, column: 3}
          },
          end: {line: 2, column: 3}
        }
      ],
      end: {line: 2, column: 5}
    }
  ],
  end: {line: 2, column: 5}
});

test("{ x\n--y }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [
        {
          type: "ExpressionStatement",
          start: {line: 1, column: 2},
          expression: {
            type: "Identifier",
            start: {line: 1, column: 2},
            name: "x",
            end: {line: 1, column: 3}
          },
          end: {line: 1, column: 3}
        },
        {
          type: "ExpressionStatement",
          start: {line: 2, column: 0},
          expression: {
            type: "UpdateExpression",
            start: {line: 2, column: 0},
            operator: "--",
            prefix: true,
            argument: {
              type: "Identifier",
              start: {line: 2, column: 2},
              name: "y",
              end: {line: 2, column: 3}
            },
            end: {line: 2, column: 3}
          },
          end: {line: 2, column: 3}
        }
      ],
      end: {line: 2, column: 5}
    }
  ],
  end: {line: 2, column: 5}
});

test("var x /* comment */;", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "VariableDeclaration",
      start: {line: 1, column: 0},
      declarations: [
        {
          type: "VariableDeclarator",
          start: {line: 1, column: 4},
          id: {
            type: "Identifier",
            start: {line: 1, column: 4},
            name: "x",
            end: {line: 1, column: 5}
          },
          init: null,
          end: {line: 1, column: 5}
        }
      ],
      kind: "var",
      end: {line: 1, column: 5}
    }
  ],
  end: {line: 1, column: 20}
});

test("{ var x = 14, y = 3\nz; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [
        {
          type: "VariableDeclaration",
          start: {line: 1, column: 2},
          declarations: [
            {
              type: "VariableDeclarator",
              start: {line: 1, column: 6},
              id: {
                type: "Identifier",
                start: {line: 1, column: 6},
                name: "x",
                end: {line: 1, column: 7}
              },
              init: {
                type: "Literal",
                start: {line: 1, column: 10},
                value: 14,
                end: {line: 1, column: 12}
              },
              end: {line: 1, column: 12}
            },
            {
              type: "VariableDeclarator",
              start: {line: 1, column: 14},
              id: {
                type: "Identifier",
                start: {line: 1, column: 14},
                name: "y",
                end: {line: 1, column: 15}
              },
              init: {
                type: "Literal",
                start: {line: 1, column: 18},
                value: 3,
                end: {line: 1, column: 19}
              },
              end: {line: 1, column: 19}
            }
          ],
          kind: "var",
          end: {line: 1, column: 19}
        },
        {
          type: "ExpressionStatement",
          start: {line: 2, column: 0},
          expression: {
            type: "Identifier",
            start: {line: 2, column: 0},
            name: "z",
            end: {line: 2, column: 1}
          },
          end: {line: 2, column: 2}
        }
      ],
      end: {line: 2, column: 4}
    }
  ],
  end: {line: 2, column: 4}
});

test("while (true) { continue\nthere; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 13},
        body: [
          {
            type: "ContinueStatement",
            start: {line: 1, column: 15},
            label: null,
            end: {line: 1, column: 23}
          },
          {
            type: "ExpressionStatement",
            start: {line: 2, column: 0},
            expression: {
              type: "Identifier",
              start: {line: 2, column: 0},
              name: "there",
              end: {line: 2, column: 5}
            },
            end: {line: 2, column: 6}
          }
        ],
        end: {line: 2, column: 8}
      },
      end: {line: 2, column: 8}
    }
  ],
  end: {line: 2, column: 8}
});

test("while (true) { continue // Comment\nthere; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 13},
        body: [
          {
            type: "ContinueStatement",
            start: {line: 1, column: 15},
            label: null,
            end: {line: 1, column: 23}
          },
          {
            type: "ExpressionStatement",
            start: {line: 2, column: 0},
            expression: {
              type: "Identifier",
              start: {line: 2, column: 0},
              name: "there",
              end: {line: 2, column: 5}
            },
            end: {line: 2, column: 6}
          }
        ],
        end: {line: 2, column: 8}
      },
      end: {line: 2, column: 8}
    }
  ],
  end: {line: 2, column: 8}
});

test("while (true) { continue /* Multiline\nComment */there; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 13},
        body: [
          {
            type: "ContinueStatement",
            start: {line: 1, column: 15},
            label: null,
            end: {line: 1, column: 23}
          },
          {
            type: "ExpressionStatement",
            start: {line: 2, column: 10},
            expression: {
              type: "Identifier",
              start: {line: 2, column: 10},
              name: "there",
              end: {line: 2, column: 15}
            },
            end: {line: 2, column: 16}
          }
        ],
        end: {line: 2, column: 18}
      },
      end: {line: 2, column: 18}
    }
  ],
  end: {line: 2, column: 18}
});

test("while (true) { break\nthere; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 13},
        body: [
          {
            type: "BreakStatement",
            start: {line: 1, column: 15},
            label: null,
            end: {line: 1, column: 20}
          },
          {
            type: "ExpressionStatement",
            start: {line: 2, column: 0},
            expression: {
              type: "Identifier",
              start: {line: 2, column: 0},
              name: "there",
              end: {line: 2, column: 5}
            },
            end: {line: 2, column: 6}
          }
        ],
        end: {line: 2, column: 8}
      },
      end: {line: 2, column: 8}
    }
  ],
  end: {line: 2, column: 8}
});

test("while (true) { break // Comment\nthere; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 13},
        body: [
          {
            type: "BreakStatement",
            start: {line: 1, column: 15},
            label: null,
            end: {line: 1, column: 20}
          },
          {
            type: "ExpressionStatement",
            start: {line: 2, column: 0},
            expression: {
              type: "Identifier",
              start: {line: 2, column: 0},
              name: "there",
              end: {line: 2, column: 5}
            },
            end: {line: 2, column: 6}
          }
        ],
        end: {line: 2, column: 8}
      },
      end: {line: 2, column: 8}
    }
  ],
  end: {line: 2, column: 8}
});

test("while (true) { break /* Multiline\nComment */there; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "WhileStatement",
      start: {line: 1, column: 0},
      test: {
        type: "Literal",
        start: {line: 1, column: 7},
        value: true,
        end: {line: 1, column: 11}
      },
      body: {
        type: "BlockStatement",
        start: {line: 1, column: 13},
        body: [
          {
            type: "BreakStatement",
            start: {line: 1, column: 15},
            label: null,
            end: {line: 1, column: 20}
          },
          {
            type: "ExpressionStatement",
            start: {line: 2, column: 10},
            expression: {
              type: "Identifier",
              start: {line: 2, column: 10},
              name: "there",
              end: {line: 2, column: 15}
            },
            end: {line: 2, column: 16}
          }
        ],
        end: {line: 2, column: 18}
      },
      end: {line: 2, column: 18}
    }
  ],
  end: {line: 2, column: 18}
});

test("(function(){ return\nx; })", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "FunctionExpression",
        start: {line: 1, column: 1},
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 11},
          body: [
            {
              type: "ReturnStatement",
              start: {line: 1, column: 13},
              argument: null,
              end: {line: 1, column: 19}
            },
            {
              type: "ExpressionStatement",
              start: {line: 2, column: 0},
              expression: {
                type: "Identifier",
                start: {line: 2, column: 0},
                name: "x",
                end: {line: 2, column: 1}
              },
              end: {line: 2, column: 2}
            }
          ],
          end: {line: 2, column: 4}
        },
        end: {line: 2, column: 4}
      },
      end: {line: 2, column: 5}
    }
  ],
  end: {line: 2, column: 5}
});

test("(function(){ return // Comment\nx; })", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "FunctionExpression",
        start: {line: 1, column: 1},
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 11},
          body: [
            {
              type: "ReturnStatement",
              start: {line: 1, column: 13},
              argument: null,
              end: {line: 1, column: 19}
            },
            {
              type: "ExpressionStatement",
              start: {line: 2, column: 0},
              expression: {
                type: "Identifier",
                start: {line: 2, column: 0},
                name: "x",
                end: {line: 2, column: 1}
              },
              end: {line: 2, column: 2}
            }
          ],
          end: {line: 2, column: 4}
        },
        end: {line: 2, column: 4}
      },
      end: {line: 2, column: 5}
    }
  ],
  end: {line: 2, column: 5}
});

test("(function(){ return/* Multiline\nComment */x; })", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "ExpressionStatement",
      start: {line: 1, column: 0},
      expression: {
        type: "FunctionExpression",
        start: {line: 1, column: 1},
        id: null,
        params: [],
        body: {
          type: "BlockStatement",
          start: {line: 1, column: 11},
          body: [
            {
              type: "ReturnStatement",
              start: {line: 1, column: 13},
              argument: null,
              end: {line: 1, column: 19}
            },
            {
              type: "ExpressionStatement",
              start: {line: 2, column: 10},
              expression: {
                type: "Identifier",
                start: {line: 2, column: 10},
                name: "x",
                end: {line: 2, column: 11}
              },
              end: {line: 2, column: 12}
            }
          ],
          end: {line: 2, column: 14}
        },
        end: {line: 2, column: 14}
      },
      end: {line: 2, column: 15}
    }
  ],
  end: {line: 2, column: 15}
});

test("{ throw error\nerror; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [
        {
          type: "ThrowStatement",
          start: {line: 1, column: 2},
          argument: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "error",
            end: {line: 1, column: 13}
          },
          end: {line: 1, column: 13}
        },
        {
          type: "ExpressionStatement",
          start: {line: 2, column: 0},
          expression: {
            type: "Identifier",
            start: {line: 2, column: 0},
            name: "error",
            end: {line: 2, column: 5}
          },
          end: {line: 2, column: 6}
        }
      ],
      end: {line: 2, column: 8}
    }
  ],
  end: {line: 2, column: 8}
});

test("{ throw error// Comment\nerror; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [
        {
          type: "ThrowStatement",
          start: {line: 1, column: 2},
          argument: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "error",
            end: {line: 1, column: 13}
          },
          end: {line: 1, column: 13}
        },
        {
          type: "ExpressionStatement",
          start: {line: 2, column: 0},
          expression: {
            type: "Identifier",
            start: {line: 2, column: 0},
            name: "error",
            end: {line: 2, column: 5}
          },
          end: {line: 2, column: 6}
        }
      ],
      end: {line: 2, column: 8}
    }
  ],
  end: {line: 2, column: 8}
});

test("{ throw error/* Multiline\nComment */error; }", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [
    {
      type: "BlockStatement",
      start: {line: 1, column: 0},
      body: [
        {
          type: "ThrowStatement",
          start: {line: 1, column: 2},
          argument: {
            type: "Identifier",
            start: {line: 1, column: 8},
            name: "error",
            end: {line: 1, column: 13}
          },
          end: {line: 1, column: 13}
        },
        {
          type: "ExpressionStatement",
          start: {line: 2, column: 10},
          expression: {
            type: "Identifier",
            start: {line: 2, column: 10},
            name: "error",
            end: {line: 2, column: 15}
          },
          end: {line: 2, column: 16}
        }
      ],
      end: {line: 2, column: 18}
    }
  ],
  end: {line: 2, column: 18}
});

test("", {
  type: "Program",
  start: {line: 1, column: 0},
  body: [],
  end: {line: 1, column: 0}
});

// Failure tests

testFail("{",
         "Unexpected token (1:1)");

testFail("}",
         "Unexpected token (1:0)");

testFail("3ea",
         "Invalid number (1:0)");

testFail("3in []",
         "Identifier directly after number (1:1)");

testFail("3e",
         "Invalid number (1:0)");

testFail("3e+",
         "Invalid number (1:0)");

testFail("3e-",
         "Invalid number (1:0)");

testFail("3x",
         "Identifier directly after number (1:1)");

testFail("3x0",
         "Identifier directly after number (1:1)");

testFail("0x",
         "Expected hexadecimal number (undefined:undefined)");

testFail("09",
         "Invalid number (1:0)");

testFail("018",
         "Invalid number (1:0)");

testFail("01a",
         "Identifier directly after number (1:2)");

testFail("3in[]",
         "Identifier directly after number (1:1)");

testFail("0x3in[]",
         "Identifier directly after number (1:3)");

testFail("\"Hello\nWorld\"",
         "Unterminated string constant (1:0)");

testFail("x\\",
         "Expecting Unicode escape sequence \\uXXXX (1:2)");

testFail("x\\u005c",
         "Invalid Unicode escape (1:3)");

testFail("x\\u002a",
         "Invalid Unicode escape (1:3)");

testFail("var x = /(s/g",
         "Invalid regular expression: /(s/: Unterminated group");

testFail("/",
         "Unterminated regular expression (1:1)");

testFail("/test",
         "Unterminated regular expression (1:1)");

testFail("var x = /[a-z]/\\ux",
         "Bad character escape sequence (1:8)");

testFail("3 = 4",
         "Assigning to rvalue (1:0)");

testFail("func() = 4",
         "Assigning to rvalue (1:0)");

testFail("(1 + 1) = 10",
         "Assigning to rvalue (1:1)");

testFail("1++",
         "Assigning to rvalue (1:0)");

testFail("1--",
         "Assigning to rvalue (1:0)");

testFail("++1",
         "Assigning to rvalue (1:2)");

testFail("--1",
         "Assigning to rvalue (1:2)");

testFail("for((1 + 1) in list) process(x);",
         "Assigning to rvalue (1:5)");

testFail("[",
         "Unexpected token (1:1)");

testFail("[,",
         "Unexpected token (1:2)");

testFail("1 + {",
         "Unexpected token (1:5)");

testFail("1 + { t:t ",
         "Unexpected token (1:10)");

testFail("1 + { t:t,",
         "Unexpected token (1:10)");

testFail("var x = /\n/",
         "Unterminated regular expression (1:9)");

testFail("var x = \"\n",
         "Unterminated string constant (1:8)");

testFail("var if = 42",
         "Unexpected token (1:4)");

testFail("i + 2 = 42",
         "Assigning to rvalue (1:0)");

testFail("+i = 42",
         "Assigning to rvalue (1:0)");

testFail("1 + (",
         "Unexpected token (1:5)");

testFail("\n\n\n{",
         "Unexpected token (4:1)");

testFail("\n/* Some multiline\ncomment */\n)",
         "Unexpected token (4:0)");

testFail("{ set 1 }",
         "Unexpected token (1:6)");

testFail("{ get 2 }",
         "Unexpected token (1:6)");

testFail("({ set: s(if) { } })",
         "Unexpected token (1:10)");

testFail("({ set s(.) { } })",
         "Unexpected token (1:9)");

testFail("({ set: s() { } })",
         "Unexpected token (1:12)");

testFail("({ set: s(a, b) { } })",
         "Unexpected token (1:16)");

testFail("({ get: g(d) { } })",
         "Unexpected token (1:13)");

testFail("({ get i() { }, i: 42 })",
         "Redefinition of property (1:16)");

testFail("({ i: 42, get i() { } })",
         "Redefinition of property (1:14)");

testFail("({ set i(x) { }, i: 42 })",
         "Redefinition of property (1:17)");

testFail("({ i: 42, set i(x) { } })",
         "Redefinition of property (1:14)");

testFail("({ get i() { }, get i() { } })",
         "Redefinition of property (1:20)");

testFail("({ set i(x) { }, set i(x) { } })",
         "Redefinition of property (1:21)");

testFail("function t(if) { }",
         "Unexpected token (1:11)");

testFail("function t(true) { }",
         "Unexpected token (1:11)");

testFail("function t(false) { }",
         "Unexpected token (1:11)");

testFail("function t(null) { }",
         "Unexpected token (1:11)");

testFail("function null() { }",
         "Unexpected token (1:9)");

testFail("function true() { }",
         "Unexpected token (1:9)");

testFail("function false() { }",
         "Unexpected token (1:9)");

testFail("function if() { }",
         "Unexpected token (1:9)");

testFail("a b;",
         "Unexpected token (1:2)");

testFail("if.a;",
         "Unexpected token (1:2)");

testFail("a if;",
         "Unexpected token (1:2)");

testFail("a class;",
         "Unexpected token (1:2)");

testFail("break\n",
         "Unsyntactic break (1:0)");

testFail("break 1;",
         "Unexpected token (1:6)");

testFail("continue\n",
         "Unsyntactic continue (1:0)");

testFail("continue 2;",
         "Unexpected token (1:9)");

testFail("throw",
         "Unexpected token (1:5)");

testFail("throw;",
         "Unexpected token (1:5)");

testFail("throw\n",
         "Unexpected token (2:0)");

testFail("for (var i, i2 in {});",
         "Unexpected token (1:15)");

testFail("for ((i in {}));",
         "Unexpected token (1:14)");

testFail("for (i + 1 in {});",
         "Assigning to rvalue (1:5)");

testFail("for (+i in {});",
         "Assigning to rvalue (1:5)");

testFail("if(false)",
         "Unexpected token (1:9)");

testFail("if(false) doThis(); else",
         "Unexpected token (1:24)");

testFail("do",
         "Unexpected token (1:2)");

testFail("while(false)",
         "Unexpected token (1:12)");

testFail("for(;;)",
         "Unexpected token (1:7)");

testFail("with(x)",
         "Unexpected token (1:7)");

testFail("try { }",
         "Missing catch or finally clause (1:0)");

testFail("‿ = 10",
         "Unexpected character '‿' (1:0)");

testFail("if(true) let a = 1;",
         "Unexpected token (1:13)");

testFail("switch (c) { default: default: }",
         "Multiple default clauses (1:22)");

testFail("new X().\"s\"",
         "Unexpected token (1:8)");

testFail("/*",
         "Unterminated comment (1:0)");

testFail("/*\n\n\n",
         "Unterminated comment (1:0)");

testFail("/**",
         "Unterminated comment (1:0)");

testFail("/*\n\n*",
         "Unterminated comment (1:0)");

testFail("/*hello",
         "Unterminated comment (1:0)");

testFail("/*hello  *",
         "Unterminated comment (1:0)");

testFail("\n]",
         "Unexpected token (2:0)");

testFail("\r]",
         "Unexpected token (2:0)");

testFail("\r\n]",
         "Unexpected token (2:0)");

testFail("\n\r]",
         "Unexpected token (3:0)");

testFail("//\r\n]",
         "Unexpected token (2:0)");

testFail("//\n\r]",
         "Unexpected token (3:0)");

testFail("/a\\\n/",
         "Unterminated regular expression (1:1)");

testFail("//\r \n]",
         "Unexpected token (3:0)");

testFail("/*\r\n*/]",
         "Unexpected token (2:2)");

testFail("/*\n\r*/]",
         "Unexpected token (3:2)");

testFail("/*\r \n*/]",
         "Unexpected token (3:2)");

testFail("\\\\",
         "Expecting Unicode escape sequence \\uXXXX (1:1)");

testFail("\\u005c",
         "Invalid Unicode escape (1:2)");

testFail("\\x",
         "Expecting Unicode escape sequence \\uXXXX (1:1)");

testFail("\\u0000",
         "Invalid Unicode escape (1:2)");

testFail("‌ = []",
         "Unexpected character '‌' (1:0)");

testFail("‍ = []",
         "Unexpected character '‍' (1:0)");

testFail("\"\\",
         "Unterminated string constant (1:0)");

testFail("\"\\u",
         "Bad character escape sequence (1:0)");

testFail("return",
         "'return' outside of function (1:0)");

testFail("break",
         "Unsyntactic break (1:0)");

testFail("continue",
         "Unsyntactic continue (1:0)");

testFail("switch (x) { default: continue; }",
         "Unsyntactic continue (1:22)");

testFail("do { x } *",
         "Unexpected token (1:9)");

testFail("while (true) { break x; }",
         "Unsyntactic break (1:15)");

testFail("while (true) { continue x; }",
         "Unsyntactic continue (1:15)");

testFail("x: while (true) { (function () { break x; }); }",
         "Unsyntactic break (1:33)");

testFail("x: while (true) { (function () { continue x; }); }",
         "Unsyntactic continue (1:33)");

testFail("x: while (true) { (function () { break; }); }",
         "Unsyntactic break (1:33)");

testFail("x: while (true) { (function () { continue; }); }",
         "Unsyntactic continue (1:33)");

testFail("x: while (true) { x: while (true) { } }",
         "Label 'x' is already declared (1:18)");

testFail("(function () { 'use strict'; delete i; }())",
         "Deleting local variable in strict mode (1:29)");

testFail("(function () { 'use strict'; with (i); }())",
         "'with' in strict mode (1:29)");

testFail("function hello() {'use strict'; ({ i: 42, i: 42 }) }",
         "Redefinition of property (1:42)");

testFail("function hello() {'use strict'; ({ hasOwnProperty: 42, hasOwnProperty: 42 }) }",
         "Redefinition of property (1:55)");

testFail("function hello() {'use strict'; var eval = 10; }",
         "Binding eval in strict mode (1:36)");

testFail("function hello() {'use strict'; var arguments = 10; }",
         "Binding arguments in strict mode (1:36)");

testFail("function hello() {'use strict'; try { } catch (eval) { } }",
         "Binding eval in strict mode (1:47)");

testFail("function hello() {'use strict'; try { } catch (arguments) { } }",
         "Binding arguments in strict mode (1:47)");

testFail("function hello() {'use strict'; eval = 10; }",
         "Assigning to eval in strict mode (1:32)");

testFail("function hello() {'use strict'; arguments = 10; }",
         "Assigning to arguments in strict mode (1:32)");

testFail("function hello() {'use strict'; ++eval; }",
         "Assigning to eval in strict mode (1:34)");

testFail("function hello() {'use strict'; --eval; }",
         "Assigning to eval in strict mode (1:34)");

testFail("function hello() {'use strict'; ++arguments; }",
         "Assigning to arguments in strict mode (1:34)");

testFail("function hello() {'use strict'; --arguments; }",
         "Assigning to arguments in strict mode (1:34)");

testFail("function hello() {'use strict'; eval++; }",
         "Assigning to eval in strict mode (1:32)");

testFail("function hello() {'use strict'; eval--; }",
         "Assigning to eval in strict mode (1:32)");

testFail("function hello() {'use strict'; arguments++; }",
         "Assigning to arguments in strict mode (1:32)");

testFail("function hello() {'use strict'; arguments--; }",
         "Assigning to arguments in strict mode (1:32)");

testFail("function hello() {'use strict'; function eval() { } }",
         "Defining 'eval' in strict mode (1:41)");

testFail("function hello() {'use strict'; function arguments() { } }",
         "Defining 'arguments' in strict mode (1:41)");

testFail("function eval() {'use strict'; }",
         "Defining 'eval' in strict mode (1:9)");

testFail("function arguments() {'use strict'; }",
         "Defining 'arguments' in strict mode (1:9)");

testFail("function hello() {'use strict'; (function eval() { }()) }",
         "Defining 'eval' in strict mode (1:42)");

testFail("function hello() {'use strict'; (function arguments() { }()) }",
         "Defining 'arguments' in strict mode (1:42)");

testFail("(function eval() {'use strict'; })()",
         "Defining 'eval' in strict mode (1:10)");

testFail("(function arguments() {'use strict'; })()",
         "Defining 'arguments' in strict mode (1:10)");

testFail("function hello() {'use strict'; ({ s: function eval() { } }); }",
         "Defining 'eval' in strict mode (1:47)");

testFail("(function package() {'use strict'; })()",
         "Defining 'package' in strict mode (1:10)");

testFail("function hello() {'use strict'; ({ i: 10, set s(eval) { } }); }",
         "Defining 'eval' in strict mode (1:48)");

testFail("function hello() {'use strict'; ({ set s(eval) { } }); }",
         "Defining 'eval' in strict mode (1:41)");

testFail("function hello() {'use strict'; ({ s: function s(eval) { } }); }",
         "Defining 'eval' in strict mode (1:49)");

testFail("function hello(eval) {'use strict';}",
         "Defining 'eval' in strict mode (1:15)");

testFail("function hello(arguments) {'use strict';}",
         "Defining 'arguments' in strict mode (1:15)");

testFail("function hello() { 'use strict'; function inner(eval) {} }",
         "Defining 'eval' in strict mode (1:48)");

testFail("function hello() { 'use strict'; function inner(arguments) {} }",
         "Defining 'arguments' in strict mode (1:48)");

testFail("function hello() { 'use strict'; \"\\1\"; }",
         "Octal literal in strict mode (1:34)");

testFail("function hello() { 'use strict'; 021; }",
         "Invalid number (1:33)");

testFail("function hello() { 'use strict'; ({ \"\\1\": 42 }); }",
         "Octal literal in strict mode (1:37)");

testFail("function hello() { 'use strict'; ({ 021: 42 }); }",
         "Invalid number (1:36)");

testFail("function hello() { \"use strict\"; function inner() { \"octal directive\\1\"; } }",
         "Octal literal in strict mode (1:68)");

testFail("function hello() { \"use strict\"; var implements; }",
         "The keyword 'implements' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var interface; }",
         "The keyword 'interface' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var package; }",
         "The keyword 'package' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var private; }",
         "The keyword 'private' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var protected; }",
         "The keyword 'protected' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var public; }",
         "The keyword 'public' is reserved (1:37)");

testFail("function hello() { \"use strict\"; var static; }",
         "The keyword 'static' is reserved (1:37)");

testFail("function hello(static) { \"use strict\"; }",
         "Defining 'static' in strict mode (1:15)");

testFail("function static() { \"use strict\"; }",
         "Defining 'static' in strict mode (1:9)");

testFail("\"use strict\"; function static() { }",
         "The keyword 'static' is reserved (1:23)");

testFail("function a(t, t) { \"use strict\"; }",
         "Argument name clash in strict mode (1:14)");

testFail("function a(eval) { \"use strict\"; }",
         "Defining 'eval' in strict mode (1:11)");

testFail("function a(package) { \"use strict\"; }",
         "Defining 'package' in strict mode (1:11)");

testFail("function a() { \"use strict\"; function b(t, t) { }; }",
         "Argument name clash in strict mode (1:43)");

testFail("(function a(t, t) { \"use strict\"; })",
         "Argument name clash in strict mode (1:15)");

testFail("function a() { \"use strict\"; (function b(t, t) { }); }",
         "Argument name clash in strict mode (1:44)");

testFail("(function a(eval) { \"use strict\"; })",
         "Defining 'eval' in strict mode (1:12)");

testFail("(function a(package) { \"use strict\"; })",
         "Defining 'package' in strict mode (1:12)");
