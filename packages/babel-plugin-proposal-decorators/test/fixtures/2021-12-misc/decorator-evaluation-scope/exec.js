let receivedName;
function decFactory(name) { receivedName = name; return x => x }
class B {
  static {
   class C {
     @decFactory(this.name) p;
   }
  }
}
expect(receivedName).toBe("B");
