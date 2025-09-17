async function f() {
  const value = await Promise.resolve(1);
  console.log(value);
}