class C {
  p() { return 1 }
  get p() { return 0 }
}

expect(new C().p).toBe(0);
