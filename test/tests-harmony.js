/*
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2011 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2011 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2014 Ingvar Stepanyan <me@rreverser.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

if (typeof exports != "undefined") {
  var test = require("./driver.js").test;
  var testFail = require("./driver.js").testFail;
  var testAssert = require("./driver.js").testAssert;
}

/*
  Tests below were automatically converted from https://github.com/ariya/esprima/blob/2bb17ef9a45c88e82d72c2c61b7b7af93caef028/test/harmonytest.js.

  Manually fixed locations for:
   - parenthesized expressions (include brackets into expression's location)
   - expression statements (excluded spaces after statement's semicolon)
   - arrow and method functions (included arguments into function's location)
   - template elements (excluded '`', '${' and '}' from element's location)
*/

// ES6 Unicode Code Point Escape Sequence

test("\"\\u{714E}\\u{8336}\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: "煎茶",
      raw: "\"\\u{714E}\\u{8336}\"",
      range: [0, 18],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 18}
      }
    },
    range: [0, 18],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  range: [0, 18],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("\"\\u{20BB7}\\u{91CE}\\u{5BB6}\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: "𠮷野家",
      raw: "\"\\u{20BB7}\\u{91CE}\\u{5BB6}\"",
      range: [0, 27],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 27}
      }
    },
    range: [0, 27],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  range: [0, 27],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Numeric Literal

test("00", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "00",
      range: [0, 2],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 2}
      }
    },
    range: [0, 2],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 2}
    }
  }],
  range: [0, 2],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 2}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0o0", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "0o0",
      range: [0, 3],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    range: [0, 3],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  range: [0, 3],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function test() {'use strict'; 0o0; }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test",
      range: [9, 13],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 13}
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
            type: "Literal",
            value: "use strict",
            raw: "'use strict'",
            range: [17, 29],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 29}
            }
          },
          range: [17, 30],
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 30}
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: 0,
            raw: "0o0",
            range: [31, 34],
            loc: {
              start: {line: 1, column: 31},
              end: {line: 1, column: 34}
            }
          },
          range: [31, 35],
          loc: {
            start: {line: 1, column: 31},
            end: {line: 1, column: 35}
          }
        }
      ],
      range: [16, 37],
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 37}
      }
    },
    rest: null,
    generator: false,
    expression: false,
    range: [0, 37],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 37}
    }
  }],
  range: [0, 37],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 37}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0o2", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 2,
      raw: "0o2",
      range: [0, 3],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    range: [0, 3],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  range: [0, 3],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0o12", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 10,
      raw: "0o12",
      range: [0, 4],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    range: [0, 4],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  range: [0, 4],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0O0", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "0O0",
      range: [0, 3],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    range: [0, 3],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  range: [0, 3],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function test() {'use strict'; 0O0; }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test",
      range: [9, 13],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 13}
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
            type: "Literal",
            value: "use strict",
            raw: "'use strict'",
            range: [17, 29],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 29}
            }
          },
          range: [17, 30],
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 30}
          }
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: 0,
            raw: "0O0",
            range: [31, 34],
            loc: {
              start: {line: 1, column: 31},
              end: {line: 1, column: 34}
            }
          },
          range: [31, 35],
          loc: {
            start: {line: 1, column: 31},
            end: {line: 1, column: 35}
          }
        }
      ],
      range: [16, 37],
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 37}
      }
    },
    rest: null,
    generator: false,
    expression: false,
    range: [0, 37],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 37}
    }
  }],
  range: [0, 37],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 37}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0O2", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 2,
      raw: "0O2",
      range: [0, 3],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    range: [0, 3],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  range: [0, 3],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0O12", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 10,
      raw: "0O12",
      range: [0, 4],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    range: [0, 4],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  range: [0, 4],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0b0", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "0b0",
      range: [0, 3],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    range: [0, 3],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  range: [0, 3],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0b1", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 1,
      raw: "0b1",
      range: [0, 3],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    range: [0, 3],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  range: [0, 3],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0b10", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 2,
      raw: "0b10",
      range: [0, 4],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    range: [0, 4],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  range: [0, 4],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0B0", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 0,
      raw: "0B0",
      range: [0, 3],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    range: [0, 3],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  range: [0, 3],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0B1", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 1,
      raw: "0B1",
      range: [0, 3],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    range: [0, 3],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  range: [0, 3],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("0B10", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "Literal",
      value: 2,
      raw: "0B10",
      range: [0, 4],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    range: [0, 4],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  range: [0, 4],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6 Template Strings

test("`42`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "42", cooked: "42"},
        tail: true,
        range: [1, 3],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 3}
        }
      }],
      expressions: [],
      range: [0, 4],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 4}
      }
    },
    range: [0, 4],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 4}
    }
  }],
  range: [0, 4],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("raw`42`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TaggedTemplateExpression",
      tag: {
        type: "Identifier",
        name: "raw",
        range: [0, 3],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 3}
        }
      },
      quasi: {
        type: "TemplateLiteral",
        quasis: [{
          type: "TemplateElement",
          value: {raw: "42", cooked: "42"},
          tail: true,
          range: [4, 6],
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 6}
          }
        }],
        expressions: [],
        range: [3, 7],
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 7}
        }
      },
      range: [0, 7],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 7}
      }
    },
    range: [0, 7],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 7}
    }
  }],
  range: [0, 7],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 7}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("raw`hello ${name}`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TaggedTemplateExpression",
      tag: {
        type: "Identifier",
        name: "raw",
        range: [0, 3],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 3}
        }
      },
      quasi: {
        type: "TemplateLiteral",
        quasis: [
          {
            type: "TemplateElement",
            value: {raw: "hello ", cooked: "hello "},
            tail: false,
            range: [4, 10],
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 10}
            }
          },
          {
            type: "TemplateElement",
            value: {raw: "", cooked: ""},
            tail: true,
            range: [17, 17],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 17}
            }
          }
        ],
        expressions: [{
          type: "Identifier",
          name: "name",
          range: [12, 16],
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 16}
          }
        }],
        range: [3, 18],
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 18}
        }
      },
      range: [0, 18],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 18}
      }
    },
    range: [0, 18],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  range: [0, 18],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`$`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "$", cooked: "$"},
        tail: true,
        range: [1, 2],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      expressions: [],
      range: [0, 3],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 3}
      }
    },
    range: [0, 3],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 3}
    }
  }],
  range: [0, 3],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 3}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`\\n\\r\\b\\v\\t\\f\\\n\\\r\n`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "\\n\\r\\b\\v\\t\\f\\\n\\\r\n", cooked: "\n\r\b\u000b\t\f"},
        tail: true,
        range: [1, 18],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 3, column: 0}
        }
      }],
      expressions: [],
      range: [0, 19],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 3, column: 1}
      }
    },
    range: [0, 19],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 3, column: 1}
    }
  }],
  range: [0, 19],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 3, column: 1}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`\n\r\n`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "\n\r\n", cooked: "\n\n"},
        tail: true,
        range: [1, 4],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 3, column: 0}
        }
      }],
      expressions: [],
      range: [0, 5],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 3, column: 1}
      }
    },
    range: [0, 5],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 3, column: 1}
    }
  }],
  range: [0, 5],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 3, column: 1}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("`\\u{000042}\\u0042\\x42u0\\102\\A`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "TemplateLiteral",
      quasis: [{
        type: "TemplateElement",
        value: {raw: "\\u{000042}\\u0042\\x42u0\\102\\A", cooked: "BBBu0BA"},
        tail: true,
        range: [1, 29],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 29}
        }
      }],
      expressions: [],
      range: [0, 30],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 30}
      }
    },
    range: [0, 30],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 30}
    }
  }],
  range: [0, 30],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 30}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("new raw`42`", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "NewExpression",
      callee: {
        type: "TaggedTemplateExpression",
        tag: {
          type: "Identifier",
          name: "raw",
          range: [4, 7],
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 7}
          }
        },
        quasi: {
          type: "TemplateLiteral",
          quasis: [{
            type: "TemplateElement",
            value: {raw: "42", cooked: "42"},
            tail: true,
            range: [8, 10],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 10}
            }
          }],
          expressions: [],
          range: [7, 11],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 11}
          }
        },
        range: [4, 11],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 11}
        }
      },
      arguments: [],
      range: [0, 11],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 11}
      }
    },
    range: [0, 11],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 11}
    }
  }],
  range: [0, 11],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 11}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Switch Case Declaration

test("switch (answer) { case 42: let t = 42; break; }", {
  type: "Program",
  body: [{
    type: "SwitchStatement",
    discriminant: {
      type: "Identifier",
      name: "answer",
      range: [8, 14],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 14}
      }
    },
    cases: [{
      type: "SwitchCase",
      test: {
        type: "Literal",
        value: 42,
        raw: "42",
        range: [23, 25],
        loc: {
          start: {line: 1, column: 23},
          end: {line: 1, column: 25}
        }
      },
      consequent: [
        {
          type: "VariableDeclaration",
          declarations: [{
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "t",
              range: [31, 32],
              loc: {
                start: {line: 1, column: 31},
                end: {line: 1, column: 32}
              }
            },
            init: {
              type: "Literal",
              value: 42,
              raw: "42",
              range: [35, 37],
              loc: {
                start: {line: 1, column: 35},
                end: {line: 1, column: 37}
              }
            },
            range: [31, 37],
            loc: {
              start: {line: 1, column: 31},
              end: {line: 1, column: 37}
            }
          }],
          kind: "let",
          range: [27, 38],
          loc: {
            start: {line: 1, column: 27},
            end: {line: 1, column: 38}
          }
        },
        {
          type: "BreakStatement",
          label: null,
          range: [39, 45],
          loc: {
            start: {line: 1, column: 39},
            end: {line: 1, column: 45}
          }
        }
      ],
      range: [18, 45],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 45}
      }
    }],
    range: [0, 47],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 47}
    }
  }],
  range: [0, 47],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 47}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Arrow Function

test("() => \"test\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [],
      defaults: [],
      body: {
        type: "Literal",
        value: "test",
        raw: "\"test\"",
        range: [6, 12],
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 12}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 12],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => \"test\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      defaults: [],
      body: {
        type: "Literal",
        value: "test",
        raw: "\"test\"",
        range: [5, 11],
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 11}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 11],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 11}
      }
    },
    range: [0, 11],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 11}
    }
  }],
  range: [0, 11],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 11}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(e) => \"test\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        range: [1, 2],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      defaults: [],
      body: {
        type: "Literal",
        value: "test",
        raw: "\"test\"",
        range: [7, 13],
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 13}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 13],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    range: [0, 13],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  range: [0, 13],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, b) => \"test\"", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "a",
          range: [1, 2],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 2}
          }
        },
        {
          type: "Identifier",
          name: "b",
          range: [4, 5],
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 5}
          }
        }
      ],
      defaults: [],
      body: {
        type: "Literal",
        value: "test",
        raw: "\"test\"",
        range: [10, 16],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 16}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 16],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 16}
      }
    },
    range: [0, 16],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 16}
    }
  }],
  range: [0, 16],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 16}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => { 42; }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: 42,
            raw: "42",
            range: [7, 9],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 9}
            }
          },
          range: [7, 10],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 10}
          }
        }],
        range: [5, 12],
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 12}
        }
      },
      rest: null,
      generator: false,
      expression: false,
      range: [0, 12],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => ({ property: 42 })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      defaults: [],
      body: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "property",
            range: [8, 16],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 16}
            }
          },
          value: {
            type: "Literal",
            value: 42,
            raw: "42",
            range: [18, 20],
            loc: {
              start: {line: 1, column: 18},
              end: {line: 1, column: 20}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [8, 20],
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 20}
          }
        }],
        range: [5, 23],
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 23}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 23],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 23}
      }
    },
    range: [0, 23],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 23}
    }
  }],
  range: [0, 23],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 23}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => { label: 42 }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "LabeledStatement",
          label: {
            type: "Identifier",
            name: "label",
            range: [7, 12],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 12}
            }
          },
          body: {
            type: "ExpressionStatement",
            expression: {
              type: "Literal",
              value: 42,
              raw: "42",
              range: [14, 16],
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 16}
              }
            },
            range: [14, 16],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 16}
            }
          },
          range: [7, 16],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 16}
          }
        }],
        range: [5, 18],
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 18}
        }
      },
      rest: null,
      generator: false,
      expression: false,
      range: [0, 18],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 18}
      }
    },
    range: [0, 18],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  range: [0, 18],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, b) => { 42; }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "a",
          range: [1, 2],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 2}
          }
        },
        {
          type: "Identifier",
          name: "b",
          range: [4, 5],
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 5}
          }
        }
      ],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "Literal",
            value: 42,
            raw: "42",
            range: [12, 14],
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 14}
            }
          },
          range: [12, 15],
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 15}
          }
        }],
        range: [10, 17],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 17}
        }
      },
      rest: null,
      generator: false,
      expression: false,
      range: [0, 17],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("([a, , b]) => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [2, 3],
            loc: {
              start: {line: 1, column: 2},
              end: {line: 1, column: 3}
            }
          },
          null,
          {
            type: "Identifier",
            name: "b",
            range: [7, 8],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          }
        ],
        range: [1, 9],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 9}
        }
      }],
      defaults: [],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        range: [14, 16],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 16}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 16],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 16}
      }
    },
    range: [0, 16],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 16}
    }
  }],
  range: [0, 16],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 16}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("([a.a]) => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "ArrayPattern",
        elements: [{
          type: "MemberExpression",
          computed: false,
          object: {
            type: "Identifier",
            name: "a",
            range: [2, 3],
            loc: {
              start: {line: 1, column: 2},
              end: {line: 1, column: 3}
            }
          },
          property: {
            type: "Identifier",
            name: "a",
            range: [4, 5],
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 5}
            }
          },
          range: [2, 5],
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 5}
          }
        }],
        range: [1, 6],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 6}
        }
      }],
      defaults: [],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        range: [11, 13],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 13}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 13],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    range: [0, 13],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  range: [0, 13],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(x=1) => x * x", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "x",
        range: [1, 2],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      defaults: [{
        type: "Literal",
        value: 1,
        raw: "1",
        range: [3, 4],
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 4}
        }
      }],
      body: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "x",
          range: [9, 10],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 10}
          }
        },
        right: {
          type: "Identifier",
          name: "x",
          range: [13, 14],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        range: [9, 14],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 14}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 14],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 14}
      }
    },
    range: [0, 14],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  range: [0, 14],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("eval => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "eval",
        range: [0, 4],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 4}
        }
      }],
      defaults: [],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        range: [8, 10],
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 10}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 10],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 10}
      }
    },
    range: [0, 10],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 10}
    }
  }],
  range: [0, 10],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 10}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("arguments => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "arguments",
        range: [0, 9],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 9}
        }
      }],
      defaults: [],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        range: [13, 15],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 15}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 15],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 15}
      }
    },
    range: [0, 15],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  range: [0, 15],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a) => 00", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "a",
        range: [1, 2],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      defaults: [],
      body: {
        type: "Literal",
        value: 0,
        raw: "00",
        range: [7, 9],
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 9}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 9],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 9}
      }
    },
    range: [0, 9],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 9}
    }
  }],
  range: [0, 9],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 9}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(eval, a) => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "eval",
          range: [1, 5],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 5}
          }
        },
        {
          type: "Identifier",
          name: "a",
          range: [7, 8],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 8}
          }
        }
      ],
      defaults: [],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        range: [13, 15],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 15}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 15],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 15}
      }
    },
    range: [0, 15],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  range: [0, 15],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(eval = 10) => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "eval",
        range: [1, 5],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 5}
        }
      }],
      defaults: [{
        type: "Literal",
        value: 10,
        raw: "10",
        range: [8, 10],
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 10}
        }
      }],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        range: [15, 17],
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 17}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 17],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(eval, a = 10) => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "Identifier",
          name: "eval",
          range: [1, 5],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 5}
          }
        },
        {
          type: "Identifier",
          name: "a",
          range: [7, 8],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 8}
          }
        }
      ],
      defaults: [
        null,
        {
          type: "Literal",
          value: 10,
          raw: "10",
          range: [11, 13],
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 13}
          }
        }
      ],
      body: {
        type: "Literal",
        value: 42,
        raw: "42",
        range: [18, 20],
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 20}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 20],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 20}
      }
    },
    range: [0, 20],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  range: [0, 20],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(x => x)", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "x",
        range: [1, 2],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      defaults: [],
      body: {
        type: "Identifier",
        name: "x",
        range: [6, 7],
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 7}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 8],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 8}
      }
    },
    range: [0, 8],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 8}
    }
  }],
  range: [0, 8],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 8}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x => y => 42", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      defaults: [],
      body: {
        type: "ArrowFunctionExpression",
        id: null,
        params: [{
          type: "Identifier",
          name: "y",
          range: [5, 6],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        defaults: [],
        body: {
          type: "Literal",
          value: 42,
          raw: "42",
          range: [10, 12],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 12}
          }
        },
        rest: null,
        generator: false,
        expression: true,
        range: [5, 12],
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 12}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 12],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(x) => ((y, z) => (x, y, z))", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "x",
        range: [1, 2],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      defaults: [],
      body: {
        type: "ArrowFunctionExpression",
        id: null,
        params: [
          {
            type: "Identifier",
            name: "y",
            range: [9, 10],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 10}
            }
          },
          {
            type: "Identifier",
            name: "z",
            range: [12, 13],
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 13}
            }
          }
        ],
        defaults: [],
        body: {
          type: "SequenceExpression",
          expressions: [
            {
              type: "Identifier",
              name: "x",
              range: [19, 20],
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 20}
              }
            },
            {
              type: "Identifier",
              name: "y",
              range: [22, 23],
              loc: {
                start: {line: 1, column: 22},
                end: {line: 1, column: 23}
              }
            },
            {
              type: "Identifier",
              name: "z",
              range: [25, 26],
              loc: {
                start: {line: 1, column: 25},
                end: {line: 1, column: 26}
              }
            }
          ],
          range: [18, 27],
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 27}
          }
        },
        rest: null,
        generator: false,
        expression: true,
        range: [7, 28],
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 28}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 28],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 28}
      }
    },
    range: [0, 28],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 28}
    }
  }],
  range: [0, 28],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 28}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("foo(() => {})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "foo",
        range: [0, 3],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 3}
        }
      },
      arguments: [{
        type: "ArrowFunctionExpression",
        id: null,
        params: [],
        defaults: [],
        body: {
          type: "BlockStatement",
          body: [],
          range: [10, 12],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 12}
          }
        },
        rest: null,
        generator: false,
        expression: false,
        range: [4, 12],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 12}
        }
      }],
      range: [0, 13],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    range: [0, 13],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  range: [0, 13],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("foo((x, y) => {})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "foo",
        range: [0, 3],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 3}
        }
      },
      arguments: [{
        type: "ArrowFunctionExpression",
        id: null,
        params: [
          {
            type: "Identifier",
            name: "x",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          {
            type: "Identifier",
            name: "y",
            range: [8, 9],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 9}
            }
          }
        ],
        defaults: [],
        body: {
          type: "BlockStatement",
          body: [],
          range: [14, 16],
          loc: {
            start: {line: 1, column: 14},
            end: {line: 1, column: 16}
          }
        },
        rest: null,
        generator: false,
        expression: false,
        range: [4, 16],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 16}
        }
      }],
      range: [0, 17],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, a) => 42", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  },
  range: [0, 12],
  body: [{
    type: "ExpressionStatement",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    },
    range: [0, 12],
    expression: {
      type: "ArrowFunctionExpression",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      },
      range: [0, 12],
      id: null,
      params: [
        {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 2}
          },
          range: [1, 2],
          name: "a"
        },
        {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 5}
          },
          range: [4, 5],
          name: "a"
        }
      ],
      defaults: [],
      rest: null,
      generator: false,
      body: {
        type: "Literal",
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        },
        range: [10, 12],
        value: 42,
        raw: "42"
      },
      expression: true
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Method Definition

