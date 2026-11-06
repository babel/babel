async function f() {
  x |> await |> f;
  return x |> await;
}
