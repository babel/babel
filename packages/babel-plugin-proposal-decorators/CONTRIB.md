These are notes about the implementation of the 2021-12 decorators transform.
The implementation's goals are (in descending order):

1. Being accurate to the actual proposal (e.g. not defining additional
  properties unless required, matching semantics exactly, etc.). This includes
  being able to work properly with private fields and methods.
2. Transpiling to a very minimal and minifiable output. This transform will
  affect each and every decorated class, so ensuring that the output is not 10x
  the size of the original is important.
3. Having good runtime performance. Decoration output has the potential to
  drastically impact startup performance, since it runs whenever a decorated
  class is defined. In addition, every instance of a decorated class may be
  impacted for certain types of decorators.

All of these goals come somewhat at the expense of readability and can make the
implementation difficult to understand, so these notes are meant to document the
motivations behind the design.

## Overview

Given a simple decorated class like this one:

```js
@dec
class Class {
  @dec a = 123;

  @dec static #b() {
    console.log('foo');
  }

  [someVal]() {}

  @dec
  @dec2
  accessor #c = 456;
}
```

It's output would be something like the following:

```js
import { applyDecs } from '@babel/helpers';

let initInstance, initClass, initA, callB, computedKey, initC, getC, setC;

const elementDecs = [
  [dec, 0, 'a'],
  [dec, 7, 'x', '#b']
  (computedKey = someVal, null)
  [[dec, dec2], 1, 'y', '#c']
];

const classDecs = [dec];

let Class;
class _Class {
  static {
    let ret = applyDecs(
      this,
      elementDecs,
      [dec]
    );

    initA = ret[0];
    callB = ret[1];
    initC = ret[2];
    getC = ret[3];
    setC = ret[4];
    initInstance = ret[5];
    Class = ret[6];
    initClass = ret[7];
  }

  a = (initInstance(this), initA(this, 123));

  static #b(...args) {
    callB(this, args);
  }
  static x() {
    console.log('foo');
  }

  [computedKey]() {}

  #y = initC(this, 123);
  get y() {
    return this.#y;
  }
  set y(v) {
    this.#y = v;
  }
  get #c() {
    return getC(this);
  }
  set #c(v) {
    setC(this, v);
  }

  static {
    initClass(C);
  }
}
```

Let's break this output down a bit:

```js
let initInstance, initClass, initA, callB, initC, getC, setC;
```

First, we need to setup some local variables outside of the class. These are
for:

- Decorated class field/accessor initializers
- Extra initializer functions added by `addInitializers`
- Private class methods

These are essentially all values that cannot be defined on the class itself via
`Object.defineProperty`, so we have to insert them into the class manually,
ahead of time and populate them when we run our decorators.

```js
const elementDecs = [
  [dec, 0, 'a'],
  [dec, 7, 'x', '#b']
  (computedKey = someVal, null)
  [[dec, dec2], 1, 'y', '#c']
];

const classDecs = [dec];
```

Next up, we define and evaluate the decorator member expressions. The reason we
do this _before_ defining the class is because we must interleave decorator
expressions with computed property key expressions, since computed properties
and decorators can run arbitrary code which can modify the runtime of subsequent
decorators or computed property keys.

```js
let Class;
class _Class {
```

This class is being decorated directly, which means that the decorator may
replace the class itself. Class bindings are not mutable, so we need to create a
new `let` variable for the decorated class.


```js
  static {
    let ret = applyDecs(
      this,
      elementDecs,
      classDecs
    );

    initA = ret[0];
    callB = ret[1];
    initC = ret[2];
    getC = ret[3];
    setC = ret[4];
    initInstance = ret[5];
    Class = ret[6];
    initClass = ret[7];
  }
```

Next, we immediately define a `static` block which actually applies the
decorators. This is important because we must apply the decorators _after_ the
class prototype has been fully setup, but _before_ static fields are run, since
static fields should only see the decorated version of the class.

We apply the decorators to class elements and the class itself, and the
application returns an array of values that are used to populate all of the
local variables we defined earlier. The array's order is fully deterministic, so
we can assign the values based on an index we can calculate ahead of time.

We'll come back to `applyDecs` in a bit to dig into what its format is exactly,
but now let's dig into the new definitions of our class elements.

```js
  a = (initInstance(this), initA(this, 123));
```

Alright, so previously this was a simple class field. Since it's the first field
on the class, we've updated it to immediately call `initInstance` in its
initializer. This calls any initializers added with `addInitializer` for all of
the per-class values (methods and accessors), which should all be setup on the
instance before class fields are assigned. Then, it calls `initA` to get the
initial value of the field, which allows initializers returned from the
decorator to intercept and decorate it. It's important that the initial value
is used/defined _within_ the class body, because initializers can now refer to
private class fields, e.g. `a = this.#b` is a valid field initializer and would
become `a = initA(this, this.#b)`, which would also be valid. We cannot
extract initializer code, or any other code, from the class body because of
this.

