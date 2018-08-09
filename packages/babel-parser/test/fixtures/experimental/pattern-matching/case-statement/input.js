case (input) {
  when {x} -> console.log('object') // matches if `input` can do ToObject and `input.x` is 1
  when [a, b] -> console.log('array') // matches if `input` can do GetIterator, has exactly 2 items, and the items are 1, then 2.
  when 1 -> console.log('number') // matches if `input` is 1
  when 'foo' -> console.log('string') // matches if `input` is 'foo'
  when false -> console.log('boolean') // matches if `input` is `false`
  when null -> console.log('null') // matches if `input` is `null`
  when {x} if (myCheck(x)) -> console('if') // matches if `input` can do ToObject, if `input.x` is not `undefined`, and if `myCheck(input.x)` is true
  when x -> console.log('variable') // always matches
  when /^foo/ -> console.log('regex') // SyntaxError
  when x if (x.match(/^foo/)) -> console.log('...') // ok!
}
