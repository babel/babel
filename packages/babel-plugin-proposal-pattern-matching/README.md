# @babel/plugin-proposal-pattern-matching

> Compile `pattern matching` expressions to ES5

## Detail

Pattern matching is an idea from FP language, it
help you write clean and elegant code.

With pattern matching, you don't need long `if...else...`
in some cases.

```js
let num = match(value) {
  "one": "一",
  "two": "二",
  "three": "三",
  else: "其他"
}

// is equivalent to:
let num;
if (value === "one") {
  num = "一";
} else if (value === "two") {
  num = "二";
} else if (some === "three") {
  num = "三";
} else {
  num = "其他";
}
```

But the above code is silly, you can just use `switch`.
The key of pattern matching is **pattern matching**:)

It can bind the matched value to variable.

```js
let x = [1,2,3];

let that = match(x) { // that === "second, value: 2"
  []: "zero", // will not match, the length is different
  [1,2]: "first", // will not match too
  [1, two, 3]: "second, value: " + two, // match! two is equivalent to 2
  [1, 2, 3]: "third", // the pattern is right, but will not match
  [1, 3, ...]: "forth",
  [1, 2, ...]: "fifth",
  else: "(^-^)"
}

```

You can match many `pattern` including:

- Literal
  - String
  - Number
  - Boolean
  - Null
- Array
- Object

Here is an example of matching object:

```js
var person = {
    name: "HaHa",
    birthday: {
      year: 1926,
      month: 8,
      day: 17,
    },
    birthplace: {
      country： "China",
      province: "Jiangsu",
    }
};

// type === "object"
let type = match (person) {
  [...]: "array",
  {}: "object",
  else: "else"
}

// detail === "HaHa(1926) from China"
let detail = match(test) {
  {
    name,
    birthday: {year},
    birthplace: {country},
  }: name + "(" + year + ")" + " from " + country
}
```

The plugin supports nested matching, you can match
object in object, object in array, array in object, etc.

## Reducer in Redux

Writing a reducer in redux:
```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}
```

But with pattern matching:

```js
function todoApp(state = initialState, action) {
  return match(action) {
    {type: "SET_VISIBILITY_FILTER", filter}:
      Object.assign({}, state, {
        visibilityFilter: filter
      }),
    {type: "ADD_TODO", text}:
      Object.assign({}, state, {
          todos: [
            ...state.todos,
            {
              text: text,
              completed: false
            }
          ]
        }),
    else: state
  }

```

It's much more cleaner.

## Match rules

### Identifier

You can **only** match identifier in the outermost pattern.
The identifier should be **only** the following type:

- Array
- class constructor

### Array

When matching array, it will check if it's array,
then check the length of array if the pattern does not
contain `...`. Last, match the pattern in the array.

Example:
```js
// pattern
[1,2,3]
// generating code
Array.isArray(_match_expr) &&
_match_expr.length === 3 &&
_match_expr[0] === 1 &&
_match_expr[1] === 2 &&
_match_expr[2] === 3
```

And rest identifier is supported.

Example:

```js
// rest elements will be added to `rest`
[1,2,3, ...rest]
```

### Object

Matching object is more complicated, it will check
property of object. If the object does not have the
property key, it will fail.

Example:
```js
// pattern
{a, b: "b", ...c}
// generating code
typeof _match_expr === "object" &&
_match_expr.hasOwnProperty("a") &&
_match_expr.a !== void 0 &&
_match_expr.hasOwnProperty("b") &&
_match_expr.b === "b"
```

The variable `c` is a rest pattern identifier,
the properties which haven't matched will be
bind to the object `c`. It's obvious that `c`
is a new object.

### Else

The `else` pattern can match all the cases.
All the clauses after `else` **will be abandoned**.

Example:
```js
match (4) {
  1: "one",
  2: "two",
  3: "three",
  else: "else",
  4: "abandoned"
}
```

## Body of clause

The body of a clause is regarded as a lambda
expression, just like an arrow expression in ECMAScript.
Actually, it will be compiled to an arrow expression.

```js
match(some) {
  1: "one",
  1: {
    return "one"
  }
}
```

## References
- [Proposal](https://github.com/tc39/proposal-pattern-matching)
- [Implementing functional languages: a tutorial](https://www.microsoft.com/en-us/research/publication/implementing-functional-languages-a-tutorial/) by [Simon Peyton Jones](https://www.microsoft.com/en-us/research/people/simonpj/)
