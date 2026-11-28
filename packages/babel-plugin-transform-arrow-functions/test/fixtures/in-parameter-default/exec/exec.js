function receiver(read = () => this) {
  return read;
}
const a = {};
const b = {};
const readA = receiver.call(a);
receiver.call(b);
expect(readA()).toBe(a);

function count(first, read = () => arguments.length) {
  return read();
}
expect(count(1)).toBe(1);

function Target(read = () => new.target) {
  this.target = read();
}
expect(new Target().target).toBe(Target);

function destructured({ read = () => this } = {}) {
  return read();
}
expect(destructured.call(a)).toBe(a);
