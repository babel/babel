(a ? b : c)!;
(a ? b : c)!.d;
(a ? b : c!);
(a ? b : c!).d;

foo!();
foo()!;

async function* f() {
  (yield x)!;
  yield x!;
  (yield)!;

  (await x)!;
  (await x!);
}
