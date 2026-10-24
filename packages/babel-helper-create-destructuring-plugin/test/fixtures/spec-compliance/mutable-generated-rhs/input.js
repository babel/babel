let source = 0;
{
  let source;
  source = { get a() { source = { b: 2 }; return 1; }, b: 1 };
  const { a, b } = source;
  use(a, b);
}
