
/*
Spec says:
  // https://github.com/tc39/proposal-pattern-matching/blob/latest/CORE.md#-133-runtime-semantics-by-example

  case (input) {
    // [... stuff in other test files ...]
    when {x} if (myCheck(x)) -> ... // matches if `input` can do ToObject,
                                    //   if `input.x` is not `undefined`,
                                    //   and if `myCheck(input.x)` is true
    when x -> ... // always matches
    when /^foo/ -> ... // SyntaxError
    when x if (x.match(/^foo/)) -> ... // ok!
  }
*/

case (undefined) { when x -> 1; when y -> throw new Error(); }
case (null) { when x -> 1; when y -> throw new Error(); }
case (0) { when x -> 1; when y -> throw new Error(); }
case (1) { when x -> 1; when y -> throw new Error(); }
case (false) { when x -> 1; when y -> throw new Error(); }
case ({}) { when x -> 1; when y -> throw new Error(); }
case ([{}]) { when x -> 1; when y -> throw new Error(); }

case ({x: 3}) { when {x} if (x === 3) -> 1; when y -> throw new Error(); }
case ({x: undefined}) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }
case ({}) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }
case ({}) { when {x} if (x === 3) -> throw new Error(); when y -> 1; }
case (null) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }
case (undefined) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }

case ('foobar') { when x if (x.match(/^foo/)) -> 1; when y -> throw new Error(); }
case ('bar') { when x if (x.match(/^foo/)) -> throw new Error(); when y -> 1; }
