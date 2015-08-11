// Skip. Not implemented.

// TODO: needs soft bind and ??= implemented

// A special form based on the default operator proposal
const self_default_bound = (this ??= self, a, b) -> {
  this.c = a * b;
}
self_default_bound(6, 7);
assert(self.c === 42);

self_default_bound.call(other, 8, 9);
assert(other.c === 72);
assert(self.c === 42);