Overall, this decoration is pretty straightforward other than the fact that we
have to reference `initA` externally.

```js
  static #b(...args) {
    callB(this, args);
  }
  static x() {
    console.log('foo');
  }
```

Next up, we have a private static class method `#b`. This one is a bit more
complex, as our definition has been broken out into 2 parts:

1. `static #b`: This is the method itself, which being a private method we
  cannot overwrite with `defineProperty`. We also can't convert it into a
  private field because that would change its semantics (would make it
  writable). So, we instead have it proxy to the locally scoped `callB`
  variable, which will be populated with the fully decorated method.
2. `static x`: This contains the _code_ of the original method. Once again, this
  code cannot be removed from the class body because it may reference private
  identifiers. However, we have moved the code to a _public_ method, which means
  we can now read its value using `Object.getOwnPropertyDescriptor`. Decorators
  use this to get the initial implementation of the method, which can then be
  wrapped with decorator code/logic. They then `delete` this temporary property,
  which is necessary because no additional elements should be added to a class
  definition.

  The name for this method is unimportant, but because public method names
  cannot be minified and we also need to pass the name into `applyDecs`, we
  generate as small of a unique identifier as possible here, starting with 1
  char names which are not taken and growing until we find one that is free.

```js
  [computedKey]() {}
```

Next is the undecorated method with a computed key. This uses the previously
calculated and stored computed key.

```js
  #y = initC(this, 123);
  get y() {
    return this.#y;
  }
  set y(v) {
    this.#y = v;
  }
  get #c() {
    return getC(this);
  }
  set #c(v) {
    setC(this, v);
  }
```

Next up, we have the output for `accessor #c`. This is the most complicated
case, since we have to transpile the decorators, the `accessor` keyword, and
target a private field. Breaking it down piece by piece:

```js
  #y = initC(this, 123);
```

`accessor #c` desugars to a getter and setter which are backed by a new private
field, `#y`. Like before, the name of this field doesn't really matter, we'll
just generate a short, unique name. We call the decorated initializer for `#c`
and return that value to assign to the field.

```js
  get y() {
    return this.#y;
  }
  set y(v) {
    this.#y = v;
  }
```

Next we have a getter and setter named `y` which provide access to the backing
storage for the accessor. These are the base getter/setter for the accessor,
which the decorator will get via `Object.getOwnPropertyDescriptor`. They will be
deleted from the class fully, so again the name is not important here, just
needs to be short.

```js
  get #c() {
    return getC(this);
  }
  set #c(v) {
    setC(this, v);
  }
```

Next, we have the getter and setter for `#c` itself. These methods defer to
the `getC` and `setC` local variables, which will be the decorated versions of
the `get y` and `set y` methods from the previous step.

```js
  static {
    initClass(C);
  }
```

Finally, we call `initClass` in another static block, running any class and
static method initializers on the final class. This is done in a static block
for convenience with class expressions, but it could run immediately after the
class is defined.

Ok, so now that we understand the general output, let's go back to `applyDecs`:

```js
const elementDecs = [
  [dec, 0, 'a'],
  [dec, 7, 'x', '#b']
  (computedKey = someVal, null)
  [[dec, dec2], 1, 'y', '#c']
];

const classDecs = [dec];

// ...

let ret = applyDecs(
  this,
  elementDecs,
  classDecs
);
```

`applyDecs` takes all of the decorators for the class and applies them. It
receives the following arguments:

1. The class itself
2. Decorators to apply to class elements
3. Decorators to apply to the class itself

The format of the data is designed to be as minimal as possible. Here's an
annotated version of the member descriptors:

```js
[
  // List of decorators to apply to the field. Array if multiple decorators,
  // otherwise just the single decorator itself.
  dec,

  // The type of the decorator, represented as an enum. Static-ness is also
  // encoded by adding 5 to the values
  //   0 === FIELD
  //   1 === ACCESSOR
  //   2 === METHOD
  //   3 === GETTER
  //   4 === SETTER
  //   5 === FIELD + STATIC
  //   6 === ACCESSOR + STATIC
  //   7 === METHOD + STATIC
  //   8 === GETTER + STATIC
  //   9 === SETTER + STATIC
  1,

  // The name of the public property that can be used to access the value.
  // For public members this is the actual name, for private members this is
  // the name of the public property which can be used to access the value
  // (see descriptions of #b and #c above)
  'y',

  // Optional fourth value, this is the spelling of the private element's name,
  // which signals that the element is private to `applyDecs` and is used in the
  // decorator's context object
  '#c'
],
```

Static and prototype decorators are all described like this. For class
decorators, it's just the list of decorators since no other context
is necessary.
