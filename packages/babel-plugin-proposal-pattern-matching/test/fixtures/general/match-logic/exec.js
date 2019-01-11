
/*
Spec says:
  // https://github.com/tc39/proposal-pattern-matching/blob/latest/CORE.md#-133-runtime-semantics-by-example

  case (input) {
    when {x: 1} -> ... // matches if `input` can do ToObject and `input.x` is 1
    when [1,2] -> ... // matches if `input` can do GetIterator, has exactly 2 items,
                      //   and the items are 1, then 2.
    when 1 -> ... // matches if `input` is 1
    when 'foo' -> ... // matches if `input` is 'foo'
    when false -> ... // matches if `input` is `false`
    when null -> ... // matches if `input` is `null`
    when {x} if (myCheck(x)) -> ... // matches if `input` can do ToObject,
                                    //   if `input.x` is not `undefined`,
                                    //   and if `myCheck(input.x)` is true
    when x -> ... // always matches
    when /^foo/ -> ... // SyntaxError
    when x if (x.match(/^foo/)) -> ... // ok!
  }
*/

case ({x: 1}) { when {x: 1} -> 1; when x -> throw new Error(); }
case ({x: 2}) { when {x: 1} -> throw new Error(); when y -> 1; }
case (null) { when {x: 1} -> throw new Error(); when y -> 1; }
case (undefined) { when {x: 1} -> throw new Error(); when y -> 1; }
case ({x: 1, y: 2}) { when {x: 1} -> 1; when x -> throw new Error(); }
case ({x: "1"}) { when {x: 1} -> throw new Error(); when y -> 1; }
case ({x: null}) { when {x: 1} -> throw new Error(); when y -> 1; }
case ({x: undefined}) { when {x: 1} -> throw new Error(); when y -> 1; }
case ({x: 1.0}) { when {x: 1} -> 1; when x -> throw new Error(); }
expect(
  (() => { case ({asdf: 1}) { when {asdf: 1} -> return true; }; return false; })()
).toBe(true);

case ([1,2]) { when [1,2] -> 1; when x -> throw new Error(); }
case ([1]) { when [1,2] -> throw new Error(); when y -> 1; }
case ([1,2,3]) { when [1,2] -> throw new Error(); when y -> 1; }
case ([2,1]) { when [1,2] -> throw new Error(); when y -> 1; }
case ([1,undefined]) { when [1,2] -> throw new Error(); when y -> 1; }
// An element of `undefined` doesn't match even a general pattern.
case ([1,undefined]) { when [1,x] -> throw new Error(); when y -> 1; }
case ([1,2,undefined]) { when [1,2] -> throw new Error(); when y -> 1; }
// TODO test other things that can do GetIterator -- and that can't

// `undefined` on the RHS is a *binding*, for a local to shadow the real `undefined`.
case ([1,2]) { when [1,undefined] -> expect(undefined).toBe(2); when y -> throw new Error(); }
case ([1]) { when [1,undefined] -> throw new Error(); when y -> 1; }

case (1) { when 1 -> 1; when x -> throw new Error(); }
case (2) { when 1 -> throw new Error(); when y -> 1; }
case (null) { when 1 -> throw new Error(); when y -> 1; }
case (undefined) { when 1 -> throw new Error(); when y -> 1; }
case (NaN) { when 1 -> throw new Error(); when y -> 1; }
case (NaN) { when NaN -> 1; when x -> throw new Error(); }

case (undefined) { when x -> 1; when y -> throw new Error(); }
case (null) { when x -> 1; when y -> throw new Error(); }
case (0) { when x -> 1; when y -> throw new Error(); }
case (1) { when x -> 1; when y -> throw new Error(); }
case (false) { when x -> 1; when y -> throw new Error(); }
case ({}) { when x -> 1; when y -> throw new Error(); }
case ([{}]) { when x -> 1; when y -> throw new Error(); }

// TODO more simple stuff here

case ({x: 3}) { when {x} if (x === 3) -> 1; when y -> throw new Error(); }
case ({x: undefined}) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }
case ({}) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }
case ({}) { when {x} if (x === 3) -> throw new Error(); when y -> 1; }
case (null) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }
case (undefined) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }

case ('foobar') { when x if (x.match(/^foo/)) -> 1; when y -> throw new Error(); }
case ('bar') { when x if (x.match(/^foo/)) -> throw new Error(); when y -> 1; }
