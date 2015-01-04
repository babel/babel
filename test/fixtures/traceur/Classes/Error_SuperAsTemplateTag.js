// Error: :7:18: Unexpected token no substitution template

class A {}

class ImproperSuper extends A {
  method() {
    return super ``;
  }
}