test("x = { method() { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "method",
            range: [6, 12],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 12}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [15, 18],
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 18}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [12, 18],
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 18}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          range: [6, 18],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 18}
          }
        }],
        range: [4, 20],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 20}
        }
      },
      range: [0, 20],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 20}
      }
    },
    range: [0, 20],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  range: [0, 20],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { method(test) { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "method",
            range: [6, 12],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 12}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "test",
              range: [13, 17],
              loc: {
                start: {line: 1, column: 13},
                end: {line: 1, column: 17}
              }
            }],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [19, 22],
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 22}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [12, 22],
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 22}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          range: [6, 22],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 22}
          }
        }],
        range: [4, 24],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 24}
        }
      },
      range: [0, 24],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 24}
      }
    },
    range: [0, 24],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  range: [0, 24],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { 'method'() { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Literal",
            value: "method",
            raw: "'method'",
            range: [6, 14],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 14}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [17, 20],
              loc: {
                start: {line: 1, column: 17},
                end: {line: 1, column: 20}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [14, 20],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 20}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          range: [6, 20],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 20}
          }
        }],
        range: [4, 22],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 22}
        }
      },
      range: [0, 22],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 22}
      }
    },
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { get() { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "get",
            range: [6, 9],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 9}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [12, 15],
              loc: {
                start: {line: 1, column: 12},
                end: {line: 1, column: 15}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [9, 15],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 15}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          range: [6, 15],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 15}
          }
        }],
        range: [4, 17],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 17}
        }
      },
      range: [0, 17],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { set() { } }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "set",
            range: [6, 9],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 9}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [12, 15],
              loc: {
                start: {line: 1, column: 12},
                end: {line: 1, column: 15}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [9, 15],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 15}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          range: [6, 15],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 15}
          }
        }],
        range: [4, 17],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 17}
        }
      },
      range: [0, 17],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { method() 42 }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "method",
            range: [6, 12],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 12}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "Literal",
              value: 42,
              raw: "42",
              range: [15, 17],
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 17}
              }
            },
            rest: null,
            generator: false,
            expression: true,
            range: [12, 17],
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 17}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          range: [6, 17],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 17}
          }
        }],
        range: [4, 19],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 19}
        }
      },
      range: [0, 19],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 19}
      }
    },
    range: [0, 19],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  range: [0, 19],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { get method() 42 }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "method",
            range: [10, 16],
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 16}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "Literal",
              value: 42,
              raw: "42",
              range: [19, 21],
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 21}
              }
            },
            rest: null,
            generator: false,
            expression: true,
            range: [16, 21],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 21}
            }
          },
          kind: "get",
          method: false,
          shorthand: false,
          computed: false,
          range: [6, 21],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 21}
          }
        }],
        range: [4, 23],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 23}
        }
      },
      range: [0, 23],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 23}
      }
    },
    range: [0, 23],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 23}
    }
  }],
  range: [0, 23],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 23}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { set method(val) v = val }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "method",
            range: [10, 16],
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 16}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "val",
              range: [17, 20],
              loc: {
                start: {line: 1, column: 17},
                end: {line: 1, column: 20}
              }
            }],
            defaults: [],
            body: {
              type: "AssignmentExpression",
              operator: "=",
              left: {
                type: "Identifier",
                name: "v",
                range: [22, 23],
                loc: {
                  start: {line: 1, column: 22},
                  end: {line: 1, column: 23}
                }
              },
              right: {
                type: "Identifier",
                name: "val",
                range: [26, 29],
                loc: {
                  start: {line: 1, column: 26},
                  end: {line: 1, column: 29}
                }
              },
              range: [22, 29],
              loc: {
                start: {line: 1, column: 22},
                end: {line: 1, column: 29}
              }
            },
            rest: null,
            generator: false,
            expression: true,
            range: [16, 29],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 29}
            }
          },
          kind: "set",
          method: false,
          shorthand: false,
          computed: false,
          range: [6, 29],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 29}
          }
        }],
        range: [4, 31],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 31}
        }
      },
      range: [0, 31],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 31}
      }
    },
    range: [0, 31],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 31}
    }
  }],
  range: [0, 31],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 31}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Array and Generator Comprehension

test("[for (x of array) x]", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ComprehensionExpression",
      filter: null,
      blocks: [{
        type: "ComprehensionBlock",
        left: {
          type: "Identifier",
          name: "x",
          range: [6, 7],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 7}
          }
        },
        right: {
          type: "Identifier",
          name: "array",
          range: [11, 16],
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 16}
          }
        },
        range: [1, 17],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 17}
        },
        of: true
      }],
      body: {
        type: "Identifier",
        name: "x",
        range: [18, 19],
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 19}
        }
      },
      generator: false,
      range: [0, 20],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 20}
      }
    },
    range: [0, 20],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  range: [0, 20],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[for (x of array) for (y of array2) if (x === test) x]", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ComprehensionExpression",
      filter: {
        type: "BinaryExpression",
        operator: "===",
        left: {
          type: "Identifier",
          name: "x",
          range: [40, 41],
          loc: {
            start: {line: 1, column: 40},
            end: {line: 1, column: 41}
          }
        },
        right: {
          type: "Identifier",
          name: "test",
          range: [46, 50],
          loc: {
            start: {line: 1, column: 46},
            end: {line: 1, column: 50}
          }
        },
        range: [40, 50],
        loc: {
          start: {line: 1, column: 40},
          end: {line: 1, column: 50}
        }
      },
      blocks: [
        {
          type: "ComprehensionBlock",
          left: {
            type: "Identifier",
            name: "x",
            range: [6, 7],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          right: {
            type: "Identifier",
            name: "array",
            range: [11, 16],
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 16}
            }
          },
          range: [1, 17],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 17}
          },
          of: true
        },
        {
          type: "ComprehensionBlock",
          left: {
            type: "Identifier",
            name: "y",
            range: [23, 24],
            loc: {
              start: {line: 1, column: 23},
              end: {line: 1, column: 24}
            }
          },
          right: {
            type: "Identifier",
            name: "array2",
            range: [28, 34],
            loc: {
              start: {line: 1, column: 28},
              end: {line: 1, column: 34}
            }
          },
          range: [18, 35],
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 35}
          },
          of: true
        }
      ],
      body: {
        type: "Identifier",
        name: "x",
        range: [52, 53],
        loc: {
          start: {line: 1, column: 52},
          end: {line: 1, column: 53}
        }
      },
      generator: false,
      range: [0, 54],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 54}
      }
    },
    range: [0, 54],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 54}
    }
  }],
  range: [0, 54],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 54}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(for (x of array) for (y of array2) if (x === test) x)", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ComprehensionExpression",
      filter: {
        type: "BinaryExpression",
        operator: "===",
        left: {
          type: "Identifier",
          name: "x",
          range: [40, 41],
          loc: {
            start: {line: 1, column: 40},
            end: {line: 1, column: 41}
          }
        },
        right: {
          type: "Identifier",
          name: "test",
          range: [46, 50],
          loc: {
            start: {line: 1, column: 46},
            end: {line: 1, column: 50}
          }
        },
        range: [40, 50],
        loc: {
          start: {line: 1, column: 40},
          end: {line: 1, column: 50}
        }
      },
      blocks: [
        {
          type: "ComprehensionBlock",
          left: {
            type: "Identifier",
            name: "x",
            range: [6, 7],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          right: {
            type: "Identifier",
            name: "array",
            range: [11, 16],
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 16}
            }
          },
          range: [1, 17],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 17}
          },
          of: true
        },
        {
          type: "ComprehensionBlock",
          left: {
            type: "Identifier",
            name: "y",
            range: [23, 24],
            loc: {
              start: {line: 1, column: 23},
              end: {line: 1, column: 24}
            }
          },
          right: {
            type: "Identifier",
            name: "array2",
            range: [28, 34],
            loc: {
              start: {line: 1, column: 28},
              end: {line: 1, column: 34}
            }
          },
          range: [18, 35],
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 35}
          },
          of: true
        }
      ],
      body: {
        type: "Identifier",
        name: "x",
        range: [52, 53],
        loc: {
          start: {line: 1, column: 52},
          end: {line: 1, column: 53}
        }
      },
      generator: true,
      range: [0, 54],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 54}
      }
    },
    range: [0, 54],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 54}
    }
  }],
  range: [0, 54],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 54}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[for ([,x] of array) for ({[start.x]: x, [start.y]: y} of array2) x]", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ComprehensionExpression",
      filter: null,
      blocks: [
        {
          type: "ComprehensionBlock",
          left: {
            type: "ArrayPattern",
            elements: [
              null,
              {
                type: "Identifier",
                name: "x",
                range: [8, 9],
                loc: {
                  start: {line: 1, column: 8},
                  end: {line: 1, column: 9}
                }
              }
            ],
            range: [6, 10],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 10}
            }
          },
          right: {
            type: "Identifier",
            name: "array",
            range: [14, 19],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 19}
            }
          },
          range: [1, 20],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 20}
          },
          of: true
        },
        {
          type: "ComprehensionBlock",
          left: {
            type: "ObjectPattern",
            properties: [
              {
                type: "Property",
                key: {
                  type: "MemberExpression",
                  computed: false,
                  object: {
                    type: "Identifier",
                    name: "start",
                    range: [28, 33],
                    loc: {
                      start: {line: 1, column: 28},
                      end: {line: 1, column: 33}
                    }
                  },
                  property: {
                    type: "Identifier",
                    name: "x",
                    range: [34, 35],
                    loc: {
                      start: {line: 1, column: 34},
                      end: {line: 1, column: 35}
                    }
                  },
                  range: [28, 35],
                  loc: {
                    start: {line: 1, column: 28},
                    end: {line: 1, column: 35}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "x",
                  range: [38, 39],
                  loc: {
                    start: {line: 1, column: 38},
                    end: {line: 1, column: 39}
                  }
                },
                kind: "init",
                method: false,
                shorthand: false,
                computed: true,
                range: [27, 39],
                loc: {
                  start: {line: 1, column: 27},
                  end: {line: 1, column: 39}
                }
              },
              {
                type: "Property",
                key: {
                  type: "MemberExpression",
                  computed: false,
                  object: {
                    type: "Identifier",
                    name: "start",
                    range: [42, 47],
                    loc: {
                      start: {line: 1, column: 42},
                      end: {line: 1, column: 47}
                    }
                  },
                  property: {
                    type: "Identifier",
                    name: "y",
                    range: [48, 49],
                    loc: {
                      start: {line: 1, column: 48},
                      end: {line: 1, column: 49}
                    }
                  },
                  range: [42, 49],
                  loc: {
                    start: {line: 1, column: 42},
                    end: {line: 1, column: 49}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "y",
                  range: [52, 53],
                  loc: {
                    start: {line: 1, column: 52},
                    end: {line: 1, column: 53}
                  }
                },
                kind: "init",
                method: false,
                shorthand: false,
                computed: true,
                range: [41, 53],
                loc: {
                  start: {line: 1, column: 41},
                  end: {line: 1, column: 53}
                }
              }
            ],
            range: [26, 54],
            loc: {
              start: {line: 1, column: 26},
              end: {line: 1, column: 54}
            }
          },
          right: {
            type: "Identifier",
            name: "array2",
            range: [58, 64],
            loc: {
              start: {line: 1, column: 58},
              end: {line: 1, column: 64}
            }
          },
          range: [21, 65],
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 65}
          },
          of: true
        }
      ],
      body: {
        type: "Identifier",
        name: "x",
        range: [66, 67],
        loc: {
          start: {line: 1, column: 66},
          end: {line: 1, column: 67}
        }
      },
      generator: false,
      range: [0, 68],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 68}
      }
    },
    range: [0, 68],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 68}
    }
  }],
  range: [0, 68],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 68}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Object Literal Property Value Shorthand

test("x = { y, z }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "y",
              range: [6, 7],
              loc: {
                start: {line: 1, column: 6},
                end: {line: 1, column: 7}
              }
            },
            value: {
              type: "Identifier",
              name: "y",
              range: [6, 7],
              loc: {
                start: {line: 1, column: 6},
                end: {line: 1, column: 7}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            range: [6, 7],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "z",
              range: [9, 10],
              loc: {
                start: {line: 1, column: 9},
                end: {line: 1, column: 10}
              }
            },
            value: {
              type: "Identifier",
              name: "z",
              range: [9, 10],
              loc: {
                start: {line: 1, column: 9},
                end: {line: 1, column: 10}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            range: [9, 10],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 10}
            }
          }
        ],
        range: [4, 12],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 12}
        }
      },
      range: [0, 12],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Destructuring

test("[a, b] = [b, a]", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [1, 2],
            loc: {
              start: {line: 1, column: 1},
              end: {line: 1, column: 2}
            }
          },
          {
            type: "Identifier",
            name: "b",
            range: [4, 5],
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 5}
            }
          }
        ],
        range: [0, 6],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 6}
        }
      },
      right: {
        type: "ArrayExpression",
        elements: [
          {
            type: "Identifier",
            name: "b",
            range: [10, 11],
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 11}
            }
          },
          {
            type: "Identifier",
            name: "a",
            range: [13, 14],
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          }
        ],
        range: [9, 15],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 15}
        }
      },
      range: [0, 15],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 15}
      }
    },
    range: [0, 15],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  range: [0, 15],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ responseText: text }) = res", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "responseText",
            range: [3, 15],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 15}
            }
          },
          value: {
            type: "Identifier",
            name: "text",
            range: [17, 21],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 21}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [3, 21],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 21}
          }
        }],
        range: [0, 24],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 24}
        }
      },
      right: {
        type: "Identifier",
        name: "res",
        range: [27, 30],
        loc: {
          start: {line: 1, column: 27},
          end: {line: 1, column: 30}
        }
      },
      range: [0, 30],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 30}
      }
    },
    range: [0, 30],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 30}
    }
  }],
  range: [0, 30],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 30}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("const {a} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [7, 8],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            range: [7, 8],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [7, 8],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 8}
          }
        }],
        range: [6, 9],
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 9}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        range: [12, 14],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 14}
        }
      },
      range: [6, 14],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 14}
      }
    }],
    kind: "const",
    range: [0, 14],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  range: [0, 14],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("const [a] = []", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [{
          type: "Identifier",
          name: "a",
          range: [7, 8],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 8}
          }
        }],
        range: [6, 9],
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 9}
        }
      },
      init: {
        type: "ArrayExpression",
        elements: [],
        range: [12, 14],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 14}
        }
      },
      range: [6, 14],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 14}
      }
    }],
    kind: "const",
    range: [0, 14],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  range: [0, 14],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("let {a} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [5, 6],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        range: [4, 7],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 7}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        range: [10, 12],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      range: [4, 12],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 12}
      }
    }],
    kind: "let",
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("let [a] = []", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [{
          type: "Identifier",
          name: "a",
          range: [5, 6],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        range: [4, 7],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 7}
        }
      },
      init: {
        type: "ArrayExpression",
        elements: [],
        range: [10, 12],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      range: [4, 12],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 12}
      }
    }],
    kind: "let",
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {a} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [5, 6],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        range: [4, 7],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 7}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        range: [10, 12],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      range: [4, 12],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 12}
      }
    }],
    kind: "var",
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [a] = []", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [{
          type: "Identifier",
          name: "a",
          range: [5, 6],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        }],
        range: [4, 7],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 7}
        }
      },
      init: {
        type: "ArrayExpression",
        elements: [],
        range: [10, 12],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      range: [4, 12],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 12}
      }
    }],
    kind: "var",
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("const {a:b} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [7, 8],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          value: {
            type: "Identifier",
            name: "b",
            range: [9, 10],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 10}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [7, 10],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 10}
          }
        }],
        range: [6, 11],
        loc: {
          start: {line: 1, column: 6},
          end: {line: 1, column: 11}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        range: [14, 16],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 16}
        }
      },
      range: [6, 16],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 16}
      }
    }],
    kind: "const",
    range: [0, 16],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 16}
    }
  }],
  range: [0, 16],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 16}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("let {a:b} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          value: {
            type: "Identifier",
            name: "b",
            range: [7, 8],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [5, 8],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 8}
          }
        }],
        range: [4, 9],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 9}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        range: [12, 14],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 14}
        }
      },
      range: [4, 14],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 14}
      }
    }],
    kind: "let",
    range: [0, 14],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  range: [0, 14],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {a:b} = {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          value: {
            type: "Identifier",
            name: "b",
            range: [7, 8],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [5, 8],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 8}
          }
        }],
        range: [4, 9],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 9}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [],
        range: [12, 14],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 14}
        }
      },
      range: [4, 14],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 14}
      }
    }],
    kind: "var",
    range: [0, 14],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  range: [0, 14],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Modules

