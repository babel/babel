
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

// Fails with: SyntaxError: Identifier '_x' has already been declared
// case ({x: 2}) { when {x: 1} -> throw new Error(); when y -> 1; }

/* Known failure
expect(
  (() => { case ({asdf: 1}) { when {asdf: 1} -> return true; }; return false; })()
).toBe(true);
*/
