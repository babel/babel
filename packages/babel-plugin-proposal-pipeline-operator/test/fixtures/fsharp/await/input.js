async function myFunction(n) {
  return n
    |> Math.abs
    |> Promise.resolve
    |> await;
}
