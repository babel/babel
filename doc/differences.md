# Differences

## Philosophy

The fundamental concept behind 6to5 is that the generated code must be close as
possible to the original, retaining all the same formatting and readability.

Many other transpilers are just concerned with making the code work while 6to5
is concerned with making sure it works **and** is readable at the same time.

For example, given the following array comprehension:

```javascript
var seattlers = [for (c of customers) if (c.city == "Seattle") { name: c.name, age: c.age }];
```

is generated to the following with 6to5:

```javascript
var seattlers = Array.from(customers).filter(function (c) {
  return c.city == "Seattle";
}).map(function (c) {
  return {
    name: c.name,
    age: c.age
  };
});
```

The following is what Traceur generates:

```javascript
var seattlers = (function() {
  var c;
  var $__20 = 0,
      $__21 = [];
  for (var $__22 = customers[$traceurRuntime.toProperty(Symbol.iterator)](),
      $__23; !($__23 = $__22.next()).done; ) {
    c = $__23.value;
    if (c.city == "Seattle")
      $traceurRuntime.setProperty($__21, $__20++, {
        name: c.name,
        age: c.age
      });
  }
  return $__21;
}());
```

As you can tell, it's not very pretty, unreadable even. Instead of mapping
directly to a runtime, like other transpilers, 6to5 maps directly to the
equivalent ES5.

Sometimes there are little things that 6to5 needs

## Comparison to other transpilers

### Features

|                              | 6to5 | Traceur | es6-transpiler | esnext | es6now | jstransform |
| ---------------------------- | ---- | ------- | -------------- | ------ | ------ | ----------- |
| Source maps                  | ✓    | ✓       | ✓              | ✓      |        | ✓           |
| No compiler global pollution | ✓    |         | ✓              | ✓      |        | ✓           |
| Optional runtime             | ✓    |         | ✓              |        |        | ✓           |
| Browser support              | ✓    | ✓       |                | ✓      |        |             |

### Language Support

|                              | 6to5  | Traceur | es6-transpiler | esnext | es6now | jstransform |
| ---------------------------- | ----- | ------- | -------------- | ------ | ------ | ----------- |
| Abstract references          | ✓     |         |                |        |        |             |
| Array comprehension          | ✓     | ✓       | ✓              |        |        |             |
| Arrow functions              | ✓     | ✓       | ✓              | ✓      | ✓      | ✓           |
| Async functions              | ✓     | ✓       |                | ✓      |        |             |
| Classes                      | ✓     | ✓       | ✓              | ✓      | ✓      | ✓           |
| Computed property names      | ✓     | ✓       | ✓              | ✓      | ✓      |             |
| Constants                    | ✓     | ✓       | ✓              |        |        |             |
| Default parameters           | ✓     | ✓       | ✓              | ✓      | ✓      |             |
| Destructuring                | ✓     | ✓       | ✓              | ✓      | ✓      | ✓           |
| Exponentiation operator      | ✓     | ✓       |                |        |        |             |
| For-of                       | ✓     | ✓       | ✓              | ✓      | ✓      |             |
| Generators                   | ✓     | ✓       |                | ✓      |        |             |
| Generator comprehension      | ✓     | ✓       |                |        |        |             |
| Let scoping                  | ✓     | ✓       | ✓              |        |        |             |
| Modules                      | ✓     | ✓       |                |        | ✓      |             |
| Object rest/spread           | ✓     |         |                |        |        | ✓           |
| Property method assignment   | ✓     | ✓       | ✓              | ✓      | ✓      | ✓           |
| Property name shorthand      | ✓     | ✓       | ✓              | ✓      | ✓      | ✓           |
| Rest parameters              | ✓     | ✓       | ✓              | ✓      | ✓      | ✓           |
| Spread                       | ✓     | ✓       | ✓              | ✓      | ✓      |             |
| Template literals            | ✓     | ✓       | ✓              | ✓      | ✓      | ✓           |
| Unicode regex                | ✓     | ✓       | ✓              |        |        |             |

### [Traceur](https://github.com/google/traceur-compiler)

Traceur requires quite a bulky runtime (~75KB) and produces quite verbose code.
While this can be trimmed down by selectively building the runtime, it's an
unneccesary step when a large runtime can be eliminated entirely.

### [es6now](https://github.com/zenparsing/es6now)

es6now doesn't output sourcemaps. This is cited as a positive as line-to-line
mapping is the goal. This however obviously doesn't retain column mapping
resulting in the output code not being very pleasant.

### [es6-transpiler](https://github.com/termi/es6-transpiler)

The es6-transpiler compiler requires shims to operate which pollutes the global
scope resulting in possible collisions.

es6-transpiler maps line-by-line, just like es6now, this results in the same
issues such as lack of column information and unpleasant code output.
