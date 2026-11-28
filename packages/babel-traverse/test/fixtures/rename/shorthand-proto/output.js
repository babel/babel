let z = 1;
const literal = {
  ["__proto__"]: z
};
({
  __proto__: z
} = literal);
function shadowed() {
  let __proto__ = 2;
  return {
    __proto__
  };
}
