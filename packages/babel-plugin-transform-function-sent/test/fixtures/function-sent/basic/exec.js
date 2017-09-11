let sent, yielded;

function* gen() {
    sent = function.sent;
    yielded = yield;
}

const it = gen();
it.next(1);
it.next(2);

assert.equal(sent, 1);
assert.equal(yielded, 2);