test("export var document", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          range: [11, 19],
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 19}
          }
        },
        init: null,
        range: [11, 19],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 19}
        }
      }],
      kind: "var",
      range: [7, 19],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 19}
      }
    },
    default: false,
    specifiers: null,
    source: null,
    range: [0, 19],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  range: [0, 19],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export var document = { }", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          range: [11, 19],
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 19}
          }
        },
        init: {
          type: "ObjectExpression",
          properties: [],
          range: [22, 25],
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 25}
          }
        },
        range: [11, 25],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 25}
        }
      }],
      kind: "var",
      range: [7, 25],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 25}
      }
    },
    default: false,
    specifiers: null,
    source: null,
    range: [0, 25],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 25}
    }
  }],
  range: [0, 25],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 25}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export let document", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          range: [11, 19],
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 19}
          }
        },
        init: null,
        range: [11, 19],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 19}
        }
      }],
      kind: "let",
      range: [7, 19],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 19}
      }
    },
    default: false,
    specifiers: null,
    source: null,
    range: [0, 19],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  range: [0, 19],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export let document = { }", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          range: [11, 19],
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 19}
          }
        },
        init: {
          type: "ObjectExpression",
          properties: [],
          range: [22, 25],
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 25}
          }
        },
        range: [11, 25],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 25}
        }
      }],
      kind: "let",
      range: [7, 25],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 25}
      }
    },
    default: false,
    specifiers: null,
    source: null,
    range: [0, 25],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 25}
    }
  }],
  range: [0, 25],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 25}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export const document = { }", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "document",
          range: [13, 21],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 21}
          }
        },
        init: {
          type: "ObjectExpression",
          properties: [],
          range: [24, 27],
          loc: {
            start: {line: 1, column: 24},
            end: {line: 1, column: 27}
          }
        },
        range: [13, 27],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 27}
        }
      }],
      kind: "const",
      range: [7, 27],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 27}
      }
    },
    default: false,
    specifiers: null,
    source: null,
    range: [0, 27],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  range: [0, 27],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export function parse() { }", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "parse",
        range: [16, 21],
        loc: {
          start: {line: 1, column: 16},
          end: {line: 1, column: 21}
        }
      },
      params: [],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [24, 27],
        loc: {
          start: {line: 1, column: 24},
          end: {line: 1, column: 27}
        }
      },
      rest: null,
      generator: false,
      expression: false,
      range: [7, 27],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 27}
      }
    },
    default: false,
    specifiers: null,
    source: null,
    range: [0, 27],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  range: [0, 27],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export class Class {}", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: {
      type: "ClassDeclaration",
      id: {
        type: "Identifier",
        name: "Class",
        range: [13, 18],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 18}
        }
      },
      superClass: null,
      body: {
        type: "ClassBody",
        body: [],
        range: [19, 21],
        loc: {
          start: {line: 1, column: 19},
          end: {line: 1, column: 21}
        }
      },
      range: [7, 21],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 21}
      }
    },
    default: false,
    specifiers: null,
    source: null,
    range: [0, 21],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 21}
    }
  }],
  range: [0, 21],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 21}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export default 42", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: {
      type: "Literal",
      value: 42,
      raw: "42",
      range: [15, 17],
      loc: {
        start: {line: 1, column: 15},
        end: {line: 1, column: 17}
      }
    },
    default: true,
    specifiers: null,
    source: null,
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("export *", "Unexpected token (1:8)", {ecmaVersion: 6});

test("export * from \"crypto\"", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: null,
    specifiers: [{
      type: "ExportBatchSpecifier",
      range: [7, 8],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 8}
      }
    }],
    source: {
      type: "Literal",
      value: "crypto",
      raw: "\"crypto\"",
      range: [14, 22],
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 22}
      }
    },
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export { encrypt }", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: null,
    specifiers: [{
      type: "ExportSpecifier",
      id: {
        type: "Identifier",
        name: "encrypt",
        range: [9, 16],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      name: null,
      range: [9, 16],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 16}
      }
    }],
    source: null,
    range: [0, 18],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  range: [0, 18],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export { encrypt, decrypt }", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: null,
    specifiers: [
      {
        type: "ExportSpecifier",
        id: {
          type: "Identifier",
          name: "encrypt",
          range: [9, 16],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        name: null,
        range: [9, 16],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      {
        type: "ExportSpecifier",
        id: {
          type: "Identifier",
          name: "decrypt",
          range: [18, 25],
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 25}
          }
        },
        name: null,
        range: [18, 25],
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 25}
        }
      }
    ],
    source: null,
    range: [0, 27],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  range: [0, 27],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export { encrypt as default }", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: null,
    specifiers: [{
      type: "ExportSpecifier",
      id: {
        type: "Identifier",
        name: "encrypt",
        range: [9, 16],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      name: {
        type: "Identifier",
        name: "default",
        range: [20, 27],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 27}
        }
      },
      range: [9, 27],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 27}
      }
    }],
    source: null,
    range: [0, 29],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 29}
    }
  }],
  range: [0, 29],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 29}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("export { encrypt, decrypt as dec }", {
  type: "Program",
  body: [{
    type: "ExportDeclaration",
    declaration: null,
    specifiers: [
      {
        type: "ExportSpecifier",
        id: {
          type: "Identifier",
          name: "encrypt",
          range: [9, 16],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        name: null,
        range: [9, 16],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      {
        type: "ExportSpecifier",
        id: {
          type: "Identifier",
          name: "decrypt",
          range: [18, 25],
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 25}
          }
        },
        name: {
          type: "Identifier",
          name: "dec",
          range: [29, 32],
          loc: {
            start: {line: 1, column: 29},
            end: {line: 1, column: 32}
          }
        },
        range: [18, 32],
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 32}
        }
      }
    ],
    source: null,
    range: [0, 34],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 34}
    }
  }],
  range: [0, 34],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 34}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("import \"jquery\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [],
    source: {
      type: "Literal",
      value: "jquery",
      raw: "\"jquery\"",
      range: [7, 15],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 15}
      }
    },
    range: [0, 15],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  range: [0, 15],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("import $ from \"jquery\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [{
      type: "ImportSpecifier",
      id: {
        type: "Identifier",
        name: "$",
        range: [7, 8],
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 8}
        }
      },
      name: null,
      range: [7, 8],
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 8}
      }
    }],
    kind: "default",
    source: {
      type: "Literal",
      value: "jquery",
      raw: "\"jquery\"",
      range: [14, 22],
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 22}
      }
    },
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("import { encrypt, decrypt } from \"crypto\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [
      {
        type: "ImportSpecifier",
        id: {
          type: "Identifier",
          name: "encrypt",
          range: [9, 16],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 16}
          }
        },
        name: null,
        range: [9, 16],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      {
        type: "ImportSpecifier",
        id: {
          type: "Identifier",
          name: "decrypt",
          range: [18, 25],
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 25}
          }
        },
        name: null,
        range: [18, 25],
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 25}
        }
      }
    ],
    kind: "named",
    source: {
      type: "Literal",
      value: "crypto",
      raw: "\"crypto\"",
      range: [33, 41],
      loc: {
        start: {line: 1, column: 33},
        end: {line: 1, column: 41}
      }
    },
    range: [0, 41],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 41}
    }
  }],
  range: [0, 41],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 41}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("import { encrypt as enc } from \"crypto\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [{
      type: "ImportSpecifier",
      id: {
        type: "Identifier",
        name: "encrypt",
        range: [9, 16],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 16}
        }
      },
      name: {
        type: "Identifier",
        name: "enc",
        range: [20, 23],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 23}
        }
      },
      range: [9, 23],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 23}
      }
    }],
    kind: "named",
    source: {
      type: "Literal",
      value: "crypto",
      raw: "\"crypto\"",
      range: [31, 39],
      loc: {
        start: {line: 1, column: 31},
        end: {line: 1, column: 39}
      }
    },
    range: [0, 39],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 39}
    }
  }],
  range: [0, 39],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 39}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("import crypto, { decrypt, encrypt as enc } from \"crypto\"", {
  type: "Program",
  start: 0,
  end: 56,
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 56}
  },
  range: [0, 56],
  body: [{
    type: "ImportDeclaration",
    start: 0,
    end: 56,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 56}
    },
    range: [0, 56],
    specifiers: [
      {
        type: "ImportSpecifier",
        start: 7,
        end: 13,
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 13}
        },
        range: [7, 13],
        id: {
          type: "Identifier",
          start: 7,
          end: 13,
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 13}
          },
          range: [7, 13],
          name: "crypto"
        },
        name: null,
        default: true
      },
      {
        type: "ImportSpecifier",
        start: 17,
        end: 24,
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 24}
        },
        range: [17, 24],
        id: {
          type: "Identifier",
          start: 17,
          end: 24,
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 24}
          },
          range: [17, 24],
          name: "decrypt"
        },
        name: null,
        default: false
      },
      {
        type: "ImportSpecifier",
        start: 26,
        end: 40,
        loc: {
          start: {line: 1, column: 26},
          end: {line: 1, column: 40}
        },
        range: [26, 40],
        id: {
          type: "Identifier",
          start: 26,
          end: 33,
          loc: {
            start: {line: 1, column: 26},
            end: {line: 1, column: 33}
          },
          range: [26, 33],
          name: "encrypt"
        },
        name: {
          type: "Identifier",
          start: 37,
          end: 40,
          loc: {
            start: {line: 1, column: 37},
            end: {line: 1, column: 40}
          },
          range: [37, 40],
          name: "enc"
        },
        default: false
      }
    ],
    source: {
      type: "Literal",
      start: 48,
      end: 56,
      loc: {
        start: {line: 1, column: 48},
        end: {line: 1, column: 56}
      },
      range: [48, 56],
      value: "crypto",
      raw: "\"crypto\""
    },
    kind: "default"
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("import default from \"foo\"", "Unexpected token (1:7)", {ecmaVersion: 6});

test("import { null as nil } from \"bar\"", {
  type: "Program",
  body: [{
    type: "ImportDeclaration",
    specifiers: [{
      type: "ImportSpecifier",
      id: {
        type: "Identifier",
        name: "null",
        range: [9, 13],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 13}
        }
      },
      name: {
        type: "Identifier",
        name: "nil",
        range: [17, 20],
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 20}
        }
      },
      range: [9, 20],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 20}
      }
    }],
    kind: "named",
    source: {
      type: "Literal",
      value: "bar",
      raw: "\"bar\"",
      range: [28, 33],
      loc: {
        start: {line: 1, column: 28},
        end: {line: 1, column: 33}
      }
    },
    range: [0, 33],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  range: [0, 33],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("import * as crypto from \"crypto\"", {
  type: "Program",
  start: 0,
  end: 32,
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 32}
  },
  range: [0, 32],
  body: [{
    type: "ImportDeclaration",
    start: 0,
    end: 32,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 32}
    },
    range: [0, 32],
    specifiers: [{
      type: "ImportBatchSpecifier",
      start: 7,
      end: 18,
      loc: {
        start: {line: 1, column: 7},
        end: {line: 1, column: 18}
      },
      range: [7, 18],
      name: {
        type: "Identifier",
        start: 12,
        end: 18,
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 18}
        },
        range: [12, 18],
        name: "crypto"
      }
    }],
    source: {
      type: "Literal",
      start: 24,
      end: 32,
      loc: {
        start: {line: 1, column: 24},
        end: {line: 1, column: 32}
      },
      range: [24, 32],
      value: "crypto",
      raw: "\"crypto\""
    },
    kind: "named"
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Yield Expression

test("(function* () { yield v })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "YieldExpression",
            argument: {
              type: "Identifier",
              name: "v",
              range: [22, 23],
              loc: {
                start: {line: 1, column: 22},
                end: {line: 1, column: 23}
              }
            },
            delegate: false,
            range: [16, 23],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 23}
            }
          },
          range: [16, 23],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 23}
          }
        }],
        range: [14, 25],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 25}
        }
      },
      rest: null,
      generator: true,
      expression: false,
      range: [0, 26],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 26}
      }
    },
    range: [0, 26],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 26}
    }
  }],
  range: [0, 26],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 26}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function* () { yield\nv })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "ExpressionStatement",
            expression: {
              type: "YieldExpression",
              argument: null,
              delegate: false,
              range: [16, 21],
              loc: {
                start: {line: 1, column: 16},
                end: {line: 1, column: 21}
              }
            },
            range: [16, 21],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 21}
            }
          },
          {
            type: "ExpressionStatement",
            expression: {
              type: "Identifier",
              name: "v",
              range: [22, 23],
              loc: {
                start: {line: 2, column: 0},
                end: {line: 2, column: 1}
              }
            },
            range: [22, 23],
            loc: {
              start: {line: 2, column: 0},
              end: {line: 2, column: 1}
            }
          }
        ],
        range: [14, 25],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 2, column: 3}
        }
      },
      rest: null,
      generator: true,
      expression: false,
      range: [0, 26],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 2, column: 4}
      }
    },
    range: [0, 26],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 2, column: 4}
    }
  }],
  range: [0, 26],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 2, column: 4}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function* () { yield *v })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "YieldExpression",
            argument: {
              type: "Identifier",
              name: "v",
              range: [23, 24],
              loc: {
                start: {line: 1, column: 23},
                end: {line: 1, column: 24}
              }
            },
            delegate: true,
            range: [16, 24],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 24}
            }
          },
          range: [16, 24],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 24}
          }
        }],
        range: [14, 26],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 26}
        }
      },
      rest: null,
      generator: true,
      expression: false,
      range: [0, 27],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 27}
      }
    },
    range: [0, 27],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  range: [0, 27],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function* test () { yield *v }", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "test",
      range: [10, 14],
      loc: {
        start: {line: 1, column: 10},
        end: {line: 1, column: 14}
      }
    },
    params: [],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [{
        type: "ExpressionStatement",
        expression: {
          type: "YieldExpression",
          argument: {
            type: "Identifier",
            name: "v",
            range: [27, 28],
            loc: {
              start: {line: 1, column: 27},
              end: {line: 1, column: 28}
            }
          },
          delegate: true,
          range: [20, 28],
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 28}
          }
        },
        range: [20, 28],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 28}
        }
      }],
      range: [18, 30],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 30}
      }
    },
    rest: null,
    generator: true,
    expression: false,
    range: [0, 30],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 30}
    }
  }],
  range: [0, 30],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 30}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var x = { *test () { yield *v } };", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "x",
        range: [4, 5],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 5}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "test",
            range: [11, 15],
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 15}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [{
                type: "ExpressionStatement",
                expression: {
                  type: "YieldExpression",
                  argument: {
                    type: "Identifier",
                    name: "v",
                    range: [28, 29],
                    loc: {
                      start: {line: 1, column: 28},
                      end: {line: 1, column: 29}
                    }
                  },
                  delegate: true,
                  range: [21, 29],
                  loc: {
                    start: {line: 1, column: 21},
                    end: {line: 1, column: 29}
                  }
                },
                range: [21, 29],
                loc: {
                  start: {line: 1, column: 21},
                  end: {line: 1, column: 29}
                }
              }],
              range: [19, 31],
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 31}
              }
            },
            rest: null,
            generator: true,
            expression: false,
            range: [16, 31],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 31}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          range: [10, 31],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 31}
          }
        }],
        range: [8, 33],
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 33}
        }
      },
      range: [4, 33],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 33}
      }
    }],
    kind: "var",
    range: [0, 34],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 34}
    }
  }],
  range: [0, 34],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 34}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function* t() {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "t",
      range: [10, 11],
      loc: {
        start: {line: 1, column: 10},
        end: {line: 1, column: 11}
      }
    },
    params: [],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [],
      range: [14, 16],
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 16}
      }
    },
    rest: null,
    generator: true,
    expression: false,
    range: [0, 16],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 16}
    }
  }],
  range: [0, 16],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 16}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function* () { yield yield 10 })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "YieldExpression",
            argument: {
              type: "YieldExpression",
              argument: {
                type: "Literal",
                value: 10,
                raw: "10",
                range: [28, 30],
                loc: {
                  start: {line: 1, column: 28},
                  end: {line: 1, column: 30}
                }
              },
              delegate: false,
              range: [22, 30],
              loc: {
                start: {line: 1, column: 22},
                end: {line: 1, column: 30}
              }
            },
            delegate: false,
            range: [16, 30],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 30}
            }
          },
          range: [16, 30],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 30}
          }
        }],
        range: [14, 32],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 32}
        }
      },
      rest: null,
      generator: true,
      expression: false,
      range: [0, 33],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 33}
      }
    },
    range: [0, 33],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  range: [0, 33],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Iterators

test("for(x of list) process(x);", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "Identifier",
      name: "x",
      range: [4, 5],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 5}
      }
    },
    right: {
      type: "Identifier",
      name: "list",
      range: [9, 13],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 13}
      }
    },
    body: {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "process",
          range: [15, 22],
          loc: {
            start: {line: 1, column: 15},
            end: {line: 1, column: 22}
          }
        },
        arguments: [{
          type: "Identifier",
          name: "x",
          range: [23, 24],
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 24}
          }
        }],
        range: [15, 25],
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 25}
        }
      },
      range: [15, 26],
      loc: {
        start: {line: 1, column: 15},
        end: {line: 1, column: 26}
      }
    },
    range: [0, 26],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 26}
    }
  }],
  range: [0, 26],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 26}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("for (var x of list) process(x);", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x",
          range: [9, 10],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 10}
          }
        },
        init: null,
        range: [9, 10],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 10}
        }
      }],
      kind: "var",
      range: [5, 10],
      loc: {
        start: {line: 1, column: 5},
        end: {line: 1, column: 10}
      }
    },
    right: {
      type: "Identifier",
      name: "list",
      range: [14, 18],
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 18}
      }
    },
    body: {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "process",
          range: [20, 27],
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 27}
          }
        },
        arguments: [{
          type: "Identifier",
          name: "x",
          range: [28, 29],
          loc: {
            start: {line: 1, column: 28},
            end: {line: 1, column: 29}
          }
        }],
        range: [20, 30],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 30}
        }
      },
      range: [20, 31],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 31}
      }
    },
    range: [0, 31],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 31}
    }
  }],
  range: [0, 31],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 31}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("for (var x = 42 of list) process(x);", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x",
          range: [9, 10],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 10}
          }
        },
        init: {
          type: "Literal",
          value: 42,
          raw: "42",
          range: [13, 15],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 15}
          }
        },
        range: [9, 15],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 15}
        }
      }],
      kind: "var",
      range: [5, 15],
      loc: {
        start: {line: 1, column: 5},
        end: {line: 1, column: 15}
      }
    },
    right: {
      type: "Identifier",
      name: "list",
      range: [19, 23],
      loc: {
        start: {line: 1, column: 19},
        end: {line: 1, column: 23}
      }
    },
    body: {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "process",
          range: [25, 32],
          loc: {
            start: {line: 1, column: 25},
            end: {line: 1, column: 32}
          }
        },
        arguments: [{
          type: "Identifier",
          name: "x",
          range: [33, 34],
          loc: {
            start: {line: 1, column: 33},
            end: {line: 1, column: 34}
          }
        }],
        range: [25, 35],
        loc: {
          start: {line: 1, column: 25},
          end: {line: 1, column: 35}
        }
      },
      range: [25, 36],
      loc: {
        start: {line: 1, column: 25},
        end: {line: 1, column: 36}
      }
    },
    range: [0, 36],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 36}
    }
  }],
  range: [0, 36],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 36}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("for (let x of list) process(x);", {
  type: "Program",
  body: [{
    type: "ForOfStatement",
    left: {
      type: "VariableDeclaration",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: "x",
          range: [9, 10],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 10}
          }
        },
        init: null,
        range: [9, 10],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 10}
        }
      }],
      kind: "let",
      range: [5, 10],
      loc: {
        start: {line: 1, column: 5},
        end: {line: 1, column: 10}
      }
    },
    right: {
      type: "Identifier",
      name: "list",
      range: [14, 18],
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 18}
      }
    },
    body: {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "process",
          range: [20, 27],
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 27}
          }
        },
        arguments: [{
          type: "Identifier",
          name: "x",
          range: [28, 29],
          loc: {
            start: {line: 1, column: 28},
            end: {line: 1, column: 29}
          }
        }],
        range: [20, 30],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 30}
        }
      },
      range: [20, 31],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 31}
      }
    },
    range: [0, 31],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 31}
    }
  }],
  range: [0, 31],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 31}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony: Class (strawman)

