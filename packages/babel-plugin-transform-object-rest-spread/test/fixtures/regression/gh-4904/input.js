const { s, ...t } = foo();

const { s: { q1, ...q2 }, ...q3 } = bar();

const { a } = foo(({ b, ...c }) => {
  console.log(b, c);
});
