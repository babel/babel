
/*
Spec says:
  // https://github.com/tc39/proposal-pattern-matching/blob/latest/CORE.md#-133-runtime-semantics-by-example

  case (input) {
    // [... stuff in other test files ...]
    when x -> ... // always matches
    when /^foo/ -> ... // SyntaxError
  }
*/

case (undefined) { when x -> 1; when y -> throw new Error(); }
case (null) { when x -> 1; when y -> throw new Error(); }
case (0) { when x -> 1; when y -> throw new Error(); }
case (1) { when x -> 1; when y -> throw new Error(); }
case (false) { when x -> 1; when y -> throw new Error(); }
case ({}) { when x -> 1; when y -> throw new Error(); }
case ([{}]) { when x -> 1; when y -> throw new Error(); }