test("var A = class extends B {}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "A",
        range: [4, 5],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 5}
        }
      },
      init: {
        type: "ClassExpression",
        superClass: {
          type: "Identifier",
          name: "B",
          range: [22, 23],
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 23}
          }
        },
        body: {
          type: "ClassBody",
          body: [],
          range: [24, 26],
          loc: {
            start: {line: 1, column: 24},
            end: {line: 1, column: 26}
          }
        },
        range: [8, 26],
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 26}
        }
      },
      range: [4, 26],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 26}
      }
    }],
    kind: "var",
    range: [0, 26],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 26}
    }
  }],
  range: [0, 26],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 26}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A extends class B extends C {} {}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: {
      type: "ClassExpression",
      id: {
        type: "Identifier",
        name: "B",
        range: [22, 23],
        loc: {
          start: {line: 1, column: 22},
          end: {line: 1, column: 23}
        }
      },
      superClass: {
        type: "Identifier",
        name: "C",
        range: [32, 33],
        loc: {
          start: {line: 1, column: 32},
          end: {line: 1, column: 33}
        }
      },
      body: {
        type: "ClassBody",
        body: [],
        range: [34, 36],
        loc: {
          start: {line: 1, column: 34},
          end: {line: 1, column: 36}
        }
      },
      range: [16, 36],
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 36}
      }
    },
    body: {
      type: "ClassBody",
      body: [],
      range: [37, 39],
      loc: {
        start: {line: 1, column: 37},
        end: {line: 1, column: 39}
      }
    },
    range: [0, 39],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 39}
    }
  }],
  range: [0, 39],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 39}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {get() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "get",
          range: [9, 12],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 12}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [15, 17],
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 17}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [12, 17],
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 17}
          }
        },
        kind: "",
        static: false,
        range: [9, 17],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 17}
        }
      }],
      range: [8, 18],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 18}
      }
    },
    range: [0, 18],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  range: [0, 18],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "get",
          range: [17, 20],
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 20}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [23, 25],
            loc: {
              start: {line: 1, column: 23},
              end: {line: 1, column: 25}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [20, 25],
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 25}
          }
        },
        kind: "",
        static: true,
        range: [10, 25],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 25}
        }
      }],
      range: [8, 26],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 26}
      }
    },
    range: [0, 26],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 26}
    }
  }],
  range: [0, 26],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 26}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A extends B {get foo() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: {
      type: "Identifier",
      name: "B",
      range: [16, 17],
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 17}
      }
    },
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "foo",
          range: [23, 26],
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 26}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [29, 31],
            loc: {
              start: {line: 1, column: 29},
              end: {line: 1, column: 31}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [26, 31],
          loc: {
            start: {line: 1, column: 26},
            end: {line: 1, column: 31}
          }
        },
        kind: "get",
        static: false,
        range: [19, 31],
        loc: {
          start: {line: 1, column: 19},
          end: {line: 1, column: 31}
        }
      }],
      range: [18, 32],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 32}
      }
    },
    range: [0, 32],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 32}
    }
  }],
  range: [0, 32],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 32}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A extends B { static get foo() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: {
      type: "Identifier",
      name: "B",
      range: [16, 17],
      loc: {
        start: {line: 1, column: 16},
        end: {line: 1, column: 17}
      }
    },
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "foo",
          range: [31, 34],
          loc: {
            start: {line: 1, column: 31},
            end: {line: 1, column: 34}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [37, 39],
            loc: {
              start: {line: 1, column: 37},
              end: {line: 1, column: 39}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [34, 39],
          loc: {
            start: {line: 1, column: 34},
            end: {line: 1, column: 39}
          }
        },
        kind: "get",
        static: true,
        range: [20, 39],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 39}
        }
      }],
      range: [18, 40],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 40}
      }
    },
    range: [0, 40],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 40}
    }
  }],
  range: [0, 40],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 40}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {set a(v) {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "a",
          range: [13, 14],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            range: [15, 16],
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 16}
            }
          }],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [18, 20],
            loc: {
              start: {line: 1, column: 18},
              end: {line: 1, column: 20}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [14, 20],
          loc: {
            start: {line: 1, column: 14},
            end: {line: 1, column: 20}
          }
        },
        kind: "set",
        static: false,
        range: [9, 20],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 20}
        }
      }],
      range: [8, 21],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 21}
      }
    },
    range: [0, 21],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 21}
    }
  }],
  range: [0, 21],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 21}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static set a(v) {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "a",
          range: [21, 22],
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 22}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            range: [23, 24],
            loc: {
              start: {line: 1, column: 23},
              end: {line: 1, column: 24}
            }
          }],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [26, 28],
            loc: {
              start: {line: 1, column: 26},
              end: {line: 1, column: 28}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [22, 28],
          loc: {
            start: {line: 1, column: 22},
            end: {line: 1, column: 28}
          }
        },
        kind: "set",
        static: true,
        range: [10, 28],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 28}
        }
      }],
      range: [8, 29],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 29}
      }
    },
    range: [0, 29],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 29}
    }
  }],
  range: [0, 29],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 29}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {set(v) {};}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "set",
          range: [9, 12],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 12}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            range: [13, 14],
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          }],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [16, 18],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 18}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [12, 18],
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 18}
          }
        },
        kind: "",
        static: false,
        range: [9, 18],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 18}
        }
      }],
      range: [8, 20],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 20}
      }
    },
    range: [0, 20],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  range: [0, 20],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static set(v) {};}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "set",
          range: [17, 20],
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 20}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            range: [21, 22],
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 22}
            }
          }],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [24, 26],
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 26}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [20, 26],
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 26}
          }
        },
        kind: "",
        static: true,
        range: [10, 26],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 26}
        }
      }],
      range: [8, 28],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 28}
      }
    },
    range: [0, 28],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 28}
    }
  }],
  range: [0, 28],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 28}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {*gen(v) { yield v; }}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "gen",
          range: [10, 13],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 13}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            range: [14, 15],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 15}
            }
          }],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [{
              type: "ExpressionStatement",
              expression: {
                type: "YieldExpression",
                argument: {
                  type: "Identifier",
                  name: "v",
                  range: [25, 26],
                  loc: {
                    start: {line: 1, column: 25},
                    end: {line: 1, column: 26}
                  }
                },
                delegate: false,
                range: [19, 26],
                loc: {
                  start: {line: 1, column: 19},
                  end: {line: 1, column: 26}
                }
              },
              range: [19, 27],
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 27}
              }
            }],
            range: [17, 29],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 29}
            }
          },
          rest: null,
          generator: true,
          expression: false,
          range: [13, 29],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 29}
          }
        },
        kind: "",
        static: false,
        range: [9, 29],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 29}
        }
      }],
      range: [8, 30],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 30}
      }
    },
    range: [0, 30],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 30}
    }
  }],
  range: [0, 30],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 30}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static *gen(v) { yield v; }}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "gen",
          range: [18, 21],
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 21}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "Identifier",
            name: "v",
            range: [22, 23],
            loc: {
              start: {line: 1, column: 22},
              end: {line: 1, column: 23}
            }
          }],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [{
              type: "ExpressionStatement",
              expression: {
                type: "YieldExpression",
                argument: {
                  type: "Identifier",
                  name: "v",
                  range: [33, 34],
                  loc: {
                    start: {line: 1, column: 33},
                    end: {line: 1, column: 34}
                  }
                },
                delegate: false,
                range: [27, 34],
                loc: {
                  start: {line: 1, column: 27},
                  end: {line: 1, column: 34}
                }
              },
              range: [27, 35],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 35}
              }
            }],
            range: [25, 37],
            loc: {
              start: {line: 1, column: 25},
              end: {line: 1, column: 37}
            }
          },
          rest: null,
          generator: true,
          expression: false,
          range: [21, 37],
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 37}
          }
        },
        kind: "",
        static: true,
        range: [10, 37],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 37}
        }
      }],
      range: [8, 38],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 38}
      }
    },
    range: [0, 38],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 38}
    }
  }],
  range: [0, 38],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 38}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("\"use strict\"; (class A {constructor() { super() }})", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "use strict",
        raw: "\"use strict\"",
        range: [0, 12],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 12}
        }
      },
      range: [0, 13],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    {
      type: "ExpressionStatement",
      expression: {
        type: "ClassExpression",
        id: {
          type: "Identifier",
          name: "A",
          range: [21, 22],
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 22}
          }
        },
        superClass: null,
        body: {
          type: "ClassBody",
          body: [{
            type: "MethodDefinition",
            computed: false,
            key: {
              type: "Identifier",
              name: "constructor",
              range: [24, 35],
              loc: {
                start: {line: 1, column: 24},
                end: {line: 1, column: 35}
              }
            },
            value: {
              type: "FunctionExpression",
              id: null,
              params: [],
              defaults: [],
              body: {
                type: "BlockStatement",
                body: [{
                  type: "ExpressionStatement",
                  expression: {
                    type: "CallExpression",
                    callee: {
                      type: "Identifier",
                      name: "super",
                      range: [40, 45],
                      loc: {
                        start: {line: 1, column: 40},
                        end: {line: 1, column: 45}
                      }
                    },
                    arguments: [],
                    range: [40, 47],
                    loc: {
                      start: {line: 1, column: 40},
                      end: {line: 1, column: 47}
                    }
                  },
                  range: [40, 47],
                  loc: {
                    start: {line: 1, column: 40},
                    end: {line: 1, column: 47}
                  }
                }],
                range: [38, 49],
                loc: {
                  start: {line: 1, column: 38},
                  end: {line: 1, column: 49}
                }
              },
              rest: null,
              generator: false,
              expression: false,
              range: [35, 49],
              loc: {
                start: {line: 1, column: 35},
                end: {line: 1, column: 49}
              }
            },
            kind: "",
            static: false,
            range: [24, 49],
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 49}
            }
          }],
          range: [23, 50],
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 50}
          }
        },
        range: [14, 51],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 51}
        }
      },
      range: [14, 51],
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 51}
      }
    }
  ],
  range: [0, 51],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 51}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {static foo() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [{
        type: "MethodDefinition",
        computed: false,
        key: {
          type: "Identifier",
          name: "foo",
          range: [16, 19],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 19}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [22, 24],
            loc: {
              start: {line: 1, column: 22},
              end: {line: 1, column: 24}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [19, 24],
          loc: {
            start: {line: 1, column: 19},
            end: {line: 1, column: 24}
          }
        },
        kind: "",
        static: true,
        range: [9, 24],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 24}
        }
      }],
      range: [8, 25],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 25}
      }
    },
    range: [0, 25],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 25}
    }
  }],
  range: [0, 25],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 25}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {foo() {} static bar() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [9, 12],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 12}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [15, 17],
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 17}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [12, 17],
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 17}
            }
          },
          kind: "",
          static: false,
          range: [9, 17],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 17}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "bar",
            range: [25, 28],
            loc: {
              start: {line: 1, column: 25},
              end: {line: 1, column: 28}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [31, 33],
              loc: {
                start: {line: 1, column: 31},
                end: {line: 1, column: 33}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [28, 33],
            loc: {
              start: {line: 1, column: 28},
              end: {line: 1, column: 33}
            }
          },
          kind: "",
          static: true,
          range: [18, 33],
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 33}
          }
        }
      ],
      range: [8, 34],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 34}
      }
    },
    range: [0, 34],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 34}
    }
  }],
  range: [0, 34],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 34}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("\"use strict\"; (class A { static constructor() { super() }})", {
  type: "Program",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "Literal",
        value: "use strict",
        raw: "\"use strict\"",
        range: [0, 12],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 12}
        }
      },
      range: [0, 13],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    {
      type: "ExpressionStatement",
      expression: {
        type: "ClassExpression",
        id: {
          type: "Identifier",
          name: "A",
          range: [21, 22],
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 22}
          }
        },
        superClass: null,
        body: {
          type: "ClassBody",
          body: [{
            type: "MethodDefinition",
            computed: false,
            key: {
              type: "Identifier",
              name: "constructor",
              range: [32, 43],
              loc: {
                start: {line: 1, column: 32},
                end: {line: 1, column: 43}
              }
            },
            value: {
              type: "FunctionExpression",
              id: null,
              params: [],
              defaults: [],
              body: {
                type: "BlockStatement",
                body: [{
                  type: "ExpressionStatement",
                  expression: {
                    type: "CallExpression",
                    callee: {
                      type: "Identifier",
                      name: "super",
                      range: [48, 53],
                      loc: {
                        start: {line: 1, column: 48},
                        end: {line: 1, column: 53}
                      }
                    },
                    arguments: [],
                    range: [48, 55],
                    loc: {
                      start: {line: 1, column: 48},
                      end: {line: 1, column: 55}
                    }
                  },
                  range: [48, 55],
                  loc: {
                    start: {line: 1, column: 48},
                    end: {line: 1, column: 55}
                  }
                }],
                range: [46, 57],
                loc: {
                  start: {line: 1, column: 46},
                  end: {line: 1, column: 57}
                }
              },
              rest: null,
              generator: false,
              expression: false,
              range: [43, 57],
              loc: {
                start: {line: 1, column: 43},
                end: {line: 1, column: 57}
              }
            },
            kind: "",
            static: true,
            range: [25, 57],
            loc: {
              start: {line: 1, column: 25},
              end: {line: 1, column: 57}
            }
          }],
          range: [23, 58],
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 58}
          }
        },
        range: [14, 59],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 59}
        }
      },
      range: [14, 59],
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 59}
      }
    }
  ],
  range: [0, 59],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 59}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { foo() {} bar() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [10, 13],
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 13}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [16, 18],
              loc: {
                start: {line: 1, column: 16},
                end: {line: 1, column: 18}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [13, 18],
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 18}
            }
          },
          kind: "",
          static: false,
          range: [10, 18],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 18}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "bar",
            range: [19, 22],
            loc: {
              start: {line: 1, column: 19},
              end: {line: 1, column: 22}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [25, 27],
              loc: {
                start: {line: 1, column: 25},
                end: {line: 1, column: 27}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [22, 27],
            loc: {
              start: {line: 1, column: 22},
              end: {line: 1, column: 27}
            }
          },
          kind: "",
          static: false,
          range: [19, 27],
          loc: {
            start: {line: 1, column: 19},
            end: {line: 1, column: 27}
          }
        }
      ],
      range: [8, 28],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 28}
      }
    },
    range: [0, 28],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 28}
    }
  }],
  range: [0, 28],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 28}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { get foo() {} set foo(v) {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [14, 17],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [20, 22],
              loc: {
                start: {line: 1, column: 20},
                end: {line: 1, column: 22}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [17, 22],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 22}
            }
          },
          kind: "get",
          static: false,
          range: [10, 22],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 22}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [27, 30],
            loc: {
              start: {line: 1, column: 27},
              end: {line: 1, column: 30}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              range: [31, 32],
              loc: {
                start: {line: 1, column: 31},
                end: {line: 1, column: 32}
              }
            }],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [34, 36],
              loc: {
                start: {line: 1, column: 34},
                end: {line: 1, column: 36}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [30, 36],
            loc: {
              start: {line: 1, column: 30},
              end: {line: 1, column: 36}
            }
          },
          kind: "set",
          static: false,
          range: [23, 36],
          loc: {
            start: {line: 1, column: 23},
            end: {line: 1, column: 36}
          }
        }
      ],
      range: [8, 37],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 37}
      }
    },
    range: [0, 37],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 37}
    }
  }],
  range: [0, 37],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 37}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get foo() {} get foo() {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [21, 24],
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 24}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [27, 29],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 29}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [24, 29],
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 29}
            }
          },
          kind: "get",
          static: true,
          range: [10, 29],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 29}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [34, 37],
            loc: {
              start: {line: 1, column: 34},
              end: {line: 1, column: 37}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [40, 42],
              loc: {
                start: {line: 1, column: 40},
                end: {line: 1, column: 42}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [37, 42],
            loc: {
              start: {line: 1, column: 37},
              end: {line: 1, column: 42}
            }
          },
          kind: "get",
          static: false,
          range: [30, 42],
          loc: {
            start: {line: 1, column: 30},
            end: {line: 1, column: 42}
          }
        }
      ],
      range: [8, 43],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 43}
      }
    },
    range: [0, 43],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 43}
    }
  }],
  range: [0, 43],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 43}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get foo() {} static get bar() {} }", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [21, 24],
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 24}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [27, 29],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 29}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [24, 29],
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 29}
            }
          },
          kind: "get",
          static: true,
          range: [10, 29],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 29}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "bar",
            range: [41, 44],
            loc: {
              start: {line: 1, column: 41},
              end: {line: 1, column: 44}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [47, 49],
              loc: {
                start: {line: 1, column: 47},
                end: {line: 1, column: 49}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [44, 49],
            loc: {
              start: {line: 1, column: 44},
              end: {line: 1, column: 49}
            }
          },
          kind: "get",
          static: true,
          range: [30, 49],
          loc: {
            start: {line: 1, column: 30},
            end: {line: 1, column: 49}
          }
        }
      ],
      range: [8, 51],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 51}
      }
    },
    range: [0, 51],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 51}
    }
  }],
  range: [0, 51],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 51}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { static get foo() {} static set foo(v) {} get foo() {} set foo(v) {}}", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [21, 24],
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 24}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [27, 29],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 29}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [24, 29],
            loc: {
              start: {line: 1, column: 24},
              end: {line: 1, column: 29}
            }
          },
          kind: "get",
          static: true,
          range: [10, 29],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 29}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [41, 44],
            loc: {
              start: {line: 1, column: 41},
              end: {line: 1, column: 44}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              range: [45, 46],
              loc: {
                start: {line: 1, column: 45},
                end: {line: 1, column: 46}
              }
            }],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [48, 50],
              loc: {
                start: {line: 1, column: 48},
                end: {line: 1, column: 50}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [44, 50],
            loc: {
              start: {line: 1, column: 44},
              end: {line: 1, column: 50}
            }
          },
          kind: "set",
          static: true,
          range: [30, 50],
          loc: {
            start: {line: 1, column: 30},
            end: {line: 1, column: 50}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [55, 58],
            loc: {
              start: {line: 1, column: 55},
              end: {line: 1, column: 58}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [61, 63],
              loc: {
                start: {line: 1, column: 61},
                end: {line: 1, column: 63}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [58, 63],
            loc: {
              start: {line: 1, column: 58},
              end: {line: 1, column: 63}
            }
          },
          kind: "get",
          static: false,
          range: [51, 63],
          loc: {
            start: {line: 1, column: 51},
            end: {line: 1, column: 63}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [68, 71],
            loc: {
              start: {line: 1, column: 68},
              end: {line: 1, column: 71}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              range: [72, 73],
              loc: {
                start: {line: 1, column: 72},
                end: {line: 1, column: 73}
              }
            }],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [75, 77],
              loc: {
                start: {line: 1, column: 75},
                end: {line: 1, column: 77}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [71, 77],
            loc: {
              start: {line: 1, column: 71},
              end: {line: 1, column: 77}
            }
          },
          kind: "set",
          static: false,
          range: [64, 77],
          loc: {
            start: {line: 1, column: 64},
            end: {line: 1, column: 77}
          }
        }
      ],
      range: [8, 78],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 78}
      }
    },
    range: [0, 78],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 78}
    }
  }],
  range: [0, 78],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 78}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A { set foo(v) {} get foo() {} }", {
  type: "Program",
  body: [{
    type: "ClassDeclaration",
    id: {
      type: "Identifier",
      name: "A",
      range: [6, 7],
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      }
    },
    superClass: null,
    body: {
      type: "ClassBody",
      body: [
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [14, 17],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              range: [18, 19],
              loc: {
                start: {line: 1, column: 18},
                end: {line: 1, column: 19}
              }
            }],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [21, 23],
              loc: {
                start: {line: 1, column: 21},
                end: {line: 1, column: 23}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [17, 23],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 23}
            }
          },
          kind: "set",
          static: false,
          range: [10, 23],
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 23}
          }
        },
        {
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "foo",
            range: [28, 31],
            loc: {
              start: {line: 1, column: 28},
              end: {line: 1, column: 31}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [34, 36],
              loc: {
                start: {line: 1, column: 34},
                end: {line: 1, column: 36}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [31, 36],
            loc: {
              start: {line: 1, column: 31},
              end: {line: 1, column: 36}
            }
          },
          kind: "get",
          static: false,
          range: [24, 36],
          loc: {
            start: {line: 1, column: 24},
            end: {line: 1, column: 36}
          }
        }
      ],
      range: [8, 38],
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 38}
      }
    },
    range: [0, 38],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 38}
    }
  }],
  range: [0, 38],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 38}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("class A { get foo() {} get foo() {} }", "Redefinition of property (1:27)", {ecmaVersion: 6});

