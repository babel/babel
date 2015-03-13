// React JSX tests

var fbTestFixture = {
  'Type Annotations': {
    'function foo(numVal: any){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'numVal',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'AnyTypeAnnotation',
            range: [21, 24],
            loc: {
              start: { line: 1, column: 21 },
              end: { line: 1, column: 24 }
            }
          },
          range: [19, 24],
          loc: {
            start: { line: 1, column: 19 },
            end: { line: 1, column: 24 }
          }
        },
        range: [13, 24],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 24 }
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
      generator: false,
      expression: false,
      range: [0, 27],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 27 }
      }
    },
    'function foo(numVal: number){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'numVal',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'NumberTypeAnnotation',
            range: [21, 27],
            loc: {
              start: { line: 1, column: 21 },
              end: { line: 1, column: 27 }
            }
          },
          range: [19, 27],
          loc: {
            start: { line: 1, column: 19 },
            end: { line: 1, column: 27 }
          }
        },
        range: [13, 27],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 27 }
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
      generator: false,
      expression: false,
      range: [0, 30],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 30 }
      }
    },
    'function foo(numVal: number, strVal: string){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'numVal',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'NumberTypeAnnotation',
            range: [21, 27],
            loc: {
              start: { line: 1, column: 21 },
              end: { line: 1, column: 27 }
            }
          },
          range: [19, 27],
          loc: {
            start: { line: 1, column: 19 },
            end: { line: 1, column: 27 }
          }
        },
        range: [13, 27],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 27 }
        }
      }, {
        type: 'Identifier',
        name: 'strVal',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'StringTypeAnnotation',
            range: [37, 43],
            loc: {
              start: { line: 1, column: 37 },
              end: { line: 1, column: 43 }
            }
          },
          range: [35, 43],
          loc: {
            start: { line: 1, column: 35 },
            end: { line: 1, column: 43 }
          }
        },
        range: [29, 43],
        loc: {
          start: { line: 1, column: 29 },
          end: { line: 1, column: 43 }
        }
      }],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [44, 46],
        loc: {
          start: { line: 1, column: 44 },
          end: { line: 1, column: 46 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 46],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 46 }
      }
    },
    'function foo(numVal: number, untypedVal){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'numVal',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'NumberTypeAnnotation',
            range: [21, 27],
            loc: {
              start: { line: 1, column: 21 },
              end: { line: 1, column: 27 }
            }
          },
          range: [19, 27],
          loc: {
            start: { line: 1, column: 19 },
            end: { line: 1, column: 27 }
          }
        },
        range: [13, 27],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 27 }
        }
      }, {
        type: 'Identifier',
        name: 'untypedVal',
        range: [29, 39],
        loc: {
          start: { line: 1, column: 29 },
          end: { line: 1, column: 39 }
        }
      }],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [40, 42],
        loc: {
          start: { line: 1, column: 40 },
          end: { line: 1, column: 42 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 42],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 42 }
      }
    },
    'function foo(untypedVal, numVal: number){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'untypedVal',
        range: [13, 23],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 23 }
        }
      }, {
        type: 'Identifier',
        name: 'numVal',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'NumberTypeAnnotation',
            range: [33, 39],
            loc: {
              start: { line: 1, column: 33 },
              end: { line: 1, column: 39 }
            }
          },
          range: [31, 39],
          loc: {
            start: { line: 1, column: 31 },
            end: { line: 1, column: 39 }
          }
        },
        range: [25, 39],
        loc: {
          start: { line: 1, column: 25 },
          end: { line: 1, column: 39 }
        }
      }],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [40, 42],
        loc: {
          start: { line: 1, column: 40 },
          end: { line: 1, column: 42 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 42],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 42 }
      }
    },
    'function foo(nullableNum: ?number){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'nullableNum',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'NullableTypeAnnotation',
            typeAnnotation: {
              type: 'NumberTypeAnnotation',
              range: [27, 33],
              loc: {
                start: { line: 1, column: 27 },
                end: { line: 1, column: 33 }
              }
            },
            range: [26, 33],
            loc: {
              start: { line: 1, column: 26 },
              end: { line: 1, column: 33 }
            }
          },
          range: [24, 33],
          loc: {
            start: { line: 1, column: 24 },
            end: { line: 1, column: 33 }
          }
        },
        range: [13, 33],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 33 }
        }
      }],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [34, 36],
        loc: {
          start: { line: 1, column: 34 },
          end: { line: 1, column: 36 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 36],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 36 }
      }
    },
    'function foo(callback: () => void){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'callback',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [],
            returnType: {
              type: 'VoidTypeAnnotation',
              range: [29, 33],
              loc: {
                start: { line: 1, column: 29 },
                end: { line: 1, column: 33 }
              }
            },  
            typeParameters: null,
            range: [23, 33],
            loc: {
              start: { line: 1, column: 23 },
              end: { line: 1, column: 33 }
            }
          },
          range: [21, 33],
          loc: {
            start: { line: 1, column: 21 },
            end: { line: 1, column: 33 }
          }
        },
        range: [13, 33],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 33 }
        }
      }],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [34, 36],
        loc: {
          start: { line: 1, column: 34 },
          end: { line: 1, column: 36 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 36],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 36 }
      }
    },
    'function foo(callback: () => number){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'callback',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [],
            returnType: {
              type: 'NumberTypeAnnotation',
              range: [29, 35],
              loc: {
                start: { line: 1, column: 29 },
                end: { line: 1, column: 35 }
              }
            },  
            typeParameters: null,
            range: [23, 35],
            loc: {
              start: { line: 1, column: 23 },
              end: { line: 1, column: 35 }
            }
          },
          range: [21, 35],
          loc: {
            start: { line: 1, column: 21 },
            end: { line: 1, column: 35 }
          }
        },
        range: [13, 35],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 35 }
        }
      }],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [36, 38],
        loc: {
          start: { line: 1, column: 36 },
          end: { line: 1, column: 38 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 38],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 38 }
      }
    },
    'function foo(callback: (_:bool) => number){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'callback',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [{
              type: 'FunctionTypeParam',
              name: {
                type: 'Identifier',
                name: '_',
                range: [24, 25],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 25 }
                }
              },
              typeAnnotation: {
                type: 'BooleanTypeAnnotation',
                range: [26, 30],
                loc: {
                  start: { line: 1, column: 26 },
                  end: { line: 1, column: 30 }
                }
              },
              optional: false,
              range: [24, 30],
              loc: {
                start: { line: 1, column: 24 },
                end: { line: 1, column: 30 }
              }
            }],
            returnType: {
              type: 'NumberTypeAnnotation',
              range: [35, 41],
              loc: {
                start: { line: 1, column: 35 },
                end: { line: 1, column: 41 }
              }
            },  
            typeParameters: null,
            range: [23, 41],
            loc: {
              start: { line: 1, column: 23 },
              end: { line: 1, column: 41 }
            }
          },
          range: [21, 41],
          loc: {
            start: { line: 1, column: 21 },
            end: { line: 1, column: 41 }
          }
        },
        range: [13, 41],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 41 }
        }
      }],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [42, 44],
        loc: {
          start: { line: 1, column: 42 },
          end: { line: 1, column: 44 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 44],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 44 }
      }
    },
    'function foo(callback: (_1:bool, _2:string) => number){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'callback',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [{
              type: 'FunctionTypeParam',
              name: {
                type: 'Identifier',
                name: '_1',
                range: [24, 26],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 26 }
                }
              },
              typeAnnotation: {
                type: 'BooleanTypeAnnotation',
                range: [27, 31],
                loc: {
                  start: { line: 1, column: 27 },
                  end: { line: 1, column: 31 }
                }
              },
              optional: false,
              range: [24, 31],
              loc: {
                start: { line: 1, column: 24 },
                end: { line: 1, column: 31 }
              }
            }, {
              type: 'FunctionTypeParam',
              name: {
                type: 'Identifier',
                name: '_2',
                range: [33, 35],
                loc: {
                  start: { line: 1, column: 33 },
                  end: { line: 1, column: 35 }
                }
              },
              typeAnnotation: {
                type: 'StringTypeAnnotation',
                range: [36, 42],
                loc: {
                  start: { line: 1, column: 36 },
                  end: { line: 1, column: 42 }
                }
              },
              optional: false,
              range: [33, 42],
              loc: {
                start: { line: 1, column: 33 },
                end: { line: 1, column: 42 }
              }
            }],
            returnType: {
              type: 'NumberTypeAnnotation',
              range: [47, 53],
              loc: {
                start: { line: 1, column: 47 },
                end: { line: 1, column: 53 }
              }
            },  
            typeParameters: null,
            range: [23, 53],
            loc: {
              start: { line: 1, column: 23 },
              end: { line: 1, column: 53 }
            }
          },
          range: [21, 53],
          loc: {
            start: { line: 1, column: 21 },
            end: { line: 1, column: 53 }
          }
        },
        range: [13, 53],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 53 }
        }
      }],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [54, 56],
        loc: {
          start: { line: 1, column: 54 },
          end: { line: 1, column: 56 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 56],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 56 }
      }
    },
    'function foo(callback: (_1:bool, ...foo:Array<number>) => number){}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'callback',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [{
              type: 'FunctionTypeParam',
              name: {
                type: 'Identifier',
                name: '_1',
                range: [24, 26],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 26 }
                }
              },
              typeAnnotation: {
                type: 'BooleanTypeAnnotation',
                range: [27, 31],
                loc: {
                  start: { line: 1, column: 27 },
                  end: { line: 1, column: 31 }
                }
              },
              optional: false,
              range: [24, 31],
              loc: {
                start: { line: 1, column: 24 },
                end: { line: 1, column: 31 }
              }
            }],
            returnType: {
              type: 'NumberTypeAnnotation',
              range: [58, 64],
              loc: {
                start: { line: 1, column: 58 },
                end: { line: 1, column: 64 }
              }
            },
            rest: {
              type: 'FunctionTypeParam',
              name: {
                type: 'Identifier',
                name: 'foo',
                range: [36, 39],
                loc: {
                  start: { line: 1, column: 36 },
                  end: { line: 1, column: 39 }
                }
              },
              typeAnnotation: {
                type: 'GenericTypeAnnotation',
                id: {
                  type: 'Identifier',
                  name: 'Array',
                  range: [40, 45],
                  loc: {
                    start: { line: 1, column: 40 },
                    end: { line: 1, column: 45 }
                  }
                },
                typeParameters: {
                  type: 'TypeParameterInstantiation',
                  params: [{
                    type: 'NumberTypeAnnotation',
                    range: [46, 52],
                    loc: {
                      start: { line: 1, column: 46 },
                      end: { line: 1, column: 52 }
                    }
                  }],
                  range: [45, 53],
                  loc: {
                    start: { line: 1, column: 45 },
                    end: { line: 1, column: 53 }
                  }
                },
                range: [40, 53],
                loc: {
                  start: { line: 1, column: 40 },
                  end: { line: 1, column: 53 }
                }
              },
              optional: false,
              range: [36, 53],
              loc: {
                start: { line: 1, column: 36 },
                end: { line: 1, column: 53 }
              }
            },
            typeParameters: null,
            range: [23, 64],
            loc: {
              start: { line: 1, column: 23 },
              end: { line: 1, column: 64 }
            }
          },
          range: [21, 64],
          loc: {
            start: { line: 1, column: 21 },
            end: { line: 1, column: 64 }
          }
        },
        range: [13, 64],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 64 }
        }
      }],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [65, 67],
        loc: {
          start: { line: 1, column: 65 },
          end: { line: 1, column: 67 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 67],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 67 }
      }
    },
    'function foo():number{}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [21, 23],
        loc: {
          start: { line: 1, column: 21 },
          end: { line: 1, column: 23 }
        }
      },  
      generator: false,
      expression: false,
      returnType: {
        type: 'TypeAnnotation',
        typeAnnotation: {
          type: 'NumberTypeAnnotation',
          range: [15, 21],
          loc: {
            start: { line: 1, column: 15 },
            end: { line: 1, column: 21 }
          }
        },
        range: [14, 21],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 21 }
        }
      },
      range: [0, 23],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 23 }
      }
    },
    'function foo():() => void{}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [25, 27],
        loc: {
          start: { line: 1, column: 25 },
          end: { line: 1, column: 27 }
        }
      },  
      generator: false,
      expression: false,
      returnType: {
        type: 'TypeAnnotation',
        typeAnnotation: {
          type: 'FunctionTypeAnnotation',
          params: [],
          returnType: {
            type: 'VoidTypeAnnotation',
            range: [21, 25],
            loc: {
              start: { line: 1, column: 21 },
              end: { line: 1, column: 25 }
            }
          },  
          typeParameters: null,
          range: [15, 25],
          loc: {
            start: { line: 1, column: 15 },
            end: { line: 1, column: 25 }
          }
        },
        range: [14, 25],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 25 }
        }
      },
      range: [0, 27],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 27 }
      }
    },
    'function foo():(_:bool) => number{}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [33, 35],
        loc: {
          start: { line: 1, column: 33 },
          end: { line: 1, column: 35 }
        }
      },  
      generator: false,
      expression: false,
      returnType: {
        type: 'TypeAnnotation',
        typeAnnotation: {
          type: 'FunctionTypeAnnotation',
          params: [{
            type: 'FunctionTypeParam',
            name: {
              type: 'Identifier',
              name: '_',
              range: [16, 17],
              loc: {
                start: { line: 1, column: 16 },
                end: { line: 1, column: 17 }
              }
            },
            typeAnnotation: {
              type: 'BooleanTypeAnnotation',
              range: [18, 22],
              loc: {
                start: { line: 1, column: 18 },
                end: { line: 1, column: 22 }
              }
            },
            optional: false,
            range: [16, 22],
            loc: {
              start: { line: 1, column: 16 },
              end: { line: 1, column: 22 }
            }
          }],
          returnType: {
            type: 'NumberTypeAnnotation',
            range: [27, 33],
            loc: {
              start: { line: 1, column: 27 },
              end: { line: 1, column: 33 }
            }
          },  
          typeParameters: null,
          range: [15, 33],
          loc: {
            start: { line: 1, column: 15 },
            end: { line: 1, column: 33 }
          }
        },
        range: [14, 33],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 33 }
        }
      },
      range: [0, 35],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 35 }
      }
    },
    'function foo():(_?:bool) => number{}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [34, 36],
        loc: {
          start: { line: 1, column: 34 },
          end: { line: 1, column: 36 }
        }
      },  
      generator: false,
      expression: false,
      returnType: {
        type: 'TypeAnnotation',
        typeAnnotation: {
          type: 'FunctionTypeAnnotation',
          params: [{
            type: 'FunctionTypeParam',
            name: {
              type: 'Identifier',
              name: '_',
              range: [16, 17],
              loc: {
                start: { line: 1, column: 16 },
                end: { line: 1, column: 17 }
              }
            },
            typeAnnotation: {
              type: 'BooleanTypeAnnotation',
              range: [19, 23],
              loc: {
                start: { line: 1, column: 19 },
                end: { line: 1, column: 23 }
              }
            },
            optional: true,
            range: [16, 23],
            loc: {
              start: { line: 1, column: 16 },
              end: { line: 1, column: 23 }
            }
          }],
          returnType: {
            type: 'NumberTypeAnnotation',
            range: [28, 34],
            loc: {
              start: { line: 1, column: 28 },
              end: { line: 1, column: 34 }
            }
          },  
          typeParameters: null,
          range: [15, 34],
          loc: {
            start: { line: 1, column: 15 },
            end: { line: 1, column: 34 }
          }
        },
        range: [14, 34],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 34 }
        }
      },
      range: [0, 36],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 36 }
      }
    },
    'function foo(): {} {}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [19, 21],
        loc: {
          start: { line: 1, column: 19 },
          end: { line: 1, column: 21 }
        }
      },  
      generator: false,
      expression: false,
      returnType: {
        type: 'TypeAnnotation',
        typeAnnotation: {
          type: 'ObjectTypeAnnotation',
          properties: [],
          indexers: [],
          callProperties: [],
          range: [16, 18],
          loc: {
            start: { line: 1, column: 16 },
            end: { line: 1, column: 18 }
          }
        },
        range: [14, 18],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 18 }
        }
      },
      range: [0, 21],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 21 }
      }
    },
    'function foo<T>() {}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [18, 20],
        loc: {
          start: { line: 1, column: 18 },
          end: { line: 1, column: 20 }
        }
      },  
      generator: false,
      expression: false,
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
          range: [13, 14],
          loc: {
            start: { line: 1, column: 13 },
            end: { line: 1, column: 14 }
          }
        }],
        range: [12, 15],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 15 }
        }
      },
      range: [0, 20],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 20 }
      }
    },
    'function foo<T,S>() {}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [],
      body: {
        type: 'BlockStatement',
        body: [],
        range: [20, 22],
        loc: {
          start: { line: 1, column: 20 },
          end: { line: 1, column: 22 }
        }
      },  
      generator: false,
      expression: false,
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
          range: [13, 14],
          loc: {
            start: { line: 1, column: 13 },
            end: { line: 1, column: 14 }
          }
        }, {
          type: 'Identifier',
          name: 'S',
          range: [15, 16],
          loc: {
            start: { line: 1, column: 15 },
            end: { line: 1, column: 16 }
          }
        }],
        range: [12, 17],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 17 }
        }
      },
      range: [0, 22],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 22 }
      }
    },
    'a=function<T,S>() {}': {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'Identifier',
          name: 'a',
          range: [0, 1],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 }
          }
        },
        right: {
          type: 'FunctionExpression',
          id: null,
          params: [],
          body: {
            type: 'BlockStatement',
            body: [],
            range: [18, 20],
            loc: {
              start: { line: 1, column: 18 },
              end: { line: 1, column: 20 }
            }
          },  
          generator: false,
          expression: false,
          typeParameters: {
            type: 'TypeParameterDeclaration',
            params: [{
              type: 'Identifier',
              name: 'T',
              range: [11, 12],
              loc: {
                start: { line: 1, column: 11 },
                end: { line: 1, column: 12 }
              }
            }, {
              type: 'Identifier',
              name: 'S',
              range: [13, 14],
              loc: {
                start: { line: 1, column: 13 },
                end: { line: 1, column: 14 }
              }
            }],
            range: [10, 15],
            loc: {
              start: { line: 1, column: 10 },
              end: { line: 1, column: 15 }
            }
          },
          range: [2, 20],
          loc: {
            start: { line: 1, column: 2 },
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
    "a={set fooProp(value:number){}}": {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "a",
          range: [0, 1],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "fooProp",
              range: [7, 14],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 14 }
              }
            },
            value: {
              type: "FunctionExpression",
              id: null,
              params: [{
                type: "Identifier",
                name: "value",
                typeAnnotation: {
                  type: "TypeAnnotation",
                  typeAnnotation: {
                    type: "NumberTypeAnnotation",
                    range: [21, 27],
                    loc: {
                      start: { line: 1, column: 21 },
                      end: { line: 1, column: 27 }
                    }
                  },
                  range: [20, 27],
                  loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 27 }
                  }
                },
                range: [15, 27],
                loc: {
                  start: { line: 1, column: 15 },
                  end: { line: 1, column: 27 }
                }
              }],
              body: {
                type: "BlockStatement",
                body: [],
                range: [28, 30],
                loc: {
                  start: { line: 1, column: 28 },
                  end: { line: 1, column: 30 }
                }
              },
              generator: false,
              expression: false,
              //range: [28, 30],
              //loc: {
              //  start: { line: 1, column: 28 },
              //  end: { line: 1, column: 30 }
              //}
            },
            kind: "set",
            method: false,
            shorthand: false,
            computed: false,
            range: [3, 30],
            loc: {
              start: { line: 1, column: 3 },
              end: { line: 1, column: 30 }
            }
          }],
          range: [2, 31],
          loc: {
            start: { line: 1, column: 2 },
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
    },
    "a={set fooProp(value:number):void{}}": {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "a",
          range: [0, 1],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "fooProp",
              range: [7, 14],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 14 }
              }
            },
            value: {
              type: "FunctionExpression",
              id: null,
              params: [{
                type: "Identifier",
                name: "value",
                typeAnnotation: {
                  type: "TypeAnnotation",
                  typeAnnotation: {
                    type: "NumberTypeAnnotation",
                    range: [21, 27],
                    loc: {
                      start: { line: 1, column: 21 },
                      end: { line: 1, column: 27 }
                    }
                  },
                  range: [20, 27],
                  loc: {
                    start: { line: 1, column: 20 },
                    end: { line: 1, column: 27 }
                  }
                },
                range: [15, 27],
                loc: {
                  start: { line: 1, column: 15 },
                  end: { line: 1, column: 27 }
                }
              }],
              body: {
                type: "BlockStatement",
                body: [],
                range: [33, 35],
                loc: {
                  start: { line: 1, column: 33 },
                  end: { line: 1, column: 35 }
                }
              },
              generator: false,
              expression: false,
              returnType: {
                type: "TypeAnnotation",
                typeAnnotation: {
                  type: "VoidTypeAnnotation",
                  range: [29, 33],
                  loc: {
                    start: { line: 1, column: 29 },
                    end: { line: 1, column: 33 }
                  }
                },
                range: [28, 33],
                loc: {
                  start: { line: 1, column: 28 },
                  end: { line: 1, column: 33 }
                }
              },
              //range: [33, 35],
              //loc: {
              //  start: { line: 1, column: 33 },
              //  end: { line: 1, column: 35 }
              //}
            },
            kind: "set",
            method: false,
            shorthand: false,
            computed: false,
            range: [3, 35],
            loc: {
              start: { line: 1, column: 3 },
              end: { line: 1, column: 35 }
            }
          }],
          range: [2, 36],
          loc: {
            start: { line: 1, column: 2 },
            end: { line: 1, column: 36 }
          }
        },
        range: [0, 36],
        loc: {
          start: { line: 1, column: 0 },
          end: { line: 1, column: 36 }
        }
      },
      range: [0, 36],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 36 }
      }
    },
    "a={get fooProp():number{}}": {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "a",
          range: [0, 1],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "fooProp",
              range: [7, 14],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 14 }
              }
            },
            value: {
              type: "FunctionExpression",
              id: null,
              params: [],
              body: {
                type: "BlockStatement",
                body: [],
                range: [23, 25],
                loc: {
                  start: { line: 1, column: 23 },
                  end: { line: 1, column: 25 }
                }
              },
              generator: false,
              expression: false,
              returnType: {
                type: "TypeAnnotation",
                typeAnnotation: {
                  type: "NumberTypeAnnotation",
                  range: [17, 23],
                  loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 23 }
                  }
                },
                range: [16, 23],
                loc: {
                  start: { line: 1, column: 16 },
                  end: { line: 1, column: 23 }
                }
              },
              //range: [23, 25],
              //loc: {
              //  start: { line: 1, column: 23 },
              //  end: { line: 1, column: 25 }
              //}
            },
            kind: "get",
            method: false,
            shorthand: false,
            computed: false,
            range: [3, 25],
            loc: {
              start: { line: 1, column: 3 },
              end: { line: 1, column: 25 }
            }
          }],
          range: [2, 26],
          loc: {
            start: { line: 1, column: 2 },
            end: { line: 1, column: 26 }
          }
        },
        range: [0, 26],
        loc: {
          start: { line: 1, column: 0 },
          end: { line: 1, column: 26 }
        }
      },
      range: [0, 26],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 26 }
      }
    },
    'a={id<T>(x: T): T {}}': {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "a",
          range: [0, 1],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "id",
              range: [3, 5],
              loc: {
                start: { line: 1, column: 3 },
                end: { line: 1, column: 5 }
              }
            },
            value: {
              type: "FunctionExpression",
              //id: null,
              params: [{
                type: "Identifier",
                name: "x",
                typeAnnotation: {
                  type: "TypeAnnotation",
                  typeAnnotation: {
                    type: "GenericTypeAnnotation",
                    id: {
                      type: "Identifier",
                      name: "T",
                      range: [12, 13],
                      loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 13 }
                      }
                    },
                    typeParameters: null,
                    range: [12, 13],
                    loc: {
                      start: { line: 1, column: 12 },
                      end: { line: 1, column: 13 }
                    }
                  },
                  range: [10, 13],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 13 }
                  }
                },
                range: [9, 13],
                loc: {
                  start: { line: 1, column: 9 },
                  end: { line: 1, column: 13 }
                }
              }],
              body: {
                type: "BlockStatement",
                body: [],
                range: [18, 20],
                loc: {
                  start: { line: 1, column: 18 },
                  end: { line: 1, column: 20 }
                }
              },
              generator: false,
              expression: false,
              returnType: {
                type: "TypeAnnotation",
                typeAnnotation: {
                  type: "GenericTypeAnnotation",
                  id: {
                    type: "Identifier",
                    name: "T",
                    range: [16, 17],
                    loc: {
                      start: { line: 1, column: 16 },
                      end: { line: 1, column: 17 }
                    }
                  },
                  typeParameters: null,
                  range: [16, 17],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 17 }
                  }
                },
                range: [14, 17],
                loc: {
                  start: { line: 1, column: 14 },
                  end: { line: 1, column: 17 }
                }
              },
              typeParameters: {
                type: "TypeParameterDeclaration",
                params: [{
                  type: "Identifier",
                  name: "T",
                  range: [6, 7],
                  loc: {
                    start: { line: 1, column: 6 },
                    end: { line: 1, column: 7 }
                  }
                }],
                range: [5, 8],
                loc: {
                  start: { line: 1, column: 5 },
                  end: { line: 1, column: 8 }
                }
              },
              //range: [18, 20],
              //loc: {
              //  start: { line: 1, column: 18 },
              //  end: { line: 1, column: 20 }
              //}
            },
            kind: "init",
            method: true,
            shorthand: false,
            computed: false,
            range: [3, 20],
            loc: {
              start: { line: 1, column: 3 },
              end: { line: 1, column: 20 }
            }
          }],
          range: [2, 21],
          loc: {
            start: { line: 1, column: 2 },
            end: { line: 1, column: 21 }
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
    'a={*id<T>(x: T): T {}}': {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "a",
          range: [0, 1],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [{
            type: "Property",
            key: {
              type: "Identifier",
              name: "id",
              range: [4, 6],
              loc: {
                start: { line: 1, column: 4 },
                end: { line: 1, column: 6 }
              }
            },
            value: {
              type: "FunctionExpression",
              id: null,
              params: [{
                type: "Identifier",
                name: "x",
                typeAnnotation: {
                  type: "TypeAnnotation",
                  typeAnnotation: {
                    type: "GenericTypeAnnotation",
                    id: {
                      type: "Identifier",
                      name: "T",
                      range: [13, 14],
                      loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                      }
                    },
                    typeParameters: null,
                    range: [13, 14],
                    loc: {
                      start: { line: 1, column: 13 },
                      end: { line: 1, column: 14 }
                    }
                  },
                  range: [11, 14],
                  loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 14 }
                  }
                },
                range: [10, 14],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 14 }
                }
              }],
              body: {
                type: "BlockStatement",
                body: [],
                range: [19, 21],
                loc: {
                  start: { line: 1, column: 19 },
                  end: { line: 1, column: 21 }
                }
              },
              generator: true,
              expression: false,
              returnType: {
                type: "TypeAnnotation",
                typeAnnotation: {
                  type: "GenericTypeAnnotation",
                  id: {
                    type: "Identifier",
                    name: "T",
                    range: [17, 18],
                    loc: {
                      start: { line: 1, column: 17 },
                      end: { line: 1, column: 18 }
                    }
                  },
                  typeParameters: null,
                  range: [17, 18],
                  loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 18 }
                  }
                },
                range: [15, 18],
                loc: {
                  start: { line: 1, column: 15 },
                  end: { line: 1, column: 18 }
                }
              },
              typeParameters: {
                type: "TypeParameterDeclaration",
                params: [{
                  type: "Identifier",
                  name: "T",
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
              //range: [19, 21],
              //loc: {
              //  start: { line: 1, column: 19 },
              //  end: { line: 1, column: 21 }
              //}
            },
            kind: "init",
            method: true,
            shorthand: false,
            computed: false,
            //range: [3, 21],
            //loc: {
            //  start: { line: 1, column: 3 },
            //  end: { line: 1, column: 21 }
            //}
          }],
          range: [2, 22],
          loc: {
            start: { line: 1, column: 2 },
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
    'a={async id<T>(x: T): T {}}': {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'Identifier',
          name: 'a',
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
              name: 'id',
              range: [9, 11],
              loc: {
                start: { line: 1, column: 9 },
                end: { line: 1, column: 11 }
              }
            },
            value: {
              type: 'FunctionExpression',
              id: null,
              params: [{
                type: 'Identifier',
                name: 'x',
                typeAnnotation: {
                  type: 'TypeAnnotation',
                  typeAnnotation: {
                    type: 'GenericTypeAnnotation',
                    id: {
                      type: 'Identifier',
                      name: 'T',
                      range: [18, 19],
                      loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 19 }
                      }
                    },
                    typeParameters: null,
                    range: [18, 19],
                    loc: {
                      start: { line: 1, column: 18 },
                      end: { line: 1, column: 19 }
                    }
                  },
                  range: [16, 19],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 19 }
                  }
                },
                range: [15, 19],
                loc: {
                  start: { line: 1, column: 15 },
                  end: { line: 1, column: 19 }
                }
              }],
              body: {
                type: 'BlockStatement',
                body: [],
                range: [24, 26],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 26 }
                }
              },  
              generator: false,
              expression: false,
              returnType: {
                type: 'TypeAnnotation',
                typeAnnotation: {
                  type: 'GenericTypeAnnotation',
                  id: {
                    type: 'Identifier',
                    name: 'T',
                    range: [22, 23],
                    loc: {
                      start: { line: 1, column: 22 },
                      end: { line: 1, column: 23 }
                    }
                  },
                  typeParameters: null,
                  range: [22, 23],
                  loc: {
                    start: { line: 1, column: 22 },
                    end: { line: 1, column: 23 }
                  }
                },
                range: [20, 23],
                loc: {
                  start: { line: 1, column: 20 },
                  end: { line: 1, column: 23 }
                }
              },
              typeParameters: {
                type: 'TypeParameterDeclaration',
                params: [{
                  type: 'Identifier',
                  name: 'T',
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
              },
              async: true,
              //range: [24, 26],
              //loc: {
              //  start: { line: 1, column: 24 },
              //  end: { line: 1, column: 26 }
              //}
            },
            kind: 'init',
            method: true,
            shorthand: false,
            computed: false,
            range: [3, 26],
            loc: {
              start: { line: 1, column: 3 },
              end: { line: 1, column: 26 }
            }
          }],
          range: [2, 27],
          loc: {
            start: { line: 1, column: 2 },
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
    'a={123<T>(x: T): T {}}': {
      type: "ExpressionStatement",
      expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
          type: "Identifier",
          name: "a",
          range: [0, 1],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 }
          }
        },
        right: {
          type: "ObjectExpression",
          properties: [{
            type: "Property",
            key: {
              type: "Literal",
              value: 123,
              raw: "123",
              range: [3, 6],
              loc: {
                start: { line: 1, column: 3 },
                end: { line: 1, column: 6 }
              }
            },
            value: {
              type: "FunctionExpression",
              id: null,
              params: [{
                type: "Identifier",
                name: "x",
                typeAnnotation: {
                  type: "TypeAnnotation",
                  typeAnnotation: {
                    type: "GenericTypeAnnotation",
                    id: {
                      type: "Identifier",
                      name: "T",
                      range: [13, 14],
                      loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                      }
                    },
                    typeParameters: null,
                    range: [13, 14],
                    loc: {
                      start: { line: 1, column: 13 },
                      end: { line: 1, column: 14 }
                    }
                  },
                  range: [11, 14],
                  loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 14 }
                  }
                },
                range: [10, 14],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 14 }
                }
              }],
              body: {
                type: "BlockStatement",
                body: [],
                range: [19, 21],
                loc: {
                  start: { line: 1, column: 19 },
                  end: { line: 1, column: 21 }
                }
              },
              generator: false,
              expression: false,
              returnType: {
                type: "TypeAnnotation",
                typeAnnotation: {
                  type: "GenericTypeAnnotation",
                  id: {
                    type: "Identifier",
                    name: "T",
                    range: [17, 18],
                    loc: {
                      start: { line: 1, column: 17 },
                      end: { line: 1, column: 18 }
                    }
                  },
                  typeParameters: null,
                  range: [17, 18],
                  loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 18 }
                  }
                },
                range: [15, 18],
                loc: {
                  start: { line: 1, column: 15 },
                  end: { line: 1, column: 18 }
                }
              },
              typeParameters: {
                type: "TypeParameterDeclaration",
                params: [{
                  type: "Identifier",
                  name: "T",
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
              //range: [19, 21],
              //loc: {
              //  start: { line: 1, column: 19 },
              //  end: { line: 1, column: 21 }
              //}
            },
            kind: "init",
            method: true,
            shorthand: false,
            computed: false,
            range: [3, 21],
            loc: {
              start: { line: 1, column: 3 },
              end: { line: 1, column: 21 }
            }
          }],
          range: [2, 22],
          loc: {
            start: { line: 1, column: 2 },
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
    "class Foo {set fooProp(value:number){}}": {
      type: "ClassDeclaration",
      id: {
        type: "Identifier",
        name: "Foo",
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: null,
      body: {
        type: "ClassBody",
        body: [{
          type: "MethodDefinition",
          key: {
            type: "Identifier",
            name: "fooProp",
            range: [15, 22],
            loc: {
              start: { line: 1, column: 15 },
              end: { line: 1, column: 22 }
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "value",
              typeAnnotation: {
                type: "TypeAnnotation",
                typeAnnotation: {
                  type: "NumberTypeAnnotation",
                  range: [29, 35],
                  loc: {
                    start: { line: 1, column: 29 },
                    end: { line: 1, column: 35 }
                  }
                },
                range: [28, 35],
                loc: {
                  start: { line: 1, column: 28 },
                  end: { line: 1, column: 35 }
                }
              },
              range: [23, 35],
              loc: {
                start: { line: 1, column: 23 },
                end: { line: 1, column: 35 }
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              range: [36, 38],
              loc: {
                start: { line: 1, column: 36 },
                end: { line: 1, column: 38 }
              }
            },
            generator: false,
            expression: false,
            //range: [36, 38],
            //loc: {
            //  start: { line: 1, column: 36 },
            //  end: { line: 1, column: 38 }
            //}
          },
          kind: "set",
          "static": false,
          computed: false,
          range: [11, 38],
          loc: {
            start: { line: 1, column: 11 },
            end: { line: 1, column: 38 }
          }
        }],
        range: [10, 39],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 39 }
        }
      },
      range: [0, 39],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 39 }
      }
    },
    'class Foo {set fooProp(value:number):void{}}': {
      type: "ClassDeclaration",
      id: {
        type: "Identifier",
        name: "Foo",
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: null,
      body: {
        type: "ClassBody",
        body: [{
          type: "MethodDefinition",
          key: {
            type: "Identifier",
            name: "fooProp",
            range: [15, 22],
            loc: {
              start: { line: 1, column: 15 },
              end: { line: 1, column: 22 }
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "value",
              typeAnnotation: {
                type: "TypeAnnotation",
                typeAnnotation: {
                  type: "NumberTypeAnnotation",
                  range: [29, 35],
                  loc: {
                    start: { line: 1, column: 29 },
                    end: { line: 1, column: 35 }
                  }
                },
                range: [28, 35],
                loc: {
                  start: { line: 1, column: 28 },
                  end: { line: 1, column: 35 }
                }
              },
              range: [23, 35],
              loc: {
                start: { line: 1, column: 23 },
                end: { line: 1, column: 35 }
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              range: [41, 43],
              loc: {
                start: { line: 1, column: 41 },
                end: { line: 1, column: 43 }
              }
            },
            generator: false,
            expression: false,
            returnType: {
              type: "TypeAnnotation",
              typeAnnotation: {
                type: "VoidTypeAnnotation",
                range: [37, 41],
                loc: {
                  start: { line: 1, column: 37 },
                  end: { line: 1, column: 41 }
                }
              },
              range: [36, 41],
              loc: {
                start: { line: 1, column: 36 },
                end: { line: 1, column: 41 }
              }
            },
            //range: [41, 43],
            //loc: {
            //  start: { line: 1, column: 41 },
            //  end: { line: 1, column: 43 }
            //}
          },
          kind: "set",
          "static": false,
          computed: false,
          range: [11, 43],
          loc: {
            start: { line: 1, column: 11 },
            end: { line: 1, column: 43 }
          }
        }],
        range: [10, 44],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 44 }
        }
      },
      range: [0, 44],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 44 }
      }
    },
    'class Foo {get fooProp():number{}}': {
      type: "ClassDeclaration",
      id: {
        type: "Identifier",
        name: "Foo",
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: null,
      body: {
        type: "ClassBody",
        body: [{
          type: "MethodDefinition",
          key: {
            type: "Identifier",
            name: "fooProp",
            range: [15, 22],
            loc: {
              start: { line: 1, column: 15 },
              end: { line: 1, column: 22 }
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [31, 33],
              loc: {
                start: { line: 1, column: 31 },
                end: { line: 1, column: 33 }
              }
            },
            generator: false,
            expression: false,
            returnType: {
              type: "TypeAnnotation",
              typeAnnotation: {
                type: "NumberTypeAnnotation",
                range: [25, 31],
                loc: {
                  start: { line: 1, column: 25 },
                  end: { line: 1, column: 31 }
                }
              },
              range: [24, 31],
              loc: {
                start: { line: 1, column: 24 },
                end: { line: 1, column: 31 }
              }
            },
            //range: [31, 33],
            //loc: {
            //  start: { line: 1, column: 31 },
            //  end: { line: 1, column: 33 }
            //}
          },
          kind: "get",
          "static": false,
          computed: false,
          range: [11, 33],
          loc: {
            start: { line: 1, column: 11 },
            end: { line: 1, column: 33 }
          }
        }],
        range: [10, 34],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 34 }
        }
      },
      range: [0, 34],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 34 }
      }
    },
    'var numVal:number;': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'numVal',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NumberTypeAnnotation',
              range: [11, 17],
              loc: {
                start: { line: 1, column: 11 },
                end: { line: 1, column: 17 }
              }
            },
            range: [10, 17],
            loc: {
              start: { line: 1, column: 10 },
              end: { line: 1, column: 17 }
            }
          },
          range: [4, 17],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 17 }
          }
        },
        init: null,
        range: [4, 17],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 17 }
        }
      }],
      kind: 'var',
      range: [0, 18],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 18 }
      }
    },
    'var numVal:number = otherNumVal;': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'numVal',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NumberTypeAnnotation',
              range: [11, 17],
              loc: {
                start: { line: 1, column: 11 },
                end: { line: 1, column: 17 }
              }
            },
            range: [10, 17],
            loc: {
              start: { line: 1, column: 10 },
              end: { line: 1, column: 17 }
            }
          },
          range: [4, 17],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 17 }
          }
        },
        init: {
          type: 'Identifier',
          name: 'otherNumVal',
          range: [20, 31],
          loc: {
            start: { line: 1, column: 20 },
            end: { line: 1, column: 31 }
          }
        },
        range: [4, 31],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 31 }
        }
      }],
      kind: 'var',
      range: [0, 32],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 32 }
      }
    },
    'var a: {numVal: number};': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'numVal',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                value: {
                  type: 'NumberTypeAnnotation',
                  range: [16, 22],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 22 }
                  }
                },
                optional: false,
                range: [8, 22],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 22 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [7, 23],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 23 }
              }
            },
            range: [5, 23],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 23 }
            }
          },
          range: [4, 23],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 23 }
          }
        },
        init: null,
        range: [4, 23],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 23 }
        }
      }],
      kind: 'var',
      range: [0, 24],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 24 }
      }
    },
    'var a: {numVal: number;};': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'numVal',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                value: {
                  type: 'NumberTypeAnnotation',
                  range: [16, 22],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 22 }
                  }
                },
                optional: false,
                range: [8, 22],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 22 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [7, 24],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 24 }
              }
            },
            range: [5, 24],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 24 }
            }
          },
          range: [4, 24],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 24 }
          }
        },
        init: null,
        range: [4, 24],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 24 }
        }
      }],
      kind: 'var',
      range: [0, 25],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 25 }
      }
    },
    'var a: {numVal: number; [indexer: string]: number};': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'numVal',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                value: {
                  type: 'NumberTypeAnnotation',
                  range: [16, 22],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 22 }
                  }
                },
                optional: false,
                range: [8, 22],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 22 }
                }
              }],
              indexers: [{
                type: 'ObjectTypeIndexer',
                id: {
                  type: 'Identifier',
                  name: 'indexer',
                  range: [25, 32],
                  loc: {
                    start: { line: 1, column: 25 },
                    end: { line: 1, column: 32 }
                  }
                },
                key: {
                  type: 'StringTypeAnnotation',
                  range: [34, 40],
                  loc: {
                    start: { line: 1, column: 34 },
                    end: { line: 1, column: 40 }
                  }
                },
                value: {
                  type: 'NumberTypeAnnotation',
                  range: [43, 49],
                  loc: {
                    start: { line: 1, column: 43 },
                    end: { line: 1, column: 49 }
                  }
                },
                range: [24, 49],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 49 }
                }
              }],
              callProperties: [],
              range: [7, 50],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 50 }
              }
            },
            range: [5, 50],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 50 }
            }
          },
          range: [4, 50],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 50 }
          }
        },
        init: null,
        range: [4, 50],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 50 }
        }
      }],
      kind: 'var',
      range: [0, 51],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 51 }
      }
    },
    'var a: ?{numVal: number};': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NullableTypeAnnotation',
              typeAnnotation: {
                type: 'ObjectTypeAnnotation',
                properties: [{
                  type: 'ObjectTypeProperty',
                  key: {
                    type: 'Identifier',
                    name: 'numVal',
                    range: [9, 15],
                    loc: {
                      start: { line: 1, column: 9 },
                      end: { line: 1, column: 15 }
                    }
                  },
                  value: {
                    type: 'NumberTypeAnnotation',
                    range: [17, 23],
                    loc: {
                      start: { line: 1, column: 17 },
                      end: { line: 1, column: 23 }
                    }
                  },
                  optional: false,
                  range: [9, 23],
                  loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 23 }
                  }
                }],
                indexers: [],
                callProperties: [],
                range: [8, 24],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 24 }
                }
              },
              range: [7, 24],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 24 }
              }
            },
            range: [5, 24],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 24 }
            }
          },
          range: [4, 24],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 24 }
          }
        },
        init: null,
        range: [4, 24],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 24 }
        }
      }],
      kind: 'var',
      range: [0, 25],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 25 }
      }
    },
    'var a: {numVal: number; strVal: string}': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'numVal',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                value: {
                  type: 'NumberTypeAnnotation',
                  range: [16, 22],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 22 }
                  }
                },
                optional: false,
                range: [8, 22],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 22 }
                }
              }, {
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'strVal',
                  range: [24, 30],
                  loc: {
                    start: { line: 1, column: 24 },
                    end: { line: 1, column: 30 }
                  }
                },
                value: {
                  type: 'StringTypeAnnotation',
                  range: [32, 38],
                  loc: {
                    start: { line: 1, column: 32 },
                    end: { line: 1, column: 38 }
                  }
                },
                optional: false,
                range: [24, 38],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 38 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [7, 39],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 39 }
              }
            },
            range: [5, 39],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 39 }
            }
          },
          range: [4, 39],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 39 }
          }
        },
        init: null,
        range: [4, 39],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 39 }
        }
      }],
      kind: 'var',
      range: [0, 39],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 39 }
      }
    },
    'var a: {subObj: {strVal: string}}': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'subObj',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                value: {
                  type: 'ObjectTypeAnnotation',
                  properties: [{
                    type: 'ObjectTypeProperty',
                    key: {
                      type: 'Identifier',
                      name: 'strVal',
                      range: [17, 23],
                      loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 23 }
                      }
                    },
                    value: {
                      type: 'StringTypeAnnotation',
                      range: [25, 31],
                      loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 31 }
                      }
                    },
                    optional: false,
                    range: [17, 31],
                    loc: {
                      start: { line: 1, column: 17 },
                      end: { line: 1, column: 31 }
                    }
                  }],
                  indexers: [],
                  callProperties: [],
                  range: [16, 32],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 32 }
                  }
                },
                optional: false,
                range: [8, 32],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 32 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [7, 33],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 33 }
              }
            },
            range: [5, 33],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 33 }
            }
          },
          range: [4, 33],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 33 }
          }
        },
        init: null,
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
    'var a: {subObj: ?{strVal: string}}': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'subObj',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                value: {
                  type: 'NullableTypeAnnotation',
                  typeAnnotation: {
                    type: 'ObjectTypeAnnotation',
                    properties: [{
                      type: 'ObjectTypeProperty',
                      key: {
                        type: 'Identifier',
                        name: 'strVal',
                        range: [18, 24],
                        loc: {
                          start: { line: 1, column: 18 },
                          end: { line: 1, column: 24 }
                        }
                      },
                      value: {
                        type: 'StringTypeAnnotation',
                        range: [26, 32],
                        loc: {
                          start: { line: 1, column: 26 },
                          end: { line: 1, column: 32 }
                        }
                      },
                      optional: false,
                      range: [18, 32],
                      loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 32 }
                      }
                    }],
                    indexers: [],
                    callProperties: [],
                    range: [17, 33],
                    loc: {
                      start: { line: 1, column: 17 },
                      end: { line: 1, column: 33 }
                    }
                  },
                  range: [16, 33],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 33 }
                  }
                },
                optional: false,
                range: [8, 33],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 33 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [7, 34],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 34 }
              }
            },
            range: [5, 34],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 34 }
            }
          },
          range: [4, 34],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 34 }
          }
        },
        init: null,
        range: [4, 34],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 34 }
        }
      }],
      kind: 'var',
      range: [0, 34],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 34 }
      }
    },
    'var a: {param1: number; param2: string}': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'param1',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                value: {
                  type: 'NumberTypeAnnotation',
                  range: [16, 22],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 22 }
                  }
                },
                optional: false,
                range: [8, 22],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 22 }
                }
              }, {
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'param2',
                  range: [24, 30],
                  loc: {
                    start: { line: 1, column: 24 },
                    end: { line: 1, column: 30 }
                  }
                },
                value: {
                  type: 'StringTypeAnnotation',
                  range: [32, 38],
                  loc: {
                    start: { line: 1, column: 32 },
                    end: { line: 1, column: 38 }
                  }
                },
                optional: false,
                range: [24, 38],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 38 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [7, 39],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 39 }
              }
            },
            range: [5, 39],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 39 }
            }
          },
          range: [4, 39],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 39 }
          }
        },
        init: null,
        range: [4, 39],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 39 }
        }
      }],
      kind: 'var',
      range: [0, 39],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 39 }
      }
    },
    'var a: {param1: number; param2?: string}': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'param1',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                value: {
                  type: 'NumberTypeAnnotation',
                  range: [16, 22],
                  loc: {
                    start: { line: 1, column: 16 },
                    end: { line: 1, column: 22 }
                  }
                },
                optional: false,
                range: [8, 22],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 22 }
                }
              }, {
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'param2',
                  range: [24, 30],
                  loc: {
                    start: { line: 1, column: 24 },
                    end: { line: 1, column: 30 }
                  }
                },
                value: {
                  type: 'StringTypeAnnotation',
                  range: [33, 39],
                  loc: {
                    start: { line: 1, column: 33 },
                    end: { line: 1, column: 39 }
                  }
                },
                optional: true,
                range: [24, 39],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 39 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [7, 40],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 40 }
              }
            },
            range: [5, 40],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 40 }
            }
          },
          range: [4, 40],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 40 }
          }
        },
        init: null,
        range: [4, 40],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 40 }
        }
      }],
      kind: 'var',
      range: [0, 40],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 40 }
      }
    },
    'var a: { [a: number]: string; [b: number]: string; };': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [],
              indexers: [{
                type: 'ObjectTypeIndexer',
                id: {
                  type: 'Identifier',
                  name: 'a',
                  range: [10, 11],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 11 }
                  }
                },
                key: {
                  type: 'NumberTypeAnnotation',
                  range: [13, 19],
                  loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 19 }
                  }
                },
                value: {
                  type: 'StringTypeAnnotation',
                  range: [22, 28],
                  loc: {
                    start: { line: 1, column: 22 },
                    end: { line: 1, column: 28 }
                  }
                },
                range: [9, 28],
                loc: {
                  start: { line: 1, column: 9 },
                  end: { line: 1, column: 28 }
                }
              }, {
                type: 'ObjectTypeIndexer',
                id: {
                  type: 'Identifier',
                  name: 'b',
                  range: [31, 32],
                  loc: {
                    start: { line: 1, column: 31 },
                    end: { line: 1, column: 32 }
                  }
                },
                key: {
                  type: 'NumberTypeAnnotation',
                  range: [34, 40],
                  loc: {
                    start: { line: 1, column: 34 },
                    end: { line: 1, column: 40 }
                  }
                },
                value: {
                  type: 'StringTypeAnnotation',
                  range: [43, 49],
                  loc: {
                    start: { line: 1, column: 43 },
                    end: { line: 1, column: 49 }
                  }
                },
                range: [30, 49],
                loc: {
                  start: { line: 1, column: 30 },
                  end: { line: 1, column: 49 }
                }
              }],
              callProperties: [],
              range: [7, 52],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 52 }
              }
            },
            range: [5, 52],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 52 }
            }
          },
          range: [4, 52],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 52 }
          }
        },
        init: null,
        range: [4, 52],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 52 }
        }
      }],
      kind: 'var',
      range: [0, 53],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 53 }
      }
    },
    'var a: {add(x:number, ...y:Array<string>): void}': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'add',
                  range: [8, 11],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 11 }
                  }
                },
                value: {
                  type: 'FunctionTypeAnnotation',
                  params: [{
                    type: 'FunctionTypeParam',
                    name: {
                      type: 'Identifier',
                      name: 'x',
                      range: [12, 13],
                      loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 13 }
                      }
                    },
                    typeAnnotation: {
                      type: 'NumberTypeAnnotation',
                      range: [14, 20],
                      loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 20 }
                      }
                    },
                    optional: false,
                    range: [12, 20],
                    loc: {
                      start: { line: 1, column: 12 },
                      end: { line: 1, column: 20 }
                    }
                  }],
                  returnType: {
                    type: 'VoidTypeAnnotation',
                    range: [43, 47],
                    loc: {
                      start: { line: 1, column: 43 },
                      end: { line: 1, column: 47 }
                    }
                  },
                  rest: {
                    type: 'FunctionTypeParam',
                    name: {
                      type: 'Identifier',
                      name: 'y',
                      range: [25, 26],
                      loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 26 }
                      }
                    },
                    typeAnnotation: {
                      type: 'GenericTypeAnnotation',
                      id: {
                        type: 'Identifier',
                        name: 'Array',
                        range: [27, 32],
                        loc: {
                          start: { line: 1, column: 27 },
                          end: { line: 1, column: 32 }
                        }
                      },
                      typeParameters: {
                        type: 'TypeParameterInstantiation',
                        params: [{
                          type: 'StringTypeAnnotation',
                          range: [33, 39],
                          loc: {
                            start: { line: 1, column: 33 },
                            end: { line: 1, column: 39 }
                          }
                        }],
                        range: [32, 40],
                        loc: {
                          start: { line: 1, column: 32 },
                          end: { line: 1, column: 40 }
                        }
                      },
                      range: [27, 40],
                      loc: {
                        start: { line: 1, column: 27 },
                        end: { line: 1, column: 40 }
                      }
                    },
                    optional: false,
                    range: [25, 40],
                    loc: {
                      start: { line: 1, column: 25 },
                      end: { line: 1, column: 40 }
                    }
                  },
                  typeParameters: null,
                  range: [8, 47],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 47 }
                  }
                },
                optional: false,
                range: [8, 47],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 47 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [7, 48],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 48 }
              }
            },
            range: [5, 48],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 48 }
            }
          },
          range: [4, 48],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 48 }
          }
        },
        init: null,
        range: [4, 48],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 48 }
        }
      }],
      kind: 'var',
      range: [0, 48],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 48 }
      }
    },
    'var a: { id<T>(x: T): T; }': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'id',
                  range: [9, 11],
                  loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 11 }
                  }
                },
                value: {
                  type: 'FunctionTypeAnnotation',
                  params: [{
                    type: 'FunctionTypeParam',
                    name: {
                      type: 'Identifier',
                      name: 'x',
                      range: [15, 16],
                      loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 16 }
                      }
                    },
                    typeAnnotation: {
                      type: 'GenericTypeAnnotation',
                      id: {
                        type: 'Identifier',
                        name: 'T',
                        range: [18, 19],
                        loc: {
                          start: { line: 1, column: 18 },
                          end: { line: 1, column: 19 }
                        }
                      },
                      typeParameters: null,
                      range: [18, 19],
                      loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 19 }
                      }
                    },
                    optional: false,
                    range: [15, 19],
                    loc: {
                      start: { line: 1, column: 15 },
                      end: { line: 1, column: 19 }
                    }
                  }],
                  returnType: {
                    type: 'GenericTypeAnnotation',
                    id: {
                      type: 'Identifier',
                      name: 'T',
                      range: [22, 23],
                      loc: {
                        start: { line: 1, column: 22 },
                        end: { line: 1, column: 23 }
                      }
                    },
                    typeParameters: null,
                    range: [22, 23],
                    loc: {
                      start: { line: 1, column: 22 },
                      end: { line: 1, column: 23 }
                    }
                  },  
                  typeParameters: {
                    type: 'TypeParameterDeclaration',
                    params: [{
                      type: 'Identifier',
                      name: 'T',
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
                  },
                  range: [9, 23],
                  loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 23 }
                  }
                },
                optional: false,
                range: [9, 23],
                loc: {
                  start: { line: 1, column: 9 },
                  end: { line: 1, column: 23 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [7, 26],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 26 }
              }
            },
            range: [5, 26],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 26 }
            }
          },
          range: [4, 26],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 26 }
          }
        },
        init: null,
        range: [4, 26],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 26 }
        }
      }],
      kind: 'var',
      range: [0, 26],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 26 }
      }
    },
    'var a:Array<number> = [1, 2, 3]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'GenericTypeAnnotation',
              id: {
                type: 'Identifier',
                name: 'Array',
                range: [6, 11],
                loc: {
                  start: { line: 1, column: 6 },
                  end: { line: 1, column: 11 }
                }
              },
              typeParameters: {
                type: 'TypeParameterInstantiation',
                params: [{
                  type: 'NumberTypeAnnotation',
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
              },
              range: [6, 19],
              loc: {
                start: { line: 1, column: 6 },
                end: { line: 1, column: 19 }
              }
            },
            range: [5, 19],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 19 }
            }
          },
          range: [4, 19],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 19 }
          }
        },
        init: {
          type: 'ArrayExpression',
          elements: [{
            type: 'Literal',
            value: 1,
            raw: '1',
            range: [23, 24],
            loc: {
              start: { line: 1, column: 23 },
              end: { line: 1, column: 24 }
            }
          }, {
            type: 'Literal',
            value: 2,
            raw: '2',
            range: [26, 27],
            loc: {
              start: { line: 1, column: 26 },
              end: { line: 1, column: 27 }
            }
          }, {
            type: 'Literal',
            value: 3,
            raw: '3',
            range: [29, 30],
            loc: {
              start: { line: 1, column: 29 },
              end: { line: 1, column: 30 }
            }
          }],
          range: [22, 31],
          loc: {
            start: { line: 1, column: 22 },
            end: { line: 1, column: 31 }
          }
        },
        range: [4, 31],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 31 }
        }
      }],
      kind: 'var',
      range: [0, 31],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 31 }
      }
    },
    'a = class Foo<T> { }': {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'Identifier',
          name: 'a',
          range: [0, 1],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 }
          }
        },
        right: {
          type: 'ClassExpression',
          id: {
            type: 'Identifier',
            name: 'Foo',
            range: [10, 13],
            loc: {
              start: { line: 1, column: 10 },
              end: { line: 1, column: 13 }
            }
          },
          superClass: null,
          body: {
            type: 'ClassBody',
            body: [],
            range: [17, 20],
            loc: {
              start: { line: 1, column: 17 },
              end: { line: 1, column: 20 }
            }
          },
          typeParameters: {
            type: 'TypeParameterDeclaration',
            params: [{
              type: 'Identifier',
              name: 'T',
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
          },
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
    'a = class Foo<T> extends Bar<T> { }': {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'Identifier',
          name: 'a',
          range: [0, 1],
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 }
          }
        },
        right: {
          type: 'ClassExpression',
          id: {
            type: 'Identifier',
            name: 'Foo',
            range: [10, 13],
            loc: {
              start: { line: 1, column: 10 },
              end: { line: 1, column: 13 }
            }
          },
          superClass: {
            type: 'Identifier',
            name: 'Bar',
            range: [25, 28],
            loc: {
              start: { line: 1, column: 25 },
              end: { line: 1, column: 28 }
            }
          },
          body: {
            type: 'ClassBody',
            body: [],
            range: [32, 35],
            loc: {
              start: { line: 1, column: 32 },
              end: { line: 1, column: 35 }
            }
          },
          typeParameters: {
            type: 'TypeParameterDeclaration',
            params: [{
              type: 'Identifier',
              name: 'T',
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
          },
          superTypeParameters: {
            type: 'TypeParameterInstantiation',
            params: [{
              type: 'GenericTypeAnnotation',
              id: {
                type: 'Identifier',
                name: 'T',
                range: [29, 30],
                loc: {
                  start: { line: 1, column: 29 },
                  end: { line: 1, column: 30 }
                }
              },
              typeParameters: null,
              range: [29, 30],
              loc: {
                start: { line: 1, column: 29 },
                end: { line: 1, column: 30 }
              }
            }],
            range: [28, 31],
            loc: {
              start: { line: 1, column: 28 },
              end: { line: 1, column: 31 }
            }
          },
          range: [4, 35],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 35 }
          }
        },
        range: [0, 35],
        loc: {
          start: { line: 1, column: 0 },
          end: { line: 1, column: 35 }
        }
      },
      range: [0, 35],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 35 }
      }
    },
    'class Foo<T> {}': {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: null,
      body: {
        type: 'ClassBody',
        body: [],
        range: [13, 15],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 15 }
        }
      },
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
          range: [10, 11],
          loc: {
            start: { line: 1, column: 10 },
            end: { line: 1, column: 11 }
          }
        }],
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      range: [0, 15],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 15 }
      }
    },
    'class Foo<T> extends Bar<T> { }': {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: {
        type: 'Identifier',
        name: 'Bar',
        range: [21, 24],
        loc: {
          start: { line: 1, column: 21 },
          end: { line: 1, column: 24 }
        }
      },
      body: {
        type: 'ClassBody',
        body: [],
        range: [28, 31],
        loc: {
          start: { line: 1, column: 28 },
          end: { line: 1, column: 31 }
        }
      },
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
          range: [10, 11],
          loc: {
            start: { line: 1, column: 10 },
            end: { line: 1, column: 11 }
          }
        }],
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      superTypeParameters: {
        type: 'TypeParameterInstantiation',
        params: [{
          type: 'GenericTypeAnnotation',
          id: {
            type: 'Identifier',
            name: 'T',
            range: [25, 26],
            loc: {
              start: { line: 1, column: 25 },
              end: { line: 1, column: 26 }
            }
          },
          typeParameters: null,
          range: [25, 26],
          loc: {
            start: { line: 1, column: 25 },
            end: { line: 1, column: 26 }
          }
        }],
        range: [24, 27],
        loc: {
          start: { line: 1, column: 24 },
          end: { line: 1, column: 27 }
        }
      },
      range: [0, 31],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 31 }
      }
    },
    'class Foo<T> extends mixin(Bar) { }': {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'mixin',
          range: [21, 26],
          loc: {
            start: { line: 1, column: 21 },
            end: { line: 1, column: 26 }
          }
        },
        'arguments': [{
          type: 'Identifier',
          name: 'Bar',
          range: [27, 30],
          loc: {
            start: { line: 1, column: 27 },
            end: { line: 1, column: 30 }
          }
        }],
        range: [21, 31],
        loc: {
          start: { line: 1, column: 21 },
          end: { line: 1, column: 31 }
        }
      },
      body: {
        type: 'ClassBody',
        body: [],
        range: [32, 35],
        loc: {
          start: { line: 1, column: 32 },
          end: { line: 1, column: 35 }
        }
      },
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
          range: [10, 11],
          loc: {
            start: { line: 1, column: 10 },
            end: { line: 1, column: 11 }
          }
        }],
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      range: [0, 35],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 35 }
      }
    },
    'class Foo<T> { bar<U>():number { return 42; }}': {
      type: "ClassDeclaration",
      id: {
        type: "Identifier",
        name: "Foo",
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: null,
      body: {
        type: "ClassBody",
        body: [{
          type: "MethodDefinition",
          key: {
            type: "Identifier",
            name: "bar",
            range: [15, 18],
            loc: {
              start: { line: 1, column: 15 },
              end: { line: 1, column: 18 }
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [{
                type: "ReturnStatement",
                argument: {
                  type: "Literal",
                  value: 42,
                  raw: "42",
                  range: [40, 42],
                  loc: {
                    start: { line: 1, column: 40 },
                    end: { line: 1, column: 42 }
                  }
                },
                range: [33, 43],
                loc: {
                  start: { line: 1, column: 33 },
                  end: { line: 1, column: 43 }
                }
              }],
              range: [31, 45],
              loc: {
                start: { line: 1, column: 31 },
                end: { line: 1, column: 45 }
              }
            },
            generator: false,
            expression: false,
            returnType: {
              type: "TypeAnnotation",
              typeAnnotation: {
                type: "NumberTypeAnnotation",
                range: [24, 30],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 30 }
                }
              },
              range: [23, 30],
              loc: {
                start: { line: 1, column: 23 },
                end: { line: 1, column: 30 }
              }
            },
            typeParameters: {
              type: "TypeParameterDeclaration",
              params: [{
                type: "Identifier",
                name: "U",
                range: [19, 20],
                loc: {
                  start: { line: 1, column: 19 },
                  end: { line: 1, column: 20 }
                }
              }],
              range: [18, 21],
              loc: {
                start: { line: 1, column: 18 },
                end: { line: 1, column: 21 }
              }
            },
            //range: [31, 45],
            //loc: {
            //  start: { line: 1, column: 31 },
            //  end: { line: 1, column: 45 }
            //}
          },
          kind: "",
          "static": false,
          computed: false,
          range: [15, 45],
          loc: {
            start: { line: 1, column: 15 },
            end: { line: 1, column: 45 }
          }
        }],
        range: [13, 46],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 46 }
        }
      },
      typeParameters: {
        type: "TypeParameterDeclaration",
        params: [{
          type: "Identifier",
          name: "T",
          range: [10, 11],
          loc: {
            start: { line: 1, column: 10 },
            end: { line: 1, column: 11 }
          }
        }],
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      range: [0, 46],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 46 }
      }
    },
    'class Foo { "bar"<T>() { } }': {
      type: "ClassDeclaration",
      id: {
        type: "Identifier",
        name: "Foo",
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: null,
      body: {
        type: "ClassBody",
        body: [{
          type: "MethodDefinition",
          key: {
            type: "Literal",
            value: "bar",
            raw: '"bar"',
            range: [12, 17],
            loc: {
              start: { line: 1, column: 12 },
              end: { line: 1, column: 17 }
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [23, 26],
              loc: {
                start: { line: 1, column: 23 },
                end: { line: 1, column: 26 }
              }
            },
            generator: false,
            expression: false,
            typeParameters: {
              type: "TypeParameterDeclaration",
              params: [{
                type: "Identifier",
                name: "T",
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
            },
            //range: [23, 26],
            //loc: {
            //  start: { line: 1, column: 23 },
            //  end: { line: 1, column: 26 }
            //}
          },
          kind: "",
          "static": false,
          computed: false,
          range: [12, 26],
          loc: {
            start: { line: 1, column: 12 },
            end: { line: 1, column: 26 }
          }
        }],
        range: [10, 28],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 28 }
        }
      },
      range: [0, 28],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 28 }
      }
    },
    'function foo(requiredParam, optParam?) {}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'requiredParam',
        range: [13, 26],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 26 }
        }
      }, {
        type: 'Identifier',
        name: 'optParam',
        optional: true,
        range: [28, 37],
        loc: {
          start: { line: 1, column: 28 },
          end: { line: 1, column: 37 }
        }
      }],  
      body: {
        type: 'BlockStatement',
        body: [],
        range: [39, 41],
        loc: {
          start: { line: 1, column: 39 },
          end: { line: 1, column: 41 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 41],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 41 }
      }
    },
    'class Foo { prop1:string; prop2:number; }': {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: null,
      body: {
        type: 'ClassBody',
        body: [{
          type: 'ClassProperty',
          key: {
            type: 'Identifier',
            name: 'prop1',
            range: [12, 17],
            loc: {
              start: { line: 1, column: 12 },
              end: { line: 1, column: 17 }
            }
          },
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'StringTypeAnnotation',
              range: [18, 24],
              loc: {
                start: { line: 1, column: 18 },
                end: { line: 1, column: 24 }
              }
            },
            range: [17, 24],
            loc: {
              start: { line: 1, column: 17 },
              end: { line: 1, column: 24 }
            }
          },
          computed: false,
          'static': false,
          range: [12, 25],
          loc: {
            start: { line: 1, column: 12 },
            end: { line: 1, column: 25 }
          }
        }, {
          type: 'ClassProperty',
          key: {
            type: 'Identifier',
            name: 'prop2',
            range: [26, 31],
            loc: {
              start: { line: 1, column: 26 },
              end: { line: 1, column: 31 }
            }
          },
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NumberTypeAnnotation',
              range: [32, 38],
              loc: {
                start: { line: 1, column: 32 },
                end: { line: 1, column: 38 }
              }
            },
            range: [31, 38],
            loc: {
              start: { line: 1, column: 31 },
              end: { line: 1, column: 38 }
            }
          },
          computed: false,
          'static': false,
          range: [26, 39],
          loc: {
            start: { line: 1, column: 26 },
            end: { line: 1, column: 39 }
          }
        }],
        range: [10, 41],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 41 }
        }
      },
      range: [0, 41],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 41 }
      }
    },
    'class Foo { static prop1:string; prop2:number; }': {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: null,
      body: {
        type: 'ClassBody',
        body: [{
          type: 'ClassProperty',
          key: {
            type: 'Identifier',
            name: 'prop1',
            range: [19, 24],
            loc: {
              start: { line: 1, column: 19 },
              end: { line: 1, column: 24 }
            }
          },
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'StringTypeAnnotation',
              range: [25, 31],
              loc: {
                start: { line: 1, column: 25 },
                end: { line: 1, column: 31 }
              }
            },
            range: [24, 31],
            loc: {
              start: { line: 1, column: 24 },
              end: { line: 1, column: 31 }
            }
          },
          computed: false,
          'static': true,
          range: [12, 32],
          loc: {
            start: { line: 1, column: 12 },
            end: { line: 1, column: 32 }
          }
        }, {
          type: 'ClassProperty',
          key: {
            type: 'Identifier',
            name: 'prop2',
            range: [33, 38],
            loc: {
              start: { line: 1, column: 33 },
              end: { line: 1, column: 38 }
            }
          },
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NumberTypeAnnotation',
              range: [39, 45],
              loc: {
                start: { line: 1, column: 39 },
                end: { line: 1, column: 45 }
              }
            },
            range: [38, 45],
            loc: {
              start: { line: 1, column: 38 },
              end: { line: 1, column: 45 }
            }
          },
          computed: false,
          'static': false,
          range: [33, 46],
          loc: {
            start: { line: 1, column: 33 },
            end: { line: 1, column: 46 }
          }
        }],
        range: [10, 48],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 48 }
        }
      },
      range: [0, 48],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 48 }
      }
    },
    'var x : number | string = 4;': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'x',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'UnionTypeAnnotation',
              types: [{
                type: 'NumberTypeAnnotation',
                range: [8, 14],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 14 }
                }
              }, {
                type: 'StringTypeAnnotation',
                range: [17, 23],
                loc: {
                  start: { line: 1, column: 17 },
                  end: { line: 1, column: 23 }
                }
              }],
              range: [8, 23],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 23 }
              }
            },
            range: [6, 23],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 23 }
            }
          },
          range: [4, 23],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 23 }
          }
        },
        init: {
          type: 'Literal',
          value: 4,
          raw: '4',
          range: [26, 27],
          loc: {
            start: { line: 1, column: 26 },
            end: { line: 1, column: 27 }
          }
        },
        range: [4, 27],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 27 }
        }
      }],
      kind: 'var',
      range: [0, 28],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 28 }
      }
    },
    "class Array { concat(items:number | string) {}; }": {
      type: "ClassDeclaration",
      id: {
        type: "Identifier",
        name: "Array",
        range: [6, 11],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 11 }
        }
      },
      superClass: null,
      body: {
        type: "ClassBody",
        body: [{
          type: "MethodDefinition",
          key: {
            type: "Identifier",
            name: "concat",
            range: [14, 20],
            loc: {
              start: { line: 1, column: 14 },
              end: { line: 1, column: 20 }
            }
          },
          value: {
            type: "FunctionExpression",
            id: null,
            params: [{
              type: "Identifier",
              name: "items",
              typeAnnotation: {
                type: "TypeAnnotation",
                typeAnnotation: {
                  type: "UnionTypeAnnotation",
                  types: [{
                    type: "NumberTypeAnnotation",
                    range: [27, 33],
                    loc: {
                      start: { line: 1, column: 27 },
                      end: { line: 1, column: 33 }
                    }
                  }, {
                    type: "StringTypeAnnotation",
                    range: [36, 42],
                    loc: {
                      start: { line: 1, column: 36 },
                      end: { line: 1, column: 42 }
                    }
                  }],
                  range: [27, 42],
                  loc: {
                    start: { line: 1, column: 27 },
                    end: { line: 1, column: 42 }
                  }
                },
                range: [26, 42],
                loc: {
                  start: { line: 1, column: 26 },
                  end: { line: 1, column: 42 }
                }
              },
              range: [21, 42],
              loc: {
                start: { line: 1, column: 21 },
                end: { line: 1, column: 42 }
              }
            }],
            body: {
              type: "BlockStatement",
              body: [],
              range: [44, 46],
              loc: {
                start: { line: 1, column: 44 },
                end: { line: 1, column: 46 }
              }
            },
            generator: false,
            expression: false,
            //range: [44, 46],
            //loc: {
            //  start: { line: 1, column: 44 },
            //  end: { line: 1, column: 46 }
            //}
          },
          kind: "",
          "static": false,
          computed: false,
          range: [14, 46],
          loc: {
            start: { line: 1, column: 14 },
            end: { line: 1, column: 46 }
          }
        }],
        range: [12, 49],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 49 }
        }
      },
      range: [0, 49],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 49 }
      }
    },
    'var x : () => number | () => string = fn;': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'x',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'FunctionTypeAnnotation',
              params: [],
              returnType: {
                type: 'UnionTypeAnnotation',
                types: [{
                  type: 'NumberTypeAnnotation',
                  range: [14, 20],
                  loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 20 }
                  }
                }, {
                  type: 'FunctionTypeAnnotation',
                  params: [],
                  returnType: {
                    type: 'StringTypeAnnotation',
                    range: [29, 35],
                    loc: {
                      start: { line: 1, column: 29 },
                      end: { line: 1, column: 35 }
                    }
                  },  
                  typeParameters: null,
                  range: [23, 35],
                  loc: {
                    start: { line: 1, column: 23 },
                    end: { line: 1, column: 35 }
                  }
                }],
                range: [14, 35],
                loc: {
                  start: { line: 1, column: 14 },
                  end: { line: 1, column: 35 }
                }
              },  
              typeParameters: null,
              range: [8, 35],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 35 }
              }
            },
            range: [6, 35],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 35 }
            }
          },
          range: [4, 35],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 35 }
          }
        },
        init: {
          type: 'Identifier',
          name: 'fn',
          range: [38, 40],
          loc: {
            start: { line: 1, column: 38 },
            end: { line: 1, column: 40 }
          }
        },
        range: [4, 40],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 40 }
        }
      }],
      kind: 'var',
      range: [0, 41],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 41 }
      }
    },
    'var x: typeof Y = Y;': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'x',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'TypeofTypeAnnotation',
              argument: {
                type: 'GenericTypeAnnotation',
                id: {
                  type: 'Identifier',
                  name: 'Y',
                  range: [14, 15],
                  loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 15 }
                  }
                },
                typeParameters: null,
                range: [14, 15],
                loc: {
                  start: { line: 1, column: 14 },
                  end: { line: 1, column: 15 }
                }
              },
              range: [7, 15],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 15 }
              }
            },
            range: [5, 15],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 15 }
            }
          },
          range: [4, 15],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 15 }
          }
        },
        init: {
          type: 'Identifier',
          name: 'Y',
          range: [18, 19],
          loc: {
            start: { line: 1, column: 18 },
            end: { line: 1, column: 19 }
          }
        },
        range: [4, 19],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 19 }
        }
      }],
      kind: 'var',
      range: [0, 20],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 20 }
      }
    },
    'var x: typeof Y | number = Y;': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'x',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'UnionTypeAnnotation',
              types: [{
                type: 'TypeofTypeAnnotation',
                argument: {
                  type: 'GenericTypeAnnotation',
                  id: {
                    type: 'Identifier',
                    name: 'Y',
                    range: [14, 15],
                    loc: {
                      start: { line: 1, column: 14 },
                      end: { line: 1, column: 15 }
                    }
                  },
                  typeParameters: null,
                  range: [14, 15],
                  loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 15 }
                  }
                },
                range: [7, 15],
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 15 }
                }
              }, {
                type: 'NumberTypeAnnotation',
                range: [18, 24],
                loc: {
                  start: { line: 1, column: 18 },
                  end: { line: 1, column: 24 }
                }
              }],
              range: [7, 24],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 24 }
              }
            },
            range: [5, 24],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 24 }
            }
          },
          range: [4, 24],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 24 }
          }
        },
        init: {
          type: 'Identifier',
          name: 'Y',
          range: [27, 28],
          loc: {
            start: { line: 1, column: 27 },
            end: { line: 1, column: 28 }
          }
        },
        range: [4, 28],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 28 }
        }
      }],
      kind: 'var',
      range: [0, 29],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 29 }
      }
    },
    'var {x}: {x: string; } = { x: "hello" };': {
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
          range: [4, 22],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 22 }
          },
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'x',
                  range: [10, 11],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 11 }
                  }
                },
                value: {
                  type: 'StringTypeAnnotation',
                  range: [13, 19],
                  loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 19 }
                  }
                },
                optional: false,
                range: [10, 19],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 19 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [9, 22],
              loc: {
                start: { line: 1, column: 9 },
                end: { line: 1, column: 22 }
              }
            },
            range: [7, 22],
            loc: {
              start: { line: 1, column: 7 },
              end: { line: 1, column: 22 }
            }
          }
        },
        init: {
          type: 'ObjectExpression',
          properties: [{
            type: 'Property',
            key: {
              type: 'Identifier',
              name: 'x',
              range: [27, 28],
              loc: {
                start: { line: 1, column: 27 },
                end: { line: 1, column: 28 }
              }
            },
            value: {
              type: 'Literal',
              value: 'hello',
              raw: '"hello"',
              range: [30, 37],
              loc: {
                start: { line: 1, column: 30 },
                end: { line: 1, column: 37 }
              }
            },
            kind: 'init',
            method: false,
            shorthand: false,
            computed: false,
            range: [27, 37],
            loc: {
              start: { line: 1, column: 27 },
              end: { line: 1, column: 37 }
            }
          }],
          range: [25, 39],
          loc: {
            start: { line: 1, column: 25 },
            end: { line: 1, column: 39 }
          }
        },
        range: [4, 39],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 39 }
        }
      }],
      kind: 'var',
      range: [0, 40],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 40 }
      }
    },
    'var {x}: {x: string } = { x: "hello" };': {
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
          range: [4, 21],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 21 }
          },
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'x',
                  range: [10, 11],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 11 }
                  }
                },
                value: {
                  type: 'StringTypeAnnotation',
                  range: [13, 19],
                  loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 19 }
                  }
                },
                optional: false,
                range: [10, 19],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 19 }
                }
              }],
              indexers: [],
              callProperties: [],
              range: [9, 21],
              loc: {
                start: { line: 1, column: 9 },
                end: { line: 1, column: 21 }
              }
            },
            range: [7, 21],
            loc: {
              start: { line: 1, column: 7 },
              end: { line: 1, column: 21 }
            }
          }
        },
        init: {
          type: 'ObjectExpression',
          properties: [{
            type: 'Property',
            key: {
              type: 'Identifier',
              name: 'x',
              range: [26, 27],
              loc: {
                start: { line: 1, column: 26 },
                end: { line: 1, column: 27 }
              }
            },
            value: {
              type: 'Literal',
              value: 'hello',
              raw: '"hello"',
              range: [29, 36],
              loc: {
                start: { line: 1, column: 29 },
                end: { line: 1, column: 36 }
              }
            },
            kind: 'init',
            method: false,
            shorthand: false,
            computed: false,
            range: [26, 36],
            loc: {
              start: { line: 1, column: 26 },
              end: { line: 1, column: 36 }
            }
          }],
          range: [24, 38],
          loc: {
            start: { line: 1, column: 24 },
            end: { line: 1, column: 38 }
          }
        },
        range: [4, 38],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 38 }
        }
      }],
      kind: 'var',
      range: [0, 39],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 39 }
      }
    },
    'var [x]: Array<string> = [ "hello" ];': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'ArrayPattern',
          elements: [{
            type: 'Identifier',
            name: 'x',
            range: [5, 6],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 6 }
            }
          }],
          range: [4, 22],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 22 }
          },
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'GenericTypeAnnotation',
              id: {
                type: 'Identifier',
                name: 'Array',
                range: [9, 14],
                loc: {
                  start: { line: 1, column: 9 },
                  end: { line: 1, column: 14 }
                }
              },
              typeParameters: {
                type: 'TypeParameterInstantiation',
                params: [{
                  type: 'StringTypeAnnotation',
                  range: [15, 21],
                  loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 21 }
                  }
                }],
                range: [14, 22],
                loc: {
                  start: { line: 1, column: 14 },
                  end: { line: 1, column: 22 }
                }
              },
              range: [9, 22],
              loc: {
                start: { line: 1, column: 9 },
                end: { line: 1, column: 22 }
              }
            },
            range: [7, 22],
            loc: {
              start: { line: 1, column: 7 },
              end: { line: 1, column: 22 }
            }
          }
        },
        init: {
          type: 'ArrayExpression',
          elements: [{
            type: 'Literal',
            value: 'hello',
            raw: '"hello"',
            range: [27, 34],
            loc: {
              start: { line: 1, column: 27 },
              end: { line: 1, column: 34 }
            }
          }],
          range: [25, 36],
          loc: {
            start: { line: 1, column: 25 },
            end: { line: 1, column: 36 }
          }
        },
        range: [4, 36],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 36 }
        }
      }],
      kind: 'var',
      range: [0, 37],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 37 }
      }
    },
    'function foo({x}: { x: string; }) {}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
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
        range: [13, 32],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 32 }
        },
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'ObjectTypeAnnotation',
            properties: [{
              type: 'ObjectTypeProperty',
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
                type: 'StringTypeAnnotation',
                range: [23, 29],
                loc: {
                  start: { line: 1, column: 23 },
                  end: { line: 1, column: 29 }
                }
              },
              optional: false,
              range: [20, 29],
              loc: {
                start: { line: 1, column: 20 },
                end: { line: 1, column: 29 }
              }
            }],
            indexers: [],
            callProperties: [],
            range: [18, 32],
            loc: {
              start: { line: 1, column: 18 },
              end: { line: 1, column: 32 }
            }
          },
          range: [16, 32],
          loc: {
            start: { line: 1, column: 16 },
            end: { line: 1, column: 32 }
          }
        }
      }],  
      body: {
        type: 'BlockStatement',
        body: [],
        range: [34, 36],
        loc: {
          start: { line: 1, column: 34 },
          end: { line: 1, column: 36 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 36],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 36 }
      }
    },
    'function foo([x]: Array<string>) {}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
      params: [{
        type: 'ArrayPattern',
        elements: [{
          type: 'Identifier',
          name: 'x',
          range: [14, 15],
          loc: {
            start: { line: 1, column: 14 },
            end: { line: 1, column: 15 }
          }
        }],
        range: [13, 31],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 31 }
        },
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'GenericTypeAnnotation',
            id: {
              type: 'Identifier',
              name: 'Array',
              range: [18, 23],
              loc: {
                start: { line: 1, column: 18 },
                end: { line: 1, column: 23 }
              }
            },
            typeParameters: {
              type: 'TypeParameterInstantiation',
              params: [{
                type: 'StringTypeAnnotation',
                range: [24, 30],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 30 }
                }
              }],
              range: [23, 31],
              loc: {
                start: { line: 1, column: 23 },
                end: { line: 1, column: 31 }
              }
            },
            range: [18, 31],
            loc: {
              start: { line: 1, column: 18 },
              end: { line: 1, column: 31 }
            }
          },
          range: [16, 31],
          loc: {
            start: { line: 1, column: 16 },
            end: { line: 1, column: 31 }
          }
        }
      }],  
      body: {
        type: 'BlockStatement',
        body: [],
        range: [33, 35],
        loc: {
          start: { line: 1, column: 33 },
          end: { line: 1, column: 35 }
        }
      },  
      generator: false,
      expression: false,
      range: [0, 35],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 35 }
      }
    },
    "function foo(...rest: Array<number>) {}": {
      type: "FunctionDeclaration",
      start: 0,
      end: 39,
      id: {
        type: "Identifier",
        start: 9,
        end: 12,
        name: "foo"
      },
      generator: false,
      expression: false,
      params: [{
        type: "RestElement",
        start: 13,
        end: 35,
        argument: {
          type: "Identifier",
          start: 16,
          end: 20,
          name: "rest"
        },
        typeAnnotation: {
          type: "TypeAnnotation",
          start: 20,
          end: 35,
          typeAnnotation: {
            type: "GenericTypeAnnotation",
            start: 22,
            end: 35,
            typeParameters: {
              type: "TypeParameterInstantiation",
              start: 27,
              end: 35,
              params: [
                {
                  type: "NumberTypeAnnotation",
                  start: 28,
                  end: 34
                }
              ]
            },
            id: {
              type: "Identifier",
              start: 22,
              end: 27,
              name: "Array"
            }
          }
        }
      }],
      body: {
        type: "BlockStatement",
        start: 37,
        end: 39,
        body: []
      }
    },
    "(function (...rest: Array<number>) {})": {
      type: "ExpressionStatement",
      start: 0,
      end: 38,
      expression: {
        type: "FunctionExpression",
        start: 1,
        end: 37,
        id: null,
        generator: false,
        expression: false,
        params: [{
          type: "RestElement",
          start: 11,
          end: 33,
          argument: {
            type: "Identifier",
            start: 14,
            end: 18,
            name: "rest"
          },
          typeAnnotation: {
            type: "TypeAnnotation",
            start: 18,
            end: 33,
            typeAnnotation: {
              type: "GenericTypeAnnotation",
              start: 20,
              end: 33,
              typeParameters: {
                type: "TypeParameterInstantiation",
                start: 25,
                end: 33,
                params: [
                  {
                    type: "NumberTypeAnnotation",
                    start: 26,
                    end: 32
                  }
                ]
              },
              id: {
                type: "Identifier",
                start: 20,
                end: 25,
                name: "Array"
              }
            }
          }
        }],
        body: {
          type: "BlockStatement",
          start: 35,
          end: 37,
          body: []
        }
      }
    },
    "((...rest: Array<number>) => rest)": {
      type: "ExpressionStatement",
      start: 0,
      end: 34,
      expression: {
        type: "ArrowFunctionExpression",
        start: 1,
        end: 33,
        id: null,
        generator: false,
        expression: true,
        params: [{
          type: "RestElement",
          start: 2,
          end: 9,
          argument: {
            type: "Identifier",
            start: 5,
            end: 9,
            name: "rest"
          },
          returnType: {
            type: "TypeAnnotation",
            start: 9,
            end: 24,
            typeAnnotation: {
              type: "GenericTypeAnnotation",
              start: 11,
              end: 24,
              typeParameters: {
                type: "TypeParameterInstantiation",
                start: 16,
                end: 24,
                params: [
                  {
                    type: "NumberTypeAnnotation",
                    start: 17,
                    end: 23
                  }
                ]
              },
              id: {
                type: "Identifier",
                start: 11,
                end: 16,
                name: "Array"
              }
            }
          }
        }],
        body: {
          type: "Identifier",
          start: 29,
          end: 33,
          name: "rest"
        }
      }
    },
    'var a: Map<string, Array<string> >': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'GenericTypeAnnotation',
              id: {
                type: 'Identifier',
                name: 'Map',
                range: [7, 10],
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 10 }
                }
              },
              typeParameters: {
                type: 'TypeParameterInstantiation',
                params: [{
                  type: 'StringTypeAnnotation',
                  range: [11, 17],
                  loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 17 }
                  }
                }, {
                  type: 'GenericTypeAnnotation',
                  id: {
                    type: 'Identifier',
                    name: 'Array',
                    range: [19, 24],
                    loc: {
                      start: { line: 1, column: 19 },
                      end: { line: 1, column: 24 }
                    }
                  },
                  typeParameters: {
                    type: 'TypeParameterInstantiation',
                    params: [{
                      type: 'StringTypeAnnotation',
                      range: [25, 31],
                      loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 31 }
                      }
                    }],
                    range: [24, 32],
                    loc: {
                      start: { line: 1, column: 24 },
                      end: { line: 1, column: 32 }
                    }
                  },
                  range: [19, 32],
                  loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 32 }
                  }
                }],
                range: [10, 34],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 34 }
                }
              },
              range: [7, 34],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 34 }
              }
            },
            range: [5, 34],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 34 }
            }
          },
          range: [4, 34],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 34 }
          }
        },
        init: null,
        range: [4, 34],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 34 }
        }
      }],
      kind: 'var',
      range: [0, 34],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 34 }
      }
    },
    'var a: Map<string, Array<string>>': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'GenericTypeAnnotation',
              id: {
                type: 'Identifier',
                name: 'Map',
                range: [7, 10],
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 10 }
                }
              },
              typeParameters: {
                type: 'TypeParameterInstantiation',
                params: [{
                  type: 'StringTypeAnnotation',
                  range: [11, 17],
                  loc: {
                    start: { line: 1, column: 11 },
                    end: { line: 1, column: 17 }
                  }
                }, {
                  type: 'GenericTypeAnnotation',
                  id: {
                    type: 'Identifier',
                    name: 'Array',
                    range: [19, 24],
                    loc: {
                      start: { line: 1, column: 19 },
                      end: { line: 1, column: 24 }
                    }
                  },
                  typeParameters: {
                    type: 'TypeParameterInstantiation',
                    params: [{
                      type: 'StringTypeAnnotation',
                      range: [25, 31],
                      loc: {
                        start: { line: 1, column: 25 },
                        end: { line: 1, column: 31 }
                      }
                    }],
                    range: [24, 32],
                    loc: {
                      start: { line: 1, column: 24 },
                      end: { line: 1, column: 32 }
                    }
                  },
                  range: [19, 32],
                  loc: {
                    start: { line: 1, column: 19 },
                    end: { line: 1, column: 32 }
                  }
                }],
                range: [10, 33],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 33 }
                }
              },
              range: [7, 33],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 33 }
              }
            },
            range: [5, 33],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 33 }
            }
          },
          range: [4, 33],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 33 }
          }
        },
        init: null,
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
    'var a: number[]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ArrayTypeAnnotation',
              elementType: {
                type: 'NumberTypeAnnotation',
                range: [7, 13],
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 13 }
                }
              },
              range: [7, 15],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 15 }
              }
            },
            range: [5, 15],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 15 }
            }
          },
          range: [4, 15],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 15 }
          }
        },
        init: null,
        range: [4, 15],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 15 }
        }
      }],
      kind: 'var',
      range: [0, 15],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 15 }
      }
    },
    'var a: ?string[]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NullableTypeAnnotation',
              typeAnnotation: {
                type: 'ArrayTypeAnnotation',
                elementType: {
                  type: 'StringTypeAnnotation',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                range: [8, 16],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 16 }
                }
              },
              range: [7, 16],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 16 }
              }
            },
            range: [5, 16],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 16 }
            }
          },
          range: [4, 16],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 16 }
          }
        },
        init: null,
        range: [4, 16],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 16 }
        }
      }],
      kind: 'var',
      range: [0, 16],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 16 }
      }
    },
    'var a: Promise<bool>[]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ArrayTypeAnnotation',
              elementType: {
                type: 'GenericTypeAnnotation',
                id: {
                  type: 'Identifier',
                  name: 'Promise',
                  range: [7, 14],
                  loc: {
                    start: { line: 1, column: 7 },
                    end: { line: 1, column: 14 }
                  }
                },
                typeParameters: {
                  type: 'TypeParameterInstantiation',
                  params: [{
                    type: 'BooleanTypeAnnotation',
                    range: [15, 19],
                    loc: {
                      start: { line: 1, column: 15 },
                      end: { line: 1, column: 19 }
                    }
                  }],
                  range: [14, 20],
                  loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 20 }
                  }
                },
                range: [7, 20],
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 20 }
                }
              },
              range: [7, 22],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 22 }
              }
            },
            range: [5, 22],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 22 }
            }
          },
          range: [4, 22],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 22 }
          }
        },
        init: null,
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
    'var a:(...rest:Array<number>) => number': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'FunctionTypeAnnotation',
              params: [],
              returnType: {
                type: 'NumberTypeAnnotation',
                range: [33, 39],
                loc: {
                  start: { line: 1, column: 33 },
                  end: { line: 1, column: 39 }
                }
              },
              rest: {
                type: 'FunctionTypeParam',
                name: {
                  type: 'Identifier',
                  name: 'rest',
                  range: [10, 14],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 14 }
                  }
                },
                typeAnnotation: {
                  type: 'GenericTypeAnnotation',
                  id: {
                    type: 'Identifier',
                    name: 'Array',
                    range: [15, 20],
                    loc: {
                      start: { line: 1, column: 15 },
                      end: { line: 1, column: 20 }
                    }
                  },
                  typeParameters: {
                    type: 'TypeParameterInstantiation',
                    params: [{
                      type: 'NumberTypeAnnotation',
                      range: [21, 27],
                      loc: {
                        start: { line: 1, column: 21 },
                        end: { line: 1, column: 27 }
                      }
                    }],
                    range: [20, 28],
                    loc: {
                      start: { line: 1, column: 20 },
                      end: { line: 1, column: 28 }
                    }
                  },
                  range: [15, 28],
                  loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 28 }
                  }
                },
                optional: false,
                range: [10, 28],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 28 }
                }
              },
              typeParameters: null,
              range: [6, 39],
              loc: {
                start: { line: 1, column: 6 },
                end: { line: 1, column: 39 }
              }
            },
            range: [5, 39],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 39 }
            }
          },
          range: [4, 39],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 39 }
          }
        },
        init: null,
        range: [4, 39],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 39 }
        }
      }],
      kind: 'var',
      range: [0, 39],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 39 }
      }
    },
    'var identity: <T>(x: T) => T': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'identity',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'FunctionTypeAnnotation',
              params: [{
                type: 'FunctionTypeParam',
                name: {
                  type: 'Identifier',
                  name: 'x',
                  range: [18, 19],
                  loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 19 }
                  }
                },
                typeAnnotation: {
                  type: 'GenericTypeAnnotation',
                  id: {
                    type: 'Identifier',
                    name: 'T',
                    range: [21, 22],
                    loc: {
                      start: { line: 1, column: 21 },
                      end: { line: 1, column: 22 }
                    }
                  },
                  typeParameters: null,
                  range: [21, 22],
                  loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 22 }
                  }
                },
                optional: false,
                range: [18, 22],
                loc: {
                  start: { line: 1, column: 18 },
                  end: { line: 1, column: 22 }
                }
              }],
              returnType: {
                type: 'GenericTypeAnnotation',
                id: {
                  type: 'Identifier',
                  name: 'T',
                  range: [27, 28],
                  loc: {
                    start: { line: 1, column: 27 },
                    end: { line: 1, column: 28 }
                  }
                },
                typeParameters: null,
                range: [27, 28],
                loc: {
                  start: { line: 1, column: 27 },
                  end: { line: 1, column: 28 }
                }
              },  
              typeParameters: {
                type: 'TypeParameterDeclaration',
                params: [{
                  type: 'Identifier',
                  name: 'T',
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
              },
              range: [14, 28],
              loc: {
                start: { line: 1, column: 14 },
                end: { line: 1, column: 28 }
              }
            },
            range: [12, 28],
            loc: {
              start: { line: 1, column: 12 },
              end: { line: 1, column: 28 }
            }
          },
          range: [4, 28],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 28 }
          }
        },
        init: null,
        range: [4, 28],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 28 }
        }
      }],
      kind: 'var',
      range: [0, 28],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 28 }
      }
    },
    'var identity: <T>(x: T, ...y:T[]) => T': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'identity',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'FunctionTypeAnnotation',
              params: [{
                type: 'FunctionTypeParam',
                name: {
                  type: 'Identifier',
                  name: 'x',
                  range: [18, 19],
                  loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 19 }
                  }
                },
                typeAnnotation: {
                  type: 'GenericTypeAnnotation',
                  id: {
                    type: 'Identifier',
                    name: 'T',
                    range: [21, 22],
                    loc: {
                      start: { line: 1, column: 21 },
                      end: { line: 1, column: 22 }
                    }
                  },
                  typeParameters: null,
                  range: [21, 22],
                  loc: {
                    start: { line: 1, column: 21 },
                    end: { line: 1, column: 22 }
                  }
                },
                optional: false,
                range: [18, 22],
                loc: {
                  start: { line: 1, column: 18 },
                  end: { line: 1, column: 22 }
                }
              }],
              returnType: {
                type: 'GenericTypeAnnotation',
                id: {
                  type: 'Identifier',
                  name: 'T',
                  range: [37, 38],
                  loc: {
                    start: { line: 1, column: 37 },
                    end: { line: 1, column: 38 }
                  }
                },
                typeParameters: null,
                range: [37, 38],
                loc: {
                  start: { line: 1, column: 37 },
                  end: { line: 1, column: 38 }
                }
              },
              rest: {
                type: 'FunctionTypeParam',
                name: {
                  type: 'Identifier',
                  name: 'y',
                  range: [27, 28],
                  loc: {
                    start: { line: 1, column: 27 },
                    end: { line: 1, column: 28 }
                  }
                },
                typeAnnotation: {
                  type: 'ArrayTypeAnnotation',
                  elementType: {
                    type: 'GenericTypeAnnotation',
                    id: {
                      type: 'Identifier',
                      name: 'T',
                      range: [29, 30],
                      loc: {
                        start: { line: 1, column: 29 },
                        end: { line: 1, column: 30 }
                      }
                    },
                    typeParameters: null,
                    range: [29, 30],
                    loc: {
                      start: { line: 1, column: 29 },
                      end: { line: 1, column: 30 }
                    }
                  },
                  range: [29, 32],
                  loc: {
                    start: { line: 1, column: 29 },
                    end: { line: 1, column: 32 }
                  }
                },
                optional: false,
                range: [27, 32],
                loc: {
                  start: { line: 1, column: 27 },
                  end: { line: 1, column: 32 }
                }
              },
              typeParameters: {
                type: 'TypeParameterDeclaration',
                params: [{
                  type: 'Identifier',
                  name: 'T',
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
              },
              range: [14, 38],
              loc: {
                start: { line: 1, column: 14 },
                end: { line: 1, column: 38 }
              }
            },
            range: [12, 38],
            loc: {
              start: { line: 1, column: 12 },
              end: { line: 1, column: 38 }
            }
          },
          range: [4, 38],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 38 }
          }
        },
        init: null,
        range: [4, 38],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 38 }
        }
      }],
      kind: 'var',
      range: [0, 38],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 38 }
      }
    },
    'import type foo from "bar";': {
      type: 'ImportDeclaration',
      specifiers: [{
        type: 'ImportSpecifier',
        id: {
          type: 'Identifier',
          name: 'foo',
          range: [12, 15],
          loc: {
            start: { line: 1, column: 12 },
            end: { line: 1, column: 15 }
          }
        },
        range: [12, 15],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 15 }
        }
      }],
      source: {
        type: 'Literal',
        value: 'bar',
        raw: '"bar"',
        range: [21, 26],
        loc: {
          start: { line: 1, column: 21 },
          end: { line: 1, column: 26 }
        }
      },
      isType: true,
      range: [0, 27],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 27 }
      }
    },
    'import type {foo, bar} from "baz";': {
      type: 'ImportDeclaration',
      specifiers: [{
        type: 'ImportSpecifier',
        id: {
          type: 'Identifier',
          name: 'foo',
          range: [13, 16],
          loc: {
            start: { line: 1, column: 13 },
            end: { line: 1, column: 16 }
          }
        },
        name: null,
        range: [13, 16],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 16 }
        }
      }, {
        type: 'ImportSpecifier',
        id: {
          type: 'Identifier',
          name: 'bar',
          range: [18, 21],
          loc: {
            start: { line: 1, column: 18 },
            end: { line: 1, column: 21 }
          }
        },
        name: null,
        range: [18, 21],
        loc: {
          start: { line: 1, column: 18 },
          end: { line: 1, column: 21 }
        }
      }],
      source: {
        type: 'Literal',
        value: 'baz',
        raw: '"baz"',
        range: [28, 33],
        loc: {
          start: { line: 1, column: 28 },
          end: { line: 1, column: 33 }
        }
      },
      isType: true,
      range: [0, 34],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 34 }
      }
    },
    'import type {foo as bar} from "baz";': {
      type: 'ImportDeclaration',
      specifiers: [{
        type: 'ImportSpecifier',
        id: {
          type: 'Identifier',
          name: 'foo',
          range: [13, 16],
          loc: {
            start: { line: 1, column: 13 },
            end: { line: 1, column: 16 }
          }
        },
        name: {
          type: 'Identifier',
          name: 'bar',
          range: [20, 23],
          loc: {
            start: { line: 1, column: 20 },
            end: { line: 1, column: 23 }
          }
        },
        range: [13, 23],
        loc: {
          start: { line: 1, column: 13 },
          end: { line: 1, column: 23 }
        }
      }],
      source: {
        type: 'Literal',
        value: 'baz',
        raw: '"baz"',
        range: [30, 35],
        loc: {
          start: { line: 1, column: 30 },
          end: { line: 1, column: 35 }
        }
      },
      isType: true,
      range: [0, 36],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 36 }
      }
    },
    'import type from "foo";': {
      type: 'ImportDeclaration',
      specifiers: [{
        type: 'ImportSpecifier',
        id: {
          type: 'Identifier',
          name: 'type',
          range: [7, 11],
          loc: {
            start: { line: 1, column: 7 },
            end: { line: 1, column: 11 }
          }
        },
        range: [7, 11],
        loc: {
          start: { line: 1, column: 7 },
          end: { line: 1, column: 11 }
        }
      }],
      source: {
        type: 'Literal',
        value: 'foo',
        raw: '"foo"',
        range: [17, 22],
        loc: {
          start: { line: 1, column: 17 },
          end: { line: 1, column: 22 }
        }
      },
      isType: false,
      range: [0, 23],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 23 }
      }
    },
    'import type, {foo} from "bar";': {
      type: 'ImportDeclaration',
      specifiers: [{
        type: 'ImportSpecifier',
        id: {
          type: 'Identifier',
          name: 'type',
          range: [7, 11],
          loc: {
            start: { line: 1, column: 7 },
            end: { line: 1, column: 11 }
          }
        },
        range: [7, 11],
        loc: {
          start: { line: 1, column: 7 },
          end: { line: 1, column: 11 }
        }
      }, {
        type: 'ImportSpecifier',
        id: {
          type: 'Identifier',
          name: 'foo',
          range: [14, 17],
          loc: {
            start: { line: 1, column: 14 },
            end: { line: 1, column: 17 }
          }
        },
        name: null,
        range: [14, 17],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 17 }
        }
      }],
      source: {
        type: 'Literal',
        value: 'bar',
        raw: '"bar"',
        range: [24, 29],
        loc: {
          start: { line: 1, column: 24 },
          end: { line: 1, column: 29 }
        }
      },
      isType: false,
      range: [0, 30],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 30 }
      }
    },
    'import type * as namespace from "bar";': {
      type: 'ImportDeclaration',
      specifiers: [{
        type: 'ImportBatchSpecifier',
        name: {
          type: 'Identifier',
          name: 'namespace',
          range: [17, 26],
          loc: {
            start: { line: 1, column: 17 },
            end: { line: 1, column: 26 }
          }
        },
        range: [12, 26],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 26 }
        }
      }],
      source: {
        type: 'Literal',
        value: 'bar',
        raw: '"bar"',
        range: [32, 37],
        loc: {
          start: { line: 1, column: 32 },
          end: { line: 1, column: 37 }
        }
      },
      isType: true,
      range: [0, 38],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 38 }
      }
    },
  },
  'Array Types': {
    'var a: number[]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ArrayTypeAnnotation',
              elementType: {
                type: 'NumberTypeAnnotation',
                range: [7, 13],
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 13 }
                }
              },
              range: [7, 15],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 15 }
              }
            },
            range: [5, 15],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 15 }
            }
          },
          range: [4, 15],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 15 }
          }
        },
        init: null,
        range: [4, 15],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 15 }
        }
      }],
      kind: 'var',
      range: [0, 15],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 15 }
      }
    },
    'var a: ?number[]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NullableTypeAnnotation',
              typeAnnotation: {
                type: 'ArrayTypeAnnotation',
                elementType: {
                  type: 'NumberTypeAnnotation',
                  range: [8, 14],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 14 }
                  }
                },
                range: [8, 16],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 16 }
                }
              },
              range: [7, 16],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 16 }
              }
            },
            range: [5, 16],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 16 }
            }
          },
          range: [4, 16],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 16 }
          }
        },
        init: null,
        range: [4, 16],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 16 }
        }
      }],
      kind: 'var',
      range: [0, 16],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 16 }
      }
    },
    'var a: (?number)[]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ArrayTypeAnnotation',
              elementType: {
                type: 'NullableTypeAnnotation',
                typeAnnotation: {
                  type: 'NumberTypeAnnotation',
                  range: [9, 15],
                  loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 15 }
                  }
                },
                range: [8, 15],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 15 }
                }
              },
              range: [7, 18],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 18 }
              }
            },
            range: [5, 18],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 18 }
            }
          },
          range: [4, 18],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 18 }
          }
        },
        init: null,
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
    'var a: () => number[]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'FunctionTypeAnnotation',
              params: [],
              returnType: {
                type: 'ArrayTypeAnnotation',
                elementType: {
                  type: 'NumberTypeAnnotation',
                  range: [13, 19],
                  loc: {
                    start: { line: 1, column: 13 },
                    end: { line: 1, column: 19 }
                  }
                },
                range: [13, 21],
                loc: {
                  start: { line: 1, column: 13 },
                  end: { line: 1, column: 21 }
                }
              },  
              typeParameters: null,
              range: [7, 21],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 21 }
              }
            },
            range: [5, 21],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 21 }
            }
          },
          range: [4, 21],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 21 }
          }
        },
        init: null,
        range: [4, 21],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 21 }
        }
      }],
      kind: 'var',
      range: [0, 21],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 21 }
      }
    },
    'var a: (() => number)[]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ArrayTypeAnnotation',
              elementType: {
                type: 'FunctionTypeAnnotation',
                params: [],
                returnType: {
                  type: 'NumberTypeAnnotation',
                  range: [14, 20],
                  loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 20 }
                  }
                },  
                typeParameters: null,
                range: [8, 20],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 20 }
                }
              },
              range: [7, 23],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 23 }
              }
            },
            range: [5, 23],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 23 }
            }
          },
          range: [4, 23],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 23 }
          }
        },
        init: null,
        range: [4, 23],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 23 }
        }
      }],
      kind: 'var',
      range: [0, 23],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 23 }
      }
    },
    'var a: typeof A[]': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ArrayTypeAnnotation',
              elementType: {
                type: 'TypeofTypeAnnotation',
                argument: {
                  type: 'GenericTypeAnnotation',
                  id: {
                    type: 'Identifier',
                    name: 'A',
                    range: [14, 15],
                    loc: {
                      start: { line: 1, column: 14 },
                      end: { line: 1, column: 15 }
                    }
                  },
                  typeParameters: null,
                  range: [14, 15],
                  loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 15 }
                  }
                },
                range: [7, 15],
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 15 }
                }
              },
              range: [7, 17],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 17 }
              }
            },
            range: [5, 17],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 17 }
            }
          },
          range: [4, 17],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 17 }
          }
        },
        init: null,
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
  },
  'Tuples': {
    'var a : [] = [];': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'TupleTypeAnnotation',
              types: [],
              range: [8, 10],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 10 }
              }
            },
            range: [6, 10],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 10 }
            }
          },
          range: [4, 10],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 10 }
          }
        },
        init: {
          type: 'ArrayExpression',
          elements: [],
          range: [13, 15],
          loc: {
            start: { line: 1, column: 13 },
            end: { line: 1, column: 15 }
          }
        },
        range: [4, 15],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 15 }
        }
      }],
      kind: 'var',
      range: [0, 16],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 16 }
      }
    },
    'var a : [Foo<T>] = [foo];': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'TupleTypeAnnotation',
              types: [{
                type: 'GenericTypeAnnotation',
                id: {
                  type: 'Identifier',
                  name: 'Foo',
                  range: [9, 12],
                  loc: {
                    start: { line: 1, column: 9 },
                    end: { line: 1, column: 12 }
                  }
                },
                typeParameters: {
                  type: 'TypeParameterInstantiation',
                  params: [{
                    type: 'GenericTypeAnnotation',
                    id: {
                      type: 'Identifier',
                      name: 'T',
                      range: [13, 14],
                      loc: {
                        start: { line: 1, column: 13 },
                        end: { line: 1, column: 14 }
                      }
                    },
                    typeParameters: null,
                    range: [13, 14],
                    loc: {
                      start: { line: 1, column: 13 },
                      end: { line: 1, column: 14 }
                    }
                  }],
                  range: [12, 15],
                  loc: {
                    start: { line: 1, column: 12 },
                    end: { line: 1, column: 15 }
                  }
                },
                range: [9, 15],
                loc: {
                  start: { line: 1, column: 9 },
                  end: { line: 1, column: 15 }
                }
              }],
              range: [8, 16],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 16 }
              }
            },
            range: [6, 16],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 16 }
            }
          },
          range: [4, 16],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 16 }
          }
        },
        init: {
          type: 'ArrayExpression',
          elements: [{
            type: 'Identifier',
            name: 'foo',
            range: [20, 23],
            loc: {
              start: { line: 1, column: 20 },
              end: { line: 1, column: 23 }
            }
          }],
          range: [19, 24],
          loc: {
            start: { line: 1, column: 19 },
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
      range: [0, 25],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 25 }
      }
    },
    'var a : [number,] = [123,];': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'TupleTypeAnnotation',
              types: [{
                type: 'NumberTypeAnnotation',
                range: [9, 15],
                loc: {
                  start: { line: 1, column: 9 },
                  end: { line: 1, column: 15 }
                }
              }],
              range: [8, 17],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 17 }
              }
            },
            range: [6, 17],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 17 }
            }
          },
          range: [4, 17],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 17 }
          }
        },
        init: {
          type: 'ArrayExpression',
          elements: [{
            type: 'Literal',
            value: 123,
            raw: '123',
            range: [21, 24],
            loc: {
              start: { line: 1, column: 21 },
              end: { line: 1, column: 24 }
            }
          }],
          range: [20, 26],
          loc: {
            start: { line: 1, column: 20 },
            end: { line: 1, column: 26 }
          }
        },
        range: [4, 26],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 26 }
        }
      }],
      kind: 'var',
      range: [0, 27],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 27 }
      }
    },
    'var a : [number, string] = [123, "duck"];': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'TupleTypeAnnotation',
              types: [{
                type: 'NumberTypeAnnotation',
                range: [9, 15],
                loc: {
                  start: { line: 1, column: 9 },
                  end: { line: 1, column: 15 }
                }
              }, {
                type: 'StringTypeAnnotation',
                range: [17, 23],
                loc: {
                  start: { line: 1, column: 17 },
                  end: { line: 1, column: 23 }
                }
              }],
              range: [8, 24],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 24 }
              }
            },
            range: [6, 24],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 24 }
            }
          },
          range: [4, 24],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 24 }
          }
        },
        init: {
          type: 'ArrayExpression',
          elements: [{
            type: 'Literal',
            value: 123,
            raw: '123',
            range: [28, 31],
            loc: {
              start: { line: 1, column: 28 },
              end: { line: 1, column: 31 }
            }
          }, {
            type: 'Literal',
            value: 'duck',
            raw: '"duck"',
            range: [33, 39],
            loc: {
              start: { line: 1, column: 33 },
              end: { line: 1, column: 39 }
            }
          }],
          range: [27, 40],
          loc: {
            start: { line: 1, column: 27 },
            end: { line: 1, column: 40 }
          }
        },
        range: [4, 40],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 40 }
        }
      }],
      kind: 'var',
      range: [0, 41],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 41 }
      }
    },
  },
  'Type Alias': {
    'type FBID = number;': {
      type: 'TypeAlias',
      id: {
        type: 'Identifier',
        name: 'FBID',
        range: [5, 9],
        loc: {
          start: { line: 1, column: 5 },
          end: { line: 1, column: 9 }
        }
      },
      typeParameters: null,
      right: {
        type: 'NumberTypeAnnotation',
        range: [12, 18],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 18 }
        }
      },
      range: [0, 19],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 19 }
      }
    },
    'type Foo<T> = Bar<T>': {
      type: 'TypeAlias',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [5, 8],
        loc: {
          start: { line: 1, column: 5 },
          end: { line: 1, column: 8 }
        }
      },
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
          range: [9, 10],
          loc: {
            start: { line: 1, column: 9 },
            end: { line: 1, column: 10 }
          }
        }],
        range: [8, 11],
        loc: {
          start: { line: 1, column: 8 },
          end: { line: 1, column: 11 }
        }
      },
      right: {
        type: 'GenericTypeAnnotation',
        id: {
          type: 'Identifier',
          name: 'Bar',
          range: [14, 17],
          loc: {
            start: { line: 1, column: 14 },
            end: { line: 1, column: 17 }
          }
        },
        typeParameters: {
          type: 'TypeParameterInstantiation',
          params: [{
            type: 'GenericTypeAnnotation',
            id: {
              type: 'Identifier',
              name: 'T',
              range: [18, 19],
              loc: {
                start: { line: 1, column: 18 },
                end: { line: 1, column: 19 }
              }
            },
            typeParameters: null,
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
        },
        range: [14, 20],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 20 }
        }
      },
      range: [0, 20],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 20 }
      }
    },
    'export type Foo = number;': {
      type: 'ExportDeclaration',
      'default': false,
      declaration: {
        type: 'TypeAlias',
        id: {
          type: 'Identifier',
          name: 'Foo',
          range: [12, 15],
          loc: {
            start: { line: 1, column: 12 },
            end: { line: 1, column: 15 }
          }
        },
        typeParameters: null,
        right: {
          type: 'NumberTypeAnnotation',
          range: [18, 24],
          loc: {
            start: { line: 1, column: 18 },
            end: { line: 1, column: 24 }
          }
        },
        range: [7, 25],
        loc: {
          start: { line: 1, column: 7 },
          end: { line: 1, column: 25 }
        }
      },
      specifiers: null,
      source: null,
      range: [0, 25],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 25 }
      }
    },
  },
  'Interfaces (module and script)': {
    'interface A {}': {
      type: 'InterfaceDeclaration',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [10, 11],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 11 }
        }
      },
      typeParameters: null,
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [],
        indexers: [],
        callProperties: [],
        range: [12, 14],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 14 }
        }
      },
      'extends': [],
      range: [0, 14],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 14 }
      }
    },
    'interface A extends B {}': {
      type: 'InterfaceDeclaration',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [10, 11],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 11 }
        }
      },
      typeParameters: null,
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [],
        indexers: [],
        callProperties: [],
        range: [22, 24],
        loc: {
          start: { line: 1, column: 22 },
          end: { line: 1, column: 24 }
        }
      },
      'extends': [{
        type: 'InterfaceExtends',
        id: {
          type: 'Identifier',
          name: 'B',
          range: [20, 21],
          loc: {
            start: { line: 1, column: 20 },
            end: { line: 1, column: 21 }
          }
        },
        typeParameters: null,
        range: [20, 21],
        loc: {
          start: { line: 1, column: 20 },
          end: { line: 1, column: 21 }
        }
      }],
      range: [0, 24],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 24 }
      }
    },
    'interface A<T> extends B<T>, C<T> {}': {
      type: 'InterfaceDeclaration',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [10, 11],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 11 }
        }
      },
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
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
      },
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [],
        indexers: [],
        callProperties: [],
        range: [34, 36],
        loc: {
          start: { line: 1, column: 34 },
          end: { line: 1, column: 36 }
        }
      },
      'extends': [{
        type: 'InterfaceExtends',
        id: {
          type: 'Identifier',
          name: 'B',
          range: [23, 24],
          loc: {
            start: { line: 1, column: 23 },
            end: { line: 1, column: 24 }
          }
        },
        typeParameters: {
          type: 'TypeParameterInstantiation',
          params: [{
            type: 'GenericTypeAnnotation',
            id: {
              type: 'Identifier',
              name: 'T',
              range: [25, 26],
              loc: {
                start: { line: 1, column: 25 },
                end: { line: 1, column: 26 }
              }
            },
            typeParameters: null,
            range: [25, 26],
            loc: {
              start: { line: 1, column: 25 },
              end: { line: 1, column: 26 }
            }
          }],
          range: [24, 27],
          loc: {
            start: { line: 1, column: 24 },
            end: { line: 1, column: 27 }
          }
        },
        range: [23, 27],
        loc: {
          start: { line: 1, column: 23 },
          end: { line: 1, column: 27 }
        }
      }, {
        type: 'InterfaceExtends',
        id: {
          type: 'Identifier',
          name: 'C',
          range: [29, 30],
          loc: {
            start: { line: 1, column: 29 },
            end: { line: 1, column: 30 }
          }
        },
        typeParameters: {
          type: 'TypeParameterInstantiation',
          params: [{
            type: 'GenericTypeAnnotation',
            id: {
              type: 'Identifier',
              name: 'T',
              range: [31, 32],
              loc: {
                start: { line: 1, column: 31 },
                end: { line: 1, column: 32 }
              }
            },
            typeParameters: null,
            range: [31, 32],
            loc: {
              start: { line: 1, column: 31 },
              end: { line: 1, column: 32 }
            }
          }],
          range: [30, 33],
          loc: {
            start: { line: 1, column: 30 },
            end: { line: 1, column: 33 }
          }
        },
        range: [29, 33],
        loc: {
          start: { line: 1, column: 29 },
          end: { line: 1, column: 33 }
        }
      }],
      range: [0, 36],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 36 }
      }
    },
    'interface A { foo: () => number; }': {
      type: 'InterfaceDeclaration',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [10, 11],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 11 }
        }
      },
      typeParameters: null,
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [{
          type: 'ObjectTypeProperty',
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
            type: 'FunctionTypeAnnotation',
            params: [],
            returnType: {
              type: 'NumberTypeAnnotation',
              range: [25, 31],
              loc: {
                start: { line: 1, column: 25 },
                end: { line: 1, column: 31 }
              }
            },  
            typeParameters: null,
            range: [19, 31],
            loc: {
              start: { line: 1, column: 19 },
              end: { line: 1, column: 31 }
            }
          },
          optional: false,
          range: [14, 31],
          loc: {
            start: { line: 1, column: 14 },
            end: { line: 1, column: 31 }
          }
        }],
        indexers: [],
        callProperties: [],
        range: [12, 34],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 34 }
        }
      },
      'extends': [],
      range: [0, 34],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 34 }
      }
    },
    'interface Dictionary { [index: string]: string; length: number; }': {
      type: 'InterfaceDeclaration',
      id: {
        type: 'Identifier',
        name: 'Dictionary',
        range: [10, 20],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 20 }
        }
      },
      typeParameters: null,
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [{
          type: 'ObjectTypeProperty',
          key: {
            type: 'Identifier',
            name: 'length',
            range: [48, 54],
            loc: {
              start: { line: 1, column: 48 },
              end: { line: 1, column: 54 }
            }
          },
          value: {
            type: 'NumberTypeAnnotation',
            range: [56, 62],
            loc: {
              start: { line: 1, column: 56 },
              end: { line: 1, column: 62 }
            }
          },
          optional: false,
          range: [48, 62],
          loc: {
            start: { line: 1, column: 48 },
            end: { line: 1, column: 62 }
          }
        }],
        indexers: [{
          type: 'ObjectTypeIndexer',
          id: {
            type: 'Identifier',
            name: 'index',
            range: [24, 29],
            loc: {
              start: { line: 1, column: 24 },
              end: { line: 1, column: 29 }
            }
          },
          key: {
            type: 'StringTypeAnnotation',
            range: [31, 37],
            loc: {
              start: { line: 1, column: 31 },
              end: { line: 1, column: 37 }
            }
          },
          value: {
            type: 'StringTypeAnnotation',
            range: [40, 46],
            loc: {
              start: { line: 1, column: 40 },
              end: { line: 1, column: 46 }
            }
          },
          range: [23, 46],
          loc: {
            start: { line: 1, column: 23 },
            end: { line: 1, column: 46 }
          }
        }],
        callProperties: [],
        range: [21, 65],
        loc: {
          start: { line: 1, column: 21 },
          end: { line: 1, column: 65 }
        }
      },
      'extends': [],
      range: [0, 65],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 65 }
      }
    },
    'class Foo implements Bar {}': {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: null,
      body: {
        type: 'ClassBody',
        body: [],
        range: [25, 27],
        loc: {
          start: { line: 1, column: 25 },
          end: { line: 1, column: 27 }
        }
      },
      'implements': [{
        type: 'ClassImplements',
        id: {
          type: 'Identifier',
          name: 'Bar',
          range: [21, 24],
          loc: {
            start: { line: 1, column: 21 },
            end: { line: 1, column: 24 }
          }
        },
        typeParameters: null,
        range: [21, 24],
        loc: {
          start: { line: 1, column: 21 },
          end: { line: 1, column: 24 }
        }
      }],
      range: [0, 27],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 27 }
      }
    },
    'class Foo extends Bar implements Bat, Man<number> {}': {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: {
        type: 'Identifier',
        name: 'Bar',
        range: [18, 21],
        loc: {
          start: { line: 1, column: 18 },
          end: { line: 1, column: 21 }
        }
      },
      body: {
        type: 'ClassBody',
        body: [],
        range: [50, 52],
        loc: {
          start: { line: 1, column: 50 },
          end: { line: 1, column: 52 }
        }
      },
      'implements': [{
        type: 'ClassImplements',
        id: {
          type: 'Identifier',
          name: 'Bat',
          range: [33, 36],
          loc: {
            start: { line: 1, column: 33 },
            end: { line: 1, column: 36 }
          }
        },
        typeParameters: null,
        range: [33, 36],
        loc: {
          start: { line: 1, column: 33 },
          end: { line: 1, column: 36 }
        }
      }, {
        type: 'ClassImplements',
        id: {
          type: 'Identifier',
          name: 'Man',
          range: [38, 41],
          loc: {
            start: { line: 1, column: 38 },
            end: { line: 1, column: 41 }
          }
        },
        typeParameters: {
          type: 'TypeParameterInstantiation',
          params: [{
            type: 'NumberTypeAnnotation',
            range: [42, 48],
            loc: {
              start: { line: 1, column: 42 },
              end: { line: 1, column: 48 }
            }
          }],
          range: [41, 49],
          loc: {
            start: { line: 1, column: 41 },
            end: { line: 1, column: 49 }
          }
        },
        range: [38, 49],
        loc: {
          start: { line: 1, column: 38 },
          end: { line: 1, column: 49 }
        }
      }],
      range: [0, 52],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 52 }
      }
    },
    'class Foo extends class Bar implements Bat {} {}': {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: {
        type: 'ClassExpression',
        id: {
          type: 'Identifier',
          name: 'Bar',
          range: [24, 27],
          loc: {
            start: { line: 1, column: 24 },
            end: { line: 1, column: 27 }
          }
        },
        superClass: null,
        body: {
          type: 'ClassBody',
          body: [],
          range: [43, 45],
          loc: {
            start: { line: 1, column: 43 },
            end: { line: 1, column: 45 }
          }
        },
        'implements': [{
          type: 'ClassImplements',
          id: {
            type: 'Identifier',
            name: 'Bat',
            range: [39, 42],
            loc: {
              start: { line: 1, column: 39 },
              end: { line: 1, column: 42 }
            }
          },
          typeParameters: null,
          range: [39, 42],
          loc: {
            start: { line: 1, column: 39 },
            end: { line: 1, column: 42 }
          }
        }],
        range: [18, 45],
        loc: {
          start: { line: 1, column: 18 },
          end: { line: 1, column: 45 }
        }
      },
      body: {
        type: 'ClassBody',
        body: [],
        range: [46, 48],
        loc: {
          start: { line: 1, column: 46 },
          end: { line: 1, column: 48 }
        }
      },
      range: [0, 48],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 48 }
      }
    },
    'class Foo extends class Bar implements Bat {} implements Man {}': {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: 'Foo',
        range: [6, 9],
        loc: {
          start: { line: 1, column: 6 },
          end: { line: 1, column: 9 }
        }
      },
      superClass: {
        type: 'ClassExpression',
        id: {
          type: 'Identifier',
          name: 'Bar',
          range: [24, 27],
          loc: {
            start: { line: 1, column: 24 },
            end: { line: 1, column: 27 }
          }
        },
        superClass: null,
        body: {
          type: 'ClassBody',
          body: [],
          range: [43, 45],
          loc: {
            start: { line: 1, column: 43 },
            end: { line: 1, column: 45 }
          }
        },
        'implements': [{
          type: 'ClassImplements',
          id: {
            type: 'Identifier',
            name: 'Bat',
            range: [39, 42],
            loc: {
              start: { line: 1, column: 39 },
              end: { line: 1, column: 42 }
            }
          },
          typeParameters: null,
          range: [39, 42],
          loc: {
            start: { line: 1, column: 39 },
            end: { line: 1, column: 42 }
          }
        }],
        range: [18, 45],
        loc: {
          start: { line: 1, column: 18 },
          end: { line: 1, column: 45 }
        }
      },
      body: {
        type: 'ClassBody',
        body: [],
        range: [61, 63],
        loc: {
          start: { line: 1, column: 61 },
          end: { line: 1, column: 63 }
        }
      },
      'implements': [{
        type: 'ClassImplements',
        id: {
          type: 'Identifier',
          name: 'Man',
          range: [57, 60],
          loc: {
            start: { line: 1, column: 57 },
            end: { line: 1, column: 60 }
          }
        },
        typeParameters: null,
        range: [57, 60],
        loc: {
          start: { line: 1, column: 57 },
          end: { line: 1, column: 60 }
        }
      }],
      range: [0, 63],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 63 }
      }
    },
  },
  'Type Grouping': {
    'var a: (number)': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NumberTypeAnnotation',
              range: [8, 14],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 14 }
              }
            },
            range: [5, 15],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 15 }
            }
          },
          range: [4, 15],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 15 }
          }
        },
        init: null,
        range: [4, 15],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 15 }
        }
      }],
      kind: 'var',
      range: [0, 15],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 15 }
      }
    },
    'var a: (() => number) | () => string': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'UnionTypeAnnotation',
              types: [{
                type: 'FunctionTypeAnnotation',
                params: [],
                returnType: {
                  type: 'NumberTypeAnnotation',
                  range: [14, 20],
                  loc: {
                    start: { line: 1, column: 14 },
                    end: { line: 1, column: 20 }
                  }
                },  
                typeParameters: null,
                range: [8, 20],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 20 }
                }
              }, {
                type: 'FunctionTypeAnnotation',
                params: [],
                returnType: {
                  type: 'StringTypeAnnotation',
                  range: [30, 36],
                  loc: {
                    start: { line: 1, column: 30 },
                    end: { line: 1, column: 36 }
                  }
                },  
                typeParameters: null,
                range: [24, 36],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 36 }
                }
              }],
              range: [7, 36],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 36 }
              }
            },
            range: [5, 36],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 36 }
            }
          },
          range: [4, 36],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 36 }
          }
        },
        init: null,
        range: [4, 36],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 36 }
        }
      }],
      kind: 'var',
      range: [0, 36],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 36 }
      }
    },
    'var a: number & (string | bool)': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'IntersectionTypeAnnotation',
              types: [{
                type: 'NumberTypeAnnotation',
                range: [7, 13],
                loc: {
                  start: { line: 1, column: 7 },
                  end: { line: 1, column: 13 }
                }
              }, {
                type: 'UnionTypeAnnotation',
                types: [{
                  type: 'StringTypeAnnotation',
                  range: [17, 23],
                  loc: {
                    start: { line: 1, column: 17 },
                    end: { line: 1, column: 23 }
                  }
                }, {
                  type: 'BooleanTypeAnnotation',
                  range: [26, 30],
                  loc: {
                    start: { line: 1, column: 26 },
                    end: { line: 1, column: 30 }
                  }
                }],
                range: [17, 30],
                loc: {
                  start: { line: 1, column: 17 },
                  end: { line: 1, column: 30 }
                }
              }],
              range: [7, 31],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 31 }
              }
            },
            range: [5, 31],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 31 }
            }
          },
          range: [4, 31],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 31 }
          }
        },
        init: null,
        range: [4, 31],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 31 }
        }
      }],
      kind: 'var',
      range: [0, 31],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 31 }
      }
    },
    'var a: (typeof A)': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'TypeofTypeAnnotation',
              argument: {
                type: 'GenericTypeAnnotation',
                id: {
                  type: 'Identifier',
                  name: 'A',
                  range: [15, 16],
                  loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 16 }
                  }
                },
                typeParameters: null,
                range: [15, 16],
                loc: {
                  start: { line: 1, column: 15 },
                  end: { line: 1, column: 16 }
                }
              },
              range: [8, 16],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 16 }
              }
            },
            range: [5, 17],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 17 }
            }
          },
          range: [4, 17],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 17 }
          }
        },
        init: null,
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
  },
  'Call Properties': {
    'var a : { (): number }': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [],
              indexers: [],
              callProperties: [{
                type: 'ObjectTypeCallProperty',
                value: {
                  type: 'FunctionTypeAnnotation',
                  params: [],
                  returnType: {
                    type: 'NumberTypeAnnotation',
                    range: [14, 20],
                    loc: {
                      start: { line: 1, column: 14 },
                      end: { line: 1, column: 20 }
                    }
                  },  
                  typeParameters: null,
                  range: [10, 20],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 20 }
                  }
                },
                range: [10, 20],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 20 }
                }
              }],
              range: [8, 22],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 22 }
              }
            },
            range: [6, 22],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 22 }
            }
          },
          range: [4, 22],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 22 }
          }
        },
        init: null,
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
    'var a : { (): number; }': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [],
              indexers: [],
              callProperties: [{
                type: 'ObjectTypeCallProperty',
                value: {
                  type: 'FunctionTypeAnnotation',
                  params: [],
                  returnType: {
                    type: 'NumberTypeAnnotation',
                    range: [14, 20],
                    loc: {
                      start: { line: 1, column: 14 },
                      end: { line: 1, column: 20 }
                    }
                  },  
                  typeParameters: null,
                  range: [10, 20],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 20 }
                  }
                },
                range: [10, 20],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 20 }
                }
              }],
              range: [8, 23],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 23 }
              }
            },
            range: [6, 23],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 23 }
            }
          },
          range: [4, 23],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 23 }
          }
        },
        init: null,
        range: [4, 23],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 23 }
        }
      }],
      kind: 'var',
      range: [0, 23],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 23 }
      }
    },
    'var a : { (): number; y: string; (x: string): string }': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [{
                type: 'ObjectTypeProperty',
                key: {
                  type: 'Identifier',
                  name: 'y',
                  range: [22, 23],
                  loc: {
                    start: { line: 1, column: 22 },
                    end: { line: 1, column: 23 }
                  }
                },
                value: {
                  type: 'StringTypeAnnotation',
                  range: [25, 31],
                  loc: {
                    start: { line: 1, column: 25 },
                    end: { line: 1, column: 31 }
                  }
                },
                optional: false,
                range: [22, 31],
                loc: {
                  start: { line: 1, column: 22 },
                  end: { line: 1, column: 31 }
                }
              }],
              indexers: [],
              callProperties: [{
                type: 'ObjectTypeCallProperty',
                value: {
                  type: 'FunctionTypeAnnotation',
                  params: [],
                  returnType: {
                    type: 'NumberTypeAnnotation',
                    range: [14, 20],
                    loc: {
                      start: { line: 1, column: 14 },
                      end: { line: 1, column: 20 }
                    }
                  },  
                  typeParameters: null,
                  range: [10, 20],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 20 }
                  }
                },
                range: [10, 20],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 20 }
                }
              }, {
                type: 'ObjectTypeCallProperty',
                value: {
                  type: 'FunctionTypeAnnotation',
                  params: [{
                    type: 'FunctionTypeParam',
                    name: {
                      type: 'Identifier',
                      name: 'x',
                      range: [34, 35],
                      loc: {
                        start: { line: 1, column: 34 },
                        end: { line: 1, column: 35 }
                      }
                    },
                    typeAnnotation: {
                      type: 'StringTypeAnnotation',
                      range: [37, 43],
                      loc: {
                        start: { line: 1, column: 37 },
                        end: { line: 1, column: 43 }
                      }
                    },
                    optional: false,
                    range: [34, 43],
                    loc: {
                      start: { line: 1, column: 34 },
                      end: { line: 1, column: 43 }
                    }
                  }],
                  returnType: {
                    type: 'StringTypeAnnotation',
                    range: [46, 52],
                    loc: {
                      start: { line: 1, column: 46 },
                      end: { line: 1, column: 52 }
                    }
                  },  
                  typeParameters: null,
                  range: [33, 52],
                  loc: {
                    start: { line: 1, column: 33 },
                    end: { line: 1, column: 52 }
                  }
                },
                range: [33, 52],
                loc: {
                  start: { line: 1, column: 33 },
                  end: { line: 1, column: 52 }
                }
              }],
              range: [8, 54],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 54 }
              }
            },
            range: [6, 54],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 54 }
            }
          },
          range: [4, 54],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 54 }
          }
        },
        init: null,
        range: [4, 54],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 54 }
        }
      }],
      kind: 'var',
      range: [0, 54],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 54 }
      }
    },
    'var a : { <T>(x: T): number; }': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'ObjectTypeAnnotation',
              properties: [],
              indexers: [],
              callProperties: [{
                type: 'ObjectTypeCallProperty',
                value: {
                  type: 'FunctionTypeAnnotation',
                  params: [{
                    type: 'FunctionTypeParam',
                    name: {
                      type: 'Identifier',
                      name: 'x',
                      range: [14, 15],
                      loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 15 }
                      }
                    },
                    typeAnnotation: {
                      type: 'GenericTypeAnnotation',
                      id: {
                        type: 'Identifier',
                        name: 'T',
                        range: [17, 18],
                        loc: {
                          start: { line: 1, column: 17 },
                          end: { line: 1, column: 18 }
                        }
                      },
                      typeParameters: null,
                      range: [17, 18],
                      loc: {
                        start: { line: 1, column: 17 },
                        end: { line: 1, column: 18 }
                      }
                    },
                    optional: false,
                    range: [14, 18],
                    loc: {
                      start: { line: 1, column: 14 },
                      end: { line: 1, column: 18 }
                    }
                  }],
                  returnType: {
                    type: 'NumberTypeAnnotation',
                    range: [21, 27],
                    loc: {
                      start: { line: 1, column: 21 },
                      end: { line: 1, column: 27 }
                    }
                  },  
                  typeParameters: {
                    type: 'TypeParameterDeclaration',
                    params: [{
                      type: 'Identifier',
                      name: 'T',
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
                  },
                  range: [10, 27],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 27 }
                  }
                },
                range: [10, 27],
                loc: {
                  start: { line: 1, column: 10 },
                  end: { line: 1, column: 27 }
                }
              }],
              range: [8, 30],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 30 }
              }
            },
            range: [6, 30],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 30 }
            }
          },
          range: [4, 30],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 30 }
          }
        },
        init: null,
        range: [4, 30],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 30 }
        }
      }],
      kind: 'var',
      range: [0, 30],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 30 }
      }
    },
    'interface A { (): number; }': {
      type: 'InterfaceDeclaration',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [10, 11],
        loc: {
          start: { line: 1, column: 10 },
          end: { line: 1, column: 11 }
        }
      },
      typeParameters: null,
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [],
        indexers: [],
        callProperties: [{
          type: 'ObjectTypeCallProperty',
          value: {
            type: 'FunctionTypeAnnotation',
            params: [],
            returnType: {
              type: 'NumberTypeAnnotation',
              range: [18, 24],
              loc: {
                start: { line: 1, column: 18 },
                end: { line: 1, column: 24 }
              }
            },  
            typeParameters: null,
            range: [14, 24],
            loc: {
              start: { line: 1, column: 14 },
              end: { line: 1, column: 24 }
            }
          },
          'static': false,
          range: [14, 24],
          loc: {
            start: { line: 1, column: 14 },
            end: { line: 1, column: 24 }
          }
        }],
        range: [12, 27],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 27 }
        }
      },
      'extends': [],
      range: [0, 27],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 27 }
      }
    },
  },
  'String Literal Types': {
    'function createElement(tagName: "div"): HTMLDivElement {}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'createElement',
        range: [9, 22],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 22 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'tagName',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'StringLiteralTypeAnnotation',
            value: 'div',
            raw: '"div"',
            range: [32, 37],
            loc: {
              start: { line: 1, column: 32 },
              end: { line: 1, column: 37 }
            }
          },
          range: [30, 37],
          loc: {
            start: { line: 1, column: 30 },
            end: { line: 1, column: 37 }
          }
        },
        range: [23, 37],
        loc: {
          start: { line: 1, column: 23 },
          end: { line: 1, column: 37 }
        }
      }],  
      body: {
        type: 'BlockStatement',
        body: [],
        range: [55, 57],
        loc: {
          start: { line: 1, column: 55 },
          end: { line: 1, column: 57 }
        }
      },  
      generator: false,
      expression: false,
      returnType: {
        type: 'TypeAnnotation',
        typeAnnotation: {
          type: 'GenericTypeAnnotation',
          id: {
            type: 'Identifier',
            name: 'HTMLDivElement',
            range: [40, 54],
            loc: {
              start: { line: 1, column: 40 },
              end: { line: 1, column: 54 }
            }
          },
          typeParameters: null,
          range: [40, 54],
          loc: {
            start: { line: 1, column: 40 },
            end: { line: 1, column: 54 }
          }
        },
        range: [38, 54],
        loc: {
          start: { line: 1, column: 38 },
          end: { line: 1, column: 54 }
        }
      },
      range: [0, 57],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 57 }
      }
    },
    'function createElement(tagName: \'div\'): HTMLDivElement {}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'createElement',
        range: [9, 22],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 22 }
        }
      },
      params: [{
        type: 'Identifier',
        name: 'tagName',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'StringLiteralTypeAnnotation',
            value: 'div',
            raw: '\'div\'',
            range: [32, 37],
            loc: {
              start: { line: 1, column: 32 },
              end: { line: 1, column: 37 }
            }
          },
          range: [30, 37],
          loc: {
            start: { line: 1, column: 30 },
            end: { line: 1, column: 37 }
          }
        },
        range: [23, 37],
        loc: {
          start: { line: 1, column: 23 },
          end: { line: 1, column: 37 }
        }
      }],  
      body: {
        type: 'BlockStatement',
        body: [],
        range: [55, 57],
        loc: {
          start: { line: 1, column: 55 },
          end: { line: 1, column: 57 }
        }
      },  
      generator: false,
      expression: false,
      returnType: {
        type: 'TypeAnnotation',
        typeAnnotation: {
          type: 'GenericTypeAnnotation',
          id: {
            type: 'Identifier',
            name: 'HTMLDivElement',
            range: [40, 54],
            loc: {
              start: { line: 1, column: 40 },
              end: { line: 1, column: 54 }
            }
          },
          typeParameters: null,
          range: [40, 54],
          loc: {
            start: { line: 1, column: 40 },
            end: { line: 1, column: 54 }
          }
        },
        range: [38, 54],
        loc: {
          start: { line: 1, column: 38 },
          end: { line: 1, column: 54 }
        }
      },
      range: [0, 57],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 57 }
      }
    },
  },
  'Qualified Generic Type': {
    'var a : A.B': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'GenericTypeAnnotation',
              id: {
                type: 'QualifiedTypeIdentifier',
                qualification: {
                  type: 'Identifier',
                  name: 'A',
                  range: [8, 9],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 9 }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'B',
                  range: [10, 11],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 11 }
                  }
                },
                range: [8, 11],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 11 }
                }
              },
              typeParameters: null,
              range: [8, 11],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 11 }
              }
            },
            range: [6, 11],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 11 }
            }
          },
          range: [4, 11],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 11 }
          }
        },
        init: null,
        range: [4, 11],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 11 }
        }
      }],
      kind: 'var',
      range: [0, 11],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 11 }
      }
    },
    'var a : A.B.C': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'GenericTypeAnnotation',
              id: {
                type: 'QualifiedTypeIdentifier',
                qualification: {
                  type: 'QualifiedTypeIdentifier',
                  qualification: {
                    type: 'Identifier',
                    name: 'A',
                    range: [8, 9],
                    loc: {
                      start: { line: 1, column: 8 },
                      end: { line: 1, column: 9 }
                    }
                  },
                  id: {
                    type: 'Identifier',
                    name: 'B',
                    range: [10, 11],
                    loc: {
                      start: { line: 1, column: 10 },
                      end: { line: 1, column: 11 }
                    }
                  },
                  range: [8, 11],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 11 }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'C',
                  range: [12, 13],
                  loc: {
                    start: { line: 1, column: 12 },
                    end: { line: 1, column: 13 }
                  }
                },
                range: [8, 13],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 13 }
                }
              },
              typeParameters: null,
              range: [8, 13],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 13 }
              }
            },
            range: [6, 13],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 13 }
            }
          },
          range: [4, 13],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 13 }
          }
        },
        init: null,
        range: [4, 13],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 13 }
        }
      }],
      kind: 'var',
      range: [0, 13],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 13 }
      }
    },
    'var a : A.B<T>': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'GenericTypeAnnotation',
              id: {
                type: 'QualifiedTypeIdentifier',
                qualification: {
                  type: 'Identifier',
                  name: 'A',
                  range: [8, 9],
                  loc: {
                    start: { line: 1, column: 8 },
                    end: { line: 1, column: 9 }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'B',
                  range: [10, 11],
                  loc: {
                    start: { line: 1, column: 10 },
                    end: { line: 1, column: 11 }
                  }
                },
                range: [8, 11],
                loc: {
                  start: { line: 1, column: 8 },
                  end: { line: 1, column: 11 }
                }
              },
              typeParameters: {
                type: 'TypeParameterInstantiation',
                params: [{
                  type: 'GenericTypeAnnotation',
                  id: {
                    type: 'Identifier',
                    name: 'T',
                    range: [12, 13],
                    loc: {
                      start: { line: 1, column: 12 },
                      end: { line: 1, column: 13 }
                    }
                  },
                  typeParameters: null,
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
              },
              range: [8, 14],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 14 }
              }
            },
            range: [6, 14],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 14 }
            }
          },
          range: [4, 14],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 14 }
          }
        },
        init: null,
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
    'var a : typeof A.B<T>': {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'a',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'TypeofTypeAnnotation',
              argument: {
                type: 'GenericTypeAnnotation',
                id: {
                  type: 'QualifiedTypeIdentifier',
                  qualification: {
                    type: 'Identifier',
                    name: 'A',
                    range: [15, 16],
                    loc: {
                      start: { line: 1, column: 15 },
                      end: { line: 1, column: 16 }
                    }
                  },
                  id: {
                    type: 'Identifier',
                    name: 'B',
                    range: [17, 18],
                    loc: {
                      start: { line: 1, column: 17 },
                      end: { line: 1, column: 18 }
                    }
                  },
                  range: [15, 18],
                  loc: {
                    start: { line: 1, column: 15 },
                    end: { line: 1, column: 18 }
                  }
                },
                typeParameters: {
                  type: 'TypeParameterInstantiation',
                  params: [{
                    type: 'GenericTypeAnnotation',
                    id: {
                      type: 'Identifier',
                      name: 'T',
                      range: [19, 20],
                      loc: {
                        start: { line: 1, column: 19 },
                        end: { line: 1, column: 20 }
                      }
                    },
                    typeParameters: null,
                    range: [19, 20],
                    loc: {
                      start: { line: 1, column: 19 },
                      end: { line: 1, column: 20 }
                    }
                  }],
                  range: [18, 21],
                  loc: {
                    start: { line: 1, column: 18 },
                    end: { line: 1, column: 21 }
                  }
                },
                range: [15, 21],
                loc: {
                  start: { line: 1, column: 15 },
                  end: { line: 1, column: 21 }
                }
              },
              range: [8, 21],
              loc: {
                start: { line: 1, column: 8 },
                end: { line: 1, column: 21 }
              }
            },
            range: [6, 21],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 21 }
            }
          },
          range: [4, 21],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 21 }
          }
        },
        init: null,
        range: [4, 21],
        loc: {
          start: { line: 1, column: 4 },
          end: { line: 1, column: 21 }
        }
      }],
      kind: 'var',
      range: [0, 21],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 21 }
      }
    },
  },
  'Declare Statements': {
    'declare var foo': {
      type: 'DeclareVariable',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [12, 15],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 15 }
        }
      },
      range: [0, 15],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 15 }
      }
    },
    'declare var foo;': {
      type: 'DeclareVariable',
      id: {
        type: 'Identifier',
        name: 'foo',
        range: [12, 15],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 15 }
        }
      },
      range: [0, 16],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 16 }
      }
    },
    'declare function foo(): void': {
      type: 'DeclareFunction',
      id: {
        type: 'Identifier',
        name: 'foo',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [],
            returnType: {
              type: 'VoidTypeAnnotation',
              range: [24, 28],
              loc: {
                start: { line: 1, column: 24 },
                end: { line: 1, column: 28 }
              }
            },  
            typeParameters: null,
            range: [20, 28],
            loc: {
              start: { line: 1, column: 20 },
              end: { line: 1, column: 28 }
            }
          },
          range: [20, 28],
          loc: {
            start: { line: 1, column: 20 },
            end: { line: 1, column: 28 }
          }
        },
        range: [17, 28],
        loc: {
          start: { line: 1, column: 17 },
          end: { line: 1, column: 28 }
        }
      },
      range: [0, 28],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 28 }
      }
    },
    'declare function foo(): void;': {
      type: 'DeclareFunction',
      id: {
        type: 'Identifier',
        name: 'foo',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [],
            returnType: {
              type: 'VoidTypeAnnotation',
              range: [24, 28],
              loc: {
                start: { line: 1, column: 24 },
                end: { line: 1, column: 28 }
              }
            },  
            typeParameters: null,
            range: [20, 28],
            loc: {
              start: { line: 1, column: 20 },
              end: { line: 1, column: 28 }
            }
          },
          range: [20, 28],
          loc: {
            start: { line: 1, column: 20 },
            end: { line: 1, column: 28 }
          }
        },
        range: [17, 28],
        loc: {
          start: { line: 1, column: 17 },
          end: { line: 1, column: 28 }
        }
      },
      range: [0, 29],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 29 }
      }
    },
    'declare function foo<T>(): void;': {
      type: 'DeclareFunction',
      id: {
        type: 'Identifier',
        name: 'foo',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [],
            returnType: {
              type: 'VoidTypeAnnotation',
              range: [27, 31],
              loc: {
                start: { line: 1, column: 27 },
                end: { line: 1, column: 31 }
              }
            },  
            typeParameters: {
              type: 'TypeParameterDeclaration',
              params: [{
                type: 'Identifier',
                name: 'T',
                range: [21, 22],
                loc: {
                  start: { line: 1, column: 21 },
                  end: { line: 1, column: 22 }
                }
              }],
              range: [20, 23],
              loc: {
                start: { line: 1, column: 20 },
                end: { line: 1, column: 23 }
              }
            },
            range: [20, 31],
            loc: {
              start: { line: 1, column: 20 },
              end: { line: 1, column: 31 }
            }
          },
          range: [20, 31],
          loc: {
            start: { line: 1, column: 20 },
            end: { line: 1, column: 31 }
          }
        },
        range: [17, 31],
        loc: {
          start: { line: 1, column: 17 },
          end: { line: 1, column: 31 }
        }
      },
      range: [0, 32],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 32 }
      }
    },
    'declare function foo(x: number, y: string): void;': {
      type: 'DeclareFunction',
      id: {
        type: 'Identifier',
        name: 'foo',
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [{
              type: 'FunctionTypeParam',
              name: {
                type: 'Identifier',
                name: 'x',
                range: [21, 22],
                loc: {
                  start: { line: 1, column: 21 },
                  end: { line: 1, column: 22 }
                }
              },
              typeAnnotation: {
                type: 'NumberTypeAnnotation',
                range: [24, 30],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 30 }
                }
              },
              optional: false,
              range: [21, 30],
              loc: {
                start: { line: 1, column: 21 },
                end: { line: 1, column: 30 }
              }
            }, {
              type: 'FunctionTypeParam',
              name: {
                type: 'Identifier',
                name: 'y',
                range: [32, 33],
                loc: {
                  start: { line: 1, column: 32 },
                  end: { line: 1, column: 33 }
                }
              },
              typeAnnotation: {
                type: 'StringTypeAnnotation',
                range: [35, 41],
                loc: {
                  start: { line: 1, column: 35 },
                  end: { line: 1, column: 41 }
                }
              },
              optional: false,
              range: [32, 41],
              loc: {
                start: { line: 1, column: 32 },
                end: { line: 1, column: 41 }
              }
            }],
            returnType: {
              type: 'VoidTypeAnnotation',
              range: [44, 48],
              loc: {
                start: { line: 1, column: 44 },
                end: { line: 1, column: 48 }
              }
            },  
            typeParameters: null,
            range: [20, 48],
            loc: {
              start: { line: 1, column: 20 },
              end: { line: 1, column: 48 }
            }
          },
          range: [20, 48],
          loc: {
            start: { line: 1, column: 20 },
            end: { line: 1, column: 48 }
          }
        },
        range: [17, 48],
        loc: {
          start: { line: 1, column: 17 },
          end: { line: 1, column: 48 }
        }
      },
      range: [0, 49],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 49 }
      }
    },
    'declare class A {}': {
      type: 'DeclareClass',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [14, 15],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 15 }
        }
      },
      typeParameters: null,
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [],
        indexers: [],
        callProperties: [],
        range: [16, 18],
        loc: {
          start: { line: 1, column: 16 },
          end: { line: 1, column: 18 }
        }
      },
      'extends': [],
      range: [0, 18],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 18 }
      }
    },
    'declare class A<T> extends B<T> { x: number }': {
      type: 'DeclareClass',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [14, 15],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 15 }
        }
      },
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
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
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [{
          type: 'ObjectTypeProperty',
          key: {
            type: 'Identifier',
            name: 'x',
            range: [34, 35],
            loc: {
              start: { line: 1, column: 34 },
              end: { line: 1, column: 35 }
            }
          },
          value: {
            type: 'NumberTypeAnnotation',
            range: [37, 43],
            loc: {
              start: { line: 1, column: 37 },
              end: { line: 1, column: 43 }
            }
          },
          optional: false,
          range: [34, 43],
          loc: {
            start: { line: 1, column: 34 },
            end: { line: 1, column: 43 }
          }
        }],
        indexers: [],
        callProperties: [],
        range: [32, 45],
        loc: {
          start: { line: 1, column: 32 },
          end: { line: 1, column: 45 }
        }
      },
      'extends': [{
        type: 'InterfaceExtends',
        id: {
          type: 'Identifier',
          name: 'B',
          range: [27, 28],
          loc: {
            start: { line: 1, column: 27 },
            end: { line: 1, column: 28 }
          }
        },
        typeParameters: {
          type: 'TypeParameterInstantiation',
          params: [{
            type: 'GenericTypeAnnotation',
            id: {
              type: 'Identifier',
              name: 'T',
              range: [29, 30],
              loc: {
                start: { line: 1, column: 29 },
                end: { line: 1, column: 30 }
              }
            },
            typeParameters: null,
            range: [29, 30],
            loc: {
              start: { line: 1, column: 29 },
              end: { line: 1, column: 30 }
            }
          }],
          range: [28, 31],
          loc: {
            start: { line: 1, column: 28 },
            end: { line: 1, column: 31 }
          }
        },
        range: [27, 31],
        loc: {
          start: { line: 1, column: 27 },
          end: { line: 1, column: 31 }
        }
      }],
      range: [0, 45],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 45 }
      }
    },
    'declare class A { static foo(): number; static x : string }': {
      type: 'DeclareClass',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [14, 15],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 15 }
        }
      },
      typeParameters: null,
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [{
          type: 'ObjectTypeProperty',
          key: {
            type: 'Identifier',
            name: 'foo',
            range: [25, 28],
            loc: {
              start: { line: 1, column: 25 },
              end: { line: 1, column: 28 }
            }
          },
          value: {
            type: 'FunctionTypeAnnotation',
            params: [],
            returnType: {
              type: 'NumberTypeAnnotation',
              range: [32, 38],
              loc: {
                start: { line: 1, column: 32 },
                end: { line: 1, column: 38 }
              }
            },  
            typeParameters: null,
            range: [18, 38],
            loc: {
              start: { line: 1, column: 18 },
              end: { line: 1, column: 38 }
            }
          },
          optional: false,
          'static': true,
          range: [18, 38],
          loc: {
            start: { line: 1, column: 18 },
            end: { line: 1, column: 38 }
          }
        }, {
          type: 'ObjectTypeProperty',
          key: {
            type: 'Identifier',
            name: 'x',
            range: [47, 48],
            loc: {
              start: { line: 1, column: 47 },
              end: { line: 1, column: 48 }
            }
          },
          value: {
            type: 'StringTypeAnnotation',
            range: [51, 57],
            loc: {
              start: { line: 1, column: 51 },
              end: { line: 1, column: 57 }
            }
          },
          optional: false,
          'static': true,
          range: [40, 57],
          loc: {
            start: { line: 1, column: 40 },
            end: { line: 1, column: 57 }
          }
        }],
        indexers: [],
        callProperties: [],
        range: [16, 59],
        loc: {
          start: { line: 1, column: 16 },
          end: { line: 1, column: 59 }
        }
      },
      'extends': [],
      range: [0, 59],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 59 }
      }
    },
    'declare class A { static [ indexer: number]: string }': {
      type: 'DeclareClass',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [14, 15],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 15 }
        }
      },
      typeParameters: null,
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [],
        indexers: [{
          type: 'ObjectTypeIndexer',
          id: {
            type: 'Identifier',
            name: 'indexer',
            range: [27, 34],
            loc: {
              start: { line: 1, column: 27 },
              end: { line: 1, column: 34 }
            }
          },
          key: {
            type: 'NumberTypeAnnotation',
            range: [36, 42],
            loc: {
              start: { line: 1, column: 36 },
              end: { line: 1, column: 42 }
            }
          },
          value: {
            type: 'StringTypeAnnotation',
            range: [45, 51],
            loc: {
              start: { line: 1, column: 45 },
              end: { line: 1, column: 51 }
            }
          },
          'static': true,
          range: [18, 51],
          loc: {
            start: { line: 1, column: 18 },
            end: { line: 1, column: 51 }
          }
        }],
        callProperties: [],
        range: [16, 53],
        loc: {
          start: { line: 1, column: 16 },
          end: { line: 1, column: 53 }
        }
      },
      'extends': [],
      range: [0, 53],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 53 }
      }
    },
    'declare class A { static () : number }': {
      type: 'DeclareClass',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [14, 15],
        loc: {
          start: { line: 1, column: 14 },
          end: { line: 1, column: 15 }
        }
      },
      typeParameters: null,
      body: {
        type: 'ObjectTypeAnnotation',
        properties: [],
        indexers: [],
        callProperties: [{
          type: 'ObjectTypeCallProperty',
          value: {
            type: 'FunctionTypeAnnotation',
            params: [],
            returnType: {
              type: 'NumberTypeAnnotation',
              range: [30, 36],
              loc: {
                start: { line: 1, column: 30 },
                end: { line: 1, column: 36 }
              }
            },  
            typeParameters: null,
            range: [25, 36],
            loc: {
              start: { line: 1, column: 25 },
              end: { line: 1, column: 36 }
            }
          },
          'static': true,
          range: [18, 36],
          loc: {
            start: { line: 1, column: 18 },
            end: { line: 1, column: 36 }
          }
        }],
        range: [16, 38],
        loc: {
          start: { line: 1, column: 16 },
          end: { line: 1, column: 38 }
        }
      },
      'extends': [],
      range: [0, 38],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 38 }
      }
    },
  },
  'Declare Module': {
    'declare module A {}': {
      type: 'DeclareModule',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [15, 16],
        loc: {
          start: { line: 1, column: 15 },
          end: { line: 1, column: 16 }
        }
      },
      body: {
        type: 'BlockStatement',
        body: [],
        range: [17, 19],
        loc: {
          start: { line: 1, column: 17 },
          end: { line: 1, column: 19 }
        }
      },
      range: [0, 19],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 19 }
      }
    },
    'declare module "./a/b.js" {}': {
      type: 'DeclareModule',
      id: {
        type: 'Literal',
        value: './a/b.js',
        raw: '"./a/b.js"',
        range: [15, 25],
        loc: {
          start: { line: 1, column: 15 },
          end: { line: 1, column: 25 }
        }
      },
      body: {
        type: 'BlockStatement',
        body: [],
        range: [26, 28],
        loc: {
          start: { line: 1, column: 26 },
          end: { line: 1, column: 28 }
        }
      },
      range: [0, 28],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 28 }
      }
    },
    'declare module A { declare var x: number; }': {
      type: 'DeclareModule',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [15, 16],
        loc: {
          start: { line: 1, column: 15 },
          end: { line: 1, column: 16 }
        }
      },
      body: {
        type: 'BlockStatement',
        body: [{
          type: 'DeclareVariable',
          id: {
            type: 'Identifier',
            name: 'x',
            typeAnnotation: {
              type: 'TypeAnnotation',
              typeAnnotation: {
                type: 'NumberTypeAnnotation',
                range: [34, 40],
                loc: {
                  start: { line: 1, column: 34 },
                  end: { line: 1, column: 40 }
                }
              },
              range: [32, 40],
              loc: {
                start: { line: 1, column: 32 },
                end: { line: 1, column: 40 }
              }
            },
            range: [31, 40],
            loc: {
              start: { line: 1, column: 31 },
              end: { line: 1, column: 40 }
            }
          },
          range: [19, 41],
          loc: {
            start: { line: 1, column: 19 },
            end: { line: 1, column: 41 }
          }
        }],
        range: [17, 43],
        loc: {
          start: { line: 1, column: 17 },
          end: { line: 1, column: 43 }
        }
      },
      range: [0, 43],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 43 }
      }
    },
    'declare module A { declare function foo(): number; }': {
      type: 'DeclareModule',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [15, 16],
        loc: {
          start: { line: 1, column: 15 },
          end: { line: 1, column: 16 }
        }
      },
      body: {
        type: 'BlockStatement',
        body: [{
          type: 'DeclareFunction',
          id: {
            type: 'Identifier',
            name: 'foo',
            typeAnnotation: {
              type: 'TypeAnnotation',
              typeAnnotation: {
                type: 'FunctionTypeAnnotation',
                params: [],
                returnType: {
                  type: 'NumberTypeAnnotation',
                  range: [43, 49],
                  loc: {
                    start: { line: 1, column: 43 },
                    end: { line: 1, column: 49 }
                  }
                },  
                typeParameters: null,
                range: [39, 49],
                loc: {
                  start: { line: 1, column: 39 },
                  end: { line: 1, column: 49 }
                }
              },
              range: [39, 49],
              loc: {
                start: { line: 1, column: 39 },
                end: { line: 1, column: 49 }
              }
            },
            range: [36, 49],
            loc: {
              start: { line: 1, column: 36 },
              end: { line: 1, column: 49 }
            }
          },
          range: [19, 50],
          loc: {
            start: { line: 1, column: 19 },
            end: { line: 1, column: 50 }
          }
        }],
        range: [17, 52],
        loc: {
          start: { line: 1, column: 17 },
          end: { line: 1, column: 52 }
        }
      },
      range: [0, 52],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 52 }
      }
    },
    'declare module A { declare class B { foo(): number; } }': {
      type: 'DeclareModule',
      id: {
        type: 'Identifier',
        name: 'A',
        range: [15, 16],
        loc: {
          start: { line: 1, column: 15 },
          end: { line: 1, column: 16 }
        }
      },
      body: {
        type: 'BlockStatement',
        body: [{
          type: 'DeclareClass',
          id: {
            type: 'Identifier',
            name: 'B',
            range: [33, 34],
            loc: {
              start: { line: 1, column: 33 },
              end: { line: 1, column: 34 }
            }
          },
          typeParameters: null,
          body: {
            type: 'ObjectTypeAnnotation',
            properties: [{
              type: 'ObjectTypeProperty',
              key: {
                type: 'Identifier',
                name: 'foo',
                range: [37, 40],
                loc: {
                  start: { line: 1, column: 37 },
                  end: { line: 1, column: 40 }
                }
              },
              value: {
                type: 'FunctionTypeAnnotation',
                params: [],
                returnType: {
                  type: 'NumberTypeAnnotation',
                  range: [44, 50],
                  loc: {
                    start: { line: 1, column: 44 },
                    end: { line: 1, column: 50 }
                  }
                },  
                typeParameters: null,
                range: [37, 50],
                loc: {
                  start: { line: 1, column: 37 },
                  end: { line: 1, column: 50 }
                }
              },
              optional: false,
              range: [37, 50],
              loc: {
                start: { line: 1, column: 37 },
                end: { line: 1, column: 50 }
              }
            }],
            indexers: [],
            callProperties: [],
            range: [35, 53],
            loc: {
              start: { line: 1, column: 35 },
              end: { line: 1, column: 53 }
            }
          },
          'extends': [],
          range: [19, 53],
          loc: {
            start: { line: 1, column: 19 },
            end: { line: 1, column: 53 }
          }
        }],
        range: [17, 55],
        loc: {
          start: { line: 1, column: 17 },
          end: { line: 1, column: 55 }
        }
      },
      range: [0, 55],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 55 }
      }
    },
  },
  'Typecasts': {
    '(xxx: number)': {
      type: 'ExpressionStatement',
      expression: {
        type: 'TypeCastExpression',
        expression: {
          type: 'Identifier',
          name: 'xxx',
          range: [1, 4],
          loc: {
            start: { line: 1, column: 1 },
            end: { line: 1, column: 4 }
          }
        },
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'NumberTypeAnnotation',
            range: [6, 12],
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 12 }
            }
          },
          range: [4, 12],
          loc: {
            start: { line: 1, column: 4 },
            end: { line: 1, column: 12 }
          }
        },
        range: [1, 12],
        loc: {
          start: { line: 1, column: 1 },
          end: { line: 1, column: 12 }
        }
      },
      range: [0, 13],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 13 }
      }
    },
    '({xxx: 0, yyy: "hey"}: {xxx: number; yyy: string})': {
      type: 'ExpressionStatement',
      expression: {
        type: 'TypeCastExpression',
        expression: {
          type: 'ObjectExpression',
          properties: [{
            type: 'Property',
            key: {
              type: 'Identifier',
              name: 'xxx',
              range: [2, 5],
              loc: {
                start: { line: 1, column: 2 },
                end: { line: 1, column: 5 }
              }
            },
            value: {
              type: 'Literal',
              value: 0,
              raw: '0',
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
            range: [2, 8],
            loc: {
              start: { line: 1, column: 2 },
              end: { line: 1, column: 8 }
            }
          }, {
            type: 'Property',
            key: {
              type: 'Identifier',
              name: 'yyy',
              range: [10, 13],
              loc: {
                start: { line: 1, column: 10 },
                end: { line: 1, column: 13 }
              }
            },
            value: {
              type: 'Literal',
              value: 'hey',
              raw: '"hey"',
              range: [15, 20],
              loc: {
                start: { line: 1, column: 15 },
                end: { line: 1, column: 20 }
              }
            },
            kind: 'init',
            method: false,
            shorthand: false,
            computed: false,
            range: [10, 20],
            loc: {
              start: { line: 1, column: 10 },
              end: { line: 1, column: 20 }
            }
          }],
          range: [1, 21],
          loc: {
            start: { line: 1, column: 1 },
            end: { line: 1, column: 21 }
          }
        },
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'ObjectTypeAnnotation',
            properties: [{
              type: 'ObjectTypeProperty',
              key: {
                type: 'Identifier',
                name: 'xxx',
                range: [24, 27],
                loc: {
                  start: { line: 1, column: 24 },
                  end: { line: 1, column: 27 }
                }
              },
              value: {
                type: 'NumberTypeAnnotation',
                range: [29, 35],
                loc: {
                  start: { line: 1, column: 29 },
                  end: { line: 1, column: 35 }
                }
              },
              optional: false,
              range: [24, 35],
              loc: {
                start: { line: 1, column: 24 },
                end: { line: 1, column: 35 }
              }
            }, {
              type: 'ObjectTypeProperty',
              key: {
                type: 'Identifier',
                name: 'yyy',
                range: [37, 40],
                loc: {
                  start: { line: 1, column: 37 },
                  end: { line: 1, column: 40 }
                }
              },
              value: {
                type: 'StringTypeAnnotation',
                range: [42, 48],
                loc: {
                  start: { line: 1, column: 42 },
                  end: { line: 1, column: 48 }
                }
              },
              optional: false,
              range: [37, 48],
              loc: {
                start: { line: 1, column: 37 },
                end: { line: 1, column: 48 }
              }
            }],
            indexers: [],
            callProperties: [],
            range: [23, 49],
            loc: {
              start: { line: 1, column: 23 },
              end: { line: 1, column: 49 }
            }
          },
          range: [21, 49],
          loc: {
            start: { line: 1, column: 21 },
            end: { line: 1, column: 49 }
          }
        },
        range: [1, 49],
        loc: {
          start: { line: 1, column: 1 },
          end: { line: 1, column: 49 }
        }
      },
      range: [0, 50],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 50 }
      }
    },
    '((xxx) => xxx + 1: (xxx: number) => number)': {
      type: 'ExpressionStatement',
      expression: {
        type: 'TypeCastExpression',
        expression: {
          type: 'ArrowFunctionExpression',
          id: null,
          params: [{
            type: 'Identifier',
            name: 'xxx',
            range: [2, 5],
            loc: {
              start: { line: 1, column: 2 },
              end: { line: 1, column: 5 }
            }
          }],  
          body: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'Identifier',
              name: 'xxx',
              range: [10, 13],
              loc: {
                start: { line: 1, column: 10 },
                end: { line: 1, column: 13 }
              }
            },
            right: {
              type: 'Literal',
              value: 1,
              raw: '1',
              range: [16, 17],
              loc: {
                start: { line: 1, column: 16 },
                end: { line: 1, column: 17 }
              }
            },
            range: [10, 17],
            loc: {
              start: { line: 1, column: 10 },
              end: { line: 1, column: 17 }
            }
          },  
          generator: false,
          expression: true,
          range: [1, 17],
          loc: {
            start: { line: 1, column: 1 },
            end: { line: 1, column: 17 }
          }
        },
        typeAnnotation: {
          type: 'TypeAnnotation',
          typeAnnotation: {
            type: 'FunctionTypeAnnotation',
            params: [{
              type: 'FunctionTypeParam',
              name: {
                type: 'Identifier',
                name: 'xxx',
                range: [20, 23],
                loc: {
                  start: { line: 1, column: 20 },
                  end: { line: 1, column: 23 }
                }
              },
              typeAnnotation: {
                type: 'NumberTypeAnnotation',
                range: [25, 31],
                loc: {
                  start: { line: 1, column: 25 },
                  end: { line: 1, column: 31 }
                }
              },
              optional: false,
              range: [20, 31],
              loc: {
                start: { line: 1, column: 20 },
                end: { line: 1, column: 31 }
              }
            }],
            returnType: {
              type: 'NumberTypeAnnotation',
              range: [36, 42],
              loc: {
                start: { line: 1, column: 36 },
                end: { line: 1, column: 42 }
              }
            },  
            typeParameters: null,
            range: [19, 42],
            loc: {
              start: { line: 1, column: 19 },
              end: { line: 1, column: 42 }
            }
          },
          range: [17, 42],
          loc: {
            start: { line: 1, column: 17 },
            end: { line: 1, column: 42 }
          }
        },
        range: [1, 42],
        loc: {
          start: { line: 1, column: 1 },
          end: { line: 1, column: 42 }
        }
      },
      range: [0, 43],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 43 }
      }
    },
    '((xxx: number), (yyy: string))': {
      type: 'ExpressionStatement',
      expression: {
        type: 'SequenceExpression',
        expressions: [{
          type: 'TypeCastExpression',
          expression: {
            type: 'Identifier',
            name: 'xxx',
            range: [2, 5],
            loc: {
              start: { line: 1, column: 2 },
              end: { line: 1, column: 5 }
            }
          },
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NumberTypeAnnotation',
              range: [7, 13],
              loc: {
                start: { line: 1, column: 7 },
                end: { line: 1, column: 13 }
              }
            },
            range: [5, 13],
            loc: {
              start: { line: 1, column: 5 },
              end: { line: 1, column: 13 }
            }
          },
          range: [2, 13],
          loc: {
            start: { line: 1, column: 2 },
            end: { line: 1, column: 13 }
          }
        }, {
          type: 'TypeCastExpression',
          expression: {
            type: 'Identifier',
            name: 'yyy',
            range: [17, 20],
            loc: {
              start: { line: 1, column: 17 },
              end: { line: 1, column: 20 }
            }
          },
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'StringTypeAnnotation',
              range: [22, 28],
              loc: {
                start: { line: 1, column: 22 },
                end: { line: 1, column: 28 }
              }
            },
            range: [20, 28],
            loc: {
              start: { line: 1, column: 20 },
              end: { line: 1, column: 28 }
            }
          },
          range: [17, 28],
          loc: {
            start: { line: 1, column: 17 },
            end: { line: 1, column: 28 }
          }
        }],
        range: [1, 29],
        loc: {
          start: { line: 1, column: 1 },
          end: { line: 1, column: 29 }
        }
      },
      range: [0, 30],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 30 }
      }
    },
  },
    'Bounded Polymorphism': {
    'class A<T: Foo> {}': {
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
        body: [],
        range: [16, 18],
        loc: {
          start: { line: 1, column: 16 },
          end: { line: 1, column: 18 }
        }
      },
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'GenericTypeAnnotation',
              id: {
                type: 'Identifier',
                name: 'Foo',
                range: [11, 14],
                loc: {
                  start: { line: 1, column: 11 },
                  end: { line: 1, column: 14 }
                }
              },
              typeParameters: null,
              range: [11, 14],
              loc: {
                start: { line: 1, column: 11 },
                end: { line: 1, column: 14 }
              }
            },
            range: [9, 14],
            loc: {
              start: { line: 1, column: 9 },
              end: { line: 1, column: 14 }
            }
          },
          range: [8, 14],
          loc: {
            start: { line: 1, column: 8 },
            end: { line: 1, column: 14 }
          }
        }],
        range: [7, 15],
        loc: {
          start: { line: 1, column: 7 },
          end: { line: 1, column: 15 }
        }
      },
      range: [0, 18],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 18 }
      }
    },
    'function bar<T: ?number>() {}': {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'bar',
        range: [9, 12],
        loc: {
          start: { line: 1, column: 9 },
          end: { line: 1, column: 12 }
        }
      },
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
      typeParameters: {
        type: 'TypeParameterDeclaration',
        params: [{
          type: 'Identifier',
          name: 'T',
          typeAnnotation: {
            type: 'TypeAnnotation',
            typeAnnotation: {
              type: 'NullableTypeAnnotation',
              typeAnnotation: {
                type: 'NumberTypeAnnotation',
                range: [17, 23],
                loc: {
                  start: { line: 1, column: 17 },
                  end: { line: 1, column: 23 }
                }
              },
              range: [16, 23],
              loc: {
                start: { line: 1, column: 16 },
                end: { line: 1, column: 23 }
              }
            },
            range: [14, 23],
            loc: {
              start: { line: 1, column: 14 },
              end: { line: 1, column: 23 }
            }
          },
          range: [13, 23],
          loc: {
            start: { line: 1, column: 13 },
            end: { line: 1, column: 23 }
          }
        }],
        range: [12, 24],
        loc: {
          start: { line: 1, column: 12 },
          end: { line: 1, column: 24 }
        }
      },
      range: [0, 29],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 29 }
      }
    },
  },
};

if (typeof exports !== "undefined") {
  var test = require("./driver.js").test;
}

for (var ns in fbTestFixture) {
  ns = fbTestFixture[ns];
  for (var code in ns) {
    test(code, {
      type: "Program",
      body: [ns[code]]
    }, {
      ecmaVersion: 7,
      locations: true,
      ranges: true
    });
  }
}
