function single(_ref, b) {
  let [{ a: _a }] = [_ref];
  {
    let a = _a;
    a = 3;

    assert.equal(a, 3);
    assert.equal(b, 0);
  }
}single({ a: 0 }, 0);

function multiple(_ref2, _b) {
  let [{ a: _a2 }] = [_ref2];
  {
    let a = _a2,
        b = _b;
    [a, b] = [3, 6];

    assert.equal(a, 3);
    assert.equal(b, 6);
  }
}multiple({ a: 0 }, 0);

(function argumentValueIsAvailableToo(_ref3) {
  let [{ a: _a3 }] = [_ref3];
  {
    let a = _a3;

    assert.equal(a, 99);
    a = 3;

    assert.equal(a, 3);
  }
})({ a: 99 });

function referenceToLaterParameter(..._ref4) {
  let [a = b, b] = [..._ref4];

  return [a, b];
}

assert.throws(() => {
  let [] = [];
  return referenceToLaterParameter(undefined, 1);
}, ReferenceError);
assert.deepEqual(referenceToLaterParameter(1), [1, undefined]);