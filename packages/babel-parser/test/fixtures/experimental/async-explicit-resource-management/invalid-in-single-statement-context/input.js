async function f() {
  while (1) await using a;
  for (;;) await using b;
  do await using c; while (1);
  if (1) await using d;
  with (1) await using e;
  label: await using f;
}
