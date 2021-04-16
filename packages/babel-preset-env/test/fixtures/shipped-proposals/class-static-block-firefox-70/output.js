class A {}

var _ = {
  writable: true,
  value: (() => {
    register(A);
  })()
};
