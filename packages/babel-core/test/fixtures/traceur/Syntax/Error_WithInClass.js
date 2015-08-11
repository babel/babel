// Error: :5:5: Strict mode code may not include a with statement

class C {
  method() {
    with ({}) {}
  }
}