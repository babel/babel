/* eslint-disable */
var rule = require('../rules/object-shorthand'),
    RuleTester = require('eslint').RuleTester;

var features = {
    objectLiteralShorthandMethods: true,
    objectLiteralComputedProperties: true,
    objectLiteralShorthandProperties: true,
    arrowFunctions: true,
    destructuring: true,
    generators: true
};

function ok(code, args){
  return { code: code, parser: 'babel-eslint', ecmaFeatures: features}
}


var ruleTester = new RuleTester();
ruleTester.run('babel/object-shorthand', rule, {
  valid: [
    //original test cases
    { code: "var x = {y() {}}", ecmaFeatures: features },
    { code: "var x = {y}", ecmaFeatures: features },
    { code: "var x = {a: b}", ecmaFeatures: features },
    { code: "var x = {a: 'a'}", ecmaFeatures: features },
    { code: "var x = {'a': 'a'}", ecmaFeatures: features },
    { code: "var x = {'a': b}", ecmaFeatures: features },
    { code: "var x = {y(x) {}}", ecmaFeatures: features },
    { code: "var {x,y,z} = x", ecmaFeatures: features },
    { code: "var {x: {y}} = z", ecmaFeatures: features },
    { code: "var x = {*x() {}}", ecmaFeatures: features },
    { code: "var x = {x: y}", ecmaFeatures: features },
    { code: "var x = {x: y, y: z}", ecmaFeatures: features},
    { code: "var x = {x: y, y: z, z: 'z'}", ecmaFeatures: features},
    { code: "var x = {x() {}, y: z, l(){}}", ecmaFeatures: features},
    { code: "var x = {x: y, y: z, a: b}", ecmaFeatures: features},
    { code: "var x = {x: y, y: z, 'a': b}", ecmaFeatures: features},
    { code: "var x = {x: y, y() {}, z: a}", ecmaFeatures: features},
    { code: "doSomething({x: y})", ecmaFeatures: features},
    { code: "doSomething({'x': y})", ecmaFeatures: features},
    { code: "doSomething({x: 'x'})", ecmaFeatures: features},
    { code: "doSomething({'x': 'x'})", ecmaFeatures: features},
    { code: "doSomething({y() {}})", ecmaFeatures: features},
    { code: "doSomething({x: y, y() {}})", ecmaFeatures: features},
    { code: "doSomething({y() {}, z: a})", ecmaFeatures: features},
    { code: "!{ a: function a(){} };", ecmaFeatures: features },

    // arrows functions are still alright
    { code: "var x = {y: (x)=>x}", ecmaFeatures: features },
    { code: "doSomething({y: (x)=>x})", ecmaFeatures: features },
    { code: "var x = {y: (x)=>x, y: a}", ecmaFeatures: features },
    { code: "doSomething({x, y: (x)=>x})", ecmaFeatures: features },

    // getters and setters are ok
    { code: "var x = {get y() {}}", ecmaFeatures: features },
    { code: "var x = {set y(z) {}}", ecmaFeatures: features },
    { code: "var x = {get y() {}, set y(z) {}}", ecmaFeatures: features },
    { code: "doSomething({get y() {}})", ecmaFeatures: features },
    { code: "doSomething({set y(z) {}})", ecmaFeatures: features },
    { code: "doSomething({get y() {}, set y(z) {}})", ecmaFeatures: features },

    // object literal computed properties
    { code: "var x = {[y]: y}", ecmaFeatures: features, options: ["properties"] },
    { code: "var x = {['y']: 'y'}", ecmaFeatures: features, options: ["properties"] },
    { code: "var x = {['y']: y}", ecmaFeatures: features, options: ["properties"] },

    // options
    { code: "var x = {y() {}}", ecmaFeatures: features, options: ["methods"] },
    { code: "var x = {x, y() {}, a:b}", ecmaFeatures: features, options: ["methods"] },
    { code: "var x = {y}", ecmaFeatures: features, options: ["properties"] },
    { code: "var x = {y: {b}}", ecmaFeatures: features, options: ["properties"] },
    { code: "var x = {a: n, c: d, f: g}", ecmaFeatures: features, options: ["never"] },
    { code: "var x = {a: function(){}, b: {c: d}}", ecmaFeatures: features, options: ["never"] },

    // Babel test cases.
    ok('let { ...spread } = obj'),
    ok('let { ...spread } = obj', [2, 'never']),
  ],

  invalid: [
    { code: "var x = {x: x}", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }] },
    { code: "var x = {'x': x}", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }] },
    { code: "var x = {y: y, x: x}", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }, { message: "Expected property shorthand.", type: "Property" }] },
    { code: "var x = {y: z, x: x, a: b}", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }] },
    { code: "var x = {y: function() {}}", ecmaFeatures: features, errors: [{ message: "Expected method shorthand.", type: "Property" }] },
    { code: "var x = {y: function*() {}}", ecmaFeatures: features, errors: [{ message: "Expected method shorthand.", type: "Property" }] },
    { code: "var x = {x: y, y: z, a: a}", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }] },
    { code: "var x = {x: y, y: z, a: function(){}, b() {}}", ecmaFeatures: features, errors: [{ message: "Expected method shorthand.", type: "Property" }] },
    { code: "var x = {x: x, y: function() {}}", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }, { message: "Expected method shorthand.", type: "Property" }]},
    { code: "doSomething({x: x})", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }] },
    { code: "doSomething({'x': x})", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }] },
    { code: "doSomething({a: 'a', 'x': x})", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }] },
    { code: "doSomething({y: function() {}})", ecmaFeatures: features, errors: [{ message: "Expected method shorthand.", type: "Property" }] },

    // options
    { code: "var x = {y: function() {}}", ecmaFeatures: features, errors: [{ message: "Expected method shorthand.", type: "Property" }], options: ["methods"] },
    { code: "var x = {x, y() {}, z: function() {}}", ecmaFeatures: features, errors: [{ message: "Expected method shorthand.", type: "Property" }], options: ["methods"] },
    { code: "var x = {x: x}", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }], options: ["properties"] },
    { code: "var x = {a, b, c(){}, x: x}", ecmaFeatures: features, errors: [{ message: "Expected property shorthand.", type: "Property" }], options: ["properties"] },
    { code: "var x = {y() {}}", ecmaFeatures: features, errors: [{ message: "Expected longform method syntax.", type: "Property" }], options: ["never"] },
    { code: "var x = {*y() {}}", ecmaFeatures: features, errors: [{ message: "Expected longform method syntax.", type: "Property" }], options: ["never"] },
    { code: "var x = {y}", ecmaFeatures: features, errors: [{ message: "Expected longform property syntax.", type: "Property" }], options: ["never"]},
    { code: "var x = {y, a: b, *x(){}}", ecmaFeatures: features, errors: [{ message: "Expected longform property syntax.", type: "Property" }, { message: "Expected longform method syntax.", type: "Property" }], options: ["never"]},
    { code: "var x = {y: {x}}", ecmaFeatures: features, errors: [{ message: "Expected longform property syntax.", type: "Property" }], options: ["never"]}

  ]
});
