let f;
for (let i = 0, a = (f = () => i), b = i++; i < 1; ) {
  i = 42;
  console.log(f());
}
