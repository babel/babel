function decorate(value: boolean) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {};
}

abstract class A {
  @decorate(false)
  private decoratedMember: boolean;

  abstract myMethod(): number;
}

class B extends A {
  constructor() {
    super();
  }

  myMethod(): number {
    return 5;
  }
}

const b = new B();
expect(b.myMethod()).toBe(5);
