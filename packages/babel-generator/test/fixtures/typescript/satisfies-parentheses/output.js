// These do not normally need parens
{
  (a + b // c
  ) satisfies x;
  a + b satisfies x;
}
{
  b ** (c ** d // c
  ) satisfies x;
  b ** c ** d satisfies x;
}
{
  a + (b ** c // c
  ) satisfies x;
  a + b ** c satisfies x;
}

// These need parens anyway
{
  a + (b + c // c
  ) satisfies x;
  a + (b + c) satisfies x;
}
{
  a ** (b + c // c
  ) satisfies x;
  a ** (b + c) satisfies x;
}
{
  (() => a // c
  ) satisfies x;
  (() => a) satisfies x;
}

// These do not need parens even with the comment
{
  a // c
  + b satisfies x;
  a + b satisfies x;
}
{
  fn(a // c
  ) satisfies x;
  fn(a) satisfies x;
}
{
  [a // c
  ] satisfies x;
  [a] satisfies x;
}