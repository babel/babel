async function af () {
  let result = "hello"
  |> # + ''
  |> new DoubleSay
  |> capitalize
  |> await exclaim;
}
