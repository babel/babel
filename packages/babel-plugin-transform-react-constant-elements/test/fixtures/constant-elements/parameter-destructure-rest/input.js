function render({ text, className, id, ...props }) {
  // intentionally ignoring props
  return () => (<Component text={text} className={className} id={id} />);
}
