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

  abstract myMethod(): void;
}

class B extends A {
  constructor() {
    super();
  }

  myMethod(): void {
    
  }
}

const b = new B();
