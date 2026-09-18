for (let i = 0, f = () => i; i < 1; ) {
  i = 42;
  console.log(f());
}
