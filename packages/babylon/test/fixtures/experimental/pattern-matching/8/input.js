match (input) {
  // matches if `input` is an object, whether or not it has an `x` property, and
  // sets `x` to `1` if `x` does not already exist on the object
  {x} = {x: 1} => "foo",
}
