// JSON is wrapped because it starts with an uppercase letter, but it
// should not be possible to extend it anyway.

assert.throws(() => class BetterJSON extends JSON {});