class Ref {
  static nextId = 0
  constructor(id = ++Ref.nextId, n = id) {
    this.id = n
  }
}

expect(new Ref().id).toBe(1);
expect(new Ref().id).toBe(2);