testFail("class A { set foo(v) {} set foo(v) {} }", "Redefinition of property (1:28)", {ecmaVersion: 6});

testFail("class A { get foo() {} foo() {} }", "Redefinition of property (1:23)", {ecmaVersion: 6});

testFail("class A { foo() {} get foo() {} }", "Redefinition of property (1:23)", {ecmaVersion: 6});

testFail("class A { set foo(v) {} foo() {} }", "Redefinition of property (1:24)", {ecmaVersion: 6});

testFail("class A { foo() {} set foo(v) {} }", "Redefinition of property (1:23)", {ecmaVersion: 6});

// ES6: Computed Properties

test("({[x]: 10})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          range: [3, 4],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "Literal",
          value: 10,
          raw: "10",
          range: [7, 9],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 9}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: true,
        range: [2, 9],
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 9}
        }
      }],
      range: [0, 11],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 11}
      }
    },
    range: [0, 11],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 11}
    }
  }],
  range: [0, 11],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 11}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[\"x\" + \"y\"]: 10})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "BinaryExpression",
          operator: "+",
          left: {
            type: "Literal",
            value: "x",
            raw: "\"x\"",
            range: [3, 6],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 6}
            }
          },
          right: {
            type: "Literal",
            value: "y",
            raw: "\"y\"",
            range: [9, 12],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 12}
            }
          },
          range: [3, 12],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 12}
          }
        },
        value: {
          type: "Literal",
          value: 10,
          raw: "10",
          range: [15, 17],
          loc: {
            start: {line: 1, column: 15},
            end: {line: 1, column: 17}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: true,
        range: [2, 17],
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 17}
        }
      }],
      range: [0, 19],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 19}
      }
    },
    range: [0, 19],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  range: [0, 19],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[x]: function() {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          range: [3, 4],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [18, 20],
            loc: {
              start: {line: 1, column: 18},
              end: {line: 1, column: 20}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [7, 20],
          loc: {
            start: {line: 1, column: 7},
            end: {line: 1, column: 20}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: true,
        range: [2, 20],
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 20}
        }
      }],
      range: [0, 22],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 22}
      }
    },
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[x]: 10, y: 20})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            range: [3, 4],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          value: {
            type: "Literal",
            value: 10,
            raw: "10",
            range: [7, 9],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 9}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: true,
          range: [2, 9],
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 9}
          }
        },
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "y",
            range: [11, 12],
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 12}
            }
          },
          value: {
            type: "Literal",
            value: 20,
            raw: "20",
            range: [14, 16],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 16}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [11, 16],
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 16}
          }
        }
      ],
      range: [0, 18],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 18}
      }
    },
    range: [0, 18],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  range: [0, 18],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({get [x]() {}, set [x](v) {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            range: [7, 8],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 8}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [12, 14],
              loc: {
                start: {line: 1, column: 12},
                end: {line: 1, column: 14}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [9, 14],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 14}
            }
          },
          kind: "get",
          method: false,
          shorthand: false,
          computed: true,
          range: [2, 14],
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 14}
          }
        },
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            range: [21, 22],
            loc: {
              start: {line: 1, column: 21},
              end: {line: 1, column: 22}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "v",
              range: [24, 25],
              loc: {
                start: {line: 1, column: 24},
                end: {line: 1, column: 25}
              }
            }],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [27, 29],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 29}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [23, 29],
            loc: {
              start: {line: 1, column: 23},
              end: {line: 1, column: 29}
            }
          },
          kind: "set",
          method: false,
          shorthand: false,
          computed: true,
          range: [16, 29],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 29}
          }
        }
      ],
      range: [0, 31],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 31}
      }
    },
    range: [0, 31],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 31}
    }
  }],
  range: [0, 31],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 31}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({[x]() {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          range: [3, 4],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [8, 10],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 10}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [5, 10],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 10}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: true,
        range: [2, 10],
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 10}
        }
      }],
      range: [0, 12],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var {[x]: y} = {y}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            range: [6, 7],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          value: {
            type: "Identifier",
            name: "y",
            range: [10, 11],
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 11}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: true,
          range: [5, 11],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 11}
          }
        }],
        range: [4, 12],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 12}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "y",
            range: [16, 17],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "Identifier",
            name: "y",
            range: [16, 17],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [16, 17],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 17}
          }
        }],
        range: [15, 18],
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 18}
        }
      },
      range: [4, 18],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 18}
      }
    }],
    kind: "var",
    range: [0, 18],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  range: [0, 18],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f({[x]: y}) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "ObjectPattern",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          range: [13, 14],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        value: {
          type: "Identifier",
          name: "y",
          range: [17, 18],
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 18}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: true,
        range: [12, 18],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 18}
        }
      }],
      range: [11, 19],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 19}
      }
    }],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [],
      range: [21, 23],
      loc: {
        start: {line: 1, column: 21},
        end: {line: 1, column: 23}
      }
    },
    rest: null,
    generator: false,
    expression: false,
    range: [0, 23],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 23}
    }
  }],
  range: [0, 23],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 23}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var x = {*[test]() { yield *v; }}", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "x",
        range: [4, 5],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 5}
        }
      },
      init: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "test",
            range: [11, 15],
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 15}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            defaults: [],
            body: {
              type: "BlockStatement",
              body: [{
                type: "ExpressionStatement",
                expression: {
                  type: "YieldExpression",
                  argument: {
                    type: "Identifier",
                    name: "v",
                    range: [28, 29],
                    loc: {
                      start: {line: 1, column: 28},
                      end: {line: 1, column: 29}
                    }
                  },
                  delegate: true,
                  range: [21, 29],
                  loc: {
                    start: {line: 1, column: 21},
                    end: {line: 1, column: 29}
                  }
                },
                range: [21, 30],
                loc: {
                  start: {line: 1, column: 21},
                  end: {line: 1, column: 30}
                }
              }],
              range: [19, 32],
              loc: {
                start: {line: 1, column: 19},
                end: {line: 1, column: 32}
              }
            },
            rest: null,
            generator: true,
            expression: false,
            range: [16, 32],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 32}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: true,
          range: [9, 32],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 32}
          }
        }],
        range: [8, 33],
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 33}
        }
      },
      range: [4, 33],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 33}
      }
    }],
    kind: "var",
    range: [0, 33],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  range: [0, 33],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("class A {[x]() {}}", {
  type: "Program",
  start: 0,
  end: 18,
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  },
  range: [0, 18],
  body: [{
    type: "ClassDeclaration",
    start: 0,
    end: 18,
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    },
    range: [0, 18],
    id: {
      type: "Identifier",
      start: 6,
      end: 7,
      loc: {
        start: {line: 1, column: 6},
        end: {line: 1, column: 7}
      },
      range: [6, 7],
      name: "A"
    },
    superClass: null,
    body: {
      type: "ClassBody",
      start: 8,
      end: 18,
      loc: {
        start: {line: 1, column: 8},
        end: {line: 1, column: 18}
      },
      range: [8, 18],
      body: [{
        type: "MethodDefinition",
        start: 9,
        end: 17,
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 17}
        },
        range: [9, 17],
        static: false,
        computed: true,
        key: {
          type: "Identifier",
          start: 10,
          end: 11,
          loc: {
            start: {line: 1, column: 10},
            end: {line: 1, column: 11}
          },
          range: [10, 11],
          name: "x"
        },
        kind: "",
        value: {
          type: "FunctionExpression",
          start: 12,
          end: 17,
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 17}
          },
          range: [12, 17],
          id: null,
          params: [],
          defaults: [],
          rest: null,
          generator: false,
          body: {
            type: "BlockStatement",
            start: 15,
            end: 17,
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 17}
            },
            range: [15, 17],
            body: []
          },
          expression: false
        }
      }]
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("({[x]})", "Unexpected token (1:5)", {ecmaVersion: 6});

// ES6: Default parameters

test("function f([x] = [1]) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "ArrayPattern",
      elements: [{
        type: "Identifier",
        name: "x",
        range: [12, 13],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 13}
        }
      }],
      range: [11, 14],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 14}
      }
    }],
    defaults: [{
      type: "ArrayExpression",
      elements: [{
        type: "Literal",
        value: 1,
        raw: "1",
        range: [18, 19],
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 19}
        }
      }],
      range: [17, 20],
      loc: {
        start: {line: 1, column: 17},
        end: {line: 1, column: 20}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [],
      range: [22, 24],
      loc: {
        start: {line: 1, column: 22},
        end: {line: 1, column: 24}
      }
    },
    rest: null,
    generator: false,
    expression: false,
    range: [0, 24],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  range: [0, 24],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f({x} = {x: 10}) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "ObjectPattern",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          range: [12, 13],
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 13}
          }
        },
        value: {
          type: "Identifier",
          name: "x",
          range: [12, 13],
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 13}
          }
        },
        kind: "init",
        method: false,
        shorthand: true,
        computed: false,
        range: [12, 13],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 13}
        }
      }],
      range: [11, 14],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 14}
      }
    }],
    defaults: [{
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          range: [18, 19],
          loc: {
            start: {line: 1, column: 18},
            end: {line: 1, column: 19}
          }
        },
        value: {
          type: "Literal",
          value: 10,
          raw: "10",
          range: [21, 23],
          loc: {
            start: {line: 1, column: 21},
            end: {line: 1, column: 23}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: false,
        range: [18, 23],
        loc: {
          start: {line: 1, column: 18},
          end: {line: 1, column: 23}
        }
      }],
      range: [17, 24],
      loc: {
        start: {line: 1, column: 17},
        end: {line: 1, column: 24}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [],
      range: [26, 28],
      loc: {
        start: {line: 1, column: 26},
        end: {line: 1, column: 28}
      }
    },
    rest: null,
    generator: false,
    expression: false,
    range: [0, 28],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 28}
    }
  }],
  range: [0, 28],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 28}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("f = function({x} = {x: 10}) {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "f",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "FunctionExpression",
        id: null,
        params: [{
          type: "ObjectPattern",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "x",
              range: [14, 15],
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            },
            value: {
              type: "Identifier",
              name: "x",
              range: [14, 15],
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            range: [14, 15],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 15}
            }
          }],
          range: [13, 16],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 16}
          }
        }],
        defaults: [{
          type: "ObjectExpression",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "x",
              range: [20, 21],
              loc: {
                start: {line: 1, column: 20},
                end: {line: 1, column: 21}
              }
            },
            value: {
              type: "Literal",
              value: 10,
              raw: "10",
              range: [23, 25],
              loc: {
                start: {line: 1, column: 23},
                end: {line: 1, column: 25}
              }
            },
            kind: "init",
            method: false,
            shorthand: false,
            computed: false,
            range: [20, 25],
            loc: {
              start: {line: 1, column: 20},
              end: {line: 1, column: 25}
            }
          }],
          range: [19, 26],
          loc: {
            start: {line: 1, column: 19},
            end: {line: 1, column: 26}
          }
        }],
        body: {
          type: "BlockStatement",
          body: [],
          range: [28, 30],
          loc: {
            start: {line: 1, column: 28},
            end: {line: 1, column: 30}
          }
        },
        rest: null,
        generator: false,
        expression: false,
        range: [4, 30],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 30}
        }
      },
      range: [0, 30],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 30}
      }
    },
    range: [0, 30],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 30}
    }
  }],
  range: [0, 30],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 30}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({f: function({x} = {x: 10}) {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "f",
          range: [2, 3],
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 3}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "ObjectPattern",
            properties: [{
              type: "Property",
              key: {
                type: "Identifier",
                name: "x",
                range: [15, 16],
                loc: {
                  start: {line: 1, column: 15},
                  end: {line: 1, column: 16}
                }
              },
              value: {
                type: "Identifier",
                name: "x",
                range: [15, 16],
                loc: {
                  start: {line: 1, column: 15},
                  end: {line: 1, column: 16}
                }
              },
              kind: "init",
              method: false,
              shorthand: true,
              computed: false,
              range: [15, 16],
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 16}
              }
            }],
            range: [14, 17],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 17}
            }
          }],
          defaults: [{
            type: "ObjectExpression",
            properties: [{
              type: "Property",
              key: {
                type: "Identifier",
                name: "x",
                range: [21, 22],
                loc: {
                  start: {line: 1, column: 21},
                  end: {line: 1, column: 22}
                }
              },
              value: {
                type: "Literal",
                value: 10,
                raw: "10",
                range: [24, 26],
                loc: {
                  start: {line: 1, column: 24},
                  end: {line: 1, column: 26}
                }
              },
              kind: "init",
              method: false,
              shorthand: false,
              computed: false,
              range: [21, 26],
              loc: {
                start: {line: 1, column: 21},
                end: {line: 1, column: 26}
              }
            }],
            range: [20, 27],
            loc: {
              start: {line: 1, column: 20},
              end: {line: 1, column: 27}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            range: [29, 31],
            loc: {
              start: {line: 1, column: 29},
              end: {line: 1, column: 31}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [5, 31],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 31}
          }
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: false,
        range: [2, 31],
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 31}
        }
      }],
      range: [0, 33],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 33}
      }
    },
    range: [0, 33],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  range: [0, 33],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({f({x} = {x: 10}) {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "f",
          range: [2, 3],
          loc: {
            start: {line: 1, column: 2},
            end: {line: 1, column: 3}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "ObjectPattern",
            properties: [{
              type: "Property",
              key: {
                type: "Identifier",
                name: "x",
                range: [5, 6],
                loc: {
                  start: {line: 1, column: 5},
                  end: {line: 1, column: 6}
                }
              },
              value: {
                type: "Identifier",
                name: "x",
                range: [5, 6],
                loc: {
                  start: {line: 1, column: 5},
                  end: {line: 1, column: 6}
                }
              },
              kind: "init",
              method: false,
              shorthand: true,
              computed: false,
              range: [5, 6],
              loc: {
                start: {line: 1, column: 5},
                end: {line: 1, column: 6}
              }
            }],
            range: [4, 7],
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 7}
            }
          }],
          defaults: [{
            type: "ObjectExpression",
            properties: [{
              type: "Property",
              key: {
                type: "Identifier",
                name: "x",
                range: [11, 12],
                loc: {
                  start: {line: 1, column: 11},
                  end: {line: 1, column: 12}
                }
              },
              value: {
                type: "Literal",
                value: 10,
                raw: "10",
                range: [14, 16],
                loc: {
                  start: {line: 1, column: 14},
                  end: {line: 1, column: 16}
                }
              },
              kind: "init",
              method: false,
              shorthand: false,
              computed: false,
              range: [11, 16],
              loc: {
                start: {line: 1, column: 11},
                end: {line: 1, column: 16}
              }
            }],
            range: [10, 17],
            loc: {
              start: {line: 1, column: 10},
              end: {line: 1, column: 17}
            }
          }],
          body: {
            type: "BlockStatement",
            body: [],
            range: [19, 21],
            loc: {
              start: {line: 1, column: 19},
              end: {line: 1, column: 21}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [3, 21],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 21}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: false,
        range: [2, 21],
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 21}
        }
      }],
      range: [0, 23],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 23}
      }
    },
    range: [0, 23],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 23}
    }
  }],
  range: [0, 23],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 23}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(class {f({x} = {x: 10}) {}})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ClassExpression",
      superClass: null,
      body: {
        type: "ClassBody",
        body: [{
          type: "MethodDefinition",
          computed: false,
          key: {
            type: "Identifier",
            name: "f",
            range: [8, 9],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 9}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "ObjectPattern",
              properties: [{
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "x",
                  range: [11, 12],
                  loc: {
                    start: {line: 1, column: 11},
                    end: {line: 1, column: 12}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "x",
                  range: [11, 12],
                  loc: {
                    start: {line: 1, column: 11},
                    end: {line: 1, column: 12}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                range: [11, 12],
                loc: {
                  start: {line: 1, column: 11},
                  end: {line: 1, column: 12}
                }
              }],
              range: [10, 13],
              loc: {
                start: {line: 1, column: 10},
                end: {line: 1, column: 13}
              }
            }],
            defaults: [{
              type: "ObjectExpression",
              properties: [{
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "x",
                  range: [17, 18],
                  loc: {
                    start: {line: 1, column: 17},
                    end: {line: 1, column: 18}
                  }
                },
                value: {
                  type: "Literal",
                  value: 10,
                  raw: "10",
                  range: [20, 22],
                  loc: {
                    start: {line: 1, column: 20},
                    end: {line: 1, column: 22}
                  }
                },
                kind: "init",
                method: false,
                shorthand: false,
                computed: false,
                range: [17, 22],
                loc: {
                  start: {line: 1, column: 17},
                  end: {line: 1, column: 22}
                }
              }],
              range: [16, 23],
              loc: {
                start: {line: 1, column: 16},
                end: {line: 1, column: 23}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              range: [25, 27],
              loc: {
                start: {line: 1, column: 25},
                end: {line: 1, column: 27}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [9, 27],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 27}
            }
          },
          kind: "",
          static: false,
          range: [8, 27],
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 27}
          }
        }],
        range: [7, 28],
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 28}
        }
      },
      range: [0, 29],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 29}
      }
    },
    range: [0, 29],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 29}
    }
  }],
  range: [0, 29],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 29}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(({x} = {x: 10}) => {})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            range: [3, 4],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          value: {
            type: "Identifier",
            name: "x",
            range: [3, 4],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [3, 4],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        }],
        range: [2, 5],
        loc: {
          start: {line: 1, column: 2},
          end: {line: 1, column: 5}
        }
      }],
      defaults: [{
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "x",
            range: [9, 10],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 10}
            }
          },
          value: {
            type: "Literal",
            value: 10,
            raw: "10",
            range: [12, 14],
            loc: {
              start: {line: 1, column: 12},
              end: {line: 1, column: 14}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [9, 14],
          loc: {
            start: {line: 1, column: 9},
            end: {line: 1, column: 14}
          }
        }],
        range: [8, 15],
        loc: {
          start: {line: 1, column: 8},
          end: {line: 1, column: 15}
        }
      }],
      body: {
        type: "BlockStatement",
        body: [],
        range: [20, 22],
        loc: {
          start: {line: 1, column: 20},
          end: {line: 1, column: 22}
        }
      },
      rest: null,
      generator: false,
      expression: false,
      range: [0, 23],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 23}
      }
    },
    range: [0, 23],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 23}
    }
  }],
  range: [0, 23],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 23}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = function(y = 1) {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "FunctionExpression",
        id: null,
        params: [{
          type: "Identifier",
          name: "y",
          range: [13, 14],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        }],
        defaults: [{
          type: "Literal",
          value: 1,
          raw: "1",
          range: [17, 18],
          loc: {
            start: {line: 1, column: 17},
            end: {line: 1, column: 18}
          }
        }],
        body: {
          type: "BlockStatement",
          body: [],
          range: [20, 22],
          loc: {
            start: {line: 1, column: 20},
            end: {line: 1, column: 22}
          }
        },
        rest: null,
        generator: false,
        expression: false,
        range: [4, 22],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 22}
        }
      },
      range: [0, 22],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 22}
      }
    },
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function f(a = 1) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "Identifier",
      name: "a",
      range: [11, 12],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 12}
      }
    }],
    defaults: [{
      type: "Literal",
      value: 1,
      raw: "1",
      range: [15, 16],
      loc: {
        start: {line: 1, column: 15},
        end: {line: 1, column: 16}
      }
    }],
    body: {
      type: "BlockStatement",
      body: [],
      range: [18, 20],
      loc: {
        start: {line: 1, column: 18},
        end: {line: 1, column: 20}
      }
    },
    rest: null,
    generator: false,
    expression: false,
    range: [0, 20],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  range: [0, 20],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { f: function(a=1) {} }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "f",
            range: [6, 7],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "a",
              range: [18, 19],
              loc: {
                start: {line: 1, column: 18},
                end: {line: 1, column: 19}
              }
            }],
            defaults: [{
              type: "Literal",
              value: 1,
              raw: "1",
              range: [20, 21],
              loc: {
                start: {line: 1, column: 20},
                end: {line: 1, column: 21}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              range: [23, 25],
              loc: {
                start: {line: 1, column: 23},
                end: {line: 1, column: 25}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [9, 25],
            loc: {
              start: {line: 1, column: 9},
              end: {line: 1, column: 25}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [6, 25],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 25}
          }
        }],
        range: [4, 27],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 27}
        }
      },
      range: [0, 27],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 27}
      }
    },
    range: [0, 27],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  range: [0, 27],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("x = { f(a=1) {} }", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: "x",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      },
      right: {
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "f",
            range: [6, 7],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 7}
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "a",
              range: [8, 9],
              loc: {
                start: {line: 1, column: 8},
                end: {line: 1, column: 9}
              }
            }],
            defaults: [{
              type: "Literal",
              value: 1,
              raw: "1",
              range: [10, 11],
              loc: {
                start: {line: 1, column: 10},
                end: {line: 1, column: 11}
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              range: [13, 15],
              loc: {
                start: {line: 1, column: 13},
                end: {line: 1, column: 15}
              }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [7, 15],
            loc: {
              start: {line: 1, column: 7},
              end: {line: 1, column: 15}
            }
          },
          kind: "init",
          method: true,
          shorthand: false,
          computed: false,
          range: [6, 15],
          loc: {
            start: {line: 1, column: 6},
            end: {line: 1, column: 15}
          }
        }],
        range: [4, 17],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 17}
        }
      },
      range: [0, 17],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Rest parameters

