class Ref {
  static nextId = 0
  constructor(id = ++Ref.nextId, n = id) {
    this.id = n
  }
}

assert.equal(1, new Ref().id)
assert.equal(2, new Ref().id)
