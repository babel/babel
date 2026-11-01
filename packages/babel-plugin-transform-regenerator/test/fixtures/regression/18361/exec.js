const events = [];
const target = {
  get method() {
    events.push('lookup');
    return function (value) {
      events.push(this === target ? 'receiver' : 'wrong');
      return value;
    };
  },
};
function* g() {
  return target.method((events.push('argument'), yield 1));
}
const iterator = g();
iterator.next();
const result = iterator.next(2);
expect(events).toEqual(['lookup', 'argument', 'receiver']);
expect(result.value).toBe(2);

const computedEvents = [];
const computedTarget = {
  get method() {
    computedEvents.push('lookup');
    return function (value) {
      computedEvents.push(this === computedTarget ? 'receiver' : 'wrong');
      return value;
    };
  },
};
function* h() {
  return computedTarget[(computedEvents.push('key'), 'method')](
    (computedEvents.push('argument'), yield 1),
  );
}
const computedIterator = h();
computedIterator.next();
expect(computedIterator.next(3).value).toBe(3);
expect(computedEvents).toEqual(['key', 'lookup', 'argument', 'receiver']);
