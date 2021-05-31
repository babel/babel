const regex1 = /(?<alpha>\w+):(?<bravo>\d+)/;
const regex2 = /(?<alpha>\w+):(?<bravo>[a-z]+):(?<charlie>\w+)/;

const result = regex2.exec("foo:abc:bar");

expect(result.groups).toEqual({
  alpha: "foo",
  bravo: "abc",
  charlie: "bar",
});
