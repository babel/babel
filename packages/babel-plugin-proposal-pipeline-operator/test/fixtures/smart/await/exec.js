async function myFunction(n) {
  return n
    |> Math.abs
    |> Promise.resolve(#)
    |> await #;
}

return myFunction(-7).then(result => {
  expect(result).toBe(7);
});
