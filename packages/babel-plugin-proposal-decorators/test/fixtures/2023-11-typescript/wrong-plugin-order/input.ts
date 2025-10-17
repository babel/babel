let initializerWasCalled = false;

function decorator(method: any, ctx: ClassMethodDecoratorContext<any, any>) {
  ctx.addInitializer(function () {
    console.info("Initializer called!");
    initializerWasCalled = true;
  });
  return method;
}

abstract class A {
  abstract a: number; // <-- Note, commenting out this completely unrelated abstract field fixes the issue (i.e. the initializer will be called.) Removing the "abstract" also works.

  @decorator
  method() {}
}

class B extends A {
  a = 1;
}
const b = new B();

console.info("Was initializer called?:", initializerWasCalled); // false, expected: true
