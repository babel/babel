function render(flag) {
  if (flag) {
    let bar = "bar";

    [].map(() => bar);

    return <foo bar={bar} />;
  }

  return null;
}