test("function f(a, ...b) {}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "f",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "Identifier",
      name: "a",
      range: [11, 12],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 12}
      }
    }],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [],
      range: [20, 22],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 22}
      }
    },
    rest: {
      type: "Identifier",
      name: "b",
      range: [17, 18],
      loc: {
        start: {line: 1, column: 17},
        end: {line: 1, column: 18}
      }
    },
    generator: false,
    expression: false,
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: Destructured Parameters

test("function x([ a, b ]){}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "x",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "ArrayPattern",
      elements: [
        {
          type: "Identifier",
          name: "a",
          range: [13, 14],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        {
          type: "Identifier",
          name: "b",
          range: [16, 17],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 17}
          }
        }
      ],
      range: [11, 19],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 19}
      }
    }],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [],
      range: [20, 22],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 22}
      }
    },
    rest: null,
    generator: false,
    expression: false,
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function x({ a, b }){}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "x",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "ObjectPattern",
      properties: [
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [13, 14],
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            range: [13, 14],
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [13, 14],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 14}
          }
        },
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "b",
            range: [16, 17],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "Identifier",
            name: "b",
            range: [16, 17],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [16, 17],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 17}
          }
        }
      ],
      range: [11, 19],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 19}
      }
    }],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [],
      range: [20, 22],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 22}
      }
    },
    rest: null,
    generator: false,
    expression: false,
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function x(a, { a }){}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "x",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [
      {
        type: "Identifier",
        name: "a",
        range: [11, 12],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 12}
        }
      },
      {
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [16, 17],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            range: [16, 17],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 17}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [16, 17],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 17}
          }
        }],
        range: [14, 19],
        loc: {
          start: {line: 1, column: 14},
          end: {line: 1, column: 19}
        }
      }
    ],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [],
      range: [20, 22],
      loc: {
        start: {line: 1, column: 20},
        end: {line: 1, column: 22}
      }
    },
    rest: null,
    generator: false,
    expression: false,
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function x(...[ a, b ]){}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "x",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [],
      range: [23, 25],
      loc: {
        start: {line: 1, column: 23},
        end: {line: 1, column: 25}
      }
    },
    rest: {
      type: "ArrayPattern",
      elements: [
        {
          type: "Identifier",
          name: "a",
          range: [16, 17],
          loc: {
            start: {line: 1, column: 16},
            end: {line: 1, column: 17}
          }
        },
        {
          type: "Identifier",
          name: "b",
          range: [19, 20],
          loc: {
            start: {line: 1, column: 19},
            end: {line: 1, column: 20}
          }
        }
      ],
      range: [14, 22],
      loc: {
        start: {line: 1, column: 14},
        end: {line: 1, column: 22}
      }
    },
    generator: false,
    expression: false,
    range: [0, 25],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 25}
    }
  }],
  range: [0, 25],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 25}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}", {
  type: "Program",
  body: [{
    type: "FunctionDeclaration",
    id: {
      type: "Identifier",
      name: "x",
      range: [9, 10],
      loc: {
        start: {line: 1, column: 9},
        end: {line: 1, column: 10}
      }
    },
    params: [{
      type: "ObjectPattern",
      properties: [
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [13, 14],
            loc: {
              start: {line: 1, column: 13},
              end: {line: 1, column: 14}
            }
          },
          value: {
            type: "ObjectPattern",
            properties: [
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "w",
                  range: [18, 19],
                  loc: {
                    start: {line: 1, column: 18},
                    end: {line: 1, column: 19}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "w",
                  range: [18, 19],
                  loc: {
                    start: {line: 1, column: 18},
                    end: {line: 1, column: 19}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                range: [18, 19],
                loc: {
                  start: {line: 1, column: 18},
                  end: {line: 1, column: 19}
                }
              },
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "x",
                  range: [21, 22],
                  loc: {
                    start: {line: 1, column: 21},
                    end: {line: 1, column: 22}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "x",
                  range: [21, 22],
                  loc: {
                    start: {line: 1, column: 21},
                    end: {line: 1, column: 22}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                range: [21, 22],
                loc: {
                  start: {line: 1, column: 21},
                  end: {line: 1, column: 22}
                }
              }
            ],
            range: [16, 24],
            loc: {
              start: {line: 1, column: 16},
              end: {line: 1, column: 24}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [13, 24],
          loc: {
            start: {line: 1, column: 13},
            end: {line: 1, column: 24}
          }
        },
        {
          type: "Property",
          key: {
            type: "Identifier",
            name: "b",
            range: [26, 27],
            loc: {
              start: {line: 1, column: 26},
              end: {line: 1, column: 27}
            }
          },
          value: {
            type: "ArrayPattern",
            elements: [
              {
                type: "Identifier",
                name: "y",
                range: [30, 31],
                loc: {
                  start: {line: 1, column: 30},
                  end: {line: 1, column: 31}
                }
              },
              {
                type: "Identifier",
                name: "z",
                range: [33, 34],
                loc: {
                  start: {line: 1, column: 33},
                  end: {line: 1, column: 34}
                }
              }
            ],
            range: [29, 35],
            loc: {
              start: {line: 1, column: 29},
              end: {line: 1, column: 35}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [26, 35],
          loc: {
            start: {line: 1, column: 26},
            end: {line: 1, column: 35}
          }
        }
      ],
      range: [11, 37],
      loc: {
        start: {line: 1, column: 11},
        end: {line: 1, column: 37}
      }
    }],
    defaults: [],
    body: {
      type: "BlockStatement",
      body: [],
      range: [52, 54],
      loc: {
        start: {line: 1, column: 52},
        end: {line: 1, column: 54}
      }
    },
    rest: {
      type: "ArrayPattern",
      elements: [
        {
          type: "Identifier",
          name: "a",
          range: [43, 44],
          loc: {
            start: {line: 1, column: 43},
            end: {line: 1, column: 44}
          }
        },
        {
          type: "Identifier",
          name: "b",
          range: [46, 47],
          loc: {
            start: {line: 1, column: 46},
            end: {line: 1, column: 47}
          }
        },
        {
          type: "Identifier",
          name: "c",
          range: [49, 50],
          loc: {
            start: {line: 1, column: 49},
            end: {line: 1, column: 50}
          }
        }
      ],
      range: [42, 51],
      loc: {
        start: {line: 1, column: 42},
        end: {line: 1, column: 51}
      }
    },
    generator: false,
    expression: false,
    range: [0, 54],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 54}
    }
  }],
  range: [0, 54],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 54}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function x([ a, b ]){})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: {
        type: "Identifier",
        name: "x",
        range: [10, 11],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 11}
        }
      },
      params: [{
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [14, 15],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 15}
            }
          },
          {
            type: "Identifier",
            name: "b",
            range: [17, 18],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 18}
            }
          }
        ],
        range: [12, 20],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 20}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [21, 23],
        loc: {
          start: {line: 1, column: 21},
          end: {line: 1, column: 23}
        }
      },
      rest: null,
      generator: false,
      expression: false,
      range: [0, 24],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 24}
      }
    },
    range: [0, 24],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  range: [0, 24],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function x({ a, b }){})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: {
        type: "Identifier",
        name: "x",
        range: [10, 11],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 11}
        }
      },
      params: [{
        type: "ObjectPattern",
        properties: [
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "a",
              range: [14, 15],
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            },
            value: {
              type: "Identifier",
              name: "a",
              range: [14, 15],
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            range: [14, 15],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 15}
            }
          },
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "b",
              range: [17, 18],
              loc: {
                start: {line: 1, column: 17},
                end: {line: 1, column: 18}
              }
            },
            value: {
              type: "Identifier",
              name: "b",
              range: [17, 18],
              loc: {
                start: {line: 1, column: 17},
                end: {line: 1, column: 18}
              }
            },
            kind: "init",
            method: false,
            shorthand: true,
            computed: false,
            range: [17, 18],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 18}
            }
          }
        ],
        range: [12, 20],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 20}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [21, 23],
        loc: {
          start: {line: 1, column: 21},
          end: {line: 1, column: 23}
        }
      },
      rest: null,
      generator: false,
      expression: false,
      range: [0, 24],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 24}
      }
    },
    range: [0, 24],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  range: [0, 24],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function x(...[ a, b ]){})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: {
        type: "Identifier",
        name: "x",
        range: [10, 11],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 11}
        }
      },
      params: [],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [24, 26],
        loc: {
          start: {line: 1, column: 24},
          end: {line: 1, column: 26}
        }
      },
      rest: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [17, 18],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 18}
            }
          },
          {
            type: "Identifier",
            name: "b",
            range: [20, 21],
            loc: {
              start: {line: 1, column: 20},
              end: {line: 1, column: 21}
            }
          }
        ],
        range: [15, 23],
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 23}
        }
      },
      generator: false,
      expression: false,
      range: [0, 27],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 27}
      }
    },
    range: [0, 27],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  range: [0, 27],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){})", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: {
        type: "Identifier",
        name: "x",
        range: [10, 11],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 11}
        }
      },
      params: [{
        type: "ObjectPattern",
        properties: [
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "a",
              range: [14, 15],
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            },
            value: {
              type: "ObjectPattern",
              properties: [
                {
                  type: "Property",
                  key: {
                    type: "Identifier",
                    name: "w",
                    range: [19, 20],
                    loc: {
                      start: {line: 1, column: 19},
                      end: {line: 1, column: 20}
                    }
                  },
                  value: {
                    type: "Identifier",
                    name: "w",
                    range: [19, 20],
                    loc: {
                      start: {line: 1, column: 19},
                      end: {line: 1, column: 20}
                    }
                  },
                  kind: "init",
                  method: false,
                  shorthand: true,
                  computed: false,
                  range: [19, 20],
                  loc: {
                    start: {line: 1, column: 19},
                    end: {line: 1, column: 20}
                  }
                },
                {
                  type: "Property",
                  key: {
                    type: "Identifier",
                    name: "x",
                    range: [22, 23],
                    loc: {
                      start: {line: 1, column: 22},
                      end: {line: 1, column: 23}
                    }
                  },
                  value: {
                    type: "Identifier",
                    name: "x",
                    range: [22, 23],
                    loc: {
                      start: {line: 1, column: 22},
                      end: {line: 1, column: 23}
                    }
                  },
                  kind: "init",
                  method: false,
                  shorthand: true,
                  computed: false,
                  range: [22, 23],
                  loc: {
                    start: {line: 1, column: 22},
                    end: {line: 1, column: 23}
                  }
                }
              ],
              range: [17, 25],
              loc: {
                start: {line: 1, column: 17},
                end: {line: 1, column: 25}
              }
            },
            kind: "init",
            method: false,
            shorthand: false,
            computed: false,
            range: [14, 25],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 25}
            }
          },
          {
            type: "Property",
            key: {
              type: "Identifier",
              name: "b",
              range: [27, 28],
              loc: {
                start: {line: 1, column: 27},
                end: {line: 1, column: 28}
              }
            },
            value: {
              type: "ArrayPattern",
              elements: [
                {
                  type: "Identifier",
                  name: "y",
                  range: [31, 32],
                  loc: {
                    start: {line: 1, column: 31},
                    end: {line: 1, column: 32}
                  }
                },
                {
                  type: "Identifier",
                  name: "z",
                  range: [34, 35],
                  loc: {
                    start: {line: 1, column: 34},
                    end: {line: 1, column: 35}
                  }
                }
              ],
              range: [30, 36],
              loc: {
                start: {line: 1, column: 30},
                end: {line: 1, column: 36}
              }
            },
            kind: "init",
            method: false,
            shorthand: false,
            computed: false,
            range: [27, 36],
            loc: {
              start: {line: 1, column: 27},
              end: {line: 1, column: 36}
            }
          }
        ],
        range: [12, 38],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 38}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [53, 55],
        loc: {
          start: {line: 1, column: 53},
          end: {line: 1, column: 55}
        }
      },
      rest: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [44, 45],
            loc: {
              start: {line: 1, column: 44},
              end: {line: 1, column: 45}
            }
          },
          {
            type: "Identifier",
            name: "b",
            range: [47, 48],
            loc: {
              start: {line: 1, column: 47},
              end: {line: 1, column: 48}
            }
          },
          {
            type: "Identifier",
            name: "c",
            range: [50, 51],
            loc: {
              start: {line: 1, column: 50},
              end: {line: 1, column: 51}
            }
          }
        ],
        range: [43, 52],
        loc: {
          start: {line: 1, column: 43},
          end: {line: 1, column: 52}
        }
      },
      generator: false,
      expression: false,
      range: [0, 56],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 56}
      }
    },
    range: [0, 56],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 56}
    }
  }],
  range: [0, 56],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 56}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ x([ a, b ]){} })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          range: [3, 4],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "ArrayPattern",
            elements: [
              {
                type: "Identifier",
                name: "a",
                range: [7, 8],
                loc: {
                  start: {line: 1, column: 7},
                  end: {line: 1, column: 8}
                }
              },
              {
                type: "Identifier",
                name: "b",
                range: [10, 11],
                loc: {
                  start: {line: 1, column: 10},
                  end: {line: 1, column: 11}
                }
              }
            ],
            range: [5, 13],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 13}
            }
          }],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [14, 16],
            loc: {
              start: {line: 1, column: 14},
              end: {line: 1, column: 16}
            }
          },
          rest: null,
          generator: false,
          expression: false,
          range: [4, 16],
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 16}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: false,
        range: [3, 16],
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 16}
        }
      }],
      range: [0, 19],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 19}
      }
    },
    range: [0, 19],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  range: [0, 19],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ x(...[ a, b ]){} })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          range: [3, 4],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [17, 19],
            loc: {
              start: {line: 1, column: 17},
              end: {line: 1, column: 19}
            }
          },
          rest: {
            type: "ArrayPattern",
            elements: [
              {
                type: "Identifier",
                name: "a",
                range: [10, 11],
                loc: {
                  start: {line: 1, column: 10},
                  end: {line: 1, column: 11}
                }
              },
              {
                type: "Identifier",
                name: "b",
                range: [13, 14],
                loc: {
                  start: {line: 1, column: 13},
                  end: {line: 1, column: 14}
                }
              }
            ],
            range: [8, 16],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 16}
            }
          },
          generator: false,
          expression: false,
          range: [4, 19],
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 19}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: false,
        range: [3, 19],
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 19}
        }
      }],
      range: [0, 22],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 22}
      }
    },
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){} })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ObjectExpression",
      properties: [{
        type: "Property",
        key: {
          type: "Identifier",
          name: "x",
          range: [3, 4],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        },
        value: {
          type: "FunctionExpression",
          id: null,
          params: [{
            type: "ObjectPattern",
            properties: [
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "a",
                  range: [7, 8],
                  loc: {
                    start: {line: 1, column: 7},
                    end: {line: 1, column: 8}
                  }
                },
                value: {
                  type: "ObjectPattern",
                  properties: [
                    {
                      type: "Property",
                      key: {
                        type: "Identifier",
                        name: "w",
                        range: [12, 13],
                        loc: {
                          start: {line: 1, column: 12},
                          end: {line: 1, column: 13}
                        }
                      },
                      value: {
                        type: "Identifier",
                        name: "w",
                        range: [12, 13],
                        loc: {
                          start: {line: 1, column: 12},
                          end: {line: 1, column: 13}
                        }
                      },
                      kind: "init",
                      method: false,
                      shorthand: true,
                      computed: false,
                      range: [12, 13],
                      loc: {
                        start: {line: 1, column: 12},
                        end: {line: 1, column: 13}
                      }
                    },
                    {
                      type: "Property",
                      key: {
                        type: "Identifier",
                        name: "x",
                        range: [15, 16],
                        loc: {
                          start: {line: 1, column: 15},
                          end: {line: 1, column: 16}
                        }
                      },
                      value: {
                        type: "Identifier",
                        name: "x",
                        range: [15, 16],
                        loc: {
                          start: {line: 1, column: 15},
                          end: {line: 1, column: 16}
                        }
                      },
                      kind: "init",
                      method: false,
                      shorthand: true,
                      computed: false,
                      range: [15, 16],
                      loc: {
                        start: {line: 1, column: 15},
                        end: {line: 1, column: 16}
                      }
                    }
                  ],
                  range: [10, 18],
                  loc: {
                    start: {line: 1, column: 10},
                    end: {line: 1, column: 18}
                  }
                },
                kind: "init",
                method: false,
                shorthand: false,
                computed: false,
                range: [7, 18],
                loc: {
                  start: {line: 1, column: 7},
                  end: {line: 1, column: 18}
                }
              },
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "b",
                  range: [20, 21],
                  loc: {
                    start: {line: 1, column: 20},
                    end: {line: 1, column: 21}
                  }
                },
                value: {
                  type: "ArrayPattern",
                  elements: [
                    {
                      type: "Identifier",
                      name: "y",
                      range: [24, 25],
                      loc: {
                        start: {line: 1, column: 24},
                        end: {line: 1, column: 25}
                      }
                    },
                    {
                      type: "Identifier",
                      name: "z",
                      range: [27, 28],
                      loc: {
                        start: {line: 1, column: 27},
                        end: {line: 1, column: 28}
                      }
                    }
                  ],
                  range: [23, 29],
                  loc: {
                    start: {line: 1, column: 23},
                    end: {line: 1, column: 29}
                  }
                },
                kind: "init",
                method: false,
                shorthand: false,
                computed: false,
                range: [20, 29],
                loc: {
                  start: {line: 1, column: 20},
                  end: {line: 1, column: 29}
                }
              }
            ],
            range: [5, 31],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 31}
            }
          }],
          defaults: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [46, 48],
            loc: {
              start: {line: 1, column: 46},
              end: {line: 1, column: 48}
            }
          },
          rest: {
            type: "ArrayPattern",
            elements: [
              {
                type: "Identifier",
                name: "a",
                range: [37, 38],
                loc: {
                  start: {line: 1, column: 37},
                  end: {line: 1, column: 38}
                }
              },
              {
                type: "Identifier",
                name: "b",
                range: [40, 41],
                loc: {
                  start: {line: 1, column: 40},
                  end: {line: 1, column: 41}
                }
              },
              {
                type: "Identifier",
                name: "c",
                range: [43, 44],
                loc: {
                  start: {line: 1, column: 43},
                  end: {line: 1, column: 44}
                }
              }
            ],
            range: [36, 45],
            loc: {
              start: {line: 1, column: 36},
              end: {line: 1, column: 45}
            }
          },
          generator: false,
          expression: false,
          range: [4, 48],
          loc: {
            start: {line: 1, column: 4},
            end: {line: 1, column: 48}
          }
        },
        kind: "init",
        method: true,
        shorthand: false,
        computed: false,
        range: [3, 48],
        loc: {
          start: {line: 1, column: 3},
          end: {line: 1, column: 48}
        }
      }],
      range: [0, 51],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 51}
      }
    },
    range: [0, 51],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 51}
    }
  }],
  range: [0, 51],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 51}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(...a) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [10, 12],
        loc: {
          start: {line: 1, column: 10},
          end: {line: 1, column: 12}
        }
      },
      rest: {
        type: "Identifier",
        name: "a",
        range: [4, 5],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 5}
        }
      },
      generator: false,
      expression: false,
      range: [0, 12],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      }
    },
    range: [0, 12],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    }
  }],
  range: [0, 12],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, ...b) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "a",
        range: [1, 2],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [13, 15],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 15}
        }
      },
      rest: {
        type: "Identifier",
        name: "b",
        range: [7, 8],
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 8}
        }
      },
      generator: false,
      expression: false,
      range: [0, 15],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 15}
      }
    },
    range: [0, 15],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 15}
    }
  }],
  range: [0, 15],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 15}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a }) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [3, 4],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            range: [3, 4],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [3, 4],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        }],
        range: [1, 6],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 6}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [11, 13],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 13}
        }
      },
      rest: null,
      generator: false,
      expression: false,
      range: [0, 13],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    range: [0, 13],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  range: [0, 13],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a }, ...b) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [3, 4],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          value: {
            type: "Identifier",
            name: "a",
            range: [3, 4],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          kind: "init",
          method: false,
          shorthand: true,
          computed: false,
          range: [3, 4],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 4}
          }
        }],
        range: [1, 6],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 6}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [17, 19],
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 19}
        }
      },
      rest: {
        type: "Identifier",
        name: "b",
        range: [11, 12],
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 12}
        }
      },
      generator: false,
      expression: false,
      range: [0, 19],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 19}
      }
    },
    range: [0, 19],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 19}
    }
  }],
  range: [0, 19],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 19}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(...[a, b]) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [15, 17],
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 17}
        }
      },
      rest: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          {
            type: "Identifier",
            name: "b",
            range: [8, 9],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 9}
            }
          }
        ],
        range: [4, 10],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 10}
        }
      },
      generator: false,
      expression: false,
      range: [0, 17],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("(a, ...[b]) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "a",
        range: [1, 2],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 2}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [15, 17],
        loc: {
          start: {line: 1, column: 15},
          end: {line: 1, column: 17}
        }
      },
      rest: {
        type: "ArrayPattern",
        elements: [{
          type: "Identifier",
          name: "b",
          range: [8, 9],
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 9}
          }
        }],
        range: [7, 10],
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 10}
        }
      },
      generator: false,
      expression: false,
      range: [0, 17],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 17}
      }
    },
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a: [a, b] }, ...c) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "ObjectPattern",
        properties: [{
          type: "Property",
          key: {
            type: "Identifier",
            name: "a",
            range: [3, 4],
            loc: {
              start: {line: 1, column: 3},
              end: {line: 1, column: 4}
            }
          },
          value: {
            type: "ArrayPattern",
            elements: [
              {
                type: "Identifier",
                name: "a",
                range: [7, 8],
                loc: {
                  start: {line: 1, column: 7},
                  end: {line: 1, column: 8}
                }
              },
              {
                type: "Identifier",
                name: "b",
                range: [10, 11],
                loc: {
                  start: {line: 1, column: 10},
                  end: {line: 1, column: 11}
                }
              }
            ],
            range: [6, 12],
            loc: {
              start: {line: 1, column: 6},
              end: {line: 1, column: 12}
            }
          },
          kind: "init",
          method: false,
          shorthand: false,
          computed: false,
          range: [3, 12],
          loc: {
            start: {line: 1, column: 3},
            end: {line: 1, column: 12}
          }
        }],
        range: [1, 14],
        loc: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 14}
        }
      }],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [25, 27],
        loc: {
          start: {line: 1, column: 25},
          end: {line: 1, column: 27}
        }
      },
      rest: {
        type: "Identifier",
        name: "c",
        range: [19, 20],
        loc: {
          start: {line: 1, column: 19},
          end: {line: 1, column: 20}
        }
      },
      generator: false,
      expression: false,
      range: [0, 27],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 27}
      }
    },
    range: [0, 27],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  range: [0, 27],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("({ a: b, c }, [d, e], ...f) => {}", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [
        {
          type: "ObjectPattern",
          properties: [
            {
              type: "Property",
              key: {
                type: "Identifier",
                name: "a",
                range: [3, 4],
                loc: {
                  start: {line: 1, column: 3},
                  end: {line: 1, column: 4}
                }
              },
              value: {
                type: "Identifier",
                name: "b",
                range: [6, 7],
                loc: {
                  start: {line: 1, column: 6},
                  end: {line: 1, column: 7}
                }
              },
              kind: "init",
              method: false,
              shorthand: false,
              computed: false,
              range: [3, 7],
              loc: {
                start: {line: 1, column: 3},
                end: {line: 1, column: 7}
              }
            },
            {
              type: "Property",
              key: {
                type: "Identifier",
                name: "c",
                range: [9, 10],
                loc: {
                  start: {line: 1, column: 9},
                  end: {line: 1, column: 10}
                }
              },
              value: {
                type: "Identifier",
                name: "c",
                range: [9, 10],
                loc: {
                  start: {line: 1, column: 9},
                  end: {line: 1, column: 10}
                }
              },
              kind: "init",
              method: false,
              shorthand: true,
              computed: false,
              range: [9, 10],
              loc: {
                start: {line: 1, column: 9},
                end: {line: 1, column: 10}
              }
            }
          ],
          range: [1, 12],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 12}
          }
        },
        {
          type: "ArrayPattern",
          elements: [
            {
              type: "Identifier",
              name: "d",
              range: [15, 16],
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 16}
              }
            },
            {
              type: "Identifier",
              name: "e",
              range: [18, 19],
              loc: {
                start: {line: 1, column: 18},
                end: {line: 1, column: 19}
              }
            }
          ],
          range: [14, 20],
          loc: {
            start: {line: 1, column: 14},
            end: {line: 1, column: 20}
          }
        }
      ],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [],
        range: [31, 33],
        loc: {
          start: {line: 1, column: 31},
          end: {line: 1, column: 33}
        }
      },
      rest: {
        type: "Identifier",
        name: "f",
        range: [25, 26],
        loc: {
          start: {line: 1, column: 25},
          end: {line: 1, column: 26}
        }
      },
      generator: false,
      expression: false,
      range: [0, 33],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 33}
      }
    },
    range: [0, 33],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 33}
    }
  }],
  range: [0, 33],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 33}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// ES6: SpreadElement

