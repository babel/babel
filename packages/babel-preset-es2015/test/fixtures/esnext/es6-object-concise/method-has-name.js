var a = {
  b() {
    return 'c';
  }
};

expect(a.b.name).toBe('b');
