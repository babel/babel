const regex = /(?<=a)(?<a>[a])/

const result = regex.exec("aa");

expect(result.groups).toEqual({
  a: "a"
});
