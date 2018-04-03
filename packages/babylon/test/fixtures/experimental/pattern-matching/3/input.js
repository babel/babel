let length = vector => match (vector) {
  { x, y, z } => Math.sqrt(x ** 2 + y ** 2 + z ** 2),
  { x, y, ...etc } =>  Math.sqrt(x ** 2 + y ** 2),
  [...etc] => vector.length,
}
