async function af () {
  let result = "hello"
  |> await doubleSay
  |> await text.capitalize
  |> await a.b.exclaim;
}
