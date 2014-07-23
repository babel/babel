/*
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2011 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2011 Arpad Borsos <arpad.borsos@googlemail.com>

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

module.exports = {

    'ES6 Unicode Code Point Escape Sequence': {

        '"\\u{714E}\\u{8336}"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: '煎茶',
                raw: '"\\u{714E}\\u{8336}"',
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        '"\\u{20BB7}\\u{91CE}\\u{5BB6}"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: '\ud842\udfb7\u91ce\u5bb6',
                raw: '"\\u{20BB7}\\u{91CE}\\u{5BB6}"',
                range: [0, 27],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 27 }
                }
            },
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        }
    },

    // ECMAScript 6th Syntax, 7.8.3 Numeric Literals

    'ES6: Numeric Literal': {

        '00': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '00',
                range: [0, 2],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 2 }
                }
            },
            range: [0, 2],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 2 }
            }
        },

        '0o0': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0o0',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        'function test() {\'use strict\'; 0o0; }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'test',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            params: [],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
                        raw: '\'use strict\'',
                        range: [17, 29],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    range: [17, 30],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 30 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 0,
                        raw: '0o0',
                        range: [31, 34],
                        loc: {
                            start: { line: 1, column: 31 },
                            end: { line: 1, column: 34 }
                        }
                    },
                    range: [31, 35],
                    loc: {
                        start: { line: 1, column: 31 },
                        end: { line: 1, column: 35 }
                    }
                }],
                range: [16, 37],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 37 }
                }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [0, 37],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 37 }
            }
        },

        '0o2': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 2,
                raw: '0o2',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0o12': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 10,
                raw: '0o12',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        '0O0': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0O0',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        'function test() {\'use strict\'; 0O0; }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'test',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            params: [],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
                        raw: '\'use strict\'',
                        range: [17, 29],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    range: [17, 30],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 30 }
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 0,
                        raw: '0O0',
                        range: [31, 34],
                        loc: {
                            start: { line: 1, column: 31 },
                            end: { line: 1, column: 34 }
                        }
                    },
                    range: [31, 35],
                    loc: {
                        start: { line: 1, column: 31 },
                        end: { line: 1, column: 35 }
                    }
                }],
                range: [16, 37],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 37 }
                }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [0, 37],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 37 }
            }
        },

        '0O2': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 2,
                raw: '0O2',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0O12': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 10,
                raw: '0O12',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },


        '0b0': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0b0',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0b1': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 1,
                raw: '0b1',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0b10': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 2,
                raw: '0b10',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        '0B0': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 0,
                raw: '0B0',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0B1': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 1,
                raw: '0B1',
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '0B10': {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 2,
                raw: '0B10',
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        }

    },

    // ECMAScript 6th Syntax, 11.1. 9 Template Literals

    'ES6 Template Strings': {
        '`42`': {
            type: 'ExpressionStatement',
            expression: {
                type: 'TemplateLiteral',
                quasis: [{
                    type: 'TemplateElement',
                    value: {
                        raw: '42',
                        cooked: '42'
                    },
                    tail: true,
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                }],
                expressions: [],
                range: [0, 4],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 4 }
                }
            },
            range: [0, 4],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 4 }
            }
        },

        'raw`42`': {
            type: 'ExpressionStatement',
            expression: {
                type: 'TaggedTemplateExpression',
                tag: {
                    type: 'Identifier',
                    name: 'raw',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                },
                quasi: {
                    type: 'TemplateLiteral',
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            raw: '42',
                            cooked: '42'
                        },
                        tail: true,
                        range: [3, 7],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 7 }
                        }
                    }],
                    expressions: [],
                    range: [3, 7],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 7 }
                    }
                },
                range: [0, 7],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 7],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 7 }
            }
        },

        'raw`hello ${name}`': {
            type: 'ExpressionStatement',
            expression: {
                type: 'TaggedTemplateExpression',
                tag: {
                    type: 'Identifier',
                    name: 'raw',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                },
                quasi: {
                    type: 'TemplateLiteral',
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            raw: 'hello ',
                            cooked: 'hello '
                        },
                        tail: false,
                        range: [3, 12],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 12 }
                        }
                    }, {
                        type: 'TemplateElement',
                        value: {
                            raw: '',
                            cooked: ''
                        },
                        tail: true,
                        range: [16, 18],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 18 }
                        }
                    }],
                    expressions: [{
                        type: 'Identifier',
                        name: 'name',
                        range: [12, 16],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 16 }
                        }
                    }],
                    range: [3, 18],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        '`$`': {
            type: 'ExpressionStatement',
            expression: {
                type: 'TemplateLiteral',
                quasis: [{
                    type: 'TemplateElement',
                    value: {
                        raw: '$',
                        cooked: '$'
                    },
                    tail: true,
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                }],
                expressions: [],
                range: [0, 3],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 3 }
                }
            },
            range: [0, 3],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 3 }
            }
        },

        '`\\n\\r\\b\\v\\t\\f\\\n\\\r\n`': {
            type: 'ExpressionStatement',
            expression: {
                type: 'TemplateLiteral',
                quasis: [{
                    type: 'TemplateElement',
                    value: {
                        raw: '\\n\\r\\b\\v\\t\\f\\\n\\\r\n',
                        cooked: '\n\r\b\v\t\f'
                    },
                    tail: true,
                    range: [0, 19],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 3, column: 19 }
                    }
                }],
                expressions: [],
                range: [0, 19],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 3, column: 19 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 3, column: 19 }
            }
        },

        '`\n\r\n`': {
            type: 'ExpressionStatement',
            expression: {
                type: 'TemplateLiteral',
                quasis: [{
                    type: 'TemplateElement',
                    value: {
                        raw: '\n\r\n',
                        cooked: '\n\n'
                    },
                    tail: true,
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 3, column: 5 }
                    }
                }],
                expressions: [],
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 3, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 3, column: 5 }
            }
        },

        '`\\u{000042}\\u0042\\x42\\u0\\102\\A`': {
            type: 'ExpressionStatement',
            expression: {
                type: 'TemplateLiteral',
                quasis: [{
                    type: 'TemplateElement',
                    value: {
                        raw: '\\u{000042}\\u0042\\x42\\u0\\102\\A',
                        cooked: 'BBBu0BA'
                    },
                    tail: true,
                    range: [0, 31],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 31 }
                    }
                }],
                expressions: [],
                range: [0, 31],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 31 }
                }
            },
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        },

        'new raw`42`': {
            type: 'ExpressionStatement',
            expression: {
                type: 'NewExpression',
                callee: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'raw',
                        range: [4, 7],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                raw: '42',
                                cooked: '42'
                            },
                            tail: true,
                            range: [7, 11],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 11 }
                            }
                        }],
                        expressions: [],
                        range: [7, 11],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    range: [4, 11],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 11 }
                    }
                },
                'arguments': [],
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        }

    },


    // ECMAScript 6th Syntax, 12.11 The switch statement

    'ES6: Switch Case Declaration': {

        'switch (answer) { case 42: let t = 42; break; }': {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'answer',
                range: [8, 14],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                }
            },
            cases: [{
                type: 'SwitchCase',
                test: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [23, 25],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 25 }
                    }
                },
                consequent: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 't',
                            range: [31, 32],
                            loc: {
                                start: { line: 1, column: 31 },
                                end: { line: 1, column: 32 }
                            }
                        },
                        init: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [35, 37],
                            loc: {
                                start: { line: 1, column: 35 },
                                end: { line: 1, column: 37 }
                            }
                        },
                        range: [31, 37],
                        loc: {
                            start: { line: 1, column: 31 },
                            end: { line: 1, column: 37 }
                        }
                    }],
                    kind: 'let',
                    range: [27, 38],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 38 }
                    }
                }, {
                    type: 'BreakStatement',
                    label: null,
                    range: [39, 45],
                    loc: {
                        start: { line: 1, column: 39 },
                        end: { line: 1, column: 45 }
                    }
                }],
                range: [18, 45],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 45 }
                }
            }],
            range: [0, 47],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 47 }
            }
        }
    },

    // ECMAScript 6th Syntax, 13.2 Arrow Function Definitions

    'ES6: Arrow Function': {
        '() => "test"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 'test',
                    raw: '"test"',
                    range: [6, 12],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 12 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        'e => "test"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'e',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 'test',
                    raw: '"test"',
                    range: [5, 11],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 11 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        '(e) => "test"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'e',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 'test',
                    raw: '"test"',
                    range: [7, 13],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 13 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        '(a, b) => "test"': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'a',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'b',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 'test',
                    raw: '"test"',
                    range: [10, 16],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 16 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        'e => { 42; }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'e',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [7, 9],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        range: [7, 10],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 10 }
                        }
                    }],
                    range: [5, 12],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 12 }
                    }
                },
                rest: null,
                generator: false,
                expression: false,
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        'e => ({ property: 42 })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'e',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'property',
                            range: [8, 16],
                            loc: {
                                start: { line: 1, column: 8 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [18, 20],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [8, 20],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 20 }
                        }
                    }],
                    range: [6, 22],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 22 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 23],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 23 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        // Not an object!
        'e => { label: 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'e',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'LabeledStatement',
                        label: {
                            type: 'Identifier',
                            name: 'label',
                            range: [7, 12],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        body: {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Literal',
                                value: 42,
                                raw: '42',
                                range: [14, 16],
                                loc: {
                                    start: { line: 1, column: 14 },
                                    end: { line: 1, column: 16 }
                                }
                            },
                            range: [14, 17],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        range: [7, 17],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    range: [5, 18],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 18 }
                    }
                },
                rest: null,
                generator: false,
                expression: false,
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        '(a, b) => { 42; }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'a',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'b',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 42,
                            raw: '42',
                            range: [12, 14],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        range: [12, 15],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 15 }
                        }
                    }],
                    range: [10, 17],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 17 }
                    }
                },
                rest: null,
                generator: false,
                expression: false,
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        '([a, , b]) => 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [2, 3],
                        loc: {
                            start: { line: 1, column: 2 },
                            end: { line: 1, column: 3 }
                        }
                    }, null, {
                        type: 'Identifier',
                        name: 'b',
                        range: [7, 8],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [1, 9],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 9 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [14, 16],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 16 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            },
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        '([a.a]) => 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Identifier',
                            name: 'a',
                            range: [2, 3],
                            loc: {
                                start: { line: 1, column: 2 },
                                end: { line: 1, column: 3 }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'a',
                            range: [4, 5],
                            loc: {
                                start: { line: 1, column: 4 },
                                end: { line: 1, column: 5 }
                            }
                        },
                        range: [2, 5],
                        loc: {
                            start: { line: 1, column: 2 },
                            end: { line: 1, column: 5 }
                        }
                    }],
                    range: [1, 6],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 6 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [11, 13],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 13 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        '(x=1) => x * x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                }],
                defaults: [{
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [3, 4],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 4 }
                    }
                }],
                body: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'x',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [9, 14],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 14 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        // not strict mode, using eval
        'eval => 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'eval',
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [8, 10],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 10 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        },

        // not strict mode, using arguments
        'arguments => 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'arguments',
                    range: [0, 9],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [13, 15],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 15 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        // not strict mode, using octals
        '(a) => 00': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'a',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 0,
                    raw: '00',
                    range: [7, 9],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 9 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        // not strict mode, using eval, IsSimpleParameterList is true
        '(eval, a) => 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'eval',
                    range: [1, 5],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 5 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'a',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [13, 15],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 15 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        // not strict mode, assigning to eval
        '(eval = 10) => 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'eval',
                    range: [1, 5],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 5 }
                    }
                }],
                defaults: [{
                    type: 'Literal',
                    value: 10,
                    raw: '10',
                    range: [8, 10],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 10 }
                    }
                }],
                body: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [15, 17],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 17 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        // not strict mode, using eval, IsSimpleParameterList is false
        '(eval, a = 10) => 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'eval',
                    range: [1, 5],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 5 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'a',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                }],
                defaults: [null, {
                    type: 'Literal',
                    value: 10,
                    raw: '10',
                    range: [11, 13],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 13 }
                    }
                }],
                body: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [18, 20],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 20 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        '(x => x)': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'Identifier',
                    name: 'x',
                    range: [6, 7],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 7 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [1, 7],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 7 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'x => y => 42': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'ArrowFunctionExpression',
                    id: null,
                    params: [{
                        type: 'Identifier',
                        name: 'y',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    }],
                    defaults: [],
                    body: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [10, 12],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: true,
                    range: [5, 12],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 12 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        '(x) => ((y, z) => (x, y, z))': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'ArrowFunctionExpression',
                    id: null,
                    params: [{
                        type: 'Identifier',
                        name: 'y',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'z',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    }],
                    defaults: [],
                    body: {
                        type: 'SequenceExpression',
                        expressions: [{
                            type: 'Identifier',
                            name: 'x',
                            range: [19, 20],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 20 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'y',
                            range: [22, 23],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 23 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'z',
                            range: [25, 26],
                            loc: {
                                start: { line: 1, column: 25 },
                                end: { line: 1, column: 26 }
                            }
                        }],
                        range: [19, 26],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: true,
                    range: [8, 27],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 27 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 28],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 28 }
                }
            },
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'foo(() => {})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'foo',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                },
                'arguments': [{
                    type: 'ArrowFunctionExpression',
                    id: null,
                    params: [],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [10, 12],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: false,
                    range: [4, 12],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 12 }
                    }
                }],
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        'foo((x, y) => {})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'foo',
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                },
                'arguments': [{
                    type: 'ArrowFunctionExpression',
                    id: null,
                    params: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'y',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    }],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [14, 16],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 16 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: false,
                    range: [4, 16],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 16 }
                    }
                }],
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        }

    },


    // ECMAScript 6th Syntax, 13.13 Method Definitions

    'ES6: Method Definition': {

        'x = { method() { } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'method',
                            range: [6, 12],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [15, 18],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 18 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [15, 18],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 18 }
                            }
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        computed: false,
                        range: [6, 18],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 18 }
                        }
                    }],
                    range: [4, 20],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 20 }
                    }
                },
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'x = { method(test) { } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'method',
                            range: [6, 12],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'test',
                                range: [13, 17],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 17 }
                                }
                            }],
                            defaults: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [19, 22],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 22 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [19, 22],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 22 }
                            }
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        computed: false,
                        range: [6, 22],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 22 }
                        }
                    }],
                    range: [4, 24],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 24 }
                    }
                },
                range: [0, 24],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'x = { \'method\'() { } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'method',
                            raw: '\'method\'',
                            range: [6, 14],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [17, 20],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 20 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [17, 20],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        computed: false,
                        range: [6, 20],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 20 }
                        }
                    }],
                    range: [4, 22],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 22 }
                    }
                },
                range: [0, 22],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'x = { get() { } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'get',
                            range: [6, 9],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [12, 15],
                                loc: {
                                    start: { line: 1, column: 12 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [12, 15],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        computed: false,
                        range: [6, 15],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 15 }
                        }
                    }],
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'x = { set() { } }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'set',
                            range: [6, 9],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [12, 15],
                                loc: {
                                    start: { line: 1, column: 12 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [12, 15],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        computed: false,
                        range: [6, 15],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 15 }
                        }
                    }],
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'x = { method() 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'method',
                            range: [6, 12],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'Literal',
                                value: 42,
                                raw: '42',
                                range: [15, 17],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 17 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: true,
                            range: [15, 17],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        computed: false,
                        range: [6, 17],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    range: [4, 19],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 19 }
                    }
                },
                range: [0, 19],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'x = { get method() 42 }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'method',
                            range: [10, 16],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'Literal',
                                value: 42,
                                raw: '42',
                                range: [19, 21],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 21 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: true,
                            range: [19, 21],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 21 }
                            }
                        },
                        kind: 'get',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [6, 21],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 21 }
                        }
                    }],
                    range: [4, 23],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 23 }
                    }
                },
                range: [0, 23],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 23 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        'x = { set method(val) v = val }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'method',
                            range: [10, 16],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'val',
                                range: [17, 20],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 20 }
                                }
                            }],
                            defaults: [],
                            body: {
                                type: 'AssignmentExpression',
                                operator: '=',
                                left: {
                                    type: 'Identifier',
                                    name: 'v',
                                    range: [22, 23],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 23 }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'val',
                                    range: [26, 29],
                                    loc: {
                                        start: { line: 1, column: 26 },
                                        end: { line: 1, column: 29 }
                                    }
                                },
                                range: [22, 29],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 29 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: true,
                            range: [22, 29],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        kind: 'set',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [6, 29],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 29 }
                        }
                    }],
                    range: [4, 31],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 31 }
                    }
                },
                range: [0, 31],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 31 }
                }
            },
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        }

    },

    'Array Comprehension': {

        '[[x,b,c] for (x in []) for (b in []) if (b && c)]' : {
            type: 'ExpressionStatement',
            expression: {
                type: 'ComprehensionExpression',
                filter: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'Identifier',
                        name: 'b',
                        range: [41, 42],
                        loc: {
                            start: { line: 1, column: 41 },
                            end: { line: 1, column: 42 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'c',
                        range: [46, 47],
                        loc: {
                            start: { line: 1, column: 46 },
                            end: { line: 1, column: 47 }
                        }
                    },
                    range: [41, 47],
                    loc: {
                        start: { line: 1, column: 41 },
                        end: { line: 1, column: 47 }
                    }
                },
                blocks: [{
                    type: 'ComprehensionBlock',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [14, 15],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [19, 21],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    each: false,
                    range: [9, 22],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 22 }
                    },
                    of: false
                }, {
                    type: 'ComprehensionBlock',
                    left: {
                        type: 'Identifier',
                        name: 'b',
                        range: [28, 29],
                        loc: {
                            start: { line: 1, column: 28 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [33, 35],
                        loc: {
                            start: { line: 1, column: 33 },
                            end: { line: 1, column: 35 }
                        }
                    },
                    each: false,
                    range: [23, 36],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 36 }
                    },
                    of: false
                }],
                body: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [2, 3],
                        loc: {
                            start: { line: 1, column: 2 },
                            end: { line: 1, column: 3 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'b',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'c',
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    }],
                    range: [1, 8],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 8 }
                    }
                },
                range: [0, 49],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 49 }
                }
            },
            range: [0, 49],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 49 }
            }
        },

        '[x for (a in [])]' : {
            type: 'ExpressionStatement',
            expression: {
                type: 'ComprehensionExpression',
                filter: null,
                blocks: [{
                    type: 'ComprehensionBlock',
                    left: {
                        type: 'Identifier',
                        name: 'a',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [13, 15],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    each: false,
                    range: [3, 16],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 16 }
                    },
                    of: false
                }],
                body: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        '[1 for (x in [])]' : {
            type: 'ExpressionStatement',
            expression: {
                type: 'ComprehensionExpression',
                filter: null,
                blocks: [{
                    type: 'ComprehensionBlock',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [13, 15],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    each: false,
                    range: [3, 16],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 16 }
                    },
                    of: false
                }],
                body: {
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        '[(x,1) for (x in [])]' : {
            type: 'ExpressionStatement',
            expression: {
                type: 'ComprehensionExpression',
                filter: null,
                blocks: [{
                    type: 'ComprehensionBlock',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [17, 19],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    each: false,
                    range: [7, 20],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 20 }
                    },
                    of: false
                }],
                body: {
                    type: 'SequenceExpression',
                    expressions: [{
                        type: 'Identifier',
                        name: 'x',
                        range: [2, 3],
                        loc: {
                            start: { line: 1, column: 2 },
                            end: { line: 1, column: 3 }
                        }
                    }, {
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    }],
                    range: [2, 5],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 5 }
                    }
                },
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },


        '[x for (x of array)]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ComprehensionExpression',
                filter: null,
                blocks: [{
                    type: 'ComprehensionBlock',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'array',
                        range: [13, 18],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [3, 19],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 19 }
                    },
                    of: true
                }],
                body: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        '[x for (x of array) for (y of array2) if (x === test)]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ComprehensionExpression',
                filter: {
                    type: 'BinaryExpression',
                    operator: '===',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [42, 43],
                        loc: {
                            start: { line: 1, column: 42 },
                            end: { line: 1, column: 43 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'test',
                        range: [48, 52],
                        loc: {
                            start: { line: 1, column: 48 },
                            end: { line: 1, column: 52 }
                        }
                    },
                    range: [42, 52],
                    loc: {
                        start: { line: 1, column: 42 },
                        end: { line: 1, column: 52 }
                    }
                },
                blocks: [{
                    type: 'ComprehensionBlock',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'array',
                        range: [13, 18],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    range: [3, 19],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 19 }
                    },
                    of: true
                }, {
                    type: 'ComprehensionBlock',
                    left: {
                        type: 'Identifier',
                        name: 'y',
                        range: [25, 26],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'array2',
                        range: [30, 36],
                        loc: {
                            start: { line: 1, column: 30 },
                            end: { line: 1, column: 36 }
                        }
                    },
                    range: [20, 37],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 37 }
                    },
                    of: true
                }],
                body: {
                    type: 'Identifier',
                    name: 'x',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                },
                range: [0, 54],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 54 }
                }
            },
            range: [0, 54],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 54 }
            }
        }

    },

    // http://wiki.ecmascript.org/doku.php?id=harmony:object_literals#object_literal_property_value_shorthand

    'Harmony: Object Literal Property Value Shorthand': {

        'x = { y, z }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'y',
                            range: [6, 7],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'y',
                            range: [6, 7],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [6, 7],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 7 }
                        }
                    }, {
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'z',
                            range: [9, 10],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'z',
                            range: [9, 10],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    }],
                    range: [4, 12],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        }

    },

    // http://wiki.ecmascript.org/doku.php?id=harmony:destructuring

    'Harmony: Destructuring': {

        '[a, b] = [b, a]': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [1, 2],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 2 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'b',
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    }],
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Identifier',
                        name: 'b',
                        range: [10, 11],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 11 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'a',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    range: [9, 15],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 15 }
                    }
                },
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '({ responseText: text }) = res': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'responseText',
                            range: [3, 15],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'text',
                            range: [17, 21],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 21 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [3, 21],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 21 }
                        }
                    }],
                    range: [1, 23],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 23 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'res',
                    range: [27, 30],
                    loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [0, 30],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'const {a} = {}': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'a',
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [7, 8],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [6, 9],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 9 }
                    }
                },
                init: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [12, 14],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [6, 14],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 14 }
                }
            }],
            kind: 'const',
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'const [a] = []': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [7, 8],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [6, 9],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 9 }
                    }
                },
                init: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [12, 14],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [6, 14],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 14 }
                }
            }],
            kind: 'const',
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'let {a} = {}': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'a',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    }],
                    range: [4, 7],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                },
                init: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [10, 12],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [4, 12],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 12 }
                }
            }],
            kind: 'let',
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        'let [a] = []': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    }],
                    range: [4, 7],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                },
                init: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [10, 12],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [4, 12],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 12 }
                }
            }],
            kind: 'let',
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        'var {a} = {}': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'a',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    }],
                    range: [4, 7],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                },
                init: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [10, 12],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [4, 12],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 12 }
                }
            }],
            kind: 'var',
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        'var [a] = []': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    }],
                    range: [4, 7],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 7 }
                    }
                },
                init: {
                    type: 'ArrayExpression',
                    elements: [],
                    range: [10, 12],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [4, 12],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 12 }
                }
            }],
            kind: 'var',
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        'const {a:b} = {}': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'b',
                            range: [9, 10],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [7, 10],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 10 }
                        }
                    }],
                    range: [6, 11],
                    loc: {
                        start: { line: 1, column: 6 },
                        end: { line: 1, column: 11 }
                    }
                },
                init: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [14, 16],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 16 }
                    }
                },
                range: [6, 16],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 16 }
                }
            }],
            kind: 'const',
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            }
        },

        'let {a:b} = {}': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'b',
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [5, 8],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                init: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [12, 14],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [4, 14],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 14 }
                }
            }],
            kind: 'let',
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'var {a:b} = {}': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'b',
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [5, 8],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [4, 9],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 9 }
                    }
                },
                init: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [12, 14],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [4, 14],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 14 }
                }
            }],
            kind: 'var',
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        }


    },

    // http://wiki.ecmascript.org/doku.php?id=harmony:modules

    'Harmony: Modules': {

        'module "crypto" {}': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'crypto',
                raw: '"crypto"',
                range: [7, 15],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 15 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [],
                range: [16, 18],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'module crypto from "crypto";': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Identifier',
                name: 'crypto',
                range: [7, 13],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 13 }
                }
            },
            source: {
                type: 'Literal',
                value: 'crypto',
                raw: '"crypto"',
                range: [19, 27],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 27 }
                }
            },
            body: null,
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'module "crypto/e" {}': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'crypto/e',
                raw: '"crypto/e"',
                range: [7, 17],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 17 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [],
                range: [18, 20],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'export var document': {
            type: 'ExportDeclaration',
            declaration: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'document',
                        range: [ 11, 19 ],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    init: null,
                    range: [ 11, 19 ],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 19 }
                    }
                }],
                kind: 'var',
                range: [ 7, 19 ],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 19 }
                }
            },
            specifiers: null,
            source: null,
            range: [ 0, 19 ],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'export var document = { }': {
            type: 'ExportDeclaration',
            declaration: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'document',
                        range: [ 11, 19 ],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    init: {
                        type: 'ObjectExpression',
                        properties: [],
                        range: [ 22, 25 ],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 25 }
                        }
                    },
                    range: [ 11, 25 ],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 25 }
                    }
                }],
                kind: 'var',
                range: [ 7, 25 ],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 25 }
                }
            },
            specifiers: null,
            source: null,
            range: [ 0, 25 ],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        'export let document': {
            type: 'ExportDeclaration',
            declaration: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'document',
                        range: [ 11, 19 ],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    init: null,
                    range: [ 11, 19 ],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 19 }
                    }
                }],
                kind: 'let',
                range: [ 7, 19 ],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 19 }
                }
            },
            specifiers: null,
            source: null,
            range: [ 0, 19 ],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'export let document = { }': {
            type: 'ExportDeclaration',
            declaration: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'document',
                        range: [ 11, 19 ],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    init: {
                        type: 'ObjectExpression',
                        properties: [],
                        range: [ 22, 25 ],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 25 }
                        }
                    },
                    range: [ 11, 25 ],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 25 }
                    }
                }],
                kind: 'let',
                range: [ 7, 25 ],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 25 }
                }
            },
            specifiers: null,
            source: null,
            range: [ 0, 25 ],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        'export const document = { }': {
            type: 'ExportDeclaration',
            declaration: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'document',
                        range: [ 13, 21 ],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    init: {
                        type: 'ObjectExpression',
                        properties: [],
                        range: [ 24, 27 ],
                        loc: {
                            start: { line: 1, column: 24 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    range: [ 13, 27 ],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 27 }
                    }
                }],
                kind: 'const',
                range: [ 7, 27 ],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 27 }
                }
            },
            specifiers: null,
            source: null,
            range: [ 0, 27 ],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'export function parse() { }': {
            type: 'ExportDeclaration',
            declaration: {
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'parse',
                    range: [ 16, 21 ],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 21 }
                    }
                },
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [ 24, 27 ],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 27 }
                    }
                },
                rest: null,
                generator: false,
                expression: false,
                range: [ 7, 27 ],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 27 }
                }
            },
            specifiers: null,
            source: null,
            range: [ 0, 27 ],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'export class Class {}': {
            type: 'ExportDeclaration',
            declaration: {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Class',
                    range: [ 13, 18 ],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 18 }
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [],
                    range: [ 19, 21 ],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 21 }
                    }
                },
                range: [ 7, 21 ],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 21 }
                }
            },
            specifiers: null,
            source: null,
            range: [ 0, 21 ],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'export default = 42': {
            type: 'ExportDeclaration',
            declaration: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'default',
                    range: [7, 14],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 14 }
                    }
                },
                init: {
                    type: 'Literal',
                    value: 42,
                    raw: '42',
                    range: [17, 19],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 19 }
                    }
                },
                range: [7, 19],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 19 }
                }
            }],
            specifiers: null,
            source: null,
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        'export *': {
            type: 'ExportDeclaration',
            declaration: null,
            specifiers: [{
                type: 'ExportBatchSpecifier',
                range: [7, 8],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 8 }
                }
            }],
            source: null,
            range: [ 0, 8 ],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'export * from "crypto"': {
            type: 'ExportDeclaration',
            declaration: null,
            specifiers: [{
                type: 'ExportBatchSpecifier',
                range: [7, 8],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 8 }
                }
            }],
            source: {
                type: 'Literal',
                value: 'crypto',
                raw: '"crypto"',
                range: [14, 22],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'export { encrypt }': {
            type: 'ExportDeclaration',
            declaration: null,
            specifiers: [{
                type: 'ExportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'encrypt',
                    range: [9, 16],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 16 }
                    }
                },
                name: null,
                range: [9, 16],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 16 }
                }
            }],
            source: null,
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'export { encrypt, decrypt }': {
            type: 'ExportDeclaration',
            declaration: null,
            specifiers: [{
                type: 'ExportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'encrypt',
                    range: [9, 16],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 16 }
                    }
                },
                name: null,
                range: [9, 16],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 16 }
                }
            }, {
                type: 'ExportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'decrypt',
                    range: [18, 25],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 25 }
                    }
                },
                name: null,
                range: [18, 25],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 25 }
                }
            }],
            source: null,
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'export { encrypt as default }': {
            type: 'ExportDeclaration',
            declaration: null,
            specifiers: [{
                type: 'ExportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'encrypt',
                    range: [9, 16],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 16 }
                    }
                },
                name: {
                    type: 'Identifier',
                    name: 'default',
                    range: [20, 27],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [9, 27],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 27 }
                }
            }],
            source: null,
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'export { encrypt, decrypt as dec }': {
            type: 'ExportDeclaration',
            declaration: null,
            specifiers: [{
                type: 'ExportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'encrypt',
                    range: [9, 16],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 16 }
                    }
                },
                name: null,
                range: [9, 16],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 16 }
                }
            }, {
                type: 'ExportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'decrypt',
                    range: [18, 25],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 25 }
                    }
                },
                name: {
                    type: 'Identifier',
                    name: 'dec',
                    range: [29, 32],
                    loc: {
                        start: { line: 1, column: 29 },
                        end: { line: 1, column: 32 }
                    }
                },
                range: [18, 32],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 32 }
                }
            }],
            source: null,
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'module "lib" { export var document }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'lib',
                raw: '"lib"',
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 12 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'document',
                                range: [26, 34],
                                loc: {
                                    start: { line: 1, column: 26 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            init: null,
                            range: [26, 34],
                            loc: {
                                start: { line: 1, column: 26 },
                                end: { line: 1, column: 34 }
                            }
                        }],
                        kind: 'var',
                        range: [22, 35],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 35 }
                        }
                    },
                    specifiers: null,
                    source: null,
                    range: [15, 35],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 35 }
                    }
                }],
                range: [13, 36],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'module "lib" { export var document = { } }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'lib',
                raw: '"lib"',
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 12 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'document',
                                range: [26, 34],
                                loc: {
                                    start: { line: 1, column: 26 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            init: {
                                type: 'ObjectExpression',
                                properties: [],
                                range: [37, 40],
                                loc: {
                                    start: { line: 1, column: 37 },
                                    end: { line: 1, column: 40 }
                                }
                            },
                            range: [26, 40],
                            loc: {
                                start: { line: 1, column: 26 },
                                end: { line: 1, column: 40 }
                            }
                        }],
                        kind: 'var',
                        range: [22, 41],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 41 }
                        }
                    },
                    specifiers: null,
                    source: null,
                    range: [15, 41],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 41 }
                    }
                }],
                range: [13, 42],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 42 }
                }
            },
            range: [0, 42],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 42 }
            }
        },

        'module "lib" { export let document }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'lib',
                raw: '"lib"',
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 12 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'document',
                                range: [26, 34],
                                loc: {
                                    start: { line: 1, column: 26 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            init: null,
                            range: [26, 34],
                            loc: {
                                start: { line: 1, column: 26 },
                                end: { line: 1, column: 34 }
                            }
                        }],
                        kind: 'let',
                        range: [22, 35],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 35 }
                        }
                    },
                    specifiers: null,
                    source: null,
                    range: [15, 35],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 35 }
                    }
                }],
                range: [13, 36],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'module "lib" { export let document = { } }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'lib',
                raw: '"lib"',
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 12 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'document',
                                range: [26, 34],
                                loc: {
                                    start: { line: 1, column: 26 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            init: {
                                type: 'ObjectExpression',
                                properties: [],
                                range: [37, 40],
                                loc: {
                                    start: { line: 1, column: 37 },
                                    end: { line: 1, column: 40 }
                                }
                            },
                            range: [26, 40],
                            loc: {
                                start: { line: 1, column: 26 },
                                end: { line: 1, column: 40 }
                            }
                        }],
                        kind: 'let',
                        range: [22, 41],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 41 }
                        }
                    },
                    specifiers: null,
                    source: null,
                    range: [15, 41],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 41 }
                    }
                }],
                range: [13, 42],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 42 }
                }
            },
            range: [0, 42],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 42 }
            }
        },

        'module "lib" { export const document = { } }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'lib',
                raw: '"lib"',
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 12 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'document',
                                range: [28, 36],
                                loc: {
                                    start: { line: 1, column: 28 },
                                    end: { line: 1, column: 36 }
                                }
                            },
                            init: {
                                type: 'ObjectExpression',
                                properties: [],
                                range: [39, 42],
                                loc: {
                                    start: { line: 1, column: 39 },
                                    end: { line: 1, column: 42 }
                                }
                            },
                            range: [28, 42],
                            loc: {
                                start: { line: 1, column: 28 },
                                end: { line: 1, column: 42 }
                            }
                        }],
                        kind: 'const',
                        range: [22, 43],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 43 }
                        }
                    },
                    specifiers: null,
                    source: null,
                    range: [15, 43],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 43 }
                    }
                }],
                range: [13, 44],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 44 }
                }
            },
            range: [0, 44],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 44 }
            }
        },

        'module "lib" { export function parse() { } }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'lib',
                raw: '"lib"',
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 12 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: {
                        type: 'FunctionDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'parse',
                            range: [31, 36],
                            loc: {
                                start: { line: 1, column: 31 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [39, 42],
                            loc: {
                                start: { line: 1, column: 39 },
                                end: { line: 1, column: 42 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [22, 42],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 42 }
                        }
                    },
                    specifiers: null,
                    source: null,
                    range: [15, 42],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 42 }
                    }
                }],
                range: [13, 44],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 44 }
                }
            },
            range: [0, 44],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 44 }
            }
        },

        'module "lib" { export class Class {} }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'lib',
                raw: '"lib"',
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 12 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: {
                        type: 'ClassDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'Class',
                            range: [28, 33],
                            loc: {
                                start: { line: 1, column: 28 },
                                end: { line: 1, column: 33 }
                            }
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [],
                            range: [34, 36],
                            loc: {
                                start: { line: 1, column: 34 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        range: [22, 36],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 36 }
                        }
                    },
                    specifiers: null,
                    source: null,
                    range: [15, 36],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 36 }
                    }
                }],
                range: [13, 38],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 38 }
                }
            },
            range: [0, 38],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        'module "lib" { export * }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'lib',
                raw: '"lib"',
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 12 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: null,
                    specifiers: [{
                        type: 'ExportBatchSpecifier',
                        range: [22, 23],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 23 }
                        }
                    }],
                    source: null,
                    range: [15, 24],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 24 }
                    }
                }],
                range: [13, 25],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        'module "security" { export * from "crypto" }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'security',
                raw: '"security"',
                range: [7, 17],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 17 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: null,
                    specifiers: [{
                        type: 'ExportBatchSpecifier',
                        range: [27, 28],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 28 }
                        }
                    }],
                    source: {
                        type: 'Literal',
                        value: 'crypto',
                        raw: '"crypto"',
                        range: [34, 42],
                        loc: {
                            start: { line: 1, column: 34 },
                            end: { line: 1, column: 42 }
                        }
                    },
                    range: [20, 43],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 43 }
                    }
                }],
                range: [18, 44],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 44 }
                }
            },
            range: [0, 44],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 44 }
            }
        },

        'module "crypto" { export { encrypt } }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'crypto',
                raw: '"crypto"',
                range: [7, 15],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 15 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: null,
                    specifiers: [{
                        type: 'ExportSpecifier',
                        id: {
                            type: 'Identifier',
                            name: 'encrypt',
                            range: [27, 34],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 34 }
                            }
                        },
                        name: null,
                        range: [27, 34],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    source: null,
                    range: [18, 37],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 37 }
                    }
                }],
                range: [16, 38],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 38 }
                }
            },
            range: [0, 38],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        'module "crypto" { export { encrypt, decrypt } }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'crypto',
                raw: '"crypto"',
                range: [7, 15],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 15 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: null,
                    specifiers: [{
                        type: 'ExportSpecifier',
                        id: {
                            type: 'Identifier',
                            name: 'encrypt',
                            range: [27, 34],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 34 }
                            }
                        },
                        name: null,
                        range: [27, 34],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 34 }
                        }
                    }, {
                        type: 'ExportSpecifier',
                        id: {
                            type: 'Identifier',
                            name: 'decrypt',
                            range: [36, 43],
                            loc: {
                                start: { line: 1, column: 36 },
                                end: { line: 1, column: 43 }
                            }
                        },
                        name: null,
                        range: [36, 43],
                        loc: {
                            start: { line: 1, column: 36 },
                            end: { line: 1, column: 43 }
                        }
                    }],
                    source: null,
                    range: [18, 46],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 46 }
                    }
                }],
                range: [16, 47],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 47 }
                }
            },
            range: [0, 47],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 47 }
            }
        },

        'module "crypto" { export { encrypt, decrypt as dec } }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'crypto',
                raw: '"crypto"',
                range: [7, 15],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 15 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExportDeclaration',
                    declaration: null,
                    specifiers: [{
                        type: 'ExportSpecifier',
                        id: {
                            type: 'Identifier',
                            name: 'encrypt',
                            range: [27, 34],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 34 }
                            }
                        },
                        name: null,
                        range: [27, 34],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 34 }
                        }
                    }, {
                        type: 'ExportSpecifier',
                        id: {
                            type: 'Identifier',
                            name: 'decrypt',
                            range: [36, 43],
                            loc: {
                                start: { line: 1, column: 36 },
                                end: { line: 1, column: 43 }
                            }
                        },
                        name: {
                            type: 'Identifier',
                            name: 'dec',
                            range: [47, 50],
                            loc: {
                                start: { line: 1, column: 47 },
                                end: { line: 1, column: 50 }
                            }
                        },
                        range: [36, 50],
                        loc: {
                            start: { line: 1, column: 36 },
                            end: { line: 1, column: 50 }
                        }
                    }],
                    source: null,
                    range: [18, 53],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 53 }
                    }
                }],
                range: [16, 54],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 54 }
                }
            },
            range: [0, 54],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 54 }
            }
        },

        'import "jquery"': {
            type: 'ImportDeclaration',
            specifiers: [],
            source: {
                type: 'Literal',
                value: 'jquery',
                raw: '"jquery"',
                range: [7, 15],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        'import $ from "jquery"': {
            type: 'ImportDeclaration',
            specifiers: [{
                type: 'ImportSpecifier',
                id: {
                    type: 'Identifier',
                    name: '$',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                name: null,
                range: [7, 8],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 8 }
                }
            }],
            kind: 'default',
            source: {
                type: 'Literal',
                value: 'jquery',
                raw: '"jquery"',
                range: [14, 22],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'import { encrypt, decrypt } from "crypto"': {
            type: 'ImportDeclaration',
            specifiers: [{
                type: 'ImportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'encrypt',
                    range: [9, 16],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 16 }
                    }
                },
                name: null,
                range: [9, 16],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 16 }
                }
            }, {
                type: 'ImportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'decrypt',
                    range: [18, 25],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 25 }
                    }
                },
                name: null,
                range: [18, 25],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 25 }
                }
            }],
            kind: 'named',
            source: {
                type: 'Literal',
                value: 'crypto',
                raw: '"crypto"',
                range: [33, 41],
                loc: {
                    start: { line: 1, column: 33 },
                    end: { line: 1, column: 41 }
                }
            },
            range: [0, 41],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 41 }
            }
        },

        'import { encrypt as enc } from "crypto"': {
            type: 'ImportDeclaration',
            specifiers: [{
                type: 'ImportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'encrypt',
                    range: [9, 16],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 16 }
                    }
                },
                name: {
                    type: 'Identifier',
                    name: 'enc',
                    range: [20, 23],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 23 }
                    }
                },
                range: [9, 23],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 23 }
                }
            }],
            kind: 'named',
            source: {
                type: 'Literal',
                value: 'crypto',
                raw: '"crypto"',
                range: [31, 39],
                loc: {
                    start: { line: 1, column: 31 },
                    end: { line: 1, column: 39 }
                }
            },
            range: [0, 39],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 39 }
            }
        },

        'import { decrypt, encrypt as enc } from "crypto"': {
            type: 'ImportDeclaration',
            specifiers: [{
                type: 'ImportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'decrypt',
                    range: [9, 16],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 16 }
                    }
                },
                name: null,
                range: [9, 16],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 16 }
                }
            }, {
                type: 'ImportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'encrypt',
                    range: [18, 25],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 25 }
                    }
                },
                name: {
                    type: 'Identifier',
                    name: 'enc',
                    range: [29, 32],
                    loc: {
                        start: { line: 1, column: 29 },
                        end: { line: 1, column: 32 }
                    }
                },
                range: [18, 32],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 32 }
                }
            }],
            kind: 'named',
            source: {
                type: 'Literal',
                value: 'crypto',
                raw: '"crypto"',
                range: [40, 48],
                loc: {
                    start: { line: 1, column: 40 },
                    end: { line: 1, column: 48 }
                }
            },
            range: [0, 48],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 48 }
            }
        },

        'import default from "foo"': {
            type: 'ImportDeclaration',
            specifiers: [{
                type: 'ImportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'default',
                    range: [7, 14],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 14 }
                    }
                },
                name: null,
                range: [7, 14],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 14 }
                }
            }],
            kind: 'default',
            source: {
                type: 'Literal',
                value: 'foo',
                raw: '"foo"',
                range: [20, 25],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        'import { null as nil } from "bar"': {
            type: 'ImportDeclaration',
            specifiers: [{
                type: 'ImportSpecifier',
                id: {
                    type: 'Identifier',
                    name: 'null',
                    range: [9, 13],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 13 }
                    }
                },
                name: {
                    type: 'Identifier',
                    name: 'nil',
                    range: [17, 20],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 20 }
                    }
                },
                range: [9, 20],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 20 }
                }
            }],
            kind: 'named',
            source: {
                type: 'Literal',
                value: 'bar',
                raw: '"bar"',
                range: [28, 33],
                loc: {
                    start: { line: 1, column: 28 },
                    end: { line: 1, column: 33 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        },

        'module "security" { import "cryto" }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'security',
                raw: '"security"',
                range: [7, 17],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 17 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ImportDeclaration',
                    specifiers: [],
                    source: {
                        type: 'Literal',
                        value: 'cryto',
                        raw: '"cryto"',
                        range: [27, 34],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 34 }
                        }
                    },
                    range: [20, 35],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 35 }
                    }
                }],
                range: [18, 36],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'module()': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'module',
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                'arguments': [],
                range: [0, 8],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 8 }
                }
            },
            range: [0, 8],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 8 }
            }
        },

        'module "foo" { module() }': {
            type: 'ModuleDeclaration',
            id: {
                type: 'Literal',
                value: 'foo',
                raw: '"foo"',
                range: [7, 12],
                loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 12 }
                }
            },
            source: null,
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'module',
                            range: [15, 21],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 21 }
                            }
                        },
                        'arguments': [],
                        range: [15, 23],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    range: [15, 24],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 24 }
                    }
                }],
                range: [13, 25],
                loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        }

    },


    // http://wiki.ecmascript.org/doku.php?id=harmony:generators

    'Harmony: Yield Expression': {
        '(function* () { yield v })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'YieldExpression',
                            argument: {
                                type: 'Identifier',
                                name: 'v',
                                range: [22, 23],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 23 }
                                }
                            },
                            delegate: false,
                            range: [16, 23],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 23 }
                            }
                        },
                        range: [16, 24],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 24 }
                        }
                    }],
                    range: [14, 25],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 25 }
                    }
                },
                rest: null,
                generator: true,
                expression: false,
                range: [1, 25],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        '(function* () { yield *v })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'YieldExpression',
                            argument: {
                                type: 'Identifier',
                                name: 'v',
                                range: [23, 24],
                                loc: {
                                    start: { line: 1, column: 23 },
                                    end: { line: 1, column: 24 }
                                }
                            },
                            delegate: true,
                            range: [16, 24],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 24 }
                            }
                        },
                        range: [16, 25],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 25 }
                        }
                    }],
                    range: [14, 26],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 26 }
                    }
                },
                rest: null,
                generator: true,
                expression: false,
                range: [1, 26],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 26 }
                }
            },
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'function* test () { yield *v }': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'test',
                range: [10, 14],
                loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 14}
                }
            },
            params: [],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'YieldExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'v',
                            range: [27, 28],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 28 }
                            }
                        },
                        delegate: true,
                        range: [20, 28],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 28 }
                        }
                    },
                    range: [20, 29],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 29 }
                    }
                }],
                range: [18, 30],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 30 }
                }
            },
            rest: null,
            generator: true,
            expression: false,
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'var x = { *test () { yield *v } };': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'test',
                            range: [11, 15],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'v',
                                            range: [28, 29],
                                            loc: {
                                                start: { line: 1, column: 28 },
                                                end: { line: 1, column: 29 }
                                            }
                                        },
                                        delegate: true,
                                        range: [21, 29],
                                        loc: {
                                            start: { line: 1, column: 21 },
                                            end: { line: 1, column: 29 }
                                        }
                                    },
                                    range: [21, 30],
                                    loc: {
                                        start: { line: 1, column: 21 },
                                        end: { line: 1, column: 30 }
                                    }
                                }],
                                range: [19, 31],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 31 }
                                }
                            },
                            rest: null,
                            generator: true,
                            expression: false,
                            range: [19, 31],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 31 }
                            }
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        computed: false,
                        range: [10, 31],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 31 }
                        }
                    }],
                    range: [8, 33],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 33 }
                    }
                },
                range: [4, 33],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 33 }
                }
            }],
            kind: 'var',
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        'function* t() {}': {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 't',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [14, 16],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 16 }
                    }
                },
                rest: null,
                generator: true,
                expression: false,
                range: [0, 16],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 16 }
                }
            }],
            range: [0, 16],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 16 }
            },
            errors: []
        },

        '(function* () { yield yield 10 })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'YieldExpression',
                            argument: {
                                type: 'YieldExpression',
                                argument: {
                                    type: 'Literal',
                                    value: 10,
                                    raw: '10',
                                    range: [28, 30],
                                    loc: {
                                        start: { line: 1, column: 28 },
                                        end: { line: 1, column: 30 }
                                    }
                                },
                                delegate: false,
                                range: [22, 30],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 30 }
                                }
                            },
                            delegate: false,
                            range: [16, 30],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 30 }
                            }
                        },
                        range: [16, 31],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 31 }
                        }
                    }],
                    range: [14, 32],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 32 }
                    }
                },
                rest: null,
                generator: true,
                expression: false,
                range: [1, 32],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 32 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        }

    },



    // http://wiki.ecmascript.org/doku.php?id=harmony:iterators

    'Harmony: Iterators': {

        'for(x of list) process(x);': {
            type: 'ForOfStatement',
            left: {
                type: 'Identifier',
                name: 'x',
                range: [4, 5],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 5 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [9, 13],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 13 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [15, 22],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [23, 24],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 24 }
                        }
                    }],
                    range: [15, 25],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 25 }
                    }
                },
                range: [15, 26],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 26 }
                }
            },
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'for (var x of list) process(x);': {
            type: 'ForOfStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: null,
                    range: [9, 10],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                }],
                kind: 'var',
                range: [5, 10],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 10 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [14, 18],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 18 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [20, 27],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [28, 29],
                        loc: {
                            start: { line: 1, column: 28 },
                            end: { line: 1, column: 29 }
                        }
                    }],
                    range: [20, 30],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [20, 31],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 31 }
                }
            },
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        },

        'for (var x = 42 of list) process(x);': {
            type: 'ForOfStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: {
                        type: 'Literal',
                        value: 42,
                        raw: '42',
                        range: [13, 15],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [9, 15],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 15 }
                    }
                }],
                kind: 'var',
                range: [5, 15],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 15 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [19, 23],
                loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 23 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [25, 32],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [33, 34],
                        loc: {
                            start: { line: 1, column: 33 },
                            end: { line: 1, column: 34 }
                        }
                    }],
                    range: [25, 35],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 35 }
                    }
                },
                range: [25, 36],
                loc: {
                    start: { line: 1, column: 25 },
                    end: { line: 1, column: 36 }
                }
            },
            range: [0, 36],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 36 }
            }
        },

        'for (let x of list) process(x);': {
            type: 'ForOfStatement',
            left: {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'x',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    init: null,
                    range: [9, 10],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                }],
                kind: 'let',
                range: [5, 10],
                loc: {
                    start: { line: 1, column: 5 },
                    end: { line: 1, column: 10 }
                }
            },
            right: {
                type: 'Identifier',
                name: 'list',
                range: [14, 18],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 18 }
                }
            },
            body: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'process',
                        range: [20, 27],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    'arguments': [{
                        type: 'Identifier',
                        name: 'x',
                        range: [28, 29],
                        loc: {
                            start: { line: 1, column: 28 },
                            end: { line: 1, column: 29 }
                        }
                    }],
                    range: [20, 30],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [20, 31],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 31 }
                }
            },
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        }

    },


    // http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes

    'Harmony: Class (strawman)': {

        'var A = class extends B {}': {
            type: "VariableDeclaration",
            declarations: [
                {
                    type: "VariableDeclarator",
                    id: {
                        type: "Identifier",
                        name: "A",
                        range: [4, 5],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 5 }
                        }
                    },
                    init: {
                        type: "ClassExpression",
                        superClass: {
                            type: "Identifier",
                            name: "B",
                            range: [22, 23],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 23 }
                            }
                        },
                        body: {
                            type: "ClassBody",
                            body: [],
                            range: [24, 26],
                            loc: {
                                start: { line: 1, column: 24 },
                                end: { line: 1, column: 26 }
                            }
                        },
                        range: [8, 26],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    range: [4, 26],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 26 }
                    }
                }
            ],
            kind: "var",
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'class A extends class B extends C {} {}': {
            type: "ClassDeclaration",
            id: {
                type: "Identifier",
                name: "A",
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: {
                type: "ClassExpression",
                id: {
                    type: "Identifier",
                    name: "B",
                    range: [22, 23],
                    loc: {
                        start: { line: 1, column: 22 },
                        end: { line: 1, column: 23 }
                    }
                },
                superClass: null,
                body: {
                    type: "ClassBody",
                    body: [],
                    range: [34, 36],
                    loc: {
                        start: { line: 1, column: 34 },
                        end: { line: 1, column: 36 }
                    }
                },
                superClass: {
                    type: "Identifier",
                    name: "C",
                    range: [32, 33],
                    loc: {
                        start: { line: 1, column: 32 },
                        end: { line: 1, column: 33 }
                    }
                },
                range: [16, 36],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 36 }
                }
            },
            body: {
                type: "ClassBody",
                body: [],
                range: [37, 39],
                loc: {
                    start: { line: 1, column: 37 },
                    end: { line: 1, column: 39 }
                }
            },
            range: [0, 39],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 39 }
            }
        },

        'class A {get() {}}': {
            type: "ClassDeclaration",
            id: {
                type: "Identifier",
                name: "A",
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
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
                            name: "get",
                            range: [9, 12],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 12 }
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
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 17 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [15, 17],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        kind: "",
                        'static': false,
                        range: [9, 17],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 17 }
                        }
                    }
                ],
                range: [8, 18],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'class A { static get() {}}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'get',
                        range: [17, 20],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [23, 25],
                            loc: {
                                start: { line: 1, column: 23 },
                                end: { line: 1, column: 25 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [23, 25],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 25 }
                        }
                    },
                    kind: '',
                    'static': true,
                    range: [10, 25],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 25 }
                    }
                }],
                range: [8, 26],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 26 }
                }
            },
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'class A extends B {get foo() {}}': {
            type: "ClassDeclaration",
            id: {
                type: "Identifier",
                name: "A",
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: {
                type: "Identifier",
                name: "B",
                range: [16, 17],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 17 }
                }
            },
            body: {
                type: "ClassBody",
                body: [{
                    type: "MethodDefinition",
                    key: {
                        type: "Identifier",
                        name: "foo",
                        range: [23, 26],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 26 }
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
                                start: { line: 1, column: 29 },
                                end: { line: 1, column: 31 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [29, 31],
                        loc: {
                            start: { line: 1, column: 29 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    kind: "get",
                    'static': false,
                    range: [19, 31],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 31 }
                    }
                }],
                range: [18, 32],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 32 }
                }
            },
            range: [0, 32],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 32 }
            }
        },

        'class A extends B { static get foo() {}}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: {
                type: 'Identifier',
                name: 'B',
                range: [16, 17],
                loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 17 }
                }
            },
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [31, 34],
                        loc: {
                            start: { line: 1, column: 31 },
                            end: { line: 1, column: 34 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [37, 39],
                            loc: {
                                start: { line: 1, column: 37 },
                                end: { line: 1, column: 39 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [37, 39],
                        loc: {
                            start: { line: 1, column: 37 },
                            end: { line: 1, column: 39 }
                        }
                    },
                    kind: 'get',
                    'static': true,
                    range: [20, 39],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 39 }
                    }
                }],
                range: [18, 40],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 40 }
                }
            },
            range: [0, 40],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 40 }
            }
        },

        'class A {set a(v) {}}': {
            type: "ClassDeclaration",
            id: {
                type: "Identifier",
                name: "A",
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: "ClassBody",
                body: [
                    {
                        type: "MethodDefinition",
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [13, 14],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'v',
                                range: [15, 16],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 16 }
                                }
                            }],
                            defaults: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                                range: [18, 20],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 20 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [18, 20],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        kind: "set",
                        'static': false,
                        range: [9, 20],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 20 }
                        }
                    }
                ],
                range: [8, 21],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'class A { static set a(v) {}}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'a',
                        range: [21, 22],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'Identifier',
                            name: 'v',
                            range: [23, 24],
                            loc: {
                                start: { line: 1, column: 23 },
                                end: { line: 1, column: 24 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [26, 28],
                            loc: {
                                start: { line: 1, column: 26 },
                                end: { line: 1, column: 28 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [26, 28],
                        loc: {
                            start: { line: 1, column: 26 },
                            end: { line: 1, column: 28 }
                        }
                    },
                    kind: 'set',
                    'static': true,
                    range: [10, 28],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 28 }
                    }
                }],
                range: [8, 29],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 29 }
                }
            },
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        'class A {set(v) {};}': {
            type: "ClassDeclaration",
            id: {
                type: "Identifier",
                name: "A",
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
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
                            name: "set",
                            range: [9, 12],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'v',
                                range: [13, 14],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            }],
                            defaults: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                                range: [16, 18],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 18 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [16, 18],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 18 }
                            }
                        },
                        kind: "",
                        'static': false,
                        range: [9, 18],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 18 }
                        }
                    }
                ],
                range: [8, 20],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'class A { static set(v) {};}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'set',
                        range: [17, 20],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'Identifier',
                            name: 'v',
                            range: [21, 22],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 22 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [24, 26],
                            loc: {
                                start: { line: 1, column: 24 },
                                end: { line: 1, column: 26 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [24, 26],
                        loc: {
                            start: { line: 1, column: 24 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    kind: '',
                    'static': true,
                    range: [10, 26],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 26 }
                    }
                }],
                range: [8, 28],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 28 }
                }
            },
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'class A {*gen(v) { yield v; }}': {
            type: "ClassDeclaration",
            id: {
                type: "Identifier",
                name: "A",
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
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
                            name: "gen",
                            range: [10, 13],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 13 }
                            }
                        },
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'v',
                                range: [14, 15],
                                loc: {
                                    start: { line: 1, column: 14 },
                                    end: { line: 1, column: 15 }
                                }
                            }],
                            defaults: [],
                            body: {
                                type: "BlockStatement",
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'v',
                                            range: [25, 26],
                                            loc: {
                                                start: { line: 1, column: 25 },
                                                end: { line: 1, column: 26 }
                                            }
                                        },
                                        delegate: false,
                                        range: [19, 26],
                                        loc: {
                                            start: { line: 1, column: 19 },
                                            end: { line: 1, column: 26 }
                                        }
                                    },
                                    range: [19, 27],
                                    loc: {
                                        start: { line: 1, column: 19 },
                                        end: { line: 1, column: 27 }
                                    }
                                }],
                                range: [17, 29],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 29 }
                                }
                            },
                            rest: null,
                            generator: true,
                            expression: false,
                            range: [17, 29],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        kind: "",
                        'static': false,
                        range: [9, 29],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 29 }
                        }
                    }
                ],
                range: [8, 30],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'class A { static *gen(v) { yield v; }}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'gen',
                        range: [18, 21],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'Identifier',
                            name: 'v',
                            range: [22, 23],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 23 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'v',
                                        range: [33, 34],
                                        loc: {
                                            start: { line: 1, column: 33 },
                                            end: { line: 1, column: 34 }
                                        }
                                    },
                                    delegate: false,
                                    range: [27, 34],
                                    loc: {
                                        start: { line: 1, column: 27 },
                                        end: { line: 1, column: 34 }
                                    }
                                },
                                range: [27, 35],
                                loc: {
                                    start: { line: 1, column: 27 },
                                    end: { line: 1, column: 35 }
                                }
                            }],
                            range: [25, 37],
                            loc: {
                                start: { line: 1, column: 25 },
                                end: { line: 1, column: 37 }
                            }
                        },
                        rest: null,
                        generator: true,
                        expression: false,
                        range: [25, 37],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 37 }
                        }
                    },
                    kind: '',
                    'static': true,
                    range: [10, 37],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 37 }
                    }
                }],
                range: [8, 38],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 38 }
                }
            },
            range: [0, 38],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        '"use strict"; (class A {constructor() { super() }})': {
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
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    range: [0, 13],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 13 }
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
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 22 }
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
                                        name: "constructor",
                                        range: [24, 35],
                                        loc: {
                                            start: { line: 1, column: 24 },
                                            end: { line: 1, column: 35 }
                                        }
                                    },
                                    value: {
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
                                                        type: "CallExpression",
                                                        callee: {
                                                            type: "Identifier",
                                                            name: "super",
                                                            range: [40, 45],
                                                            loc: {
                                                                start: { line: 1, column: 40 },
                                                                end: { line: 1, column: 45 }
                                                            }
                                                        },
                                                        'arguments': [],
                                                        range: [40, 47],
                                                        loc: {
                                                            start: { line: 1, column: 40 },
                                                            end: { line: 1, column: 47 }
                                                        }
                                                    },
                                                    range: [40, 48],
                                                    loc: {
                                                        start: { line: 1, column: 40 },
                                                        end: { line: 1, column: 48 }
                                                    }
                                                }
                                            ],
                                            range: [38, 49],
                                            loc: {
                                                start: { line: 1, column: 38 },
                                                end: { line: 1, column: 49 }
                                            }
                                        },
                                        rest: null,
                                        generator: false,
                                        expression: false,
                                        range: [38, 49],
                                        loc: {
                                            start: { line: 1, column: 38 },
                                            end: { line: 1, column: 49 }
                                        }
                                    },
                                    kind: "",
                                    'static': false,
                                    range: [24, 49],
                                    loc: {
                                        start: { line: 1, column: 24 },
                                        end: { line: 1, column: 49 }
                                    }
                                }
                            ],
                            range: [23, 50],
                            loc: {
                                start: { line: 1, column: 23 },
                                end: { line: 1, column: 50 }
                            }
                        },
                        range: [15, 50],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 50 }
                        }
                    },
                    range: [14, 51],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 51 }
                    }
                }
            ],
            range: [0, 51],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 51 }
            },
            comments: []
        },

        'class A {static foo() {}}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7}
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [16, 19],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [22, 24],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 24}
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [22, 24],
                        loc: {
                            start: { line: 1, column: 22 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    kind: '',
                    'static': true,
                    range: [9, 24],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 24 }
                    }
                }],
                range: [8, 25],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 25 }
                }
            },
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        'class A {foo() {} static bar() {}}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [9, 12],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [15, 17],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [15, 17],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    kind: '',
                    'static': false,
                    range: [9, 17],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 17 }
                    }
                }, {
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [25, 28],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 28 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [31, 33],
                            loc: {
                                start: { line: 1, column: 31 },
                                end: { line: 1, column: 33 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [31, 33],
                        loc: {
                            start: { line: 1, column: 31 },
                            end: { line: 1, column: 33 }
                        }
                    },
                    kind: '',
                    'static': true,
                    range: [18, 33],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 33 }
                    }
                }],
                range: [8, 34],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 34 }
                }
            },
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        },

        '"use strict"; (class A { static constructor() { super() }})': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 'use strict',
                    raw: '"use strict"',
                    range: [0, 12],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 12 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ClassExpression',
                    id: {
                        type: 'Identifier',
                        name: 'A',
                        range: [21, 22],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'constructor',
                                range: [32, 43],
                                loc: {
                                    start: { line: 1, column: 32 },
                                    end: { line: 1, column: 43 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'super',
                                                range: [48, 53],
                                                loc: {
                                                    start: { line: 1, column: 48 },
                                                    end: { line: 1, column: 53 }
                                                }
                                            },
                                            'arguments': [],
                                            range: [48, 55],
                                            loc: {
                                                start: { line: 1, column: 48 },
                                                end: { line: 1, column: 55 }
                                            }
                                        },
                                        range: [48, 56],
                                        loc: {
                                            start: { line: 1, column: 48 },
                                            end: { line: 1, column: 56 }
                                        }
                                    }],
                                    range: [46, 57],
                                    loc: {
                                        start: { line: 1, column: 46 },
                                        end: { line: 1, column: 57 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [46, 57],
                                loc: {
                                    start: { line: 1, column: 46 },
                                    end: { line: 1, column: 57 }
                                }
                            },
                            kind: '',
                            'static': true,
                            range: [25, 57],
                            loc: {
                                start: { line: 1, column: 25 },
                                end: { line: 1, column: 57 }
                            }
                        }],
                        range: [23, 58],
                        loc: {
                            start: { line: 1, column: 23 },
                            end: { line: 1, column: 58 }
                        }
                    },
                    range: [15, 58],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 58 }
                    }
                },
                range: [14, 59],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 59 }
                }
            }],
            range: [0, 59],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 59 }
            },
            comments: []
        },

        'class A { foo() {} bar() {}}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [10, 13],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [16, 18],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 18 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [16, 18],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    kind: '',
                    'static': false,
                    range: [10, 18],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 18 }
                    }
                }, {
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [19, 22],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [25, 27],
                            loc: {
                                start: { line: 1, column: 25 },
                                end: { line: 1, column: 27 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [25, 27],
                        loc: {
                            start: { line: 1, column: 25 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    kind: '',
                    'static': false,
                    range: [19, 27],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 27 }
                    }
                }],
                range: [8, 28],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 28 }
                }
            },
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'class A { get foo() {} set foo(v) {}}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [14, 17],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [20, 22],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 22 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [20, 22],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    kind: 'get',
                    'static': false,
                    range: [10, 22],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 22 }
                    }
                }, {
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [27, 30],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 30 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'Identifier',
                            name: 'v',
                            range: [31, 32],
                            loc: {
                                start: { line: 1, column: 31 },
                                end: { line: 1, column: 32 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [34, 36],
                            loc: {
                                start: { line: 1, column: 34 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [34, 36],
                        loc: {
                            start: { line: 1, column: 34 },
                            end: { line: 1, column: 36 }
                        }
                    },
                    kind: 'set',
                    'static': false,
                    range: [23, 36],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 36 }
                    }
                }],
                range: [8, 37],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 37 }
                }
            },
            range: [0, 37],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 37 }
            }
        },

        'class A { static get foo() {} get foo() {}}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [21, 24],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [27, 29],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [27, 29],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    kind: 'get',
                    'static': true,
                    range: [10, 29],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 29 }
                    }
                }, {
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [34, 37],
                        loc: {
                            start: { line: 1, column: 34 },
                            end: { line: 1, column: 37 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [40, 42],
                            loc: {
                                start: { line: 1, column: 40 },
                                end: { line: 1, column: 42 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [40, 42],
                        loc: {
                            start: { line: 1, column: 40 },
                            end: { line: 1, column: 42 }
                        }
                    },
                    kind: 'get',
                    'static': false,
                    range: [30, 42],
                    loc: {
                        start: { line: 1, column: 30 },
                        end: { line: 1, column: 42 }
                    }
                }],
                range: [8, 43],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 43 }
                }
            },
            range: [0, 43],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 43 }
            }
        },

        'class A { static get foo() {} static get bar() {} }': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [21, 24],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [27, 29],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [27, 29],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    kind: 'get',
                    'static': true,
                    range: [10, 29],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 29 }
                    }
                }, {
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'bar',
                        range: [41, 44],
                        loc: {
                            start: { line: 1, column: 41 },
                            end: { line: 1, column: 44 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [47, 49],
                            loc: {
                                start: { line: 1, column: 47 },
                                end: { line: 1, column: 49 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [47, 49],
                        loc: {
                            start: { line: 1, column: 47 },
                            end: { line: 1, column: 49 }
                        }
                    },
                    kind: 'get',
                    'static': true,
                    range: [30, 49],
                    loc: {
                        start: { line: 1, column: 30 },
                        end: { line: 1, column: 49 }
                    }
                }],
                range: [8, 51],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 51 }
                }
            },
            range: [0, 51],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 51 }
            }
        },

        'class A { static get foo() {} static set foo(v) {} get foo() {} set foo(v) {}}': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [21, 24],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [27, 29],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [27, 29],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    kind: 'get',
                    'static': true,
                    range: [10, 29],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 29 }
                    }
                }, {
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [41, 44],
                        loc: {
                            start: { line: 1, column: 41 },
                            end: { line: 1, column: 44 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'Identifier',
                            name: 'v',
                            range: [45, 46],
                            loc: {
                                start: { line: 1, column: 45 },
                                end: { line: 1, column: 46 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [48, 50],
                            loc: {
                                start: { line: 1, column: 48 },
                                end: { line: 1, column: 50 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [48, 50],
                        loc: {
                            start: { line: 1, column: 48 },
                            end: { line: 1, column: 50 }
                        }
                    },
                    kind: 'set',
                    'static': true,
                    range: [30, 50],
                    loc: {
                        start: { line: 1, column: 30 },
                        end: { line: 1, column: 50 }
                    }
                }, {
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [55, 58],
                        loc: {
                            start: { line: 1, column: 55 },
                            end: { line: 1, column: 58 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [61, 63],
                            loc: {
                                start: { line: 1, column: 61 },
                                end: { line: 1, column: 63 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [61, 63],
                        loc: {
                            start: { line: 1, column: 61 },
                            end: { line: 1, column: 63 }
                        }
                    },
                    kind: 'get',
                    'static': false,
                    range: [51, 63],
                    loc: {
                        start: { line: 1, column: 51 },
                        end: { line: 1, column: 63 }
                    }
                }, {
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [68, 71],
                        loc: {
                            start: { line: 1, column: 68 },
                            end: { line: 1, column: 71 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'Identifier',
                            name: 'v',
                            range: [72, 73],
                            loc: {
                                start: { line: 1, column: 72 },
                                end: { line: 1, column: 73 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [75, 77],
                            loc: {
                                start: { line: 1, column: 75 },
                                end: { line: 1, column: 77 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [75, 77],
                        loc: {
                            start: { line: 1, column: 75 },
                            end: { line: 1, column: 77 }
                        }
                    },
                    kind: 'set',
                    'static': false,
                    range: [64, 77],
                    loc: {
                        start: { line: 1, column: 64 },
                        end: { line: 1, column: 77 }
                    }
                }],
                range: [8, 78],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 78 }
                }
            },
            range: [0, 78],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 78 }
            }
        },

        'class A { set foo(v) {} get foo() {} }': {
            type: 'ClassDeclaration',
            id: {
                type: 'Identifier',
                name: 'A',
                range: [6, 7],
                loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                }
            },
            superClass: null,
            body: {
                type: 'ClassBody',
                body: [{
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [14, 17],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'Identifier',
                            name: 'v',
                            range: [18, 19],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 19 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [21, 23],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 23 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [21, 23],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    kind: 'set',
                    'static': false,
                    range: [10, 23],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 23 }
                    }
                }, {
                    type: 'MethodDefinition',
                    key: {
                        type: 'Identifier',
                        name: 'foo',
                        range: [28, 31],
                        loc: {
                            start: { line: 1, column: 28 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [34, 36],
                            loc: {
                                start: { line: 1, column: 34 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [34, 36],
                        loc: {
                            start: { line: 1, column: 34 },
                            end: { line: 1, column: 36 }
                        }
                    },
                    kind: 'get',
                    'static': false,
                    range: [24, 36],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 36 }
                    }
                }],
                range: [8, 38],
                loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 38 }
                }
            },
            range: [0, 38],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 38 }
            }
        },

        'class A { get foo() {} get foo() {} }': {
            index: 30,
            lineNumber: 1,
            column: 31,
            message: 'Error: Line 1: Illegal duplicate property in class definition',
            description: 'Illegal duplicate property in class definition'
        },

        'class A { set foo(v) {} set foo(v) {} }': {
            index: 31,
            lineNumber: 1,
            column: 32,
            message: 'Error: Line 1: Illegal duplicate property in class definition',
            description: 'Illegal duplicate property in class definition'
        },

        'class A { get foo() {} foo() {} }': {
            index: 26,
            lineNumber: 1,
            column: 27,
            message: 'Error: Line 1: Illegal duplicate property in class definition',
            description: 'Illegal duplicate property in class definition'
        },

        'class A { foo() {} get foo() {} }': {
            index: 26,
            lineNumber: 1,
            column: 27,
            message: 'Error: Line 1: Illegal duplicate property in class definition',
            description: 'Illegal duplicate property in class definition'
        },

        'class A { set foo(v) {} foo() {} }': {
            index: 27,
            lineNumber: 1,
            column: 28,
            message: 'Error: Line 1: Illegal duplicate property in class definition',
            description: 'Illegal duplicate property in class definition'
        },

        'class A { foo() {} set foo(v) {} }': {
            index: 26,
            lineNumber: 1,
            column: 27,
            message: 'Error: Line 1: Illegal duplicate property in class definition',
            description: 'Illegal duplicate property in class definition'
        },

    },

    'ES6: Computed Properties': {
        '({[x]: 10})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    value: {
                        type: 'Literal',
                        value: 10,
                        raw: '10',
                        range: [7, 9],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: true,
                    range: [2, 9],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 9 }
                    }
                }],
                range: [1, 10],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        '({["x" + "y"]: 10})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'BinaryExpression',
                        operator: '+',
                        left: {
                            type: 'Literal',
                            value: 'x',
                            raw: '"x"',
                            range: [3, 6],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 'y',
                            raw: '"y"',
                            range: [9, 12],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        range: [3, 12],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    value: {
                        type: 'Literal',
                        value: 10,
                        raw: '10',
                        range: [15, 17],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: true,
                    range: [2, 17],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 17 }
                    }
                }],
                range: [1, 18],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        '({[x]: function() {}})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [18, 20],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [7, 20],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 20 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: true,
                    range: [2, 20],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 20 }
                    }
                }],
                range: [1, 21],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        '({[x]: 10, y: 20})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    value: {
                        type: 'Literal',
                        value: 10,
                        raw: '10',
                        range: [7, 9],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: true,
                    range: [2, 9],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 9 }
                    }
                }, {
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'y',
                        range: [11, 12],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    value: {
                        type: 'Literal',
                        value: 20,
                        raw: '20',
                        range: [14, 16],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 16 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: false,
                    range: [11, 16],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 16 }
                    }
                }],
                range: [1, 17],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        '({get [x]() {}, set [x](v) {}})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [7, 8],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [12, 14],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [12, 14],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    kind: 'get',
                    method: false,
                    shorthand: false,
                    computed: true,
                    range: [2, 14],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 14 }
                    }
                }, {
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [21, 22],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'Identifier',
                            name: 'v',
                            range: [24, 25],
                            loc: {
                                start: { line: 1, column: 24 },
                                end: { line: 1, column: 25 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [27, 29],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 29 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [27, 29],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 29 }
                        }
                    },
                    kind: 'set',
                    method: false,
                    shorthand: false,
                    computed: true,
                    range: [16, 29],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 29 }
                    }
                }],
                range: [1, 30],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        },

        '({[x]() {}})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [8, 10],
                            loc: {
                                start: { line: 1, column: 8 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [8, 10],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    kind: 'init',
                    method: true,
                    shorthand: false,
                    computed: true,
                    range: [2, 10],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 10 }
                    }
                }],
                range: [1, 11],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },

        'var {[x]: y} = {y}': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'x',
                            range: [6, 7],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'y',
                            range: [10, 11],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 11 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: true,
                        range: [5, 11],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 11 }
                        }
                    }],
                    range: [4, 12],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 12 }
                    }
                },
                init: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'y',
                            range: [16, 17],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'y',
                            range: [16, 17],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [16, 17],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    range: [15, 18],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [4, 18],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 18 }
                }
            }],
            kind: 'var',
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'function f({[x]: y}) {}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'f',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [{
                type: 'ObjectPattern',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    value: {
                        type: 'Identifier',
                        name: 'y',
                        range: [17, 18],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 18 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: true,
                    range: [12, 18],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 18 }
                    }
                }],
                range: [11, 19],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 19 }
                }
            }],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [21, 23],
                loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 23 }
                }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        'var x = {*[test]() { yield *v; }}': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                init: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'test',
                            range: [11, 15],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'v',
                                            range: [28, 29],
                                            loc: {
                                                start: { line: 1, column: 28 },
                                                end: { line: 1, column: 29 }
                                            }
                                        },
                                        delegate: true,
                                        range: [21, 29],
                                        loc: {
                                            start: { line: 1, column: 21 },
                                            end: { line: 1, column: 29 }
                                        }
                                    },
                                    range: [21, 30],
                                    loc: {
                                        start: { line: 1, column: 21 },
                                        end: { line: 1, column: 30 }
                                    }
                                }],
                                range: [19, 32],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 32 }
                                }
                            },
                            rest: null,
                            generator: true,
                            expression: false,
                            range: [19, 32],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 32 }
                            }
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        computed: true,
                        range: [9, 32],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 32 }
                        }
                    }],
                    range: [8, 33],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 33 }
                    }
                },
                range: [4, 33],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 33 }
                }
            }],
            kind: 'var',
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        },

        '({[x]})': {
          index: 5,
          lineNumber: 1,
          column: 6,
          message: 'Error: Line 1: Unexpected token }'
        }
    },

    'ES6: Default parameters': {

        'function f([x] = [1]) {}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'f',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [{
                type: 'ArrayPattern',
                elements: [{
                    type: 'Identifier',
                    name: 'x',
                    range: [12, 13],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 13 }
                    }
                }],
                range: [11, 14],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 14 }
                }
            }],
            defaults: [{
                type: 'ArrayExpression',
                elements: [{
                    type: 'Literal',
                    value: 1,
                    raw: '1',
                    range: [18, 19],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 19 }
                    }
                }],
                range: [17, 20],
                loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 20 }
                }
            }],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [22, 24],
                loc: {
                    start: { line: 1, column: 22 },
                    end: { line: 1, column: 24 }
                }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'function f({x} = {x: 10}) {}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'f',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [{
                type: 'ObjectPattern',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    value: {
                        type: 'Identifier',
                        name: 'x',
                        range: [12, 13],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true,
                    computed: false,
                    range: [12, 13],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 13 }
                    }
                }],
                range: [11, 14],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 14 }
                }
            }],
            defaults: [{
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [18, 19],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    value: {
                        type: 'Literal',
                        value: 10,
                        raw: '10',
                        range: [21, 23],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: false,
                    range: [18, 23],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 23 }
                    }
                }],
                range: [17, 24],
                loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 24 }
                }
            }],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [26, 28],
                loc: {
                    start: { line: 1, column: 26 },
                    end: { line: 1, column: 28 }
                }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'f = function({x} = {x: 10}) {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'f',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [{
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'x',
                                range: [14, 15],
                                loc: {
                                    start: { line: 1, column: 14 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'x',
                                range: [14, 15],
                                loc: {
                                    start: { line: 1, column: 14 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            computed: false,
                            range: [14, 15],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 15 }
                            }
                        }],
                        range: [13, 16],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 16 }
                        }
                    }],
                    defaults: [{
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'x',
                                range: [20, 21],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 21 }
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: 10,
                                raw: '10',
                                range: [23, 25],
                                loc: {
                                    start: { line: 1, column: 23 },
                                    end: { line: 1, column: 25 }
                                }
                            },
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            computed: false,
                            range: [20, 25],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 25 }
                            }
                        }],
                        range: [19, 26],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 26 }
                        }
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [28, 30],
                        loc: {
                            start: { line: 1, column: 28 },
                            end: { line: 1, column: 30 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: false,
                    range: [4, 30],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [0, 30],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 30 }
                }
            },
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        '({f: function({x} = {x: 10}) {}})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'f',
                        range: [2, 3],
                        loc: {
                            start: { line: 1, column: 2 },
                            end: { line: 1, column: 3 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [15, 16],
                                    loc: {
                                        start: { line: 1, column: 15 },
                                        end: { line: 1, column: 16 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [15, 16],
                                    loc: {
                                        start: { line: 1, column: 15 },
                                        end: { line: 1, column: 16 }
                                    }
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                computed: false,
                                range: [15, 16],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 16 }
                                }
                            }],
                            range: [14, 17],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 17 }
                            }
                        }],
                        defaults: [{
                            type: 'ObjectExpression',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [21, 22],
                                    loc: {
                                        start: { line: 1, column: 21 },
                                        end: { line: 1, column: 22 }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 10,
                                    raw: '10',
                                    range: [24, 26],
                                    loc: {
                                        start: { line: 1, column: 24 },
                                        end: { line: 1, column: 26 }
                                    }
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false,
                                computed: false,
                                range: [21, 26],
                                loc: {
                                    start: { line: 1, column: 21 },
                                    end: { line: 1, column: 26 }
                                }
                            }],
                            range: [20, 27],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 27 }
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [29, 31],
                            loc: {
                                start: { line: 1, column: 29 },
                                end: { line: 1, column: 31 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [5, 31],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 31 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: false,
                    range: [2, 31],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 31 }
                    }
                }],
                range: [1, 32],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 32 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        },

        '({f({x} = {x: 10}) {}})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'f',
                        range: [2, 3],
                        loc: {
                            start: { line: 1, column: 2 },
                            end: { line: 1, column: 3 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                computed: false,
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            }],
                            range: [4, 7],
                            loc: {
                                start: { line: 1, column: 4 },
                                end: { line: 1, column: 7 }
                            }
                        }],
                        defaults: [{
                            type: 'ObjectExpression',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [11, 12],
                                    loc: {
                                        start: { line: 1, column: 11 },
                                        end: { line: 1, column: 12 }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 10,
                                    raw: '10',
                                    range: [14, 16],
                                    loc: {
                                        start: { line: 1, column: 14 },
                                        end: { line: 1, column: 16 }
                                    }
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false,
                                computed: false,
                                range: [11, 16],
                                loc: {
                                    start: { line: 1, column: 11 },
                                    end: { line: 1, column: 16 }
                                }
                            }],
                            range: [10, 17],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 17 }
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [19, 21],
                            loc: {
                                start: { line: 1, column: 19 },
                                end: { line: 1, column: 21 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [19, 21],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    kind: 'init',
                    method: true,
                    shorthand: false,
                    computed: false,
                    range: [2, 21],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 21 }
                    }
                }],
                range: [1, 22],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        '(class {f({x} = {x: 10}) {}})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ClassExpression',
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'f',
                            range: [8, 9],
                            loc: {
                                start: { line: 1, column: 8 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
                                        range: [11, 12],
                                        loc: {
                                            start: { line: 1, column: 11 },
                                            end: { line: 1, column: 12 }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'x',
                                        range: [11, 12],
                                        loc: {
                                            start: { line: 1, column: 11 },
                                            end: { line: 1, column: 12 }
                                        }
                                    },
                                    kind: 'init',
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    range: [11, 12],
                                    loc: {
                                        start: { line: 1, column: 11 },
                                        end: { line: 1, column: 12 }
                                    }
                                }],
                                range: [10, 13],
                                loc: {
                                    start: { line: 1, column: 10 },
                                    end: { line: 1, column: 13 }
                                }
                            }],
                            defaults: [{
                                type: 'ObjectExpression',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
                                        range: [17, 18],
                                        loc: {
                                            start: { line: 1, column: 17 },
                                            end: { line: 1, column: 18 }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 10,
                                        raw: '10',
                                        range: [20, 22],
                                        loc: {
                                            start: { line: 1, column: 20 },
                                            end: { line: 1, column: 22 }
                                        }
                                    },
                                    kind: 'init',
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    range: [17, 22],
                                    loc: {
                                        start: { line: 1, column: 17 },
                                        end: { line: 1, column: 22 }
                                    }
                                }],
                                range: [16, 23],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 23 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [25, 27],
                                loc: {
                                    start: { line: 1, column: 25 },
                                    end: { line: 1, column: 27 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [25, 27],
                            loc: {
                                start: { line: 1, column: 25 },
                                end: { line: 1, column: 27 }
                            }
                        },
                        kind: '',
                        'static': false,
                        range: [8, 27],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 27 }
                        }
                    }],
                    range: [7, 28],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 28 }
                    }
                },
                range: [1, 28],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 28 }
                }
            },
            range: [0, 29],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 29 }
            }
        },

        '(({x} = {x: 10}) => {})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'x',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'x',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    }],
                    range: [2, 5],
                    loc: {
                        start: { line: 1, column: 2 },
                        end: { line: 1, column: 5 }
                    }
                }],
                defaults: [{
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'x',
                            range: [9, 10],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 10,
                            raw: '10',
                            range: [12, 14],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [9, 14],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    range: [8, 15],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 15 }
                    }
                }],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [20, 22],
                    loc: {
                        start: { line: 1, column: 20 },
                        end: { line: 1, column: 22 }
                    }
                },
                rest: null,
                generator: false,
                expression: false,
                range: [1, 22],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        'x = function(y = 1) {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [{
                        type: 'Identifier',
                        name: 'y',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    defaults: [{
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [17, 18],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 18 }
                        }
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [20, 22],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: false,
                    range: [4, 22],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 22 }
                    }
                },
                range: [0, 22],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 22 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'function f(a = 1) {}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'f',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [{
                type: 'Identifier',
                name: 'a',
                range: [11, 12],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 12 }
                }
            }],
            defaults: [{
                type: 'Literal',
                value: 1,
                raw: '1',
                range: [15, 16],
                loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 16 }
                }
            }],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [18, 20],
                loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 20 }
                }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        'x = { f: function(a=1) {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'f',
                            range: [6, 7],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                                range: [18, 19],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 19 }
                                }
                            }],
                            defaults: [{
                                type: 'Literal',
                                value: 1,
                                raw: '1',
                                range: [20, 21],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 21 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [23, 25],
                                loc: {
                                    start: { line: 1, column: 23 },
                                    end: { line: 1, column: 25 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [9, 25],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 25 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [6, 25],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 25 }
                        }
                    }],
                    range: [4, 27],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [0, 27],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 27 }
                }
            },
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        'x = { f(a=1) {} }': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    range: [0, 1],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 1 }
                    }
                },
                right: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'f',
                            range: [6, 7],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                                range: [8, 9],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 9 }
                                }
                            }],
                            defaults: [{
                                type: 'Literal',
                                value: 1,
                                raw: '1',
                                range: [10, 11],
                                loc: {
                                    start: { line: 1, column: 10 },
                                    end: { line: 1, column: 11 }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                range: [13, 15],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: false,
                            range: [13, 15],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        computed: false,
                        range: [6, 15],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 15 }
                        }
                    }],
                    range: [4, 17],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        }

    },

    // ECMAScript 6th Syntax, 13 - Rest parameters
    // http://wiki.ecmascript.org/doku.php?id=harmony:rest_parameters
    'ES6: Rest parameters': {
        'function f(a, ...b) {}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'f',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [{
                type: 'Identifier',
                name: 'a',
                range: [11, 12],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 12 }
                }
            }],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [20, 22],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 22 }
                }
            },
            rest: {
                type: 'Identifier',
                name: 'b',
                range: [17, 18],
                loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 18 }
                }
            },
            generator: false,
            expression: false,
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        }
    },

    'ES6: Destructured Parameters': {

        'function x([ a, b ]){}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'x',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [{
                type: 'ArrayPattern',
                elements: [{
                    type: 'Identifier',
                    name: 'a',
                    range: [13, 14],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'b',
                    range: [16, 17],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 17 }
                    }
                }],
                range: [11, 19],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 19 }
                }
            }],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [20, 22],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 22 }
                }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'function x({ a, b }){}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'x',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [{
                type: 'ObjectPattern',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'a',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    value: {
                        type: 'Identifier',
                        name: 'a',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true,
                    computed: false,
                    range: [13, 14],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                    }
                }, {
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'b',
                        range: [16, 17],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    value: {
                        type: 'Identifier',
                        name: 'b',
                        range: [16, 17],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true,
                    computed: false,
                    range: [16, 17],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 17 }
                    }
                }],
                range: [11, 19],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 19 }
                }
            }],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [20, 22],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 22 }
                }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },


        'function x(a, { a }){}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'x',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [{
                type: 'Identifier',
                name: 'a',
                range: [11, 12],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 12 }
                }
            }, {
                type: 'ObjectPattern',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'a',
                        range: [16, 17],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    value: {
                        type: 'Identifier',
                        name: 'a',
                        range: [16, 17],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true,
                    computed: false,
                    range: [16, 17],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 17 }
                    }
                }],
                range: [14, 19],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 19 }
                }
            }],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [20, 22],
                loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 22 }
                }
            },
            rest: null,
            generator: false,
            expression: false,
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'function x(...[ a, b ]){}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'x',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [23, 25],
                loc: {
                    start: { line: 1, column: 23 },
                    end: { line: 1, column: 25 }
                }
            },
            rest: {
                type: 'ArrayPattern',
                elements: [{
                    type: 'Identifier',
                    name: 'a',
                    range: [16, 17],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 17 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'b',
                    range: [19, 20],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                    }
                }],
                range: [14, 22],
                loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 22 }
                }
            },
            generator: false,
            expression: false,
            range: [0, 25],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 25 }
            }
        },

        'function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}': {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'x',
                range: [9, 10],
                loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 10 }
                }
            },
            params: [{
                type: 'ObjectPattern',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'a',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    value: {
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'w',
                                range: [18, 19],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'w',
                                range: [18, 19],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            computed: false,
                            range: [18, 19],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 19 }
                            }
                        }, {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'x',
                                range: [21, 22],
                                loc: {
                                    start: { line: 1, column: 21 },
                                    end: { line: 1, column: 22 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'x',
                                range: [21, 22],
                                loc: {
                                    start: { line: 1, column: 21 },
                                    end: { line: 1, column: 22 }
                                }
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            computed: false,
                            range: [21, 22],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 22 }
                            }
                        }],
                        range: [16, 24],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: false,
                    range: [13, 24],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 24 }
                    }
                }, {
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'b',
                        range: [26, 27],
                        loc: {
                            start: { line: 1, column: 26 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    value: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'Identifier',
                            name: 'y',
                            range: [30, 31],
                            loc: {
                                start: { line: 1, column: 30 },
                                end: { line: 1, column: 31 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'z',
                            range: [33, 34],
                            loc: {
                                start: { line: 1, column: 33 },
                                end: { line: 1, column: 34 }
                            }
                        }],
                        range: [29, 35],
                        loc: {
                            start: { line: 1, column: 29 },
                            end: { line: 1, column: 35 }
                        }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false,
                    computed: false,
                    range: [26, 35],
                    loc: {
                        start: { line: 1, column: 26 },
                        end: { line: 1, column: 35 }
                    }
                }],
                range: [11, 37],
                loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 37 }
                }
            }],
            defaults: [],
            body: {
                type: 'BlockStatement',
                body: [],
                range: [52, 54],
                loc: {
                    start: { line: 1, column: 52 },
                    end: { line: 1, column: 54 }
                }
            },
            rest: {
                type: 'ArrayPattern',
                elements: [{
                    type: 'Identifier',
                    name: 'a',
                    range: [43, 44],
                    loc: {
                        start: { line: 1, column: 43 },
                        end: { line: 1, column: 44 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'b',
                    range: [46, 47],
                    loc: {
                        start: { line: 1, column: 46 },
                        end: { line: 1, column: 47 }
                    }
                }, {
                    type: 'Identifier',
                    name: 'c',
                    range: [49, 50],
                    loc: {
                        start: { line: 1, column: 49 },
                        end: { line: 1, column: 50 }
                    }
                }],
                range: [42, 51],
                loc: {
                    start: { line: 1, column: 42 },
                    end: { line: 1, column: 51 }
                }
            },
            generator: false,
            expression: false,
            range: [0, 54],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 54 }
            }
        },

        '(function x([ a, b ]){})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                params: [{
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [14, 15],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 15 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'b',
                        range: [17, 18],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 18 }
                        }
                    }],
                    range: [12, 20],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 20 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [21, 23],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 23 }
                    }
                },
                rest: null,
                generator: false,
                expression: false,
                range: [1, 23],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 23 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        '(function x({ a, b }){})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                params: [{
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [14, 15],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'a',
                            range: [14, 15],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [14, 15],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 15 }
                        }
                    }, {
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'b',
                            range: [17, 18],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 18 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'b',
                            range: [17, 18],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 18 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [17, 18],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 18 }
                        }
                    }],
                    range: [12, 20],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 20 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [21, 23],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 23 }
                    }
                },
                rest: null,
                generator: false,
                expression: false,
                range: [1, 23],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 23 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        '(function x(...[ a, b ]){})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [24, 26],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 26 }
                    }
                },
                rest: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [17, 18],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 18 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'b',
                        range: [20, 21],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 21 }
                        }
                    }],
                    range: [15, 23],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 23 }
                    }
                },
                generator: false,
                expression: false,
                range: [1, 26],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 26 }
                }
            },
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },

        '(function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){})': {
            type: 'ExpressionStatement',
            expression: {
                type: 'FunctionExpression',
                id: {
                    type: 'Identifier',
                    name: 'x',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                params: [{
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [14, 15],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        value: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'w',
                                    range: [19, 20],
                                    loc: {
                                        start: { line: 1, column: 19 },
                                        end: { line: 1, column: 20 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'w',
                                    range: [19, 20],
                                    loc: {
                                        start: { line: 1, column: 19 },
                                        end: { line: 1, column: 20 }
                                    }
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                computed: false,
                                range: [19, 20],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 20 }
                                }
                            }, {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [22, 23],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 23 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'x',
                                    range: [22, 23],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 23 }
                                    }
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                computed: false,
                                range: [22, 23],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 23 }
                                }
                            }],
                            range: [17, 25],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 25 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [14, 25],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 25 }
                        }
                    }, {
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'b',
                            range: [27, 28],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 28 }
                            }
                        },
                        value: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'Identifier',
                                name: 'y',
                                range: [31, 32],
                                loc: {
                                    start: { line: 1, column: 31 },
                                    end: { line: 1, column: 32 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'z',
                                range: [34, 35],
                                loc: {
                                    start: { line: 1, column: 34 },
                                    end: { line: 1, column: 35 }
                                }
                            }],
                            range: [30, 36],
                            loc: {
                                start: { line: 1, column: 30 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [27, 36],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 36 }
                        }
                    }],
                    range: [12, 38],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 38 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [53, 55],
                    loc: {
                        start: { line: 1, column: 53 },
                        end: { line: 1, column: 55 }
                    }
                },
                rest: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [44, 45],
                        loc: {
                            start: { line: 1, column: 44 },
                            end: { line: 1, column: 45 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'b',
                        range: [47, 48],
                        loc: {
                            start: { line: 1, column: 47 },
                            end: { line: 1, column: 48 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'c',
                        range: [50, 51],
                        loc: {
                            start: { line: 1, column: 50 },
                            end: { line: 1, column: 51 }
                        }
                    }],
                    range: [43, 52],
                    loc: {
                        start: { line: 1, column: 43 },
                        end: { line: 1, column: 52 }
                    }
                },
                generator: false,
                expression: false,
                range: [1, 55],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 55 }
                }
            },
            range: [0, 56],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 56 }
            }
        },

        '({ x([ a, b ]){} })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'Identifier',
                                name: 'a',
                                range: [7, 8],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 8 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'b',
                                range: [10, 11],
                                loc: {
                                    start: { line: 1, column: 10 },
                                    end: { line: 1, column: 11 }
                                }
                            }],
                            range: [5, 13],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 13 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [14, 16],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        rest: null,
                        generator: false,
                        expression: false,
                        range: [14, 16],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 16 }
                        }
                    },
                    kind: 'init',
                    method: true,
                    shorthand: false,
                    computed: false,
                    range: [3, 16],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 16 }
                    }
                }],
                range: [1, 18],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },

        '({ x(...[ a, b ]){} })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [17, 19],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        rest: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'Identifier',
                                name: 'a',
                                range: [10, 11],
                                loc: {
                                    start: { line: 1, column: 10 },
                                    end: { line: 1, column: 11 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'b',
                                range: [13, 14],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            }],
                            range: [8, 16],
                            loc: {
                                start: { line: 1, column: 8 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        generator: false,
                        expression: false,
                        range: [17, 19],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 19 }
                        }
                    },
                    kind: 'init',
                    method: true,
                    shorthand: false,
                    computed: false,
                    range: [3, 19],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 19 }
                    }
                }],
                range: [1, 21],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 21 }
                }
            },
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        '({ x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){} })': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [{
                    type: 'Property',
                    key: {
                        type: 'Identifier',
                        name: 'x',
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    value: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [7, 8],
                                    loc: {
                                        start: { line: 1, column: 7 },
                                        end: { line: 1, column: 8 }
                                    }
                                },
                                value: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [12, 13],
                                            loc: {
                                                start: { line: 1, column: 12 },
                                                end: { line: 1, column: 13 }
                                            }
                                        },
                                        value: {
                                            type: 'Identifier',
                                            name: 'w',
                                            range: [12, 13],
                                            loc: {
                                                start: { line: 1, column: 12 },
                                                end: { line: 1, column: 13 }
                                            }
                                        },
                                        kind: 'init',
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        range: [12, 13],
                                        loc: {
                                            start: { line: 1, column: 12 },
                                            end: { line: 1, column: 13 }
                                        }
                                    }, {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            range: [15, 16],
                                            loc: {
                                                start: { line: 1, column: 15 },
                                                end: { line: 1, column: 16 }
                                            }
                                        },
                                        value: {
                                            type: 'Identifier',
                                            name: 'x',
                                            range: [15, 16],
                                            loc: {
                                                start: { line: 1, column: 15 },
                                                end: { line: 1, column: 16 }
                                            }
                                        },
                                        kind: 'init',
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        range: [15, 16],
                                        loc: {
                                            start: { line: 1, column: 15 },
                                            end: { line: 1, column: 16 }
                                        }
                                    }],
                                    range: [10, 18],
                                    loc: {
                                        start: { line: 1, column: 10 },
                                        end: { line: 1, column: 18 }
                                    }
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false,
                                computed: false,
                                range: [7, 18],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 18 }
                                }
                            }, {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'b',
                                    range: [20, 21],
                                    loc: {
                                        start: { line: 1, column: 20 },
                                        end: { line: 1, column: 21 }
                                    }
                                },
                                value: {
                                    type: 'ArrayPattern',
                                    elements: [{
                                        type: 'Identifier',
                                        name: 'y',
                                        range: [24, 25],
                                        loc: {
                                            start: { line: 1, column: 24 },
                                            end: { line: 1, column: 25 }
                                        }
                                    }, {
                                        type: 'Identifier',
                                        name: 'z',
                                        range: [27, 28],
                                        loc: {
                                            start: { line: 1, column: 27 },
                                            end: { line: 1, column: 28 }
                                        }
                                    }],
                                    range: [23, 29],
                                    loc: {
                                        start: { line: 1, column: 23 },
                                        end: { line: 1, column: 29 }
                                    }
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false,
                                computed: false,
                                range: [20, 29],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 29 }
                                }
                            }],
                            range: [5, 31],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 31 }
                            }
                        }],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            range: [46, 48],
                            loc: {
                                start: { line: 1, column: 46 },
                                end: { line: 1, column: 48 }
                            }
                        },
                        rest: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'Identifier',
                                name: 'a',
                                range: [37, 38],
                                loc: {
                                    start: { line: 1, column: 37 },
                                    end: { line: 1, column: 38 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'b',
                                range: [40, 41],
                                loc: {
                                    start: { line: 1, column: 40 },
                                    end: { line: 1, column: 41 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'c',
                                range: [43, 44],
                                loc: {
                                    start: { line: 1, column: 43 },
                                    end: { line: 1, column: 44 }
                                }
                            }],
                            range: [36, 45],
                            loc: {
                                start: { line: 1, column: 36 },
                                end: { line: 1, column: 45 }
                            }
                        },
                        generator: false,
                        expression: false,
                        range: [46, 48],
                        loc: {
                            start: { line: 1, column: 46 },
                            end: { line: 1, column: 48 }
                        }
                    },
                    kind: 'init',
                    method: true,
                    shorthand: false,
                    computed: false,
                    range: [3, 48],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 48 }
                    }
                }],
                range: [1, 50],
                loc: {
                    start: { line: 1, column: 1 },
                    end: { line: 1, column: 50 }
                }
            },
            range: [0, 51],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 51 }
            }
        },

        '(...a) => {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [10, 12],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 12 }
                    }
                },
                rest: {
                    type: 'Identifier',
                    name: 'a',
                    range: [4, 5],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 5 }
                    }
                },
                generator: false,
                expression: false,
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            },
            range: [0, 12],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 12 }
            }
        },
        '(a, ...b) => {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'a',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [13, 15],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 15 }
                    }
                },
                rest: {
                    type: 'Identifier',
                    name: 'b',
                    range: [7, 8],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 8 }
                    }
                },
                generator: false,
                expression: false,
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '({ a }) => {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'a',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    }],
                    range: [1, 6],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 6 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [11, 13],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 13 }
                    }
                },
                rest: null,
                generator: false,
                expression: false,
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        '({ a }, ...b) => {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'a',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [3, 4],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 4 }
                        }
                    }],
                    range: [1, 6],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 6 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [17, 19],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 19 }
                    }
                },
                rest: {
                    type: 'Identifier',
                    name: 'b',
                    range: [11, 12],
                    loc: {
                        start: { line: 1, column: 11 },
                        end: { line: 1, column: 12 }
                    }
                },
                generator: false,
                expression: false,
                range: [0, 19],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 19 }
                }
            },
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        },
        '(...[a, b]) => {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [15, 17],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 17 }
                    }
                },
                rest: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'b',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    }],
                    range: [4, 10],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 10 }
                    }
                },
                generator: false,
                expression: false,
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },
        '(a, ...[b]) => {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'Identifier',
                    name: 'a',
                    range: [1, 2],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 2 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [15, 17],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 17 }
                    }
                },
                rest: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'b',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    }],
                    range: [7, 10],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 10 }
                    }
                },
                generator: false,
                expression: false,
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            },
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },
        '({ a: [a, b] }, ...c) => {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        value: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'Identifier',
                                name: 'a',
                                range: [7, 8],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 8 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'b',
                                range: [10, 11],
                                loc: {
                                    start: { line: 1, column: 10 },
                                    end: { line: 1, column: 11 }
                                }
                            }],
                            range: [6, 12],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [3, 12],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 12 }
                        }
                    }],
                    range: [1, 14],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 14 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [25, 27],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 27 }
                    }
                },
                rest: {
                    type: 'Identifier',
                    name: 'c',
                    range: [19, 20],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                    }
                },
                generator: false,
                expression: false,
                range: [0, 27],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 27 }
                }
            },
            range: [0, 27],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 27 }
            }
        },
        '({ a: b, c }, [d, e], ...f) => {}': {
            type: 'ExpressionStatement',
            expression: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [{
                    type: 'ObjectPattern',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'b',
                            range: [6, 7],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                        range: [3, 7],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 7 }
                        }
                    }, {
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'c',
                            range: [9, 10],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        value: {
                            type: 'Identifier',
                            name: 'c',
                            range: [9, 10],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        computed: false,
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    }],
                    range: [1, 12],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 12 }
                    }
                }, {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'd',
                        range: [15, 16],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 16 }
                        }
                    }, {
                        type: 'Identifier',
                        name: 'e',
                        range: [18, 19],
                        loc: {
                            start: { line: 1, column: 18 },
                            end: { line: 1, column: 19 }
                        }
                    }],
                    range: [14, 20],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 20 }
                    }
                }],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    range: [31, 33],
                    loc: {
                        start: { line: 1, column: 31 },
                        end: { line: 1, column: 33 }
                    }
                },
                rest: {
                    type: 'Identifier',
                    name: 'f',
                    range: [25, 26],
                    loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 26 }
                    }
                },
                generator: false,
                expression: false,
                range: [0, 33],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 33 }
                }
            },
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        }

    },

    'ES6: SpreadElement': {
        '[...a] = b': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'SpreadElement',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                            range: [4, 5],
                            loc: {
                                start: { line: 1, column: 4 },
                                end: { line: 1, column: 5 }
                            }
                        },
                        range: [1, 5],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 5 }
                        }
                    }],
                    range: [0, 6],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 6 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'b',
                    range: [9, 10],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 10 }
                    }
                },
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        },

        '[a, ...b] = c': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [1, 2],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 2 }
                        }
                    }, {
                        type: 'SpreadElement',
                        argument: {
                            type: 'Identifier',
                            name: 'b',
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        range: [4, 8],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [0, 9],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'c',
                    range: [12, 13],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        '[{ a, b }, ...c] = d': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'a',
                                range: [3, 4],
                                loc: {
                                    start: { line: 1, column: 3 },
                                    end: { line: 1, column: 4 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'a',
                                range: [3, 4],
                                loc: {
                                    start: { line: 1, column: 3 },
                                    end: { line: 1, column: 4 }
                                }
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            computed: false,
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        }, {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'b',
                                range: [6, 7],
                                loc: {
                                    start: { line: 1, column: 6 },
                                    end: { line: 1, column: 7 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'b',
                                range: [6, 7],
                                loc: {
                                    start: { line: 1, column: 6 },
                                    end: { line: 1, column: 7 }
                                }
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            computed: false,
                            range: [6, 7],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 7 }
                            }
                        }],
                        range: [1, 9],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 9 }
                        }
                    }, {
                        type: 'SpreadElement',
                        argument: {
                            type: 'Identifier',
                            name: 'c',
                            range: [14, 15],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        range: [11, 15],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 15 }
                        }
                    }],
                    range: [0, 16],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 16 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'd',
                    range: [19, 20],
                    loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                    }
                },
                range: [0, 20],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 20 }
                }
            },
            range: [0, 20],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 20 }
            }
        },

        '[a, ...[b, c]] = d': {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [1, 2],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 2 }
                        }
                    }, {
                        type: 'SpreadElement',
                        argument: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'Identifier',
                                name: 'b',
                                range: [8, 9],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 9 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'c',
                                range: [11, 12],
                                loc: {
                                    start: { line: 1, column: 11 },
                                    end: { line: 1, column: 12 }
                                }
                            }],
                            range: [7, 13],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 13 }
                            }
                        },
                        range: [4, 13],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 13 }
                        }
                    }],
                    range: [0, 14],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 14 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'd',
                    range: [17, 18],
                    loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 18 }
                    }
                },
                range: [0, 18],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 18 }
                }
            },
            range: [0, 18],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 18 }
            }
        },

        'var [...a] = b': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'SpreadElement',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                            range: [8, 9],
                            loc: {
                                start: { line: 1, column: 8 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        range: [5, 9],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 9 }
                        }
                    }],
                    range: [4, 10],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 10 }
                    }
                },
                init: {
                    type: 'Identifier',
                    name: 'b',
                    range: [13, 14],
                    loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                    }
                },
                range: [4, 14],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 14 }
                }
            }],
            kind: 'var',
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        'var [a, ...b] = c': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    }, {
                        type: 'SpreadElement',
                        argument: {
                            type: 'Identifier',
                            name: 'b',
                            range: [11, 12],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        range: [8, 12],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 12 }
                        }
                    }],
                    range: [4, 13],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 13 }
                    }
                },
                init: {
                    type: 'Identifier',
                    name: 'c',
                    range: [16, 17],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [4, 17],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 17 }
                }
            }],
            kind: 'var',
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'var [{ a, b }, ...c] = d': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'a',
                                range: [7, 8],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 8 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'a',
                                range: [7, 8],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 8 }
                                }
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            computed: false,
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        }, {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'b',
                                range: [10, 11],
                                loc: {
                                    start: { line: 1, column: 10 },
                                    end: { line: 1, column: 11 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'b',
                                range: [10, 11],
                                loc: {
                                    start: { line: 1, column: 10 },
                                    end: { line: 1, column: 11 }
                                }
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            computed: false,
                            range: [10, 11],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 11 }
                            }
                        }],
                        range: [5, 13],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 13 }
                        }
                    }, {
                        type: 'SpreadElement',
                        argument: {
                            type: 'Identifier',
                            name: 'c',
                            range: [18, 19],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        range: [15, 19],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 19 }
                        }
                    }],
                    range: [4, 20],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 20 }
                    }
                },
                init: {
                    type: 'Identifier',
                    name: 'd',
                    range: [23, 24],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 24 }
                    }
                },
                range: [4, 24],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 24 }
                }
            }],
            kind: 'var',
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'var [a, ...[b, c]] = d': {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'Identifier',
                        name: 'a',
                        range: [5, 6],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 6 }
                        }
                    }, {
                        type: 'SpreadElement',
                        argument: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'Identifier',
                                name: 'b',
                                range: [12, 13],
                                loc: {
                                    start: { line: 1, column: 12 },
                                    end: { line: 1, column: 13 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'c',
                                range: [15, 16],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 16 }
                                }
                            }],
                            range: [11, 17],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        range: [8, 17],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    range: [4, 18],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 18 }
                    }
                },
                init: {
                    type: 'Identifier',
                    name: 'd',
                    range: [21, 22],
                    loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 22 }
                    }
                },
                range: [4, 22],
                loc: {
                    start: { line: 1, column: 4 },
                    end: { line: 1, column: 22 }
                }
            }],
            kind: 'var',
            range: [0, 22],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 22 }
            }
        },

        'func(...a)': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'func',
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                'arguments': [{
                    type: 'SpreadElement',
                    argument: {
                        type: 'Identifier',
                        name: 'a',
                        range: [8, 9],
                        loc: {
                            start: { line: 1, column: 8 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [5, 9],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 9 }
                    }
                }],
                range: [0, 10],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 10 }
                }
            },
            range: [0, 10],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 10 }
            }
        },

        'func(a, ...b)': {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'func',
                    range: [0, 4],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 4 }
                    }
                },
                'arguments': [{
                    type: 'Identifier',
                    name: 'a',
                    range: [5, 6],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 6 }
                    }
                }, {
                    type: 'SpreadElement',
                    argument: {
                        type: 'Identifier',
                        name: 'b',
                        range: [11, 12],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 12 }
                        }
                    },
                    range: [8, 12],
                    loc: {
                        start: { line: 1, column: 8 },
                        end: { line: 1, column: 12 }
                    }
                }],
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        }
    },


    'Harmony Invalid syntax': {

        '0o': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0o1a': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0o9': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0o18': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0O': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0O1a': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0O9': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0O18': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0b': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0b1a': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0b9': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0b18': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0b12': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0B': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0B1a': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0B9': {
            index: 2,
            lineNumber: 1,
            column: 3,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0B18': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '0B12': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '"\\u{110000}"': {
            index: 11,
            lineNumber: 1,
            column: 12,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '"\\u{}"': {
            index: 4,
            lineNumber: 1,
            column: 5,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '"\\u{FFFF"': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '"\\u{FFZ}"': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '[v] += ary': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Invalid left-hand side in assignment'
        },

        '[2] = 42': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Invalid left-hand side in assignment'
        },

        '({ obj:20 }) = 42': {
            index: 12,
            lineNumber: 1,
            column: 13,
            message: 'Error: Line 1: Invalid left-hand side in assignment'
        },

        '( { get x() {} } ) = 0': {
            index: 18,
            lineNumber: 1,
            column: 19,
            message: 'Error: Line 1: Invalid left-hand side in assignment'
        },

        'x \n is y': {
            index: 7,
            lineNumber: 2,
            column: 5,
            message: 'Error: Line 2: Unexpected identifier'
        },

        'x \n isnt y': {
            index: 9,
            lineNumber: 2,
            column: 7,
            message: 'Error: Line 2: Unexpected identifier'
        },

        'function default() {}': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token default'
        },

        'function hello() {\'use strict\'; ({ i: 10, s(eval) { } }); }': {
            index: 44,
            lineNumber: 1,
            column: 45,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        'function a() { "use strict"; ({ b(t, t) { } }); }': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Strict mode function may not have duplicate parameter names'
        },

        'var super': {
            index: 4,
            lineNumber: 1,
            column: 5,
            message: 'Error: Line 1: Unexpected reserved word'
        },

        'var default': {
            index: 4,
            lineNumber: 1,
            column: 5,
            message: 'Error: Line 1: Unexpected token default'
        },

        'let default': {
            index: 4,
            lineNumber: 1,
            column: 5,
            message: 'Error: Line 1: Unexpected token default'
        },

        'const default': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected token default'
        },



        '({ v: eval }) = obj': {
            index: 13,
            lineNumber: 1,
            column: 14,
            message: 'Error: Line 1: Invalid left-hand side in assignment'
        },

        '({ v: arguments }) = obj': {
            index: 18,
            lineNumber: 1,
            column: 19,
            message: 'Error: Line 1: Invalid left-hand side in assignment'
        },
        'for (var i = function() { return 10 in [] } in list) process(x);': {
            index: 44,
            lineNumber: 1,
            column: 45,
            message: 'Error: Line 1: Unexpected token in'
        },

        'for (let x = 42 in list) process(x);': {
            index: 16,
            lineNumber: 1,
            column: 17,
            message: 'Error: Line 1: Unexpected token in'
        },

        'for (let x = 42 of list) process(x);': {
            index: 16,
            lineNumber: 1,
            column: 17,
            message: 'Error: Line 1: Unexpected identifier'
        },

        'module\n"crypto" {}': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Illegal newline after module'
        },

        'module foo from bar': {
            index: 19,
            lineNumber: 1,
            column: 20,
            message: 'Error: Line 1: Invalid module specifier'
        },

        'module 42': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected number'
        },

        'module foo bar': {
            index: 11,
            lineNumber: 1,
            column: 12,
            message: 'Error: Line 1: Unexpected identifier'
        },

        'module "crypto" { module "e" {} }': {
            index: 17,
            lineNumber: 1,
            column: 18,
            message: 'Error: Line 1: Module declaration can not be nested'
        },

        'module "x" { export * from foo }': {
            index: 30,
            lineNumber: 1,
            column: 31,
            message: 'Error: Line 1: Invalid module specifier'
        },

        'import foo': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Missing from after import'
        },

        'import { foo, bar }': {
            index: 19,
            lineNumber: 1,
            column: 20,
            message: 'Error: Line 1: Missing from after import'
        },

        'import foo from bar': {
            index: 19,
            lineNumber: 1,
            column: 20,
            message: 'Error: Line 1: Invalid module specifier'
        },

        '((a)) => 42': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected token =>'
        },

        '(a, (b)) => 42': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token =>'
        },

        '"use strict"; (eval = 10) => 42': {
            index: 15,
            lineNumber: 1,
            column: 16,
            message: 'Error: Line 1: Assignment to eval or arguments is not allowed in strict mode'
        },

        // strict mode, using eval when IsSimpleParameterList is true
        '"use strict"; eval => 42': {
            index: 24,
            lineNumber: 1,
            column: 25,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        // strict mode, using arguments when IsSimpleParameterList is true
        '"use strict"; arguments => 42': {
            index: 29,
            lineNumber: 1,
            column: 30,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        // strict mode, using eval when IsSimpleParameterList is true
        '"use strict"; (eval, a) => 42': {
            index: 29,
            lineNumber: 1,
            column: 30,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        // strict mode, using arguments when IsSimpleParameterList is true
        '"use strict"; (arguments, a) => 42': {
            index: 34,
            lineNumber: 1,
            column: 35,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        // strict mode, using eval when IsSimpleParameterList is false
        '"use strict"; (eval, a = 10) => 42': {
            index: 34,
            lineNumber: 1,
            column: 35,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        '(a, a) => 42': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Strict mode function may not have duplicate parameter names'
        },

        '"use strict"; (a, a) => 42': {
            index: 20,
            lineNumber: 1,
            column: 21,
            message: 'Error: Line 1: Strict mode function may not have duplicate parameter names'
        },

        '"use strict"; (a) => 00': {
            index: 21,
            lineNumber: 1,
            column: 22,
            message: 'Error: Line 1: Octal literals are not allowed in strict mode.'
        },

        '() <= 42': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Unexpected token <='
        },

        '(10) => 00': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Unexpected token =>'
        },

        '(10, 20) => 00': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Unexpected token =>'
        },

        'yield v': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected identifier'
        },

        'yield 10': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected number'
        },

        'yield* 10': {
            "type": "ExpressionStatement",
            "expression": {
                "type": "BinaryExpression",
                "operator": "*",
                "left": {
                    "type": "Identifier",
                    "name": "yield",
                    "range": [
                        0,
                        5
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 5
                        }
                    }
                },
                "right": {
                    "type": "Literal",
                    "value": 10,
                    "raw": "10",
                    "range": [
                        7,
                        9
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    }
                },
                "range": [
                    0,
                    9
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                }
            },
            "range": [
                0,
                9
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 9
                }
            }
        },

        'e => yield* 10': {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ArrowFunctionExpression",
                "id": null,
                "params": [
                    {
                        "type": "Identifier",
                        "name": "e",
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
                    }
                ],
                "defaults": [],
                "body": {
                    "type": "BinaryExpression",
                    "operator": "*",
                    "left": {
                        "type": "Identifier",
                        "name": "yield",
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
                    "right": {
                        "type": "Literal",
                        "value": 10,
                        "raw": "10",
                        "range": [
                            12,
                            14
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    },
                    "range": [
                        5,
                        14
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 5
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    }
                },
                "rest": null,
                "generator": false,
                "expression": true,
                "range": [
                    0,
                    14
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            },
            "range": [
                0,
                14
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 14
                }
            }
        },

        '(function () { yield 10 })': {
            index: 21,
            lineNumber: 1,
            column: 22,
            message: 'Error: Line 1: Unexpected number'
        },

        '(function () { yield* 10 })': {
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
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "BinaryExpression",
                                "operator": "*",
                                "left": {
                                    "type": "Identifier",
                                    "name": "yield",
                                    "range": [
                                        15,
                                        20
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 20
                                        }
                                    }
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 10,
                                    "raw": "10",
                                    "range": [
                                        22,
                                        24
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 24
                                        }
                                    }
                                },
                                "range": [
                                    15,
                                    24
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 24
                                    }
                                }
                            },
                            "range": [
                                15,
                                25
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 15
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            }
                        }
                    ],
                    "range": [
                        13,
                        26
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 1,
                            "column": 26
                        }
                    }
                },
                "rest": null,
                "generator": false,
                "expression": false,
                "range": [
                    1,
                    26
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 1
                    },
                    "end": {
                        "line": 1,
                        "column": 26
                    }
                }
            },
            "range": [
                0,
                27
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 27
                }
            }
        },

        '(function() { "use strict"; f(yield v) })': {
            index: 35,
            lineNumber: 1,
            column: 36,
            message: 'Error: Line 1: Illegal yield expression'
        },

        'var obj = { *test** }': {
            index: 17,
            lineNumber: 1,
            column: 18,
            message: 'Error: Line 1: Unexpected token *'
        },

        'class A extends yield B { }': {
            index: 22,
            lineNumber: 1,
            column: 23,
            message: 'Error: Line 1: Unexpected identifier'
        },

        'class default': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected token default'
        },

        '`test': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        'switch `test`': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Unexpected quasi test'
        },

        '`hello ${10 `test`': {
            index: 18,
            lineNumber: 1,
            column: 19,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        '`hello ${10;test`': {
            index: 11,
            lineNumber: 1,
            column: 12,
            message: 'Error: Line 1: Unexpected token ILLEGAL'
        },

        'function a() 1 // expression closure is not supported': {
            index: 13,
            lineNumber: 1,
            column: 14,
            message: 'Error: Line 1: Unexpected number'
        },

        '[a,b if (a)] // (a,b)': {
            index: 4,
            lineNumber: 1,
            column: 5,
            message: 'Error: Line 1: Comprehension Error'
        },

        'for each (let x in {}) {};': {
            index: 3,
            lineNumber: 1,
            column: 4,
            message: 'Error: Line 1: Each is not supported'
        },

        '[x for (let x in [])]': {
            index: 20,
            lineNumber: 1,
            column: 21,
            message: 'Error: Line 1: Comprehension Error'
        },

        '[x for (const x in [])]': {
            index: 22,
            lineNumber: 1,
            column: 23,
            message: 'Error: Line 1: Comprehension Error'
        },

        '[x for (var x in [])]': {
            index: 20,
            lineNumber: 1,
            column: 21,
            message: 'Error: Line 1: Comprehension Error'
        },

        '[a,b for (a in [])] // (a,b) ': {
            index: 4,
            lineNumber: 1,
            column: 5,
            message: 'Error: Line 1: Comprehension Error'
        },

        '[x if (x)]  // block required': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Comprehension must have at least one block'
        },

        'var a = [x if (x)]': {
            index: 18,
            lineNumber: 1,
            column: 19,
            message: 'Error: Line 1: Comprehension must have at least one block'
        },

        '[for (x in [])]  // no espression': {
            index: 15,
            lineNumber: 1,
            column: 16,
            message: 'Error: Line 1: Comprehension Error'
        },

        '({ "chance" }) = obj': {
            index: 12,
            lineNumber: 1,
            column: 13,
            message: 'Error: Line 1: Unexpected token }'
        },

        '({ 42 }) = obj': {
            index: 6,
            lineNumber: 1,
            column: 7,
            message: 'Error: Line 1: Unexpected token }'
        },

        'function f(a, ...b, c)': {
            index: 18,
            lineNumber: 1,
            column: 19,
            message: 'Error: Line 1: Rest parameter must be final parameter of an argument list'
        },

        'function f(a, ...b = 0)': {
            index: 19,
            lineNumber: 1,
            column: 20,
            message: 'Error: Line 1: Rest parameter can not have a default value'
        },

        'function x(...{ a }){}': {
            index: 14,
            lineNumber: 1,
            column: 15,
            message: 'Error: Line 1: Invalid rest parameter'
        },

        '"use strict"; function x(a, { a }){}': {
            index: 36,
            lineNumber: 1,
            column: 37,
            message: 'Error: Line 1: Strict mode function may not have duplicate parameter names'
        },

        '"use strict"; function x({ b: { a } }, [{ b: { a } }]){}': {
            index: 56,
            lineNumber: 1,
            column: 57,
            message: 'Error: Line 1: Strict mode function may not have duplicate parameter names'
        },

        '"use strict"; function x(a, ...[a]){}': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Strict mode function may not have duplicate parameter names'
        },

        '(...a, b) => {}': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Rest parameter must be final parameter of an argument list'
        },

        '([ 5 ]) => {}': {
            index: 7,
            lineNumber: 1,
            column: 8,
            message: 'Error: Line 1: Invalid left-hand side in formals list'
        },

        '({ 5 }) => {}': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Unexpected token }'
        },

        '(...[ 5 ]) => {}': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Invalid left-hand side in formals list'
        },

        '[...{ a }] = b': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Invalid spread argument'
        },

        '[...a, b] = c': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Spread must be the final element of an element list'
        },

        'func(...a, b)': {
            index: 9,
            lineNumber: 1,
            column: 10,
            message: 'Error: Line 1: Spread must be the final element of an element list'
        },

        '({ t(eval) { "use strict"; } });': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        '"use strict"; `${test}\\02`;': {
            index: 21,
            lineNumber: 1,
            column: 22,
            message: 'Error: Line 1: Octal literals are not allowed in strict mode.'
        },

        '[...a, ] = b': {
            index: 5,
            lineNumber: 1,
            column: 6,
            message: 'Error: Line 1: Spread must be the final element of an element list'
        },

        'if (b,...a, );': {
            index: 10,
            lineNumber: 1,
            column: 11,
            message: 'Error: Line 1: Spread must be the final element of an element list'
        },

        '(b, ...a)': {
            index: 8,
            lineNumber: 1,
            column: 9,
            message: 'Error: Line 1: Illegal spread element'
        },

        'module "Universe" { ;  ;  ': {
            index: 26,
            lineNumber: 1,
            column: 27,
            message: 'Error: Line 1: Unexpected end of input'
        },

        'switch (cond) { case 10: let a = 20; ': {
            index: 37,
            lineNumber: 1,
            column: 38,
            message: 'Error: Line 1: Unexpected end of input'
        },

        '"use strict"; (eval) => 42': {
            index: 26,
            lineNumber: 1,
            column: 27,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        '(eval) => { "use strict"; 42 }': {
            index: 30,
            lineNumber: 1,
            column: 31,
            message: 'Error: Line 1: Parameter name eval or arguments is not allowed in strict mode'
        },

        '({ get test() { } }) => 42': {
            index: 20,
            lineNumber: 1,
            column: 21,
            message: 'Error: Line 1: Invalid left-hand side in formals list'
        }

    }
};