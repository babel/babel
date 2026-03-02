function Foo({outsetArrows, ...rest}) {
  return useMemo(
    () => <div outsetArrows={outsetArrows}/>,
    [outsetArrows]
  );
}