test("[...a] = b", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [{
          type: "SpreadElement",
          argument: {
            type: "Identifier",
            name: "a",
            range: [4, 5],
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 5}
            }
          },
          range: [1, 5],
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 5}
          }
        }],
        range: [0, 6],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 6}
        }
      },
      right: {
        type: "Identifier",
        name: "b",
        range: [9, 10],
        loc: {
          start: {line: 1, column: 9},
          end: {line: 1, column: 10}
        }
      },
      range: [0, 10],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 10}
      }
    },
    range: [0, 10],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 10}
    }
  }],
  range: [0, 10],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 10}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[a, ...b] = c", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [1, 2],
            loc: {
              start: {line: 1, column: 1},
              end: {line: 1, column: 2}
            }
          },
          {
            type: "SpreadElement",
            argument: {
              type: "Identifier",
              name: "b",
              range: [7, 8],
              loc: {
                start: {line: 1, column: 7},
                end: {line: 1, column: 8}
              }
            },
            range: [4, 8],
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 8}
            }
          }
        ],
        range: [0, 9],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 9}
        }
      },
      right: {
        type: "Identifier",
        name: "c",
        range: [12, 13],
        loc: {
          start: {line: 1, column: 12},
          end: {line: 1, column: 13}
        }
      },
      range: [0, 13],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    range: [0, 13],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  range: [0, 13],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[{ a, b }, ...c] = d", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [
          {
            type: "ObjectPattern",
            properties: [
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "a",
                  range: [3, 4],
                  loc: {
                    start: {line: 1, column: 3},
                    end: {line: 1, column: 4}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "a",
                  range: [3, 4],
                  loc: {
                    start: {line: 1, column: 3},
                    end: {line: 1, column: 4}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                range: [3, 4],
                loc: {
                  start: {line: 1, column: 3},
                  end: {line: 1, column: 4}
                }
              },
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "b",
                  range: [6, 7],
                  loc: {
                    start: {line: 1, column: 6},
                    end: {line: 1, column: 7}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "b",
                  range: [6, 7],
                  loc: {
                    start: {line: 1, column: 6},
                    end: {line: 1, column: 7}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                range: [6, 7],
                loc: {
                  start: {line: 1, column: 6},
                  end: {line: 1, column: 7}
                }
              }
            ],
            range: [1, 9],
            loc: {
              start: {line: 1, column: 1},
              end: {line: 1, column: 9}
            }
          },
          {
            type: "SpreadElement",
            argument: {
              type: "Identifier",
              name: "c",
              range: [14, 15],
              loc: {
                start: {line: 1, column: 14},
                end: {line: 1, column: 15}
              }
            },
            range: [11, 15],
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 15}
            }
          }
        ],
        range: [0, 16],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 16}
        }
      },
      right: {
        type: "Identifier",
        name: "d",
        range: [19, 20],
        loc: {
          start: {line: 1, column: 19},
          end: {line: 1, column: 20}
        }
      },
      range: [0, 20],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 20}
      }
    },
    range: [0, 20],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 20}
    }
  }],
  range: [0, 20],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 20}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("[a, ...[b, c]] = d", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [1, 2],
            loc: {
              start: {line: 1, column: 1},
              end: {line: 1, column: 2}
            }
          },
          {
            type: "SpreadElement",
            argument: {
              type: "ArrayPattern",
              elements: [
                {
                  type: "Identifier",
                  name: "b",
                  range: [8, 9],
                  loc: {
                    start: {line: 1, column: 8},
                    end: {line: 1, column: 9}
                  }
                },
                {
                  type: "Identifier",
                  name: "c",
                  range: [11, 12],
                  loc: {
                    start: {line: 1, column: 11},
                    end: {line: 1, column: 12}
                  }
                }
              ],
              range: [7, 13],
              loc: {
                start: {line: 1, column: 7},
                end: {line: 1, column: 13}
              }
            },
            range: [4, 13],
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 13}
            }
          }
        ],
        range: [0, 14],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 14}
        }
      },
      right: {
        type: "Identifier",
        name: "d",
        range: [17, 18],
        loc: {
          start: {line: 1, column: 17},
          end: {line: 1, column: 18}
        }
      },
      range: [0, 18],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 18}
      }
    },
    range: [0, 18],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 18}
    }
  }],
  range: [0, 18],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 18}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [...a] = b", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [{
          type: "SpreadElement",
          argument: {
            type: "Identifier",
            name: "a",
            range: [8, 9],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 9}
            }
          },
          range: [5, 9],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 9}
          }
        }],
        range: [4, 10],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 10}
        }
      },
      init: {
        type: "Identifier",
        name: "b",
        range: [13, 14],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 14}
        }
      },
      range: [4, 14],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 14}
      }
    }],
    kind: "var",
    range: [0, 14],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  range: [0, 14],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [a, ...b] = c", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          {
            type: "SpreadElement",
            argument: {
              type: "Identifier",
              name: "b",
              range: [11, 12],
              loc: {
                start: {line: 1, column: 11},
                end: {line: 1, column: 12}
              }
            },
            range: [8, 12],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 12}
            }
          }
        ],
        range: [4, 13],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 13}
        }
      },
      init: {
        type: "Identifier",
        name: "c",
        range: [16, 17],
        loc: {
          start: {line: 1, column: 16},
          end: {line: 1, column: 17}
        }
      },
      range: [4, 17],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 17}
      }
    }],
    kind: "var",
    range: [0, 17],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 17}
    }
  }],
  range: [0, 17],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 17}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [{ a, b }, ...c] = d", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [
          {
            type: "ObjectPattern",
            properties: [
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "a",
                  range: [7, 8],
                  loc: {
                    start: {line: 1, column: 7},
                    end: {line: 1, column: 8}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "a",
                  range: [7, 8],
                  loc: {
                    start: {line: 1, column: 7},
                    end: {line: 1, column: 8}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                range: [7, 8],
                loc: {
                  start: {line: 1, column: 7},
                  end: {line: 1, column: 8}
                }
              },
              {
                type: "Property",
                key: {
                  type: "Identifier",
                  name: "b",
                  range: [10, 11],
                  loc: {
                    start: {line: 1, column: 10},
                    end: {line: 1, column: 11}
                  }
                },
                value: {
                  type: "Identifier",
                  name: "b",
                  range: [10, 11],
                  loc: {
                    start: {line: 1, column: 10},
                    end: {line: 1, column: 11}
                  }
                },
                kind: "init",
                method: false,
                shorthand: true,
                computed: false,
                range: [10, 11],
                loc: {
                  start: {line: 1, column: 10},
                  end: {line: 1, column: 11}
                }
              }
            ],
            range: [5, 13],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 13}
            }
          },
          {
            type: "SpreadElement",
            argument: {
              type: "Identifier",
              name: "c",
              range: [18, 19],
              loc: {
                start: {line: 1, column: 18},
                end: {line: 1, column: 19}
              }
            },
            range: [15, 19],
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 19}
            }
          }
        ],
        range: [4, 20],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 20}
        }
      },
      init: {
        type: "Identifier",
        name: "d",
        range: [23, 24],
        loc: {
          start: {line: 1, column: 23},
          end: {line: 1, column: 24}
        }
      },
      range: [4, 24],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 24}
      }
    }],
    kind: "var",
    range: [0, 24],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 24}
    }
  }],
  range: [0, 24],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 24}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("var [a, ...[b, c]] = d", {
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: {
        type: "ArrayPattern",
        elements: [
          {
            type: "Identifier",
            name: "a",
            range: [5, 6],
            loc: {
              start: {line: 1, column: 5},
              end: {line: 1, column: 6}
            }
          },
          {
            type: "SpreadElement",
            argument: {
              type: "ArrayPattern",
              elements: [
                {
                  type: "Identifier",
                  name: "b",
                  range: [12, 13],
                  loc: {
                    start: {line: 1, column: 12},
                    end: {line: 1, column: 13}
                  }
                },
                {
                  type: "Identifier",
                  name: "c",
                  range: [15, 16],
                  loc: {
                    start: {line: 1, column: 15},
                    end: {line: 1, column: 16}
                  }
                }
              ],
              range: [11, 17],
              loc: {
                start: {line: 1, column: 11},
                end: {line: 1, column: 17}
              }
            },
            range: [8, 17],
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 17}
            }
          }
        ],
        range: [4, 18],
        loc: {
          start: {line: 1, column: 4},
          end: {line: 1, column: 18}
        }
      },
      init: {
        type: "Identifier",
        name: "d",
        range: [21, 22],
        loc: {
          start: {line: 1, column: 21},
          end: {line: 1, column: 22}
        }
      },
      range: [4, 22],
      loc: {
        start: {line: 1, column: 4},
        end: {line: 1, column: 22}
      }
    }],
    kind: "var",
    range: [0, 22],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 22}
    }
  }],
  range: [0, 22],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 22}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("func(...a)", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "func",
        range: [0, 4],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 4}
        }
      },
      arguments: [{
        type: "SpreadElement",
        argument: {
          type: "Identifier",
          name: "a",
          range: [8, 9],
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 9}
          }
        },
        range: [5, 9],
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 9}
        }
      }],
      range: [0, 10],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 10}
      }
    },
    range: [0, 10],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 10}
    }
  }],
  range: [0, 10],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 10}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("func(a, ...b)", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "func",
        range: [0, 4],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 4}
        }
      },
      arguments: [
        {
          type: "Identifier",
          name: "a",
          range: [5, 6],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 6}
          }
        },
        {
          type: "SpreadElement",
          argument: {
            type: "Identifier",
            name: "b",
            range: [11, 12],
            loc: {
              start: {line: 1, column: 11},
              end: {line: 1, column: 12}
            }
          },
          range: [8, 12],
          loc: {
            start: {line: 1, column: 8},
            end: {line: 1, column: 12}
          }
        }
      ],
      range: [0, 13],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      }
    },
    range: [0, 13],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    }
  }],
  range: [0, 13],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("func(...a, b)", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 13}
  },
  range: [0, 13],
  body: [{
    type: "ExpressionStatement",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 13}
    },
    range: [0, 13],
    expression: {
      type: "CallExpression",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 13}
      },
      range: [0, 13],
      callee: {
        type: "Identifier",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 4}
        },
        range: [0, 4],
        name: "func"
      },
      arguments: [
        {
          type: "SpreadElement",
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 9}
          },
          range: [5, 9],
          argument: {
            type: "Identifier",
            loc: {
              start: {line: 1, column: 8},
              end: {line: 1, column: 9}
            },
            range: [8, 9],
            name: "a"
          }
        },
        {
          type: "Identifier",
          loc: {
            start: {line: 1, column: 11},
            end: {line: 1, column: 12}
          },
          range: [11, 12],
          name: "b"
        }
      ]
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

