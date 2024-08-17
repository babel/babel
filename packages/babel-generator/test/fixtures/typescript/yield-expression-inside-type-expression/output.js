function* generator() {
  const one = (yield "one") as number;
  const two = <number> (yield "two");
  const three = (yield "three") satisfies number;
}