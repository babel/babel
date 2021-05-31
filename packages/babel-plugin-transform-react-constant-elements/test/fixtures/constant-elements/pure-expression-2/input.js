function render(offset) {
  return function () {
    return <div tabIndex={offset + 1} />;
  };
}
