async function f(xs) {
  for await (const x of xs) use(x);
}
