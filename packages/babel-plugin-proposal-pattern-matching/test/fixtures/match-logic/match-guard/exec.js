/*
  case (input) {
    when {x} if (myCheck(x)) -> ... // matches if `input` can do ToObject,
                                    //   if `input.x` is not `undefined`,
                                    //   and if `myCheck(input.x)` is true
    when x if (x.match(/^foo/)) -> ... // ok!
  }
*/

case ({x: 3}) { when {x} if (x === 3) -> 1; when y -> throw new Error(); }
case ({x: undefined}) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }
case ({}) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }
case ({}) { when {x} if (x === 3) -> throw new Error(); when y -> 1; }
case (null) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }
case (undefined) { when {x} if (x === undefined) -> throw new Error(); when y -> 1; }

case ('foobar') { when x if (x.match(/^foo/)) -> 1; when y -> throw new Error(); }
case ('bar') { when x if (x.match(/^foo/)) -> throw new Error(); when y -> 1; }
