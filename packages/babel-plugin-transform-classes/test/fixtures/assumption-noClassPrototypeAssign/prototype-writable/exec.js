class A {}

class B {
  constructor() {}
}

// We don't _guarantee_ that the prototype will be writable (the user is telling
// us to assume that they are not assigning it, so they will not notice anyway
// :P), but it is in this case.
// When also 'setClassMethods' is enabled, we actually emit classes with a
// writable prototype in all cases.
expect(Object.getOwnPropertyDescriptor(A, "prototype").writable).toBe(true);
expect(Object.getOwnPropertyDescriptor(B, "prototype").writable).toBe(true);