let __proto__ = 1;

const literal = { __proto__ };
({ __proto__ } = literal);

function shadowed() {
  let __proto__ = 2;
  return { __proto__ };
}