// Harmony Invalid syntax

testFail("0o", "Expected number in radix 8 (1:2)", {ecmaVersion: 6});

testFail("0o1a", "Identifier directly after number (1:3)", {ecmaVersion: 6});

testFail("0o9", "Expected number in radix 8 (1:2)", {ecmaVersion: 6});

testFail("0o18", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0O", "Expected number in radix 8 (1:2)", {ecmaVersion: 6});

testFail("0O1a", "Identifier directly after number (1:3)", {ecmaVersion: 6});

testFail("0O9", "Expected number in radix 8 (1:2)", {ecmaVersion: 6});

testFail("0O18", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0b", "Expected number in radix 2 (1:2)", {ecmaVersion: 6});

testFail("0b1a", "Identifier directly after number (1:3)", {ecmaVersion: 6});

testFail("0b9", "Expected number in radix 2 (1:2)", {ecmaVersion: 6});

testFail("0b18", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0b12", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0B", "Expected number in radix 2 (1:2)", {ecmaVersion: 6});

testFail("0B1a", "Identifier directly after number (1:3)", {ecmaVersion: 6});

testFail("0B9", "Expected number in radix 2 (1:2)", {ecmaVersion: 6});

testFail("0B18", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("0B12", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("\"\\u{110000}\"", "Unexpected token (1:0)", {ecmaVersion: 6});

testFail("\"\\u{}\"", "Bad character escape sequence (1:0)", {ecmaVersion: 6});

testFail("\"\\u{FFFF\"", "Bad character escape sequence (1:0)", {ecmaVersion: 6});

testFail("\"\\u{FFZ}\"", "Bad character escape sequence (1:0)", {ecmaVersion: 6});

testFail("[v] += ary", "Assigning to rvalue (1:0)", {ecmaVersion: 6});

testFail("[2] = 42", "Assigning to rvalue (1:1)", {ecmaVersion: 6});

testFail("({ obj:20 }) = 42", "Assigning to rvalue (1:7)", {ecmaVersion: 6});

testFail("( { get x() {} } ) = 0", "Unexpected token (1:8)", {ecmaVersion: 6});

testFail("x \n is y", "Unexpected token (2:4)", {ecmaVersion: 6});

testFail("x \n isnt y", "Unexpected token (2:6)", {ecmaVersion: 6});

testFail("function default() {}", "Unexpected token (1:9)", {ecmaVersion: 6});

testFail("function hello() {'use strict'; ({ i: 10, s(eval) { } }); }", "Defining 'eval' in strict mode (1:44)", {ecmaVersion: 6});

testFail("function a() { \"use strict\"; ({ b(t, t) { } }); }", "Argument name clash in strict mode (1:37)", {ecmaVersion: 6});

testFail("var super", "The keyword 'super' is reserved (1:4)", {ecmaVersion: 6, forbidReserved: true});

testFail("var default", "Unexpected token (1:4)", {ecmaVersion: 6});

testFail("let default", "Unexpected token (1:4)", {ecmaVersion: 6});

testFail("const default", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("\"use strict\"; ({ v: eval }) = obj", "Assigning to eval in strict mode (1:20)", {ecmaVersion: 6});

testFail("\"use strict\"; ({ v: arguments }) = obj", "Assigning to arguments in strict mode (1:20)", {ecmaVersion: 6});

testFail("for (let x = 42 in list) process(x);", "Unexpected token (1:16)", {ecmaVersion: 6});

testFail("for (let x = 42 of list) process(x);", "Unexpected token (1:16)", {ecmaVersion: 6});

testFail("import foo", "Unexpected token (1:10)", {ecmaVersion: 6});

testFail("import { foo, bar }", "Unexpected token (1:19)", {ecmaVersion: 6});

testFail("import foo from bar", "Unexpected token (1:16)", {ecmaVersion: 6});

testFail("((a)) => 42", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("(a, (b)) => 42", "Unexpected token (1:9)", {ecmaVersion: 6});

testFail("\"use strict\"; (eval = 10) => 42", "Assigning to eval in strict mode (1:15)", {ecmaVersion: 6});

testFail("\"use strict\"; eval => 42", "Defining 'eval' in strict mode (1:14)", {ecmaVersion: 6});

testFail("\"use strict\"; arguments => 42", "Defining 'arguments' in strict mode (1:14)", {ecmaVersion: 6});

testFail("\"use strict\"; (eval, a) => 42", "Defining 'eval' in strict mode (1:15)", {ecmaVersion: 6});

testFail("\"use strict\"; (arguments, a) => 42", "Defining 'arguments' in strict mode (1:15)", {ecmaVersion: 6});

testFail("\"use strict\"; (eval, a = 10) => 42", "Defining 'eval' in strict mode (1:15)", {ecmaVersion: 6});

testFail("\"use strict\"; (a, a) => 42", "Argument name clash in strict mode (1:18)", {ecmaVersion: 6});

testFail("\"use strict\"; (a) => 00", "Invalid number (1:21)", {ecmaVersion: 6});

testFail("() <= 42", "Unexpected token (1:1)", {ecmaVersion: 6});

testFail("(10) => 00", "Unexpected token (1:1)", {ecmaVersion: 6});

testFail("(10, 20) => 00", "Unexpected token (1:1)", {ecmaVersion: 6});

testFail("yield v", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("yield 10", "Unexpected token (1:6)", {ecmaVersion: 6});

test("yield* 10", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "BinaryExpression",
      operator: "*",
      left: {
        type: "Identifier",
        name: "yield",
        range: [0, 5],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 5}
        }
      },
      right: {
        type: "Literal",
        value: 10,
        raw: "10",
        range: [7, 9],
        loc: {
          start: {line: 1, column: 7},
          end: {line: 1, column: 9}
        }
      },
      range: [0, 9],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 9}
      }
    },
    range: [0, 9],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 9}
    }
  }],
  range: [0, 9],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 9}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

test("e => yield* 10", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "ArrowFunctionExpression",
      id: null,
      params: [{
        type: "Identifier",
        name: "e",
        range: [0, 1],
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 1}
        }
      }],
      defaults: [],
      body: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "yield",
          range: [5, 10],
          loc: {
            start: {line: 1, column: 5},
            end: {line: 1, column: 10}
          }
        },
        right: {
          type: "Literal",
          value: 10,
          raw: "10",
          range: [12, 14],
          loc: {
            start: {line: 1, column: 12},
            end: {line: 1, column: 14}
          }
        },
        range: [5, 14],
        loc: {
          start: {line: 1, column: 5},
          end: {line: 1, column: 14}
        }
      },
      rest: null,
      generator: false,
      expression: true,
      range: [0, 14],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 14}
      }
    },
    range: [0, 14],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 14}
    }
  }],
  range: [0, 14],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 14}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("(function () { yield 10 })", "Unexpected token (1:21)", {ecmaVersion: 6});

test("(function () { yield* 10 })", {
  type: "Program",
  body: [{
    type: "ExpressionStatement",
    expression: {
      type: "FunctionExpression",
      id: null,
      params: [],
      defaults: [],
      body: {
        type: "BlockStatement",
        body: [{
          type: "ExpressionStatement",
          expression: {
            type: "BinaryExpression",
            operator: "*",
            left: {
              type: "Identifier",
              name: "yield",
              range: [15, 20],
              loc: {
                start: {line: 1, column: 15},
                end: {line: 1, column: 20}
              }
            },
            right: {
              type: "Literal",
              value: 10,
              raw: "10",
              range: [22, 24],
              loc: {
                start: {line: 1, column: 22},
                end: {line: 1, column: 24}
              }
            },
            range: [15, 24],
            loc: {
              start: {line: 1, column: 15},
              end: {line: 1, column: 24}
            }
          },
          range: [15, 24],
          loc: {
            start: {line: 1, column: 15},
            end: {line: 1, column: 24}
          }
        }],
        range: [13, 26],
        loc: {
          start: {line: 1, column: 13},
          end: {line: 1, column: 26}
        }
      },
      rest: null,
      generator: false,
      expression: false,
      range: [0, 27],
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 27}
      }
    },
    range: [0, 27],
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 27}
    }
  }],
  range: [0, 27],
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 27}
  }
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("(function() { \"use strict\"; f(yield v) })", "Unexpected token (1:36)", {ecmaVersion: 6});

testFail("var obj = { *test** }", "Unexpected token (1:17)", {ecmaVersion: 6});

testFail("class A extends yield B { }", "Unexpected token (1:22)", {ecmaVersion: 6});

testFail("class default", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("`test", "Unterminated string constant (1:1)", {ecmaVersion: 6});

testFail("switch `test`", "Unexpected token (1:7)", {ecmaVersion: 6});

testFail("`hello ${10 `test`", "Unexpected token (1:18)", {ecmaVersion: 6});

testFail("`hello ${10;test`", "Unexpected token (1:11)", {ecmaVersion: 6});

testFail("function a() 1 // expression closure is not supported", "Unexpected token (1:13)", {ecmaVersion: 6});

testFail("[for (let x of []) x]", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("[for (const x of []) x]", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("[for (var x of []) x]", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("[for (a in []) x] // (a,b) ", "Unexpected token (1:8)", {ecmaVersion: 6});

testFail("var a = [if (x) x]", "Unexpected token (1:9)", {ecmaVersion: 6});

testFail("[for (x of [])]  // no expression", "Unexpected token (1:14)", {ecmaVersion: 6});

testFail("({ \"chance\" }) = obj", "Unexpected token (1:12)", {ecmaVersion: 6});

testFail("({ 42 }) = obj", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("function f(a, ...b, c)", "Unexpected token (1:18)", {ecmaVersion: 6});

testFail("function f(a, ...b = 0)", "Unexpected token (1:19)", {ecmaVersion: 6});

testFail("function x(...{ a }){}", "Unexpected token (1:14)", {ecmaVersion: 6});

testFail("\"use strict\"; function x(a, { a }){}", "Argument name clash in strict mode (1:30)", {ecmaVersion: 6});

testFail("\"use strict\"; function x({ b: { a } }, [{ b: { a } }]){}", "Argument name clash in strict mode (1:47)", {ecmaVersion: 6});

testFail("\"use strict\"; function x(a, ...[a]){}", "Argument name clash in strict mode (1:32)", {ecmaVersion: 6});

testFail("(...a, b) => {}", "Unexpected token (1:1)", {ecmaVersion: 6});

testFail("([ 5 ]) => {}", "Unexpected token (1:3)", {ecmaVersion: 6});

testFail("({ 5 }) => {}", "Unexpected token (1:5)", {ecmaVersion: 6});

testFail("(...[ 5 ]) => {}", "Unexpected token (1:6)", {ecmaVersion: 6});

testFail("[...{ a }] = b", "Unexpected token (1:4)", {ecmaVersion: 6});

testFail("[...a, b] = c", "Unexpected token (1:1)", {ecmaVersion: 6});

testFail("({ t(eval) { \"use strict\"; } });", "Defining 'eval' in strict mode (1:5)", {ecmaVersion: 6});

testFail("\"use strict\"; `${test}\\02`;", "Octal literal in strict mode (1:22)", {ecmaVersion: 6});

test("[...a, ] = b", {
  type: "Program",
  loc: {
    start: {line: 1, column: 0},
    end: {line: 1, column: 12}
  },
  range: [0, 12],
  body: [{
    type: "ExpressionStatement",
    loc: {
      start: {line: 1, column: 0},
      end: {line: 1, column: 12}
    },
    range: [0, 12],
    expression: {
      type: "AssignmentExpression",
      loc: {
        start: {line: 1, column: 0},
        end: {line: 1, column: 12}
      },
      range: [0, 12],
      operator: "=",
      left: {
        type: "ArrayPattern",
        loc: {
          start: {line: 1, column: 0},
          end: {line: 1, column: 8}
        },
        range: [0, 8],
        elements: [{
          type: "SpreadElement",
          loc: {
            start: {line: 1, column: 1},
            end: {line: 1, column: 5}
          },
          range: [1, 5],
          argument: {
            type: "Identifier",
            loc: {
              start: {line: 1, column: 4},
              end: {line: 1, column: 5}
            },
            range: [4, 5],
            name: "a"
          }
        }]
      },
      right: {
        type: "Identifier",
        loc: {
          start: {line: 1, column: 11},
          end: {line: 1, column: 12}
        },
        range: [11, 12],
        name: "b"
      }
    }
  }]
}, {
  ecmaVersion: 6,
  ranges: true,
  locations: true
});

testFail("if (b,...a, );", "Unexpected token (1:12)", {ecmaVersion: 6});

testFail("(b, ...a)", "Unexpected token (1:9)", {ecmaVersion: 6});

testFail("switch (cond) { case 10: let a = 20; ", "Unexpected token (1:37)", {ecmaVersion: 6});

testFail("\"use strict\"; (eval) => 42", "Defining 'eval' in strict mode (1:15)", {ecmaVersion: 6});

testFail("(eval) => { \"use strict\"; 42 }", "Defining 'eval' in strict mode (1:1)", {ecmaVersion: 6});

testFail("({ get test() { } }) => 42", "Unexpected token (1:7)", {ecmaVersion: 6});
