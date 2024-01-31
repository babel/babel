let receivedName;
function decFactory(name) { receivedName = name; return x => x }
class B {
  static m() {
   class C {
     @decFactory(this.name) p;
   }
  }
}

B.m();
expect(receivedName).toBe("B");
