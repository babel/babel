class Ref {
  constructor(ref = Ref) {
    this.ref = ref
  }
}

assert.equal(Ref, new Ref().ref)
