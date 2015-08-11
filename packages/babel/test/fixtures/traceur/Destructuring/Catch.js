var head = 'head';
var tail = 'tail';
var name = 'name';

function MyError(s) {
  this.message = new String(s);
  this.name = 'Error';
}

try {
  throw new MyError('abc');
} catch ({message: [head, ...tail], name}) {
  assert.equal('a', head);
  assertArrayEquals(['b', 'c'], tail);
  assert.equal('Error', name);
}

assert.equal('head', head);
assert.equal('tail', tail);
assert.equal('name', name);

assert.throws(() => {
  try {
    throw [0];
  } catch ([innerX]) {

  }

  innerX;
}, ReferenceError);
