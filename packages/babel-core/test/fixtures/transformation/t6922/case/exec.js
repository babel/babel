export default function *() {
  // inclusion of the following line causes a failure
  Object.keys({foo: 'bar', bar: 'foo'});

  yield 'foo'
}
