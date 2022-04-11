class B {}

@(_ => _)
class A extends B {}

expect(new A).toBeInstanceOf(A);
expect(new A).toBeInstanceOf(B);
