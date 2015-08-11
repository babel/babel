// Error: :7:18: Unexpected token `

class A {}

class ImproperSuper extends A {
  method() {
    return super ``;
  }
}

